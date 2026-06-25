import React from "react";
import { Briefcase, FileText, CheckCircle, Clock, ShieldCheck, UserCheck, MessageSquare, AlertTriangle, ArrowRight, PlusCircle } from "lucide-react";
import { Project } from "../types";

interface DashboardProps {
  userEmail: string;
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigate: (screen: string) => void;
}

export default function Dashboard({ userEmail, projects, onSelectProject, onNavigate }: DashboardProps) {
  // Compute basic mock stats
  const activeProjectsCount = projects.filter(p => p.status === "Dalam Proses").length;
  const completedProjectsCount = projects.filter(p => p.status === "Selesai").length;
  const totalDocumentsCount = projects.reduce((acc, p) => acc + p.documents.length, 0);

  return (
    <div className="space-y-8 font-sans">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05),transparent_40%)] pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <p className="text-xs text-amber-400 font-mono tracking-widest uppercase">KLIEN PRIORITAS JUSTITIA</p>
          <h2 className="text-2.5xl md:text-3xl font-serif font-bold text-white">Selamat Datang di Workspace Anda</h2>
          <p className="text-sm text-slate-300">
            Akun Anda terhubung sebagai <span className="font-mono text-amber-400">{userEmail}</span>. Seluruh progres hukum terjamin terlindungi.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <button
            onClick={() => onNavigate("justitia_ai")}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs tracking-wide transition-all shadow-md flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" /> Konsultasi Justitia AI
          </button>
          <button
            onClick={() => onNavigate("profile")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium px-4 py-2.5 rounded-xl text-xs border border-slate-700 transition-all"
          >
            Kelola Profil Bisnis
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="bg-amber-100 text-amber-700 p-3 rounded-lg">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Proyek Aktif</p>
            <h4 className="text-2xl font-bold text-slate-900">{activeProjectsCount}</h4>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Selesai Berhasil</p>
            <h4 className="text-2xl font-bold text-slate-900">{completedProjectsCount}</h4>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="bg-blue-100 text-blue-700 p-3 rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Dokumen Terunggah</p>
            <h4 className="text-2xl font-bold text-slate-900">{totalDocumentsCount}</h4>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="bg-purple-100 text-purple-700 p-3 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Kepatuhan Hukum</p>
            <h4 className="text-2xl font-bold text-slate-900 text-emerald-600">85%</h4>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Project tracker & Timeline */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Ongoing Project Monitor */}
        <div className="lg:col-span-8 space-y-6 text-left">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-lg font-serif font-bold text-slate-900">Progres Pengurusan Berkas & Perkara</h3>
            <button
              onClick={() => onNavigate("add_user")}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" /> Daftarkan Proyek/Mitra Baru
            </button>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-amber-500/40 transition-all flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-slate-900 text-amber-400 text-xxs font-mono font-semibold uppercase px-2.5 py-1 rounded">
                      {project.category}
                    </span>
                    <span className={`text-xxs font-semibold px-2.5 py-1 rounded ${
                      project.status === "Selesai"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-xxs text-slate-400 font-mono">ID: {project.id}</span>
                  </div>

                  <div>
                    <h4 className="text-lg font-serif font-bold text-slate-900 hover:text-amber-600 cursor-pointer" onClick={() => onSelectProject(project.id)}>
                      {project.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Tanggal Mulai: {project.startDate}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Progres Penyelesaian Dokumen</span>
                      <span className="font-bold text-slate-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Right side PIC card of Project */}
                <div className="md:w-56 bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200 text-slate-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs">
                      {project.picName.split(" ").slice(0, 2).map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">{project.picName}</p>
                      <p className="text-xxs text-slate-500 font-medium">{project.picRole}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Hubungi PIC</span>
                    <button
                      onClick={() => onSelectProject(project.id)}
                      className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-0.5"
                    >
                      Buka Detail <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Timeline & Activities */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <h3 className="text-lg font-serif font-bold text-slate-900 pb-2 border-b border-slate-100">
            Jadwal & Riwayat Aktivitas
          </h3>

          {/* Timeline component */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
            <div className="relative border-l border-slate-200 pl-6 space-y-6">
              {/* Timeline item 1 */}
              <div className="relative">
                <div className="absolute -left-9 bg-amber-500 text-slate-950 w-6 h-6 rounded-full flex items-center justify-center border border-white text-xxs font-bold">
                  <Clock className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-xxs font-mono text-slate-400 block mb-0.5">BESOK • 10.00 WIB</span>
                  <h5 className="text-xs font-bold text-slate-900">Agenda Penandatanganan Akta Notaris</h5>
                  <p className="text-xxs text-slate-600 mt-0.5">Penandatanganan berkas Perseroan di kantor notaris Justitia rekanan.</p>
                </div>
              </div>

              {/* Timeline item 2 */}
              <div className="relative">
                <div className="absolute -left-9 bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center border border-white text-xxs font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-xxs font-mono text-slate-400 block mb-0.5">25 JUNI 2026</span>
                  <h5 className="text-xs font-bold text-slate-900">Verifikasi Dokumen KTP & NPWP Selesai</h5>
                  <p className="text-xxs text-slate-600 mt-0.5">Tim administrasi kami berhasil mengesahkan seluruh data KTP pemegang saham.</p>
                </div>
              </div>

              {/* Timeline item 3 */}
              <div className="relative">
                <div className="absolute -left-9 bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center border border-white text-xxs font-bold">
                  3
                </div>
                <div>
                  <span className="text-xxs font-mono text-slate-400 block mb-0.5">20 JUNI 2026</span>
                  <h5 className="text-xs font-bold text-slate-900">Pendaftaran Berkas "Pendirian PT ABC"</h5>
                  <p className="text-xxs text-slate-600 mt-0.5">Dokumen registrasi diajukan melalui portal Kemenkumham oleh PIC Andi Wijaya, S.H.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => onNavigate("resolution_center")}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs py-2.5 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Laporkan Kendala (Pusat Resolusi)
              </button>
            </div>
          </div>

          {/* Quick Legal Tip widget */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800 text-white space-y-3 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <ShieldCheck className="w-24 h-24 text-amber-500" />
            </div>
            <p className="text-xxs font-mono text-amber-400 tracking-wider">TIPS HUKUM JUSTITIA AI</p>
            <h5 className="text-xs font-bold">Pentingnya NIB Berbasis Risiko</h5>
            <p className="text-xxs text-slate-300 leading-relaxed">
              OSS RBA kini membagi kepatuhan izin berdasarkan skala risiko usaha (Rendah, Menengah Rendah, Menengah Tinggi, Tinggi). Pelajari KBLI 2020 draf Anda untuk efisiensi modal disetor.
            </p>
            <button
              onClick={() => onNavigate("justitia_ai")}
              className="text-[10px] font-bold text-amber-400 hover:underline flex items-center gap-0.5"
            >
              Tanya Justitia AI <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
