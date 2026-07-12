import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

// Import Reusable UI Components
import GlassBadge from '../components/ui/GlassBadge';
import GlassButton from '../components/ui/GlassButton';

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
        {/* Giant 404 Lottie-like SVG Scene */}
        <div className="relative w-full max-w-[280px] sm:max-w-[340px] mx-auto mb-6 select-none flex items-center justify-center aspect-[4/3]">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <defs>
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <radialGradient id="planet-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#6366f1" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Radar / Grid Circles */}
            <circle cx="200" cy="150" r="130" stroke="#1e293b" strokeWidth="1" fill="none" className="stroke-slate-200 dark:stroke-slate-800" />
            <circle cx="200" cy="150" r="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="5 5" fill="none" className="stroke-slate-200 dark:stroke-slate-800" />
            <circle cx="200" cy="150" r="70" stroke="#334155" strokeWidth="1" fill="none" className="stroke-slate-300 dark:stroke-slate-700" />

            {/* Background Grid Lines */}
            <line x1="200" y1="20" x2="200" y2="280" stroke="#1e293b" strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />
            <line x1="70" y1="150" x2="330" y2="150" stroke="#1e293b" strokeWidth="1" className="stroke-slate-200 dark:stroke-slate-800" />

            {/* Glowing Space Particles (Stars) */}
            <motion.circle cx="90" cy="60" r="2" fill="#3b82f6" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle cx="310" cy="70" r="3" fill="#a855f7" animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
            <motion.circle cx="80" cy="240" r="1.5" fill="#f43f5e" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }} />
            <motion.circle cx="320" cy="230" r="2" fill="#3b82f6" animate={{ opacity: [0.2, 0.9, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 0.8 }} />

            {/* Animated Scanning Radar Sweep */}
            <motion.line
              x1="200"
              y1="150"
              x2="200"
              y2="20"
              stroke="url(#grad-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ originX: '200px', originY: '150px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              filter="url(#neon-glow)"
            />

            {/* Draw Path for Left "4" */}
            <motion.path
              d="M 100 80 L 40 165 L 125 165"
              stroke="url(#grad-primary)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#neon-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M 100 80 L 100 220"
              stroke="url(#grad-primary)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              filter="url(#neon-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Draw Path for Right "4" */}
            <motion.path
              d="M 335 80 L 275 165 L 360 165"
              stroke="url(#grad-primary)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#neon-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.path
              d="M 335 80 L 335 220"
              stroke="url(#grad-primary)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              filter="url(#neon-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.6 }}
            />

            {/* Animated Center "0" - Glowing Planet / Portal */}
            <g>
              {/* Radial background glow */}
              <circle cx="200" cy="150" r="70" fill="url(#planet-glow)" />

              {/* Orbiting Satellite Path & Dot */}
              <motion.circle
                cx="200"
                cy="150"
                r="60"
                stroke="#475569"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                fill="none"
                style={{ originX: '200px', originY: '150px' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* Satellite Body */}
              <g style={{ originX: '200px', originY: '150px' }}>
                <motion.g
                  style={{ originX: '200px', originY: '150px' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="200" cy="90" r="6" fill="#f43f5e" filter="url(#neon-glow)" />
                  <motion.circle
                    cx="200"
                    cy="90"
                    r="12"
                    stroke="#f43f5e"
                    strokeWidth="1"
                    fill="none"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                </motion.g>
              </g>

              {/* Wireframe planet lines (Globe) */}
              <motion.circle
                cx="200"
                cy="150"
                r="40"
                fill="#0f172a"
                stroke="url(#grad-accent)"
                strokeWidth="3.5"
                filter="url(#neon-glow)"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Vertical ellipses representing rotating globes */}
              <motion.ellipse
                cx="200"
                cy="150"
                rx="25"
                ry="40"
                stroke="#e2e8f0"
                strokeWidth="1"
                fill="none"
                animate={{ rx: [25, 0, 25] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.ellipse
                cx="200"
                cy="150"
                rx="10"
                ry="40"
                stroke="#e2e8f0"
                strokeWidth="0.8"
                fill="none"
                animate={{ rx: [10, 25, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Horizontal equator */}
              <line x1="160" y1="150" x2="240" y2="150" stroke="#e2e8f0" strokeWidth="1" />

              {/* Portal Center Core */}
              <motion.circle
                cx="200"
                cy="150"
                r="8"
                fill="#ffffff"
                filter="url(#neon-glow)"
                animate={{ scale: [0.8, 1.3, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          </svg>
        </div>

        {/* Badge */}
        <GlassBadge variant="primary" className="mb-5 font-semibold">
          <Sparkles size={11} className="mr-1" />
          <span>Page Not Found</span>
        </GlassBadge>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-4 tracking-tight">
          Oops! Lost in the Digital Space
        </h1>
        <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist, has been moved, or the URL might be wrong. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
          <GlassButton
            to="/"
            variant="primary"
            className="w-full"
          >
            <Home size={15} />
            <span>Back to Home</span>
          </GlassButton>
          <GlassButton
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft size={15} />
            <span>Go Back</span>
          </GlassButton>
        </div>

        {/* Helpful quick links */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-slate-200/50 dark:border-white/5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Popular pages</p>
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
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-white border border-slate-200 dark:border-white/5 hover:border-brand-primary/45 rounded-full transition-all duration-300"
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
