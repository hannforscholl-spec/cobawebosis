import { X, Mail, CheckCircle2, Calendar, MapPin, Award, FileText, UserCheck, ExternalLink, Users, FolderOpen } from 'lucide-react';
import { BphMember, SekbidItem, ProgramKerjaItem, DokumentasiItem } from '../types.ts';
import { ALL_CABINET_MEMBERS, DEFAULT_GDRIVE_LINK } from '../data.ts';

interface DetailModalProps {
  type: 'member' | 'sekbid' | 'program' | 'doc' | 'notice';
  data: any;
  onClose: () => void;
}

export default function DetailModal({ type, data, onClose }: DetailModalProps) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#c5c6cd]/50 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c5c6cd]/40 bg-[#f7f9fb]">
          <span className="text-[12px] font-bold text-[#426086] tracking-wider uppercase font-heading">
            {type === 'member' && 'Profil Pengurus Harian'}
            {type === 'sekbid' && 'Katalog Seksi Bidang'}
            {type === 'program' && 'Dokumen Program Kerja'}
            {type === 'doc' && 'Galeri Arsip Visual'}
            {type === 'notice' && 'Arsip Dokumen Resmi'}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#44474c] hover:bg-[#e6e8ea] hover:text-[#191c1e] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* 1. MEMBER PROFILE MODAL */}
          {type === 'member' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
                <div className="w-32 h-40 shrink-0 rounded-xl overflow-hidden bg-[#eceef0] ring-1 ring-[#c5c6cd]/40 shadow-xs">
                  <img
                    src={(data as BphMember).image}
                    alt={(data as BphMember).name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#0e1c2f] text-white text-[10px] font-bold tracking-wider uppercase font-heading">
                    {(data as BphMember).role}
                  </span>
                  <h3 className="text-[22px] font-bold text-[#0e1c2f] font-heading">
                    {(data as BphMember).name}
                  </h3>
                  <p className="text-[13px] font-semibold text-[#735c00]">
                    {(data as BphMember).classGrade}
                  </p>
                  <p className="text-[12px] text-[#44474c]">
                    NIS: <strong className="text-[#0e1c2f]">{(data as BphMember).nis}</strong>
                  </p>
                  <p className="text-[12px] text-[#426086] flex items-center gap-1.5 pt-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{(data as BphMember).email}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f2f4f6] border border-[#c5c6cd]/40 space-y-2">
                <h4 className="text-[11px] font-bold text-[#0e1c2f] uppercase tracking-wider font-heading">
                  Visi &amp; Prinsip Kepemimpinan
                </h4>
                <p className="text-[14px] text-[#44474c] italic">
                  {(data as BphMember).quote}
                </p>
              </div>

              {((data as BphMember).fullBio || (data as BphMember).instagram) && (
                <div className="space-y-2 text-[13px] text-[#44474c] leading-relaxed">
                  <h4 className="text-[11px] font-bold text-[#0e1c2f] uppercase tracking-wider font-heading">
                    Tugas &amp; Tanggung Jawab
                  </h4>
                  <p>{(data as BphMember).fullBio}</p>
                </div>
              )}
            </div>
          )}

          {/* 2. SEKBID DETAIL MODAL */}
          {type === 'sekbid' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-bold font-heading">
                  {(data as SekbidItem).numberLabel}
                </span>
                <span className="text-[12px] text-[#426086] font-medium">
                  Jumlah Anggota: {(data as SekbidItem).membersCount} Siswa
                </span>
              </div>

              <h3 className="text-[22px] font-bold text-[#0e1c2f] font-heading">
                {(data as SekbidItem).title}
              </h3>
              <p className="text-[14px] text-[#44474c] leading-relaxed">
                {(data as SekbidItem).description}
              </p>

              <div className="p-4 rounded-xl bg-[#f2f4f6] border border-[#c5c6cd]/40">
                <span className="text-[11px] font-bold text-[#75777d] uppercase tracking-wider block mb-1 font-heading">
                  Koordinator Bidang
                </span>
                <span className="text-[15px] font-bold text-[#0e1c2f]">
                  {(data as SekbidItem).coordinator}
                </span>
              </div>

              <div>
                <h4 className="text-[12px] font-bold text-[#0e1c2f] uppercase tracking-wider mb-2.5 font-heading">
                  Agenda Kerja Pokok Divisi:
                </h4>
                <ul className="space-y-2 text-[13px] text-[#44474c]">
                  {(data as SekbidItem).programs?.map((prog: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#c5c6cd]/30 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#cba72f] shrink-0" />
                      <span>{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Roster of Members in this Sekbid */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-[12px] font-bold text-[#0e1c2f] uppercase tracking-wider font-heading flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#426086]" />
                    <span>Susunan Pengurus Bidang</span>
                  </h4>
                  <span className="text-[11px] text-[#75777d]">
                    4 Anggota Terdaftar
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ALL_CABINET_MEMBERS.filter(m => m.division === (data as SekbidItem).numberLabel).map((m) => (
                    <div key={m.id} className="p-2.5 rounded-lg bg-[#f7f9fb] border border-[#c5c6cd]/30 flex items-center gap-2.5">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-9 h-9 rounded-lg object-cover ring-1 ring-[#c5c6cd]/40 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[12px] font-bold text-[#0e1c2f] font-heading truncate">
                          {m.name}
                        </h5>
                        <p className="text-[10px] text-[#735c00] truncate">
                          {m.role} ({m.classGrade})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. PROGRAM KERJA MODAL */}
          {type === 'program' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0e1c2f] text-white text-[11px] font-bold font-heading">
                  {(data as ProgramKerjaItem).status}
                </span>
                <span className="text-[12px] font-mono text-[#75777d]">
                  {(data as ProgramKerjaItem).skNumber}
                </span>
              </div>

              <h3 className="text-[22px] font-bold text-[#0e1c2f] font-heading leading-snug">
                {(data as ProgramKerjaItem).title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                <div className="p-3 rounded-lg bg-[#f2f4f6] border border-[#c5c6cd]/30 flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#426086]" />
                  <div>
                    <span className="text-[10px] text-[#75777d] block font-heading">TANGGAL PELAKSANAAN</span>
                    <span className="font-semibold text-[#0e1c2f]">{(data as ProgramKerjaItem).fullDate}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#f2f4f6] border border-[#c5c6cd]/30 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#735c00]" />
                  <div>
                    <span className="text-[10px] text-[#75777d] block font-heading">LOKASI KEGIATAN</span>
                    <span className="font-semibold text-[#0e1c2f]">{(data as ProgramKerjaItem).location || 'Kampus SMAN 1 Adhirajasa'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[12px] font-bold text-[#0e1c2f] uppercase tracking-wider mb-2 font-heading">
                  Deskripsi &amp; Sasaran Program
                </h4>
                <p className="text-[14px] text-[#44474c] leading-relaxed">
                  {(data as ProgramKerjaItem).description}
                </p>
              </div>

              {(data as ProgramKerjaItem).objective && (
                <div className="p-4 rounded-xl bg-[#ffe088]/20 border border-[#cba72f]/40">
                  <h4 className="text-[11px] font-bold text-[#735c00] uppercase tracking-wider mb-1 font-heading">
                    Tujuan Strategis
                  </h4>
                  <p className="text-[13px] text-[#241a00] leading-relaxed">
                    {(data as ProgramKerjaItem).objective}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-[12px] font-bold text-[#0e1c2f] uppercase tracking-wider mb-2 font-heading">
                  Indikator Keberhasilan / Capaian
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(data as ProgramKerjaItem).metrics?.map((m: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-[#eceef0] text-[#0e1c2f] text-[12px] font-semibold border border-[#c5c6cd]/40">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. DOKUMENTASI LIGHTBOX MODAL */}
          {type === 'doc' && (
            <div className="space-y-4">
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-black/90">
                <img
                  src={(data as DokumentasiItem).image}
                  alt={(data as DokumentasiItem).title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-[#735c00] font-heading">
                    {(data as DokumentasiItem).monthYear}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#d3e4ff] text-[#001c38] font-semibold">
                    {(data as DokumentasiItem).category}
                  </span>
                </div>
                <h3 className="text-[20px] font-bold text-[#0e1c2f] font-heading">
                  {(data as DokumentasiItem).title}
                </h3>
                <p className="text-[14px] text-[#44474c] leading-relaxed">
                  {(data as DokumentasiItem).description}
                </p>
                {(data as DokumentasiItem).photographer && (
                  <p className="text-[12px] text-[#75777d] pt-1">
                    Arsip visual resmi: <strong>{(data as DokumentasiItem).photographer}</strong>
                  </p>
                )}

                {/* Direct Google Drive Button in Lightbox */}
                <div className="pt-3">
                  <button
                    onClick={() => {
                      const url = localStorage.getItem('osis_smkn1rembang_gdrive_url') || DEFAULT_GDRIVE_LINK;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#0e1c2f] hover:bg-[#1a2d48] text-white text-[13px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm font-heading"
                  >
                    <FolderOpen className="w-4 h-4 text-[#ffe088]" />
                    <span>BUKA FOLDER GOOGLE DRIVE DOKUMENTASI</span>
                    <ExternalLink className="w-4 h-4 text-[#ffe088]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. NOTICE MODAL */}
          {type === 'notice' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#d3e4ff] text-[#001c38] flex items-center justify-center mx-auto mb-2">
                <FileText className="w-8 h-8 text-[#426086]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#0e1c2f] font-heading">
                {data.title}
              </h3>
              <p className="text-[14px] text-[#44474c] max-w-md mx-auto leading-relaxed">
                Dokumen resmi telah diarsipkan dalam format digital terotentikasi OSIS SMKN 1 REMBANG (E-Library Repositori Civitas).
              </p>
              <div className="p-4 rounded-xl bg-[#f2f4f6] text-[12px] text-[#75777d] font-mono text-left max-w-md mx-auto">
                <div>KODE ARSIP: RMB-DOC-2024-884</div>
                <div>STATUS: TERVERIFIKASI SEKRETARIAT UMUM</div>
                <div>AKSES: SELURUH CIVITAS AKADEMIKA SMKN 1 REMBANG</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#f7f9fb] border-t border-[#c5c6cd]/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#0e1c2f] text-white text-[13px] font-semibold hover:bg-[#426086] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
