import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function AnimatedWaves() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize to fill parent container
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Dynamic wave settings for smooth overlapping bezier curvature
    const waves = [
      {
        y: 0.65, // vertical baseline fraction
        length: 0.003, // horizontal frequency
        amplitude: 55, // height of curves
        speed: 0.005, // step size per frame
        phase: 0,
        color1: theme === 'dark' ? 'rgba(24, 183, 245, 0.12)' : 'rgba(24, 183, 245, 0.15)', // sky blue
        color2: theme === 'dark' ? 'rgba(37, 99, 235, 0.04)' : 'rgba(37, 99, 235, 0.06)', // cobalt blue
      },
      {
        y: 0.72,
        length: 0.002,
        amplitude: 70,
        speed: -0.004,
        phase: 1.5,
        color1: theme === 'dark' ? 'rgba(31, 142, 241, 0.08)' : 'rgba(31, 142, 241, 0.1)', // royal blue
        color2: theme === 'dark' ? 'rgba(124, 58, 237, 0.03)' : 'rgba(124, 58, 237, 0.05)', // purple
      },
      {
        y: 0.58,
        length: 0.005,
        amplitude: 40,
        speed: 0.007,
        phase: 3.0,
        color1: theme === 'dark' ? 'rgba(24, 183, 245, 0.06)' : 'rgba(24, 183, 245, 0.08)',
        color2: theme === 'dark' ? 'rgba(31, 142, 241, 0.02)' : 'rgba(31, 142, 241, 0.04)',
      }
    ];

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Draw overlapping curves across coordinates
        for (let x = 0; x <= canvas.width; x++) {
          const y = canvas.height * wave.y + Math.sin(x * wave.length + wave.phase) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, wave.color1);
        grad.addColorStop(1, wave.color2);

        ctx.fillStyle = grad;
        ctx.fill();

        wave.phase += wave.speed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
