import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';

const techCategories = [
  {
    key: 'frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Angular', 'Tailwind CSS', 'Redux', 'GraphQL'],
  },
  {
    key: 'backend',
    items: ['Node.js', 'Python', 'Java', 'Go', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    key: 'cloud',
    items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Vercel', 'Cloudflare'],
  },
  {
    key: 'ai_data',
    items: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'Hugging Face', 'Apache Spark', 'Pandas', 'MLflow'],
  },
  {
    key: 'devops',
    items: ['GitHub Actions', 'Jenkins', 'Prometheus', 'Grafana', 'SonarQube', 'OWASP', 'SIEM', 'Nginx'],
  },
  {
    key: 'mobile',
    items: ['React Native', 'Flutter', 'iOS Swift', 'Android Kotlin', 'Expo', 'Capacitor', 'Firebase', 'Fastlane'],
  },
];

export default function TechnologiesWeWorkWith() {
  const { t } = useTranslation();

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="technologies">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal y={48} duration={1.1}>
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('about.tech.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 dark:text-white leading-[1.15] mb-4 text-balance">{t('about.tech.title')}</h2>
            <p className="text-foreground-500 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">{t('about.tech.subtitle')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} staggerChildren={100} duration={1.1} y={48}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {techCategories.map((cat, ci) => (
              <div
                key={ci}
                className="glass-card p-5 sm:p-6"
              >
                <h3 className="font-semibold text-sm md:text-base text-foreground-950 dark:text-white mb-4 pb-3 border-b border-background-200/70 dark:border-slate-700/50">
                  {t(`about.tech.${cat.key}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, ii) => (
                    <span
                      key={ii}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 border border-accent-100 dark:border-accent-800/30 hover:bg-accent-100 dark:hover:bg-accent-800/30 hover:text-accent-800 dark:hover:text-accent-200 transition-colors duration-200 cursor-default whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}