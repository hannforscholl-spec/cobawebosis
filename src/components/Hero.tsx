import { ArrowDown, Users, CheckCircle2, UserCheck, CalendarCheck } from 'lucide-react';
import ThreeBackground from './ThreeBackground.tsx';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="beranda"
      className="relative min-h-[920px] flex items-center justify-center overflow-hidden bg-academic-grid border-b border-[#c5c6cd]/30"
    >
      {/* 3D WebGL Three.js interactive crest & geometric rings */}
      <ThreeBackground />

      {/* Hero Gradient Vignette for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f7f9fb]/85 via-[#f7f9fb]/60 to-[#f7f9fb] pointer-events-none z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28 flex flex-col items-center text-center">
        {/* Institutional Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#cba72f]/50 shadow-xs text-[#735c00] mb-6 animate-float-slow">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cba72f] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cba72f]" />
          </span>
          <span className="text-[11px] font-bold tracking-wider uppercase font-heading">
            DEWAN PENGURUS HARIAN MASA BAKTI 2026/2027
          </span>
        </div>

        {/* Headline Typography */}
        <h1 className="text-[32px] sm:text-[44px] lg:text-[48px] font-extrabold text-[#0e1c2f] max-w-4xl tracking-tight leading-[1.15] mb-6 font-heading">
          Semangat Berkarya, Membangun Bangsa
        </h1>

        {/* Subtitle Editorial Copy */}
        <p className="text-[15px] sm:text-[17px] text-[#44474c] max-w-2xl mx-auto mb-10 leading-relaxed">
          Wadah representasi aspirasi berintegritas tinggi bagi seluruh civitas akademika SMK Negeri 1 Rembang. Membangun kultur organisasi teladan, adaptif terhadap kemajuan teknologi kejuruan dan kebudayaan nusantara.
        </p>

        {/* CTA Cluster */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onNavigate('program-kerja')}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#0e1c2f] text-white text-[14px] font-semibold shadow-xs border border-[#426086] hover:bg-[#426086] hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
          >
            <span>Lihat Program Kerja</span>
            <ArrowDown className="w-4 h-4 text-[#ffe088]" />
          </button>

          <button
            onClick={() => onNavigate('profil')}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-white/90 text-[#0e1c2f] text-[14px] font-semibold shadow-xs border border-[#c5c6cd]/70 hover:bg-[#f2f4f6] transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Users className="w-4 h-4 text-[#426086]" />
            <span>Struktur Pengurus PH</span>
          </button>
        </div>

        {/* Floating Stat Badges Bento Cluster */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 pt-4">
          <div className="p-5 rounded-xl bg-white/85 backdrop-blur-md border border-[#c5c6cd]/40 shadow-xs flex items-center gap-4 text-left transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-[#d3e4ff] flex items-center justify-center text-[#001c38]">
              <CheckCircle2 className="w-6 h-6 text-[#1e3e62]" />
            </div>
            <div>
              <div className="text-[20px] font-bold text-[#0e1c2f] leading-none mb-1 font-heading">
                10 Sekbid
              </div>
              <div className="text-[13px] text-[#44474c]">
                Seksi Bidang Aktif &amp; Terstruktur
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white/85 backdrop-blur-md border border-[#c5c6cd]/40 shadow-xs flex items-center gap-4 text-left transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-[#ffe088] flex items-center justify-center text-[#241a00]">
              <UserCheck className="w-6 h-6 text-[#735c00]" />
            </div>
            <div>
              <div className="text-[20px] font-bold text-[#0e1c2f] leading-none mb-1 font-heading">
                98.6%
              </div>
              <div className="text-[13px] text-[#44474c]">
                Tingkat Partisipasi Siswa Aktif
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white/85 backdrop-blur-md border border-[#c5c6cd]/40 shadow-xs flex items-center gap-4 text-left transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-[#d6e3fe] flex items-center justify-center text-[#0e1c2f]">
              <CalendarCheck className="w-6 h-6 text-[#0e1c2f]" />
            </div>
            <div>
              <div className="text-[20px] font-bold text-[#0e1c2f] leading-none mb-1 font-heading">
                99+ Acara
              </div>
              <div className="text-[13px] text-[#44474c]">
                Realisasi Program Terjadwal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
