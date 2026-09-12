import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { EDITORIAL_EASING } from '../utils/motion';

interface NavbarProps {
  currentPage: PageTab;
  language: Language;
  onNavigate: (page: PageTab) => void;
  onToggleLanguage: (lang: Language) => void;
}

export default function Navbar({
  currentPage,
  language,
  onNavigate,
  onToggleLanguage,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language].nav;

  const navItems: { label: string; page: PageTab }[] = [
    { label: t.home, page: 'home' },
    { label: t.work, page: 'work' },
    { label: t.about, page: 'about' },
    { label: t.contact, page: 'contact' },
  ];

  const handleLinkClick = (page: PageTab) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Handle ESC key and click outside to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('#mobile-menu-toggle')
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-[9999] w-full bg-[#E8E4D8] border-b border-[#111111]/10 transition-colors duration-200"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 h-16 sm:h-[72px] flex items-center justify-between">
        
        {/* BRAND LOGO: BIMA RADEN */}
        <button
          id="nav-logo-btn"
          onClick={() => handleLinkClick('home')}
          className="text-left group cursor-pointer select-none transition-transform duration-200 active:scale-98"
        >
          <span className="font-syne font-extrabold text-base sm:text-lg tracking-[0.16em] text-[#111111] uppercase block leading-none group-hover:text-[#173C32] transition-colors duration-200">
            {t.brand}
          </span>
          <span className="text-[10px] tracking-[0.2em] text-[#111111]/60 uppercase block font-mono mt-1 font-medium">
            {t.brandSubtitle}
          </span>
        </button>

        {/* DESKTOP EDITORIAL NAVIGATION: SUBTLE CAPSULE + CRISP WHITE SILHOUETTE ACTIVE PILL */}
        <nav
          id="desktop-nav"
          className="hidden md:flex items-center rounded-full p-1 relative"
          style={{
            backgroundColor: 'rgba(17, 17, 17, 0.05)',
            border: '1px solid rgba(17, 17, 17, 0.12)',
          }}
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                id={`nav-link-${item.page}`}
                onClick={() => handleLinkClick(item.page)}
                className={`relative px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'text-[#111111] font-bold'
                    : 'text-[#111111]/70 hover:text-[#111111] hover:opacity-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-[#111111]/10"
                    transition={{
                      duration: 0.3,
                      ease: EDITORIAL_EASING,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT SIDE: MINIMAL LANGUAGE SWITCHER + CONTACT CTA */}
        <div className="hidden md:flex items-center gap-6">
          {/* MINIMAL LANGUAGE TOGGLE: ID / EN */}
          <div
            id="language-switcher"
            className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider text-[#111111]/60"
          >
            <button
              id="lang-btn-id"
              onClick={() => onToggleLanguage('id')}
              className={`transition-colors cursor-pointer ${
                language === 'id' ? 'text-[#111111] font-bold' : 'hover:text-[#111111]'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <span className="text-[#111111]/30">/</span>
            <button
              id="lang-btn-en"
              onClick={() => onToggleLanguage('en')}
              className={`transition-colors cursor-pointer ${
                language === 'en' ? 'text-[#111111] font-bold' : 'hover:text-[#111111]'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* EDITORIAL CONTACT LINK (Single effect: arrow shifts 3px) */}
          <button
            id="nav-connect-btn"
            onClick={() => handleLinkClick('contact')}
            className="group text-xs font-mono font-bold uppercase tracking-widest text-[#173C32] border-b border-[#173C32] hover:text-[#111111] hover:border-[#111111] pb-0.5 transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>{language === 'id' ? 'KONTAK' : 'CONTACT'}</span>
            <span className="text-[11px] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
          </button>
        </div>

        {/* MOBILE HEADER RIGHT: LANGUAGE + ANIMATED 3-BAR HAMBURGER */}
        <div className="flex md:hidden items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#111111]/70 mr-1">
            <button
              onClick={() => onToggleLanguage('id')}
              className={`cursor-pointer transition-colors ${language === 'id' ? 'text-[#111111] font-bold' : 'text-[#111111]/50'}`}
            >
              ID
            </button>
            <span className="text-[#111111]/30">/</span>
            <button
              onClick={() => onToggleLanguage('en')}
              className={`cursor-pointer transition-colors ${language === 'en' ? 'text-[#111111] font-bold' : 'text-[#111111]/50'}`}
            >
              EN
            </button>
          </div>

          {/* ANIMATED HAMBURGER: 3 BARS SMOOTHLY TRANSFORMING INTO X (250-300ms) */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex flex-col justify-center items-center gap-[6px] p-2 focus:outline-hidden cursor-pointer"
            aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {/* Top Bar */}
            <span
              className={`block w-6 h-[2px] bg-[#111111] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''
              }`}
            />
            {/* Middle Bar */}
            <span
              className={`block w-6 h-[2px] bg-[#111111] transition-all duration-200 ease-in-out ${
                mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}
            />
            {/* Bottom Bar */}
            <span
              className={`block w-6 h-[2px] bg-[#111111] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''
              }`}
            />
          </button>
        </div>

      </div>

      {/* MOBILE FULLSCREEN/OVERLAY EDITORIAL MENU (WARM BONE BACKGROUND #E8E4D8) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EDITORIAL_EASING }}
            className="md:hidden fixed inset-x-0 top-16 sm:top-[72px] bg-[#E8E4D8] border-b border-[#111111]/15 p-8 shadow-xl flex flex-col gap-6 max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-2 pt-2">
              {navItems.map((item, index) => {
                const isActive = currentPage === item.page;
                return (
                  <motion.button
                    key={item.page}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.28,
                      ease: EDITORIAL_EASING,
                    }}
                    onClick={() => handleLinkClick(item.page)}
                    className={`text-left text-2xl sm:text-3xl font-editorial font-bold tracking-tight py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-white text-[#111111] shadow-xs border border-[#111111]/10'
                        : 'text-[#111111]/70 hover:text-[#111111] hover:bg-white/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#111111]" />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-[#111111]/15 flex items-center justify-between text-xs text-[#111111]/70 font-mono">
              <span className="tracking-wider text-[#111111] font-semibold">BIMA RADEN</span>
              <button
                onClick={() => handleLinkClick('contact')}
                className="font-bold uppercase tracking-wider text-[#173C32] hover:text-[#111111] inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{language === 'id' ? 'MULAI NGOBROL' : 'GET IN TOUCH'}</span>
                <span>↗</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

