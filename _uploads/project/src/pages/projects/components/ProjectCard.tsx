import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();
  const detailPath = `/projects/${project.slug}`;

  return (
    <Link
      to={detailPath}
      className="group glass-card overflow-hidden flex flex-col min-w-0 cursor-pointer p-0"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={project.thumbnail_url || 'https://readdy.ai/api/search-image?query=Modern%20technology%20abstract%20background%20with%20soft%20geometric%20shapes%20in%20teal%20and%20white%20tones%20clean%20minimalist%20tech%20aesthetic%20professional%20corporate%20style%20high%20detail%20editorial%20photography&width=900&height=550&seq=placeholder-proj&orientation=landscape'}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Category badge */}
        {project.category && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-xs font-medium text-navy dark:text-white whitespace-nowrap">
              {project.category.name}
            </span>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <span className="px-2 py-0.5 rounded-full bg-accent-500 text-white text-[10px] font-semibold whitespace-nowrap">
              Featured
            </span>
          </div>
        )}

        {/* Metric badge */}
        {project.metric && (
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-none">
                {project.metric}
              </span>
              {project.metric_label && (
                <span className="text-xs text-white/80 font-medium whitespace-nowrap">
                  {project.metric_label}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
        {/* Client + Year */}
        {(project.client || project.project_year) && (
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {project.client && (
              <span className="text-xs text-foreground-400 font-medium">{project.client}</span>
            )}
            {project.client && project.project_year && (
              <span className="text-foreground-300">|</span>
            )}
            {project.project_year && (
              <span className="text-xs text-foreground-400 font-medium">{project.project_year}</span>
            )}
          </div>
        )}

        <h3 className="font-semibold text-sm sm:text-base text-navy dark:text-white mb-2 leading-snug group-hover:text-accent-600 transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-foreground-500 leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.short_description}
        </p>

        {/* Tags */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-background-100 text-xs font-medium text-foreground-500 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 rounded-full bg-background-100 text-xs font-medium text-foreground-400 whitespace-nowrap">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-500 group-hover:gap-2 transition-all duration-200 whitespace-nowrap">
            {t('projects.card.view_details')}
            <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}