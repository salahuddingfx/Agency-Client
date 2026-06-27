import { useRef, useState } from 'react';

/**
 * GlowCard — electric arch glowing border effect on hover.
 * No tilt, just a sleek animated neon border that follows the cursor.
 */
export default function GlowCard({ children, className = '', glowColor = '#18B7F5', ...props }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
      {...props}
    >
      {/* Electric glow border layer */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}40, ${glowColor}10, transparent 70%)`,
        }}
      />

      {/* Electric arch edge */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${glowColor}60 10%, transparent 20%, transparent 80%, ${glowColor}60 90%, transparent 100%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          borderRadius: 'inherit',
        }}
      />

      {/* Outer glow pulse */}
      <div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none z-0 blur-md"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}30, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
