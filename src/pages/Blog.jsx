import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, ThumbsUp, Eye, X, Calendar, User } from 'lucide-react';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import { blogPosts } from '../data/mockData';
import { normalizeBlogs } from '../data/normalize';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';

// Import Reusable UI Components
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';

function Toast({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-white dark:bg-[#020617] border border-brand-primary/30 text-slate-800 dark:text-white text-xs font-semibold px-5 py-3 rounded-full shadow-2xl"
        >
          <ThumbsUp size={13} className="text-brand-primary" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useLikes(initialCounts) {
  const [likes, setLikes] = useState(initialCounts);
  const [liked, setLiked] = useState({});

  const toggle = (id) => {
    if (liked[id]) return;
    setLiked(prev => ({ ...prev, [id]: true }));
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    return true;
  };

  return { likes, liked, toggle };
}

export default function Blog() {
  const { data: rawPosts = blogPosts } = useFetch(() => api.getBlogs(), blogPosts);
  const posts = normalizeBlogs(rawPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingPost, setReadingPost] = useState(null);
  const [toast, setToast] = useState(false);

  const initialLikes = Object.fromEntries(posts.map(p => [p.id, p.likes]));
  const { likes, liked, toggle } = useLikes(initialLikes);

  const categories = ['All', 'Web Development', 'Mobile App Development', 'UI/UX Design'];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (postId) => {
    const toggled = toggle(postId);
    if (toggled) {
      setToast(true);
      setTimeout(() => setToast(false), 2500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setReadingPost(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative animate-fade-in"
      onKeyDown={handleKeyDown}
    >
      <SEO
        title="Technical Insights & Engineering Blog"
        description="Read Nextora Studio's technical blog articles about headless e-commerce, React frameworks, design systems, and mobile databases."
        keywords={[
          'software engineering articles',
          'web development blog',
          'frontend trends',
          'tech guides',
          'coding best practices',
          'digital strategy'
        ]}
      />

      <Toast show={toast} message="Thanks for the like! 🙌" />

      {/* Background glows */}
      <div className="absolute top-[10%] left-[5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-brand-primary/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-brand-accent/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <GlassBadge variant="primary" className="mb-4 font-semibold">Our Journal</GlassBadge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display mb-6">
          Engineering & Design{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            Insights Hub
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Articles on modern frontend stacks, web speed optimizations, Figma handoff workflows, and backend system scaling.
        </p>

        {/* Search */}
        <div className="mt-8 sm:mt-10 max-w-md mx-auto relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/55 dark:bg-brand-slateAccent/35 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white pl-11 pr-4 py-3.5 rounded-full text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-brand-primary/50 focus:bg-white dark:focus:bg-brand-slateAccent/50 transition-all shadow-sm"
          />
        </div>
      </section>

      {/* ─── CATEGORIES + POSTS ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 border-b border-slate-200/50 dark:border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white border-brand-primary shadow-premium'
                  : 'bg-slate-100/60 dark:bg-brand-slateAccent/10 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:text-slate-800 dark:hover:text-white hover:border-brand-primary/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setReadingPost(post)}
              className="group cursor-pointer text-left w-full flex h-full"
            >
              <GlassCard className="overflow-hidden hover:border-brand-primary/30 w-full flex flex-col justify-between p-0" hoverEffect="lift">
                {/* Cover gradient */}
                <div className={`h-40 sm:h-44 bg-gradient-to-tr ${post.coverGradient} p-6 flex flex-col justify-between text-white relative w-full shrink-0`}>
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded border border-white/10 self-start z-10">
                    {post.category}
                  </span>
                  <div className="flex justify-between items-center text-[10px] text-white/80 z-10">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Clock size={11} />{post.readTime}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-semibold">
                        <ThumbsUp size={11} />{likes[post.id]}
                      </span>
                      <span className="flex items-center gap-1 font-semibold">
                        <Eye size={11} />{post.views}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 flex-grow">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display leading-snug mb-3 group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{post.snippet}</p>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-8 pb-5 sm:pb-6 pt-4 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  <span>{post.author}</span>
                  <span>{post.publishDate}</span>
                </div>
              </GlassCard>
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-24 text-slate-500 text-sm">
            No articles match your criteria.
          </div>
        )}
      </section>

      {/* ─── ARTICLE READER DRAW MODAL ───────────────────────────── */}
      <AnimatePresence>
        {readingPost && (
          <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={readingPost.title}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingPost(null)}
              className="absolute inset-0 bg-slate-950/20 dark:bg-black/50 backdrop-blur-md"
            />

            {/* Drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="relative w-full max-w-xl sm:max-w-2xl bg-white dark:bg-[#020617] border-l border-slate-200 dark:border-white/5 h-full overflow-y-auto p-6 sm:p-10 lg:p-12 z-10 flex flex-col justify-between text-left"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5 text-xs text-brand-primary font-bold">
                    <span className="bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-1 rounded-md">
                      {readingPost.category}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Clock size={12} />{readingPost.readTime}
                    </span>
                  </div>
                  <button
                    onClick={() => setReadingPost(null)}
                    className="p-2 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300"
                    aria-label="Close article"
                  >
                    <X size={16} />
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-6 tracking-tight leading-tight">
                  {readingPost.title}
                </h2>

                <div className="flex items-center gap-3.5 text-[11px] text-slate-500 dark:text-slate-500 mb-8 border-y border-slate-200/50 dark:border-white/5 py-3.5">
                  <User size={14} className="text-brand-primary" />
                  <span>By <strong className="text-slate-800 dark:text-slate-350">{readingPost.author}</strong> ({readingPost.role})</span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <Calendar size={14} />
                  <span>{readingPost.publishDate}</span>
                </div>

                {/* Sanitized HTML content */}
                <div
                  className="prose dark:prose-invert text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-5"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(readingPost.content, {
                      ALLOWED_TAGS: ['p', 'h2', 'h3', 'h4', 'strong', 'em', 'code', 'blockquote', 'ul', 'ol', 'li', 'br'],
                      ALLOWED_ATTR: ['class'],
                    }),
                  }}
                />
              </div>

              {/* Article reader footer */}
              <div className="mt-12 pt-6 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-xs font-semibold">
                <button
                  onClick={() => setReadingPost(null)}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <X size={14} />
                  <span>Close Reader</span>
                </button>
                <button
                  onClick={() => handleLike(readingPost.id)}
                  disabled={liked[readingPost.id]}
                  className={`inline-flex items-center gap-1.5 transition-colors ${
                    liked[readingPost.id]
                      ? 'text-brand-primary cursor-default'
                      : 'text-slate-500 hover:text-brand-primary cursor-pointer'
                  }`}
                >
                  <ThumbsUp size={14} />
                  <span>{liked[readingPost.id] ? `Liked (${likes[readingPost.id]})` : `Like (${likes[readingPost.id]})`}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
