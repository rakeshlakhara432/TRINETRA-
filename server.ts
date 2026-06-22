import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Shared Types
interface CaseDocument {
  id: string;
  name: string;
  size: string;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  fileContentPreview?: string; // Securely stored content/hash indicator
}

interface Case {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "INVESTIGATING" | "ANALYZING" | "CONTAINED" | "RESOLVED";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  assignedInvestigator: string;
  incidentType: string;
  affectedSystems: string[];
  createdAt: string;
  updatedAt: string;
  documents: CaseDocument[];
  logsTimeline: { timestamp: string; action: string; investigator: string }[];
}

interface AlertMessage {
  id: string;
  timestamp: string;
  sourceIp: string;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message: string;
  status: "ACTIVE" | "ARCHIVED" | "DISMISSED";
  attackVector: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  badge?: string; // e.g. "Lead", "Senior Analyst", "Forensics Assistant"
}

// In-Memory Virtual Database
const casesList: Case[] = [
  {
    id: "TR-2026-101",
    title: "Project Aegis: Ransomware Outbreak on FinTech DB",
    description: "Detection of lockbit-variant ransomware behavior encrypting the backup servers on Core Subnet-C. Active payload detected, immediate memory forensic and incident response required.",
    status: "INVESTIGATING",
    severity: "CRITICAL",
    assignedInvestigator: "Major Vikram Rathore, Senior Forensic Lead",
    incidentType: "Ransomware / Cryptojacking",
    affectedSystems: ["DB-Backup-01.local", "Prod-Billing-Gateway-West"],
    createdAt: "2026-06-22T04:10:00Z",
    updatedAt: "2026-06-22T06:55:00Z",
    documents: [
      {
        id: "doc-1",
        name: "ransom_compromise_note.txt",
        size: "4.2 KB",
        mimeType: "text/plain",
        uploadedAt: "2026-06-22T04:30:00Z",
        uploadedBy: "Vikram Rathore",
        fileContentPreview: "All your financial archives are locked under Trinetra high-grade encryption. Contact forensic support on key ID #440-ABQ"
      },
      {
        id: "doc-2",
        name: "memory_volatile_dump_subnetC.raw",
        size: "32.4 MB",
        mimeType: "application/octet-stream",
        uploadedAt: "2026-06-22T05:15:00Z",
        uploadedBy: "Vikram Rathore",
        fileContentPreview: "Forensic Hash: sha256:7b5e431f9ab6c4cfcb3012ba4d1b"
      }
    ],
    logsTimeline: [
      { timestamp: "2026-06-22T04:10:00Z", action: "Incident created automatically from intrusion alerts system", investigator: "Trinetra SIEM Router" },
      { timestamp: "2026-06-22T04:15:00Z", action: "Assigned lead investigator Vikram Rathore", investigator: "System Admin" },
      { timestamp: "2026-06-22T04:30:00Z", action: "Uploaded ransom compromise note and initiated sandboxing test", investigator: "Vikram Rathore" },
      { timestamp: "2026-06-22T05:15:00Z", action: "Secured memory volatile dump via Forensic Agent Tool Node-9", investigator: "Vikram Rathore" }
    ]
  },
  {
    id: "TR-2026-102",
    title: "Incident #99-Phish: HR Credential Exfiltration Probe",
    description: "Spearphishing campaign targeting human resources personnel with custom malicious attachments matching credential-grabbing behavior on a spoofed portal.",
    status: "ANALYZING",
    severity: "HIGH",
    assignedInvestigator: "Dr. Ananya Roy, Threat Hunter",
    incidentType: "Phishing / Identity Theft",
    affectedSystems: ["HR-Workstation-04", "Active-Directory-Broker"],
    createdAt: "2026-06-21T18:30:00Z",
    updatedAt: "2026-06-22T02:15:00Z",
    documents: [
      {
        id: "doc-3",
        name: "spoofed_email_headers.eml",
        size: "145 KB",
        mimeType: "message/rfc822",
        uploadedAt: "2026-06-21T19:00:00Z",
        uploadedBy: "Admin",
        fileContentPreview: "Return-Path: <spoofed-hr-internal@sec-portal-auth.web>\nReceived: from unknown relays...\nSubject: MANDATORY WORKPLACE ASSESSMENT DUE IMMEDIATELY"
      }
    ],
    logsTimeline: [
      { timestamp: "2026-06-21T18:30:00Z", action: "User reported email suspicious payload", investigator: "HR Workstation User" },
      { timestamp: "2026-06-21T19:00:00Z", action: "Isolated suspicious email headers to local investigation folder", investigator: "Dr. Ananya Roy" },
      { timestamp: "2026-06-22T02:15:00Z", action: "AI Copilot analysis run on headers. Identified relay IP in blocked list.", investigator: "Dr. Ananya Roy" }
    ]
  },
  {
    id: "TR-2026-103",
    title: "Unauthorized Exfiltration of CAD Schematics",
    description: "Unusual massive outbound data transfer (approx 12GB) originating from R&D server cluster targeting an unknown offshore server during non-working hours.",
    status: "RESOLVED",
    severity: "HIGH",
    assignedInvestigator: "Rohan Das, Network Forensics Expert",
    incidentType: "Data Theft / Insider Threat",
    affectedSystems: ["RD-Server-Node-09", "Core-Boundary-Firewall"],
    createdAt: "2026-06-20T11:00:00Z",
    updatedAt: "2026-06-21T15:30:00Z",
    documents: [
      {
        id: "doc-4",
        name: "exfiltration_boundary_logs.csv",
        size: "2.1 MB",
        mimeType: "text/csv",
        uploadedAt: "2026-06-20T12:30:00Z",
        uploadedBy: "Rohan Das",
        fileContentPreview: "Timestamp,Source,Destination,BytesTransferred,Protocol\n2026-06-20T03:14:22,10.150.14.9,203.0.113.88,4329241,TCP/HTTPS"
      }
    ],
    logsTimeline: [
      { timestamp: "2026-06-20T11:00:00Z", action: "Exfiltration alarm triggered", investigator: "Trinetra Boundary Firewall Agent" },
      { timestamp: "2026-06-20T11:45:00Z", action: "Blocked target destination IP 203.0.113.88", investigator: "Rohan Das" },
      { timestamp: "2026-06-21T14:00:00Z", action: "Identified compromised workstation credentials belonging to external contractor", investigator: "Rohan Das" },
      { timestamp: "2026-06-21T15:30:00Z", action: "Credential suspended, CAD cluster firewall rules hardened, incident resolved.", investigator: "Rohan Das" }
    ]
  }
];

let alertsList: AlertMessage[] = [
  {
    id: "alert-1",
    timestamp: new Date(Date.now() - 30 * 1000).toISOString(),
    sourceIp: "185.220.101.5",
    type: "SQL Injection Probe",
    severity: "CRITICAL",
    message: "Frequent SQL-injection attempt keywords (UNION, SELECT, WHERE 1=1) targeting administrative login forms",
    status: "ACTIVE",
    attackVector: "Web Application Port 443"
  },
  {
    id: "alert-2",
    timestamp: new Date(Date.now() - 120 * 1000).toISOString(),
    sourceIp: "210.14.99.141",
    type: "Brute Force SSH Attack",
    severity: "HIGH",
    message: "Over 450 SSH login failures recorded on system management console using usernames root, admin, oracle",
    status: "ACTIVE",
    attackVector: "SSH Port 22"
  },
  {
    id: "alert-3",
    timestamp: new Date(Date.now() - 600 * 1000).toISOString(),
    sourceIp: "192.168.1.1",
    type: "Internal Network Scanner",
    severity: "MEDIUM",
    message: "Abnormal ICMP echo flood pinging hostnames in subnet range 10.150.x.x - probable network scanning behavior",
    status: "ACTIVE",
    attackVector: "Internal LAN Switched Gate"
  },
  {
    id: "alert-4",
    timestamp: new Date(Date.now() - 1800 * 1000).toISOString(),
    sourceIp: "103.45.14.90",
    type: "Log File Integrity Modification",
    severity: "LOW",
    message: "Syslog rotation manually modified in developer container template server-node-B",
    status: "DISMISSED",
    attackVector: "Kubernetes Local Terminal Admin"
  }
];

let chatsList: ChatMessage[] = [
  { id: "chat-1", sender: "Vikram Rathore", badge: "Senior Lead", message: "Team, please be advised: We are verifying raw memory data from TR-2026-101. Ananya, please run threat hunting for ransomware variants.", timestamp: "2026-06-22T06:45:00Z" },
  { id: "chat-2", sender: "Ananya Roy", badge: "Threat Hunter", message: "Starting log trace now. I am launching the signature comparison engine against the LockBit decryptor catalog.", timestamp: "2026-06-22T06:50:00Z" },
  { id: "chat-3", sender: "Rohan Das", badge: "Network Forensics", message: "Double-checked external relays. No outbound active handshakes on billing. Good news.", timestamp: "2026-06-22T06:52:00Z" }
];

// Lazy Initialization of Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    // Check if key is available and if it has a real value (not the instruction template string)
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// REST APIs section

// 1. Cases endpoints
app.get("/api/cases", (req, res) => {
  res.json(casesList);
});

app.post("/api/cases", (req, res) => {
  const { title, description, severity, assignedInvestigator, incidentType, affectedSystems } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
    return;
  }
  const newCase: Case = {
    id: `TR-2026-${Math.floor(100 + Math.random() * 900)}`,
    title,
    description,
    status: "OPEN",
    severity: severity || "MEDIUM",
    assignedInvestigator: assignedInvestigator || "Assigned Investigator",
    incidentType: incidentType || "General Incident Investigation",
    affectedSystems: Array.isArray(affectedSystems) ? affectedSystems : [affectedSystems || "General System network"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    documents: [],
    logsTimeline: [
      { timestamp: new Date().toISOString(), action: "Case opened manually by Investigator", investigator: assignedInvestigator || "System Desk" }
    ]
  };

  casesList.unshift(newCase);
  res.status(201).json(newCase);
});

// Update Case Status & Add Log Entry
app.post("/api/cases/:id/timeline", (req, res) => {
  const caseId = req.params.id;
  const { action, investigator, status } = req.body;
  const currentCase = casesList.find(c => c.id === caseId);

  if (!currentCase) {
    res.status(404).json({ error: "Case not found" });
    return;
  }

  if (action && investigator) {
    currentCase.logsTimeline.push({
      timestamp: new Date().toISOString(),
      action,
      investigator
    });
  }

  if (status) {
    currentCase.status = status;
    currentCase.logsTimeline.push({
      timestamp: new Date().toISOString(),
      action: `Case status changed to ${status}`,
      investigator: investigator || "System Auditor"
    });
  }

  currentCase.updatedAt = new Date().toISOString();
  res.json(currentCase);
});

// Document Upload inside Case (Stores metadata & preview in in-memory list)
app.post("/api/cases/:id/documents", (req, res) => {
  const caseId = req.params.id;
  const { name, size, mimeType, fileContentBase64, uploadedBy } = req.body;
  const currentCase = casesList.find(c => c.id === caseId);

  if (!currentCase) {
    res.status(404).json({ error: "Case not found" });
    return;
  }

  const newDoc: CaseDocument = {
    id: `doc-${Date.now()}`,
    name: name || "evidence-unidentified.log",
    size: size || "Unknown",
    mimeType: mimeType || "application/octet-stream",
    uploadedAt: new Date().toISOString(),
    uploadedBy: uploadedBy || "Forensic Operator",
    fileContentPreview: fileContentBase64 ? fileContentBase64.substring(0, 200) + "..." : "Forensic integrity secured - Hash Match OK"
  };

  currentCase.documents.push(newDoc);
  currentCase.logsTimeline.push({
    timestamp: new Date().toISOString(),
    action: `Secure document evidence uploaded: ${newDoc.name}`,
    investigator: uploadedBy || "Forensic Operator"
  });
  currentCase.updatedAt = new Date().toISOString();

  // Also auto-add an intelligence alert for the team
  alertsList.unshift({
    id: `alert-${Date.now()}`,
    timestamp: new Date().toISOString(),
    sourceIp: "TR-INVESTIGATOR",
    type: "Forensic Evidence Uploaded",
    severity: "LOW",
    message: `Secure file ${newDoc.name} registered for case ${currentCase.id}. Processing sandboxing evaluation automatically...`,
    status: "ACTIVE",
    attackVector: "Forensic Portal Upload"
  });

  res.status(201).json(currentCase);
});

// 2. Monitoring Alerts API
app.get("/api/alerts", (req, res) => {
  res.json(alertsList);
});

app.post("/api/alerts/dismiss", (req, res) => {
  const { id } = req.body;
  const target = alertsList.find(a => a.id === id);
  if (target) {
    target.status = "DISMISSED";
  }
  res.json({ success: true, alerts: alertsList });
});

// Inject simulated cyberattack triggers for Demo live monitoring
app.post("/api/alerts/simulate", (req, res) => {
  const attacksDescription = [
    { type: "DDoS Syn-Flood Attack", msg: "Traffic spikes detected over 3.2 Gbps on frontend routing servers originating from botnets.", severity: "HIGH", vector: "Firewall Node-C" },
    { type: "Malware Beaconing Check", msg: "Host 10.150.32.11 initiated outbound beacons targeting malicious Command & Control (C2) domain system.", severity: "CRITICAL", vector: "IDS Agent 1.9" },
    { type: "Unauthorized Access Privilege Escalation", msg: "Local Docker container root user elevated context boundaries via system vulnerabilities.", severity: "HIGH", vector: "SecRuntime Agent" },
    { type: "XSS Infiltration Attempt", msg: "Cross-Site Scripting script injection query found on search router payload.", severity: "MEDIUM", vector: "WAF Proxy" }
  ];

  const randAttack = attacksDescription[Math.floor(Math.random() * attacksDescription.length)];
  const simulatedAlert: AlertMessage = {
    id: `alert-${Date.now()}`,
    timestamp: new Date().toISOString(),
    sourceIp: `${Math.floor(45 + Math.random() * 150)}.${Math.floor(10 + Math.random() * 200)}.${Math.floor(10 + Math.random() * 250)}.${Math.floor(1 + Math.random() * 254)}`,
    type: randAttack.type,
    severity: randAttack.severity as any,
    message: randAttack.msg,
    status: "ACTIVE",
    attackVector: randAttack.vector
  };

  alertsList.unshift(simulatedAlert);
  res.json(simulatedAlert);
});

// 3. Team Chat Radio APIs
app.get("/api/chat", (req, res) => {
  res.json(chatsList);
});

app.post("/api/chat", (req, res) => {
  const { sender, message, badge } = req.body;
  if (!sender || !message) {
    res.status(400).json({ error: "Sender and message are required" });
    return;
  }
  const newMessage: ChatMessage = {
    id: `chat-${Date.now()}`,
    sender,
    message,
    badge: badge || "Analyst",
    timestamp: new Date().toISOString()
  };
  chatsList.push(newMessage);

  // Keep chat logs sensible sizing
  if (chatsList.length > 50) {
    chatsList.shift();
  }

  res.status(201).json(newMessage);
});

// 4. Copilot Forensic Advisor (Secure server AI helper proxies to Gemini)
app.post("/api/copilot", async (req, res) => {
  const { prompt, history, caseContext } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  const contextGuide = caseContext 
    ? `You are assisting the investigator specifically with Case "${caseContext.title}" (ID: ${caseContext.id}, Status: ${caseContext.status}, Severity: ${caseContext.severity}).\nDescription of the crisis:\n${caseContext.description}\n`
    : `You are assisting the investigator on Trinetra forensic dashboard console. Provide guidance on high-level cyber forensic procedures, networking, malware logs, cyber-laws reference (such as IT Act, forensics best practices, ISO 27001).`;

  const instructions = `
  You are 'Trinetra AI Forensic Copilot', a 24/7 world-class automated digital forensics expert, incident responder, and secure security advisor.
  Your tone is highly analytical, professional, supportive, objective, and deeply helpful.
  ${contextGuide}
  
  When investigators ask you to analyze logs, malicious notes, or trace cyber threats:
  1. Give specific actionable steps following forensic standards (SANS Institute, NIST SP 800-86 standard, ISO/IEC 27037).
  2. Map out potential threat indicators (IOCs).
  3. Offer multi-language friendliness, particularly handling queries that might combine English and Hindi forensics terminology with ease.
  
  Keep your answers highly operational, formatted in elegant markdown, and structured. Do not provide loose assumptions; always flag necessary safety parameters.
  `;

  try {
    const ai = getGeminiClient();
    
    // Construct input with prior context and current question
    let contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.slice(-6).forEach(h => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.message }]
        });
      });
    }
    
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: instructions,
        temperature: 0.7,
      }
    });

    const aiText = response.text || "I apologize, I processed the request but returned an empty response. Let's try restructuring your logs or query.";
    res.json({ message: aiText });

  } catch (error: any) {
    console.error("Gemini Copilot API Error:", error.message);
    
    // Fallback simulation if API key is not configured yet
    const rawPrompt = prompt.toLowerCase();
    let mockResponse = "";
    
    if (rawPrompt.includes("ransomware") || rawPrompt.includes("ransom_compromise_note")) {
      mockResponse = `### [TRINETRA CO-PILOT OFFLINE ADVISORY]
**Ransomware Attack Analysis (LockBit Signature Observed)**

1. **Immediate Boundary Isolation**: 
   - Disconnect the affected server node \`DB-Backup-01.local\` immediately from Subnet-C. Do not shut it down to preserve volatile memory.
2. **Volatile Memory Preservation**:
   - Run a raw dumps command using a tool secure agent to verify processes loaded before encryption. Secure forensic hashes.
3. **IOC & Payload Signature**: 
   - LockBit variant typically utilizes VSS deletion commands (\`vssadmin delete shadows /all /quiet\`). Hard-block backup access credentials immediately.
4. **Legal Compliance**:
   - Document chain of custody for volatile dump hash: \`7b5e431f9ab6c4cfcb3012ba4d1b\` to satisfy judicial forensic standard requirements.

*Note: Trinetra AI is currently running in local fallback protocol because your server API key is not active.*`;
    } else if (rawPrompt.includes("phishing") || rawPrompt.includes("eml") || rawPrompt.includes("headers")) {
      mockResponse = `### [TRINETRA CO-PILOT OFFLINE ADVISORY]
**Phishing Header Forensic Evaluation**

1. **Spoofed Domains Audit**:
   - The relay header reveals an mismatch between sender address \`sec-portal-auth.web\` and genuine internal HR portals. This points to external infrastructure.
2. **Action Plan**:
   - Force password resets on isolated HR stations. Clean session tokens in Active Directory brokers.
3. **WAF Rule Deployment**:
   - Push defensive rule blocking incoming queries with SPF/DKIM validation failures matching this header profile.

*Note: Trinetra AI is currently running in local fallback protocol because your server API key is not active.*`;
    } else {
      mockResponse = `### [TRINETRA Forensic Advisor]
I received your security investigation query: "${prompt}".

**Recommended Action Steps for Global Forensic Operation:**
- **Evidence Integrity**: Capture and record sha256 hash checksums of all logs before editing or analyzing.
- **Trace Outbound IPs**: Check border routing state logs. Look for large byte exchanges.
- **Coordinated Alerting**: Signal other operations centers on this target.

*Note: Set your actual GEMINI_API_KEY in the Secrets panel in Google AI Studio to unlock real-time Gemini 3.5 deep threat intelligence reports.*`;
    }

    res.json({ message: mockResponse, offlineMode: true });
  }
});


// Configure Vite inside Express setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static output files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[TRINETRA SECURE PORT] Full stack backend active on port ${PORT}`);
  });
}

startServer();
