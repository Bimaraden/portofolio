import { motion } from 'framer-motion';
import { PageTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { scrollRevealProps, editorialButtonMotion } from '../utils/motion';

interface FooterProps {
  language: Language;
  onNavigate: (page: PageTab) => void;
}

export default function Footer({ language, onNavigate }: FooterProps) {
  const t = TRANSLATIONS[language].footer;
  const tNav = TRANSLATIONS[language].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full bg-[#173C32] text-[#F7F5EE] pt-16 pb-12 px-6 sm:px-8 md:px-12 border-t border-[#173C32]">
      <div className="w-full max-w-6xl mx-auto">
        
        <motion.div
          {...scrollRevealProps(0)}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#F7F5EE]/15"
        >
          
          {/* BRAND IDENTITY */}
          <div className="md:col-span-5">
            <span className="font-syne font-extrabold text-lg tracking-[0.16em] text-[#F7F5EE] uppercase block mb-2">
              {t.brand}
            </span>
            <p className="text-[#F7F5EE]/75 text-xs sm:text-sm max-w-sm leading-relaxed font-sans">
              {t.tagline}
            </p>
          </div>

          {/* SITEMAP */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-mono text-[#C8C1B2] uppercase tracking-widest block mb-4 font-semibold">
                {language === 'id' ? 'Navigasi' : 'Directory'}
              </span>
              <ul className="space-y-2.5 font-medium">
                <li>
                  <button
                    onClick={() => onNavigate('home')}
                    className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors cursor-pointer hover:underline"
                  >
                    {tNav.home}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('work')}
                    className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors cursor-pointer hover:underline"
                  >
                    {tNav.work}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors cursor-pointer hover:underline"
                  >
                    {tNav.about}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors cursor-pointer hover:underline"
                  >
                    {tNav.contact}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-[#C8C1B2] uppercase tracking-widest block mb-4 font-semibold">
                {language === 'id' ? 'Kontak' : 'Contact'}
              </span>
              <ul className="space-y-2.5 font-medium font-mono text-[#F7F5EE]/80">
                <li>
                  <a
                    href="mailto:bimaradensyahputra@gmail.com"
                    className="hover:text-[#F7F5EE] transition-colors block break-all hover:underline"
                  >
                    bimaradensyahputra@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://id.linkedin.com/in/bimaradensyahputra"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F7F5EE] transition-colors block hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/bimsraden"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F7F5EE] transition-colors block hover:underline"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* BACK TO TOP */}
          <div className="md:col-span-3 flex flex-col justify-start items-start md:items-end">
            <motion.button
              {...editorialButtonMotion}
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F7F5EE]/85 hover:text-[#F7F5EE] transition-colors cursor-pointer py-2 px-3 border border-[#F7F5EE]/25 hover:border-[#F7F5EE]"
            >
              <span>{t.backToTop}</span>
            </motion.button>
          </div>

        </motion.div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C8C1B2]">
          <p>
            {t.rights ? (
              <>
                &copy; {new Date().getFullYear()} BIMA RADEN. {t.rights}
              </>
            ) : (
              <>
                &copy; {new Date().getFullYear()} BIMA RADEN
              </>
            )}
          </p>
        </div>

      </div>
    </footer>
  );
}

