import React from 'react';

/**
 * GlassCard - A premium card component leveraging Apple's Liquid Glass style.
 * Supports smooth lift transitions, reflection highlights, and glowing borders.
 */
export default function GlassCard({
  children,
  className = '',
  hoverEffect = 'lift', // 'lift' | 'scale' | 'none'
  onClick,
  ...props
}) {
  const hoverClasses = {
    lift: 'hover:-translate-y-1.5 hover:shadow-premium hover:border-brand-primary/35',
    scale: 'hover:scale-[1.02] hover:border-brand-primary/35',
    none: ''
  }[hoverEffect];

  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500 ${
        onClick ? 'cursor-pointer' : ''
      } ${hoverClasses} ${className}`}
      {...props}
    >
      {/* Light Reflection diagonal sheens */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none" />
      <div className="absolute -top-[150%] -left-[150%] w-[300%] h-[300%] bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent rotate-45 transition-transform duration-1000 group-hover:translate-x-[50%] group-hover:translate-y-[50%] pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
