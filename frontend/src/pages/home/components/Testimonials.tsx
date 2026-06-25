import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = [
    { quote: t('testimonial.1.quote'), author: t('testimonial.1.author'), role: t('testimonial.1.role') },
    { quote: t('testimonial.2.quote'), author: t('testimonial.2.author'), role: t('testimonial.2.role') },
    { quote: t('testimonial.3.quote'), author: t('testimonial.3.author'), role: t('testimonial.3.role') },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden relative" id="testimonials">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16 mb-10 md:mb-16 lg:mb-20 relative z-10">
        <Reveal>
          <div className="text-center">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('home.testimonials.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white leading-[1.15] mb-4 text-balance">{t('home.testimonials.title')}</h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed text-pretty">{t('home.testimonials.subtitle')}</p>
          </div>
        </Reveal>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16 relative z-10">
        <Reveal staggerChildren={80}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((tm, i) => (
              <div key={i} className="glass-card p-5 sm:p-6 md:p-7 min-w-0 hover:border-[rgba(0,220,255,0.38)] transition-all duration-400">
                <div className="flex gap-0.5 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, s) => (<i key={s} className="ri-star-fill text-sm sm:text-base text-amber-400" />))}
                </div>
                <p className="text-sm sm:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-5">&ldquo;{tm.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-sm text-white">{tm.author}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{tm.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}