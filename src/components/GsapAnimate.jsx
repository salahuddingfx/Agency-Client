import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function GsapFadeIn({
  children,
  duration = 0.8,
  delay = 0,
  direction = 'up',
  distance = 30,
  className = "",
  start = 'top 85%',
  once = true,
  ...props
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let xVal = 0;
    let yVal = 0;

    switch (direction) {
      case 'up':
        yVal = distance;
        break;
      case 'down':
        yVal = -distance;
        break;
      case 'left':
        xVal = distance;
        break;
      case 'right':
        xVal = -distance;
        break;
      default:
        break;
    }

    const anim = gsap.fromTo(
      el,
      { opacity: 0, x: xVal, y: yVal },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: start,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      }
    );

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, [direction, distance, duration, delay, start, once]);

  return (
    <div ref={elementRef} className={className} {...props}>
      {children}
    </div>
  );
}
