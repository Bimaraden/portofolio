import { motion } from 'framer-motion';
import { HERO_ASSET } from '../data/portfolioData';
import { Language, PageTab } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { EDITORIAL_EASING } from '../utils/motion';

interface HeroSectionProps {
  language: Language;
  onNavigate: (page: PageTab) => void;
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function HeroSection({ language, onNavigate }: HeroSectionProps) {
  const t = TRANSLATIONS[language].hero;

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[100svh] md:h-[100svh] md:max-h-[1200px] bg-[#E8E4D8] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* LAYER 0: WARM BONE / AGED PAPER CANVAS WITH SUBTLE TACTILE GRAIN */}
      <div className="absolute inset-0 bg-[#E8E4D8] pointer-events-none" />
      <div className="absolute inset-0 paper-texture pointer-events-none opacity-40" />

      {/* ========================================================================= */}
      {/* DESKTOP POSTER COMPOSITION (md and up: 100svh viewport poster)           */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full h-full relative">
        
        {/* LAYER 1: GIANT DEEP FOREST EDITORIAL DISPLAY TITLE: "B I M A" (BEHIND CHARACTER) */}
        <div
          id="hero-headline-layer"
          className="absolute top-[10%] lg:top-[11%] xl:top-[12%] inset-x-0 z-10 w-full flex items-center justify-center pointer-events-none px-4 overflow-visible"
          aria-hidden="true"
        >
          <motion.h1
            id="hero-giant-headline"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', y: 15 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EDITORIAL_EASING }}
            className="hero-oversized-title text-[#173C32] tracking-[-0.03em] text-center whitespace-nowrap select-none drop-shadow-none"
            style={{
              fontSize: 'clamp(110px, 22vw, 320px)',
              lineHeight: 0.8,
            }}
          >
            BIMA
          </motion.h1>
        </div>

        {/* LAYER 2: CHARACTER CUTOUT (OVERLAPPING THE LETTERS "I" AND "M") */}
        <div
          id="hero-character-layer"
          className="absolute bottom-0 left-1/2 -translate-x-[47%] z-20 flex items-end justify-center pointer-events-none"
        >
          <div className="relative flex items-end justify-center">
            {/* Seamless Cutout - Blended directly onto bone paper, NO box shadow, NO container */}
            <motion.img
              src={HERO_ASSET}
              alt="Bima Raden illustrated portrait with headphones and dark jacket"
              loading="eager"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EDITORIAL_EASING }}
              className="h-[64vh] lg:h-[72vh] xl:h-[76vh] max-h-[820px] w-auto max-w-[70vw] object-contain object-bottom block filter-none transition-transform duration-500 hover:scale-[1.01]"
            />

            {/* LAYER 3: INTENTIONAL EDITORIAL CTA BUTTON ANCHORED NEAR RIGHT SHOULDER (DEEP FOREST GREEN) */}
            <motion.button
              id="hero-circular-badge"
              onClick={() => onNavigate('contact')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.45, ease: EDITORIAL_EASING }}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="absolute -right-6 lg:-right-12 top-[44%] lg:top-[46%] -translate-y-1/2 pointer-events-auto w-22 h-22 lg:w-28 lg:h-28 rounded-full bg-[#173C32] text-[#F7F5EE] shadow-md hover:bg-[#111111] transition-colors duration-200 flex flex-col items-center justify-center cursor-pointer group z-30"
              aria-label={language === 'id' ? 'Mari Bicara' : "Let's Talk"}
            >
              <ArrowUpRightIcon className="w-4 h-4 lg:w-5 lg:h-5 text-[#F7F5EE] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mb-0.5" />
              <span className="text-[10px] lg:text-xs font-syne font-extrabold tracking-widest uppercase leading-none text-[#F7F5EE]">
                {t.badgeTalkTop}
              </span>
              <span className="text-[10px] lg:text-xs font-syne font-extrabold tracking-widest uppercase leading-tight text-[#F7F5EE]">
                {t.badgeTalkBottom}
              </span>
            </motion.button>
          </div>
        </div>

        {/* LAYER 4: BOTTOM SUPPORTING SPREAD (ANCHORED EDITORIAL TEXT) */}
        <div className="absolute bottom-8 lg:bottom-12 inset-x-0 z-40 w-full max-w-7xl mx-auto px-8 md:px-12 pointer-events-none">
          <div className="grid grid-cols-12 gap-8 items-end">
            
            {/* BOTTOM-LEFT: DIRECT, HUMAN STATEMENT */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EDITORIAL_EASING }}
              className="col-span-5 text-left pointer-events-auto"
            >
              <h2
                id="hero-tagline"
                className="text-2xl lg:text-3xl xl:text-[38px] font-extrabold text-[#111111] leading-[1.08] tracking-tight font-sans whitespace-pre-line"
              >
                {t.tagline}
              </h2>

              <p className="mt-3 text-xs lg:text-[13px] text-[#111111]/80 leading-relaxed font-sans max-w-sm">
                {t.supporting}
              </p>

              {/* CLEAN PILLS / FOCUS AREAS */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                {t.pills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 text-[11px] font-mono font-medium text-[#173C32] border border-[#173C32]/25 bg-black/[0.02]"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* SPACER COLUMN TO LEAVE ROOM FOR THE CHARACTER'S TORSO */}
            <div className="col-span-2 pointer-events-none" />

            {/* BOTTOM-RIGHT: REAL, RELEVANT INFORMATION */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: EDITORIAL_EASING }}
              className="col-span-5 flex flex-col items-end gap-3 text-right pointer-events-auto"
            >
              <div className="space-y-2">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#111111]/55">
                    {t.locationLabel}
                  </span>
                  <span className="block text-sm font-bold text-[#111111] tracking-wide font-sans">
                    {t.locationValue}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#111111]/55">
                    {t.focusLabel}
                  </span>
                  <span className="block text-sm font-bold text-[#111111] tracking-wide font-sans">
                    {t.focusValue}
                  </span>
                </div>

                {t.statusLabel && t.statusValue && (
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-[#111111]/55">
                      {t.statusLabel}
                    </span>
                    <span className="block text-sm font-semibold text-[#173C32] tracking-wide font-sans">
                      {t.statusValue}
                    </span>
                  </div>
                )}
              </div>

              {/* DIRECT CONTACT LINK */}
              <a
                href={`mailto:${t.directEmail}`}
                className="group text-xs font-mono text-[#173C32] hover:text-[#111111] underline underline-offset-4 tracking-wider mt-1 transition-colors inline-flex items-center gap-1"
              >
                <span>{t.directEmail}</span>
                <span className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>

            </motion.div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE COMPOSITION (< md: structured vertically, no horizontal overflow)   */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full pt-16 pb-10 px-6 relative flex flex-col justify-between min-h-[100svh]">
        
        {/* UPPER POSTER: BIMA HEADLINE + OVERLAPPING CHARACTER */}
        <div className="relative w-full flex flex-col items-center justify-center pt-2">
          
          {/* GIANT BIMA TITLE IN DEEP FOREST GREEN */}
          <div className="w-full text-center pointer-events-none overflow-visible">
            <motion.h1
              initial={{ clipPath: 'inset(100% 0% 0% 0%)', y: 15 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EDITORIAL_EASING }}
              className="text-[#173C32] font-editorial font-extrabold text-[92px] leading-[0.82] tracking-[-0.03em] text-center whitespace-nowrap block select-none"
              style={{
                fontFamily: "'Fraunces', 'Bodoni Moda', Georgia, serif",
                fontVariationSettings: '"wght" 850, "opsz" 144, "SOFT" 80, "WONK" 1',
              }}
            >
              BIMA
            </motion.h1>
          </div>

          {/* OVERLAPPING CHARACTER */}
          <div className="relative -mt-10 sm:-mt-14 z-20 flex justify-center items-end w-full max-w-xs">
            <motion.img
              src={HERO_ASSET}
              alt="Bima Raden illustration"
              loading="eager"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EDITORIAL_EASING }}
              className="h-[46vh] max-h-[400px] w-auto object-contain object-bottom block filter-none"
            />

            {/* CIRCULAR CTA ON RIGHT SHOULDER (DEEP FOREST GREEN) */}
            <motion.button
              id="hero-circular-badge-mobile"
              onClick={() => onNavigate('contact')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.45, ease: EDITORIAL_EASING }}
              whileTap={{ scale: 0.98 }}
              className="absolute -right-2 top-[44%] -translate-y-1/2 w-18 h-18 rounded-full bg-[#173C32] text-[#F7F5EE] shadow-md flex flex-col items-center justify-center cursor-pointer group z-30"
              aria-label={language === 'id' ? 'Mari Bicara' : "Let's Talk"}
            >
              <ArrowUpRightIcon className="w-4 h-4 text-[#F7F5EE] mb-0.5" />
              <span className="text-[9px] font-syne font-black tracking-widest uppercase leading-none text-[#F7F5EE]">
                {t.badgeTalkTop}
              </span>
              <span className="text-[9px] font-syne font-black tracking-widest uppercase leading-tight text-[#F7F5EE]">
                {t.badgeTalkBottom}
              </span>
            </motion.button>
          </div>
        </div>

        {/* LOWER CONTENT: SUPPORTING STATEMENT & REAL DETAILS BELOW CHARACTER */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EDITORIAL_EASING }}
          className="relative z-30 w-full mt-6 flex flex-col gap-5"
        >
          <div>
            <h2 className="text-2xl font-extrabold text-[#111111] leading-[1.1] tracking-tight font-sans whitespace-pre-line">
              {t.tagline}
            </h2>

            <p className="mt-2 text-xs text-[#111111]/80 leading-relaxed font-sans">
              {t.supporting}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {t.pills.map((pill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-mono text-[#173C32] border border-[#173C32]/25 bg-black/[0.02]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

        </motion.div>

      </div>

    </section>
  );
}

