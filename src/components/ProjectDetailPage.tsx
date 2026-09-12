import { motion } from 'framer-motion';
import { Project, Language } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { scrollRevealProps, editorialButtonMotion } from '../utils/motion';

const ArrowLeftIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface ProjectDetailPageProps {
  project: Project;
  language?: Language;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

export default function ProjectDetailPage({
  project,
  language = 'id',
  onBack,
  onSelectProject,
}: ProjectDetailPageProps) {
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div id="project-detail-page" className="w-full bg-[#173C32] pt-28 sm:pt-36 pb-24 px-6 sm:px-8 md:px-12 text-[#F7F5EE]">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* BACK NAVIGATION */}
        <motion.div {...scrollRevealProps(0)} className="mb-8">
          <button
            id="back-to-work-btn"
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#C8C1B2] hover:text-[#F7F5EE] transition-colors cursor-pointer border-b border-transparent hover:border-[#F7F5EE] pb-0.5"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{language === 'id' ? '← Kembali ke Studi Kasus' : '← Back to Case Studies'}</span>
          </button>
        </motion.div>

        {/* HERO HEADER */}
        <motion.div
          {...scrollRevealProps(0.04)}
          className="border-b border-[#F7F5EE]/15 pb-10 sm:pb-12 mb-12 sm:mb-14"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C8C1B2] font-mono font-semibold">
              <span>{project.category}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
              <span>&bull;</span>
              <span>{project.client}</span>
            </div>

            <h1
              id="detail-project-title"
              className="page-display-title text-[#F7F5EE] font-extrabold tracking-tight font-editorial leading-[0.92]"
            >
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#F7F5EE]/85 max-w-3xl font-sans mt-3 leading-relaxed">
              {project.subtitle}
            </p>
          </div>
        </motion.div>

        {/* HERO VISUAL */}
        <motion.div
          {...scrollRevealProps(0.08)}
          className="relative w-full aspect-[16/10] max-h-[700px] bg-[#111111] overflow-hidden mb-14 border border-[#F7F5EE]/15"
        >
          <img
            src={project.coverImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* METADATA & SPECS BAR */}
        <motion.div
          {...scrollRevealProps(0.12)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-[#F7F5EE]/15 mb-14 text-xs font-mono"
        >
          <div>
            <span className="text-[#C8C1B2] uppercase tracking-widest block mb-1">
              {language === 'id' ? 'KLIEN' : 'CLIENT'}
            </span>
            <span className="font-bold text-[#F7F5EE] text-sm font-sans">{project.client}</span>
          </div>
          <div>
            <span className="text-[#C8C1B2] uppercase tracking-widest block mb-1">
              {language === 'id' ? 'PERAN' : 'ROLE'}
            </span>
            <span className="font-bold text-[#F7F5EE] text-sm font-sans">{project.role}</span>
          </div>
          <div>
            <span className="text-[#C8C1B2] uppercase tracking-widest block mb-1">
              {language === 'id' ? 'TAHUN' : 'YEAR'}
            </span>
            <span className="font-bold text-[#F7F5EE] text-sm">{project.year}</span>
          </div>
          <div>
            <span className="text-[#C8C1B2] uppercase tracking-widest block mb-1">
              {language === 'id' ? 'DISIPLIN' : 'DISCIPLINE'}
            </span>
            <span className="font-bold text-[#F7F5EE] text-sm font-sans">{project.category}</span>
          </div>
        </motion.div>

        {/* NARRATIVE & CONCEPTUAL STUDY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <motion.div {...scrollRevealProps(0.15)} className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8C1B2] font-mono block mb-4 font-bold">
              {language === 'id' ? 'LINGKUP HASIL KARYA' : 'KEY DELIVERABLES'}
            </span>
            <ul className="space-y-2.5 text-sm text-[#F7F5EE]/85">
              {project.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 border-b border-[#F7F5EE]/10 pb-2">
                  <span className="text-[#C8C1B2] text-xs font-mono">0{idx + 1}</span>
                  <span className="font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...scrollRevealProps(0.18)} className="lg:col-span-8 flex flex-col gap-8 text-[#F7F5EE]">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#C8C1B2] font-mono block mb-3 font-bold">
                {language === 'id' ? 'IKHTISAR PROYEK' : 'PROJECT OVERVIEW'}
              </h2>
              <p className="text-base sm:text-lg text-[#F7F5EE]/90 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#C8C1B2] font-mono block mb-3 font-bold">
                {language === 'id' ? 'PENDEKATAN & IMPLEMENTASI' : 'APPROACH & IMPLEMENTATION'}
              </h2>
              <p className="text-sm sm:text-base text-[#F7F5EE]/80 leading-relaxed font-sans">
                {project.concept}
              </p>
            </div>
          </motion.div>
        </div>

        {/* NEXT PROJECT NAVIGATION */}
        <motion.div
          {...scrollRevealProps(0.2)}
          className="pt-10 border-t border-[#F7F5EE]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C8C1B2] font-mono block mb-1">
              {language === 'id' ? 'STUDI KASUS BERIKUTNYA' : 'NEXT CASE STUDY'}
            </span>
            <h3 className="text-2xl font-editorial font-bold text-[#F7F5EE]">
              {nextProject.title}
            </h3>
          </div>

          <motion.button
            {...editorialButtonMotion}
            onClick={() => {
              onSelectProject(nextProject);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#F7F5EE] border-b border-[#F7F5EE] pb-0.5 hover:text-[#C8C1B2] hover:border-[#C8C1B2] transition-colors cursor-pointer"
          >
            <span>{language === 'id' ? 'Buka Proyek Berikutnya' : 'View Next Project'}</span>
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}

