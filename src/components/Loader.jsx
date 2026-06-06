import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(false);
      // Let the slide-up animation run before cleaning up
      setTimeout(finishLoading, 800);
    }, 2800);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-darker text-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Ambient Background Glow behind loader */}
            <div className="absolute -inset-10 bg-brand-primary/10 rounded-full blur-3xl opacity-50" />

            {/* Custom SVG logo draw path animation */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-6 relative z-10"
            >
              {/* Outer hexagonal border outline */}
              <motion.polygon
                points="50,15 85,35 85,75 50,95 15,75 15,35"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />

              {/* The intersecting stylized 'N' */}
              <motion.path
                d="M32 68 L32 32 L50 56 L68 32 L68 68"
                stroke="url(#loader-grad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 1.5, ease: "easeInOut" }}
              />

              <defs>
                <linearGradient id="loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#18B7F5" />
                  <stop offset="50%" stopColor="#1F8EF1" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nextora brand and tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-2xl font-bold tracking-[0.3em] font-display text-white relative z-10"
            >
              NEXTORA
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.3, duration: 0.6, ease: "easeInOut" }}
              className="h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-primary to-transparent my-3 relative z-10"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] text-slate-300 font-sans relative z-10"
            >
              Where Ideas Take Shape
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
