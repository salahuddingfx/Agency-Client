import React, { useCallback } from 'react';

/**
 * GlassCard — Premium Apple Liquid Crystal Glass card component.
 * Features:
 *  - Specular reflective glass surface with backdrop blur & saturation
 *  - Real-time cursor-tracking radial spotlight glow (via CSS custom props)
 *  - requestAnimationFrame-throttled mouse tracking for smooth 60fps perf
 *  - React.memo to prevent re-renders when parent state is unrelated
 */
function GlassCard({
  children,
  className = '',
  hoverEffect = 'lift', // 'lift' | 'scale' | 'none'
  onClick,
  ...props
}) {
  const hoverClasses = {
    lift: 'hover:-translate-y-1.5',
    scale: 'hover:scale-[1.015]',
    none: '',
  }[hoverEffect] ?? '';

  // Throttle mouse tracking to requestAnimationFrame to avoid 100+ calls/sec
  const rafRef = React.useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return; // Already scheduled
    rafRef.current = requestAnimationFrame(() => {
      const rect = e.currentTarget?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
      }
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500 ${
        onClick ? 'cursor-pointer' : ''
      } ${hoverClasses} ${className}`}
      {...props}
    >
      {/* Specular glass top-edge highlight reflection layer */}
      <div className="glass-shine" />

      {/* Diagonal sheen overlay (static — for depth illusion) */}
      <div className="absolute -top-[150%] -left-[150%] w-[300%] h-[300%] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent rotate-45 pointer-events-none" />

      {/* Content wrapper — sits above all decorative layers */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default React.memo(GlassCard);
