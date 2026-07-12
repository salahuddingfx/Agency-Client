import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Layers, Monitor, HardDrive, Terminal, Sliders, Palette, Sparkles, RotateCw } from 'lucide-react';
import SEO from '../components/SEO';
import { technologies } from '../data/mockData';
import { normalizeTechnologies } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';
import TechGlobe, { TechIcon } from '../components/TechGlobe';
import ErrorBoundary from '../components/ErrorBoundary';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassBadge from '../components/ui/GlassBadge';

const CATEGORY_META = {
  Frontend:      { icon: Monitor,      color: '#18B7F5', gradient: 'from-sky-500/10 to-sky-600/5' },
  Backend:       { icon: Terminal,     color: '#34d399', gradient: 'from-emerald-500/10 to-green-600/5' },
  Database:      { icon: HardDrive,    color: '#f59e0b', gradient: 'from-amber-500/10 to-yellow-600/5' },
  Design:        { icon: Palette,      color: '#e879f9', gradient: 'from-fuchsia-500/10 to-pink-600/5' },
  Infrastructure:{ icon: Layers,       color: '#fb923c', gradient: 'from-orange-500/10 to-orange-600/5' },
  Tools:         { icon: Sliders,      color: '#94a3b8', gradient: 'from-slate-400/10 to-slate-500/5' },
};

function GlobeLoader() {
  return (
    <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#020617] flex flex-col items-center justify-center gap-4 shadow-inner">
      <div className="w-12 h-12 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
      <p className="text-sm text-slate-500 font-medium">Loading 3D Experience...</p>
    </div>
  );
}

export default function Technologies() {
  const { data: rawTechs = technologies } = useFetch(() => api.getTechnologies(), technologies);
  const techList = normalizeTechnologies(rawTechs);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...Object.keys(CATEGORY_META)];

  const filteredTechs = activeFilter === 'All'
    ? techList
    : techList.filter(t => t.category === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative text-left"
    >
      <SEO
        title="Our Modern Technology Stack"
        description="Explore Nextora Studio's modern tech stack: React, Vite, Node.js, Express, Fastify, PostgreSQL, MongoDB, Docker, AWS, and Figma."
        keywords={[
          'software development tech stack',
          'React Vite Tailwind',
          'Node.js backend',
          'PostgreSQL Database',
          'AWS cloud hosting',
          'nextora tech expertise'
        ]}
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <GlassBadge variant="glow" className="mb-4 font-semibold">
          <Sparkles size={11} className="animate-spin-slow text-brand-primary" />
          <span>Interactive 3D Visualization</span>
        </GlassBadge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display mb-6">
          Our Technology{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Universe</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Drag to rotate the 3D globe. Hover over any technology node to see details. Each ring represents a category in our stack.
        </p>
      </section>

      {/* --- 3D TECH GLOBE --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="relative">
          {/* Corner accents */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-slate-350 dark:border-white/10 rounded-tl-lg pointer-events-none" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-slate-350 dark:border-white/10 rounded-tr-lg pointer-events-none" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-slate-350 dark:border-white/10 rounded-bl-lg pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-slate-350 dark:border-white/10 rounded-br-lg pointer-events-none" />

          <ErrorBoundary>
            <Suspense fallback={<GlobeLoader />}>
              <TechGlobe technologies={techList} />
            </Suspense>
          </ErrorBoundary>

          {/* Instructions overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-2 bg-slate-900/80 dark:bg-black/60 backdrop-blur-md rounded-full border border-slate-200/50 dark:border-white/10 pointer-events-none">
            <RotateCw size={13} className="text-brand-primary animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-[10px] text-slate-300 dark:text-slate-400 font-semibold tracking-wide">Drag to rotate &bull; Scroll to zoom &bull; Hover for details</span>
          </div>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {Object.entries(CATEGORY_META).map(([cat, meta]) => {
            const Icon = meta.icon;
            return (
              <div key={cat} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/[0.02] shadow-sm">
                <Icon size={12} style={{ color: meta.color }} />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{cat}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- CATEGORY FILTER --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            const meta = CATEGORY_META[cat];
            const Icon = meta ? meta.icon : null;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-primary text-white border-brand-primary shadow-premium'
                    : 'bg-slate-100/60 dark:bg-brand-slateAccent/10 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:text-slate-800 dark:hover:text-white hover:border-brand-primary/30'
                }`}
              >
                {Icon && <Icon size={12} style={{ color: isActive ? '#ffffff' : meta.color }} />}
                <span className="capitalize">{cat === 'All' ? 'All Stack' : cat}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* --- TECH CARDS GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTechs.map((tech, idx) => {
            const meta = CATEGORY_META[tech.category] || CATEGORY_META.Tools;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
                className="flex"
              >
                <GlassCard 
                  className={`hover:border-brand-primary/30 p-6 flex items-start gap-5 w-full bg-gradient-to-br ${meta.gradient}`}
                  hoverEffect="lift"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 bg-slate-900/90 border border-slate-700/30 shadow-md"
                    style={{ border: `1px solid ${meta.color}35`, boxShadow: `0 0 10px ${meta.color}15` }}
                  >
                    <TechIcon name={tech.name} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-display mb-1">{tech.name}</h4>
                    <span
                      className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3"
                      style={{ color: meta.color, backgroundColor: `${meta.color}15` }}
                    >
                      {tech.category}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{tech.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {filteredTechs.length === 0 && (
          <div className="text-center py-20 text-slate-500 text-sm">
            No technologies in this category.
          </div>
        )}
      </section>
    </motion.div>
  );
}
