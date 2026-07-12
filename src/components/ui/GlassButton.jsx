import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassButton - A highly polished button leveraging Apple's Liquid Glass style.
 * Supports scale transitions, glow on hover, and magnetic-style responsiveness.
 */
export default function GlassButton({
  children,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'glass' | 'outline'
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold text-xs sm:text-sm rounded-xl px-5 py-3 transition-all duration-300 select-none outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white shadow-premium hover:shadow-glow hover:-translate-y-0.5 border border-white/10 relative overflow-hidden',
    secondary: 'bg-brand-slateAccent/20 hover:bg-brand-slateAccent/40 border border-brand-slateAccent text-slate-800 dark:text-white',
    ghost: 'bg-transparent text-slate-800 dark:text-slate-200 hover:bg-slate-100/30 dark:hover:bg-white/5',
    glass: 'glass-card border-white/20 text-slate-800 dark:text-white hover:bg-white/20 dark:hover:bg-white/10 hover:border-brand-primary/30',
    outline: 'border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-200 hover:border-brand-primary/50 hover:bg-brand-primary/5'
  }[variant];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
