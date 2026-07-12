import { useRef, useCallback } from 'react';

/**
 * GlowCard — electric arch glowing border effect that follows the cursor.
 * Tracks cursor position and color settings via high-performance CSS custom variables.
 * Leverages native hardware-accelerated CSS transition curves for 60fps responsiveness.
 */
export default function GlowCard({ children, className = '', glowColor = '#18B7F5', ...props }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  // Helper to safely parse color coordinates into standard RGB format for custom CSS variables
  const getRgbComponents = (colorString) => {
    if (!colorString) return '24, 183, 245'; // default primary
    if (colorString.startsWith('rgb')) {
      const match = colorString.match(/\d+/g);
      return match ? match.slice(0, 3).join(', ') : '24, 183, 245';
    }
    // Parse hex values (expand shorthand if needed)
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = colorString.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '24, 183, 245';
  };

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
      }
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--glow-x', '-9999px');
      card.style.setProperty('--glow-y', '-9999px');
      card.style.setProperty('--glow-opacity', '0');
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--glow-opacity', '1');
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glow-card relative group ${className}`}
      style={{
        '--glow-x': '-9999px',
        '--glow-y': '-9999px',
        '--glow-opacity': '0',
        '--glow-color-rgb': getRgbComponents(glowColor),
      }}
      {...props}
    >
      {/* Electric glow border background */}
      <div className="glow-card-glow" style={{ opacity: 'var(--glow-opacity)' }} />

      {/* Electric arch border line */}
      <div className="glow-card-arch" style={{ opacity: 'var(--glow-opacity)' }} />

      {/* Ambient shadow pulse layer */}
      <div className="glow-card-pulse" style={{ opacity: 'calc(var(--glow-opacity) * 0.6)' }} />

      {/* Card contents wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
