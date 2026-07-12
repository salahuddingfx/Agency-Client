import React from 'react';

/**
 * GlassCard - A premium card component leveraging Apple's Liquid Glass style.
 * Supports smooth lift transitions, reflection highlights, and mouse-tracking hover glows.
 */
export default function GlassCard({
  children,
  className = '',
  hoverEffect = 'lift', // 'lift' | 'scale' | 'none'
  onClick,
  ...props
}) {
  const hoverClasses = {
    lift: 'hover:-translate-y-1.5',
    scale: 'hover:scale-[1.015]',
    none: ''
  }[hoverEffect];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500 ${
        onClick ? 'cursor-pointer' : ''
      } ${hoverClasses} ${className}`}
      {...props}
    >
      {/* Specular glass reflection layer */}
      <div className="glass-shine" />

      <div className="absolute -top-[150%] -left-[150%] w-[300%] h-[300%] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent rotate-45 transition-transform duration-1000 group-hover:translate-x-[50%] group-hover:translate-y-[50%] pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
