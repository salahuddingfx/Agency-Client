import { motion } from 'framer-motion';
import { Trophy, Code2, Users2 } from 'lucide-react';
import SEO from '../components/SEO';
import { caseStudies } from '../data/mockData';
import { normalizeCaseStudies } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';

export default function CaseStudies() {
  const { data: rawStudies = caseStudies } = useFetch(() => api.getCaseStudies(), caseStudies);
  const studies = normalizeCaseStudies(rawStudies);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO 
        title="Case Studies & Client Success Stories" 
        description="Read through deep dives of our client collaborations, exploring architectural challenges, database strategies, and performance outcomes." 
        keywords={[
          'software engineering case studies',
          'client success stories',
          'custom portal implementation',
          'enterprise dashboard development',
          'POS integration success'
        ]}
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Deep Dives</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
          Architectural Solutions & <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Quantifiable Results</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Discover how we partner with enterprise companies and high-growth startups to replace legacy systems, optimize speed, and scale backend infrastructures.
        </p>
      </section>

      {/* --- CASE STUDIES LIST --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        {studies.map((study, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              key={study.id}
              className="glass-card rounded-2xl p-8 sm:p-12 border border-brand-slateAccent hover:border-brand-primary/10 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Stats & Metadata Column */}
                <div className={`lg:col-span-4 space-y-6 ${isEven ? 'lg:order-first' : 'lg:order-last'}`}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-3 py-1 rounded border border-brand-primary/15 inline-block">
                    {study.category}
                  </span>
                  
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider block">Client Partner</span>
                    <h3 className="text-xl font-bold text-white font-display mt-1">{study.client}</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-4 border-t border-brand-slateAccent/50">
                    {study.stats.map((stat, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-brand-slateAccent/30 pb-2">
                        <span className="text-xs text-slate-400">{stat.label}</span>
                        <span className="text-lg font-bold text-brand-primary">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem, Solution, Result Context Column */}
                <div className="lg:col-span-8 space-y-6">
                  <h2 className="text-2xl font-bold text-white font-display tracking-tight leading-tight">
                    {study.title}
                  </h2>
                  
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
                    "{study.summary}"
                  </p>

                  <div className="space-y-6 pt-6 border-t border-brand-slateAccent/40">
                    
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                        <Trophy size={14} className="text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">The Challenge</h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{study.problem}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center flex-shrink-0">
                        <Code2 size={14} className="text-brand-primary" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">Our Strategy & Execution</h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Users2 size={14} className="text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">Business Impact</h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{study.result}</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </section>

    </motion.div>
  );
}
