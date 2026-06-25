import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Play, Check, X, Copy, Monitor, User, Key, Info, Maximize2, Star } from 'lucide-react';
import { getProjectBySlug } from '@/lib/projectsApi';
import { MOCK_PROJECTS } from '@/mocks/projects';
import ImageLightbox from '@/components/feature/ImageLightbox';
import type { Project } from '@/lib/types';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }
    let cancelled = false;
    const fetchProject = async () => {
      try {
        const data = await getProjectBySlug(slug);
        if (cancelled) return;
        if (data) {
          setProject(data);
        } else {
          const fallback = MOCK_PROJECTS.find((p) => p.slug === slug);
          if (fallback) setProject(fallback);
          else setNotFound(true);
        }
      } catch {
        const fallback = MOCK_PROJECTS.find((p) => p.slug === slug);
        if (fallback) setProject(fallback);
        else setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
    return () => { cancelled = true; };
  }, [slug]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const lightboxPrev = useCallback(() => {
    if (!project) return;
    const gallery = sortedGallery;
    setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  }, [project]);

  const lightboxNext = useCallback(() => {
    if (!project) return;
    const gallery = sortedGallery;
    setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  }, [project]);

  const hasDemoAccess =
    project?.demo_url ||
    project?.demo_username ||
    project?.demo_password ||
    project?.admin_username ||
    project?.admin_password;

  // Sort gallery: cover image first, then by sort_order, then original order
  const sortedGallery = useMemo(() => {
    if (!project) return [];
    const images = (project.gallery_images || []).filter((img) => img.type !== 'video');
    return [...images].sort((a, b) => {
      if (a.is_cover && !b.is_cover) return -1;
      if (!a.is_cover && b.is_cover) return 1;
      const soA = a.sort_order ?? 0;
      const soB = b.sort_order ?? 0;
      return soA - soB;
    });
  }, [project]);

  const hasGallery = sortedGallery.length > 0;
  const hasVideos = (project?.videos?.length || 0) > 0;

  // Safe clamp active gallery index
  useEffect(() => {
    if (hasGallery && activeGalleryIndex >= sortedGallery.length) {
      setActiveGalleryIndex(0);
    }
  }, [sortedGallery, activeGalleryIndex, hasGallery]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="w-10 h-10 rounded-full border-2 border-accent-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-sm text-foreground-500">Loading project...</p>
        </div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-background-200 flex items-center justify-center mx-auto mb-4">
            <X className="w-7 h-7 text-foreground-400" />
          </div>
          <h1 className="text-xl font-semibold text-navy mb-2">Project Not Found</h1>
          <p className="text-sm text-foreground-500 mb-6">The project you are looking for does not exist or has been removed.</p>
          <Link to="/projects" className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Hero */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-end bg-[#0a1628]">
        {project.thumbnail_url && (
          <>
            <img src={project.thumbnail_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-[#0a1628]/40" />
          </>
        )}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 pb-10 sm:pb-14 pt-24">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-4 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {project.category && (
              <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white whitespace-nowrap">
                {project.category.name}
              </span>
            )}
            {project.project_year && (
              <span className="text-sm text-white/60">{project.project_year}</span>
            )}
            {project.featured && (
              <span className="px-2 py-0.5 rounded-full bg-accent-500 text-white text-[10px] font-semibold">Featured</span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
            {project.title}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="glass-card p-5 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Project Overview</h2>
              <p className="text-sm sm:text-base text-foreground-500 leading-relaxed whitespace-pre-line">
                {project.full_description}
              </p>
            </div>

            {/* Gallery */}
            {hasGallery && (
              <div className="glass-card p-5 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Project Gallery</h2>
                  <span className="text-xs text-foreground-400">{sortedGallery.length} screenshot{sortedGallery.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Main preview */}
                <div
                  className="relative rounded-xl overflow-hidden bg-background-100 cursor-pointer group border border-background-200/60"
                  onClick={() => openLightbox(activeGalleryIndex)}
                >
                  <div className="w-full h-[340px] sm:h-[420px] md:h-[500px] flex items-center justify-center bg-[#f5f5f7]">
                    <img
                      src={sortedGallery[activeGalleryIndex]?.url || ''}
                      alt={sortedGallery[activeGalleryIndex]?.title || project.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <Maximize2 className="w-4 h-4 text-navy" />
                      <span className="text-sm font-medium text-navy">View Full Screen</span>
                    </div>
                  </div>
                  {/* Caption bar */}
                  {sortedGallery[activeGalleryIndex]?.title && (
                    <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm font-medium">
                        {sortedGallery[activeGalleryIndex].is_cover && (
                          <Star className="w-3 h-3 inline-block mr-1.5 -mt-0.5 text-yellow-400 fill-yellow-400" />
                        )}
                        {sortedGallery[activeGalleryIndex].title}
                      </p>
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {sortedGallery.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {sortedGallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveGalleryIndex(i)}
                        className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          i === activeGalleryIndex
                            ? 'border-accent-500 ring-2 ring-accent-200 shadow-md'
                            : 'border-background-200 hover:border-background-300 hover:opacity-90'
                        }`}
                      >
                        <div className="w-full h-full bg-[#f0f0f3] flex items-center justify-center">
                          <img
                            src={img.url}
                            alt={img.title || `Gallery ${i + 1}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        {img.is_cover && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                            <Star className="w-2.5 h-2.5 text-white fill-white" />
                          </div>
                        )}
                      </button>
                    ))}
                    {/* "View all" button */}
                    <button
                      onClick={() => openLightbox(0)}
                      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 border-dashed border-background-300 flex flex-col items-center justify-center gap-1 hover:border-accent-400 hover:bg-accent-50/30 transition-colors cursor-pointer text-foreground-400 hover:text-accent-500"
                    >
                      <Maximize2 className="w-5 h-5" />
                      <span className="text-[10px] font-medium whitespace-nowrap">View All</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Videos */}
            {hasVideos && (
              <div className="glass-card p-5 sm:p-8">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Project Videos</h2>
                <div className="space-y-4">
                  {project.videos.map((vid, i) => (
                    <div key={i} className="space-y-2">
                      {vid.title && <p className="text-sm font-medium text-foreground-700">{vid.title}</p>}
                      <div className="relative rounded-xl overflow-hidden bg-black">
                        <video
                          src={vid.url}
                          controls
                          className="w-full max-h-[400px]"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div className="glass-card p-5 sm:p-8">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-full bg-background-100 text-sm font-medium text-foreground-600 whitespace-nowrap">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features.length > 0 && (
              <div className="glass-card p-5 sm:p-8">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent-500" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-foreground-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="glass-card p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Project Info</h3>
              {project.client && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-4 h-4 text-foreground-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Client</p>
                    <p className="text-sm font-medium text-navy">{project.client}</p>
                  </div>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center flex-shrink-0">
                    <Info className="w-4 h-4 text-foreground-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Duration</p>
                    <p className="text-sm font-medium text-navy">{project.duration}</p>
                  </div>
                </div>
              )}
              {project.team_size && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-foreground-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Team Size</p>
                    <p className="text-sm font-medium text-navy">{project.team_size} engineers</p>
                  </div>
                </div>
              )}
              {project.metric && (
                <div className="pt-3 border-t border-background-200/70">
                  <p className="text-[10px] text-foreground-400 uppercase tracking-wider mb-1">Key Metric</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-accent-500">{project.metric}</span>
                    {project.metric_label && (
                      <span className="text-xs text-foreground-500">{project.metric_label}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Demo Link */}
            {project.demo_url && (
              <div className="glass-card p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Live Demo</h3>
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap inline-flex items-center gap-2 w-full px-4 py-3 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors cursor-pointer justify-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Demo Website
                </a>
              </div>
            )}

            {/* Demo Login Details */}
            {hasDemoAccess && (
              <div className="glass-card p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Demo Access</h3>
                <div className="space-y-3">
                  {project.demo_url && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Demo URL</p>
                      <div className="flex items-center gap-2">
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-500 hover:underline truncate">
                          {project.demo_url}
                        </a>
                      </div>
                    </div>
                  )}
                  {project.demo_username && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Demo Username</p>
                      <div className="flex items-center gap-2">
                        <Key className="w-3.5 h-3.5 text-foreground-400 flex-shrink-0" />
                        <code className="text-sm text-navy bg-background-100 px-2 py-0.5 rounded font-mono">{project.demo_username}</code>
                        <button
                          onClick={() => copyToClipboard(project.demo_username!, 'demo-user')}
                          className="cursor-pointer text-foreground-400 hover:text-accent-500 transition-colors flex-shrink-0"
                        >
                          {copiedField === 'demo-user' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}
                  {project.demo_password && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Demo Password</p>
                      <div className="flex items-center gap-2">
                        <Key className="w-3.5 h-3.5 text-foreground-400 flex-shrink-0" />
                        <code className="text-sm text-navy bg-background-100 px-2 py-0.5 rounded font-mono">{project.demo_password}</code>
                        <button
                          onClick={() => copyToClipboard(project.demo_password!, 'demo-pass')}
                          className="cursor-pointer text-foreground-400 hover:text-accent-500 transition-colors flex-shrink-0"
                        >
                          {copiedField === 'demo-pass' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}
                  {project.admin_username && (
                    <div className="space-y-1 pt-2 border-t border-background-200/70">
                      <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Admin Username</p>
                      <div className="flex items-center gap-2">
                        <Key className="w-3.5 h-3.5 text-foreground-400 flex-shrink-0" />
                        <code className="text-sm text-navy bg-background-100 px-2 py-0.5 rounded font-mono">{project.admin_username}</code>
                        <button
                          onClick={() => copyToClipboard(project.admin_username!, 'admin-user')}
                          className="cursor-pointer text-foreground-400 hover:text-accent-500 transition-colors flex-shrink-0"
                        >
                          {copiedField === 'admin-user' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}
                  {project.admin_password && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-foreground-400 uppercase tracking-wider">Admin Password</p>
                      <div className="flex items-center gap-2">
                        <Key className="w-3.5 h-3.5 text-foreground-400 flex-shrink-0" />
                        <code className="text-sm text-navy bg-background-100 px-2 py-0.5 rounded font-mono">{project.admin_password}</code>
                        <button
                          onClick={() => copyToClipboard(project.admin_password!, 'admin-pass')}
                          className="cursor-pointer text-foreground-400 hover:text-accent-500 transition-colors flex-shrink-0"
                        >
                          {copiedField === 'admin-pass' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}
                  {project.demo_notes && (
                    <div className="pt-2 border-t border-background-200/70">
                      <p className="text-xs text-foreground-500 leading-relaxed">{project.demo_notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={sortedGallery.map((img) => ({ url: img.url, title: img.title, is_cover: img.is_cover }))}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}