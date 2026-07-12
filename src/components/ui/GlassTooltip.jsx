import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GlassTooltip - Reusable tooltips with smooth delay reveals and glass card layout.
 */
export default function GlassTooltip({
  content,
  children,
  position = 'top', // 'top' | 'bottom' | 'left' | 'right'
  className = '',
  ...props
}) {
  const [active, setActive] = useState(false);

  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }[position];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      {...props}
    >
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${posClasses} z-40 px-3 py-1.5 text-[10px] sm:text-xs text-white rounded-md shadow-lg glass-card border border-white/20 dark:border-white/10 select-none pointer-events-none whitespace-nowrap ${className}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
