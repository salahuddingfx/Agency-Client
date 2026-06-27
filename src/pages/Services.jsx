import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Code, CreditCard, Layers, TrendingUp, Sparkles, Check, ChevronRight, Palette, Brain } from 'lucide-react';
import SEO from '../components/SEO';
import { servicesData } from '../data/mockData';
import { normalizeServices } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';
import GsapFadeIn from '../components/GsapAnimate';
import GlowCard from '../components/GlowCard';

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
      className="pt-16 sm:pt-20 pb-16 min-h-screen relative"
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
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          'name': 'Bespoke Software & Product Development',
          'provider': {
            '@type': 'Organization',
            'name': 'Nextora Studio',
            'url': 'https://nextorastudio.tech'
          },
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Nextora Studio Services Catalog',
            'itemListElement': [
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Web Development',
                  'description': 'Premium high-end React, Vite, and Next.js custom web architectures.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Mobile Development',
                  'description': 'Cross-platform React Native apps for iOS and Android.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Cloud POS & ERP Systems',
                  'description': 'Bespoke inventory management, checkouts, and custom enterprise portals.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'UI/UX Design',
                  'description': 'Interactive prototyping and stunning design systems built in Figma.'
                }
              }
            ]
          }
        }}
      />

      {/* Glow backgrounds */}
      <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Our Offerings</h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-5 sm:mb-6">
          Architecting High-End{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Digital Infrastructures</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          From headless frontend engineering and cross-platform mobile apps to POS checkout flows and enterprise-grade resource planning, we design and build complete software stacks.
        </p>
      </section>

      {/* --- DETAILED SERVICES GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GsapFadeIn className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service) => (
            <GlowCard key={service.id} className="h-full">
              <div className="glass-card p-8 sm:p-10 rounded-xl hover:border-brand-primary/20 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between mb-6">
                    <div className="w-14 h-14 rounded-lg bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-semibold text-brand-primary bg-brand-primary/5 border border-brand-primary/10 rounded px-2.5 py-1">
                      {service.metric}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-display">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">{service.longDesc}</p>
                  
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Included Capabilities:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-slate-500">
                        <Check size={14} className="text-brand-primary mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-brand-slateAccent/40 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-slate-600">Enterprise Standard</span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-brand-primary hover:text-white transition-colors group"
                  >
                    <span>Request Scope</span>
                    <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </GlowCard>
          ))}
        </GsapFadeIn>
      </section>

      {/* --- DYNAMIC CUSTOM DIAGRAM ACCENT --- */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GsapFadeIn direction="up">
          <GlowCard>
            <div className="glass-card p-8 sm:p-12 rounded-xl text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              <h2 className="text-2xl font-bold text-white font-display mb-4">Our Collaborative Workflow</h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
                We follow a structured sprint delivery plan spanning strategy alignment, interactive interface layouts, and modular software staging.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
                <div className="flex flex-col items-center">
                  <span className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold flex items-center justify-center mb-4">1</span>
                  <h4 className="text-sm font-semibold text-white mb-2">Discovery & Specs</h4>
                  <p className="text-xs text-slate-500 max-w-[200px]">Define the core technical integrations, roadmap, and pricing scope.</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold flex items-center justify-center mb-4">2</span>
                  <h4 className="text-sm font-semibold text-white mb-2">Sprint Staging</h4>
                  <p className="text-xs text-slate-500 max-w-[200px]">Interactive designs matching your brand, followed by frontend code.</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold flex items-center justify-center mb-4">3</span>
                  <h4 className="text-sm font-semibold text-white mb-2">Deployment SLA</h4>
                  <p className="text-xs text-slate-500 max-w-[200px]">Complete hosting setups, SEO configurations, and launch sign-off.</p>
                </div>
              </div>
            </div>
          </GlowCard>
        </GsapFadeIn>
      </section>

    </motion.div>
  );
}
