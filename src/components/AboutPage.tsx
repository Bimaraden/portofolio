import { motion } from 'framer-motion';
import { HERO_ASSET } from '../data/portfolioData';
import { PageTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { scrollRevealProps, editorialButtonMotion } from '../utils/motion';

function ArrowUpRightIcon({ className = '' }: { className?: string }) {
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

interface AboutPageProps {
  language: Language;
  onNavigate: (page: PageTab) => void;
}

export default function AboutPage({ language, onNavigate }: AboutPageProps) {
  const t = TRANSLATIONS[language].about;

  const capabilities = [
    {
      title: t.focusWebTitle,
      description: t.focusWebDesc,
      skills: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'Supabase', 'Firebase'],
    },
    {
      title: t.focusAutoTitle,
      description: t.focusAutoDesc,
      skills: ['n8n Workflow', 'Webhook', 'Scraping Soal UTBK/TKA', 'AI Prompting', 'Integrasi Google Sheets'],
    },
    {
      title: t.focusIotTitle,
      description: t.focusIotDesc,
      skills: ['Arduino Nano', 'Sensor Suara (Clap)', 'Sensor Suhu', 'Display LCD 16x2', 'Modul Relay'],
    },
  ];

  return (
    <div id="about-page" className="w-full bg-[#E8E4D8] text-[#111111] pt-28 sm:pt-36 pb-24 px-6 sm:px-8 md:px-12">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* EDITORIAL HEADER WITH SCROLL REVEAL */}
        <motion.div
          {...scrollRevealProps(0)}
          className="border-b border-[#111111]/15 pb-12 mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#173C32] block mb-3 font-bold">
            {t.eyebrow}
          </span>
          <h1 className="editorial-h2 text-[#111111] font-extrabold tracking-tight max-w-3xl leading-[1.05]">
            {t.heading}
          </h1>
        </motion.div>

        {/* ASYMMETRIC BIOGRAPHY SPREAD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* LEFT: CHARACTER PORTRAIT IN WARM OFF-WHITE GROUNDING */}
          <motion.div
            {...scrollRevealProps(0.05)}
            className="lg:col-span-5"
          >
            <div className="bg-[#F7F5EE] p-6 text-[#111111] border border-[#111111]/15">
              <div className="aspect-[4/5] overflow-hidden flex items-end justify-center bg-[#E8E4D8]/60">
                <img
                  src={HERO_ASSET}
                  alt="Bima Raden portrait illustration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
              <div className="pt-4 mt-4 border-t border-[#111111]/15 flex items-baseline justify-between">
                <div>
                  <span className="font-syne font-extrabold text-sm tracking-wider uppercase block text-[#111111]">
                    BIMA RADEN
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/60 block mt-0.5">
                    Indonesia
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: ESSAY / STATEMENT WITH EDITORIAL WHITESPACE */}
          <motion.div
            {...scrollRevealProps(0.1)}
            className="lg:col-span-7 flex flex-col gap-8 text-[#111111]"
          >
            <div className="space-y-6 text-base sm:text-lg text-[#111111]/85 leading-relaxed font-sans">
              <p className="font-semibold text-[#111111] text-lg sm:text-xl leading-snug">
                {t.bio1}
              </p>
              <p>
                {t.bio2}
              </p>
              <p className="text-[#111111]/75 text-sm sm:text-base">
                {t.bio3}
              </p>
            </div>

            {/* DIRECT CONTACT ANCHOR */}
            <div className="pt-6 border-t border-[#111111]/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111]/60 block">
                  {language === 'id' ? 'KONTAK LANGSUNG' : 'DIRECT CONTACT'}
                </span>
                <a
                  href="mailto:bimaradensyahputra@gmail.com"
                  className="group text-sm font-mono text-[#173C32] underline underline-offset-4 hover:text-[#111111] transition-colors inline-flex items-center gap-1"
                >
                  <span>bimaradensyahputra@gmail.com</span>
                  <span className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </div>
              <motion.button
                {...editorialButtonMotion}
                onClick={() => onNavigate('contact')}
                className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#173C32] hover:text-[#111111] transition-colors cursor-pointer border-b border-[#173C32] hover:border-[#111111] pb-0.5"
              >
                <span>{language === 'id' ? 'Kirim Pesan' : 'Get In Touch'}</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </motion.button>
            </div>
          </motion.div>

        </div>

        {/* CORE DISCIPLINES: CLEAN HORIZONTAL ROWS WITH STAGGERED SCROLL REVEALS */}
        <div className="border-t border-[#111111]/15 pt-16">
          <motion.span
            {...scrollRevealProps(0)}
            className="text-xs font-mono uppercase tracking-[0.25em] text-[#173C32] block mb-8 font-bold"
          >
            {language === 'id' ? 'BIDANG KEAHLIAN & STACK' : 'CORE DISCIPLINES & STACK'}
          </motion.span>

          <div className="divide-y divide-[#111111]/15">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                {...scrollRevealProps(idx * 0.08)}
                className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-4">
                  <h3 className="text-xl font-syne font-extrabold text-[#111111] tracking-tight">
                    {cap.title}
                  </h3>
                </div>
                <div className="md:col-span-8 space-y-4">
                  <p className="text-sm text-[#111111]/80 leading-relaxed font-sans max-w-xl">
                    {cap.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cap.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 text-xs font-mono text-[#173C32] border border-[#173C32]/25 bg-black/[0.02] transition-colors hover:border-[#173C32] hover:bg-[#173C32]/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

