import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none -z-10 w-[360px] h-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-primary/15 via-brand-secondary/10 to-brand-accent/15 blur-[90px] transition-[left,top] duration-500 ease-out hidden lg:block opacity-60 dark:opacity-75"
    />
  );
}
