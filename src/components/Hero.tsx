import { ArrowDown, Users, CheckCircle2, UserCheck, CalendarCheck } from 'lucide-react';
import ThreeBackground from './ThreeBackground.tsx';

// Pastikan file gambar Anda di folder assets:
import defaultHeroBg from '../assets/images/bareng.jpg';
import defaultOsisLogo from '../assets/images/LOGO.png';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="beranda"
      className="relative min-h-[960px] flex items-center justify-center overflow-hidden border-b border-[#c5c6cd]/30"
    >
      {/* Background: Foto Bersama Pengurus OSIS SMKN 1 Rembang */}
      <div className="absolute inset-0 z-0">
        <img
          src={defaultHeroBg}
          alt="Foto Bersama OSIS SMKN 1 Rembang"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Lapisan Gradient Gelap & Senja agar Teks Kontras dan Terbaca Jelas */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a121e]/85 via-[#2d1115]/65 to-[#0a121e]/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0a121e]/40 to-[#0a121e]/90" />
      </div>

      {/* 3D WebGL Three.js: Logo Perisai OSKANSAR 3D */}
      <ThreeBackground logoUrl={defaultOsisLogo} />

      {/* Konten Depan Hero */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 flex flex-col items-center text-center text-white">
        {/* Lencana Institusional */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#ffe088]/40 shadow-md text-[#ffe088] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffe088] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffe088]" />
          </span>
          <span className="text-[11px] font-bold tracking-wider uppercase font-heading">
            DEWAN PENGURUS HARIAN MASA BAKTI 2024/2025
          </span>
        </div>

        {/* Slogan Resmi */}
        <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold text-white max-w-4xl tracking-tight leading-[1.12] mb-6 font-heading drop-shadow-md">
          Semangat Berkarya, Membangun Bangsa
        </h1>

        {/* Subjudul */}
        <p className="text-[15px] sm:text-[17px] text-[#e2e8f0] max-w-2xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-sm">
          Wadah representasi aspirasi berintegritas tinggi bagi seluruh civitas akademika SMK Negeri 1 Rembang. Membangun kultur organisasi teladan, adaptif terhadap kemajuan teknologi kejuruan dan kebudayaan nusantara.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onNavigate('program-kerja')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ffe088] hover:bg-[#ffd54f] text-[#241a00] text-[14px] font-bold shadow-lg transition-all duration-200 cursor-pointer active:scale-95 font-heading"
          >
            <span>Lihat Program Kerja</span>
            <ArrowDown className="w-4 h-4 text-[#241a00]" />
          </button>

          <button
            onClick={() => onNavigate('profil')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[14px] font-semibold backdrop-blur-md shadow-lg border border-white/30 transition-all duration-200 cursor-pointer active:scale-95 font-heading"
          >
            <Users className="w-4 h-4 text-[#ffe088]" />
            <span>Struktur Pengurus BPH</span>
          </button>
        </div>

        {/* Statistik Singkat */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 shadow-md flex items-center gap-4 text-left transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#ffe088]/20 border border-[#ffe088]/40 flex items-center justify-center text-[#ffe088] shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#ffe088]" />
            </div>
            <div>
              <div className="text-[22px] font-bold text-white leading-none mb-1 font-heading">
                10 Sekbid
              </div>
              <div className="text-[13px] text-[#cbd5e1]">
                Seksi Bidang Aktif &amp; Terstruktur
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 shadow-md flex items-center gap-4 text-left transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#ffe088]/20 border border-[#ffe088]/40 flex items-center justify-center text-[#ffe088] shrink-0">
              <UserCheck className="w-6 h-6 text-[#ffe088]" />
            </div>
            <div>
              <div className="text-[22px] font-bold text-white leading-none mb-1 font-heading">
                98.6%
              </div>
              <div className="text-[13px] text-[#cbd5e1]">
                Tingkat Partisipasi Siswa Aktif
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 shadow-md flex items-center gap-4 text-left transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#ffe088]/20 border border-[#ffe088]/40 flex items-center justify-center text-[#ffe088] shrink-0">
              <CalendarCheck className="w-6 h-6 text-[#ffe088]" />
            </div>
            <div>
              <div className="text-[22px] font-bold text-white leading-none mb-1 font-heading">
                45+ Acara
              </div>
              <div className="text-[13px] text-[#cbd5e1]">
                Realisasi Program Terjadwal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}