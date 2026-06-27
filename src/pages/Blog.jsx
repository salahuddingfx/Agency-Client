import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, ThumbsUp, Eye, X, Calendar, User } from 'lucide-react';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import { blogPosts } from '../data/mockData';
import useFetch from '../hooks/useFetch';
import { api } from '../api/api';

/* ─── Mini toast component ──────────────────────────────────────── */
function Toast({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-brand-darker border border-brand-primary/30 text-white text-xs font-semibold px-5 py-3 rounded-full shadow-2xl shadow-brand-primary/10"
        >
          <ThumbsUp size={13} className="text-brand-primary" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Like counter hook ─────────────────────────────────────────── */
function useLikes(initialCounts) {
  const [likes, setLikes] = useState(initialCounts);
  const [liked, setLiked] = useState({});

  const toggle = (id) => {
    if (liked[id]) return; // already liked
    setLiked(prev => ({ ...prev, [id]: true }));
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    return true;
  };

  return { likes, liked, toggle };
}

export default function Blog() {
  const { data: posts = blogPosts } = useFetch(() => api.getBlogs(), blogPosts);
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

  // Keyboard close for modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setReadingPost(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 sm:pt-20 pb-16 min-h-screen relative"
      onKeyDown={handleKeyDown}
    >
      <SEO
        title="Engineering Blog"
        description="Read Nextora Studio's technical blog articles about headless e-commerce, React frameworks, design systems, and mobile databases."
      />

      <Toast show={toast} message="Thanks for the like! 🙌" />

      {/* Background glows */}
      <div className="absolute top-[10%] left-[5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-brand-primary/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-brand-accent/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">Our Journal</h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-5 sm:mb-6">
          Engineering & Design{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
            Insights Hub
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Articles on modern frontend stacks, web speed optimizations, Figma handoff workflows, and backend system scaling.
        </p>

        {/* Search */}
        <div className="mt-8 sm:mt-10 max-w-md mx-auto relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search articles, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-slateAccent/40 border border-brand-slateAccent text-white pl-11 pr-4 py-3 rounded-full text-sm outline-none placeholder:text-slate-500 focus:border-brand-primary/50 focus:bg-brand-slateAccent/60 transition-all"
          />
        </div>
      </section>

      {/* ─── CATEGORIES + POSTS ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12 border-b border-brand-slateAccent/30 pb-5 sm:pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium rounded-full border transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-brand-slateAccent/20 text-slate-400 border-brand-slateAccent hover:text-white hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setReadingPost(post)}
              className="glass-card rounded-xl overflow-hidden hover:border-brand-primary/20 transition-all flex flex-col justify-between group cursor-pointer text-left w-full"
            >
              {/* Cover gradient */}
              <div className={`h-36 sm:h-40 bg-gradient-to-tr ${post.coverGradient} p-5 sm:p-6 flex flex-col justify-between text-white relative`}>
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded border border-white/10 self-start z-10">
                  {post.category}
                </span>
                <div className="flex justify-between items-center text-[10px] text-white/80 z-10">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />{post.readTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <ThumbsUp size={10} />{likes[post.id]}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Eye size={10} />{post.views}
                    </span>
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-grow">
                <h3 className="text-sm sm:text-base font-bold text-white font-display leading-snug mb-2 sm:mb-3 group-hover:text-brand-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{post.snippet}</p>
              </div>

              {/* Footer */}
              <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-3 border-t border-brand-slateAccent/40 flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-semibold">{post.author}</span>
                <span>{post.publishDate}</span>
              </div>
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-slate-500 text-sm">
            No articles match your criteria.
          </div>
        )}
      </section>

      {/* ─── ARTICLE READER MODAL ───────────────────────────────── */}
      <AnimatePresence>
        {readingPost && (
          <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={readingPost.title}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-xl sm:max-w-2xl bg-brand-darker border-l border-brand-slateAccent h-full overflow-y-auto p-5 sm:p-8 lg:p-10 z-10 flex flex-col"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="flex items-center gap-2 text-xs text-brand-primary font-medium">
                    <span className="bg-brand-primary/5 border border-brand-primary/15 px-2 py-0.5 rounded">
                      {readingPost.category}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock size={11} />{readingPost.readTime}
                    </span>
                  </div>
                  <button
                    onClick={() => setReadingPost(null)}
                    className="p-1.5 border border-brand-slateAccent text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    aria-label="Close article"
                  >
                    <X size={16} />
                  </button>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white font-display mb-5 tracking-tight leading-tight">
                  {readingPost.title}
                </h2>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-7 border-y border-brand-slateAccent/40 py-3">
                  <User size={13} className="text-brand-primary" />
                  <span>By <strong className="text-slate-300">{readingPost.author}</strong> ({readingPost.role})</span>
                  <span className="text-slate-700">|</span>
                  <Calendar size={13} />
                  <span>{readingPost.publishDate}</span>
                </div>

                {/* Sanitized HTML content */}
                <div
                  className="prose prose-invert text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(readingPost.content, {
                      ALLOWED_TAGS: ['p', 'h2', 'h3', 'h4', 'strong', 'em', 'code', 'blockquote', 'ul', 'ol', 'li', 'br'],
                      ALLOWED_ATTR: ['class'],
                    }),
                  }}
                />
              </div>

              {/* Article footer */}
              <div className="mt-10 pt-5 border-t border-brand-slateAccent/40 flex items-center justify-between text-xs">
                <button
                  onClick={() => setReadingPost(null)}
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={13} />
                  Close Reader
                </button>
                <button
                  onClick={() => handleLike(readingPost.id)}
                  disabled={liked[readingPost.id]}
                  className={`inline-flex items-center gap-1.5 transition-colors ${
                    liked[readingPost.id]
                      ? 'text-brand-primary cursor-default'
                      : 'text-slate-400 hover:text-brand-primary cursor-pointer'
                  }`}
                >
                  <ThumbsUp size={13} />
                  {liked[readingPost.id] ? `Liked (${likes[readingPost.id]})` : `Like (${likes[readingPost.id]})`}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
