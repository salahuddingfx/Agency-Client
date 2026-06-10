import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Smartphone, Code, Layers, Sparkles, ChevronRight, MessageSquare, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import TypingAnimation from '../components/TypingAnimation';
import { servicesData, statistics, projectsData, caseStudies } from '../data/mockData';
import GsapFadeIn from '../components/GsapAnimate';
import TiltCard from '../components/TiltCard';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const getServiceIcon = (name) => {
    switch (name) {
      case 'Globe': return <Globe className="text-brand-primary" size={24} />;
      case 'Smartphone': return <Smartphone className="text-brand-primary" size={24} />;
      case 'Code': return <Code className="text-brand-primary" size={24} />;
      case 'Layers': return <Layers className="text-brand-primary" size={24} />;
      default: return <Sparkles className="text-brand-primary" size={24} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen pt-24 pb-16 overflow-hidden"
    >
      <SEO 
        title="Premium Software & Digital Agency" 
        description="Nextora Studio turns ideas into custom websites, mobile applications, software architectures, POS, and ERP dashboards for enterprises and startups globally." 
      />

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center py-20 lg:py-32 px-4 sm:px-6 lg:px-8 text-center bg-mesh-pattern">
        
        {/* Floating Background Glows (Stripe/Vercel Aesthetic) */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-brand-primary/10 rounded-full blur-[100px] animate-float pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[120px] animate-pulse-subtle pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Accent Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 mb-6 text-xs text-brand-primary font-medium tracking-wider uppercase"
          >
            <Sparkles size={12} className="animate-spin-slow" />
            <span>Introducing Nextora Studio</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.15]"
          >
            Transforming Ideas Into <br />
            <TypingAnimation 
              words={[
                "Powerful Digital Solutions",
                "Bespoke Web Applications",
                "Scalable Cloud Systems",
                "Custom CRM & ERP Dashboards",
                "Premium Mobile Apps"
              ]}
              className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent"
              cursorColor="bg-brand-primary"
            />
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            We design, develop, and deploy websites, mobile applications, software architectures, POS platforms, and customized CRM/ERP tools that scale your operations.
          </motion.p>

          {/* Hero Buttons */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-sm font-semibold rounded-md shadow-premium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Start Your Project</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 border border-brand-slateAccent bg-brand-slateAccent/20 hover:bg-brand-slateAccent/40 hover:border-slate-700 text-white text-sm font-semibold rounded-md transition-all duration-300"
            >
              <span>View Portfolio</span>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* --- STATISTICS SECTION --- */}
      <section className="py-16 border-y border-brand-slateAccent/30 bg-brand-darker relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, idx) => (
              <GsapFadeIn
                key={stat.label}
                delay={idx * 0.1}
                duration={0.6}
                direction="up"
                className="text-center px-4"
              >
                <span className="block text-4xl sm:text-5xl font-bold tracking-tight text-white font-display bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="block text-xs font-semibold text-brand-primary uppercase tracking-widest mt-2">
                  {stat.label}
                </span>
                <span className="block text-xs text-slate-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                  {stat.description}
                </span>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES TEASER SECTION --- */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Capabilities</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 font-display">
            High-Performance Digital Engineering
          </p>
          <p className="text-slate-400 mt-4">
            We provide comprehensive design and engineering resources to bring complex business goals to fruition.
          </p>
        </div>

        <GsapFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.slice(0, 3).map((service) => (
            <TiltCard key={service.id} className="h-full">
              <div className="glass-card p-8 rounded-lg hover:border-brand-primary/20 transition-all group flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-md bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-display">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{service.shortDesc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link 
                  to="/services" 
                  className="text-xs font-semibold text-brand-primary flex items-center space-x-1 group-hover:text-white transition-colors"
                >
                  <span>Learn more</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </TiltCard>
          ))}
        </GsapFadeIn>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-brand-primary transition-colors"
          >
            <span>Explore all services</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* --- FEATURED CASE STUDY PREVIEW --- */}
      <section className="py-20 bg-brand-slateAccent/10 border-y border-brand-slateAccent/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Case Study</h2>
            <p className="text-3xl font-bold text-white font-display mt-2">Delivering Real Business Value</p>
          </div>

          {caseStudies.slice(0, 1).map((study) => (
            <GsapFadeIn key={study.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Visual Card Left */}
              <TiltCard className="lg:col-span-5 relative">
                <div className={`aspect-square rounded-xl bg-gradient-to-tr ${study.coverColor} p-8 flex flex-col justify-between text-white shadow-premium relative overflow-hidden h-full w-full`}>
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">Featured Client</span>
                    <h4 className="text-2xl font-bold tracking-tight mt-4">{study.client}</h4>
                  </div>
                  <div className="space-y-4">
                    {study.stats.map((stat, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-white/10 pb-2">
                        <span className="text-xs text-white/70">{stat.label}</span>
                        <span className="text-xl font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>

              {/* Text Context Right */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-2.5 py-1 rounded border border-brand-primary/15">{study.category}</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">{study.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{study.summary}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-slateAccent/40">
                  <div>
                    <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">The Problem</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{study.problem}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">The Solution</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    to={`/case-studies`}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-slateAccent/40 hover:bg-brand-slateAccent border border-brand-slateAccent text-white text-xs font-semibold rounded-md transition-colors"
                  >
                    <span>Read Full Study</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

            </GsapFadeIn>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <GsapFadeIn direction="up">
          <TiltCard>
            <div className="glass-card p-10 sm:p-16 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mb-6 tracking-tight">
                Ready to Accelerate Your Digital Product Roadmap?
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                Let's partner. Connect with our engineering and interface design leads today to schedule a technical discovery call.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-sm font-semibold rounded-md shadow-premium hover:shadow-glow transition-all"
                >
                  <span>Consult an Expert</span>
                  <MessageSquare size={14} />
                </Link>
                <Link
                  to="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-brand-slateAccent text-white text-sm font-semibold rounded-md hover:bg-brand-slateAccent/30 transition-all"
                >
                  <span>View Packages</span>
                </Link>
              </div>
            </div>
          </TiltCard>
        </GsapFadeIn>
      </section>

    </motion.div>
  );
}
