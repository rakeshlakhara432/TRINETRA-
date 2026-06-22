import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  ShieldAlert, 
  Eye, 
  Activity, 
  Terminal, 
  FileCode, 
  UploadCloud, 
  MessageSquare, 
  Send, 
  Bell, 
  Plus, 
  Search, 
  LogOut, 
  RefreshCw, 
  Globe, 
  ChevronRight, 
  Info, 
  X, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Download, 
  PhoneCall,
  Flame,
  Radio,
  Clock,
  Cpu,
  Server,
  Layers,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Translation Arrays
const TRANSLATIONS = {
  en: {
    title: "TRINETRA FORENSICS",
    subtitle: "Cyber Crime Investigation & Operational Monitoring Command Center",
    dashboard: "Operations HUD",
    cases: "Incident Vault",
    threats: "Live Firewalls Feed",
    copilot: "24/7 AI Copilot Advisor",
    chat: "Secured Transceiver",
    alerts: "System Warnings",
    activeIncidents: "Active Forensic Cases",
    criticalIncidents: "Critical Severity",
    highIncidents: "Elevated Danger",
    monitoredNodes: "Monitored Gateway Subnets",
    systemStatus: "Trinetra Node Status",
    online: "SECURE INTEL CHANNEL ACTIVE",
    offline: "OFFLINE ADVISORY MODE",
    loading: "Decrypting System Forensic Streams...",
    searchPlaceholder: "Search case hash, investigator or target hostname...",
    addCase: "Report Cyber Incident",
    assigned: "Lead Forensic Investigator",
    status: "Case Status",
    severity: "Threat Severity",
    affected: "systems compromised",
    newCaseTitle: "Cyber Incident Title",
    newCaseDesc: "Incident Synopsis / Forensic Evidence Logs",
    newCaseType: "Classification (Ransomware, SQLi, Insider, phishing)",
    uploadTitle: "Secure Evidence Document upload",
    dragDropText: "Drag and drop network log, memory raw dump, or binary here, or browse local partition",
    chatPlaceholder: "Transmit telemetry update over secure Trinetra VPN tunnel...",
    aiCopilotWelcome: "Trinetra AI Forensic Copilot. Supply technical log dumps, email structures, malware strings, or forensics compliance queries.",
    alertsCount: "Monitored Threat Signals",
    simulateThreat: "Simulate Network Intrusion scan",
    dismiss: "Acknowledge Warning",
    actionTimeline: "Investigative Chronology",
    logPlaceholder: "Describe immediate forensic observations or containment logs...",
    logBtn: "Update Case Timeline",
    downloadBtn: "Download Credentials Details",
    caseProgress: "Investigation Resolution Progress",
    affectedCount: "Systems Guarded",
    language: "Operational Interface",
    support: "Trinetra Forensic Helpdesk 24/7"
  },
  hi: {
    title: "त्रिनेत्र फोरेंसिक",
    subtitle: "साइबर अपराध जांच और सक्रिय विश्लेषणात्मक कमांड सेंटर",
    dashboard: "ऑपरेशंस हड",
    cases: "इंसिडेंट वॉल्ट",
    threats: "लाइव फ़ायरवॉल फ़ीड",
    copilot: "24/7 एआई कॉपायलट",
    chat: "सुरक्षित ट्रांससीवर",
    alerts: "सिस्टम चेतावनियाँ",
    activeIncidents: "सक्रिय फोरेंसिक मामले",
    criticalIncidents: "गंभीर संकट",
    highIncidents: "उच्च ख़तरा",
    monitoredNodes: "निगरानी किए गए सबनेट्स",
    systemStatus: "त्रिनेत्र स्थिति",
    online: "सुरक्षित डेटा चैनल सक्रिय",
    offline: "ऑफ़लाइन मोड सक्रिय",
    loading: "फोरेंसिक डेटा डिक्रिप्ट किया जा रहा है...",
    searchPlaceholder: "केस हैश, अन्वेषक या उपकरण खोजें...",
    addCase: "साइबर घटना दर्ज करें",
    assigned: "प्रमुख फोरेंसिक अन्वेषक",
    status: "मामले की स्थिति",
    severity: "खतरे की तीव्रता",
    affected: "प्रभावित नेटवर्क उपकरण",
    newCaseTitle: "मामले का मुख्य शीर्षक",
    newCaseDesc: "घटना का संपूर्ण विवरण और तकनीकी लॉग",
    newCaseType: "वर्गीकरण (जैसे रैंसमवेयर, SQLi, फ़िशिंग)",
    uploadTitle: "सुरक्षित दस्तावेज़ी साक्ष्य अपलोड",
    dragDropText: "फोरेंसिक रिपोर्ट, PCAP फ़ाइलें या लॉग डेटा यहाँ खींचें, या लोकल पीसी से चुनें",
    chatPlaceholder: "सुरक्षित त्रिनेत्र वीपीएन टनल पर संदेश संचार करें...",
    aiCopilotWelcome: "त्रिनेत्र एआई फोरेंसिक कॉपायलट में आपका स्वागत है। लॉग फ़ाइलें, ईमेल हेडर या सुरक्षा प्रश्न पूछें।",
    alertsCount: "सक्रिय खतरे की चेतावनियां",
    simulateThreat: "फ़ायरवॉल घुसपैठ सिम्युलेट करें",
    dismiss: "अलर्ट स्वीकार करें",
    actionTimeline: "अन्वेषण क्रम घटनाक्रम",
    logPlaceholder: "तत्काल जांच संबंधी टिप्पणियां या विश्लेषण रिपोर्ट दर्ज करें...",
    logBtn: "मामले के इतिहास को अपडेट करें",
    downloadBtn: "प्रमाणपत्र विवरण डाउनलोड करें",
    caseProgress: "जांच संकल्प प्रगति",
    affectedCount: "सुरक्षित नेटवर्क",
    language: "कार्यकारी भाषा",
    support: "त्रinetra फोरेंसिक हेल्पलाइन 24/7"
  },
  es: {
    title: "TRINETRA FORENSE",
    subtitle: "Centro de Comando de Investigación de Ciberdelitos y Monitoreo Activo",
    dashboard: "Panel de Operaciones HUD",
    cases: "Bóveda de Incidentes",
    threats: "Flujo de Firewalls en Vivo",
    copilot: "Copiloto IA 24/7",
    chat: "Transceptor Seguro",
    alerts: "Advertencias del Sistema",
    activeIncidents: "Casos Forenses Activos",
    criticalIncidents: "Severidad Crítica",
    highIncidents: "Peligro Elevado",
    monitoredNodes: "Subredes de Pasarela Controladas",
    systemStatus: "Estado del Nodo Trinetra",
    online: "MÁS INFO DE INTELIGENCIA ACTIVA",
    offline: "MODO DE SOPORTE FUERA DE LÍNEA",
    loading: "Descifrando Flujos de Sistemas Forenses...",
    searchPlaceholder: "Buscar hash, investigador o host afectado...",
    addCase: "Informar Incidente Cibernético",
    assigned: "Investigador Forense Principal",
    status: "Estado del Caso",
    severity: "Gravedad de Amenaza",
    affected: "sistemas comprometidos",
    newCaseTitle: "Título del Incidente Cibernético",
    newCaseDesc: "Sinopsis del Incidente / Registros de Evidencia",
    newCaseType: "Clasificación (Ransomware, SQLi, Amenaza Interna, Phishing)",
    uploadTitle: "Carga de Evidencia Documental Segura",
    dragDropText: "Arrastre y suelte el registro de red, volcado de memoria raw o binario aquí, o explore su equipo",
    chatPlaceholder: "Transmitir actualización por túnel VPN seguro de Trinetra...",
    aiCopilotWelcome: "Copiloto Forense IA Trinetra. Envíe registros técnicos logs, estructuras de correos, o dudas sobre normativas.",
    alertsCount: "Alertas de Amenazas Monitoreadas",
    simulateThreat: "Simular Invasión de Red",
    dismiss: "Confirmar Advertencia",
    actionTimeline: "Cronología de Investigación",
    logPlaceholder: "Describa observaciones forenses inmediatas o logs de contención...",
    logBtn: "Actualizar Cronología del Caso",
    downloadBtn: "Descargar Detalles de Credenciales",
    caseProgress: "Progreso de Resolución del Incidente",
    affectedCount: "Sistemas Protegidos",
    language: "Interfaz Operativa",
    support: "Helpline de Soporte 24/7"
  }
};

// TS Interfaces (align with server.ts)
interface CaseDocument {
  id: string;
  name: string;
  size: string;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  fileContentPreview?: string;
}

interface CaseLog {
  timestamp: string;
  action: string;
  investigator: string;
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
  logsTimeline: CaseLog[];
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
  badge?: string;
}

export default function App() {
  const [lang, setLang] = useState<"en" | "hi" | "es">("en");
  const [activeTab, setActiveTab] = useState<"dashboard" | "cases" | "alerts" | "chat" | "copilot">("dashboard");
  
  // Real database states retrieved from background API
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  
  // Terminal inputs and draft states
  const [searchQuery, setSearchQuery] = useState("");
  const [chatDraft, setChatDraft] = useState("");
  const [copilotDraft, setCopilotDraft] = useState("");
  const [copilotHistory, setCopilotHistory] = useState<{ sender: 'user' | 'bot'; message: string; timestamp: Date }[]>([]);
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [timelineDraft, setTimelineDraft] = useState("");
  const [timelineStatusUpdate, setTimelineStatusUpdate] = useState<string>("");
  
  // Forms toggle and content
  const [showAddCaseForm, setShowAddCaseForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newSeverity, setNewSeverity] = useState<"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">("MEDIUM");
  const [newType, setNewType] = useState("Ransomware");
  const [newAffected, setNewAffected] = useState("");
  
  // Secure Document parameters
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [fileName, setFileName] = useState("");
  const [filePreBase64, setFilePreBase64] = useState("");
  const [dragActive, setDragActive] = useState(false);
  
  // Support helpdesk call simulator state
  const [activeSupportSession, setActiveSupportSession] = useState(false);
  const [helpdeskTopic, setHelpdeskTopic] = useState("");
  const [currentTicketNo, setCurrentTicketNo] = useState<string | null>(null);

  // General App configuration
  const [toast, setToast] = useState<string | null>(null);
  const [alarmActive, setAlarmActive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Localization shortcut
  const t = TRANSLATIONS[lang];

  // Load and polling mechanisms
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const fetchCases = async () => {
    try {
      const resp = await fetch("/api/cases");
      if (resp.ok) {
        const data = await resp.json();
        setCases(data);
        // Sync selected case if one was open
        if (selectedCase) {
          const fresh = data.find((c: Case) => c.id === selectedCase.id);
          if (fresh) setSelectedCase(fresh);
        }
      }
    } catch (err) {
      console.error("Error loading cases:", err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const resp = await fetch("/api/alerts");
      if (resp.ok) {
        const data = await resp.json();
        setAlerts(data);
        // If there's an active critical alert, turn on security beacon optionally
        const hasCritical = data.some((a: AlertMessage) => a.severity === "CRITICAL" && a.status === "ACTIVE");
        if (hasCritical) {
          setAlarmActive(true);
        } else {
          setAlarmActive(false);
        }
      }
    } catch (err) {
      console.error("Error loading alerts:", err);
    }
  };

  const fetchChats = async () => {
    try {
      const resp = await fetch("/api/chat");
      if (resp.ok) {
        const data = await resp.json();
        setChats(data);
      }
    } catch (err) {
      console.error("Error loading chat messages:", err);
    }
  };

  const refreshAllLogs = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchCases(), fetchAlerts(), fetchChats()]);
    setTimeout(() => setIsRefreshing(false), 800);
    triggerToast("Trinetra operational telemetry successfully synchronized.");
  };

  // Mount effects
  useEffect(() => {
    fetchCases();
    fetchAlerts();
    fetchChats();

    // Setup network monitoring simulation intervals (every 20 seconds mock attack signals ticker)
    const alertInterval = setInterval(() => {
      fetchAlerts();
    }, 15000);

    const chatInterval = setInterval(() => {
      fetchChats();
    }, 7000);

    return () => {
      clearInterval(alertInterval);
      clearInterval(chatInterval);
    };
  }, []);

  // Post Actions
  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) {
      triggerToast("Please provide incident title and forensic log data.");
      return;
    }
    try {
      const resp = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          severity: newSeverity,
          assignedInvestigator: "Major Vikram Rathore, Senior Forensic Lead",
          incidentType: newType,
          affectedSystems: newAffected ? newAffected.split(",").map(s => s.trim()) : ["Network Gateway 1"]
        })
      });
      if (resp.ok) {
        const freshCase = await resp.json();
        setShowAddCaseForm(false);
        setNewTitle("");
        setNewDesc("");
        setNewAffected("");
        fetchCases();
        triggerToast(`Case ${freshCase.id} recorded. Initializing dynamic monitoring bounds.`);
        // auto-select new case
        setSelectedCase(freshCase);
        setActiveTab("cases");
      }
    } catch (err) {
      triggerToast("Failed to transmit incident record to Trinetra Node.");
    }
  };

  const handlePostTimeline = async () => {
    if (!selectedCase || !timelineDraft.trim()) return;
    try {
      const resp = await fetch(`/api/cases/${selectedCase.id}/timeline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: timelineDraft,
          investigator: "Major Vikram Rathore",
          status: timelineStatusUpdate || undefined
        })
      });
      if (resp.ok) {
        setTimelineDraft("");
        setTimelineStatusUpdate("");
        fetchCases();
        triggerToast("Timeline update authorized & sealed.");
      }
    } catch (err) {
      triggerToast("Error updating case history sequence.");
    }
  };

  const simulateIntrusion = async () => {
    try {
      const resp = await fetch("/api/alerts/simulate", { method: "POST" });
      if (resp.ok) {
        const newAlert = await resp.json();
        fetchAlerts();
        triggerToast(`[ALERT TRIGGER] Threat source ${newAlert.sourceIp} generated critical syslog activity.`);
        setAlarmActive(true);
      }
    } catch (err) {
      triggerToast("Simulator handshake failed.");
    }
  };

  const handleDismissAlert = async (id: string) => {
    try {
      const resp = await fetch("/api/alerts/dismiss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (resp.ok) {
        fetchAlerts();
        triggerToast("Alert warning cleared from memory block.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatDraft.trim()) return;
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "Vikram Rathore",
          badge: "Senior Lead",
          message: chatDraft
        })
      });
      if (resp.ok) {
        setChatDraft("");
        fetchChats();
      }
    } catch (err) {
      triggerToast("Transceiver connection loss. Chat failed.");
    }
  };

  const handleSendCopilot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotDraft.trim()) return;
    const userMsg = copilotDraft;
    setCopilotDraft("");

    // Add locally to conversation history
    const updatedHist = [...copilotHistory, { sender: 'user' as const, message: userMsg, timestamp: new Date() }];
    setCopilotHistory(updatedHist);
    setCopilotLoading(true);

    try {
      const resp = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMsg,
          history: updatedHist,
          caseContext: selectedCase ? {
            id: selectedCase.id,
            title: selectedCase.title,
            description: selectedCase.description,
            status: selectedCase.status,
            severity: selectedCase.severity
          } : null
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        setCopilotHistory(prev => [...prev, {
          sender: 'bot' as const,
          message: data.message,
          timestamp: new Date()
        }]);
      } else {
        triggerToast("Secured copilot gateway returned a critical exception code.");
      }
    } catch (err) {
      triggerToast("Communication failure with Trinetra AI.");
    } finally {
      setCopilotLoading(false);
    }
  };

  // Secure File Upload Drag and Drop Simulation Handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    setFileName(file.name);
    // Generate simulated SHA256 while pretending to read
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 30;
      });
    }, 200);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        setFilePreBase64(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const executeSecureUpload = async () => {
    if (!selectedCase || !fileName) {
      triggerToast("No valid forensic target case selected.");
      return;
    }

    try {
      const resp = await fetch(`/api/cases/${selectedCase.id}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fileName,
          size: `${(Math.random() * 200 + 5).toFixed(1)} KB`,
          mimeType: fileName.endsWith(".pcap") ? "application/vnd.tcpdump.pcap" : "text/plain",
          fileContentBase64: filePreBase64 || "SHA256 CHECKSUM SECURED VERIFIED BY TRINETRA CORE",
          uploadedBy: "Major Vikram Rathore"
        })
      });

      if (resp.ok) {
        fetchCases();
        triggerToast(`Secure Evidence Seizure Complete: ${fileName} bound to Case ${selectedCase.id}.`);
        setFileName("");
        setFilePreBase64("");
        setUploadProgress(null);
      }
    } catch (err) {
      triggerToast("Error publishing data into Case Document stream.");
    }
  };

  // Helpdesk Hotline Initiator
  const startIncidentSupportHelpline = (topic: string) => {
    if (!topic.trim()) {
      triggerToast("Enter the emergency threat description.");
      return;
    }
    setActiveSupportSession(true);
    setHelpdeskTopic(topic);
    const ticketNo = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setCurrentTicketNo(ticketNo);
    triggerToast(`Emergency Helpline Activated: Incident Ticket ${ticketNo} scheduled.`);
  };

  // Computed Values
  const activeCasesCount = cases.filter(c => c.status !== "RESOLVED").length;
  const criticalCount = cases.filter(c => c.severity === "CRITICAL" && c.status !== "RESOLVED").length;
  const warningsCount = alerts.filter(a => a.status === "ACTIVE").length;

  const filteredCases = cases.filter(c => {
    const q = searchQuery.toLowerCase();
    return c.title.toLowerCase().includes(q) || 
           c.id.toLowerCase().includes(q) || 
           c.incidentType.toLowerCase().includes(q) || 
           c.assignedInvestigator.toLowerCase().includes(q);
  });

  return (
    <div id="trinetra_master" className="min-h-screen bg-slate-950 flex flex-col font-sans transition-colors duration-300 antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Dynamic Alarm Siren Header Indicator */}
      {alarmActive && (
        <div id="alarm_status_strip" className="bg-red-950 border-b border-red-700 py-1 px-4 text-xs font-mono tracking-widest text-red-100 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block"></span>
            <span>🚨 THREAT SIREM TRIGGERED: UNFILTERED ATTEMPTS DETECTED ON CORE DB SUB-SUBNET</span>
          </div>
          <button 
            id="dismiss_alarm_btn"
            onClick={() => setAlarmActive(false)} 
            className="px-2 py-0.5 bg-red-900/80 hover:bg-red-800 border border-red-600 rounded text-[10px] text-red-200 transition-all font-sans cursor-pointer uppercase font-semibold"
          >
            Mute Alarm
          </button>
        </div>
      )}

      {/* Primary Cyber Navigation Bar */}
      <header id="trinetra_header" className="bg-[#0b1329] border-b border-slate-800 sticky top-0 z-30 shadow-2xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 bg-gradient-to-tr from-cyan-900 to-slate-900 border border-cyan-500/30 rounded-xl">
              <Eye className="w-7 h-7 text-cyan-400 animate-pulse glow-cyan" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border border-slate-950 rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-wider font-mono text-cyan-500 glow-cyan">
                  {t.title}
                </h1>
                <span className="text-[10px] font-mono bg-cyan-900/30 border border-cyan-500/40 text-cyan-300 px-1.5 py-0.5 rounded tracking-widest">
                  v2.8-LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-tight font-mono">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live Synchronizer and Simulators */}
            <button
              id="refresh_analytics_btn"
              onClick={refreshAllLogs}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="font-mono">Sync</span>
            </button>

            <button
              id="trigger_scan_btn"
              onClick={simulateIntrusion}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-950/80 border border-red-900/50 hover:border-red-600 outline-none text-red-300 rounded-lg text-xs font-mono transition-all uppercase cursor-pointer"
              title="Simulates a mock threat log event immediately into the firewalls feed"
            >
              <Flame className="w-3.5 h-3.5 text-red-400 animate-bounce" />
              <span>Simulate Probe</span>
            </button>

            {/* Language Selection Config */}
            <div className="flex bg-slate-900/90 border border-slate-800 p-0.5 rounded-lg">
              {(["en", "hi", "es"] as const).map(l => (
                <button
                  key={l}
                  id={`lang_select_${l}`}
                  onClick={() => {
                    setLang(l);
                    triggerToast(`Localized terminal to ${l === 'en' ? 'English' : l === 'hi' ? 'Hindi (हिन्दी)' : 'Spanish (Español)'}`);
                  }}
                  className={`px-2 py-1 text-[11px] font-mono tracking-tight cursor-pointer font-bold rounded transition-all ${
                    lang === l ? "bg-cyan-500 text-black font-semibold shadow-md" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Investigator Badge status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900/70 border border-slate-800 rounded-lg text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-slate-300 font-medium">Inv. Vikram Rathore</span>
            </div>

          </div>

        </div>
      </header>

      {/* Cybernetic Telemetry Statistics Panel */}
      <section id="telemetry_metrics_bar" className="bg-[#070b19] border-b border-slate-900/60 py-4 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase font-mono tracking-wider text-slate-400">{t.activeIncidents}</p>
              <h3 className="text-2xl font-bold font-mono text-cyan-400 mt-1">{activeCasesCount}</h3>
            </div>
            <div className="p-2 bg-cyan-950/20 rounded-lg border border-cyan-900/50">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase font-mono tracking-wider text-slate-400">{t.criticalIncidents}</p>
              <h3 className="text-2xl font-bold font-mono text-rose-500 mt-1">{criticalCount}</h3>
            </div>
            <div className="p-2 bg-rose-950/20 rounded-lg border border-rose-900/50">
              <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase font-mono tracking-wider text-slate-400">{t.alertsCount}</p>
              <h3 className="text-2xl font-bold font-mono text-amber-500 mt-1">{warningsCount}</h3>
            </div>
            <div className="p-2 bg-amber-950/20 rounded-lg border border-amber-900/50">
              <Bell className="w-5 h-5 text-amber-400 animate-bounce" />
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase font-mono tracking-wider text-slate-400">{t.systemStatus}</p>
              <h3 className="text-xs font-mono text-emerald-400 mt-2 flex items-center gap-1.5 uppercase font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                {t.online}
              </h3>
            </div>
            <div className="p-2 bg-emerald-950/20 rounded-lg border border-emerald-900/50">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

        </div>
      </section>

      {/* Floating System Notification Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 border border-cyan-500/30 text-cyan-200 text-xs py-3 px-4 rounded-xl shadow-2xl flex items-center gap-3 font-mono"
            style={{ boxShadow: "0 10px 40px -10px rgba(6, 182, 212, 0.4)" }}
          >
            <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0 animate-pulse" />
            <div className="flex-1">{toast}</div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-200">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Workspace Sections Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">

        {/* Dynamic Category Navigation HUD */}
        <div className="flex flex-wrap border-b border-slate-800 gap-1.5 p-1 bg-slate-950/90 rounded-xl">
          <button
            id="tab_nav_overview"
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "dashboard" 
                ? "bg-slate-900 text-cyan-400 border-b-2 border-cyan-500" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.dashboard}</span>
          </button>
          <button
            id="tab_nav_cases"
            onClick={() => {
              setActiveTab("cases");
              // default select first case if none selected
              if (!selectedCase && cases.length > 0) {
                setSelectedCase(cases[0]);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "cases" 
                ? "bg-slate-900 text-cyan-400 border-b-2 border-cyan-500" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{t.cases}</span>
          </button>
          <button
            id="tab_nav_alerts"
            onClick={() => setActiveTab("alerts")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer relative ${
              activeTab === "alerts" 
                ? "bg-slate-900 text-cyan-400 border-b-2 border-cyan-500" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>{t.alerts}</span>
            {warningsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-ping"></span>
            )}
          </button>
          <button
            id="tab_nav_chat"
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "chat" 
                ? "bg-slate-900 text-cyan-400 border-b-2 border-cyan-500" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.chat}</span>
          </button>
          <button
            id="tab_nav_copilot"
            onClick={() => setActiveTab("copilot")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "copilot" 
                ? "bg-slate-900 text-cyan-400 border-b-2 border-cyan-500 animate-pulse" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>{t.copilot}</span>
          </button>
        </div>

        {/* View Switch */}
        <div className="flex-1 min-h-[550px]">
          
          {/* TAB 1: OPERATIONS HUD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div id="view_dashboard" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Quick Case Monitor, Reporting Launch */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-cyan-400" />
                      <h2 className="text-lg font-bold font-mono tracking-tight text-slate-100">
                        {t.activeIncidents}
                      </h2>
                    </div>
                    <button
                      id="dashboard_report_btn"
                      onClick={() => setShowAddCaseForm(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-black rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.addCase}</span>
                    </button>
                  </div>

                  <p className="text-slate-400 text-xs mb-3 font-sans">
                    Dynamic view of active cyber forensics and security incidents currently analyzed by Trinetra investigators.
                  </p>

                  <div className="space-y-3">
                    {cases.length === 0 ? (
                      <div className="text-center py-8 text-xs text-slate-500 font-mono">
                        {t.loading}
                      </div>
                    ) : (
                      cases.slice(0, 3).map(c => (
                        <div 
                          key={c.id}
                          id={`quick_case_card_${c.id}`}
                          onClick={() => {
                            setSelectedCase(c);
                            setActiveTab("cases");
                          }}
                          className="bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl cursor-pointer transition-all hover:translate-x-1 group"
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] uppercase font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/80 px-2 py-0.5 rounded font-bold">
                                  {c.id}
                                </span>
                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                                  c.severity === "CRITICAL" ? "bg-red-950 text-red-400 border border-red-900" :
                                  c.severity === "HIGH" ? "bg-orange-950 text-orange-400 border border-orange-900" :
                                  "bg-blue-950 text-blue-400 border border-blue-900"
                                }`}>
                                  {c.severity}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">
                                  Classification: {c.incidentType}
                                </span>
                              </div>
                              <h4 className="text-sm font-semibold tracking-wide text-slate-200 mt-2 group-hover:text-cyan-400 transition-colors">
                                {c.title}
                              </h4>
                              <p className="text-slate-400 text-xs lg:text-[11px] line-clamp-2 mt-1 leading-relaxed">
                                {c.description}
                              </p>
                              <div className="flex gap-4 mt-3 text-[10px] text-slate-500 font-mono">
                                <span>Assigned Lead: {c.assignedInvestigator}</span>
                                <span className="text-cyan-500/80">Files Seized: {c.documents.length}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between self-stretch">
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-bold border border-slate-800">
                                {c.status}
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      id="view_all_cases_btn"
                      onClick={() => {
                        if (cases.length > 0) setSelectedCase(cases[0]);
                        setActiveTab("cases");
                      }}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Explore complete incident vault</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subnet Firewall Status list */}
                <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-cyan-500" />
                      <h2 className="text-lg font-bold font-mono tracking-tight text-slate-100">
                        {t.monitoredNodes}
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">ALL NODES ONLINE</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl relative overflow-hidden">
                      <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Subnet Alpha-X</span>
                      <h4 className="text-xs font-mono font-bold text-slate-200 mt-1">10.150.10.0/24</h4>
                      <p className="text-[10px] text-emerald-400 font-mono mt-2 flex items-center gap-1 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Firewall Secured
                      </p>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl relative overflow-hidden">
                      <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Subnet Beta-DB</span>
                      <h4 className="text-xs font-mono font-bold text-slate-200 mt-1">10.150.32.0/24</h4>
                      <p className="text-[10px] text-emerald-400 font-mono mt-2 flex items-center gap-1 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Scanning logs
                      </p>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl relative overflow-hidden">
                      <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Subnet DMZ-Front</span>
                      <h4 className="text-xs font-mono font-bold text-slate-200 mt-1">10.150.99.0/22</h4>
                      <p className="text-[10px] text-yellow-500 font-mono mt-2 flex items-center gap-1 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                        Elevated traffic
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Firewall Warning Feed, AI Copilot Summary box */}
              <div className="flex flex-col gap-6">

                {/* Secure Warning Logs Feed */}
                <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 shadow-xl flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-amber-500 animate-pulse" />
                      <h2 className="text-lg font-bold font-mono tracking-tight text-slate-100">
                        {t.alerts}
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono bg-red-950 text-red-400 border border-red-900 px-1.5 py-0.5 rounded tracking-widest font-bold">
                      LIVE INTRUSIONS
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs mb-3">
                    Aggregated real-time warnings captured from firewalls, proxy logs, and host IDS sensors.
                  </p>

                  <div className="space-y-3 overflow-y-auto max-h-[300px] flex-1 pr-1">
                    {alerts.length === 0 ? (
                      <p className="text-xs font-mono text-slate-500 text-center py-4">No active threat feeds registered.</p>
                    ) : (
                      alerts.map(a => (
                        <div 
                          key={a.id} 
                          id={`dash_alert_item_${a.id}`}
                          className={`p-3 rounded-lg border text-xs font-mono flex flex-col gap-1.5 transition-all ${
                            a.status === 'DISMISSED' 
                              ? 'bg-slate-900/40 border-slate-900 text-slate-500' 
                              : a.severity === 'CRITICAL'
                                ? 'bg-red-950/20 border-red-900/60 text-red-200' 
                                : 'bg-slate-900/90 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-bold text-slate-400">IP: {a.sourceIp}</span>
                            <span className={`px-1.5 py-0.2 rounded font-bold ${
                              a.severity === 'CRITICAL' ? 'bg-red-950 text-red-400' :
                              a.severity === 'HIGH' ? "bg-orange-950 text-orange-400" :
                              "bg-slate-800 text-slate-400"
                            }`}>
                              {a.severity}
                            </span>
                          </div>
                          <div className="font-bold text-slate-200">{a.type}</div>
                          <p className="text-[10.5px] leading-relaxed break-words text-slate-400">{a.message}</p>
                          <div className="text-[9px] text-slate-500 flex justify-between items-center mt-1">
                            <span>Vector: {a.attackVector}</span>
                            {a.status === 'ACTIVE' && (
                              <button 
                                id={`dismiss_alert_item_btn_${a.id}`}
                                onClick={() => handleDismissAlert(a.id)}
                                className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer font-bold uppercase"
                              >
                                {t.dismiss}
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick AI Forensic Guide Card */}
                <div className="bg-slate-950 border border-slate-850 rounded-xl p-5 shadow-2xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 blur-3xl rounded-full"></div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-950/40 border border-purple-800/80 rounded-xl">
                      <Cpu className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-wide text-slate-100">Trinetra AI Copilot 24/7</h4>
                      <p className="text-[10px] font-mono text-purple-400 uppercase font-bold">Activated Forensic Model</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Need instant ransomware decryption analysis, base64 payload scanning, or suspicious header tracing? Direct access point ready globally.
                  </p>
                  <button
                    id="dash_copilot_launch_btn"
                    onClick={() => setActiveTab("copilot")}
                    className="w-full mt-4 bg-purple-900/40 hover:bg-purple-900/80 border border-purple-800 hover:border-purple-600 text-purple-200 text-xs py-2 rounded-lg font-mono font-bold transition-all cursor-pointer uppercase tracking-tight"
                  >
                    Engage AI Analytics Copilot
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: INCIDENT VAULT & SECURE FILE UPLOADER */}
          {activeTab === "cases" && (
            <div id="view_cases" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left sidebar: Cases selection list */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                
                <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-4 shadow-xl">
                  
                  <div className="flex flex-col gap-2.5 mb-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-widest">
                        {t.cases}
                      </h3>
                      <button
                        id="cases_add_new_btn"
                        onClick={() => setShowAddCaseForm(true)}
                        className="p-1 px-2.5 bg-cyan-600 hover:bg-cyan-500 text-black rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>

                    {/* Integrated Quick Search bar */}
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        id="cases_search_input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                    {filteredCases.map(c => {
                      const isActive = selectedCase?.id === c.id;
                      return (
                        <div
                          key={c.id}
                          id={`case_vault_item_${c.id}`}
                          onClick={() => setSelectedCase(c)}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                            isActive 
                              ? "bg-slate-900 border-cyan-500 shadow-md" 
                              : "bg-slate-950/70 border-slate-900 hover:border-slate-800"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-cyan-400 px-1.5 py-0.5 rounded font-bold">
                              {c.id}
                            </span>
                            <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded uppercase ${
                              c.severity === 'CRITICAL' ? 'bg-red-950 text-red-400' :
                              c.severity === 'HIGH' ? "bg-orange-950 text-orange-400" :
                              "bg-slate-800 text-slate-400"
                            }`}>
                              {c.severity}
                            </span>
                          </div>
                          <h4 className="text-xs font-semibold tracking-wide text-slate-100 mt-2 truncate">
                            {c.title}
                          </h4>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-3">
                            <span className="truncate max-w-[120px]">{c.assignedInvestigator}</span>
                            <span className="uppercase text-slate-400">{c.status}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Standard 24/7 Forensic Support Emergency Hotline Card */}
                <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <PhoneCall className="w-4 h-4 text-cyan-400 animate-bounce" />
                    <h3 className="text-xs font-bold font-mono uppercase tracking-wide text-slate-100">
                      {t.support}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    Instantly provision an emergency forensic investigator ticket on active servers. Specify your emergency details.
                  </p>

                  {!activeSupportSession ? (
                    <div className="flex flex-col gap-2">
                      <input
                        id="support_input_field"
                        type="text"
                        placeholder="Ransomware query, DB lockup, DDoS panic..."
                        className="w-full bg-slate-950 border border-slate-800 rounded py-1.5 px-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            startIncidentSupportHelpline((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }}
                      />
                      <button
                        id="activate_helpline_btn"
                        onClick={() => {
                          const val = (document.getElementById("support_input_field") as HTMLInputElement)?.value;
                          startIncidentSupportHelpline(val || "General Critical Support Request");
                        }}
                        className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 text-xs py-1.5 rounded font-mono font-semibold transition-all cursor-pointer"
                      >
                        Launch Emergency Support Hook
                      </button>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-slate-950 border border-cyan-500/40 rounded-lg">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span>TICKET: {currentTicketNo}</span>
                        <span className="text-emerald-400">CONNECTED</span>
                      </div>
                      <p className="text-slate-100 text-[11px] mt-1 font-mono break-all font-semibold italic">
                        "{helpdeskTopic}"
                      </p>
                      <p className="text-slate-400 text-[10px] mt-2 font-sans">
                        Trinetra Duty Forensic specialist Vikram Rathore has flagged this alert ticket on your operational workspace. Backed up by fallback AI guidance.
                      </p>
                      <button
                        id="cancel_support_btn"
                        onClick={() => {
                          setActiveSupportSession(false);
                          setHelpdeskTopic("");
                          setCurrentTicketNo(null);
                        }}
                        className="mt-3 w-full text-center text-[10px] font-mono text-red-400 hover:text-red-300 font-bold uppercase block tracking-tighter"
                      >
                        Disconnect Support Hook
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Right container: Case analysis details, logs chronicle, documents upload */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {selectedCase ? (
                  <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col gap-6">
                    
                    {/* Title block */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold uppercase bg-slate-950 text-cyan-400 px-2 py-0.5 rounded border border-slate-800">
                            {selectedCase.id}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                            selectedCase.severity === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-900' :
                            selectedCase.severity === 'HIGH' ? "bg-orange-950 text-orange-400 border border-orange-900" :
                            "bg-blue-950 text-blue-400 border border-blue-900"
                          }`}>
                            {selectedCase.severity} Severity
                          </span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-100 mt-2 font-mono">
                          {selectedCase.title}
                        </h2>
                        <p className="text-xs text-slate-400 font-mono mt-1">
                          Classification: <span className="text-slate-300 font-semibold">{selectedCase.incidentType}</span>
                        </p>
                      </div>

                      {/* Status select drop */}
                      <div className="flex flex-col items-start md:items-end gap-1.5">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">{t.status}</span>
                        <select
                          id="case_status_picker"
                          value={selectedCase.status}
                          onChange={async (e) => {
                            const val = e.target.value;
                            try {
                              const resp = await fetch(`/api/cases/${selectedCase.id}/timeline`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  action: `Status manually updated from ${selectedCase.status} to ${val}.`,
                                  investigator: "Major Vikram Rathore",
                                  status: val
                                })
                              });
                              if (resp.ok) {
                                fetchCases();
                                triggerToast(`Status updated to ${val} successfully.`);
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
                        >
                          <option value="OPEN">OPEN / LOGGED</option>
                          <option value="INVESTIGATING">INVESTIGATING</option>
                          <option value="ANALYZING">ANALYZING</option>
                          <option value="CONTAINED">CONTAINED</option>
                          <option value="RESOLVED">RESOLVED</option>
                        </select>
                      </div>
                    </div>

                    {/* Metadata specs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 border border-slate-900 rounded-xl">
                      <div>
                        <span className="text-[10.5px] uppercase font-mono text-slate-500">{t.assigned}</span>
                        <p className="text-xs font-serif text-slate-200 font-medium mt-1">{selectedCase.assignedInvestigator}</p>
                      </div>
                      <div>
                        <span className="text-[10.5px] uppercase font-mono text-slate-500">{t.affected}</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {selectedCase.affectedSystems.map((sys, idx) => (
                            <span key={idx} className="text-[10px] font-mono bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-slate-300">
                              {sys}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Description text area */}
                    <div>
                      <h3 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase mb-2">INCIDENT DESCRIPTION & RAW OBSERVATIONS</h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/40 p-3 rounded-lg border border-slate-900 break-words whitespace-pre-wrap">
                        {selectedCase.description}
                      </p>
                    </div>

                    {/* Case Secure Documents (Forensic Evidence Locker) */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
                          FORENSIC EVIDENCE DUMP LOCKER ({selectedCase.documents.length})
                        </h3>
                        <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 uppercase">
                          <Lock className="w-3 h-3" /> SHA-256 CHECKED
                        </span>
                      </div>

                      {selectedCase.documents.length === 0 ? (
                        <p className="text-xs italic text-slate-500 font-mono bg-slate-950/30 p-4 text-center rounded-lg border border-dashed border-slate-850">
                          No seized payloads or network logs attached to this case. Use vault file loader below.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedCase.documents.map(doc => (
                            <div key={doc.id} className="p-3 bg-slate-950 border border-slate-850 rounded-lg flex items-center justify-between gap-3 font-mono">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <FileCode className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                <div className="min-w-0">
                                  <h5 className="text-[11.5px] font-bold text-slate-200 truncate" title={doc.name}>
                                    {doc.name}
                                  </h5>
                                  <p className="text-[9px] text-slate-500 truncate mt-0.5">
                                    Size: {doc.size} | By: {doc.uploadedBy}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end flex-shrink-0 text-[9px] text-slate-400 gap-1">
                                <span className="bg-emerald-950/80 text-emerald-400 px-1 py-0.2 px-1.5 rounded uppercase font-bold text-[8px] border border-emerald-900/50">
                                  Integrity OK
                                </span>
                                <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* THE SECURE DOCUMENT UPLOAD BOX */}
                      <div className="mt-4">
                        <div 
                          id="evidence_drag_zone"
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          className={`border-2 border-dashed rounded-xl p-4 transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                            dragActive ? "border-cyan-400 bg-cyan-950/20" : "border-slate-800 bg-slate-950/30 hover:border-slate-700"
                          }`}
                        >
                          <UploadCloud className="w-8 h-8 text-cyan-400 animate-pulse mb-2" />
                          <p className="text-xs text-slate-300 font-semibold mb-1">
                            {t.uploadTitle}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            {t.dragDropText}
                          </p>
                          <input
                            id="file_uploader_hidden"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <button
                            id="browse_file_btn"
                            onClick={() => document.getElementById("file_uploader_hidden")?.click()}
                            className="mt-2.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-300 rounded text-xs font-mono transition-all cursor-pointer"
                          >
                            Browse Files
                          </button>
                        </div>

                        {/* File upload staging progress indicator */}
                        {fileName && (
                          <div id="upload_progress_pane" className="mt-3 p-3 bg-slate-950 border border-slate-850 rounded-lg">
                            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                              <span className="text-slate-300 truncate">Preparing: <b>{fileName}</b></span>
                              <span className="text-cyan-400 font-bold">{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden mb-3">
                              <div 
                                className="bg-cyan-500 h-1 transition-all duration-300" 
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-end gap-2.5">
                              <button
                                id="cancel_upload_btn"
                                onClick={() => {
                                  setFileName("");
                                  setFilePreBase64("");
                                  setUploadProgress(null);
                                }}
                                className="px-2 py-1 text-slate-400 text-xs hover:text-slate-200 font-mono cursor-pointer"
                              >
                                Clear
                              </button>
                              <button
                                id="commit_upload_btn"
                                disabled={uploadProgress ? uploadProgress < 100 : true}
                                onClick={executeSecureUpload}
                                className="px-3 py-1 bg-cyan-500 text-black text-xs rounded font-mono font-bold cursor-pointer disabled:opacity-40"
                              >
                                Upload Secure Document Dump
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Timeline Chronicle logs */}
                    <div className="border-t border-slate-800 pt-5">
                      <h3 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase mb-3">
                        {t.actionTimeline} – DEC SECURE LEDGER
                      </h3>

                      <div className="space-y-3 mb-4 max-h-[220px] overflow-y-auto pr-1">
                        {selectedCase.logsTimeline.map((log, index) => (
                          <div key={index} className="pl-4 border-l-2 border-cyan-500/50 py-1 font-mono text-[11px]">
                            <div className="flex items-center gap-2 text-slate-500">
                              <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                              <span>•</span>
                              <span className="text-slate-300">{log.investigator}</span>
                            </div>
                            <p className="text-slate-300 mt-0.5">{log.action}</p>
                          </div>
                        ))}
                      </div>

                      {/* Log submission form */}
                      <div className="flex flex-col gap-2.5">
                        <textarea
                          id="log_input_textarea"
                          rows={2}
                          value={timelineDraft}
                          onChange={(e) => setTimelineDraft(e.target.value)}
                          placeholder={t.logPlaceholder}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-500">Status Update:</span>
                            <select
                              id="timeline_status_select"
                              value={timelineStatusUpdate}
                              onChange={(e) => setTimelineStatusUpdate(e.target.value)}
                              className="bg-slate-950 border border-slate-850 rounded px-2 py-0.5 text-[10px] font-mono text-cyan-400"
                            >
                              <option value="">No status change</option>
                              <option value="OPEN">OPEN / LOGGED</option>
                              <option value="INVESTIGATING">INVESTIGATING</option>
                              <option value="ANALYZING">ANALYZING</option>
                              <option value="CONTAINED">CONTAINED</option>
                              <option value="RESOLVED">RESOLVED</option>
                            </select>
                          </div>
                          <button
                            id="submit_log_btn"
                            onClick={handlePostTimeline}
                            disabled={!timelineDraft.trim()}
                            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-black rounded text-xs font-mono font-bold tracking-tight disabled:opacity-40 transition-all cursor-pointer"
                          >
                            {t.logBtn}
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                ) : (
                  <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-8 text-center text-slate-500 font-mono">
                    Please select an incident from the security vault list or register a new transaction log report.
                  </div>
                )}

              </div>

            </div>
          )}

          {/* TAB 3: LIVE SECURE WARNING CHRONICLES (FIREWALL FEEDS) */}
          {activeTab === "alerts" && (
            <div id="view_alerts" className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 mb-4 gap-4">
                <div>
                  <h2 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-tight">
                    {t.threats}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete listing of real-time monitoring alerts generated by intrusion detection software (IDS) sensors and endpoints.
                  </p>
                </div>
                <button
                  id="tab_alerts_simulate_btn"
                  onClick={simulateIntrusion}
                  className="px-3.5 py-2 bg-gradient-to-r from-red-950 to-orange-950 border border-red-700/60 hover:border-red-500 text-red-200 rounded-lg text-xs font-mono tracking-tight uppercase cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>Push Dynamic Penetration Probe</span>
                </button>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {alerts.length === 0 ? (
                  <p className="text-slate-500 text-center py-6 font-mono text-xs">No threats detected during this monitoring epoch.</p>
                ) : (
                  alerts.map(a => (
                    <div 
                      key={a.id} 
                      id={`alerts_list_item_${a.id}`}
                      className={`p-4 rounded-xl border font-mono flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${
                        a.status === 'DISMISSED' 
                          ? 'bg-slate-900/30 border-slate-900 text-slate-500' 
                          : a.severity === 'CRITICAL'
                            ? 'bg-red-950/20 border-red-900/40 text-red-100' 
                            : 'bg-slate-950 border-slate-850 text-slate-300'
                      }`}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap text-xs">
                          <span className="text-[10px] bg-slate-900 border border-slate-850 text-cyan-400 px-1.5 py-0.2 rounded font-bold">
                            IP: {a.sourceIp}
                          </span>
                          <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                            a.severity === 'CRITICAL' ? 'bg-red-950 text-red-400' :
                            a.severity === 'HIGH' ? "bg-orange-950 text-orange-400" :
                            "bg-slate-800 text-slate-400"
                          }`}>
                            {a.severity}
                          </span>
                          <span className="text-slate-500 text-[10.5px]">
                            {new Date(a.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-1">{a.type}</h4>
                        <p className="text-[11.5px] leading-relaxed text-slate-400 pb-1">{a.message}</p>
                        <div className="text-[10px] text-slate-500 flex items-center gap-4">
                          <span>Attack Vector: <b>{a.attackVector}</b></span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 self-stretch flex items-end md:items-start justify-between flex-row md:flex-col gap-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          {a.status}
                        </span>
                        {a.status === 'ACTIVE' && (
                          <button
                            id={`alerts_list_dismiss_btn_${a.id}`}
                            onClick={() => handleDismissAlert(a.id)}
                            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold hover:underline cursor-pointer uppercase"
                          >
                            Dismiss
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SECURE TEAM TRANSCEIVER CHAT ROOM */}
          {activeTab === "chat" && (
            <div id="view_chat" className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col h-[520px]">
              <div className="border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-tight">
                    {t.chat}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    End-to-end encrypted peer channel for Trinetra forensic investigators. Use to coordinate responses.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-emerald-400 font-bold uppercase">SECURED BY TRINETRA-VPN</span>
                </div>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3.5 pr-1.5 max-h-[380px]">
                {chats.map(msg => {
                  const isMe = msg.sender === "Vikram Rathore" || msg.sender.includes("Vikram");
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col max-w-[85%] ${
                        isMe ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-0.5">
                        <span className="font-bold text-slate-300">{msg.sender}</span>
                        {msg.badge && (
                          <span className="bg-slate-950 text-cyan-400 border border-slate-800 text-[8px] font-bold px-1 py-0.2 rounded uppercase">
                            {msg.badge}
                          </span>
                        )}
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className={`p-3 rounded-xl text-xs font-mono ${
                        isMe 
                          ? "bg-cyan-950/40 border border-cyan-800/80 text-cyan-100 rounded-tr-none" 
                          : "bg-slate-950 border border-slate-850 text-slate-200 rounded-tl-none"
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat entry form */}
              <form id="secure_chat_form" onSubmit={handleSendChat} className="flex gap-2 border-t border-slate-800 pt-3">
                <input
                  id="chat_input_text"
                  type="text"
                  value={chatDraft}
                  onChange={(e) => setChatDraft(e.target.value)}
                  placeholder={t.chatPlaceholder}
                  className="flex-1 bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                />
                <button
                  id="send_chat_msg_btn"
                  type="submit"
                  disabled={!chatDraft.trim()}
                  className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-black px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Transmit</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: 24/7 AI FORENSIC COPILOT ADVISOR */}
          {activeTab === "copilot" && (
            <div id="view_copilot" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Left guidelines: operational templates */}
              <div className="lg:col-span-1 flex flex-col gap-4">
                <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-4 shadow-xl">
                  <h3 className="text-xs font-bold font-mono tracking-widest text-slate-100 uppercase mb-3">
                    FORENSIC PLAYBOOKS
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                    Select a forensic investigation blueprint topic below to feed instantly into Trinetra AI Copilot for complete analytical resolution templates.
                  </p>

                  <div className="space-y-2">
                    <button
                      id="playbook_btn_ransomware"
                      onClick={() => {
                        setCopilotDraft("Recommend standard operating procedure (SOP) under SANS for recovering backups from ransomware infection without paying key decryption ransom.");
                        triggerToast("Loaded Ransomware Playbook template.");
                      }}
                      className="w-full text-left p-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-200 text-xs font-mono rounded-lg transition-all cursor-pointer block"
                    >
                      🛡️ SANS Ransomware SOP
                    </button>
                    <button
                      id="playbook_btn_phishing"
                      onClick={() => {
                        setCopilotDraft("How do we forensically verify spoofed DKIM, SPF, or DMARC record values from questionable HR-themed phishing email headers? Write down the checklist.");
                        triggerToast("Loaded Phishing Header Checklist.");
                      }}
                      className="w-full text-left p-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-200 text-xs font-mono rounded-lg transition-all cursor-pointer block"
                    >
                      📧 Spoofed Email Check
                    </button>
                    <button
                      id="playbook_btn_laws"
                      onClick={() => {
                        setCopilotDraft("Explain key cyber forensic standard practices under IT laws or international forensic frameworks like ISO/IEC 27037 for chain of custody preservation.");
                        triggerToast("Loaded Legal Handshake template.");
                      }}
                      className="w-full text-left p-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-200 text-xs font-mono rounded-lg transition-all cursor-pointer block"
                    >
                      ⚖️ Forensics Laws & ISO
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-900 p-4 rounded-xl text-xs font-mono text-slate-400">
                  <div className="text-cyan-400 font-bold mb-1 uppercase text-[10px]">Activated Engine:</div>
                  <p>gemini-3.5-flash</p>
                  <div className="text-purple-400 font-bold mt-3 mb-1 uppercase text-[10px]">Telemetry Anchor:</div>
                  <p>aistudio-build-telemetry</p>
                  <p className="text-[10px] text-slate-500 mt-2 leading-tight">
                    All conversations with Trinetra AI are securely logged server-side for forensic audit checks.
                  </p>
                </div>
              </div>

              {/* Right: Conversation pane */}
              <div className="lg:col-span-3 bg-[#0b1329] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col h-[520px]">
                <div className="border-b border-slate-800 pb-3 mb-3.5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-purple-400 animate-pulse glow-cyan" />
                    <div>
                      <h4 className="text-sm font-bold font-mono text-slate-100">
                        TRINETRA AI FORENSIC ADV-COPILOT
                      </h4>
                      {selectedCase && (
                        <p className="text-[10px] text-cyan-400 font-mono mt-0.5">
                          Active context: <b>{selectedCase.id}</b>
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    id="clear_copilot_chat_btn"
                    onClick={() => {
                      setCopilotHistory([]);
                      triggerToast("Copilot chat index reconstructed.");
                    }}
                    className="text-[10px] font-mono text-slate-500 hover:text-slate-300 cursor-pointer uppercase"
                  >
                    Clear History
                  </button>
                </div>

                {/* Messages feed */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1">
                  {copilotHistory.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-950/30 border border-dashed border-slate-850 rounded-xl">
                      <Terminal className="w-10 h-10 text-purple-400 animate-pulse mb-3" />
                      <p className="text-xs text-slate-300 max-w-md font-mono leading-relaxed">
                        {t.aiCopilotWelcome}
                      </p>
                    </div>
                  ) : (
                    copilotHistory.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3.5 rounded-xl border font-mono text-xs leading-relaxed ${
                          item.sender === 'user' 
                            ? "bg-slate-950 border-slate-850 text-slate-200" 
                            : "bg-purple-950/20 border-purple-900/45 text-purple-100 shadow-lg"
                        }`}
                      >
                        <div className="text-[9px] font-bold uppercase mb-2 flex items-center justify-between text-slate-500">
                          <span>{item.sender === 'user' ? 'Lead Investigator Vikram' : 'Trinetra Copilot Advisor'}</span>
                          <span>{item.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <div className="whitespace-pre-wrap break-words markdown-body">
                          {item.message}
                        </div>
                      </div>
                    ))
                  )}
                  {copilotLoading && (
                    <div id="ai_loading_state" className="p-3 bg-purple-950/30 border border-purple-900/60 text-purple-200 text-xs font-mono rounded-xl animate-pulse flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                      <span>{t.loading}</span>
                    </div>
                  )}
                </div>

                {/* Input prompt bar */}
                <form id="copilot_chat_form" onSubmit={handleSendCopilot} className="flex gap-2 border-t border-slate-800 pt-3">
                  <input
                    id="copilot_input_prompt"
                    type="text"
                    value={copilotDraft}
                    onChange={(e) => setCopilotDraft(e.target.value)}
                    placeholder="Ask about active telemetry, raw memory dumps, ransomware decryptions, etc..."
                    className="flex-1 bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    id="commit_copilot_prompt_btn"
                    type="submit"
                    disabled={copilotLoading || !copilotDraft.trim()}
                    className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-black px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* MODAL: REPORT NEW INCIDENT CASE */}
      <AnimatePresence>
        {showAddCaseForm && (
          <div id="add_case_modal_backdrop" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative font-sans"
            >
              <button 
                id="close_case_modal_btn"
                onClick={() => setShowAddCaseForm(false)} 
                className="absolute right-4 top-4 p-1 rounded-full text-slate-500 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="w-6 h-6 text-cyan-400 animate-pulse" />
                <h3 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-tight">
                  {t.addCase}
                </h3>
              </div>

              <form id="create_case_form" onSubmit={handleCreateCase} className="space-y-4 font-mono text-xs">
                
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{t.newCaseTitle}</label>
                  <input
                    id="new_case_title_field"
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Cryptojacking infection targeted on Core Node"
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{t.severity}</label>
                    <select
                      id="new_case_severity_field"
                      value={newSeverity}
                      onChange={(e: any) => setNewSeverity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-cyan-400 font-bold focus:outline-none focus:border-cyan-500"
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                      <option value="CRITICAL">CRITICAL</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Classification Type</label>
                    <select
                      id="new_case_type_field"
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Ransomware / Cryptojacking">Ransomware</option>
                      <option value="SQL Injection Attack / Web Application">SQL Injection (SQLi)</option>
                      <option value="DDoS Denial of Service">DDoS Flood</option>
                      <option value="Insider Threat Data Theft">Insider Threat</option>
                      <option value="Credential Phishing Campaign">Credential Phishing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Impacted Hostnames / System IP List</label>
                  <input
                    id="new_case_affected_field"
                    type="text"
                    value={newAffected}
                    onChange={(e) => setNewAffected(e.target.value)}
                    placeholder="e.g. 10.150.32.14, DB-Prod-West (comma separated)"
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{t.newCaseDesc}</label>
                  <textarea
                    id="new_case_desc_field"
                    required
                    rows={4}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Supply raw log hashes, attack symptoms, timestamp, spoofed links or email structures for secure team investigation..."
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    id="cancel_new_case_btn"
                    type="button"
                    onClick={() => setShowAddCaseForm(false)}
                    className="px-4 py-2 hover:bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer"
                  >
                    Abort
                  </button>
                  <button
                    id="submit_new_case_btn"
                    type="submit"
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-black rounded-lg text-xs font-bold font-mono transition-all cursor-pointer"
                  >
                    Authorize Seizure & Record
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cybernetic HUD Footer */}
      <footer id="trinetra_footer" className="bg-[#030712] border-t border-slate-900 py-6 mt-12 font-mono text-[10.5px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <p className="tracking-widest">
              TRINETRA DIGITAL FORENSIC NETWORKS • OPERATIONAL SECURITY SECURITY COMMAND
            </p>
            <p className="text-slate-650 mt-1 uppercase text-[9.5px]">
              Sealed under judicial cyber- forensics protocols. All sessions active inside secure workspace environment.
            </p>
          </div>
          <div>
            <span className="bg-slate-950/90 border border-slate-850 text-slate-400 text-[10px] px-2 py-1 rounded inline-block font-mono tracking-tight font-bold">
              SYSTEM PORT STATE: 3000 • INCIDENT RECORD INDEX
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
