import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';

export default function TrustStats() {
  const { t } = useTranslation();
  const stats = [
    { value: '27+', label: t('home.stats.years') },
    { value: '500+', label: t('home.stats.clients') },
    { value: '5K+', label: t('home.stats.devices') },
    { value: '99.9%', label: t('home.stats.uptime') },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-20 overflow-hidden relative" id="trust-stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal staggerChildren={60}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center min-w-0 glass-card p-4 sm:p-6 hover:border-[rgba(0,220,255,0.38)] transition-all duration-400">
                <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1.5 sm:mb-2 tracking-tight">{stat.value}</div>
                <div className="text-xs sm:text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}