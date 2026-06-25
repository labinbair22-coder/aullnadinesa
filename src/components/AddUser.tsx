import React, { useState } from "react";
import { UserPlus, Key, ShieldCheck, Mail, Phone, Lock, Briefcase, Eye, HelpCircle, AlertCircle, Sparkles } from "lucide-react";

export default function AddUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Klien");
  const [businessName, setBusinessName] = useState("");
  const [initialPassword, setInitialPassword] = useState("");
  const [verifyImmediately, setVerifyImmediately] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < 12; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setInitialPassword(pwd);
  };

  const loadDemoUser = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setFullName("Pratama Adiputra");
    setEmail(`pratama.adi${randomSuffix}@sinergi.id`);
    setPhone("0813-9812-7711");
    setRole("Klien");
    setBusinessName("PT Sinergi Adiputra Jaya");
    generateRandomPassword();
  };

  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Harap isi nama lengkap dan email terlebih dahulu.");
      return;
    }

    setSuccessMessage(`Akun ${role} baru (${fullName}) berhasil terdaftar di sistem kepatuhan Justitia Partners!`);
    setTimeout(() => {
      setSuccessMessage("");
      // Clear fields
      setFullName("");
      setEmail("");
      setPhone("");
      setBusinessName("");
      setInitialPassword("");
    }, 4000);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 font-sans text-left">
      {/* LEFT: Add User Form (col-span-8) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="space-y-1 pb-2 border-b border-slate-100 flex justify-between items-end">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <UserPlus className="w-5.5 h-5.5 text-amber-500" /> Tambah Pengguna Baru
            </h3>
            <p className="text-xs text-slate-500">
              Registrasikan akun Klien, Advokat, atau Partner Hukum eksternal baru secara sah di dalam ekosistem Justitia.
            </p>
          </div>
          <button
            type="button"
            onClick={loadDemoUser}
            className="text-xxs text-amber-600 hover:text-amber-700 font-bold border border-amber-500/25 bg-amber-500/5 px-2.5 py-1.5 rounded-lg flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" /> Isi Data Demo Klien
          </button>
        </div>

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">Registrasi Berhasil!</p>
              <p className="text-[11px] text-emerald-700 mt-0.5">{successMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleRegisterUser} className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
          {/* SECTION 1: Informasi Pengguna */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-1.5 border-b border-slate-100">
              I. Informasi Pengguna & Bisnis
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Nama Lengkap (Sesuai KTP/Sertifikat)</label>
                <input
                  type="text"
                  required
                  placeholder="Andika Pratama, S.E."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Nama Bisnis / Perusahaan (Opsional)</label>
                <input
                  type="text"
                  placeholder="PT Sinergi Kreatif Nusantara"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Alamat Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="klien@sinergi.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">No. Telepon / WhatsApp</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    placeholder="0812-3456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Peran Perizinan (Akses Sistem)</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                >
                  <option value="Klien">Klien (Pemilik Usaha / UMKM)</option>
                  <option value="Advokat">Advokat (Penyelia Perkara)</option>
                  <option value="Notaris">Notaris Rekanan</option>
                  <option value="Admin">Admin Kepatuhan Hukum</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: Keamanan & Akses */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-1.5 border-b border-slate-100">
              II. Keamanan, Akses & Verifikasi
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Kata Sandi Awal</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Masukkan sandi atau Klik Generate"
                    value={initialPassword}
                    onChange={(e) => setInitialPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-12 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs px-4 py-2.5 rounded-lg border border-amber-400/30 transition-colors flex items-center gap-1.5 grow justify-center"
                >
                  <Key className="w-4 h-4" /> Generate Random
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <input
                id="verify-immediately"
                type="checkbox"
                checked={verifyImmediately}
                onChange={(e) => setVerifyImmediately(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500/50"
              />
              <label htmlFor="verify-immediately" className="text-xxs text-slate-600 leading-normal">
                <strong>Verifikasi Identitas Segera:</strong> Kirim email aktivasi instan kepada pengguna agar mereka bisa langsung masuk dan mengunggah dokumen KTP/NPWP.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg shadow transition-colors"
          >
            Registrasikan Akun Mitra
          </button>
        </form>
      </div>

      {/* RIGHT SIDE: Keamanan Data Terjamin Info Box (col-span-4) */}
      <div className="lg:col-span-4 space-y-6">
        <h3 className="text-lg font-serif font-bold text-slate-900 pb-2 border-b border-slate-100">
          Protokol Privasi & Keamanan
        </h3>

        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-5">
          <h4 className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-500" /> Keamanan Data Terjamin
          </h4>

          <div className="space-y-4 text-xxs leading-normal text-slate-300">
            <div className="space-y-1">
              <p className="font-bold text-slate-100">1. Enkripsi End-to-End 256-Bit</p>
              <p className="text-slate-400">Seluruh berkas rahasia perusahaan dan data NIB dienkripsi kuat sebelum disimpan di server awan Justitia.</p>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-slate-100">2. Log Audit Otomatis</p>
              <p className="text-slate-400">Setiap registrasi, perubahan draf akta notaris, dan pengunduhan berkas tercatat permanen di IP log pengawasan.</p>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-slate-100">3. Kepatuhan Hukum Indonesia</p>
              <p className="text-slate-400">Sistem registrasi ini dirancang sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia.</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/25 text-xxs text-amber-900 leading-relaxed">
          <div className="flex gap-2 items-start text-amber-800 font-bold mb-1.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>CATATAN ADMIN</span>
          </div>
          Pengguna yang ditambahkan akan mendapatkan detail kredensial mereka melalui alamat email terdaftar, lengkap dengan tautan enkripsi unik untuk keamanan ganti kata sandi.
        </div>
      </div>
    </div>
  );
}
