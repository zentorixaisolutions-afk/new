import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Trash2, ImageIcon, Upload, X, Link, GripVertical, Star, ChevronUp, ChevronDown } from 'lucide-react';
import { adminGetProject, saveProject, getProjectCategories } from '@/lib/projectsApi';
import { uploadImage } from '@/lib/upload';
import type { ProjectInput, ProjectCategory, ProjectMedia } from '@/lib/types';

export default function AdminProjectForm() {
  const navigate = useNavigate();
  const rawId = window.location.pathname.split('/').pop();
  const isNew = rawId === 'new';
  const editId = isNew ? undefined : rawId;

  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [form, setForm] = useState<ProjectInput>({
    title: '',
    slug: '',
    category_id: null,
    short_description: '',
    full_description: '',
    thumbnail_url: null,
    demo_url: null,
    demo_username: null,
    demo_password: null,
    admin_username: null,
    admin_password: null,
    demo_notes: null,
    client: null,
    project_year: null,
    duration: null,
    team_size: null,
    metric: null,
    metric_label: null,
    service_link: null,
    technologies: [],
    features: [],
    gallery_images: [],
    videos: [],
    featured: false,
    published: true,
    sort_order: 0,
    meta_title: null,
    meta_description: null,
  });
  const [techText, setTechText] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    getProjectCategories().then(setCategories);
    if (!isNew && editId) {
      setLoading(true);
      adminGetProject(editId).then((p) => {
        if (p) {
          setForm({
            id: p.id,
            title: p.title,
            slug: p.slug,
            category_id: p.category_id,
            short_description: p.short_description,
            full_description: p.full_description,
            thumbnail_url: p.thumbnail_url,
            demo_url: p.demo_url,
            demo_username: p.demo_username,
            demo_password: p.demo_password,
            admin_username: p.admin_username,
            admin_password: p.admin_password,
            demo_notes: p.demo_notes,
            client: p.client,
            project_year: p.project_year,
            duration: p.duration,
            team_size: p.team_size,
            metric: p.metric,
            metric_label: p.metric_label,
            service_link: p.service_link,
            technologies: p.technologies || [],
            features: p.features || [],
            gallery_images: p.gallery_images || [],
            videos: p.videos || [],
            featured: p.featured,
            published: p.published,
            sort_order: p.sort_order,
            meta_title: p.meta_title,
            meta_description: p.meta_description,
          });
          setTechText((p.technologies || []).join('\n'));
          setFeaturesText((p.features || []).join('\n'));
          setPreviewUrl(p.thumbnail_url);
        }
        setLoading(false);
      });
    }
  }, [editId, isNew]);

  const handleField = (field: string, value: any) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && isNew) {
        next.slug = (value as string)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }
      return next;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    const url = await uploadImage(file, 'services');
    setUploading(false);
    if (url) {
      setForm((prev) => ({ ...prev, thumbnail_url: url }));
      setPreviewUrl(url);
    } else {
      setError('Image upload failed.');
    }
  };

  const handleAddGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'services');
    setUploading(false);
    if (url) {
      const existing = form.gallery_images || [];
      const isFirst = existing.length === 0;
      setForm((prev) => ({
        ...prev,
        gallery_images: [
          ...existing,
          { url, title: '', type: 'image' as const, is_cover: isFirst, sort_order: existing.length },
        ],
      }));
    }
  };

  const handleToggleCover = (index: number) => {
    setForm((prev) => ({
      ...prev,
      gallery_images: (prev.gallery_images || []).map((img, i) => ({
        ...img,
        is_cover: i === index ? !img.is_cover : (img.is_cover ? false : img.is_cover),
      })),
    }));
  };

  const handleMoveGallery = (index: number, direction: 'up' | 'down') => {
    const images = [...(form.gallery_images || [])];
    if (direction === 'up' && index > 0) {
      [images[index - 1], images[index]] = [images[index], images[index - 1]];
    } else if (direction === 'down' && index < images.length - 1) {
      [images[index], images[index + 1]] = [images[index + 1], images[index]];
    }
    // Re-assign sort_order after move
    setForm((prev) => ({
      ...prev,
      gallery_images: images.map((img, i) => ({ ...img, sort_order: i })),
    }));
  };

  const handleRemoveGallery = (index: number) => {
    setForm((prev) => ({
      ...prev,
      gallery_images: (prev.gallery_images || []).filter((_, i) => i !== index),
    }));
  };

  const handleUpdateGalleryTitle = (index: number, title: string) => {
    setForm((prev) => ({
      ...prev,
      gallery_images: (prev.gallery_images || []).map((img, i) =>
        i === index ? { ...img, title } : img,
      ),
    }));
  };

  const handleAddVideo = () => {
    if (!newVideoUrl.trim()) return;
    setForm((prev) => ({
      ...prev,
      videos: [...(prev.videos || []), { url: newVideoUrl.trim(), title: newVideoTitle.trim() || undefined, type: 'video' as const }],
    }));
    setNewVideoUrl('');
    setNewVideoTitle('');
  };

  const handleRemoveVideo = (index: number) => {
    setForm((prev) => ({
      ...prev,
      videos: (prev.videos || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) { setError('Title is required.'); return; }

    const technologies = techText.split('\n').map((t) => t.trim()).filter(Boolean);
    const features = featuresText.split('\n').map((f) => f.trim()).filter(Boolean);

    setSaving(true);
    const result = await saveProject({
      ...form,
      technologies,
      features,
    });
    setSaving(false);

    if (result) {
      navigate('/admin/projects');
    } else {
      setError('Failed to save project.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-accent-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-navy">{isNew ? 'New Project' : 'Edit Project'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        {/* Thumbnail Upload */}
        <div className="bg-white rounded-xl border border-background-200 p-5">
          <label className="block text-xs font-semibold text-foreground-700 mb-2">Project Thumbnail</label>
          <div className="flex items-start gap-4">
            {(previewUrl || uploading) && (
              <div className="w-32 h-20 rounded-lg border border-background-200 overflow-hidden bg-background-50 flex-shrink-0">
                {uploading ? (
                  <div className="w-full h-full flex items-center justify-center"><Loader2 className="w-6 h-6 text-accent-500 animate-spin" /></div>
                ) : (
                  <img src={previewUrl!} alt="Preview" className="w-full h-full object-cover" />
                )}
              </div>
            )}
            <label className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-background-200 text-sm text-foreground-600 hover:bg-background-50 transition-colors">
              <Upload className="w-4 h-4" />
              {form.thumbnail_url ? 'Replace' : 'Upload'} Thumbnail
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-background-200 p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Title *</label>
              <input type="text" value={form.title} onChange={(e) => handleField('title', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100"
                placeholder="e.g., FinFlow — Digital Banking Platform" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => handleField('slug', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 font-mono"
                placeholder="project-slug-name" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Category</label>
              <select value={form.category_id || ''} onChange={(e) => handleField('category_id', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={(e) => handleField('sort_order', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Short Description</label>
            <textarea value={form.short_description || ''} onChange={(e) => handleField('short_description', e.target.value)} rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 resize-y"
              placeholder="A brief overview shown on the project card..." />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Full Description</label>
            <textarea value={form.full_description || ''} onChange={(e) => handleField('full_description', e.target.value)} rows={5}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 resize-y"
              placeholder="Detailed project description shown on the detail page..." />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => handleField('published', e.target.checked)}
                className="w-4 h-4 rounded border-background-300 text-accent-500 focus:ring-accent-300" />
              <span className="text-sm text-foreground-700">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => handleField('featured', e.target.checked)}
                className="w-4 h-4 rounded border-background-300 text-yellow-500 focus:ring-yellow-300" />
              <span className="text-sm text-foreground-700">Featured</span>
            </label>
          </div>
        </div>

        {/* Client & Metrics */}
        <div className="bg-white rounded-xl border border-background-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-navy">Client & Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Client</label>
              <input type="text" value={form.client || ''} onChange={(e) => handleField('client', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Year</label>
              <input type="text" value={form.project_year || ''} onChange={(e) => handleField('project_year', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" placeholder="e.g., 2024" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Duration</label>
              <input type="text" value={form.duration || ''} onChange={(e) => handleField('duration', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" placeholder="e.g., 8 months" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Team Size</label>
              <input type="number" value={form.team_size ?? ''} onChange={(e) => handleField('team_size', e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Key Metric Value</label>
              <input type="text" value={form.metric || ''} onChange={(e) => handleField('metric', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" placeholder="e.g., 2M+" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Metric Label</label>
              <input type="text" value={form.metric_label || ''} onChange={(e) => handleField('metric_label', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" placeholder="e.g., Daily Transactions" />
            </div>
          </div>
        </div>

        {/* Technologies & Features */}
        <div className="bg-white rounded-xl border border-background-200 p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Technologies (one per line)</label>
            <textarea value={techText} onChange={(e) => setTechText(e.target.value)} rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 resize-y font-mono"
              placeholder="React&#10;Node.js&#10;PostgreSQL" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Features (one per line)</label>
            <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 resize-y font-mono"
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
          </div>
        </div>

        {/* Demo & Access */}
        <div className="bg-white rounded-xl border border-background-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-navy">Demo & Access Details</h3>
          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Demo URL</label>
            <input type="url" value={form.demo_url || ''} onChange={(e) => handleField('demo_url', e.target.value || null)}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" placeholder="https://demo.example.com" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Demo Username</label>
              <input type="text" value={form.demo_username || ''} onChange={(e) => handleField('demo_username', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Demo Password</label>
              <input type="text" value={form.demo_password || ''} onChange={(e) => handleField('demo_password', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Admin Username</label>
              <input type="text" value={form.admin_username || ''} onChange={(e) => handleField('admin_username', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Admin Password</label>
              <input type="text" value={form.admin_password || ''} onChange={(e) => handleField('admin_password', e.target.value || null)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Demo Notes / Instructions</label>
            <textarea value={form.demo_notes || ''} onChange={(e) => handleField('demo_notes', e.target.value || null)} rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 resize-y"
              placeholder="Instructions for demo users..." />
          </div>
        </div>

        {/* Gallery Images */}
        <div className="bg-white rounded-xl border border-background-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy">Gallery Images</h3>
            <label className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-background-200 text-xs text-foreground-600 hover:bg-background-50 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Image
              <input type="file" accept="image/*" onChange={handleAddGalleryImage} className="hidden" />
            </label>
          </div>
          {uploading && <p className="text-xs text-foreground-500">Uploading image...</p>}
          {(form.gallery_images || []).length === 0 ? (
            <p className="text-xs text-foreground-400">No gallery images yet. The first image you add will be set as the cover image.</p>
          ) : (
            <div className="space-y-2">
              {(form.gallery_images || []).map((img, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-background-200 bg-background-50 group">
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 w-20 h-14 rounded-md overflow-hidden bg-[#f5f5f7] border border-background-200">
                    <img src={img.url} alt={img.title || `Gallery ${i + 1}`} className="w-full h-full object-cover" />
                    {img.is_cover && (
                      <div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                        <Star className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  {/* Info + controls */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <input
                      type="text"
                      value={img.title || ''}
                      onChange={(e) => handleUpdateGalleryTitle(i, e.target.value)}
                      placeholder="Image caption..."
                      className="w-full px-2 py-1 rounded border border-background-200 text-xs text-foreground-600 focus:outline-none focus:border-accent-300"
                    />
                    <div className="flex items-center gap-1">
                      {/* Cover toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleCover(i)}
                        title={img.is_cover ? 'Unset as cover' : 'Set as cover image'}
                        className={`cursor-pointer px-2 py-0.5 rounded text-[10px] font-medium transition-colors whitespace-nowrap inline-flex items-center gap-1 ${
                          img.is_cover
                            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                            : 'bg-background-100 text-foreground-500 border border-background-200 hover:bg-yellow-50 hover:text-yellow-600'
                        }`}
                      >
                        <Star className={`w-3 h-3 ${img.is_cover ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                        {img.is_cover ? 'Cover' : 'Set Cover'}
                      </button>
                      {/* Move up */}
                      <button
                        type="button"
                        onClick={() => handleMoveGallery(i, 'up')}
                        disabled={i === 0}
                        className="cursor-pointer p-1 rounded text-foreground-400 hover:text-foreground-600 hover:bg-background-100 disabled:opacity-30 disabled:cursor-default transition-colors"
                        title="Move up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      {/* Move down */}
                      <button
                        type="button"
                        onClick={() => handleMoveGallery(i, 'down')}
                        disabled={i === (form.gallery_images || []).length - 1}
                        className="cursor-pointer p-1 rounded text-foreground-400 hover:text-foreground-600 hover:bg-background-100 disabled:opacity-30 disabled:cursor-default transition-colors"
                        title="Move down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => handleRemoveGallery(i)}
                        className="cursor-pointer p-1 rounded text-foreground-400 hover:text-red-500 hover:bg-red-50 transition-colors ml-auto"
                        title="Remove image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Videos */}
        <div className="bg-white rounded-xl border border-background-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-navy">Project Videos</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="url" value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300"
              placeholder="Video URL (MP4 or YouTube embed)" />
            <input type="text" value={newVideoTitle} onChange={(e) => setNewVideoTitle(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300"
              placeholder="Video title (optional)" />
            <button type="button" onClick={handleAddVideo}
              className="whitespace-nowrap cursor-pointer px-4 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
              Add
            </button>
          </div>
          {(form.videos || []).length === 0 ? (
            <p className="text-xs text-foreground-400">No videos added yet.</p>
          ) : (
            <div className="space-y-2">
              {(form.videos || []).map((vid, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-background-200 bg-background-50">
                  <span className="flex-1 text-sm text-navy truncate">{vid.title || vid.url}</span>
                  <button type="button" onClick={() => handleRemoveVideo(i)}
                    className="cursor-pointer p-1.5 rounded text-foreground-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl border border-background-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-navy">SEO</h3>
          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Meta Title</label>
            <input type="text" value={form.meta_title || ''} onChange={(e) => handleField('meta_title', e.target.value || null)}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Meta Description</label>
            <textarea value={form.meta_description || ''} onChange={(e) => handleField('meta_description', e.target.value || null)} rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 resize-y" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Service Link</label>
            <input type="text" value={form.service_link || ''} onChange={(e) => handleField('service_link', e.target.value || null)}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100" placeholder="/services" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors disabled:opacity-50">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : 'Save Project'}
          </button>
          <button type="button" onClick={() => navigate('/admin/projects')}
            className="whitespace-nowrap cursor-pointer px-5 py-2.5 rounded-lg border border-background-200 text-sm text-foreground-600 hover:bg-background-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}