import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter } from 'lucide-react';
import SEO from '../components/SEO';
import { projectsData } from '../data/mockData';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile App Development', 'POS Solutions', 'ERP & CRM Systems', 'UI/UX Design'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(proj => proj.category === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 sm:pt-20 pb-16 min-h-screen relative"
    >
      <SEO 
        title="Our Portfolio" 
        description="Browse through our custom websites, React Native applications, custom ERP system layouts, and premium UI designs built by Nextora Studio." 
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Showcase</h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-5 sm:mb-6">
          Crafting Digital Products{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">That Make an Impact</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Explore our select agency portfolio covering web applications, mobile platforms, enterprise management systems, and modular SaaS designs.
        </p>
      </section>

      {/* --- FILTER TAB BAR --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-brand-slateAccent/40 pb-6">
          <div className="flex items-center space-x-2 text-slate-500 mr-2 text-xs uppercase tracking-wider font-semibold">
            <Filter size={14} />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-all ${
                activeFilter === cat
                  ? 'bg-brand-primary text-white border-brand-primary shadow-premium'
                  : 'bg-brand-slateAccent/20 text-slate-400 border-brand-slateAccent hover:text-white hover:border-slate-600'
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="glass-card rounded-xl overflow-hidden hover:border-brand-primary/20 transition-all flex flex-col group"
              >
                {/* Simulated Device Screen Color Blocks */}
                <div className={`h-48 bg-gradient-to-tr ${project.imageColor} relative p-6 flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                  
                  {/* Subtle Grid backdrop */}
                  <div className="absolute inset-0 bg-grid-glow opacity-10 pointer-events-none" />

                  {/* High end UI Card mockup placeholder */}
                  <div className="w-[85%] h-[80%] bg-slate-900/95 rounded-t-lg border border-white/10 shadow-2xl p-4 transform translate-y-8 group-hover:translate-y-4 transition-transform duration-300 relative">
                    <div className="flex items-center space-x-1.5 mb-3">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <div className="h-1 bg-white/10 w-2/3 rounded mb-2" />
                    <div className="h-1 bg-white/5 w-1/2 rounded" />
                  </div>
                </div>

                {/* Text details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-brand-primary uppercase tracking-widest block mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 font-display group-hover:text-brand-primary transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-slateAccent/40">
                    <div className="flex flex-wrap gap-1.5">
                      {project.services.map((serv, idx) => (
                        <span 
                          key={idx} 
                          className="text-[9px] font-medium text-slate-500 bg-brand-slateAccent/30 px-2 py-0.5 rounded"
                        >
                          {serv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500 text-sm">
            No projects found in this category.
          </div>
        )}
      </section>

    </motion.div>
  );
}
