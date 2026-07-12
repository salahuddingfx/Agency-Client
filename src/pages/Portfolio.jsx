import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter } from 'lucide-react';
import SEO from '../components/SEO';
import { projectsData } from '../data/mockData';
import { normalizePortfolios } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassBadge from '../components/ui/GlassBadge';

export default function Portfolio() {
  const { data: rawProjects = projectsData } = useFetch(() => api.getPortfolios(), projectsData);
  const allProjects = normalizePortfolios(rawProjects);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile App Development', 'POS Solutions', 'ERP & CRM Systems', 'UI/UX Design', 'Graphics Design', 'AI & Machine Learning', 'SEO & Digital Marketing'];

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(proj => proj.category === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO 
        title="Our Portfolio & Software Projects" 
        description="Browse through our custom websites, React Native applications, custom ERP system layouts, and premium UI designs built by Nextora Studio." 
        keywords={[
          'nextora studio portfolio',
          'software development portfolio',
          'past client work',
          'custom react websites',
          'web design showcase',
          'bespoke software case studies'
        ]}
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <GlassBadge variant="primary" className="mb-4 font-semibold">Showcase</GlassBadge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display mb-6">
          Crafting Digital Products{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">That Make an Impact</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Explore our select agency portfolio covering web applications, mobile platforms, enterprise management systems, and modular SaaS designs.
        </p>
      </section>

      {/* --- FILTER TAB BAR --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200/50 dark:border-white/5 pb-8">
          <div className="flex items-center space-x-2 text-slate-500 mr-3 text-xs uppercase tracking-widest font-bold">
            <Filter size={14} />
            <span>Filter</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-brand-primary text-white border-brand-primary shadow-premium'
                  : 'bg-slate-100/60 dark:bg-brand-slateAccent/10 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:text-slate-800 dark:hover:text-white hover:border-brand-primary/30'
              }`}
            >
              {cat === 'All' ? 'All Projects' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- GRID SHOWCASE --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="h-full flex text-left"
              >
                <GlassCard className="overflow-hidden hover:border-brand-primary/30 w-full flex flex-col group p-0" hoverEffect="lift">
                  {/* Simulated Device Screen Color Blocks */}
                  <div className={`h-52 bg-gradient-to-tr ${project.imageColor} relative p-6 flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                    
                    {/* Subtle Grid backdrop */}
                    <div className="absolute inset-0 bg-grid-glow opacity-15 pointer-events-none" />

                    {/* High end UI Card mockup placeholder */}
                    <div className="w-[88%] h-[85%] bg-slate-900/95 rounded-t-xl border border-white/10 shadow-2xl p-4 transform translate-y-10 group-hover:translate-y-5 transition-transform duration-500 relative">
                      <div className="flex items-center space-x-1.5 mb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <div className="h-1.5 bg-white/10 w-2/3 rounded-full mb-2.5" />
                      <div className="h-1.5 bg-white/5 w-1/2 rounded-full" />
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-2.5">
                        {project.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5 font-display group-hover:text-brand-primary transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight size={18} className="text-slate-400 group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-200/50 dark:border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((serv, idx) => (
                          <GlassBadge key={idx} variant="secondary" className="font-semibold text-[9px]">
                            {serv}
                          </GlassBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 text-slate-500 text-sm">
            No projects found in this category.
          </div>
        )}
      </section>
    </motion.div>
  );
}
