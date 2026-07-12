import React from 'react';

/**
 * GlassBadge - A premium badge with backdrop blur and customizable variants.
 */
export default function GlassBadge({
  children,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'glow'
  ...props
}) {
  const variantClasses = {
    primary: 'border-brand-primary/20 bg-brand-primary/10 text-brand-primary',
    secondary: 'border-brand-slateAccent/40 bg-brand-slateAccent/20 text-slate-500 dark:text-slate-400',
    accent: 'border-brand-accent/20 bg-brand-accent/10 text-brand-accent',
    glow: 'border-brand-primary/30 bg-brand-primary/5 text-brand-primary animate-pulse-subtle shadow-glow'
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-md ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
