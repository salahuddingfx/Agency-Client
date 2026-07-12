import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Globe, Smartphone, Code, Layers, Sparkles,
  ChevronRight, MessageSquare, Star, Quote
} from 'lucide-react';
import SEO from '../components/SEO';
import TypingAnimation from '../components/TypingAnimation';
import { servicesData, statistics, caseStudies, technologies } from '../data/mockData';
import { normalizeServices, normalizeCaseStudies, normalizeTestimonials, normalizeTechnologies } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import GsapFadeIn from '../components/GsapAnimate';
import GlowCard from '../components/GlowCard';
import { api } from '../api/api';
import TechGlobe from '../components/TechGlobe';
import { Suspense } from 'react';
import AnimatedWaves from '../components/AnimatedWaves';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';
import GlassAvatar from '../components/ui/GlassAvatar';

/* ─── CountUp Hook ─────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState('0');

  useEffect(() => {
    if (!start) return;
    const raw = target.replace(/[^0-9.]/g, '');
    const suffix = target.replace(/[0-9.]/g, '');
    const end = parseFloat(raw);
    if (isNaN(end)) { setCount(target); return; }

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * end);
      setCount(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

/* ─── Animated Stat ─────────────────────────────────────────────── */
function AnimatedStat({ stat, delay, inView }) {
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    if (inView && !triggered) {
      const t = setTimeout(() => setTriggered(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, triggered, delay]);
  const count = useCountUp(stat.value, 1800, triggered);

  return (
    <div className="text-center px-4 relative group">
      <span className="block text-4.5xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display bg-gradient-to-r from-slate-950 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
        {count}
      </span>
      <span className="block text-[10px] sm:text-xs font-bold text-brand-primary uppercase tracking-widest mt-3">
        {stat.label}
      </span>
      <span className="block text-[10px] sm:text-xs text-slate-500 mt-1.5 max-w-[180px] mx-auto leading-relaxed">
        {stat.description}
      </span>
    </div>
  );
}

/* ─── Testimonials fallback (shown when server is offline) ─────── */
const FALLBACK_TESTIMONIALS = [
  {
    _id: 't1',
    name: 'James Whitfield',
    company: 'Apex Retail International',
    stars: 5,
    text: 'Nextora took our bloated Shopify setup and turned it into a blazing-fast headless platform. Page load dropped from 5.6s to under a second. Incredible work.',
    gradient: 'from-blue-500 to-indigo-600',
    avatar: 'JW',
  },
  {
    _id: 't2',
    name: 'Priya Menon',
    company: 'Velo Delivery Inc.',
    stars: 5,
    text: 'The offline-first React Native app they built works flawlessly in dead zones. Our drivers have zero complaints and the app store rating sits at 4.9.',
    gradient: 'from-purple-500 to-pink-500',
    avatar: 'PM',
  },
  {
    _id: 't3',
    name: 'Omar Hassan',
    company: 'DineSync Hospitality Group',
    stars: 5,
    text: 'Our POS system now runs on tablets at all 12 locations simultaneously. Real-time order sync, offline support, and a clean UI that staff actually love.',
    gradient: 'from-cyan-500 to-blue-600',
    avatar: 'OH',
  },
];

const GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-500',
  'from-cyan-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-500',
];

const clientLogos = [
  'Apex Retail', 'Velo Delivery', 'DineSync', 'Omni Mfg.', 'Aura Capital', 'Launchpad Tools',
];

function getServiceIcon(name) {
  switch (name) {
    case 'Globe': return <Globe className="text-brand-primary" size={24} />;
    case 'Smartphone': return <Smartphone className="text-brand-primary" size={24} />;
    case 'Code': return <Code className="text-brand-primary" size={24} />;
    case 'Layers': return <Layers className="text-brand-primary" size={24} />;
    default: return <Sparkles className="text-brand-primary" size={24} />;
  }
}

export default function Home() {
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);
  const [liveTestimonials, setLiveTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  const { data: rawHomeServices = servicesData } = useFetch(() => api.getServices(), servicesData);
  const { data: rawHomeCaseStudies = caseStudies } = useFetch(() => api.getCaseStudies(), caseStudies);
  const { data: rawHomeTechs = technologies } = useFetch(() => api.getTechnologies(), technologies);
  const homeServices = normalizeServices(rawHomeServices);
  const homeCaseStudies = normalizeCaseStudies(rawHomeCaseStudies);

  useEffect(() => {
    api.getTestimonials()
      .then((res) => {
        const data = res.data || res.testimonials || res || [];
        const arr = Array.isArray(data) ? normalizeTestimonials(data) : [];
        setLiveTestimonials(arr.length > 0 ? arr : FALLBACK_TESTIMONIALS);
      })
      .catch(() => setLiveTestimonials(FALLBACK_TESTIMONIALS))
      .finally(() => setTestimonialsLoading(false));
  }, []);

  const displayTestimonials = liveTestimonials.length > 0 ? liveTestimonials : FALLBACK_TESTIMONIALS;

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen pt-20 pb-16 overflow-hidden"
    >
      <SEO
        title="Premium Software & Digital Agency"
        description="Nextora Studio turns ideas into custom websites, mobile applications, software architectures, POS, and ERP dashboards for enterprises and startups globally."
        keywords={[
          'premium software agency',
          'custom web design',
          'react native apps',
          'cloud POS solutions',
          'ERP dashboards',
          'bespoke software',
          'web development studio',
          'startup developers',
          'enterprise software architecture'
        ]}
      />

      {/* ─── HERO SECTION ──────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 text-center overflow-hidden min-h-[90vh]">
        
        {/* Apple style gradient meshes */}
        <div className="absolute top-[10%] left-[5%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-brand-primary/10 rounded-full blur-[100px] animate-float pointer-events-none z-0" />
        <div className="absolute bottom-[10%] right-[5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-accent/8 rounded-full blur-[120px] animate-pulse-subtle pointer-events-none z-0" />

        {/* Waves Animation */}
        <AnimatedWaves />

        <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassBadge variant="glow" className="mb-6 font-semibold">
              <Sparkles size={11} className="animate-spin-slow" />
              <span>Introducing Nextora Studio</span>
            </GlassBadge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display leading-[1.1] w-full"
          >
            Transforming Ideas Into{' '}
            <br className="hidden sm:block" />
            <TypingAnimation
              words={[
                'Powerful Digital Solutions',
                'Bespoke Web Applications',
                'Scalable Cloud Systems',
                'Custom CRM & ERP Dashboards',
                'Premium Mobile Apps',
                'AI & Machine Learning',
                'Graphics Design & Branding',
              ]}
              className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent"
              cursorColor="bg-brand-primary"
            />
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 sm:mt-8 text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4"
          >
            We design, develop, and deploy websites, mobile apps, POS platforms, CRM/ERP tools, AI solutions, and brand identities that scale your operations globally.
          </motion.p>

          {/* Hero Buttons */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto px-6 sm:px-0"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <GlassButton variant="primary" className="w-full sm:w-auto px-8 py-3.5">
                <span>Start Your Project</span>
                <ArrowRight size={14} />
              </GlassButton>
            </Link>
            <Link to="/portfolio" className="w-full sm:w-auto">
              <GlassButton variant="glass" className="w-full sm:w-auto px-8 py-3.5">
                <span>View Portfolio</span>
              </GlassButton>
            </Link>
          </motion.div>

          {/* Client trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 sm:mt-20 w-full"
          >
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-semibold mb-5">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
              {clientLogos.map((logo) => (
                <span
                  key={logo}
                  className="px-4 py-2 bg-slate-100/50 dark:bg-brand-slateAccent/10 border border-slate-200 dark:border-white/5 rounded-full text-xs text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-white hover:border-brand-primary/30 transition-all duration-300 shadow-sm"
                >
                  {logo}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATISTICS ─────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="py-16 sm:py-20 border-y border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-brand-darker/30 relative z-10 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {statistics.map((stat, idx) => (
              <AnimatedStat key={stat.label} stat={stat} delay={idx * 120} inView={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES TEASER ────────────────────────────────────── */}
      <section className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <GlassBadge variant="primary" className="mb-3 font-semibold">Capabilities</GlassBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 font-display">
            High-Performance Digital Engineering
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            We provide comprehensive design and engineering resources to bring complex business goals to fruition.
          </p>
        </div>

        <GsapFadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {homeServices.slice(0, 3).map((service) => (
            <GlassCard key={service.id} className="group hover:scale-[1.02] flex flex-col justify-between h-full relative" hoverEffect="none">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{service.shortDesc}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/services"
                  className="text-xs font-bold text-brand-primary flex items-center gap-1 group-hover:text-brand-accent transition-colors mt-auto"
                >
                  <span>Learn more</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </GsapFadeIn>

        <div className="text-center mt-12 sm:mt-16">
          <Link to="/services">
            <GlassButton variant="outline" className="px-6 py-3">
              <span>Explore all services</span>
              <ChevronRight size={14} />
            </GlassButton>
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50/50 dark:bg-brand-slateAccent/5 border-y border-slate-200/50 dark:border-white/5 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <GlassBadge variant="accent" className="mb-3 font-semibold">Client Reviews</GlassBadge>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display mt-2">What Our Clients Say</p>
            <div className="flex justify-center items-center gap-1.5 mt-4">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={15} className="text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">5.0 average across all projects</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonialsLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="glass-card p-6 sm:p-8 rounded-2xl h-full flex flex-col animate-pulse">
                  <div className="w-6 h-6 bg-slate-200 dark:bg-brand-slateAccent/40 rounded mb-4" />
                  <div className="flex-1 space-y-2 mb-6">
                    <div className="h-3 bg-slate-200 dark:bg-brand-slateAccent/40 rounded w-full" />
                    <div className="h-3 bg-slate-200 dark:bg-brand-slateAccent/40 rounded w-5/6" />
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-brand-slateAccent/40">
                    <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-brand-slateAccent/40" />
                    <div className="space-y-1.5">
                      <div className="h-3 bg-slate-200 dark:bg-brand-slateAccent/40 rounded w-24" />
                      <div className="h-2.5 bg-slate-200 dark:bg-brand-slateAccent/40 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              displayTestimonials.slice(0, 3).map((t, idx) => {
                const quote   = t.text  || t.quote  || '';
                const role    = t.company || t.role   || '';
                const rating  = t.stars || t.rating  || 5;
                const avatar  = t.avatar || (t.name ? t.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '??');
                const gradient = t.gradient || GRADIENTS[idx % GRADIENTS.length];

                return (
                  <GsapFadeIn key={t._id || t.id || idx} delay={idx * 0.1} direction="up">
                    <GlassCard className="h-full flex flex-col hover:border-brand-primary/30 relative" hoverEffect="lift">
                      <Quote size={22} className="text-brand-primary/30 mb-5 shrink-0" />
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-grow mb-6 italic">
                        "{quote}"
                      </p>
                      <div className="flex items-center gap-3 pt-5 border-t border-slate-200/50 dark:border-white/5">
                        <GlassAvatar initials={avatar} gradient={gradient} size="sm" />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">{t.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{role}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {Array(Math.min(rating, 5)).fill(0).map((_, i) => (
                            <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </GsapFadeIn>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ─── FEATURED CASE STUDY ────────────────────────────────── */}
      <section className="py-20 sm:py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <GlassBadge variant="primary" className="mb-3 font-semibold">Case Study</GlassBadge>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display mt-2">Delivering Real Business Value</p>
        </div>

        {homeCaseStudies.slice(0, 1).map((study) => (
          <GsapFadeIn key={study.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-5">
              <GlassCard className="relative overflow-hidden p-8" hoverEffect="scale">
                <div className={`rounded-xl bg-gradient-to-tr ${study.coverColor} p-6 sm:p-8 flex flex-col justify-between text-white shadow-premium min-h-[280px]`}>
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">Featured Client</span>
                    <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-4 font-display">{study.client}</h4>
                  </div>
                  <div className="space-y-4">
                    {study.stats.map((stat, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-white/15 pb-2">
                        <span className="text-xs text-white/70 font-semibold">{stat.label}</span>
                        <span className="text-lg sm:text-xl font-extrabold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left">
              <GlassBadge variant="secondary" className="font-semibold">{study.category}</GlassBadge>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">{study.title}</h3>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">{study.summary}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-200/50 dark:border-white/5">
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">The Problem</h5>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{study.problem}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">The Solution</h5>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{study.solution}</p>
                </div>
              </div>

              <div className="pt-6">
                <Link to="/case-studies">
                  <GlassButton variant="primary">
                    <span>Read Full Study</span>
                    <ArrowRight size={14} />
                  </GlassButton>
                </Link>
              </div>
            </div>
          </GsapFadeIn>
        ))}
      </section>

      {/* ─── CALL TO ACTION ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <GsapFadeIn direction="up">
          <GlassCard className="relative overflow-hidden p-10 sm:p-16 lg:p-20" hoverEffect="none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[400px] h-[150px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display mb-6 tracking-tight leading-tight">
              Ready to Accelerate Your Digital Product Roadmap?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
              Let's partner. Connect with our engineering leads today to schedule a technical discovery call.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <GlassButton variant="primary" className="w-full sm:w-auto px-8 py-3.5">
                  <span>Consult an Expert</span>
                  <MessageSquare size={14} />
                </GlassButton>
              </Link>
              <Link to="/pricing" className="w-full sm:w-auto">
                <GlassButton variant="glass" className="w-full sm:w-auto px-8 py-3.5">
                  <span>View Packages</span>
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        </GsapFadeIn>
      </section>
    </motion.div>
  );
}
