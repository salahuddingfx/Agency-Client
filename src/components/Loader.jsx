import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Loader({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      // Incremental updates with random speeds for premium feel
      start += Math.floor(Math.random() * 8) + 4;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
      }
      setProgress(start);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsMounted(false);
        // Let the slide-up animation run before cleaning up
        setTimeout(finishLoading, 800);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [progress, finishLoading]);

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

            {/* Custom logo fade-in & scale animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6 relative z-10"
            >
              <Logo size={80} animated={true} />
            </motion.div>

            {/* Nextora brand and tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-2xl font-bold tracking-[0.3em] font-display text-white relative z-10"
            >
              NEXTORA
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
              className="h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-primary to-transparent my-3 relative z-10"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] text-slate-300 font-sans relative z-10"
            >
              Where Ideas Take Shape
            </motion.p>

            {/* Premium progress tracker UI */}
            <div className="w-40 h-[2px] bg-brand-slateAccent/40 rounded-full overflow-hidden mt-6 relative z-10">
              <div 
                className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent origin-left transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-brand-primary mt-2 font-medium tracking-widest relative z-10">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
