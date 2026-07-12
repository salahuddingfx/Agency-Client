import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Code, CreditCard, Layers, TrendingUp, Sparkles, Check, ChevronRight, Palette, Brain } from 'lucide-react';
import SEO from '../components/SEO';
import { servicesData } from '../data/mockData';
import { normalizeServices } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';
import GsapFadeIn from '../components/GsapAnimate';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';

const FigmaIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1-3.5 3.5V2z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
    <path d="M8.5 16H12v3.5a3.5 3.5 0 1 1-3.5-3.5z" />
  </svg>
);

export default function Services() {
  const { data: rawServices = servicesData } = useFetch(() => api.getServices(), servicesData);
  const services = normalizeServices(rawServices);

  const getIcon = (name) => {
    const props = { className: "text-brand-primary", size: 28 };
    switch (name) {
      case 'Globe': return <Globe {...props} />;
      case 'Smartphone': return <Smartphone {...props} />;
      case 'Code': return <Code {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Figma': return <FigmaIcon {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Brain': return <Brain {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative overflow-hidden"
    >
      <SEO 
        title="Custom Software & Development Services" 
        description="Explore our software development services: premium frontend engineering, React Native mobile apps, headless e-commerce, cloud POS, and custom ERP/CRM layouts." 
        keywords={[
          'react web development services',
          'cross platform app development',
          'react native apps',
          'cloud POS solutions',
          'enterprise ERP development',
          'headless cms development',
          'custom CRM systems',
          'digital design UI UX'
        ]}
      />

      {/* Glow backgrounds */}
      <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <GlassBadge variant="primary" className="mb-4 font-semibold">Our Offerings</GlassBadge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display mb-6">
          Architecting High-End{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Digital Infrastructures</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          From headless frontend engineering and cross-platform mobile apps to POS checkout flows and enterprise-grade resource planning, we design and build complete software stacks.
        </p>
      </section>

      {/* --- DETAILED SERVICES GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GsapFadeIn className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service) => (
            <GlassCard key={service.id} className="hover:border-brand-primary/30 flex flex-col justify-between h-full p-8 sm:p-10 text-left relative" hoverEffect="lift">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                    {getIcon(service.iconName)}
                  </div>
                  <GlassBadge variant="glow" className="font-semibold">
                    {service.metric}
                  </GlassBadge>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 font-display">{service.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{service.longDesc}</p>
                
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 pl-1">Included Capabilities</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-500 dark:text-slate-400">
                      <Check size={14} className="text-brand-primary mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between mt-auto">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">Enterprise Standard</span>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors group"
                >
                  <span>Request Scope</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </GsapFadeIn>
      </section>

      {/* --- DYNAMIC CUSTOM DIAGRAM ACCENT --- */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GsapFadeIn direction="up">
          <GlassCard className="text-center p-10 sm:p-14 lg:p-16 relative overflow-hidden" hoverEffect="none">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <GlassBadge variant="accent" className="mb-3 font-semibold">Workflow</GlassBadge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-4">Our Collaborative Process</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
              We follow a structured sprint delivery plan spanning strategy alignment, interactive interface layouts, and modular software staging.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
              {[
                { step: '1', title: 'Discovery & Specs', desc: 'Define the core technical integrations, roadmap, and pricing scope.' },
                { step: '2', title: 'Sprint Staging', desc: 'Interactive designs matching your brand, followed by frontend code.' },
                { step: '3', title: 'Deployment SLA', desc: 'Complete hosting setups, SEO configurations, and launch sign-off.' }
              ].map((wf) => (
                <div key={wf.step} className="flex flex-col items-center group">
                  <span className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    {wf.step}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 font-display">{wf.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px] leading-relaxed">{wf.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </GsapFadeIn>
      </section>
    </motion.div>
  );
}
