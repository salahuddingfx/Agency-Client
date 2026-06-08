import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Shield, Users, Target, ChevronRight, Sparkles, Rocket, Cpu, Globe } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    restDelta: 0.001
  });

  const values = [
    {
      icon: <Award className="text-brand-primary" size={24} />,
      title: 'Precision Craftsmanship',
      desc: 'We do not believe in cutting corners. Every line of code, UI pixel, and server configuration is engineered to absolute standards.'
    },
    {
      icon: <Shield className="text-brand-primary" size={24} />,
      title: 'Uncompromised Integrity',
      desc: 'Transparency runs through our sprints. We provide absolute visibility via our client portal regarding timelines, codes, and costs.'
    },
    {
      icon: <Users className="text-brand-primary" size={24} />,
      title: 'Collaborative Spirit',
      desc: 'We operate as an extension of your own department. Your strategic achievements dictate our project success.'
    },
    {
      icon: <Target className="text-brand-primary" size={24} />,
      title: 'Performance Obsessed',
      desc: 'Whether it is page loading milliseconds, application response rates, or SEO scores—we deliver optimal results.'
    }
  ];

  const milestones = [
    { 
      year: 'Aug 2025', 
      title: 'Nextora Studio Founded', 
      desc: 'Established with a focus on custom engineering, full-stack systems, and premium design standards.',
      icon: <Sparkles className="text-brand-primary" size={16} />
    },
    { 
      year: 'Nov 2025', 
      title: 'MVP Platform Launch', 
      desc: 'Shipped our initial framework to strategic startup client cohorts, validating core backend integrations.',
      icon: <Rocket className="text-brand-primary" size={16} />
    },
    { 
      year: 'Feb 2026', 
      title: 'ERP, CRM, & CMS Expansion', 
      desc: 'Broadened capabilities into custom dashboard development, POS configurations, and robust enterprise admin structures.',
      icon: <Cpu className="text-brand-primary" size={16} />
    },
    { 
      year: 'Jun 2026', 
      title: 'Nextora Hub 2.0 & Global Staging', 
      desc: 'Released our unified customer dashboard featuring transparent project pipelines, tickets, and automated invoice tools.',
      icon: <Globe className="text-brand-primary" size={16} />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO 
        title="About Us" 
        description="Learn about Nextora Studio's history, founding values, and mission to deliver premium software and digital design services." 
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Our Identity</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
          We Build Digital Products <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Where Ideas Take Shape</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Nextora Studio was founded to bridge the gap between high-end visual design and rigorous backend engineering. We construct bespoke digital engines that scale operations, optimize checkouts, and increase traffic.
        </p>
      </section>

      {/* --- VALUES GRID --- */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Our Values</h2>
          <p className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">The Principles Driving Nextora</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="glass-card p-8 rounded-lg hover:border-brand-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-md bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 font-display">{v.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section className="py-20 bg-brand-slateAccent/10 border-y border-brand-slateAccent/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Timeline</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">Our Evolution Over the Years</p>
          </div>

          <div ref={containerRef} className="relative max-w-3xl mx-auto pl-16 sm:pl-20 space-y-12">
            {/* The vertical tracking line */}
            <div className="absolute left-6 sm:left-8 top-2 bottom-2 w-[3px] bg-brand-slateAccent rounded-full overflow-hidden">
              <motion.div 
                className="w-full bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent origin-top h-full"
                style={{ scaleY }}
              />
            </div>

            {milestones.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
              >
                {/* Timeline Circle Bullet with Icon */}
                <div className="absolute left-[5px] sm:left-[13px] top-1 w-10 h-10 rounded-full bg-brand-darker border-2 border-brand-slateAccent flex items-center justify-center group-hover:border-brand-primary transition-all duration-300 z-10 shadow-premium">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                
                <span className="inline-block text-xs font-semibold text-brand-primary bg-brand-primary/5 px-2 py-0.5 border border-brand-primary/10 rounded mb-2">
                  {item.year}
                </span>
                <h4 className="text-lg font-semibold text-white mb-1 font-display group-hover:text-brand-primary transition-colors duration-300">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM LEADERBOARD REDIRECT --- */}
      <section className="py-20 max-w-4xl mx-auto text-center px-4 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-4">Meet the Minds Behind Nextora</h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Our team is composed of passionate developers, meticulous interface designers, and analytical digital marketing specialists.
        </p>
        <Link
          to="/team"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-semibold rounded-md shadow-premium hover:shadow-glow transition-all"
        >
          <span>Meet the Team</span>
          <ChevronRight size={14} />
        </Link>
      </section>

    </motion.div>
  );
}
