import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API Client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini client:", err);
  }
} else {
  console.log("No GEMINI_API_KEY found. Running in simulation mode for Justitia AI.");
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", api_key_present: !!apiKey });
});

// Gemini Chat Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, documentText } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const systemInstruction = `Anda adalah Justitia AI, asisten hukum AI pintar dan berpengalaman dari Justitia Partners (Layanan Hukum Terpercaya untuk UMKM & Bisnis Indonesia).
Tugas Anda adalah memberikan analisis hukum, informasi kepatuhan bisnis, pendirian badan usaha, hak kekayaan intelektual (HKI), perpajakan, serta telaah dokumen hukum umum (seperti NDA, Surat Perjanjian, dll).

PANDUAN JAWABAN:
1. Sampaikan jawaban dalam Bahasa Indonesia yang formal, santun, ramah, dan profesional.
2. Jelaskan istilah-istilah hukum yang rumit dengan analogi sederhana yang mudah dimengerti oleh pelaku UMKM / pengusaha pemula.
3. Berikan saran terstruktur (misal memakai poin-poin/bullet list) agar mudah dibaca.
4. SELALU cantumkan disclaimer di akhir jawaban Anda bahwa analisis Justitia AI bersifat edukatif & informasional, dan menyarankan klien untuk berkonsultasi lebih lanjut dengan tim Advokat profesional Justitia Partners jika membutuhkan pendampingan formal.
5. Jika ada dokumen yang diunggah (konteks dokumen disertakan), fokuslah menganalisis potensi risiko (risiko klausul, ketidakseimbangan hak/kewajiban) dalam dokumen tersebut secara kritis.`;

    if (!ai) {
      // Return a simulated high-fidelity rule-based response if Gemini API key is missing
      const lastMessage = messages[messages.length - 1]?.content || "";
      const lowerMsg = lastMessage.toLowerCase();
      let reply = "";

      if (lowerMsg.includes("nda") || lowerMsg.includes("perjanjian") || lowerMsg.includes("kontrak")) {
        reply = `**Analisis Draf Dokumen / NDA oleh Justitia AI (Mode Simulasi):**

Berdasarkan analisis awal terhadap klausul dokumen yang Anda sebutkan, berikut beberapa poin penting yang perlu dicermati oleh pelaku usaha:
1. **Definisi Informasi Rahasia:** Pastikan definisi 'Informasi Rahasia' ditulis secara timbal-balik (mutual) agar kedua belah pihak terlindungi secara seimbang, tidak hanya melindungi satu pihak saja.
2. **Masa Berlaku Kerahasiaan (Survival Clause):** Masa berlaku umumnya berkisar antara 2 hingga 5 tahun setelah kerja sama berakhir. Hindari klausul kerahasiaan 'selamanya' (perpetual) karena sulit dieksekusi dan membebani bisnis Anda.
3. **Penyelesaian Sengketa:** Sebaiknya menggunakan mediasi terlebih dahulu atau menunjuk arbitrase lokal (BANI) atau Pengadilan Negeri yang disepakati bersama.
4. **Ganti Rugi (Liquidated Damages):** Waspadai klausul denda penalti ganti rugi yang tidak realistis nilainya.

*Disclaimer: Analisis ini bersifat edukatif dan simulasi karena API Key belum terkonfigurasi. Hubungi Advokat kami di Justitia Partners untuk review dokumen resmi berkekuatan hukum.*`;
      } else if (lowerMsg.includes("pt") || lowerMsg.includes("pendirian") || lowerMsg.includes("cv") || lowerMsg.includes("usaha")) {
        reply = `**Checklist Pendirian PT / Badan Usaha di Indonesia oleh Justitia AI (Mode Simulasi):**

Untuk mendirikan Perseroan Terbatas (PT) di Indonesia, berikut langkah-langkah hukum yang harus Anda persiapkan:
1. **Penentuan Nama PT:** Harus terdiri dari minimal 3 kata dalam bahasa Indonesia (sesuai PP No. 43/2011), serta belum digunakan oleh PT lain.
2. **Struktur Organisasi:** Minimal terdiri dari 2 orang pemegang saham, 1 orang Direktur, dan 1 orang Komisaris (kecuali untuk PT Perorangan UMKM yang bisa didirikan oleh 1 orang).
3. **Modal Dasar & Modal Disetor:** Minimal 25% dari Modal Dasar harus ditempatkan dan disetor penuh (dibuktikan dengan setoran bank).
4. **Dokumen Persyaratan:** KTP dan NPWP para pendiri, draf kegiatan usaha sesuai KBLI 2020 terbaru.
5. **Proses Hukum:** Pembuatan Akta Pendirian oleh Notaris, Pengesahan SK Kemenkumham, pengurusan NIB (Nomor Induk Berusaha) melalui OSS RBA, dan NPWP Badan Usaha.

*Disclaimer: Panduan ini bersifat edukatif. Konsultasikan struktur bisnis terbaik Anda langsung dengan konsultan Justitia Partners.*`;
      } else {
        reply = `Halo! Saya **Justitia AI**, asisten hukum virtual Anda dari **Justitia Partners**. 

Saat ini saya berjalan dalam mode simulasi cerdas karena kunci API belum diaktifkan. Saya dapat menjawab pertanyaan Anda tentang pendirian PT/CV, pendaftaran merek dagang (HKI), perpajakan UMKM, atau draf surat perjanjian kerja sama. 

Silakan tanyakan hal-hal tersebut, atau Anda juga bisa mencoba menu simulasi analisis dokumen dengan menempelkan teks kontrak Anda di kolom sebelah kanan!

*Disclaimer: Layanan ini bersifat edukatif dan bukan pengganti nasihat hukum formal.*`;
      }

      // Add a brief timeout to simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 600));
      return res.json({ text: reply });
    }

    // Call real Gemini API
    // Build context
    const parts: any[] = [];

    if (documentText) {
      parts.push({
        text: `DOKUMEN DIUNGGAH OLEH PENGGUNA UNTUK DIANALISIS:\n---\n${documentText}\n---\n`,
      });
    }

    // Build dialogue history
    let historyStr = "";
    messages.forEach((msg: any) => {
      historyStr += `${msg.role === "user" ? "Pengguna" : "Justitia AI"}: ${msg.content}\n\n`;
    });

    parts.push({
      text: `Berikut adalah riwayat percakapan antara Pengguna dan Justitia AI:\n\n${historyStr}\nJustitia AI, berikan tanggapan Anda selanjutnya:`,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: parts,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "Mohon maaf, terjadi kendala saat memproses jawaban hukum Anda. Silakan coba lagi.";
    res.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Terjadi kesalahan internal pada asisten AI.",
      details: error.message,
    });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Justitia Partners Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
