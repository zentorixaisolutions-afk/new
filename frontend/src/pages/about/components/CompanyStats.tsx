import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';

function useCountUp(end: number, duration: number, shouldStart: boolean, startDelay: number): number {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const started = useRef(false);

  useEffect(() => {
    if (!shouldStart || started.current) return;
    const timeout = setTimeout(() => {
      started.current = true;
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.min(Math.floor(eased * (end + 1)), end));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      frameRef.current = requestAnimationFrame(animate);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, shouldStart, startDelay]);

  return count;
}

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  staggerDelay: number;
}

function StatCard({ value, suffix, label, staggerDelay }: StatCardProps) {
  const [visible, setVisible] = useState(false);
  const firedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 1.6, visible, staggerDelay);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative glass-card p-5 sm:p-6 md:p-7 text-center group cursor-default"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-500 mb-1 tabular-nums tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-foreground-500 dark:text-slate-400 leading-tight">{label}</div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-accent-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default function CompanyStats() {
  const { t } = useTranslation();

  const stats = [
    { value: 150, suffix: '+', label: t('about.stats.projects') },
    { value: 120, suffix: '+', label: t('about.stats.clients') },
    { value: 10, suffix: '+', label: t('about.stats.engineers') },
    { value: 12, suffix: '', label: t('about.stats.countries') },
    { value: 98, suffix: '%', label: t('about.stats.satisfaction') },
    { value: 200, suffix: '+', label: t('about.stats.solutions') },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal y={48} duration={1.1}>
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('about.stats.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 dark:text-white leading-[1.15] mb-4 text-balance">{t('about.stats.title')}</h2>
            <p className="text-foreground-500 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">{t('about.stats.subtitle')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} staggerChildren={100} duration={1.1} y={48}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {stats.map((stat, i) => (
              <StatCard key={i} value={stat.value} suffix={stat.suffix} label={stat.label} staggerDelay={i * 120} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.6} duration={1} y={32}>
          <div className="mt-10 md:mt-14 text-center">
            <p className="text-sm text-foreground-400 dark:text-slate-500 italic">
              Every number represents a client who trusted us with their vision — and the solution we built together.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}