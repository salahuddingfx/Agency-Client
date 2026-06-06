import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, ThumbsUp, Eye, X, BookOpen, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';
import { blogPosts } from '../data/mockData';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingPost, setReadingPost] = useState(null);

  const categories = ['All', 'Web Development', 'Mobile App Development', 'UI/UX Design'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <SEO 
        title="Engineering Blog" 
        description="Read Nextora Studio's technical blog articles about headless e-commerce, React frameworks, design systems, and mobile databases." 
      />

      {/* Background Glows */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Our Journal</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
          Engineering & Design <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Insights Hub</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
          Articles on modern frontend stacks, web speed optimizations, Figma handoff workflows, and backend system scaling.
        </p>

        {/* Search Engine */}
        <div className="mt-10 max-w-md mx-auto relative">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search articles, tags, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-slateAccent/40 border border-brand-slateAccent text-white pl-12 pr-4 py-3 rounded-full text-sm outline-none transition-all placeholder:text-slate-500 focus:border-brand-primary/50 focus:bg-brand-slateAccent/60"
          />
        </div>
      </section>

      {/* --- CATEGORIES & LISTINGS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-brand-slateAccent/30 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-brand-slateAccent/20 text-slate-400 border-brand-slateAccent hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div 
              key={post.id}
              onClick={() => setReadingPost(post)}
              className="glass-card rounded-xl overflow-hidden hover:border-brand-primary/20 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className={`h-40 bg-gradient-to-tr ${post.coverGradient} p-6 flex flex-col justify-between text-white relative`}>
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded border border-white/10 self-start z-10">
                    {post.category}
                  </span>
                  <div className="flex justify-between items-center text-[10px] text-white/80 z-10">
                    <span className="flex items-center space-x-1">
                      <Clock size={10} />
                      <span>{post.readTime}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <span className="flex items-center space-x-0.5">
                        <ThumbsUp size={10} />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-0.5">
                        <Eye size={10} />
                        <span>{post.views}</span>
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-bold text-white font-display leading-snug mb-3 group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {post.snippet}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-brand-slateAccent/40 flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-semibold">{post.author} ({post.role})</span>
                <span>{post.publishDate}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-slate-500 text-sm">
            No articles match your criteria.
          </div>
        )}
      </section>

      {/* --- INLINE ARTICLE READER MODAL (Framer Motion) --- */}
      <AnimatePresence>
        {readingPost && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Drawer content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-brand-darker border-l border-brand-slateAccent h-full overflow-y-auto p-6 sm:p-10 z-10 flex flex-col justify-between"
            >
              <div>
                <button
                  onClick={() => setReadingPost(null)}
                  className="p-2 border border-brand-slateAccent text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors self-start mb-6"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center space-x-3 text-xs text-brand-primary font-medium mb-4">
                  <span className="bg-brand-primary/5 border border-brand-primary/15 px-2 py-0.5 rounded">{readingPost.category}</span>
                  <span className="text-slate-500">&bull;</span>
                  <span className="text-slate-400 flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{readingPost.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white font-display mb-6 tracking-tight leading-tight">
                  {readingPost.title}
                </h2>

                <div className="flex items-center space-x-3 text-xs text-slate-500 mb-8 border-y border-brand-slateAccent/40 py-3">
                  <User size={14} className="text-brand-primary" />
                  <span>By <strong>{readingPost.author}</strong> ({readingPost.role})</span>
                  <span className="text-slate-600">|</span>
                  <Calendar size={14} />
                  <span>Published on {readingPost.publishDate}</span>
                </div>

                {/* Inject article HTML mock content */}
                <div 
                  className="prose prose-invert text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 font-sans"
                  dangerouslySetInnerHTML={{ __html: readingPost.content }}
                />
              </div>

              <div className="mt-12 pt-6 border-t border-brand-slateAccent/40 flex items-center justify-between text-xs">
                <button
                  onClick={() => setReadingPost(null)}
                  className="inline-flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                  <span>Close Reader</span>
                </button>

                <button
                  onClick={() => alert('Thanks for the support!')}
                  className="inline-flex items-center space-x-1.5 text-brand-primary hover:text-white transition-colors"
                >
                  <ThumbsUp size={14} />
                  <span>Like Article</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
