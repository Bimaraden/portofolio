import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTab, Project, Language } from './types';
import { PROJECTS } from './data/portfolioData';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WorkPage from './components/WorkPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import { ArrowUpRight } from 'lucide-react';
import {
  EDITORIAL_EASING,
  pageVariants,
  scrollRevealProps,
  scrollRevealImageProps,
  editorialButtonMotion,
} from './utils/motion';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageTab>('home');
  const [language, setLanguage] = useState<Language>('id');
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageTab) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen w-full bg-[#E8E4D8] text-[#111111] flex flex-col font-sans-clean">
      {/* NAVBAR WITH DIRECT CANVAS EDITORIAL NAVIGATION (STICKY TOP Z-9999) */}
      <Navbar
        currentPage={currentPage}
        language={language}
        onNavigate={handleNavigate}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* MAIN ROUTER WITH SUBTLE, FAST EDITORIAL PAGE TRANSITIONS (300-350ms) */}
      <main className="flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="page-home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {/* HERO SECTION: WARM BONE CANVAS & DEEP FOREST TYPOGRAPHY */}
              <HeroSection
                language={language}
                onNavigate={handleNavigate}
              />

              {/* DISCIPLINES & FOCUS: DEEP FOREST GREEN DARK ACCENT SECTION (#173C32) */}
              <section className="w-full bg-[#173C32] text-[#F7F5EE] py-20 sm:py-28 px-6 sm:px-8 md:px-12 border-t border-[#111111]/10">
                <div className="w-full max-w-6xl mx-auto">
                  
                  {/* HEADER WITH SCROLL REVEAL */}
                  <motion.div
                    {...scrollRevealProps(0)}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 mb-12 border-b border-[#F7F5EE]/15"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8C1B2] block mb-2 font-semibold">
                        {language === 'id' ? 'KEAHLIAN & FOKUS' : 'DISCIPLINES & FOCUS'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-[#F7F5EE] tracking-tight">
                        Full Stack &bull; Otomasi &bull; IoT
                      </h2>
                    </div>
                    <motion.button
                      {...editorialButtonMotion}
                      onClick={() => handleNavigate('about')}
                      className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#F7F5EE] border-b border-[#F7F5EE] pb-0.5 hover:text-[#C8C1B2] hover:border-[#C8C1B2] transition-colors cursor-pointer"
                    >
                      <span>{language === 'id' ? 'Tentang Bima Raden' : 'About Bima Raden'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </motion.button>
                  </motion.div>

                  {/* 3 DISCIPLINE COLUMNS WITH STAGGERED SCROLL REVEAL & TACTILE HOVER */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
                    {/* Discipline 1 */}
                    <motion.div
                      {...scrollRevealProps(0)}
                      className="group space-y-4 cursor-pointer"
                      onClick={() => handleNavigate('about')}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#C8C1B2] block">01 / WEB</span>
                        <ArrowUpRight className="w-4 h-4 text-[#C8C1B2] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </div>
                      <h3 className="text-xl font-syne font-bold text-[#F7F5EE] transition-transform duration-250 ease-editorial group-hover:translate-x-1">
                        {language === 'id' ? 'Pengembangan Web' : 'Web Development'}
                      </h3>
                      <p className="text-sm text-[#F7F5EE]/80 leading-relaxed font-sans">
                        {language === 'id'
                          ? 'Aplikasi web interaktif dan responsif berbasis React, TypeScript, Tailwind CSS, dan Node.js dengan integrasi Supabase / Firebase.'
                          : 'Interactive, responsive web applications built with React, TypeScript, Tailwind CSS, and Node.js with Supabase / Firebase integration.'}
                      </p>
                    </motion.div>

                    {/* Discipline 2 */}
                    <motion.div
                      {...scrollRevealProps(0.07)}
                      className="group space-y-4 cursor-pointer"
                      onClick={() => handleNavigate('about')}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#C8C1B2] block">02 / AUTOMATION</span>
                        <ArrowUpRight className="w-4 h-4 text-[#C8C1B2] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </div>
                      <h3 className="text-xl font-syne font-bold text-[#F7F5EE] transition-transform duration-250 ease-editorial group-hover:translate-x-1">
                        {language === 'id' ? 'Otomasi Alur Kerja n8n' : 'n8n Workflow Automation'}
                      </h3>
                      <p className="text-sm text-[#F7F5EE]/80 leading-relaxed font-sans">
                        {language === 'id'
                          ? 'Otomasi praktis berbasis proyek riil: scraping & agregasi bank soal UTBK/TKA serta generator kerangka esai ilmiah berbantuan AI.'
                          : 'Hands-on workflow automation: automated UTBK/TKA question aggregation and AI-assisted scientific essay structuring via n8n.'}
                      </p>
                    </motion.div>

                    {/* Discipline 3 */}
                    <motion.div
                      {...scrollRevealProps(0.14)}
                      className="group space-y-4 cursor-pointer"
                      onClick={() => handleNavigate('about')}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#C8C1B2] block">03 / ARDUINO & IOT</span>
                        <ArrowUpRight className="w-4 h-4 text-[#C8C1B2] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </div>
                      <h3 className="text-xl font-syne font-bold text-[#F7F5EE] transition-transform duration-250 ease-editorial group-hover:translate-x-1">
                        {language === 'id' ? 'IoT & Arduino' : 'IoT & Arduino Projects'}
                      </h3>
                      <p className="text-sm text-[#F7F5EE]/80 leading-relaxed font-sans">
                        {language === 'id'
                          ? 'Eksplorasi physical computing menggunakan Arduino Nano, sensor suara tepuk tangan (lampu pintar), sensor suhu, dan display LCD 16x2.'
                          : 'Physical computing projects using Arduino Nano, acoustic sound clap sensors for smart lighting, temperature sensors, and 16x2 LCD displays.'}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* CURATED CASE STUDIES: WARM BONE BACKGROUND (#E8E4D8) */}
              <section className="w-full bg-[#E8E4D8] py-20 sm:py-28 px-6 sm:px-8 md:px-12 border-t border-[#111111]/15">
                <div className="w-full max-w-6xl mx-auto">
                  
                  {/* HEADING WITH SCROLL REVEAL */}
                  <motion.div
                    {...scrollRevealProps(0)}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 mb-14 border-b border-[#111111]/15"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#173C32] block mb-2 font-bold">
                        {language === 'id' ? 'KARYA TERPILIH' : 'SELECTED WORKS'}
                      </span>
                      <h2 className="editorial-h2 text-[#111111] font-extrabold tracking-tight">
                        {language === 'id' ? 'Studi Kasus Terbaru' : 'Recent Case Studies'}
                      </h2>
                    </div>
                    <motion.button
                      {...editorialButtonMotion}
                      onClick={() => handleNavigate('work')}
                      className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#173C32] border-b border-[#173C32] pb-0.5 hover:text-[#111111] hover:border-[#111111] transition-colors cursor-pointer"
                    >
                      <span>{language === 'id' ? 'Lihat Semua Studi Kasus' : 'View All Case Studies'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </motion.button>
                  </motion.div>

                  {/* 2-COL FEATURED GRID WITH EDITORIAL HOVER & IMAGE SCALE (1.02) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {PROJECTS.slice(0, 4).map((proj, idx) => (
                      <motion.article
                        key={proj.id}
                        {...scrollRevealProps(idx * 0.08)}
                        onClick={() => handleSelectProject(proj)}
                        className="group cursor-pointer flex flex-col justify-between"
                      >
                        <div className="relative aspect-[16/11] bg-[#173C32] overflow-hidden mb-6 border border-[#111111]/15">
                          <motion.img
                            src={proj.coverImage}
                            alt={proj.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-300 ease-editorial group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 bg-[#173C32] text-[#F7F5EE] text-[11px] font-mono px-2.5 py-1 uppercase">
                            0{idx + 1}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs uppercase tracking-widest text-[#173C32] font-mono mb-2 font-semibold">
                            {proj.category} &bull; {proj.year}
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#111111] mb-2 group-hover:text-[#173C32] group-hover:underline leading-tight transition-all duration-300 ease-editorial group-hover:translate-x-1">
                            {proj.title}
                          </h3>
                          <p className="text-sm text-[#111111]/80 line-clamp-2 font-sans">
                            {proj.subtitle}
                          </p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </section>

              {/* DIRECT CALL TO ACTION: DEEP FOREST GREEN (#173C32) */}
              <section className="w-full bg-[#173C32] text-[#F7F5EE] py-20 px-6 sm:px-8 md:px-12 border-t border-[#111111]/10">
                <motion.div
                  {...scrollRevealProps(0)}
                  className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                >
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#C8C1B2] block mb-2">
                      {language === 'id' ? 'MULAI PROYEK' : 'START A PROJECT'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-extrabold text-[#F7F5EE] tracking-tight mb-2">
                      {language === 'id'
                        ? 'Punya ide website, otomasi, atau sistem IoT?'
                        : 'Have an idea for a web app, automation, or IoT system?'}
                    </h2>
                    <p className="text-sm sm:text-base text-[#F7F5EE]/80 font-sans">
                      {language === 'id'
                        ? 'Mari berdiskusi via LinkedIn, Instagram, atau email langsung.'
                        : 'Reach out via LinkedIn, Instagram, or direct email.'}
                    </p>
                  </div>
                  <motion.button
                    {...editorialButtonMotion}
                    onClick={() => handleNavigate('contact')}
                    className="group px-6 py-3.5 bg-[#F7F5EE] text-[#173C32] font-syne font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-[#F7F5EE] transition-all cursor-pointer shrink-0 inline-flex items-center gap-2"
                  >
                    <span>{language === 'id' ? 'Buka Halaman Kontak' : 'Go to Contact'}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </motion.button>
                </motion.div>
              </section>
            </motion.div>
          )}

          {currentPage === 'work' && (
            <motion.div
              key="page-work"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <WorkPage
                language={language}
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          )}

          {currentPage === 'project-detail' && (
            <motion.div
              key={`page-detail-${selectedProject.id}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <ProjectDetailPage
                project={selectedProject}
                language={language}
                onBack={() => handleNavigate('work')}
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="page-about"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <AboutPage
                language={language}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="page-contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <ContactPage language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER: DEEP FOREST GREEN (#173C32) */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

