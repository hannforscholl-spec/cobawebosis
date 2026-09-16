import { useState } from 'react';
import { FileCheck, Sparkles, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { PROGRAM_KERJA_LIST } from '../data.ts';
import { ProgramKerjaItem } from '../types.ts';

interface ProgramKerjaSectionProps {
  onSelectProgram: (prog: ProgramKerjaItem) => void;
}

export default function ProgramKerjaSection({ onSelectProgram }: ProgramKerjaSectionProps) {
  const [filterStatus, setFilterStatus] = useState<string>('Semua');

  const filteredList = PROGRAM_KERJA_LIST.filter((item) => {
    if (filterStatus === 'Semua') return true;
    return item.status === filterStatus;
  });

  return (
    <section id="program-kerja" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#c5c6cd]/30">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-block px-3 py-1 rounded-full bg-[#b3d1fd] text-[#3b5a7f] text-[11px] font-bold tracking-wider uppercase mb-3 font-heading">
          MANAJEMEN STRATEGIS
        </div>
        <h2 className="text-[28px] md:text-[36px] font-bold text-[#0e1c2f] tracking-tight mb-4 font-heading">
          Program Kerja Unggulan &amp; Jadwal
        </h2>
        <p className="text-[15px] text-[#44474c] leading-relaxed">
          Peta jalan eksekusi kegiatan komprehensif untuk mendorong kompetensi siswa secara berkelanjutan sepanjang periode 2024/2025.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {['Semua', 'Terlaksana', 'Sedang Berjalan', 'Mendatang'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                filterStatus === tab
                  ? 'bg-[#0e1c2f] text-white shadow-xs'
                  : 'bg-white text-[#44474c] border border-[#c5c6cd]/50 hover:bg-[#f2f4f6]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-[#c5c6cd]/60 ml-4 md:ml-36 space-y-12">
        {filteredList.map((item) => {
          const isOngoing = item.status === 'Sedang Berjalan';
          const isCompleted = item.status === 'Terlaksana';

          return (
            <div key={item.id} className="relative pl-8 md:pl-12">
              {/* Timeline Marker Dot */}
              {isOngoing ? (
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#cba72f] border-2 border-white ring-4 ring-[#ffe088]" />
              ) : isCompleted ? (
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white border-2 border-[#0e1c2f] ring-4 ring-[#f7f9fb]" />
              ) : (
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#e6e8ea] border-2 border-[#75777d] ring-4 ring-[#f7f9fb]" />
              )}

              {/* Date Pill for Desktop (Left of the timeline line) */}
              <div className="hidden md:block absolute -left-36 top-1 text-right w-28 pr-4">
                <span
                  className={`text-[16px] font-bold block font-heading ${
                    isOngoing ? 'text-[#735c00]' : 'text-[#0e1c2f]'
                  }`}
                >
                  {item.dateDay}
                </span>
                <span className="text-[12px] text-[#44474c] font-medium">
                  {item.dateYear}
                </span>
              </div>

              {/* Card Container */}
              <div
                onClick={() => onSelectProgram(item)}
                className={`p-6 md:p-8 rounded-xl bg-white border shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden cursor-pointer group ${
                  isOngoing
                    ? 'border-[#cba72f]/40 ring-1 ring-[#cba72f]/20'
                    : 'border-[#c5c6cd]/40'
                }`}
              >
                {isOngoing && (
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#ffe088]/20 rounded-full blur-2xl pointer-events-none" />
                )}

                {/* Top Badge & SK Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="md:hidden text-[13px] font-bold text-[#426086]">
                    {item.fullDate}
                  </span>

                  {isOngoing ? (
                    <span className="px-3 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-bold border border-[#cba72f]/40 inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#735c00] animate-ping" />
                      <span>{item.statusNote}</span>
                    </span>
                  ) : isCompleted ? (
                    <span className="px-3 py-1 rounded-full bg-[#eceef0] text-[#44474c] text-[11px] font-semibold border border-[#c5c6cd]/40 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#426086]" />
                      <span>{item.statusNote}</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-[#eceef0] text-[#44474c] text-[11px] font-semibold border border-[#c5c6cd]/30 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#75777d]" />
                      <span>{item.statusNote}</span>
                    </span>
                  )}

                  <span className="text-[11px] text-[#75777d] font-mono">
                    {item.skNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[20px] md:text-[22px] font-bold text-[#0e1c2f] mb-2 font-heading group-hover:text-[#426086] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] md:text-[15px] text-[#44474c] mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Metrics Badges & Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#eceef0] text-[#44474c] text-[11px] font-medium border border-[#c5c6cd]/30"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  <span className="text-[12px] font-semibold text-[#735c00] inline-flex items-center gap-1 group-hover:underline">
                    <span>Lihat Rincian Program</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
