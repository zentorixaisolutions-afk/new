import Reveal from '@/components/feature/Reveal';
import { VISION_MISSION } from '@/mocks/company-profile';
import { ICON_EYE, ICON_ROCKET, ICON_GLOBE, ICON_HANDSHAKE, ICON_LIGHTBULB, ICON_SHIELD } from '@/mocks/icons';

const GOAL_ICONS: Record<string, string> = {
  'ri-global-line': ICON_GLOBE,
  'ri-team-line': ICON_HANDSHAKE,
  'ri-lightbulb-line': ICON_LIGHTBULB,
  'ri-shield-check-line': ICON_SHIELD,
};

export default function MissionVision() {
  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="mission">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal>
          <div className="mb-10 md:mb-16">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">
              {VISION_MISSION.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-navy dark:text-white leading-[1.15] text-balance">
              {VISION_MISSION.title}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 md:mb-16">
          <Reveal delay={0}>
            <div className="relative glass-card p-6 sm:p-8 h-full group cursor-default">
              <img src={ICON_EYE} alt="Vision" className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-4 group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-navy dark:text-white mb-3">Our Vision</h3>
              <p className="text-xs sm:text-sm text-foreground-500 dark:text-slate-300 leading-relaxed">
                {VISION_MISSION.vision}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative glass-card p-6 sm:p-8 h-full group cursor-default">
              <img src={ICON_ROCKET} alt="Mission" className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-4 group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-navy dark:text-white mb-3">Our Mission</h3>
              <p className="text-xs sm:text-sm text-foreground-500 dark:text-slate-300 leading-relaxed">
                {VISION_MISSION.mission}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal staggerChildren={80}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {VISION_MISSION.goals.map((goal, i) => {
              const iconSrc = GOAL_ICONS[goal.icon];
              return (
                <div
                  key={i}
                  className="glass-card p-5 sm:p-6 text-center min-w-0 group cursor-default"
                >
                  {iconSrc && <img src={iconSrc} alt={goal.label} className="w-10 h-10 sm:w-12 sm:h-12 object-contain mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" loading="lazy" />}
                  <h4 className="font-semibold text-xs sm:text-sm text-navy dark:text-white mb-1.5">{goal.label}</h4>
                  <p className="text-xs text-foreground-500 dark:text-slate-300 leading-relaxed">{goal.value}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}