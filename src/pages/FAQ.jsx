import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Search } from 'lucide-react';
import SEO from '../components/SEO';
import { faqsData } from '../data/mockData';

// Import Reusable UI Components
import GlassBadge from '../components/ui/GlassBadge';
import GlassAccordion from '../components/ui/GlassAccordion';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedIndices, setExpandedIndices] = useState({});

  const categories = ['All', 'General', 'Process', 'Pricing'];

  const toggleAccordion = (catName, idx) => {
    const key = `${catName}-${idx}`;
    setExpandedIndices(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredData = faqsData.map(group => {
    const matchesCategory = activeCategory === 'All' || group.category === activeCategory;
    if (!matchesCategory) return null;

    const matchedItems = group.items.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedItems.length === 0) return null;

    return {
      ...group,
      items: matchedItems
    };
  }).filter(Boolean);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqsData.flatMap(group => 
      group.items.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    )
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
        title="Frequently Asked Questions" 
        description="Find answers to commonly asked questions about Nextora Studio's project timelines, source code ownership, milestones, and client portals." 
        keywords={[
          'frequently asked questions',
          'software agency faq',
          'project timelines',
          'code ownership',
          'milestone payments',
          'client support'
        ]}
        schema={faqSchema}
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <GlassBadge variant="primary" className="mb-4 font-semibold">Support</GlassBadge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display mb-6">
          Frequently Asked <br />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Questions & Answers</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-555 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Find answers regarding our React/Vite development methodologies, pricing structures, and communication channels.
        </p>

        {/* Search input */}
        <div className="mt-10 max-w-md mx-auto relative">
          <Search size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search FAQs (e.g., source code, retainer)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/55 dark:bg-brand-slateAccent/35 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white pl-12 pr-4 py-3.5 rounded-full text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-primary/50 focus:bg-white dark:focus:bg-brand-slateAccent/50 transition-all shadow-sm"
          />
        </div>
      </section>

      {/* --- ACCORDIONS CONTENT --- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        {/* Category toggles */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 border-b border-slate-200/50 dark:border-white/5 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-primary text-white border-brand-primary shadow-premium'
                  : 'bg-slate-100/60 dark:bg-brand-slateAccent/10 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:text-slate-800 dark:hover:text-white hover:border-brand-primary/30'
              }`}
            >
              {cat === 'All' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {filteredData.map((group) => (
            <div key={group.category} className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-250/50 dark:border-white/5 pb-3 pl-1">
                {group.category} FAQs
              </h3>

              <div className="space-y-4">
                {group.items.map((item, idx) => {
                  const key = `${group.category}-${idx}`;
                  const isExpanded = !!expandedIndices[key];

                  return (
                    <GlassAccordion
                      key={idx}
                      title={item.q}
                      isOpen={isExpanded}
                      onToggle={() => toggleAccordion(group.category, idx)}
                      icon={HelpCircle}
                    >
                      {item.a}
                    </GlassAccordion>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-24 text-slate-500 text-sm font-medium">
              No matching FAQ items found. Try different search terms.
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
