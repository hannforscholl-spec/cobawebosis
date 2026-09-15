import { useState, useEffect } from 'react';
import { ZoomIn, FolderOpen, ExternalLink } from 'lucide-react';
import { DOKUMENTASI_LIST, DEFAULT_GDRIVE_LINK } from '../data.ts';
import { DokumentasiItem } from '../types.ts';

interface DokumentasiSectionProps {
  onSelectDoc: (doc: DokumentasiItem) => void;
}

const STORAGE_KEY = 'osis_smkn1rembang_gdrive_url';

export default function DokumentasiSection({ onSelectDoc }: DokumentasiSectionProps) {
  const [gdriveUrl, setGdriveUrl] = useState<string>(DEFAULT_GDRIVE_LINK);

  // Load saved link from localStorage on initial render if any
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.trim().length > 0) {
        setGdriveUrl(saved.trim());
      }
    } catch {
      // fallback
    }
  }, []);

  const handleOpenDrive = () => {
    window.open(gdriveUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="dokumentasi" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#c5c6cd]/30 relative">
      {/* Section Header dengan Tombol Google Drive Tertera Langsung */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-block px-3 py-1 rounded-full bg-[#d3e4ff] text-[#001c38] text-[11px] font-bold tracking-wider uppercase mb-3 font-heading">
          GALERI RESMI ALMAMATER
        </div>
        <h2 className="text-[28px] md:text-[36px] font-bold text-[#0e1c2f] tracking-tight mb-4 font-heading">
          Dokumentasi Agenda &amp; Kiprah
        </h2>
        <p className="text-[15px] text-[#44474c] leading-relaxed mb-6">
          Arsip visual rekam jejak pengabdian siswa dalam memupuk prestasi kejuruan, kebudayaan, serta empati sosial kemanusiaan SMKN 1 REMBANG.
        </p>
      </div>

      {/* Bento Visual Gallery Grid dengan Tombol Google Drive di Setiap Kartu */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {DOKUMENTASI_LIST.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onSelectDoc(doc)}
            className={`${doc.colSpanDesktop} group relative rounded-2xl overflow-hidden bg-[#eceef0] shadow-xs hover:shadow-xl border border-[#c5c6cd]/40 ${doc.aspectDesktop || 'aspect-[16/10]'} cursor-pointer transition-all duration-300 flex flex-col justify-end`}
          >
            {/* Image with zoom on hover */}
            <img
              src={doc.image}
              alt={doc.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c2f]/95 via-[#0e1c2f]/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

            {/* Top Bar on Card: Category and Direct Drive Button */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 border border-white/20 font-bold uppercase tracking-wider">
                {doc.category}
              </span>

              {/* Tombol Tertera Langsung di Kartu: Buka Google Drive */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDrive();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#ffe088] hover:bg-[#ffd54f] text-[#241a00] text-[11px] font-bold flex items-center gap-1.5 shadow-md transition-transform hover:scale-105 cursor-pointer font-heading"
                title="Buka Folder Google Drive untuk dokumentasi ini"
              >
                <FolderOpen className="w-3.5 h-3.5 text-[#241a00]" />
                <span>Buka Drive</span>
                <ExternalLink className="w-3 h-3 text-[#241a00]" />
              </button>
            </div>

            {/* Content Details */}
            <div className="relative z-10 p-6 md:p-7 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#ffe088] uppercase tracking-wider font-heading">
                  {doc.monthYear}
                </span>
                <span className="text-[11px] text-[#c5c6cd]">•</span>
                <span className="text-[11px] text-[#e6e8ea]">
                  Resolusi Penuh di Drive
                </span>
              </div>

              <h3 className="text-[18px] md:text-[22px] font-bold leading-snug font-heading group-hover:text-[#ffe088] transition-colors">
                {doc.title}
              </h3>

              <p className="text-[13px] text-[#e6e8ea] line-clamp-2 leading-relaxed">
                {doc.description}
              </p>

              {/* Bottom Quick Row */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#ffe088]">
                <span className="flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Klik gambar untuk pratinjau detail</span>
                </span>
                <span className="font-semibold text-white/90 underline group-hover:text-[#ffe088]">
                  Lihat Detail &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Tambahan di Bawah Galeri dengan Tombol Google Drive Langsung */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#0e1c2f] via-[#1e3a5f] to-[#0e1c2f] text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg border border-[#cba72f]/30">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#ffe088] text-[#241a00] flex items-center justify-center font-bold text-[20px] shrink-0 shadow-xs">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-[16px] font-bold font-heading text-white">
              Arsip Lengkap Google Drive SMKN 1 REMBANG
            </h4>
            <p className="text-[12px] text-[#d3e4ff]">
              Tersedia folder dokumentasi foto kegiatan, video pentas, dan berkas arsip resmi tanpa batasan kompresi.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenDrive}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#ffe088] hover:bg-[#ffd54f] text-[#241a00] text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all font-heading whitespace-nowrap"
        >
          <FolderOpen className="w-4 h-4 text-[#241a00]" />
          <span>Buka Google Drive Lengkap</span>
          <ExternalLink className="w-4 h-4 text-[#241a00]" />
        </button>
      </div>
    </section>
  );
}
