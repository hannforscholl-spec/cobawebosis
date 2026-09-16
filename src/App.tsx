import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import BphSection from './components/BphSection.tsx';
import SekbidSection from './components/SekbidSection.tsx';
import ProgramKerjaSection from './components/ProgramKerjaSection.tsx';
import DokumentasiSection from './components/DokumentasiSection.tsx';
import PemiluSection from './components/PemiluSection.tsx';
import AspirasiSection from './components/AspirasiSection.tsx';
import Footer from './components/Footer.tsx';
import DetailModal from './components/DetailModal.tsx';
import VoteSimulationModal from './components/VoteSimulationModal.tsx';
import DirectoryAnggotaModal from './components/DirectoryAnggotaModal.tsx';
import { BphMember, SekbidItem, ProgramKerjaItem, DokumentasiItem, PaslonKandidat } from './types.ts';

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [isDirectoryModalOpen, setIsDirectoryModalOpen] = useState(false);

  // Modal states
  const [activeModal, setActiveModal] = useState<{
    type: 'member' | 'sekbid' | 'program' | 'doc' | 'notice';
    data: any;
  } | null>(null);

  const [selectedPaslon, setSelectedPaslon] = useState<PaslonKandidat | null>(null);

  // ScrollSpy to update activeSection on scroll
  useEffect(() => {
    const sections = ['beranda', 'profil', 'sekbid', 'program-kerja', 'dokumentasi', 'pemilu-osis', 'aspirasi'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAspirasi = () => {
    handleNavigate('aspirasi');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans antialiased selection:bg-[#ffe088] selection:text-[#241a00]">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAspirasi={handleOpenAspirasi}
        onOpenDirectory={() => setIsDirectoryModalOpen(true)}
      />

      <main className="flex-grow">
        {/* Hero Section with 3D Crest Background */}
        <Hero onNavigate={handleNavigate} />

        {/* Badan Pengurus Harian (BPH) */}
        <BphSection
          onSelectMember={(member: BphMember) =>
            setActiveModal({ type: 'member', data: member })
          }
          onOpenAllMembers={() => setIsDirectoryModalOpen(true)}
        />

        {/* Seksi Bidang (Sekbid) */}
        <SekbidSection
          onSelectSekbid={(sekbid: SekbidItem) =>
            setActiveModal({ type: 'sekbid', data: sekbid })
          }
        />

        {/* Program Kerja & Jadwal */}
        <ProgramKerjaSection
          onSelectProgram={(prog: ProgramKerjaItem) =>
            setActiveModal({ type: 'program', data: prog })
          }
        />

        {/* Dokumentasi Bento Gallery */}
        <DokumentasiSection
          onSelectDoc={(doc: DokumentasiItem) =>
            setActiveModal({ type: 'doc', data: doc })
          }
        />

        {/* Pemilu OSIS Kandidat */}
        <PemiluSection
          onOpenRisalah={(paslon: PaslonKandidat) =>
            setSelectedPaslon(paslon)
          }
        />

        {/* Kotak Aspirasi Siswa */}
        <AspirasiSection />
      </main>

      {/* Academic Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDocNotice={(docName: string) =>
          setActiveModal({ type: 'notice', data: { title: docName } })
        }
      />

      {/* Multipurpose Detail Modal */}
      {activeModal && (
        <DetailModal
          type={activeModal.type}
          data={activeModal.data}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Risalah Visi-Misi Modal */}
      {selectedPaslon && (
        <VoteSimulationModal
          paslon={selectedPaslon}
          onClose={() => setSelectedPaslon(null)}
        />
      )}

      {/* Direktori Lengkap 47 Anggota Modal */}
      <DirectoryAnggotaModal
        isOpen={isDirectoryModalOpen}
        onClose={() => setIsDirectoryModalOpen(false)}
      />
    </div>
  );
}
