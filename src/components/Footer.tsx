import { Landmark, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDocNotice: (docName: string) => void;
}

export default function Footer({ onNavigate, onOpenDocNotice }: FooterProps) {
  return (
    <footer className="bg-[#0e1c2f] text-[#c5c6cd] pt-16 pb-12 border-t border-[#426086]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#426086]/30">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#ffe088] ring-1 ring-[#cba72f]/50">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[17px] font-bold text-white tracking-tight block font-heading">
                  OSIS SMKN 1 REMBANG
                </span>
                <span className="text-[11px] font-semibold text-[#b3d1fd] tracking-widest uppercase block">
                  KABINET CAKRAWALA BHAKTI 2024/2025
                </span>
              </div>
            </div>

            <p className="text-[13px] text-[#e6e8ea]/80 leading-relaxed max-w-sm">
              Gedung Student Center Lt. 2, SMK Negeri 1 Rembang. Mengabdi dengan keteguhan kejuruan, keluhuran budi pekerti, dan kepedulian sosial.
            </p>

            <div className="space-y-1.5 text-[12px] text-[#e6e8ea]/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#cba72f]" />
                <span>Jl. Raya Rembang No. 1, Rembang, Jawa Tengah</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#cba72f]" />
                <span>osis@smkn1rembang.sch.id</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#cba72f]" />
                <span>(0295) 691-042 (Sekretariat OSIS)</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Column */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              {['beranda', 'profil', 'sekbid', 'program-kerja', 'dokumentasi', 'pemilu-osis'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item)}
                    className="hover:text-white hover:underline transition-colors capitalize cursor-pointer"
                  >
                    {item.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Documents */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Tautan Dokumen
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                'AD/ART OSIS Terkini',
                'Buku Panduan Ekstrakurikuler',
                'Transparansi Kas Triwulan',
                'Format Pengajuan Proposal',
                'Statuta Pemilu Siswa'
              ].map((docName, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onOpenDocNotice(docName)}
                    className="hover:text-[#ffe088] transition-colors inline-flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    <span>{docName}</span>
                    <ExternalLink className="w-3 h-3 text-[#75777d]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* External Partners & Social Media */}
          <div>
            <h4 className="text-[13px] font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Kanal Informasi
            </h4>
            <p className="text-[12px] text-[#e6e8ea]/80 leading-relaxed mb-3">
              Dapatkan pembaruan kegiatan harian dan live streaming pengumuman:
            </p>
            <div className="flex flex-col gap-2 text-[12px]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center justify-between p-2 rounded bg-white/5 border border-white/10 hover:border-[#cba72f]/40 transition-colors"
              >
                <span>Instagram Resmi</span>
                <span className="text-[#ffe088] font-mono">@osis_adhirajasa</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center justify-between p-2 rounded bg-white/5 border border-white/10 hover:border-[#cba72f]/40 transition-colors"
              >
                <span>YouTube Channel</span>
                <span className="text-[#ffe088]">Adhirajasa TV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#e6e8ea]/60">
          <p>
            &copy; {new Date().getFullYear()} OSIS SMK Negeri 1 Rembang. Hak Cipta Terpelihara.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <span>Dibina oleh Kesiswaan &amp; MPK SMKN 1 REMBANG</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#cba72f]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
