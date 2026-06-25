import React from "react";
import { Shield, BookOpen, Scale, Landmark, Award, ArrowRight, Star, HelpCircle } from "lucide-react";

interface LandingPageProps {
  onNavigate: (screen: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 text-white py-4 px-6 md:px-12 flex justify-between items-center border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-slate-900 p-2 rounded-lg font-serif font-bold text-xl tracking-wider">
            JP
          </div>
          <div>
            <h1 className="font-display font-bold text-lg md:text-xl tracking-wide text-amber-400">
              JUSTITIA PARTNERS
            </h1>
            <p className="text-xs text-slate-400 font-sans tracking-widest">
              LAYANAN HUKUM TERPERCAYA
            </p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="text-slate-300 hover:text-amber-400 transition-colors">
            Layanan Kami
          </a>
          <a href="#why-us" className="text-slate-300 hover:text-amber-400 transition-colors">
            Keunggulan
          </a>
          <a href="#testimonials" className="text-slate-300 hover:text-amber-400 transition-colors">
            Ulasan
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("login")}
            className="px-4 py-2 text-sm text-slate-300 hover:text-amber-400 font-medium transition-colors"
          >
            Masuk
          </button>
          <button
            onClick={() => onNavigate("register")}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-2 rounded-md text-sm font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Daftar Akun
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-6 md:px-12 text-center md:text-left overflow-hidden">
        {/* Subtle Decorative Background Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full border-4 border-amber-500"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full border border-amber-500"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
              <Scale className="w-3.5 h-3.5" /> Mitra Hukum Terpercaya UMKM & Korporasi
            </div>
            <h2 className="text-3.5xl md:text-5xl font-serif font-bold text-white leading-tight">
              Solusi Hukum Terintegrasi untuk <span className="text-amber-400 italic">UMKM dan Bisnis</span> Indonesia
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
              Kami menyederhanakan perizinan, kepatuhan hukum, pendaftaran kekayaan intelektual (HKI), hingga
              pembuatan draf perjanjian bisnis agar Anda bisa fokus membesarkan usaha dengan aman.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate("justitia_ai")}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2 group shadow-lg"
              >
                Mulai Konsultasi AI Gratis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate("register")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold px-6 py-3 rounded-md border border-slate-700 transition-all"
              >
                Daftar Sebagai Klien
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-bold text-amber-400 font-serif">5,000+</p>
                <p className="text-xs text-slate-400">UMKM Terbantu</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-400 font-serif">99.2%</p>
                <p className="text-xs text-slate-400">Sertifikasi Lolos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-400 font-serif">24/7</p>
                <p className="text-xs text-slate-400">Asisten AI Siaga</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative p-2 bg-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl max-w-sm w-full">
              <div className="bg-slate-900 rounded-xl overflow-hidden p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400 font-mono">STATUS: SISTEM AKTIF</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg space-y-2 text-left text-xs border border-slate-800">
                  <p className="text-amber-400 font-semibold">🔍 Layanan Populer Minggu Ini:</p>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    <li>Pendirian PT Perorangan & Umum</li>
                    <li>Sertifikasi Halal & NIB OSS</li>
                    <li>Pendaftaran Merek HKI Dagang</li>
                    <li>Audit Kontrak & Legalitas Bisnis</li>
                  </ul>
                </div>
                <div className="text-center pt-2">
                  <p className="text-xs text-slate-300 mb-3">
                    Ingin tahu izin hukum apa saja yang bisnis Anda perlukan? Tanyakan asisten virtual Justitia AI.
                  </p>
                  <button
                    onClick={() => onNavigate("justitia_ai")}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-semibold py-2.5 rounded-lg transition-all"
                  >
                    Tanya Justitia AI Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-sm font-semibold tracking-wider text-amber-600 uppercase">Solusi Profesional</p>
          <h3 className="text-3xl font-serif font-bold text-slate-900">
            Layanan Hukum Komprehensif Kami
          </h3>
          <p className="text-slate-600">
            Kami menghadirkan jajaran konsultan hukum, notaris, dan advokat berpengalaman yang siap mengamankan jalannya roda bisnis Anda di Indonesia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-amber-500/40 hover:shadow-md transition-all space-y-4">
            <div className="bg-amber-100 text-amber-700 w-12 h-12 rounded-lg flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif font-bold text-slate-900">Jasa Notariat & Korporasi</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pembuatan Akta Pendirian PT/CV, draf anggaran dasar, persetujuan menteri Kemenkumham, serta perubahan struktur direksi dan kepemilikan saham secara sah.
            </p>
            <button
              onClick={() => onNavigate("register")}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1.5 group pt-2"
            >
              Mulai Pendirian <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-amber-500/40 hover:shadow-md transition-all space-y-4">
            <div className="bg-amber-100 text-amber-700 w-12 h-12 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif font-bold text-slate-900">Hak Kekayaan Intelektual (HKI)</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Lindungi brand Anda! Jasa pendaftaran Merek Dagang, Hak Cipta, Paten, Desain Industri, serta penanganan kasus sengketa merek di DJKI Kemenkumham.
            </p>
            <button
              onClick={() => onNavigate("register")}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1.5 group pt-2"
            >
              Daftarkan Merek <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-amber-500/40 hover:shadow-md transition-all space-y-4">
            <div className="bg-amber-100 text-amber-700 w-12 h-12 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif font-bold text-slate-900">Legal Compliance & Pajak</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Penyusunan Perjanjian Kerja Bersama (PKB), draf kontrak bisnis (NDA, MoA), kepatuhan lingkungan, izin operasional OSS RBA, hingga pelaporan pajak tahunan perusahaan.
            </p>
            <button
              onClick={() => onNavigate("register")}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1.5 group pt-2"
            >
              Urus Kepatuhan <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="bg-slate-900 text-white py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold tracking-wider text-amber-400 uppercase">Teknologi Hukum Terdepan</p>
            <h3 className="text-3.5xl font-serif font-bold">Mengapa Justitia Partners?</h3>
            <p className="text-slate-300">
              Kami memadukan kualitas advokasi firma hukum papan atas dengan teknologi kecerdasan buatan, memberikan kecepatan pengerjaan tanpa mengorbankan ketelitian hukum.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-amber-500/20 text-amber-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-100">Tim Pengacara Tersertifikasi</h5>
                  <p className="text-sm text-slate-400">Seluruh dokumen hukum diperiksa dan disetujui langsung oleh Advokat PERADI dan Notaris resmi.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-amber-500/20 text-amber-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-100">Asisten Hukum AI 24/7</h5>
                  <p className="text-sm text-slate-400">Uji draf kontrak dan tanyakan regulasi kepatuhan kapan saja secara instan melalui Justitia AI.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-amber-500/20 text-amber-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-100">Dashboard Progres Transparan</h5>
                  <p className="text-sm text-slate-400">Pantau sejauh mana izin usaha Anda diproses, kelola tugas, dan unggah dokumen dalam satu panel.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 space-y-6">
            <h4 className="text-lg font-serif font-bold text-amber-400 border-b border-slate-800 pb-3">Testimoni Klien Kami</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-sm italic text-slate-300">
                  "Sangat terbantu mendirikan PT Perorangan lewat Justitia Partners. Prosesnya hanya memakan waktu 4 hari kerja dan biayanya sangat transparan, plus bisa diskusi draf kerja sama dengan AI-nya terlebih dahulu."
                </p>
                <p className="text-xs font-semibold text-slate-400">— Budi Santoso, Owner Kopi Nusantara PT</p>
              </div>
              <div className="border-t border-slate-800/80 pt-4 space-y-2">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-sm italic text-slate-300">
                  "Pendaftaran merek HKI Justitia Partners sangat profesional. Dashboard progresnya memudahkan kami melacak berkas yang diajukan ke kementerian tanpa harus repot menelepon bolak-balik."
                </p>
                <p className="text-xs font-semibold text-slate-400">— Adelia Putri, Founder HijabChic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 md:px-12 border-t border-slate-900 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 text-slate-950 p-1.5 rounded font-serif font-bold text-sm">
              JP
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm tracking-wider">JUSTITIA PARTNERS</p>
              <p className="text-xxs text-slate-500">Layanan Hukum Terpercaya &copy; 2026. All rights reserved.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-medium">
            <a href="#services" className="hover:text-amber-400 transition-colors">Layanan</a>
            <a href="#why-us" className="hover:text-amber-400 transition-colors">Mengapa Kami</a>
            <button onClick={() => onNavigate("resolution_center")} className="hover:text-amber-400 transition-colors">Pusat Resolusi</button>
            <button onClick={() => onNavigate("add_user")} className="hover:text-amber-400 transition-colors">Registrasi Mitra</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
