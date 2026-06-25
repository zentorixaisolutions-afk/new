import Reveal from '@/components/feature/Reveal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const FEATURED = [
    { title: t('project.finflow.title'), category: t('project.finflow.cat'), description: t('project.finflow.desc'), image: 'https://readdy.ai/api/search-image?query=Modern%20dark%20fintech%20dashboard%20interface%20with%20glowing%20blue%20charts%20and%20glassmorphism%20UI%20elements%20on%20sleek%20monitor%20in%20dark%20ambient%20tech%20environment%20professional%20editorial%20photography%20high%20detail%20deep%20navy%20background&width=800&height=500&seq=project-finflow&orientation=landscape', tags: ['React', 'Node.js', 'AWS', 'PostgreSQL'] },
    { title: t('project.meditrack.title'), category: t('project.meditrack.cat'), description: t('project.meditrack.desc'), image: 'https://readdy.ai/api/search-image?query=Dark%20healthcare%20logistics%20dashboard%20with%20glowing%20cyan%20supply%20chain%20maps%20and%20tracking%20data%20on%20modern%20monitor%20minimalist%20dark%20medical%20aesthetic%20soft%20tech%20lighting%20professional%20photography&width=800&height=500&seq=project-meditrack&orientation=landscape', tags: ['Angular', 'Python', 'GCP', 'MongoDB'] },
    { title: t('project.retailiq.title'), category: t('project.retailiq.cat'), description: t('project.retailiq.desc'), image: 'https://readdy.ai/api/search-image?query=Dark%20retail%20inventory%20management%20interface%20on%20tablet%20screen%20with%20glowing%20blue%20analytics%20charts%20dark%20modern%20workspace%20setting%20editorial%20product%20photography%20premium%20tech%20aesthetic&width=800&height=500&seq=project-retailiq&orientation=landscape', tags: ['Next.js', 'TensorFlow', 'Azure', 'Redis'] },
  ];
  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-x-hidden relative" id="featured-projects">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16 relative z-10">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-16 lg:mb-20 gap-4">
            <div>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('home.projects.eyebrow')}</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white leading-[1.15] text-balance">{t('home.projects.title')}</h2>
            </div>
            <Link to="/projects" className="whitespace-nowrap cursor-pointer inline-flex items-center text-sm font-medium text-accent-500 hover:text-cyan-300 transition-colors">
              {t('home.projects.view_all')}
              <i className="ri-arrow-right-line ml-1.5" />
            </Link>
          </div>
        </Reveal>
        <Reveal staggerChildren={80}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {FEATURED.map((project, i) => (
              <Link key={i} to="/projects" className="group glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col min-w-0 p-0 hover:border-[rgba(0,220,255,0.38)]">
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,18,38,0.8)] to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[rgba(0,200,255,0.15)] backdrop-blur-sm text-xs font-medium text-cyan-300 whitespace-nowrap border border-[rgba(0,200,255,0.2)]">{project.category}</span>
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm md:text-base text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-[rgba(0,200,255,0.08)] text-xs font-medium text-cyan-300/80 whitespace-nowrap border border-[rgba(0,200,255,0.12)]">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}