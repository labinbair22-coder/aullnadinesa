import React, { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Bot,
  AlertTriangle,
  User,
  UserPlus,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  ShieldAlert,
  Scale,
  Sparkles
} from "lucide-react";
import { Project, UserProfileInfo } from "./types";
import LandingPage from "./components/LandingPage";
import AuthScreens from "./components/AuthScreens";
import Dashboard from "./components/Dashboard";
import ProjectDetail from "./components/ProjectDetail";
import JustitiaAI from "./components/JustitiaAI";
import ResolutionCenter from "./components/ResolutionCenter";
import UserProfile from "./components/UserProfile";
import AddUser from "./components/AddUser";

export default function App() {
  // Screens navigation routing state
  // "landing" | "login" | "register" | "verify" | "dashboard" | "project_detail" | "justitia_ai" | "resolution_center" | "profile" | "add_user"
  const [currentScreen, setCurrentScreen] = useState<string>("landing");
  const [userEmail, setUserEmail] = useState("klien.umkm@example.com");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Core Dummy Projects State
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "PRJ-9031",
      name: "Pendirian PT Sinergi Nusantara Kreatif",
      category: "Pendirian PT",
      status: "Dalam Proses",
      progress: 60,
      picName: "Andi Wijaya, S.H.",
      picRole: "Senior Corporate Legal Partner",
      clientName: "Aulia Adela",
      startDate: "18 Juni 2026",
      tasks: [
        { id: "T1", title: "Review KTP & NPWP Seluruh Pemegang Saham", status: "done", assignee: "Admin Justitia", dueDate: "20/06/2026" },
        { id: "T2", title: "Pengecekan & Pemesanan Nama PT di AHU", status: "done", assignee: "Andi Wijaya, S.H.", dueDate: "22/06/2026" },
        { id: "T3", title: "Penyusunan Draf Akta Pendirian Notaris", status: "in_progress", assignee: "Andi Wijaya, S.H.", dueDate: "28/06/2026" },
        { id: "T4", title: "Agenda Penandatanganan Akta Notaris (Fisik/Digital)", status: "todo", assignee: "Aulia Adela (Klien)", dueDate: "02/07/2026" },
        { id: "T5", title: "Penerbitan SK Kemenkumham & NIB OSS RBA", status: "todo", assignee: "Andi Wijaya, S.H.", dueDate: "10/07/2026" }
      ],
      documents: [
        { id: "D1", name: "KTP_Direktur_Utama_Andika.pdf", type: "PDF", uploadedAt: "19/06/2026", size: "1.2 MB", status: "verified" },
        { id: "D2", name: "NPWP_Direktur_Utama_Andika.pdf", type: "PDF", uploadedAt: "19/06/2026", size: "1.1 MB", status: "verified" },
        { id: "D3", name: "Draf_Awal_Anggaran_Dasar_v1.pdf", type: "PDF", uploadedAt: "24/06/2026", size: "2.4 MB", status: "pending_review" }
      ]
    },
    {
      id: "PRJ-8812",
      name: "Pendaftaran Merek Dagang Kopi Nusantara",
      category: "Pendaftaran Merek HKI",
      status: "Selesai",
      progress: 100,
      picName: "Andi Wijaya, S.H.",
      picRole: "Senior Corporate Legal Partner",
      clientName: "Aulia Adela",
      startDate: "10 April 2026",
      tasks: [
        { id: "U1", title: "Penelusuran Merek Dagang Terdaftar di DJKI", status: "done", assignee: "Andi Wijaya, S.H.", dueDate: "12/04/2026" },
        { id: "U2", title: "Penyusunan Formulir & Deskripsi Kelas Barang", status: "done", assignee: "Andi Wijaya, S.H.", dueDate: "15/04/2026" },
        { id: "U3", title: "Penyetoran PNBP Merek Kemenkumham", status: "done", assignee: "Admin Justitia", dueDate: "18/04/2026" },
        { id: "U4", title: "Penerbitan Sertifikat HKI Merek Dagang Resmi", status: "done", assignee: "Andi Wijaya, S.H.", dueDate: "25/04/2026" }
      ],
      documents: [
        { id: "C1", name: "Sertifikat_Merek_Kopi_Nusantara_DJKI.pdf", type: "PDF", uploadedAt: "26/04/2026", size: "3.2 MB", status: "verified" },
        { id: "C2", name: "Bukti_Setor_PNBP_Kemenkumham.pdf", type: "PDF", uploadedAt: "18/04/2026", size: "850 KB", status: "verified" }
      ]
    }
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>("PRJ-9031");

  // User profile state
  const [profile, setProfile] = useState<UserProfileInfo>({
    fullName: "Aulia Adela",
    email: "aulia.adela@gmail.com",
    phone: "0812-9900-1122",
    businessName: "PT Sinergi Nusantara Kreatif",
    businessSector: "Pengembangan Perangkat Lunak & UMKM Digital",
    nib: "9120309123841",
    legalStatus: "Aktif (OSS RBA)",
    address: "Sudirman Central Business District (SCBD), Gedung Treasury Tower Lt. 18, Jakarta Selatan, DKI Jakarta 12190"
  });

  // Handler to update project status, tasks, or documents
  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  // Auth screen handlers
  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentScreen("dashboard");
  };

  const handleRegisterSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setUserEmail("");
    setCurrentScreen("landing");
  };

  // Helper to get active project object
  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Check if current screen is "public" (no dashboard wrapper)
  const isPublicScreen = ["landing", "login", "register", "verify"].includes(currentScreen);

  // Map screen key to scannable titles
  const screenTitleMap: Record<string, string> = {
    dashboard: "Workspace Klien",
    project_detail: `Manajemen Proyek - ${activeProject?.name}`,
    justitia_ai: "Justitia AI - Asisten Hukum",
    resolution_center: "Pusat Resolusi & FAQ",
    profile: "Profil Pengguna & Bisnis",
    add_user: "Tambah Pengguna Baru"
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. PUBLIC SCREEN CONTROLLER */}
      {isPublicScreen ? (
        <div className="relative">
          {currentScreen === "landing" && (
            <LandingPage onNavigate={(scr) => setCurrentScreen(scr)} />
          )}
          {["login", "register", "verify"].includes(currentScreen) && (
            <AuthScreens
              initialMode={currentScreen as "login" | "register" | "verify"}
              onLoginSuccess={handleLoginSuccess}
              onRegisterSuccess={handleRegisterSuccess}
              onBackToLanding={() => setCurrentScreen("landing")}
            />
          )}
        </div>
      ) : (
        /* 2. AUTHENTICATED CORPORATE WORKSPACE (WITH SIDEBAR) */
        <div className="flex min-h-screen relative">
          {/* Collapsible Sidebar */}
          <aside
            className={`bg-slate-900 text-slate-100 flex flex-col justify-between border-r border-slate-800 transition-all duration-300 z-40 shrink-0 ${
              sidebarOpen ? "w-64" : "w-20"
            }`}
          >
            <div className="space-y-6">
              {/* Brand Logo Header */}
              <div className="flex items-center gap-3 p-5 border-b border-slate-800/80">
                <div className="bg-amber-500 text-slate-950 font-serif font-bold text-lg p-1.5 rounded-lg shrink-0">
                  JP
                </div>
                {sidebarOpen && (
                  <div className="text-left">
                    <h2 className="font-display font-semibold text-xs tracking-wider text-amber-400">JUSTITIA PARTNERS</h2>
                    <p className="text-[9px] text-slate-400 tracking-widest uppercase">Layanan Hukum Terpercaya</p>
                  </div>
                )}
              </div>

              {/* Sidebar Menu Items */}
              <nav className="px-3 space-y-1 text-left">
                {[
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "project_detail", label: "Detail Proyek", icon: Briefcase },
                  { id: "justitia_ai", label: "Justitia AI", icon: Bot },
                  { id: "resolution_center", label: "Pusat Resolusi", icon: AlertTriangle },
                  { id: "profile", label: "Profil Bisnis", icon: User },
                  { id: "add_user", label: "Tambah Pengguna", icon: UserPlus }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentScreen(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5 shrink-0" />
                      {sidebarOpen && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Profile and Logout Panel */}
            <div className="p-4 border-t border-slate-800/80 space-y-3">
              {sidebarOpen && (
                <div className="flex items-center gap-2.5 bg-slate-950/45 p-3 rounded-xl border border-slate-800 text-left">
                  <div className="bg-amber-500 text-slate-950 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                    AA
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-200 truncate">{profile.fullName}</p>
                    <p className="text-[10px] text-amber-400/80 truncate font-mono">Client / MSME Owner</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-slate-400 hover:text-red-400 font-semibold transition-colors hover:bg-slate-800/50 rounded-lg"
              >
                <LogOut className="w-4.5 h-4.5 shrink-0" />
                {sidebarOpen && <span>Keluar Akun</span>}
              </button>
            </div>
          </aside>

          {/* Main workspace viewport */}
          <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
            {/* Upper Navigation Header */}
            <header className="bg-white border-b border-slate-200/80 h-16 flex items-center justify-between px-6 md:px-8 shrink-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                  title="Toggle Sidebar"
                >
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <div className="text-left">
                  <h1 className="text-sm font-semibold text-slate-900 tracking-tight">
                    {screenTitleMap[currentScreen] || "Workspace Utama"}
                  </h1>
                  <p className="text-[10px] text-slate-400 font-medium font-mono hidden sm:block">
                    PROYEK AKTIF: {activeProject?.name}
                  </p>
                </div>
              </div>

              {/* Top right notification actions */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-slate-100 text-slate-800 text-xxs font-semibold px-3 py-1 rounded-full border border-slate-200">
                  <Scale className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span>Kepatuhan Hukum Indonesia Aktif</span>
                </div>

                <button
                  onClick={() => alert("Simulasi Notifikasi: 1 berkas baru ditelaah oleh Notaris Rekanan.")}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative"
                >
                  <Bell className="w-4.5 h-4.5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
                </button>
              </div>
            </header>

            {/* Viewport Content Area */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-6xl mx-auto">
                {currentScreen === "dashboard" && (
                  <Dashboard
                    userEmail={userEmail}
                    projects={projects}
                    onSelectProject={(id) => {
                      setSelectedProjectId(id);
                      setCurrentScreen("project_detail");
                    }}
                    onNavigate={(scr) => setCurrentScreen(scr)}
                  />
                )}

                {currentScreen === "project_detail" && (
                  <ProjectDetail
                    project={activeProject}
                    onBack={() => setCurrentScreen("dashboard")}
                    onUpdateProject={handleUpdateProject}
                  />
                )}

                {currentScreen === "justitia_ai" && <JustitiaAI />}

                {currentScreen === "resolution_center" && <ResolutionCenter />}

                {currentScreen === "profile" && (
                  <UserProfile
                    initialProfile={profile}
                    onSaveProfile={(prof) => setProfile(prof)}
                  />
                )}

                {currentScreen === "add_user" && <AddUser />}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* 3. FLOATING DEVELOPER PROTO-RAIL (SUBTLE PROTOTYPING ACCESSOR) */}
      <div className="fixed bottom-4 right-4 z-50 bg-slate-900/90 text-white p-3 rounded-2xl border border-amber-500/30 backdrop-blur-md shadow-2xl flex items-center gap-2 max-w-[95vw] overflow-x-auto gold-glow">
        <div className="flex items-center gap-1 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg text-[9px] font-bold font-mono tracking-wider uppercase shrink-0">
          <Sparkles className="w-3 h-3" /> DEMO RAIL
        </div>

        <div className="flex gap-1.5 overflow-x-auto text-[9px] font-semibold tracking-wider uppercase whitespace-nowrap">
          {[
            { id: "landing", label: "1. Landing" },
            { id: "login", label: "2. Login" },
            { id: "register", label: "3. Register" },
            { id: "verify", label: "4. Verify" },
            { id: "dashboard", label: "5. Dashboard" },
            { id: "project_detail", label: "6. Proyek Detail" },
            { id: "justitia_ai", label: "7. Justitia AI" },
            { id: "resolution_center", label: "8. Resolusi" },
            { id: "profile", label: "9. Profile" },
            { id: "add_user", label: "10. Tambah User" }
          ].map((sc) => {
            const isSel = currentScreen === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  if (sc.id === "project_detail") {
                    setSelectedProjectId("PRJ-9031");
                  }
                  setCurrentScreen(sc.id);
                }}
                className={`px-2.5 py-1 rounded transition-colors ${
                  isSel
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                }`}
              >
                {sc.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
