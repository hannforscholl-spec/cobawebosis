import { useState, MouseEvent } from 'react';
import { Vote, Download, CheckCircle, ThumbsUp, FileText } from 'lucide-react';
import { PASLON_LIST } from '../data.ts';
import { PaslonKandidat } from '../types.ts';

interface PemiluSectionProps {
  onOpenRisalah: (paslon: PaslonKandidat) => void;
}

export default function PemiluSection({ onOpenRisalah }: PemiluSectionProps) {
  const [paslonData, setPaslonData] = useState<PaslonKandidat[]>(PASLON_LIST);
  const [votedId, setVotedId] = useState<string | null>(null);

  const handleSupport = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (votedId === id) return;

    setPaslonData((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, supportSignatures: p.supportSignatures + 1 };
        }
        return p;
      })
    );
    setVotedId(id);
  };

  return (
    <section id="pemilu-osis" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#c5c6cd]/30">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-block px-3 py-1 rounded-full bg-[#ffe088]/30 text-[#735c00] text-[11px] font-bold tracking-wider uppercase mb-3 border border-[#cba72f]/40 font-heading">
          SUARA DEMOKRASI KAMPUS SEKOLAH
        </div>
        <h2 className="text-[28px] md:text-[36px] font-bold text-[#0e1c2f] tracking-tight mb-4 font-heading">
          Kandidat Pemilu OSIS 2025/2026
        </h2>
        <p className="text-[15px] text-[#44474c] leading-relaxed">
          Penyelenggaraan Pemilihan Umum Ketua &amp; Wakil Ketua OSIS secara jujur, adil, dan berbasis verifikasi digital KPU Siswa SMKN 1 REMBANG.
        </p>
      </div>

      {/* Three Candidate Pairs Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paslonData.map((paslon) => {
          const isPaslon1 = paslon.number === '01';
          const isPaslon2 = paslon.number === '02';
          const isPaslon3 = paslon.number === '03';
          const hasVotedThis = votedId === paslon.id;

          const badgeBg = isPaslon1
            ? 'bg-[#0e1c2f] text-white'
            : isPaslon2
            ? 'bg-[#426086] text-white'
            : 'bg-[#1b5e40] text-white';

          return (
            <div
              key={paslon.id}
              className="p-6 md:p-7 rounded-2xl bg-white border border-[#c5c6cd]/40 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Header Roster */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[20px] font-heading shadow-xs ${badgeBg}`}
                    >
                      {paslon.number}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-[#75777d] tracking-wider uppercase block font-heading">
                        PASLON NOMOR URUT
                      </span>
                      <h3 className="text-[17px] font-bold text-[#0e1c2f] font-heading truncate">
                        {paslon.names}
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#d3e4ff] text-[#001c38] text-[10px] font-bold shrink-0">
                    {paslon.badgeText}
                  </span>
                </div>

                {/* Candidate Photo */}
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#eceef0] mb-6 ring-1 ring-[#c5c6cd]/30 group relative">
                  <img
                    src={paslon.image}
                    alt={`Foto Kampanye Paslon ${paslon.names}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-[12px] font-medium italic">
                      "{paslon.slogan}"
                    </span>
                  </div>
                </div>

                {/* Vision & Mission */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-[11px] font-bold text-[#0e1c2f] mb-1.5 uppercase tracking-wider font-heading">
                      Visi Strategis
                    </h4>
                    <p className="text-[13px] text-[#44474c] leading-relaxed italic bg-[#f2f4f6]/60 p-3 rounded-lg border border-[#c5c6cd]/30">
                      {paslon.vision}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold text-[#0e1c2f] mb-1.5 uppercase tracking-wider font-heading">
                      Misi Utama
                    </h4>
                    <ul className="text-[13px] text-[#44474c] space-y-1.5 list-disc list-inside leading-relaxed">
                      {paslon.missions.map((mission, idx) => (
                        <li key={idx}>{mission}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Actions & Support Count */}
              <div className="pt-4 border-t border-[#c5c6cd]/30 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Vote className="w-4 h-4 text-[#cba72f]" />
                    <span className="text-[12px] text-[#44474c]">
                      Dukungan: <strong className="text-[#0e1c2f]">{paslon.supportSignatures} Suara</strong>
                    </span>
                  </div>
                  <span className="text-[11px] text-[#426086] font-semibold">
                    {paslon.quickStats[0]?.value}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <button
                    onClick={(e) => handleSupport(paslon.id, e)}
                    className={`flex-1 px-3 py-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      hasVotedThis
                        ? 'bg-[#ffe088] text-[#241a00] shadow-xs'
                        : 'bg-[#eceef0] text-[#0e1c2f] hover:bg-[#d3e4ff]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{hasVotedThis ? 'Didukung!' : 'Dukung'}</span>
                  </button>

                  <button
                    onClick={() => onOpenRisalah(paslon)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#e6e8ea] hover:bg-[#0e1c2f] hover:text-white transition-all text-[11px] font-semibold text-[#0e1c2f] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <span>Risalah</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
