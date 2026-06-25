import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/mocks/blog';
import BlogHero from './components/BlogHero';
import BlogCard from './components/BlogCard';
import Reveal from '@/components/feature/Reveal';

export default function BlogPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featuredPost = BLOG_POSTS[0];
  const restPosts = filteredPosts.filter((p) => activeCategory !== 'All' || p.slug !== featuredPost.slug);

  return (
    <>
      <BlogHero />

      <section className="py-12 sm:py-16 lg:py-20" id="blog-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">

          {/* Featured Post — only show on All */}
          {activeCategory === 'All' && (
            <Reveal>
              <div className="mb-10 sm:mb-14">
                <div className="flex items-center gap-2 mb-5">
                  <i className="ri-star-fill text-accent-500" />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500">
                    {t('blog.featured')}
                  </span>
                </div>
                <BlogCard post={featuredPost} featured />
              </div>
            </Reveal>
          )}

          {/* Category Filter */}
          <Reveal>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-accent-500 text-white'
                      : 'glass-card rounded-full text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer transition-all duration-200 text-slate-300 hover:text-cyan-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Posts grid header */}
          <Reveal>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white">
                {activeCategory === 'All' ? t('blog.latest') : activeCategory}
              </h2>
              <span className="text-sm text-foreground-400">
                {filteredPosts.length} {t('blog.articles')}
              </span>
            </div>
          </Reveal>

          {/* Posts grid */}
          {restPosts.length > 0 ? (
            <Reveal staggerChildren={60}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {restPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </Reveal>
          ) : (
            <div className="text-center py-16 text-foreground-400">
              <i className="ri-article-line text-4xl mb-3 block" />
              <p>{t('blog.no_articles')}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20" id="blog-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-4 text-balance">
              Need IT Support for Your Dubai Business?
            </h2>
            <p className="text-foreground-500 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Our certified team at Conquer Computers LLC is ready to help. From IT AMC to CCTV, cloud, and cybersecurity — we cover everything.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/971543433553?text=Hi%20Conquer%20Computers%20Team%2C%20I%20need%20IT%20support.%20Please%20contact%20me%20with%20more%20details%20and%20a%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25d366] text-white text-sm font-semibold hover:bg-[#20bd5a] transition-colors duration-200 w-full sm:w-auto"
              >
                <i className="ri-whatsapp-line text-base" />
                Talk to an Expert
              </a>
              <a
                href="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-navy dark:bg-accent-500 text-white text-sm font-semibold hover:bg-navy/85 dark:hover:bg-accent-600 transition-colors duration-200 w-full sm:w-auto"
              >
                <i className="ri-customer-service-2-line text-base" />
                Get IT Support
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}