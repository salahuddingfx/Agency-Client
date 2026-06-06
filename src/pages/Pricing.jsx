import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Info, Sparkles, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import { pricingPlans } from '../data/mockData';

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
      className="pt-24 pb-16 min-h-screen relative animate-fade-in"
    >
      <SEO 
        title="Pricing Packages" 
        description="View our transparent project pricing packages, tailored from Starter landing pages to enterprise cloud ERP systems." 
      />

      {/* Decorative background glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Investment</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
          Transparent, Value-Based <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Project Packaging</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Select a project scale that fits your active business roadmap. All plans feature code transfers, responsive assets, and post-launch SLAs.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="mt-10 flex justify-center items-center">
          <div className="relative bg-brand-slateAccent/40 p-1 rounded-full border border-brand-slateAccent flex items-center">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                billingCycle === 'monthly' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Milestone Payment
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors flex items-center space-x-1 ${
                billingCycle === 'annual' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Monthly Support SLA</span>
              <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full text-white">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- CARDS DISPLAY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`glass-card rounded-xl p-8 flex flex-col justify-between relative hover:border-brand-primary/20 transition-all ${
                plan.popular ? 'border-brand-primary/30 ring-1 ring-brand-primary/20 shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
                  <Sparkles size={10} />
                  <span>Most Selected</span>
                </div>
              )}

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{plan.tag}</span>
                <h3 className="text-xl font-bold text-white mt-2 font-display">{plan.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-2 min-h-[48px]">{plan.description}</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white tracking-tight">{calculatePrice(plan.price)}</span>
                  <span className="text-slate-500 text-xs ml-2">
                    {billingCycle === 'annual' ? '/ month' : ' project starting price'}
                  </span>
                </div>

                <div className="mt-8 space-y-4 pt-6 border-t border-brand-slateAccent/40">
                  <h4 className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest flex items-center space-x-1.5">
                    <Info size={12} className="text-brand-primary" />
                    <span>Deliverables</span>
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-400">
                        <Check size={14} className="text-brand-primary mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-slateAccent/40">
                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-md text-xs font-bold text-center block transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-premium hover:shadow-glow'
                      : 'bg-brand-slateAccent/30 hover:bg-brand-slateAccent border border-brand-slateAccent text-white'
                  }`}
                >
                  Request Detailed Scope
                </Link>
                <p className="text-[10px] text-slate-500 mt-3 text-center italic">{plan.bestFor}</p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* --- CUSTOM PLAN SECTION --- */}
      <section className="py-20 max-w-4xl mx-auto px-4 relative z-10">
        <div className="glass-card p-8 sm:p-10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border-brand-slateAccent">
          <div className="max-w-md">
            <h3 className="text-lg font-bold text-white font-display">Need a custom contract or support retainers?</h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-2">
              We construct custom service agreements for continuous monthly engineering, security auditing, and design support.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-slateAccent/40 hover:bg-brand-slateAccent border border-brand-slateAccent text-white text-xs font-semibold rounded-md transition-all flex-shrink-0"
          >
            <MessageSquare size={14} />
            <span>Consult Retainers</span>
          </Link>
        </div>
      </section>

    </motion.div>
  );
}
