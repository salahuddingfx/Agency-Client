import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const SHAPES = [
  { type: 'circle', size: 60, x: '10%', y: '20%', delay: 0, duration: 12, color: 'rgba(24,183,245,0.08)' },
  { type: 'square', size: 40, x: '80%', y: '15%', delay: 1, duration: 15, color: 'rgba(37,99,235,0.06)' },
  { type: 'circle', size: 30, x: '70%', y: '70%', delay: 2, duration: 10, color: 'rgba(31,142,241,0.07)' },
  { type: 'square', size: 50, x: '15%', y: '75%', delay: 0.5, duration: 14, color: 'rgba(24,183,245,0.06)' },
  { type: 'circle', size: 20, x: '50%', y: '10%', delay: 3, duration: 11, color: 'rgba(37,99,235,0.05)' },
  { type: 'square', size: 35, x: '90%', y: '50%', delay: 1.5, duration: 13, color: 'rgba(31,142,241,0.06)' },
  { type: 'circle', size: 45, x: '30%', y: '85%', delay: 2.5, duration: 16, color: 'rgba(24,183,245,0.05)' },
  { type: 'diamond', size: 25, x: '60%', y: '30%', delay: 0.8, duration: 12, color: 'rgba(37,99,235,0.07)' },
];

function Shape({ type, size, x, y, delay, duration, color }) {
  const style = {
    position: 'absolute',
    left: x,
    top: y,
    width: size,
    height: size,
    background: color,
    borderRadius: type === 'circle' ? '50%' : type === 'diamond' ? '4px' : '6px',
    transform: type === 'diamond' ? 'rotate(45deg)' : 'none',
  };

  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.6, 1, 0],
        scale: [0, 1.2, 0.9, 1.1, 0],
        y: [0, -30, 15, -20, 0],
        x: [0, 15, -10, 20, 0],
        rotate: type !== 'circle' ? [0, 90, 180, 270, 360] : [0, 0, 0, 0, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function Loader({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 12) + 12; // Increases faster for snappier experience
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
      }
      setProgress(start);
    }, 35); // 35ms interval instead of 80ms
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsMounted(false);
        setTimeout(finishLoading, 400); // Reduced delay from 800ms
      }, 200); // Reduced delay from 450ms
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
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }, // Faster animation transition duration
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-darker text-white overflow-hidden"
        >
          {/* Animated Shape Background */}
          <div className="absolute inset-0 overflow-hidden">
            {SHAPES.map((shape, i) => (
              <Shape key={i} {...shape} />
            ))}
          </div>

          {/* Ambient glow */}
          <div className="absolute -inset-20 bg-brand-primary/8 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative flex flex-col items-center z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-6"
            >
              <Logo size={80} animated={true} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-2xl font-bold tracking-[0.3em] font-display text-white"
            >
              NEXTORA
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: 'easeInOut' }}
              className="h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-primary to-transparent my-3"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-[10px] uppercase tracking-[0.4em] text-slate-300 font-sans"
            >
              Where Ideas Take Shape
            </motion.p>

            {/* Progress bar */}
            <div className="w-40 h-[2px] bg-brand-slateAccent/40 rounded-full overflow-hidden mt-6">
              <div
                className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent origin-left transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-brand-primary mt-2 font-medium tracking-widest">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
