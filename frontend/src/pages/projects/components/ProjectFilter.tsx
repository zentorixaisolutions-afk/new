import { useTranslation } from 'react-i18next';
import type { ProjectCategory } from '@/lib/types';

interface ProjectFilterProps {
  categories: ProjectCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProjectFilter({ categories, activeCategory, onCategoryChange }: ProjectFilterProps) {
  const { t } = useTranslation();

  const allCategories = [
    { key: 'All', label: t('projects.filter.all') },
    ...categories.map((c) => ({ key: c.name, label: c.name })),
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {allCategories.map(({ key, label }) => {
        const isActive = key === activeCategory;
        return (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`whitespace-nowrap cursor-pointer px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-accent-500 text-white'
                : 'bg-background-100 dark:bg-transparent dark:border dark:border-[rgba(0,200,255,0.12)] text-foreground-600 dark:text-slate-300 hover:bg-background-200 dark:hover:bg-[rgba(0,200,255,0.08)] dark:hover:text-white hover:text-foreground-800'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}