import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Info, Sparkles, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import { pricingPlans } from '../data/mockData';
import GsapFadeIn from '../components/GsapAnimate';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  // Apply a 20% discount on prices for annual subscription models
  const calculatePrice = (priceStr) => {
    const rawNumber = parseInt(priceStr.replace(/[^0-9]/g, ''));
    if (billingCycle === 'annual') {
      const discounted = Math.round(rawNumber * 0.8 / 12);
      return `$${discounted.toLocaleString()}`;
    }
    return priceStr;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO 
        title="Development Packages & Retainers" 
        description="View our transparent project pricing packages, tailored from Starter landing pages to enterprise cloud ERP systems." 
        keywords={[
          'software development cost',
          'custom app pricing',
          'web development milestones',
          'retainer agreements',
          'nextora studio billing'
        ]}
      />

      {/* Decorative background glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <GlassBadge variant="primary" className="mb-4 font-semibold">Investment</GlassBadge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display mb-6">
          Transparent, Value-Based{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Project Packaging</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Select a project scale that fits your active business roadmap. All plans feature code transfers, responsive assets, and post-launch SLAs.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="mt-10 flex justify-center items-center">
          <div className="relative bg-slate-100 dark:bg-brand-slateAccent/40 p-1.5 rounded-full border border-slate-200 dark:border-white/5 flex items-center shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-brand-primary text-white shadow-premium'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Milestone Payment
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 flex items-center space-x-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-brand-primary text-white shadow-premium'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <span>Monthly Support SLA</span>
              <span className="text-[9px] bg-white/20 dark:bg-white/10 px-2 py-0.5 rounded-full text-brand-primary dark:text-white font-bold">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- CARDS DISPLAY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GsapFadeIn className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <GlassCard 
              key={plan.id} 
              className={`hover:border-brand-primary/30 flex flex-col justify-between relative h-full text-left p-8 sm:p-10 ${
                plan.popular ? 'border-brand-primary/30 ring-1 ring-brand-primary/20 shadow-glow' : ''
              }`}
              hoverEffect="lift"
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-md z-10">
                  <Sparkles size={11} className="animate-pulse" />
                  <span>Most Selected</span>
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">{plan.tag}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 font-display">{plan.name}</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-450 leading-relaxed mt-2 min-h-[48px]">{plan.description}</p>
                
                <div className="mt-8 flex items-baseline border-b border-slate-200/50 dark:border-white/5 pb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{calculatePrice(plan.price)}</span>
                  <span className="text-slate-550 dark:text-slate-500 text-xs font-semibold ml-2">
                    {billingCycle === 'annual' ? '/ month' : ' starting price'}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-350 uppercase tracking-widest flex items-center space-x-1.5">
                    <Info size={13} className="text-brand-primary" />
                    <span>Deliverables</span>
                  </h4>
                  <ul className="space-y-3.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-500 dark:text-slate-400">
                        <Check size={14} className="text-brand-primary mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-white/5">
                <Link to="/contact" className="block w-full">
                  <GlassButton 
                    variant={plan.popular ? 'primary' : 'glass'} 
                    className="w-full py-3"
                  >
                    Request Detailed Scope
                  </GlassButton>
                </Link>
                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-3 text-center italic">{plan.bestFor}</p>
              </div>
            </GlassCard>
          ))}
        </GsapFadeIn>
      </section>

      {/* --- CUSTOM PLAN SECTION --- */}
      <section className="py-20 max-w-4xl mx-auto px-4 relative z-10">
        <GsapFadeIn direction="up">
          <GlassCard className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 sm:p-10" hoverEffect="none">
            <div className="max-w-md text-left">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display">Need a custom contract or support retainers?</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                We construct custom service agreements for continuous monthly engineering, security auditing, and design support.
              </p>
            </div>
            <Link to="/contact" className="shrink-0">
              <GlassButton variant="secondary" className="flex items-center gap-2 px-6">
                <MessageSquare size={14} />
                <span>Consult Retainers</span>
              </GlassButton>
            </Link>
          </GlassCard>
        </GsapFadeIn>
      </section>
    </motion.div>
  );
}
