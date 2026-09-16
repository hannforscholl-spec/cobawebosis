import { useState } from 'react';
import { Church, Flag, GraduationCap, Palette, Laptop, Globe, HeartHandshake, Dumbbell, Shield, Sparkles, ChevronRight } from 'lucide-react';
import { SEKBID_LIST } from '../data.ts';
import { SekbidItem } from '../types.ts';

interface SekbidSectionProps {
  onSelectSekbid: (sekbid: SekbidItem) => void;
}

// All 10 Sekbid definitions for completeness
const ALL_SEKBID: SekbidItem[] = [
  ...SEKBID_LIST,
  {
    id: 'sekbid-4',
    numberLabel: 'SEKBID IV',
    title: 'Kepribadian Unggul & Wawasan Kewirausahaan',
    description: 'Menumbuhkan jiwa kewirausahaan siswa melalui unit koperasi pelajar, bazar kreatif, dan manajemen finansial mandiri.',
    coordinator: 'Naufal Rizky (XI IPS 3)',
    iconName: 'Sparkles',
    programs: ['Bazar Siswa Preneur', 'Pelatihan Literasi Keuangan Usia Dini', 'Reorganisasi Koperasi Siswa'],
    membersCount: 13
  },
  {
    id: 'sekbid-5',
    numberLabel: 'SEKBID V',
    title: 'Demokrasi, HAM & Lingkungan Hidup',
    description: 'Advokasi kesetaraan hak belajar, pengelolaan sanitasi hijau, serta aksi reboisasi dan audit jejak karbon sekolah.',
    coordinator: 'Salma Aulia (XI MIPA 5)',
    iconName: 'HeartHandshake',
    programs: ['Bank Sampah Digital', 'Penanaman Pohon Angkatan', 'Fasilitasi Ruang Debat Terbuka'],
    membersCount: 14
  },
  {
    id: 'sekbid-6',
    numberLabel: 'SEKBID VI',
    title: 'Kreativitas, Keterampilan & Kewirausahaan',
    description: 'Eksplorasi kerajinan tangan, desain produk fungsional, dan pameran prototipe karya siswa.',
    coordinator: 'Farrel Danu (XII MIPA 3)',
    iconName: 'Sparkles',
    programs: ['Pameran Inovasi Siswa', 'Workshop Daur Ulang Plastik', 'Klinik Desain Kemasan Produk'],
    membersCount: 12
  },
  {
    id: 'sekbid-7',
    numberLabel: 'SEKBID VII',
    title: 'Kebugaran Jasmani & Rekreasi',
    description: 'Penyelenggaraan liga olahraga pelajar antar kelas, senam kebugaran berkala, dan penataran wasit siswa.',
    coordinator: 'Gilang Prakoso (XII IPS 1)',
    iconName: 'Dumbbell',
    programs: ['Liga Futsal & Basket Adhirajasa', 'Senam Kebugaran Jasmani Jumat', 'Kompetisi E-Athletics'],
    membersCount: 15
  }
];

export default function SekbidSection({ onSelectSekbid }: SekbidSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedList = showAll ? ALL_SEKBID : SEKBID_LIST;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Church':
        return <Church className="w-5 h-5" />;
      case 'Flag':
        return <Flag className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <section id="sekbid" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#c5c6cd]/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-bold tracking-wider uppercase mb-3 font-heading">
            DIVISI KERJA OPERASIONAL
          </div>
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#0e1c2f] tracking-tight font-heading">
            Seksi Bidang (Sekbid I - X)
          </h2>
        </div>
        <p className="text-[15px] text-[#44474c] max-w-md leading-relaxed">
          Ujung tombak pemenuhan minat, bakat, spiritualitas, serta kapabilitas saintifik seluruh pelajar SMAN 1 Adhirajasa.
        </p>
      </div>

      {/* Sekbid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectSekbid(item)}
            className="p-6 rounded-xl bg-white border border-[#c5c6cd]/40 shadow-xs hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex items-center justify-center text-[#0e1c2f] group-hover:bg-[#0e1c2f] group-hover:text-white transition-colors duration-200">
                  {getIcon(item.iconName)}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#eceef0] text-[#44474c] border border-[#c5c6cd]/40 font-heading">
                  {item.numberLabel}
                </span>
              </div>

              <h3 className="text-[17px] font-bold text-[#0e1c2f] mb-2 font-heading group-hover:text-[#426086] transition-colors">
                {item.title}
              </h3>
              <p className="text-[13px] text-[#44474c] leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#c5c6cd]/30 flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#426086]">
                {item.coordinator}
              </span>
              <span className="text-[11px] text-[#735c00] font-medium flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                <span>Rincian</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle More Sekbid */}
      <div className="mt-10 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#c5c6cd]/70 bg-white text-[#0e1c2f] text-[13px] font-semibold hover:bg-[#f2f4f6] transition-all cursor-pointer shadow-xs"
        >
          <span>{showAll ? 'Tampilkan Sekbid Utama (6 Bidang)' : 'Tampilkan Seluruh Sekbid Lengkap (I - X)'}</span>
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showAll ? '-rotate-90' : 'rotate-90'}`} />
        </button>
      </div>
    </section>
  );
}
