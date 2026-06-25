import React, { useState } from "react";
import { Shield, Mail, Lock, Phone, User, Briefcase, ChevronLeft, CheckCircle2, Scale, ArrowRight, Check } from "lucide-react";

interface AuthScreensProps {
  initialMode: "login" | "register" | "verify";
  onLoginSuccess: (userEmail: string) => void;
  onRegisterSuccess: (userEmail: string) => void;
  onBackToLanding: () => void;
}

export default function AuthScreens({
  initialMode,
  onLoginSuccess,
  onRegisterSuccess,
  onBackToLanding,
}: AuthScreensProps) {
  const [mode, setMode] = useState<"login" | "register" | "verify">(initialMode);
  const [email, setEmail] = useState("klien.umkm@example.com");
  const [password, setPassword] = useState("password123");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState("Pendirian PT");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onLoginSuccess(email);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !termsAccepted) {
      alert("Harap lengkapi semua data dan setujui Syarat & Ketentuan.");
      return;
    }
    // Advance to verification screen
    setMode("verify");
  };

  const handleVerifyEmail = () => {
    // Show high-fidelity successful modal
    setShowSuccessModal(true);
  };

  const handleResendEmail = () => {
    setResendCountdown(30);
    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const enterDashboardDirectly = () => {
    onRegisterSuccess(email);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans text-slate-100">
      {/* Back Button floating */}
      <button
        onClick={onBackToLanding}
        className="absolute top-6 left-6 z-30 flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 font-medium transition-colors bg-slate-900/60 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-full"
      >
        <ChevronLeft className="w-4 h-4" /> Kembali ke Beranda
      </button>

      {/* LEFT SIDE: Slogan & Graphics (Split Screen) */}
      <div className="w-full md:w-1/2 bg-slate-900 flex flex-col justify-between p-8 md:p-16 relative overflow-hidden border-r border-slate-800">
        {/* Subtle decorative grid/glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-slate-800/20 blur-3xl pointer-events-none"></div>

        {/* Brand */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-amber-500 text-slate-950 font-serif font-bold text-lg p-1.5 rounded-lg">
            JP
          </div>
          <div>
            <h2 className="font-display font-semibold text-sm tracking-widest text-amber-400">JUSTITIA PARTNERS</h2>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase">Layanan Hukum Terpercaya</p>
          </div>
        </div>

        {/* Dynamic Graphic Content depending on Mode */}
        <div className="my-auto py-12 relative z-10 space-y-6 max-w-md">
          {mode === "login" ? (
            <>
              <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-white">
                Membangun Kepercayaan, Mengamankan <span className="text-amber-400 italic">Masa Depan.</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Akses dashboard hukum terintegrasi Anda untuk memantau pengajuan izin, berkonsultasi secara instan dengan Advokat kami, serta menelaah draf perjanjian bisnis dengan Justitia AI.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-white">
                Membangun fondasi hukum yang <span className="text-amber-400 italic">kuat</span> untuk bisnis Anda
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Lindungi aset intelektual, penuhi kepatuhan perundang-undangan Indonesia, dan bangun legitimasi usaha Anda secara efisien, aman, dan tanpa birokrasi berbelit.
              </p>
            </>
          )}

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 font-mono text-[10px] border border-slate-700">1</span>
              <span>Enkripsi Data 256-bit standar industri perbankan</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 font-mono text-[10px] border border-slate-700">2</span>
              <span>Dokumen draf langsung disupervisi oleh Advokat PERADI</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xxs text-slate-500 relative z-10 flex justify-between">
          <span>Kepatuhan Hukum Indonesia &copy; 2026</span>
          <span>Justitia Partners Tech</span>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Auth Forms */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-950">
        <div className="w-full max-w-md space-y-8">
          {/* SCREEN 1: LOGIN */}
          {mode === "login" && (
            <div className="space-y-6">
              <div className="space-y-2 text-left">
                <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold font-display">Selamat Datang Kembali</span>
                <h4 className="text-2xl font-serif font-bold text-white">Login ke Dashboard</h4>
                <p className="text-xs text-slate-400">Harap masukkan akun terdaftar Anda untuk mengelola perkara hukum</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-amber-400" /> Alamat Email / Username
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="klien.umkm@example.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-amber-400" /> Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Simulasi Lupa Kata Sandi: Silakan gunakan email klien.umkm@example.com dengan kata sandi apa saja.")}
                      className="text-xxs text-amber-400 hover:underline"
                    >
                      Lupa Kata Sandi?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold py-3 rounded-lg text-sm transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] flex items-center justify-center gap-2"
                >
                  Login ke Dashboard <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                  Belum memiliki akun?{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    Daftar Sekarang
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* SCREEN 2: REGISTER CLIENT ACCOUNT */}
          {mode === "register" && (
            <div className="space-y-6">
              <div className="space-y-2 text-left">
                <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold font-display">Registrasi Klien</span>
                <h4 className="text-2xl font-serif font-bold text-white">Daftar Akun Baru</h4>
                <p className="text-xs text-slate-400">Dapatkan pendampingan hukum prima untuk mengamankan kemajuan bisnis Anda</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-left space-y-4 legal-scroller">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" /> Nama Lengkap Anda
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Andika Pratama, S.E."
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-amber-400" /> Nama Bisnis / Perusahaan
                  </label>
                  <input
                    type="text"
                    placeholder="PT Sinergi Nusantara Kreatif"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-amber-400" /> Alamat Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="andika@sinergi.co.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-amber-400" /> No. Telepon / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="08123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Layanan yang Diminati</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/50 transition-colors"
                  >
                    <option value="Pendirian PT">Pendirian PT (Umum / Perorangan)</option>
                    <option value="Pendaftaran Merek HKI">Pendaftaran Merek Dagang & HKI</option>
                    <option value="Kontrak Kerja & NDA">Penyusunan Kontrak Kerja & NDA</option>
                    <option value="Kepatuhan Pajak">Konsultasi Kepatuhan Pajak & Audit</option>
                    <option value="Lainnya">Lainnya / Belum Ditentukan</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-400" /> Kata Sandi Akun
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-800 bg-slate-900 text-amber-500 focus:ring-amber-500/50 focus:ring-opacity-25"
                  />
                  <label htmlFor="terms" className="text-xxs text-slate-400 leading-normal select-none">
                    Saya menyetujui seluruh <span className="text-amber-400 hover:underline cursor-pointer">Syarat & Ketentuan Layanan</span> dan <span className="text-amber-400 hover:underline cursor-pointer">Kebijakan Privasi</span> data Justitia Partners.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold py-3 rounded-lg text-sm transition-all shadow-lg hover:shadow-xl mt-4"
                >
                  Daftarkan Akun & Kirim Verifikasi
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                  Sudah memiliki akun klien?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    Masuk Sekarang
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* SCREEN 3: EMAIL VERIFICATION */}
          {mode === "verify" && (
            <div className="space-y-6 text-center">
              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Mail className="w-8 h-8" />
              </div>

              <div className="space-y-2 text-center">
                <h4 className="text-2xl font-serif font-bold text-white">Verifikasi Alamat Email</h4>
                <p className="text-xs text-slate-300">
                  Kami telah mengirimkan tautan verifikasi ke email pendirian Anda: <span className="text-amber-400 font-mono">{email}</span>.
                </p>
                <p className="text-xxs text-slate-400">
                  Harap periksa kotak masuk atau folder spam Anda dalam waktu 5 menit untuk mengaktifkan akun Anda.
                </p>
              </div>

              <div className="bg-slate-900/55 p-4 rounded-xl border border-slate-800/80 text-left space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Kirim verifikasi berhasil</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></div>
                  <span>Menunggu respons klik dari tautan email klien...</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Simulasikan Klik Tautan Email <CheckCircle2 className="w-4.5 h-4.5" />
                </button>

                <div className="flex justify-between items-center text-xs">
                  <button
                    type="button"
                    disabled={resendCountdown > 0}
                    onClick={handleResendEmail}
                    className={`text-slate-300 hover:text-amber-400 font-semibold transition-colors ${resendCountdown > 0 ? "opacity-55 cursor-not-allowed" : ""}`}
                  >
                    {resendCountdown > 0 ? `Kirim Ulang Email dalam (${resendCountdown}s)` : "Kirim Ulang Email"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-slate-400 hover:text-white"
                  >
                    Kembali ke Masuk
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* POPUP: Successful verification alert popup/modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl gold-glow">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h5 className="text-xl font-serif font-bold text-white">Verifikasi Berhasil</h5>
              <p className="text-sm text-slate-300">
                Alamat email Anda telah diverifikasi secara sah oleh otoritas hukum Justitia Partners. Akun Anda kini aktif penuh.
              </p>
            </div>

            <button
              onClick={enterDashboardDirectly}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-1.5"
            >
              Masuk ke Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
