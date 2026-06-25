import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useScrollPosition';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  staggerChildren?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 1.25,
  y = 72,
  staggerChildren = 0,
  once = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const ctx = gsap.context(() => {
      const animProps: gsap.TweenVars = {
        opacity: 0,
        y,
        scale: 0.97,
        duration,
        delay,
        ease: 'power3.out',
      };

      if (staggerChildren > 0 && ref.current) {
        const children = ref.current.children;
        gsap.set(children, { opacity: 0, y, scale: 0.97 });

        ScrollTrigger.batch(Array.from(children), {
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration,
              stagger: staggerChildren,
              ease: 'power3.out',
              overwrite: true,
            });
          },
          onLeaveBack: (batch) => {
            gsap.to(batch, {
              opacity: 0,
              y,
              scale: 0.97,
              duration: duration * 0.6,
              stagger: staggerChildren * 0.5,
              ease: 'power3.out',
              overwrite: true,
            });
          },
          start: 'top 85%',
          ...(once ? { once: true } : {}),
        });
      } else {
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          animation: gsap.fromTo(ref.current, animProps, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: 'power3.out',
          }),
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [prefersReduced, delay, duration, y, staggerChildren, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}