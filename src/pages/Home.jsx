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

/* ─── CountUp Hook ─────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState('0');

  useEffect(() => {
    if (!start) return;
    // Parse numeric value from string like "120+", "98%", "8+", "15m+"
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
    <div className="text-center px-4">
      <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
        {count}
      </span>
      <span className="block text-[10px] sm:text-xs font-semibold text-brand-primary uppercase tracking-widest mt-2">
        {stat.label}
      </span>
      <span className="block text-[10px] sm:text-xs text-slate-500 mt-1 max-w-[180px] mx-auto leading-relaxed">
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

/* ─── Client logo trust strip ──────────────────────────────────── */
const clientLogos = [
  'Apex Retail', 'Velo Delivery', 'DineSync', 'Omni Mfg.', 'Aura Capital', 'Launchpad Tools',
];

/* ─── Icon helper ──────────────────────────────────────────────── */
function getServiceIcon(name) {
  switch (name) {
    case 'Globe': return <Globe className="text-brand-primary" size={22} />;
    case 'Smartphone': return <Smartphone className="text-brand-primary" size={22} />;
    case 'Code': return <Code className="text-brand-primary" size={22} />;
    case 'Layers': return <Layers className="text-brand-primary" size={22} />;
    default: return <Sparkles className="text-brand-primary" size={22} />;
  }
}

/* ─── Home Page ─────────────────────────────────────────────────── */
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
  const homeTechs = normalizeTechnologies(rawHomeTechs);

  // Fetch live testimonials from backend
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
      { threshold: 0.3 }
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
      className="relative min-h-screen pt-16 sm:pt-20 pb-16 overflow-hidden"
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
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': 'Nextora Studio',
          'url': 'https://nextorastudio.tech',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': 'https://nextorastudio.tech/blog?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }}
      />

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 text-center bg-mesh-pattern overflow-hidden min-h-[85vh]">

        {/* Floating glows */}
        <div className="absolute top-[15%] left-[5%] sm:left-[10%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-brand-primary/10 rounded-full blur-[80px] sm:blur-[100px] animate-float pointer-events-none z-0" />
        <div className="absolute bottom-[15%] right-[5%] sm:right-[10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-brand-accent/10 rounded-full blur-[100px] sm:blur-[120px] animate-pulse-subtle pointer-events-none z-0" />

        {/* Animated Curvature background waves */}
        <AnimatedWaves />

        <div className="max-w-4xl mx-auto relative z-10 w-full flex flex-col items-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 mb-5 sm:mb-6 text-[10px] sm:text-xs text-brand-primary font-medium tracking-wider uppercase"
          >
            <Sparkles size={11} className="animate-spin-slow" />
            <span>Introducing Nextora Studio</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.15] px-2 w-full"
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
            className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed px-2"
          >
            We design, develop, and deploy websites, mobile apps, POS platforms, CRM/ERP tools, AI solutions, and brand identities that scale your operations globally.
          </motion.p>

          {/* Hero Buttons */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-sm font-semibold rounded-lg shadow-premium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Start Your Project</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-slateAccent bg-brand-slateAccent/20 hover:bg-brand-slateAccent/40 hover:border-slate-700 text-white text-sm font-semibold rounded-lg transition-all duration-300"
            >
              <span>View Portfolio</span>
            </Link>
          </motion.div>

          {/* Client trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 sm:mt-12 w-full"
          >
            <p className="text-[10px] sm:text-xs text-slate-600 uppercase tracking-widest mb-4">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {clientLogos.map((logo) => (
                <span
                  key={logo}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-slateAccent/20 border border-brand-slateAccent/40 rounded-full text-[10px] sm:text-xs text-slate-500 font-medium hover:text-slate-300 hover:border-slate-600 transition-colors duration-200"
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
        className="py-12 sm:py-16 border-y border-brand-slateAccent/30 bg-brand-darker relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {statistics.map((stat, idx) => (
              <AnimatedStat key={stat.label} stat={stat} delay={idx * 150} inView={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES TEASER ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-primary">Capabilities</h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mt-2 font-display">
            High-Performance Digital Engineering
          </p>
          <p className="text-sm sm:text-base text-slate-400 mt-3 sm:mt-4">
            We provide comprehensive design and engineering resources to bring complex business goals to fruition.
          </p>
        </div>

        <GsapFadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {homeServices.slice(0, 3).map((service) => (
            <GlowCard key={service.id} className="h-full">
              <div className="glass-card p-6 sm:p-8 rounded-lg hover:border-brand-primary/20 transition-all group flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-display">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 sm:mb-6">{service.shortDesc}</p>
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/services"
                  className="text-xs font-semibold text-brand-primary flex items-center gap-1 group-hover:text-white transition-colors"
                >
                  <span>Learn more</span>
                  <ChevronRight size={13} />
                </Link>
              </div>
            </GlowCard>
          ))}
        </GsapFadeIn>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-brand-primary transition-colors"
          >
            <span>Explore all services</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-brand-slateAccent/10 border-y border-brand-slateAccent/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-primary">Client Reviews</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">What Our Clients Say</p>
            <div className="flex justify-center items-center gap-1 mt-3">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-xs text-slate-400 ml-2">5.0 average across all projects</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {testimonialsLoading ? (
              // Loading skeleton
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="glass-card p-6 sm:p-7 rounded-xl h-full flex flex-col animate-pulse">
                  <div className="w-5 h-5 bg-brand-slateAccent/40 rounded mb-4" />
                  <div className="flex-1 space-y-2 mb-5">
                    <div className="h-3 bg-brand-slateAccent/40 rounded w-full" />
                    <div className="h-3 bg-brand-slateAccent/40 rounded w-4/5" />
                    <div className="h-3 bg-brand-slateAccent/40 rounded w-3/5" />
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-brand-slateAccent/40">
                    <div className="w-9 h-9 rounded-full bg-brand-slateAccent/40" />
                    <div className="space-y-1.5">
                      <div className="h-2.5 bg-brand-slateAccent/40 rounded w-24" />
                      <div className="h-2 bg-brand-slateAccent/40 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              displayTestimonials.slice(0, 3).map((t, idx) => {
                // Support both live backend shape AND fallback shape
                const quote   = t.text  || t.quote  || '';
                const role    = t.company || t.role   || '';
                const rating  = t.stars || t.rating  || 5;
                const avatar  = t.avatar || (t.name ? t.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '??');
                const gradient = t.gradient || GRADIENTS[idx % GRADIENTS.length];

                return (
                  <GsapFadeIn key={t._id || t.id || idx} delay={idx * 0.1} direction="up">
                    <div className="glass-card p-6 sm:p-7 rounded-xl hover:border-brand-primary/20 transition-all h-full flex flex-col">
                      <Quote size={20} className="text-brand-primary/40 mb-4 shrink-0" />
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed flex-1 mb-5">
                        "{quote}"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-brand-slateAccent/40">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {avatar}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">{t.name}</p>
                          <p className="text-[10px] text-slate-500">{role}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {Array(Math.min(rating, 5)).fill(0).map((_, i) => (
                            <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </GsapFadeIn>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ─── FEATURED CASE STUDY ────────────────────────────────── */}
      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-primary">Case Study</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">Delivering Real Business Value</p>
          </div>

          {homeCaseStudies.slice(0, 1).map((study) => (
            <GsapFadeIn key={study.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">

              <GlowCard className="lg:col-span-5">
                <div className={`rounded-xl bg-gradient-to-tr ${study.coverColor} p-7 sm:p-8 flex flex-col justify-between text-white shadow-premium relative overflow-hidden min-h-[260px]`}>
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">Featured Client</span>
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight mt-4">{study.client}</h4>
                  </div>
                  <div className="space-y-3">
                    {study.stats.map((stat, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-white/10 pb-2">
                        <span className="text-xs text-white/70">{stat.label}</span>
                        <span className="text-lg sm:text-xl font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>

              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-2.5 py-1 rounded border border-brand-primary/15">
                  {study.category}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-display">{study.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{study.summary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-brand-slateAccent/40">
                  <div>
                    <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">The Problem</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{study.problem}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">The Solution</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6">
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-slateAccent/40 hover:bg-brand-slateAccent border border-brand-slateAccent text-white text-xs font-semibold rounded-lg transition-colors"
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

      {/* ─── CALL TO ACTION ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <GsapFadeIn direction="up">
          <GlowCard>
            <div className="glass-card p-8 sm:p-12 lg:p-16 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[350px] h-[120px] sm:h-[150px] bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display mb-4 sm:mb-6 tracking-tight">
                Ready to Accelerate Your Digital Product Roadmap?
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-7 sm:mb-8 text-sm leading-relaxed">
                Let's partner. Connect with our engineering leads today to schedule a technical discovery call.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-sm font-semibold rounded-lg shadow-premium hover:shadow-glow transition-all"
                >
                  <span>Consult an Expert</span>
                  <MessageSquare size={14} />
                </Link>
                <Link
                  to="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-brand-slateAccent text-white text-sm font-semibold rounded-lg hover:bg-brand-slateAccent/30 transition-all"
                >
                  <span>View Packages</span>
                </Link>
              </div>
            </div>
          </GlowCard>
        </GsapFadeIn>
      </section>
    </motion.div>
  );
}
