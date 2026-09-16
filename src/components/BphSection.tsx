import { useState, MouseEvent } from 'react';
import { Mail, Award, IdCard, ChevronRight, Users, Sparkles } from 'lucide-react';
import { BPH_MEMBERS } from '../data.ts';
import { BphMember } from '../types.ts';

interface BphSectionProps {
  onSelectMember: (member: BphMember) => void;
  onOpenAllMembers: () => void;
}

export default function BphSection({ onSelectMember, onOpenAllMembers }: BphSectionProps) {
  const [tiltStyles, setTiltStyles] = useState<{ [key: string]: string }>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTiltStyles((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltStyles((prev) => ({
      ...prev,
      [id]: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    }));
  };

  return (
    <section id="profil" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#c5c6cd]/30">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-block px-3 py-1 rounded-full bg-[#d3e4ff] text-[#001c38] text-[11px] font-bold tracking-wider uppercase mb-3 font-heading">
          STRUKTUR KEPEMIMPINAN INTI
        </div>
        <h2 className="text-[28px] md:text-[36px] font-bold text-[#0e1c2f] tracking-tight mb-4 font-heading">
          Badan Pengurus Harian (BPH)
        </h2>
        <p className="text-[15px] text-[#44474c] leading-relaxed">
          Pilar eksekutif yang memegang amanah konstitusi OSIS SMKN 1 REMBANG, bertanggung jawab dalam mengoordinasikan seluruh komisi serta perwakilan majelis kelas.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BPH_MEMBERS.map((member) => (
          <div
            key={member.id}
            onMouseMove={(e) => handleMouseMove(e, member.id)}
            onMouseLeave={() => handleMouseLeave(member.id)}
            onClick={() => onSelectMember(member)}
            style={{ transform: tiltStyles[member.id] || 'none' }}
            className={`tilt-card rounded-xl bg-white border border-[#c5c6cd]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden ${member.borderTopClass} flex flex-col cursor-pointer group`}
          >
            <div className="p-6 flex flex-col h-full">
              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#eceef0] mb-5 ring-1 ring-[#c5c6cd]/30">
                <img
                  src={member.image}
                  alt={`Official portrait of ${member.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-sm text-[10px] font-bold tracking-wide uppercase font-heading ${member.badgeClass}`}>
                  {member.role}
                </div>
              </div>

              {/* Identity Details */}
              <h3 className="text-[17px] font-bold text-[#0e1c2f] mb-1 font-heading group-hover:text-[#426086] transition-colors">
                {member.name}
              </h3>
              <p className="text-[12px] font-semibold text-[#735c00] mb-3">
                {member.classGrade}
              </p>
              <p className="text-[13px] text-[#44474c] italic mb-5 flex-grow line-clamp-3">
                {member.quote}
              </p>

              {/* Footer Meta */}
              <div className="pt-4 border-t border-[#c5c6cd]/30 flex items-center justify-between text-[13px] text-[#426086]">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#44474c]">
                  <IdCard className="w-3.5 h-3.5 text-[#cba72f]" />
                  <span>NIS: {member.nis}</span>
                </span>
                <span
                  title="Lihat profil detail"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#426086] group-hover:text-[#0e1c2f] transition-colors"
                >
                  <Mail className="w-4 h-4 hover:text-[#0e1c2f]" />
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Directory CTA Banner */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0e1c2f] via-[#1a2d48] to-[#0e1c2f] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-[#ffe088] text-[#241a00] flex items-center justify-center font-bold text-[22px] shrink-0 font-heading shadow-xs">
            47
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
              <h3 className="text-[18px] font-bold font-heading">
                Seluruh Anggota Kabinet Cakrawala Bhakti
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#d3e4ff] text-[#001c38] text-[11px] font-bold">
                Struktur Lengkap
              </span>
            </div>
            <p className="text-[13px] text-[#d3e4ff] mt-1 max-w-xl">
              Terdiri dari 7 pengurus Badan Pengurus Harian dan 40 staf di 10 Seksi Bidang. Buka direktori untuk melihat profil, kontak, NIS, dan penugasan seluruh anggota.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAllMembers}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#ffe088] hover:bg-[#ffd54f] text-[#241a00] text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md shrink-0 whitespace-nowrap font-heading"
        >
          <Users className="w-4 h-4 text-[#241a00]" />
          <span>Buka Direktori 47 Anggota</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
