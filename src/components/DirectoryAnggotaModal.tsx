import { useState, useMemo } from 'react';
import { X, Search, Users, Mail, Award, CheckCircle2, ShieldCheck, Filter, ChevronDown, ExternalLink } from 'lucide-react';
import { ALL_CABINET_MEMBERS } from '../data.ts';
import { CabinetMember } from '../types.ts';

interface DirectoryAnggotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDivision?: string;
}

const DIVISIONS = [
  { id: 'ALL', label: 'Semua (47)' },
  { id: 'PH', label: 'PH Inti (8)' },
  { id: 'Sekbid I', label: 'Sekbid I (4)' },
  { id: 'Sekbid II', label: 'Sekbid II (4)' },
  { id: 'Sekbid III', label: 'Sekbid III (4)' },
  { id: 'Sekbid IV', label: 'Sekbid IV (4)' },
  { id: 'Sekbid V', label: 'Sekbid V (4)' },
  { id: 'Sekbid VI', label: 'Sekbid VI (4)' },
  { id: 'Sekbid VII', label: 'Sekbid VII (4)' },
  { id: 'Sekbid VIII', label: 'Sekbid VIII (4)' },
  { id: 'Sekbid IX', label: 'Sekbid IX (4)' },
  { id: 'Sekbid X', label: 'Sekbid X (4)' },
];

export default function DirectoryAnggotaModal({
  isOpen,
  onClose,
  initialDivision = 'ALL'
}: DirectoryAnggotaModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState(initialDivision);
  const [selectedMember, setSelectedMember] = useState<CabinetMember | null>(null);

  const filteredMembers = useMemo(() => {
    return ALL_CABINET_MEMBERS.filter((member) => {
      const matchDivision =
        selectedDivision === 'ALL' || member.division === selectedDivision;

      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        query === '' ||
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.divisionName.toLowerCase().includes(query) ||
        member.classGrade.toLowerCase().includes(query) ||
        member.nis.includes(query);

      return matchDivision && matchSearch;
    });
  }, [searchQuery, selectedDivision]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#c5c6cd]/50 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c5c6cd]/40 bg-[#f7f9fb]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0e1c2f] text-[#ffe088] flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] font-bold text-[#0e1c2f] font-heading">
                  Direktori Seluruh Anggota Kabinet
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#d3e4ff] text-[#001c38] text-[11px] font-bold">
                  47 Anggota Resmi
                </span>
              </div>
              <p className="text-[12px] text-[#44474c]">
              Pengurus Harian &amp; 10 Seksi Bidang OSIS SMKN 1 REMBANG (2026/2027)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#44474c] hover:bg-[#e6e8ea] hover:text-[#191c1e] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-6 border-b border-[#c5c6cd]/30 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75777d]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan nama, NIS, kelas, atau jabatan..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f2f4f6] border border-[#c5c6cd]/50 text-[13px] text-[#191c1e] placeholder-[#75777d] focus:outline-none focus:ring-2 focus:ring-[#0e1c2f] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#75777d] hover:text-[#191c1e]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Division count pill */}
            <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f7f9fb] border border-[#c5c6cd]/40 text-[12px] text-[#44474c]">
              <Filter className="w-3.5 h-3.5 text-[#0e1c2f]" />
              <span>Menampilkan: <strong>{filteredMembers.length}</strong> anggota</span>
            </div>
          </div>

          {/* Division Pill Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[12px]">
            {DIVISIONS.map((div) => {
              const active = selectedDivision === div.id;
              return (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivision(div.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0e1c2f] text-white shadow-xs font-semibold'
                      : 'bg-[#f2f4f6] text-[#44474c] hover:bg-[#e6e8ea] hover:text-[#0e1c2f]'
                  }`}
                >
                  {div.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Members Cards Roster */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#f7f9fb]">
          {filteredMembers.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="w-12 h-12 text-[#c5c6cd] mx-auto mb-3" />
              <h4 className="text-[16px] font-bold text-[#0e1c2f] mb-1 font-heading">
                Tidak ada anggota yang cocok
              </h4>
              <p className="text-[13px] text-[#44474c] mb-4">
                Coba sesuaikan kata kunci pencarian atau ganti filter divisi.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDivision('ALL');
                }}
                className="px-4 py-2 rounded-lg bg-[#0e1c2f] text-white text-[12px] font-semibold hover:bg-[#1a2d48] transition-colors cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => {
                const isLeader = member.isCoordinator || member.isBph;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="p-4 rounded-xl bg-white border border-[#c5c6cd]/40 shadow-xs hover:shadow-md hover:border-[#0e1c2f]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                  >
                    {isLeader && (
                      <div className="absolute top-0 right-0">
                        <div className="w-0 h-0 border-t-[28px] border-t-[#cba72f] border-l-[28px] border-l-transparent" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#eceef0] ring-1 ring-[#c5c6cd]/40 shrink-0 relative">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider font-heading ${
                                member.isBph
                                  ? 'bg-[#0e1c2f] text-white'
                                  : member.isCoordinator
                                  ? 'bg-[#ffe088] text-[#241a00]'
                                  : 'bg-[#e6e8ea] text-[#44474c]'
                              }`}
                            >
                              {member.division}
                            </span>
                            {isLeader && (
                              <span className="text-[10px] text-[#735c00] font-bold font-heading">
                                Inti
                              </span>
                            )}
                          </div>
                          <h4 className="text-[14px] font-bold text-[#0e1c2f] font-heading truncate group-hover:text-[#426086] transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-[11px] font-semibold text-[#735c00] truncate">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="p-2 rounded-lg bg-[#f7f9fb] border border-[#c5c6cd]/25 text-[11px] space-y-1 mb-3">
                        <div className="flex items-center justify-between text-[#44474c]">
                          <span>Kelas:</span>
                          <strong className="text-[#0e1c2f]">{member.classGrade}</strong>
                        </div>
                        <div className="flex items-center justify-between text-[#44474c]">
                          <span>NIS:</span>
                          <span className="font-mono text-[#0e1c2f] font-medium">{member.nis}</span>
                        </div>
                      </div>

                      <p className="text-[12px] text-[#55585f] line-clamp-2 leading-relaxed italic mb-2">
                        "{member.bio}"
                      </p>
                    </div>

                    {/* Email footer */}
                    <div className="pt-2.5 border-t border-[#c5c6cd]/30 flex items-center justify-between text-[11px] text-[#426086]">
                      <span className="truncate flex items-center gap-1">
                        <Mail className="w-3 h-3 shrink-0" />
                        <span className="truncate">{member.email.split('@')[0]}</span>
                      </span>
                      <span className="text-[10px] font-bold text-[#0e1c2f] group-hover:translate-x-0.5 transition-transform shrink-0">
                        Detail &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer Summary */}
        <div className="px-6 py-3.5 border-t border-[#c5c6cd]/40 bg-[#f7f9fb] flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#44474c]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#cba72f]" />
            <span>
              Seluruh 47 anggota disahkan melalui <strong>Surat Keputusan Kepala SMKN 1 REMBANG No: 008/SK/SMKN1-RMB/2026</strong>.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0e1c2f] text-white text-[12px] font-semibold hover:bg-[#1a2d48] transition-colors cursor-pointer"
          >
            Tutup Direktori
          </button>
        </div>
      </div>

      {/* Member Quick Detail Submodal */}
      {selectedMember && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#c5c6cd]/40 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#eceef0] ring-1 ring-[#c5c6cd]/40 shrink-0">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0e1c2f] text-white font-heading">
                    {selectedMember.division}
                  </span>
                  <h4 className="text-[17px] font-bold text-[#0e1c2f] font-heading mt-1">
                    {selectedMember.name}
                  </h4>
                  <p className="text-[12px] font-semibold text-[#735c00]">
                    {selectedMember.role}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1.5 rounded-lg text-[#75777d] hover:bg-[#f2f4f6] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f2f4f6] border border-[#c5c6cd]/30 space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[#44474c]">Divisi / Bidang:</span>
                <strong className="text-[#0e1c2f]">{selectedMember.divisionName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474c]">Tingkat Kelas:</span>
                <strong className="text-[#0e1c2f]">{selectedMember.classGrade}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474c]">Nomor Induk Siswa:</span>
                <strong className="text-[#0e1c2f] font-mono">{selectedMember.nis}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474c]">Email Resmi:</span>
                <span className="text-[#426086] truncate">{selectedMember.email}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0e1c2f] font-heading">
                Tugas &amp; Portofolio
              </span>
              <p className="text-[13px] text-[#44474c] leading-relaxed italic bg-[#f7f9fb] p-3 rounded-lg border border-[#c5c6cd]/25">
                "{selectedMember.bio}"
              </p>
            </div>

            <button
              onClick={() => setSelectedMember(null)}
              className="w-full py-2.5 rounded-xl bg-[#0e1c2f] text-white text-[13px] font-semibold hover:bg-[#1a2d48] transition-colors cursor-pointer"
            >
              Kembali ke Direktori
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
