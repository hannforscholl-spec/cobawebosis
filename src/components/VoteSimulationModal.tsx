import { X, Download, Printer, CheckCircle, ShieldCheck, Award } from 'lucide-react';
import { PaslonKandidat } from '../types.ts';

interface VoteSimulationModalProps {
  paslon: PaslonKandidat | null;
  onClose: () => void;
}

export default function VoteSimulationModal({ paslon, onClose }: VoteSimulationModalProps) {
  if (!paslon) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#c5c6cd]/50 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c5c6cd]/40 bg-[#f7f9fb]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#cba72f]" />
            <span className="text-[12px] font-bold text-[#0e1c2f] tracking-wider uppercase font-heading">
              Risalah Resmi Visi-Misi Paslon {paslon.number}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#44474c] hover:bg-[#e6e8ea] hover:text-[#191c1e] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Document */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Document Header Banner */}
          <div className="p-5 rounded-xl bg-[#0e1c2f] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-bold text-[#ffe088] tracking-widest uppercase block font-heading">
                KOMISI PEMILIHAN UMUM SISWA (KPU) SMK N1 REMBANG
              </span>
              <h3 className="text-[20px] font-bold mt-1 font-heading">
                Pasangan Calon No. {paslon.number}: {paslon.names}
              </h3>
              <p className="text-[12px] text-[#d3e4ff] mt-0.5 italic">
                "{paslon.slogan}"
              </p>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#ffe088] text-[#241a00] flex items-center justify-center font-bold text-[22px] font-heading shrink-0">
              {paslon.number}
            </div>
          </div>

          {/* Calon Ketua & Calon Wakil Ketua */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#f2f4f6] border border-[#c5c6cd]/40">
              <span className="text-[10px] font-bold text-[#75777d] uppercase tracking-wider block mb-1 font-heading">
                CALON KETUA UMUM
              </span>
              <h4 className="text-[15px] font-bold text-[#0e1c2f] font-heading">{paslon.ketua}</h4>
            </div>
            <div className="p-4 rounded-xl bg-[#f2f4f6] border border-[#c5c6cd]/40">
              <span className="text-[10px] font-bold text-[#75777d] uppercase tracking-wider block mb-1 font-heading">
                CALON WAKIL KETUA UMUM
              </span>
              <h4 className="text-[15px] font-bold text-[#0e1c2f] font-heading">{paslon.wakil}</h4>
            </div>
          </div>

          {/* Visi */}
          <div>
            <h4 className="text-[12px] font-bold text-[#0e1c2f] uppercase tracking-wider mb-2 font-heading">
              Visi Kepemimpinan
            </h4>
            <div className="p-4 rounded-xl bg-[#ffe088]/20 border border-[#cba72f]/40 text-[14px] text-[#241a00] italic leading-relaxed">
              {paslon.vision}
            </div>
          </div>

          {/* Misi */}
          <div>
            <h4 className="text-[12px] font-bold text-[#0e1c2f] uppercase tracking-wider mb-2 font-heading">
              Rencana Misi Aksi
            </h4>
            <div className="space-y-2 text-[13px] text-[#44474c]">
              {paslon.missions.map((m, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-[#c5c6cd]/30 shadow-xs">
                  <CheckCircle className="w-4 h-4 text-[#cba72f] shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {paslon.quickStats.map((stat, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#eceef0] border border-[#c5c6cd]/30">
                <span className="text-[10px] text-[#75777d] uppercase block font-heading">{stat.label}</span>
                <span className="text-[14px] font-bold text-[#0e1c2f] font-heading">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Verification seal */}
          <div className="p-3.5 rounded-lg bg-[#f7f9fb] border border-[#c5c6cd]/40 text-[11px] text-[#75777d] flex items-center justify-between">
            <span>Nomor Register Berkas KPU: <strong>KPU-ADH-2024-0{paslon.number}</strong></span>
            <span className="text-[#426086] font-semibold">Status: Berkas Sah &amp; Final</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#f7f9fb] border-t border-[#c5c6cd]/40 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg border border-[#c5c6cd] bg-white text-[#0e1c2f] text-[13px] font-semibold hover:bg-[#eceef0] flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Risalah</span>
          </button>

          <button
            onClick={() => {
              alert(`Berkas Risalah Visi Misi Paslon ${paslon.number} (${paslon.names}) telah siap. Format arsip resmi KPU SMAN 1 Adhirajasa tersimpan.`);
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-[#0e1c2f] text-white text-[13px] font-semibold hover:bg-[#426086] flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-[#ffe088]" />
            <span>Unduh Risalah Digital</span>
          </button>
        </div>
      </div>
    </div>
  );
}
