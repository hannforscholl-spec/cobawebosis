import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { ArrowDown, Users, CheckCircle2, UserCheck, CalendarCheck, Camera, RotateCcw, Upload, X } from 'lucide-react';
import ThreeBackground from './ThreeBackground.tsx';
import defaultHeroBg from '../assets/images/osis_hero_background_1789526810187.jpg';
import defaultOsisLogo from '../assets/images/osis_logo_emblem_1789526795308.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const STORAGE_BG_KEY = 'osis_smkn1rembang_custom_bg';
const STORAGE_LOGO_KEY = 'osis_smkn1rembang_custom_logo';

export default function Hero({ onNavigate }: HeroProps) {
  const [bgImage, setBgImage] = useState<string>(defaultHeroBg);
  const [logoImage, setLogoImage] = useState<string>(defaultOsisLogo);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const bgInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Load custom saved images from localStorage if any
  useEffect(() => {
    try {
      const savedBg = localStorage.getItem(STORAGE_BG_KEY);
      if (savedBg) setBgImage(savedBg);

      const savedLogo = localStorage.getItem(STORAGE_LOGO_KEY);
      if (savedLogo) setLogoImage(savedLogo);
    } catch {
      // ignore
    }
  }, []);

  const handleUploadBg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setBgImage(result);
          try {
            localStorage.setItem(STORAGE_BG_KEY, result);
          } catch {
            // ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setLogoImage(result);
          try {
            localStorage.setItem(STORAGE_LOGO_KEY, result);
          } catch {
            // ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToDefault = () => {
    setBgImage(defaultHeroBg);
    setLogoImage(defaultOsisLogo);
    try {
      localStorage.removeItem(STORAGE_BG_KEY);
      localStorage.removeItem(STORAGE_LOGO_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="beranda"
      className="relative min-h-[960px] flex items-center justify-center overflow-hidden border-b border-[#c5c6cd]/30"
    >
      {/* Background: Foto Bersama Pengurus OSIS SMKN 1 Rembang */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Foto Bersama OSIS SMKN 1 Rembang"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Overlay Nuansa Sinematik Merah & Biru Tua Almamater agar Kontras Teks & Logo 3D Tajam */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a121e]/85 via-[#2d1115]/65 to-[#0a121e]/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0a121e]/40 to-[#0a121e]/90" />
      </div>

      {/* 3D WebGL Three.js: Logo OSIS 3D Berputar Interaktif dengan Cincin Emas & Orbit Node */}
      <ThreeBackground logoUrl={logoImage} />

      {/* Tombol Kustomisasi Foto / Logo (Pojok Kanan Atas Hero) */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={() => setShowConfigModal(true)}
          className="px-3.5 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-white/90 hover:text-[#ffe088] backdrop-blur-md border border-white/20 text-[12px] font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          title="Atur atau ganti foto bersama & logo OSIS"
        >
          <Camera className="w-4 h-4 text-[#ffe088]" />
          <span className="hidden sm:inline">Ganti Foto / Logo</span>
        </button>
      </div>

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

        {/* Slogan Resmi OSIS SMKN 1 REMBANG */}
        <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold text-white max-w-4xl tracking-tight leading-[1.12] mb-6 font-heading drop-shadow-md">
          Semangat Berkarya, Membangun Bangsa
        </h1>

        {/* Subjudul Editorial */}
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

        {/* Kartu Statistik Transparan Bersih */}
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

      {/* Modal Pengaturan Foto Bersama & Logo OSIS 3D */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0e1c2f] border border-[#cba72f]/40 rounded-2xl p-6 sm:p-7 max-w-lg w-full text-white shadow-2xl relative">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-[20px] font-bold font-heading mb-2 text-[#ffe088]">
              Sesuaikan Foto &amp; Logo OSIS
            </h3>
            <p className="text-[13px] text-gray-300 mb-6 leading-relaxed">
              Anda dapat mengunggah file foto bersama asli atau logo OSIS Anda langsung dari perangkat (tersimpan di browser).
            </p>

            <div className="space-y-4">
              {/* Upload Foto Background */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[14px] font-bold text-white">Foto Bersama (Background)</div>
                  <div className="text-[12px] text-gray-400">Ganti foto latar belakang panggung utama</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={bgInputRef}
                  onChange={handleUploadBg}
                  className="hidden"
                />
                <button
                  onClick={() => bgInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-lg bg-[#ffe088] hover:bg-[#ffd54f] text-[#241a00] text-[12px] font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih Foto</span>
                </button>
              </div>

              {/* Upload Logo 3D */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[14px] font-bold text-white">Logo OSIS 3D (Medali)</div>
                  <div className="text-[12px] text-gray-400">Ganti tekstur logo di tengah putaran 3D</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={logoInputRef}
                  onChange={handleUploadLogo}
                  className="hidden"
                />
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-[#ffe088] hover:bg-[#ffd54f] text-[#241a00] text-[12px] font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih Logo</span>
                </button>
              </div>
            </div>

            {/* Tombol Aksi Bawah */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={handleResetToDefault}
                className="text-[12px] text-gray-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Kembalikan Default</span>
              </button>

              <button
                onClick={() => setShowConfigModal(false)}
                className="px-5 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[13px] font-semibold cursor-pointer transition-colors"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
