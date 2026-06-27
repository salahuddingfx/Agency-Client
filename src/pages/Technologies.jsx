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
    <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border border-slate-800/50 bg-[#020617] flex flex-col items-center justify-center gap-4">
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
      className="pt-24 pb-16 min-h-screen relative"
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
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 mb-5 text-[10px] sm:text-xs text-brand-primary font-medium tracking-wider uppercase">
          <Sparkles size={11} className="animate-spin-slow" />
          <span>Interactive 3D Visualization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display mb-6">
          Our Technology{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Universe</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Drag to rotate the 3D globe. Hover over any technology node to see details. Each ring represents a category in our stack.
        </p>
      </section>

      {/* --- 3D TECH GLOBE --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="relative">
          {/* Corner accents */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-brand-primary/30 rounded-tl-lg pointer-events-none" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-brand-primary/30 rounded-tr-lg pointer-events-none" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-brand-primary/30 rounded-bl-lg pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-brand-primary/30 rounded-br-lg pointer-events-none" />

          <ErrorBoundary>
            <Suspense fallback={<GlobeLoader />}>
              <TechGlobe technologies={techList} />
            </Suspense>
          </ErrorBoundary>

          {/* Instructions overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 pointer-events-none">
            <RotateCw size={12} className="text-brand-primary animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-[10px] text-slate-400 font-medium">Drag to rotate • Scroll to zoom • Hover for details</span>
          </div>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {Object.entries(CATEGORY_META).map(([cat, meta]) => {
            const Icon = meta.icon;
            return (
              <div key={cat} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
                <Icon size={12} style={{ color: meta.color }} />
                <span className="text-[10px] text-slate-400 font-medium">{cat}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- CATEGORY FILTER --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            const meta = CATEGORY_META[cat];
            const Icon = meta ? meta.icon : null;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-primary text-white border-brand-primary shadow-premium'
                    : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-white hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                {Icon && <Icon size={12} style={{ color: isActive ? '#ffffff' : meta.color }} />}
                <span className="capitalize">{cat === 'All' ? 'All Technologies' : cat}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* --- TECH CARDS GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTechs.map((tech, idx) => {
            const meta = CATEGORY_META[tech.category] || CATEGORY_META.Tools;
            const Icon = meta.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
                className={`group glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 bg-gradient-to-br ${meta.gradient}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 bg-slate-950/50"
                    style={{ border: `1px solid ${meta.color}35`, boxShadow: `0 0 10px ${meta.color}15` }}
                  >
                    <TechIcon name={tech.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white font-display">{tech.name}</h4>
                    </div>
                    <span
                      className="inline-block text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded mb-2"
                      style={{ color: meta.color, backgroundColor: `${meta.color}15` }}
                    >
                      {tech.category}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
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
