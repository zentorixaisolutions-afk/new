import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import ProjectsHero from './components/ProjectsHero';
import ProjectFilter from './components/ProjectFilter';
import ProjectCard from './components/ProjectCard';
import { getProjects, getProjectCategories } from '@/lib/projectsApi';
import { MOCK_PROJECTS, MOCK_CATEGORIES } from '@/mocks/projects';
import type { Project, ProjectCategory } from '@/lib/types';

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const [fetchedProjects, fetchedCategories] = await Promise.all([
          getProjects(true),
          getProjectCategories(),
        ]);
        if (cancelled) return;
        if (fetchedProjects.length > 0) {
          setProjects(fetchedProjects);
        } else {
          setProjects(MOCK_PROJECTS);
        }
        if (fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
        } else {
          setCategories(MOCK_CATEGORIES);
        }
      } catch {
        setProjects(MOCK_PROJECTS);
        setCategories(MOCK_CATEGORIES);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => {
          const catSlug = p.category?.slug || '';
          const matched = categories.find((c) => c.name === activeCategory || c.slug === activeCategory);
          return matched ? catSlug === matched.slug : p.category?.name === activeCategory;
        });

  if (loading) {
    return (
      <>
        <ProjectsHero />
        <section className="py-14 sm:py-20 lg:py-28" id="projects-grid">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card overflow-hidden animate-pulse p-0">
                  <div className="h-44 sm:h-56 bg-[rgba(0,200,255,0.06)]" />
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="h-3 bg-[rgba(0,200,255,0.08)] rounded w-24" />
                    <div className="h-4 bg-[rgba(0,200,255,0.1)] rounded w-3/4" />
                    <div className="h-3 bg-[rgba(0,200,255,0.06)] rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <ProjectsHero />

      <section className="py-14 sm:py-20 lg:py-28" id="projects-grid">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <ProjectFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <p className="text-xs sm:text-sm text-foreground-400 mt-6">
                {t('projects.showing')} {filteredProjects.length} {t('projects.of')} {projects.length} {t('projects.projects')}
              </p>
            </div>
          </Reveal>

          <Reveal staggerChildren={60}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Reveal>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-sm text-foreground-400">{t('projects.no_projects')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-14 sm:py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16">
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {[
                { value: '200+', label: t('projects.stats.delivered') },
                { value: '50+', label: t('projects.stats.clients') },
                { value: '12', label: t('projects.stats.countries') },
                { value: '99.9%', label: t('projects.stats.uptime') },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-500 leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-foreground-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}