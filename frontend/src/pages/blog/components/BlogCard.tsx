import { Link } from 'react-router-dom';
import type { BlogPost } from '@/mocks/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group glass-card overflow-hidden flex flex-col lg:flex-row cursor-pointer p-0"
      >
        <div className="relative w-full lg:w-[55%] h-48 sm:h-64 lg:h-auto overflow-hidden flex-shrink-0">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:to-black/30" />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold whitespace-nowrap">
            {post.category}
          </span>
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-navy dark:text-white text-xs font-medium whitespace-nowrap">
            Featured
          </span>
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-8 flex-1 min-w-0">
          <div className="flex items-center gap-3 text-xs text-foreground-400 mb-3 flex-wrap">
            <span className="flex items-center gap-1">
              <i className="ri-calendar-line" />
              {formatDate(post.date)}
            </span>
            <span className="text-foreground-300" aria-hidden>·</span>
            <span className="flex items-center gap-1">
              <i className="ri-time-line" />
              {post.readTime}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy dark:text-white mb-3 leading-snug text-balance group-hover:text-accent-600 transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-sm text-foreground-500 leading-relaxed mb-5 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center flex-shrink-0">
                <i className="ri-user-line text-accent-500 text-sm" />
              </div>
              <div>
                <div className="text-xs font-semibold text-navy dark:text-white">{post.author}</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-500 group-hover:gap-2.5 transition-all duration-200 whitespace-nowrap">
              Read More
              <i className="ri-arrow-right-line" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group glass-card overflow-hidden flex flex-col min-w-0 cursor-pointer p-0"
    >
      <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold whitespace-nowrap">
          {post.category}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center gap-3 text-xs text-foreground-400 mb-2.5 flex-wrap">
          <span className="flex items-center gap-1">
            <i className="ri-calendar-line" />
            {formatDate(post.date)}
          </span>
          <span className="text-foreground-300" aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <i className="ri-time-line" />
            {post.readTime}
          </span>
        </div>
        <h3 className="font-bold text-sm sm:text-base text-navy dark:text-white mb-2 leading-snug text-balance group-hover:text-accent-600 transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm text-foreground-500 leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center flex-shrink-0">
              <i className="ri-user-line text-accent-500 text-xs" />
            </div>
            <span className="text-xs font-medium text-foreground-600 dark:text-slate-400">{post.author}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-500 group-hover:gap-1.5 transition-all duration-200 whitespace-nowrap">
            Read More
            <i className="ri-arrow-right-line text-xs" />
          </span>
        </div>
      </div>
    </Link>
  );
}