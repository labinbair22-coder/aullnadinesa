import React, { useState } from "react";
import { AlertTriangle, Plus, ChevronDown, ChevronUp, FileText, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { ComplaintTicket } from "../types";

export default function ResolutionCenter() {
  const [tickets, setTickets] = useState<ComplaintTicket[]>([
    {
      id: "TKT-0992A",
      projectNumber: "PRJ-9031",
      category: "Keterlambatan Akta",
      description: "Draf akta belum dikirimkan oleh notaris rekanan untuk draf persetujuan Kemenkumham.",
      status: "Sedang Ditinjau",
      createdAt: "22/06/2026",
    },
    {
      id: "TKT-0812B",
      projectNumber: "PRJ-9031",
      category: "Koreksi KBLI",
      description: "Penyesuaian KBLI 2020 untuk perdagangan eceran elektronik perlu direvisi.",
      status: "Selesai",
      createdAt: "15/06/2026",
    },
  ]);

  const [projectNum, setProjectNum] = useState("PRJ-9031");
  const [category, setCategory] = useState("Keterlambatan Berkas");
  const [desc, setDesc] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Berapa lama waktu penanganan kendala berkas di Kemenkumham?",
      a: "Umumnya penanganan kendala sinkronisasi data Kemenkumham memakan waktu 1-3 hari kerja. Tim operasional Justitia Partners akan berkoordinasi langsung dengan Dirjen AHU untuk memastikan kendala integrasi terselesaikan.",
    },
    {
      q: "Bagaimana cara melakukan revisi KBLI usaha pada draf akta yang sudah dikirim?",
      a: "Jika akta belum ditandatangani di hadapan Notaris, revisi KBLI bisa langsung diajukan gratis melalui draf editor di Dashboard. Namun jika akta sudah terbit, perubahan KBLI harus melalui mekanisme Rapat Umum Pemegang Saham (RUPS) Luar Biasa.",
    },
    {
      q: "Apakah denda pembatalan sepihak pendaftaran merek HKI dapat dikembalikan?",
      a: "Sesuai regulasi DJKI Kemenkumham, PNBP (Penerimaan Negara Bukan Pajak) yang telah disetorkan ke kas negara untuk registrasi merek tidak dapat ditarik kembali/refund jika permohonan ditarik oleh pemohon.",
    },
  ];

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) return;

    const newTicket: ComplaintTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      projectNumber: projectNum,
      category: category,
      description: desc,
      status: "Dalam Antrian",
      createdAt: new Date().toLocaleDateString("id-ID"),
    };

    setTickets([newTicket, ...tickets]);
    setDesc("");
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 4000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 font-sans text-left">
      {/* LEFT: Submit Complaint Form (col-span-8) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="space-y-1.5 pb-2 border-b border-slate-100">
          <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Pusat Resolusi & Aduan Layanan
          </h3>
          <p className="text-xs text-slate-500">
            Kami berkomitmen memberikan transparansi penuh. Sampaikan kendala perizinan atau sengketa dokumen Anda untuk penanganan cepat.
          </p>
        </div>

        {showSuccessAlert && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">Aduan Berhasil Terdaftar!</p>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                Nomor aduan baru Anda telah diteruskan ke Tim Kepatuhan Internal Justitia Partners. Kami akan memberikan pembaruan dalam 12 jam kerja.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitComplaint} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Nomor Proyek Terkait</label>
              <select
                value={projectNum}
                onChange={(e) => setProjectNum(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
              >
                <option value="PRJ-9031">PRJ-9031 (Pendirian PT ABC)</option>
                <option value="PRJ-8812">PRJ-8812 (Pendaftaran Merek HKI Dagang)</option>
                <option value="PRJ-MOCK">PRJ-MOCK (Umum / Non-Proyek)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Kategori Masalah Hukum</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
              >
                <option value="Keterlambatan Berkas">Keterlambatan Berkas / Berkas Mandek</option>
                <option value="Revisi Klausul Notaris">Revisi Klausul Notaris / Akta</option>
                <option value="Kendala Verifikasi DJKI">Kendala Verifikasi DJKI Kemenkumham</option>
                <option value="Masalah Pembayaran / Invoice">Masalah Pembayaran / Invoice</option>
                <option value="Lainnya">Lainnya / Masalah Umum</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Deskripsi Detail Masalah</label>
            <textarea
              required
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Berikan penjelasan detail kendala, termasuk pasal akta yang ingin diubah atau kronologi komunikasi..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
            ></textarea>
          </div>

          {/* Drag and Drop zone for proof */}
          <div className="border border-dashed border-slate-300 rounded-lg p-5 text-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer" onClick={() => alert("Simulasi: Berkas bukti pendukung diunggah.")}>
            <p className="text-xs font-bold text-slate-700">Seret dan Lepas Berkas Bukti Pendukung</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Tanda terima Kemenkumham, screenshot invoice, atau PDF penolakan merek (Maks. 10MB)</p>
          </div>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all"
          >
            Kirim Pengaduan Baru
          </button>
        </form>

        {/* FAQ SECTION Accordion */}
        <div className="space-y-4 pt-4">
          <h4 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-5 h-5 text-amber-500" /> FAQ Penanganan Masalah Hukum
          </h4>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left font-semibold text-xs text-slate-800 hover:text-amber-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openFaqIndex === idx && (
                  <p className="text-[11px] text-slate-600 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Active Complaint Status Sidebar (col-span-4) */}
      <div className="lg:col-span-4 space-y-6">
        <h3 className="text-lg font-serif font-bold text-slate-900 pb-2 border-b border-slate-100">
          Status Pengaduan Aktif
        </h3>

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="font-mono text-xs font-bold text-slate-900">{ticket.id}</span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  ticket.status === "Selesai"
                    ? "bg-emerald-100 text-emerald-800"
                    : ticket.status === "Sedang Ditinjau"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-slate-100 text-slate-800"
                }`}>
                  {ticket.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xxs font-medium text-slate-400">
                  <span>Proyek: {ticket.projectNumber}</span>
                  <span>Dibuat: {ticket.createdAt}</span>
                </div>
                <h5 className="text-xs font-bold text-slate-800">Kategori: {ticket.category}</h5>
                <p className="text-xxs text-slate-500 leading-normal">{ticket.description}</p>
              </div>

              {ticket.status === "Sedang Ditinjau" && (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-600 leading-relaxed">
                    <strong>Tim Kepatuhan:</strong> Kami telah berkoordinasi dengan notaris rekanan untuk merevisi akta hari ini.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
