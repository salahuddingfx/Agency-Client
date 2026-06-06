import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { faqsData } from '../data/mockData';

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

  // Filter based on selected category and text search
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
      />

      {/* Decorative Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Support</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
          Frequently Asked <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Questions & Answers</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Find answers regarding our React/Vite development methodologies, pricing structures, and communication channels.
        </p>

        {/* Search input */}
        <div className="mt-10 max-w-md mx-auto relative">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search FAQs (e.g., source code, retainer)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-slateAccent/40 border border-brand-slateAccent text-white pl-12 pr-4 py-3 rounded-full text-sm outline-none transition-all placeholder:text-slate-500 focus:border-brand-primary/50 focus:bg-brand-slateAccent/60"
          />
        </div>
      </section>

      {/* --- ACCORDIONS CONTENT --- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Category toggles */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-brand-slateAccent/30 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-all ${
                activeCategory === cat
                  ? 'bg-brand-primary text-white border-brand-primary shadow-premium'
                  : 'bg-brand-slateAccent/20 text-slate-400 border-brand-slateAccent hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        <div className="space-y-10">
          {filteredData.map((group) => (
            <div key={group.category} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-brand-slateAccent/40 pb-2">
                {group.category} FAQs
              </h3>

              <div className="space-y-3">
                {group.items.map((item, idx) => {
                  const key = `${group.category}-${idx}`;
                  const isExpanded = !!expandedIndices[key];

                  return (
                    <div 
                      key={idx}
                      className="glass-card rounded-lg border border-brand-slateAccent overflow-hidden"
                    >
                      <button
                        onClick={() => toggleAccordion(group.category, idx)}
                        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-white/5 transition-colors gap-4"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-white font-display flex items-start space-x-3">
                          <HelpCircle size={16} className="text-brand-primary mt-0.5 flex-shrink-0" />
                          <span>{item.q}</span>
                        </span>
                        <ChevronDown 
                          size={16} 
                          className={`text-slate-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-brand-primary' : ''}`} 
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-brand-slateAccent/40 pl-11">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-20 text-slate-500 text-sm">
              No matching FAQ items found. Try different search terms.
            </div>
          )}
        </div>
      </section>

    </motion.div>
  );
}
