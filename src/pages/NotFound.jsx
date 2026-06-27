import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 sm:pt-20 pb-16 min-h-screen relative flex items-center justify-center px-4"
    >
      <SEO title="404 — Page Not Found" description="The page you are looking for does not exist." noindex={true} />

      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-accent/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl mx-auto">
        {/* Giant 404 */}
        <div className="relative mb-6 sm:mb-8 select-none">
          <span className="text-[100px] sm:text-[140px] lg:text-[180px] font-extrabold font-display leading-none bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent">
            404
          </span>
          {/* Overlay glow dot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 sm:w-48 sm:h-48 bg-brand-primary/20 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 mb-5 text-[10px] text-brand-primary font-medium tracking-wider uppercase">
          <Sparkles size={11} />
          <span>Page Not Found</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white font-display mb-4 tracking-tight">
          Oops! Lost in the Digital Space
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist, has been moved, or the URL might be wrong. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white text-sm font-semibold rounded-lg shadow-premium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            <Home size={15} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-slateAccent bg-brand-slateAccent/20 hover:bg-brand-slateAccent/40 text-white text-sm font-semibold rounded-lg transition-all duration-300"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>

        {/* Helpful quick links */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-brand-slateAccent/30">
          <p className="text-xs text-slate-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: 'Services', path: '/services' },
              { name: 'Portfolio', path: '/portfolio' },
              { name: 'Pricing', path: '/pricing' },
              { name: 'Contact', path: '/contact' },
              { name: 'Blog', path: '/blog' },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white border border-brand-slateAccent/50 hover:border-slate-600 rounded-full transition-all duration-150"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
