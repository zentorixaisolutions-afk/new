import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BLOG_POSTS } from '@/mocks/blog';
import BlogCard from '../components/BlogCard';
import Reveal from '@/components/feature/Reveal';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' });
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');

  return (
    <div className="prose prose-sm sm:prose-base max-w-none text-foreground-700 dark:text-slate-300">
      {lines.map((line, i) => {
        if (line.startsWith('## ')) {
          return (
            <h2 key={i} className="text-xl sm:text-2xl font-bold text-navy dark:text-white mt-8 mb-4 leading-snug">
              {line.replace('## ', '')}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={i} className="text-base sm:text-lg font-bold text-navy dark:text-white mt-6 mb-3 leading-snug">
              {line.replace('### ', '')}
            </h3>
          );
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={i} className="font-semibold text-navy dark:text-white mt-4 mb-1">
              {line.replace(/\*\*/g, '')}
            </p>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <li key={i} className="ml-4 text-sm sm:text-base leading-relaxed list-disc text-foreground-600 dark:text-slate-300 mb-1">
              {formatInlineMarkdown(line.replace('- ', ''))}
            </li>
          );
        }
        if (line.startsWith('| ')) {
          // simple table row — skip for now, render as plain text
          return null;
        }
        if (line.startsWith('|---')) {
          return null;
        }
        if (line.trim() === '') {
          return <div key={i} className="h-2" />;
        }
        return (
          <p key={i} className="text-sm sm:text-base leading-relaxed text-foreground-600 dark:text-slate-300 mb-2">
            {formatInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
}

function formatInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-navy dark:text-white">{part.replace(/\*\*/g, '')}</strong>;
        }
        return part;
      })}
    </>
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <i className="ri-article-line text-5xl text-foreground-300 mb-4" />
        <h1 className="text-2xl font-bold text-navy dark:text-white mb-2">Article Not Found</h1>
        <p className="text-foreground-500 mb-6">This article does not exist or has been removed.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors whitespace-nowrap cursor-pointer"
        >
          <i className="ri-arrow-left-line" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS
    .filter((p) => p.slug !== post.slug && (p.category === post.category || BLOG_POSTS.indexOf(p) < 3))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[480px] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className="absolute top-24 sm:top-28 left-4 sm:left-8 lg:left-14 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/25 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-arrow-left-line" />
          Back to Blog
        </button>

        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 lg:left-14 right-4 sm:right-8 lg:right-14 z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold mb-3 whitespace-nowrap">
            {post.category}
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.2] text-balance max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article body */}
      <article className="">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-6 xl:px-0 py-10 sm:py-14">

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-foreground-400 mb-8 pb-8 border-b border-background-200 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center flex-shrink-0">
                <i className="ri-user-line text-accent-500 text-sm" />
              </div>
              <div>
                <div className="font-semibold text-navy dark:text-white text-xs sm:text-sm">{post.author}</div>
              </div>
            </div>
            <span className="text-foreground-200" aria-hidden>·</span>
            <span className="flex items-center gap-1.5">
              <i className="ri-calendar-line" />
              {formatDate(post.date)}
            </span>
            <span className="text-foreground-200" aria-hidden>·</span>
            <span className="flex items-center gap-1.5">
              <i className="ri-time-line" />
              {post.readTime}
            </span>

            {/* Share */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-foreground-400 text-xs hidden sm:inline">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
                aria-label="Share on WhatsApp"
              >
                <i className="ri-whatsapp-line text-sm" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
                aria-label="Share on LinkedIn"
              >
                <i className="ri-linkedin-fill text-sm" />
              </a>
            </div>
          </div>

          {/* Excerpt lead */}
          <p className="text-base sm:text-lg font-medium text-foreground-700 dark:text-slate-200 leading-relaxed mb-8 border-l-4 border-accent-500 pl-4 italic">
            {post.excerpt}
          </p>

          {/* Article content */}
          <MarkdownContent content={post.content} />
        </div>
      </article>

      {/* CTA Band */}
      <section className="py-12 sm:py-16" id="article-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <Reveal>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 text-balance">
              Need IT Support for Your Dubai Business?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Our certified team at Conquer Computers LLC has been serving businesses across Dubai and the UAE since 1997.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/971543433553?text=Hi%20Conquer%20Computers%20Team%2C%20I%20need%20IT%20support.%20Please%20contact%20me%20with%20more%20details%20and%20a%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25d366] text-white text-sm font-semibold hover:bg-[#20bd5a] transition-colors w-full sm:w-auto"
              >
                <i className="ri-whatsapp-line text-base" />
                Talk to an Expert
              </a>
              <Link
                to="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                <i className="ri-customer-service-2-line text-base" />
                Get IT Support
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 sm:py-16" id="related-posts">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
            <Reveal>
              <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-8">
                Related Articles
              </h2>
            </Reveal>
            <Reveal staggerChildren={70}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {relatedPosts.map((rPost) => (
                  <BlogCard key={rPost.slug} post={rPost} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}