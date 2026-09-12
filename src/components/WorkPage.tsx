import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';
import { Project, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { scrollRevealProps } from '../utils/motion';

interface WorkPageProps {
  language?: Language;
  onSelectProject: (project: Project) => void;
}

export default function WorkPage({ language = 'id', onSelectProject }: WorkPageProps) {
  const t = TRANSLATIONS[language].work;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = language === 'id'
    ? [
        { key: 'All', label: 'Semua' },
        { key: 'Full Stack', label: 'Full Stack Web' },
        { key: 'Automation', label: 'Otomasi n8n' },
        { key: 'IoT', label: 'IoT & Hardware' },
      ]
    : [
        { key: 'All', label: 'All' },
        { key: 'Full Stack', label: 'Full Stack Web' },
        { key: 'Automation', label: 'Workflow Automation' },
        { key: 'IoT', label: 'IoT & Hardware' },
      ];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => {
        if (activeCategory === 'Full Stack' && (p.category.includes('Web') || p.category.includes('Full Stack'))) return true;
        if (activeCategory === 'Automation' && (p.category.includes('Otomasi') || p.category.includes('n8n') || p.category.includes('Automation'))) return true;
        if (activeCategory === 'IoT' && (p.category.includes('IoT') || p.category.includes('Hardware'))) return true;
        return false;
      });

  return (
    <div id="work-page" className="w-full bg-[#173C32] pt-28 sm:pt-36 pb-24 px-6 sm:px-8 md:px-12 text-[#F7F5EE]">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* EDITORIAL PAGE HEADER WITH SCROLL REVEAL */}
        <motion.div
          {...scrollRevealProps(0)}
          className="border-b border-[#F7F5EE]/20 pb-10 mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8C1B2] block mb-2 font-bold">
                {t.eyebrow}
              </span>
              <h1 className="page-display-title text-[#F7F5EE] font-extrabold tracking-tight font-editorial leading-[0.92]">
                {language === 'id' ? 'Studi Kasus' : 'Case Studies'}
              </h1>
              <p className="text-sm sm:text-base text-[#F7F5EE]/85 max-w-xl font-sans mt-3">
                {t.heading}
              </p>
            </div>

            {/* MINIMAL EDITORIAL TEXT FILTER */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-wider pt-2 md:pt-0">
              {categories.map((cat, idx) => (
                <div key={cat.key} className="flex items-center gap-3">
                  <button
                    id={`filter-btn-${cat.key.toLowerCase()}`}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`uppercase transition-colors cursor-pointer ${
                      activeCategory === cat.key
                        ? 'text-[#F7F5EE] font-bold underline underline-offset-4'
                        : 'text-[#C8C1B2] hover:text-[#F7F5EE]'
                    }`}
                  >
                    {cat.label}
                  </button>
                  {idx < categories.length - 1 && (
                    <span className="text-[#F7F5EE]/30">/</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ASYMMETRIC PROJECT LIST WITH SCROLL REVEALS & EDITORIAL HOVER */}
        <div className="flex flex-col divide-y divide-[#F7F5EE]/15">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                id={`project-row-${project.id}`}
                {...scrollRevealProps(index * 0.08)}
                className="py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center group cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                {/* PROJECT IMAGE (Subtle 1.02 scale on hover, 300ms cubic-bezier) */}
                <div
                  className={`overflow-hidden bg-[#111111] border border-[#F7F5EE]/15 ${
                    isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2'
                  }`}
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 ease-editorial group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* PROJECT EDITORIAL DETAILS */}
                <div
                  className={`flex flex-col justify-center ${
                    isEven ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-mono text-[#C8C1B2] mb-3 font-semibold">
                    <span className="uppercase tracking-widest">{project.category}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-[#F7F5EE] tracking-tight mb-4 group-hover:text-[#C8C1B2] group-hover:underline leading-[1.05] transition-all duration-200 ease-editorial group-hover:translate-x-1">
                    {project.title}
                  </h2>

                  <p className="text-sm text-[#F7F5EE]/80 font-sans leading-relaxed mb-6 max-w-md">
                    {project.subtitle}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.deliverables.slice(0, 3).map((del, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 border border-[#F7F5EE]/20 text-[#F7F5EE]/80 font-mono"
                      >
                        {del}
                      </span>
                    ))}
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#F7F5EE] border-b border-[#F7F5EE] pb-0.5 group-hover:text-[#C8C1B2] group-hover:border-[#C8C1B2] transition-colors">
                      <span>{t.viewCase}</span>
                      <span className="text-[11px] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </div>
  );
}

