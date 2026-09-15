import { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X, Users } from 'lucide-react';

// Import logo OSKANSAR
import logoImg from '../assets/images/LOGO.png';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAspirasi: () => void;
  onOpenDirectory?: () => void;
}

export default function Navbar({
  activeSection,
  onNavigate,
  onOpenAspirasi,
  onOpenDirectory,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (height > 0) {
        setScrollProgress(
          (winScroll / height) * 100
        );
      }
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'sekbid', label: 'Sekbid' },
    { id: 'program-kerja', label: 'Program Kerja' },
    { id: 'dokumentasi', label: 'Dokumentasi' },
    { id: 'pemilu-osis', label: 'Pemilu OSIS' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-[#c5c6cd]/30 shadow-xs">

      {/* =====================================================
          SCROLL PROGRESS BAR
      ====================================================== */}
      <div className="absolute top-0 left-0 w-full h-[2.5px] bg-[#e6e8ea]/40">
        <div
          className="h-full bg-gradient-to-r from-[#426086] to-[#cba72f] transition-all duration-75 ease-out"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">

        {/* ===================================================
            BRAND LOGO & IDENTITY
        ==================================================== */}
        <button
          onClick={() =>
            handleLinkClick('beranda')
          }
          className="
            flex
            items-center
            gap-3.5
            group
            text-[#191c1e]
            text-left
            transition-all
            duration-200
            ease-out
            active:scale-98
            cursor-pointer
          "
        >

          {/* =================================================
              LOGO OSKANSAR
          ================================================== */}
          <div
            className="
              relative
              w-12
              h-14
              flex
              items-center
              justify-center
              shrink-0
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <img
              src={logoImg}
              alt="Logo OSKANSAR"
              className="
                w-full
                h-full
                object-contain
                drop-shadow-[0_3px_6px_rgba(14,28,47,0.20)]
              "
            />
          </div>

          {/* =================================================
              BRAND TEXT
          ================================================== */}
          <div className="flex flex-col">
            <span
              className="
                text-[16px]
                font-bold
                text-[#191c1e]
                tracking-tight
                leading-tight
                font-heading
              "
            >
              OSIS SMKN 1 REMBANG
            </span>

            <span
              className="
                text-[11px]
                font-semibold
                text-[#426086]
                tracking-widest
                uppercase
              "
            >
              KABINET GENERASI BERKARYA
            </span>
          </div>
        </button>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              activeSection === link.id;

            return (
              <button
                key={link.id}
                onClick={() =>
                  handleLinkClick(link.id)
                }
                className={`
                  text-[14px]
                  font-semibold
                  transition-colors
                  duration-200
                  cursor-pointer
                  ${
                    isActive
                      ? 'text-[#735c00] border-b-2 border-[#735c00] pb-1'
                      : 'text-[#44474c] hover:text-[#735c00] pb-1'
                  }
                `}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* =====================================================
            TRAILING ACTION CLUSTER
        ====================================================== */}
        <div className="flex items-center gap-3">

          {/* Directory */}
          {onOpenDirectory && (
            <button
              onClick={onOpenDirectory}
              className="
                hidden
                md:inline-flex
                items-center
                gap-1.5
                px-3.5
                py-2
                rounded-lg
                bg-[#f2f4f6]
                text-[#0e1c2f]
                text-[13px]
                font-semibold
                border
                border-[#c5c6cd]/50
                hover:bg-[#e6e8ea]
                transition-all
                duration-200
                cursor-pointer
              "
            >
              <Users className="w-4 h-4 text-[#426086]" />

              <span>
                47 Anggota
              </span>
            </button>
          )}

          {/* Aspirasi */}
          <button
            onClick={onOpenAspirasi}
            className="
              hidden
              sm:inline-flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-lg
              bg-[#0e1c2f]
              text-white
              text-[14px]
              font-semibold
              shadow-xs
              border
              border-[#426086]/40
              hover:bg-[#426086]
              transition-all
              duration-200
              cursor-pointer
              active:scale-95
            "
          >
            <ShieldCheck className="w-4 h-4 text-[#cba72f]" />

            <span>
              Aspirasi Siswa
            </span>
          </button>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}
          <button
            aria-label="Buka Menu Navigasi"
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="
              lg:hidden
              p-2.5
              rounded-lg
              text-[#191c1e]
              hover:bg-[#eceef0]
              transition-colors
              cursor-pointer
            "
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE DROPDOWN
      ====================================================== */}
      {mobileMenuOpen && (
        <div
          className="
            lg:hidden
            px-6
            pb-6
            pt-2
            bg-white/95
            backdrop-blur-lg
            border-t
            border-[#c5c6cd]/30
            shadow-lg
          "
        >
          <div className="flex flex-col gap-2.5">

            {/* Mobile Navigation */}
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() =>
                  handleLinkClick(
                    link.id
                  )
                }
                className={`
                  text-left
                  py-2.5
                  px-3
                  rounded-md
                  text-[15px]
                  font-medium
                  transition-colors
                  ${
                    activeSection ===
                    link.id
                      ? 'text-[#735c00] bg-[#ffe088]/20 border-l-3 border-[#735c00] font-semibold'
                      : 'text-[#44474c] hover:bg-[#f2f4f6]'
                  }
                `}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Directory */}
            {onOpenDirectory && (
              <button
                onClick={() => {
                  onOpenDirectory();
                  setMobileMenuOpen(
                    false
                  );
                }}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-lg
                  bg-[#f2f4f6]
                  border
                  border-[#c5c6cd]/50
                  text-[#0e1c2f]
                  text-[14px]
                  font-semibold
                  hover:bg-[#e6e8ea]
                  transition-all
                  cursor-pointer
                "
              >
                <Users className="w-4 h-4 text-[#426086]" />

                <span>
                  Direktori Seluruh 47 Anggota
                </span>
              </button>
            )}

            {/* Mobile Aspirasi */}
            <button
              onClick={() => {
                onOpenAspirasi();
                setMobileMenuOpen(
                  false
                );
              }}
              className="
                mt-1
                flex
                items-center
                justify-center
                gap-2
                py-3
                rounded-lg
                bg-[#0e1c2f]
                text-white
                text-[14px]
                font-semibold
                hover:bg-[#426086]
                transition-all
                cursor-pointer
              "
            >
              <ShieldCheck className="w-4 h-4 text-[#cba72f]" />

              <span>
                Portal Aspirasi Siswa
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}