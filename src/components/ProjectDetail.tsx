import React, { useState } from "react";
import { Kanban, FileText, CheckCircle2, ChevronRight, Upload, Download, Plus, Trash2, ArrowLeft, ShieldAlert } from "lucide-react";
import { Project, Task, LegalDocument } from "../types";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onUpdateProject: (updatedProject: Project) => void;
}

export default function ProjectDetail({ project, onBack, onUpdateProject }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<"kanban" | "documents">("kanban");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("Andi Wijaya");
  const [newDocName, setNewDocName] = useState("");
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Add a task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `TSK-${Date.now().toString().slice(-4)}`,
      title: newTaskTitle,
      status: "todo",
      assignee: newTaskAssignee,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("id-ID"),
    };

    const updatedProject = {
      ...project,
      tasks: [...project.tasks, newTask],
    };
    onUpdateProject(updatedProject);
    setNewTaskTitle("");
  };

  // Move task status
  const handleMoveTask = (taskId: string, newStatus: "todo" | "in_progress" | "done") => {
    const updatedTasks = project.tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: newStatus };
      }
      return t;
    });

    // Recompute progress based on completed tasks
    const completed = updatedTasks.filter((t) => t.status === "done").length;
    const progress = updatedTasks.length ? Math.round((completed / updatedTasks.length) * 100) : 0;

    onUpdateProject({
      ...project,
      tasks: updatedTasks,
      progress,
    });
  };

  // Delete a task
  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = project.tasks.filter((t) => t.id !== taskId);
    const completed = updatedTasks.filter((t) => t.status === "done").length;
    const progress = updatedTasks.length ? Math.round((completed / updatedTasks.length) * 100) : 0;

    onUpdateProject({
      ...project,
      tasks: updatedTasks,
      progress,
    });
  };

  // Upload/Simulate document addition
  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const ext = newDocName.toLowerCase().endsWith(".pdf") ? "" : ".pdf";
    const docNameWithExt = `${newDocName}${ext}`;

    const newDoc: LegalDocument = {
      id: `DOC-${Date.now().toString().slice(-4)}`,
      name: docNameWithExt,
      type: "PDF",
      uploadedAt: new Date().toLocaleDateString("id-ID"),
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
      status: "pending_review",
    };

    onUpdateProject({
      ...project,
      documents: [...project.documents, newDoc],
    });
    setNewDocName("");
  };

  const simulateDragDrop = () => {
    setIsDraggingOver(true);
    setTimeout(() => {
      setIsDraggingOver(false);
      const newDoc: LegalDocument = {
        id: `DOC-${Date.now().toString().slice(-4)}`,
        name: "Akta_Syarikat_Sinyal_Draft.pdf",
        type: "PDF",
        uploadedAt: new Date().toLocaleDateString("id-ID"),
        size: "1.8 MB",
        status: "pending_review",
      };
      onUpdateProject({
        ...project,
        documents: [...project.documents, newDoc],
      });
    }, 1500);
  };

  const handleVerifyDoc = (docId: string, status: "verified" | "rejected") => {
    const updatedDocs = project.documents.map((doc) => {
      if (doc.id === docId) {
        return { ...doc, status };
      }
      return doc;
    });
    onUpdateProject({
      ...project,
      documents: updatedDocs,
    });
  };

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Back button and title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-amber-400 text-xxs font-mono font-semibold px-2.5 py-0.5 rounded">
                {project.category}
              </span>
              <span className="text-xxs text-slate-400 font-mono">Proyek #{project.id}</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">{project.name}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Status Legalitas:</span>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
            {project.status === "Dalam Proses" ? "Dalam Proses (60%)" : project.status}
          </span>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("kanban")}
          className={`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all border-b-2 ${
            activeTab === "kanban"
              ? "border-amber-500 text-amber-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Kanban className="w-4 h-4" /> Alur Kerja & Tugas (Kanban)
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all border-b-2 ${
            activeTab === "documents"
              ? "border-amber-500 text-amber-600 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" /> Manajemen Berkas (Document Hub)
        </button>
      </div>

      {/* Grid: Main Panel + PIC sidebar */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Main Workspace content */}
        <div className="lg:col-span-9">
          {/* TAB 1: KANBAN BOARD */}
          {activeTab === "kanban" && (
            <div className="space-y-6">
              {/* Add Task Form */}
              <form onSubmit={handleAddTask} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-[200px] space-y-1">
                  <label className="text-xxs font-bold text-slate-500 uppercase">Tambah Tugas Baru</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Revisi Klausul Pasal 5 Akta Pendirian..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="w-48 space-y-1">
                  <label className="text-xxs font-bold text-slate-500 uppercase">Penanggung Jawab (PIC)</label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Andi Wijaya, S.H.">Andi Wijaya, S.H. (Advokat)</option>
                    <option value="Aulia Adela (Klien)">Aulia Adela (Klien)</option>
                    <option value="Admin Justitia">Admin Justitia</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs px-4 py-2.5 rounded-lg border border-amber-400/30 transition-colors flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-4 h-4" /> Tambah
                </button>
              </form>

              {/* Three Kanban Columns */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Column: Belum Dimulai (todo) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 min-h-[400px] space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="font-bold text-xs text-slate-700 tracking-wider uppercase">Belum Dimulai</span>
                    <span className="bg-slate-200 text-slate-800 text-xxs font-bold px-2 py-0.5 rounded-full">
                      {project.tasks.filter((t) => t.status === "todo").length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {project.tasks
                      .filter((t) => t.status === "todo")
                      .map((task) => (
                        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow transition-all space-y-3">
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 leading-normal">{task.title}</h5>
                            <p className="text-[10px] text-slate-500 mt-1">PIC: {task.assignee}</p>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xxs">
                            <span className="text-slate-400 font-mono">Tenggat: {task.dueDate}</span>
                            <button
                              onClick={() => handleMoveTask(task.id, "in_progress")}
                              className="text-amber-600 hover:text-amber-700 font-bold flex items-center"
                            >
                              Kerjakan <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column: Progress (in_progress) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 min-h-[400px] space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="font-bold text-xs text-slate-700 tracking-wider uppercase">Dalam Proses</span>
                    <span className="bg-amber-100 text-amber-700 text-xxs font-bold px-2 py-0.5 rounded-full">
                      {project.tasks.filter((t) => t.status === "in_progress").length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {project.tasks
                      .filter((t) => t.status === "in_progress")
                      .map((task) => (
                        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow transition-all space-y-3 border-l-2 border-amber-500">
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 leading-normal">{task.title}</h5>
                            <p className="text-[10px] text-slate-500 mt-1">PIC: {task.assignee}</p>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xxs">
                            <button
                              onClick={() => handleMoveTask(task.id, "todo")}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              Tunda
                            </button>
                            <button
                              onClick={() => handleMoveTask(task.id, "done")}
                              className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center"
                            >
                              Selesai ✓
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column: Selesai (done) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 min-h-[400px] space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="font-bold text-xs text-slate-700 tracking-wider uppercase">Selesai</span>
                    <span className="bg-emerald-100 text-emerald-700 text-xxs font-bold px-2 py-0.5 rounded-full">
                      {project.tasks.filter((t) => t.status === "done").length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {project.tasks
                      .filter((t) => t.status === "done")
                      .map((task) => (
                        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow transition-all space-y-3 border-l-2 border-emerald-500 opacity-80">
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 line-through leading-normal">{task.title}</h5>
                            <p className="text-[10px] text-slate-500 mt-1">PIC: {task.assignee}</p>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[10px]">
                            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                            </span>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENT HUB */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              {/* Drag & Drop Simulation Panel */}
              <div
                onClick={simulateDragDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDraggingOver
                    ? "border-emerald-500 bg-emerald-500/5 text-emerald-800"
                    : "border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:border-amber-500"
                }`}
              >
                <div className="max-w-md mx-auto space-y-3">
                  <div className="bg-amber-100 text-amber-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">
                      {isDraggingOver ? "Melepas Berkas..." : "Seret & Lepas Berkas Berkas Legal atau Klik"}
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Mendukung PDF, DOC, atau ZIP dokumen identitas, sertifikat, draf kontrak (Maks. 20MB)
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-700 text-xxs font-semibold px-2.5 py-1 rounded-full border border-amber-500/20">
                    Klik untuk simulasi upload instan akta!
                  </div>
                </div>
              </div>

              {/* Add document text form */}
              <form onSubmit={handleUploadDocument} className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3">
                <input
                  type="text"
                  required
                  placeholder="Ketik nama dokumen legal (misal: NPWP_Perusahaan.pdf)..."
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg shrink-0"
                >
                  Daftarkan Dokumen
                </button>
              </form>

              {/* Documents List */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 text-xxs font-bold text-slate-500 tracking-wider uppercase grid grid-cols-12 gap-4">
                  <span className="col-span-6">Nama Dokumen Legal</span>
                  <span className="col-span-2 text-center">Tanggal Unggah</span>
                  <span className="col-span-2 text-center">Ukuran / Status</span>
                  <span className="col-span-2 text-right">Aksi</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {project.documents.map((doc) => (
                    <div key={doc.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/55 transition-colors text-xs">
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="bg-red-100 text-red-700 w-9 h-9 rounded flex items-center justify-center font-bold font-mono text-[10px]">
                          PDF
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{doc.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">ID: {doc.id}</p>
                        </div>
                      </div>

                      <div className="col-span-2 text-center text-slate-500 font-mono">
                        {doc.uploadedAt}
                      </div>

                      <div className="col-span-2 text-center space-y-1">
                        <p className="text-xxs text-slate-400 font-mono">{doc.size}</p>
                        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          doc.status === "verified"
                            ? "bg-emerald-100 text-emerald-800"
                            : doc.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {doc.status === "verified" ? "Terverifikasi" : doc.status === "rejected" ? "Ditolak" : "Menunggu Review"}
                        </span>
                      </div>

                      <div className="col-span-2 flex items-center justify-end gap-2">
                        {doc.status === "pending_review" && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleVerifyDoc(doc.id, "verified")}
                              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-1.5 py-1 rounded text-[9px] transition-colors"
                              title="Setujui Dokumen"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handleVerifyDoc(doc.id, "rejected")}
                              className="bg-red-500 hover:bg-red-600 text-white font-bold px-1.5 py-1 rounded text-[9px] transition-colors"
                              title="Tolak Dokumen"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => alert(`Mengunduh berkas ${doc.name} (Simulasi)`)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded border border-slate-200 transition-all"
                          title="Unduh Berkas"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PIC Sidebar info panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">Konsultan Hukum (PIC)</h4>
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 text-slate-950 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm">
                AW
              </div>
              <div>
                <h5 className="font-serif font-bold text-sm">{project.picName}</h5>
                <p className="text-xxs text-amber-300 font-mono tracking-wider">{project.picRole}</p>
              </div>
            </div>

            <p className="text-xxs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
              Advokat bersertifikat resmi PERADI dengan pengalaman lebih dari 8 tahun menangani draf hukum korporasi, modal asing, serta regulasi kepatuhan bisnis lokal.
            </p>

            <div className="space-y-2 text-xxs font-medium text-slate-300">
              <p>📍 Jakarta Selatan, DKI Jakarta</p>
              <p>✉️ andi.wijaya@justitia.id</p>
              <p>📞 +62 811-992-003A</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex gap-2 text-amber-600">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h5 className="font-bold text-xs text-slate-800 uppercase">Perlu Telaah AI Instan?</h5>
            </div>
            <p className="text-xxs text-slate-500 leading-relaxed">
              Jika Anda baru saja mengunggah draf akta atau berkas perjanjian (NDA) dan ingin menganalisis klausul penting secara otomatis, silakan menuju menu Justitia AI.
            </p>
            <button
              onClick={() => setActiveTab("documents")}
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 text-xxs font-bold py-2 rounded-lg border border-slate-700 transition-colors"
            >
              Cek Draf & Kontrak Bisnis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
