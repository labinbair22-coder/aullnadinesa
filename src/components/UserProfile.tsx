import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, Award, Shield, Bell, Globe, CheckCircle2 } from "lucide-react";
import { UserProfileInfo } from "../types";

interface UserProfileProps {
  initialProfile: UserProfileInfo;
  onSaveProfile: (profile: UserProfileInfo) => void;
}

export default function UserProfile({ initialProfile, onSaveProfile }: UserProfileProps) {
  const [profile, setProfile] = useState<UserProfileInfo>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  // App settings state
  const [secAuth, setSecAuth] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [lang, setLang] = useState("Bahasa Indonesia");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    setIsEditing(false);
    setShowSavedAlert(true);
    setTimeout(() => setShowSavedAlert(false), 3000);
  };

  const activityLogs = [
    { event: "Audit draf akta selesai", status: "Selesai", date: "25 Juni 2026, 11:20 WIB", ip: "182.16.2.89 (Jakarta)" },
    { event: "Login ke Dashboard Klien", status: "Berhasil", date: "25 Juni 2026, 09:15 WIB", ip: "182.16.2.89 (Jakarta)" },
    { event: "Upload KTP Direktur Baru", status: "Verifikasi Pending", date: "22 Juni 2026, 15:30 WIB", ip: "182.16.2.89 (Jakarta)" },
    { event: "Konsultasi Justitia AI - HKI", status: "Selesai", date: "15 Juni 2026, 14:02 WIB", ip: "114.79.1.55 (Bandung)" },
  ];

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Header Profile card */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.04),transparent_55%)] pointer-events-none"></div>

        <div className="flex items-center gap-5 relative z-10">
          <div className="bg-amber-500 text-slate-950 w-16 h-16 rounded-full flex items-center justify-center font-serif font-bold text-2xl border-2 border-amber-400">
            AA
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-white">{profile.fullName}</h3>
            <p className="text-xs text-amber-400 font-mono tracking-widest mt-0.5 uppercase">Klien / Pemilik UMKM</p>
            <p className="text-xxs text-slate-400 mt-1">Anggota Terdaftar Sejak Januari 2023</p>
          </div>
        </div>

        <div className="relative z-10">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors"
            >
              Ubah Data Profil
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          )}
        </div>
      </div>

      {showSavedAlert && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profil bisnis Anda berhasil diperbarui di server Justitia Partners.</span>
        </div>
      )}

      {/* Main Grid: Info Cards */}
      <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-8 items-start">
        {/* Card 1: Informasi Pribadi */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm">
          <h4 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
            <User className="w-4.5 h-4.5 text-amber-600" /> Informasi Pribadi
          </h4>

          <div className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
              {isEditing ? (
                <input
                  type="text"
                  required
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              ) : (
                <p className="text-xs font-semibold text-slate-800">{profile.fullName}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Mail className="w-3 h-3" /> Alamat Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              ) : (
                <p className="text-xs font-semibold text-slate-800 font-mono">{profile.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Phone className="w-3 h-3" /> Nomor Telepon / WhatsApp
              </label>
              {isEditing ? (
                <input
                  type="text"
                  required
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              ) : (
                <p className="text-xs font-semibold text-slate-800 font-mono">{profile.phone}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Alamat Domisili
              </label>
              {isEditing ? (
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                  rows={2}
                ></textarea>
              ) : (
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">{profile.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Profil Bisnis UMKM */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm">
          <h4 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
            <Briefcase className="w-4.5 h-4.5 text-amber-600" /> Profil Bisnis UMKM
          </h4>

          <div className="space-y-3.5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Badan Usaha</label>
                {isEditing ? (
                  <input
                    type="text"
                    required
                    value={profile.businessName}
                    onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                ) : (
                  <p className="text-xs font-semibold text-slate-800">{profile.businessName}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Sektor Bisnis</label>
                {isEditing ? (
                  <input
                    type="text"
                    required
                    value={profile.businessSector}
                    onChange={(e) => setProfile({ ...profile, businessSector: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                ) : (
                  <p className="text-xs font-semibold text-slate-800">{profile.businessSector}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" /> Nomor Induk Berusaha (NIB)
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    required
                    value={profile.nib}
                    onChange={(e) => setProfile({ ...profile, nib: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                ) : (
                  <p className="text-xs font-semibold text-slate-800 font-mono">{profile.nib}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Status Legalitas</label>
                {isEditing ? (
                  <input
                    type="text"
                    required
                    value={profile.legalStatus}
                    onChange={(e) => setProfile({ ...profile, legalStatus: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                ) : (
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded">
                    {profile.legalStatus}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/80 space-y-2 text-xxs leading-relaxed">
              <p className="text-amber-800 font-bold">Kepatuhan Hukum Terjamin (100%):</p>
              <p className="text-slate-600">
                Data NIB terintegrasi otomatis ke sistem OSS RBA kementerian investasi Indonesia. Keamanan rahasia dagang dilindungi perjanjian NDAs di Justitia Partners.
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* Card 3: Pengaturan Akun */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h4 className="text-sm font-serif font-bold text-slate-900 border-b border-slate-100 pb-2.5">
          Pengaturan Keamanan & Preferensi
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="space-y-1">
              <p className="font-bold text-slate-800 flex items-center gap-1">
                <Shield className="w-4 h-4 text-amber-500" /> Autentikasi Ganda (2FA)
              </p>
              <p className="text-xxs text-slate-500">Mencegah akses ilegal luar kota.</p>
            </div>
            <input
              type="checkbox"
              checked={secAuth}
              onChange={(e) => setSecAuth(e.target.checked)}
              className="w-4.5 h-4.5 text-amber-500 rounded border-slate-300"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="space-y-1">
              <p className="font-bold text-slate-800 flex items-center gap-1">
                <Bell className="w-4 h-4 text-amber-500" /> Notifikasi Email Progres
              </p>
              <p className="text-xxs text-slate-500">Kabar instan berkas Kemenkumham.</p>
            </div>
            <input
              type="checkbox"
              checked={notifEmail}
              onChange={(e) => setNotifEmail(e.target.checked)}
              className="w-4.5 h-4.5 text-amber-500 rounded border-slate-300"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="space-y-1">
              <p className="font-bold text-slate-800 flex items-center gap-1">
                <Globe className="w-4 h-4 text-amber-500" /> Bahasa Sistem
              </p>
              <p className="text-xxs text-slate-500">Pilihan bahasa hukum.</p>
            </div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-xxs font-medium"
            >
              <option value="Bahasa Indonesia">Indonesian (ID)</option>
              <option value="English">English (US)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Card 4: Riwayat Aktivitas & Konsultasi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h4 className="text-sm font-serif font-bold text-slate-900">
            Riwayat Log Aktivitas & Audit Keamanan
          </h4>
        </div>

        <table className="w-full text-left text-xs divide-y divide-slate-100">
          <thead className="bg-slate-50 text-xxs font-bold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Nama Aktivitas Hukum</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Waktu & Tanggal</th>
              <th className="px-6 py-3 text-right">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {activityLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">{log.event}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-slate-500 font-mono">{log.date}</td>
                <td className="px-6 py-4 text-right text-slate-400 font-mono">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
