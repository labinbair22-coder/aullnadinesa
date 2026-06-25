import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Bot, User, Send, FileText, Sparkles, HelpCircle, AlertCircle, Copy, Check } from "lucide-react";
import { ChatMessage } from "../types";

export default function JustitiaAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: `Halo! Saya **Justitia AI**, asisten hukum virtual Anda dari **Justitia Partners**.

Saya dilatih menggunakan regulasi hukum, perizinan OSS RBA, HKI, dan draf draf kerja sama bisnis di Indonesia. 

**Bagaimana saya bisa membantu Anda hari ini?**
*   *Tanyakan cara mendirikan PT/CV atau izin operasional.*
*   *Tempelkan draf dokumen/NDA Anda di panel sebelah kanan untuk dianalisis.*`,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [documentText, setDocumentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Suggestions chips handler
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  // Pre-load dummy NDA contract to let the user test document analysis immediately
  const handleLoadSampleContract = () => {
    const sampleNDA = `PERJANJIAN KERAHASIAN SEPIHAK (NON-DISCLOSURE AGREEMENT)

Antara PT Sinar Mas Mandiri ("Pihak Pertama") dan Bapak Andika Pratama ("Pihak Kedua").

Pasal 1: Informasi Rahasia
Pihak Kedua setuju untuk menjaga kerahasiaan seluruh draf teknologi, rahasia dagang, strategi pemasaran, dan data klien yang diberikan oleh Pihak Pertama secara sepihak.

Pasal 2: Jangka Waktu Kerahasiaan
Seluruh Informasi Rahasia yang diterima oleh Pihak Kedua wajib dijaga kerahasiaannya untuk SELAMANYA, bahkan setelah hubungan kerja sama bisnis ini dinyatakan berakhir oleh para pihak.

Pasal 3: Penyelesaian Sengketa & Denda
Pihak Kedua bersedia membayar denda penalti ganti rugi (liquidated damages) sebesar Rp 5.000.000.000,- (Lima Miliar Rupiah) secara tunai seketika jika terbukti membocorkan Informasi Rahasia sekecil apa pun kepada pihak ketiga tanpa persetujuan tertulis terlebih dahulu. Sengketa diselesaikan langsung melalui Pengadilan Negeri Jakarta Pusat sebagai pilihan hukum tunggal.`;

    setDocumentText(sampleNDA);
    setInput("Tolong analisis potensi risiko dari draf NDA di samping. Berikan poin-poin klausul yang memberatkan saya.");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !documentText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input || "Menganalisis draf dokumen yang dicantumkan.",
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Post to our server endpoint
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          documentText: documentText || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.text,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        throw new Error(data.error || "Gagal mendapatkan balasan.");
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `**Mohon maaf, terjadi gangguan jaringan saat menghubungi asisten AI.**

Tetapi saya bisa memberikan tips umum: Pastikan draf dokumen Anda tidak memiliki klausul berat sebelah seperti masa kerahasiaan selamanya (perpetual) atau nilai denda ganti rugi yang tidak realistis (klausul denda tidak seimbang). 

*Harap hubungi Advokat di Justitia Partners untuk mendapatkan layanan legal formal.*`,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyChat = () => {
    const fullText = messages.map((m) => `${m.role === "user" ? "Klien" : "Justitia AI"}:\n${m.content}`).join("\n\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-160px)] font-sans text-left">
      {/* LEFT: Chat Window (col-span-7) */}
      <div className="lg:col-span-7 flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden h-full">
        {/* Chat header */}
        <div className="bg-slate-900 text-white px-5 py-4 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-500 text-slate-950 p-1.5 rounded-lg">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xs md:text-sm tracking-wide text-amber-400">JUSTITIA AI</h3>
              <p className="text-[10px] text-slate-400 font-medium">Asisten Hukum Cerdas & Kepatuhan Bisnis</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyChat}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded border border-slate-800 transition-all text-xxs flex items-center gap-1"
              title="Salin Percakapan"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              Salin Catatan
            </button>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>

        {/* Suggestion Quick Chips */}
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex gap-2 overflow-x-auto shrink-0 legal-scroller text-xxs font-medium text-slate-600">
          <button
            onClick={() => handleSuggestionClick("Bagaimana langkah mendirikan PT Perorangan untuk UMKM?")}
            className="bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
          >
            Checklist Pendirian PT
          </button>
          <button
            onClick={() => handleSuggestionClick("Bagaimana pendaftaran merek HKI agar tidak ditolak DJKI?")}
            className="bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
          >
            Sertifikasi Merek HKI
          </button>
          <button
            onClick={() => handleSuggestionClick("Apa saja sanksi jika badan usaha tidak memiliki NIB OSS?")}
            className="bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
          >
            Sanksi Tanpa NIB
          </button>
        </div>

        {/* Chat message history scroll box */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 legal-scroller bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-amber-400 border border-slate-800"
              }`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-sm border ${
                  msg.role === "user"
                    ? "bg-slate-900 text-slate-100 border-slate-800 rounded-tr-none"
                    : "bg-white text-slate-800 border-slate-200 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
                <p className={`text-[9px] text-slate-400 font-mono ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center border border-slate-800 shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white text-slate-500 border border-slate-200 p-4 rounded-2xl rounded-tl-none text-xs flex items-center gap-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>Justitia AI sedang menelaah draf hukum & regulasi...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat input submit area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white shrink-0 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan regulasi hukum atau draf draf perjanjian di sini..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Legal Disclaimer at bottom */}
        <div className="bg-slate-100 text-[10px] text-slate-500 py-2.5 px-4 text-center border-t border-slate-200 flex items-center justify-center gap-1.5 shrink-0">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Analisis AI bersifat edukatif & simulasi sesuai KBLI 2020. Bukan nasihat hukum formal bersertifikat.</span>
        </div>
      </div>

      {/* RIGHT: Document Context Uploader Pane (col-span-5) */}
      <div className="lg:col-span-5 flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden h-full">
        <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4.5 h-4.5 text-amber-600" />
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">Konteks Dokumen Legal</h4>
          </div>
          <button
            type="button"
            onClick={handleLoadSampleContract}
            className="text-xxs text-amber-600 hover:text-amber-700 font-bold border border-amber-500/20 px-2.5 py-1 rounded bg-amber-500/5 transition-all hover:bg-amber-500/10"
          >
            Gunakan Draf NDA Contoh
          </button>
        </div>

        <div className="flex-1 p-5 flex flex-col space-y-4 overflow-y-auto legal-scroller">
          <div className="space-y-1">
            <label className="text-xxs font-bold text-slate-500 uppercase">Salin & Tempel Kontrak / NDA</label>
            <p className="text-[10px] text-slate-400">
              Tempelkan teks surat perjanjian, pasal akta, draf kontrak kerja, atau draf HKI di bawah ini untuk dianalisis oleh AI.
            </p>
          </div>

          <textarea
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder="Pihak Pertama setuju memberikan denda penalti sebesar Rp 10.000.000.000 jika melanggar..."
            className="flex-1 min-h-[150px] bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs font-mono text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
          ></textarea>

          {documentText && (
            <div className="bg-amber-500/5 border border-amber-500/20 p-3.5 rounded-lg flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xxs font-bold text-amber-800">Draf Terbaca ({documentText.split(" ").length} kata)</p>
                <p className="text-[10px] text-slate-600 leading-normal mt-0.5">
                  Justitia AI akan membaca klausul draf ini di samping pesan Anda untuk mengaudit risiko kepatuhan hukum Indonesia.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-200 text-center shrink-0">
          <button
            onClick={() => {
              if (!documentText.trim()) {
                alert("Harap isi atau muat draf dokumen terlebih dahulu.");
                return;
              }
              setInput("Tolong buat audit dan analisis risiko detail dari teks draf dokumen legal di samping.");
            }}
            className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs py-2.5 rounded-lg transition-colors border border-slate-800"
          >
            Uji Klausul Perjanjian
          </button>
        </div>
      </div>
    </div>
  );
}
