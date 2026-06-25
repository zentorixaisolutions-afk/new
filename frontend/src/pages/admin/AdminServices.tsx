import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, Check, X, ImageIcon } from 'lucide-react';
import { getServices, deleteService, saveService } from '@/lib/api';
import { uploadImage } from '@/lib/upload';
import type { Service, ServiceInput } from '@/lib/types';

export default function AdminServices() {
  return <AdminServicesList />;
}

function AdminServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getServices(false);
      setServices(data);
    } catch {
      setError('Failed to load services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    const ok = await deleteService(id);
    if (ok) fetchServices();
  };

  const handleTogglePublished = async (service: Service) => {
    await saveService({ id: service.id, ...service, published: !service.published });
    fetchServices();
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-navy">Services</h1>
          <p className="text-sm text-foreground-500 mt-1">{services.length} service(s) total.</p>
        </div>
        <Link
          to="/admin/services/new"
          className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Add Service
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-600">{error}</div>
      )}

      {services.length === 0 ? (
        <div className="bg-white rounded-xl border border-background-200 p-10 text-center">
          <p className="text-foreground-500 text-sm">No services yet. Create your first one!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-background-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200 bg-background-50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground-600 text-xs">Image</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-600 text-xs">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-600 text-xs hidden sm:table-cell">Slug</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-600 text-xs hidden md:table-cell">Order</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground-600 text-xs">Published</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground-600 text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b border-background-100 hover:bg-background-50/50 transition-colors">
                    <td className="px-4 py-3">
                      {s.image_url ? (
                        <img src={s.image_url} alt={s.title} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-background-100 flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-foreground-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/services/${s.id}`} className="font-medium text-navy hover:text-accent-500 transition-colors cursor-pointer">
                        {s.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-foreground-500 hidden sm:table-cell">{s.slug}</td>
                    <td className="px-4 py-3 text-foreground-500 hidden md:table-cell">{s.sort_order}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleTogglePublished(s)}
                        className={`whitespace-nowrap cursor-pointer inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          s.published
                            ? 'bg-green-50 text-green-700'
                            : 'bg-foreground-100 text-foreground-500'
                        }`}
                      >
                        {s.published ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {s.published ? 'Live' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/services/${s.id}`}
                          className="whitespace-nowrap cursor-pointer p-2 rounded-lg text-foreground-400 hover:text-accent-500 hover:bg-accent-50 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="whitespace-nowrap cursor-pointer p-2 rounded-lg text-foreground-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Service form (new + edit) ───────────────────────────────

export function AdminServiceForm() {
  const navigate = useNavigate();
  const id = window.location.pathname.split('/').pop();
  const isNew = id === 'new';

  const [form, setForm] = useState<ServiceInput>({
    title: '',
    slug: '',
    description: '',
    icon: '',
    image_url: null,
    features: [],
    sort_order: 0,
    published: true,
  });
  const [featuresText, setFeaturesText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew) {
      getServices(false).then((services) => {
        const found = services.find((s) => s.id === id);
        if (found) {
          setForm({
            id: found.id,
            title: found.title,
            slug: found.slug,
            description: found.description,
            icon: found.icon,
            image_url: found.image_url,
            features: found.features || [],
            sort_order: found.sort_order,
            published: found.published,
          });
          setFeaturesText((found.features || []).join('\n'));
          setPreviewUrl(found.image_url);
        }
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const handleField = (field: string, value: string | boolean | number) => {
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
      setForm((prev) => ({ ...prev, image_url: url }));
      setPreviewUrl(url);
    } else {
      setError('Image upload failed. Supabase storage may not be configured.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }

    const features = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    setSaving(true);
    const result = await saveService({
      ...form,
      features,
      id: isNew ? undefined : id,
    });
    setSaving(false);

    if (result) {
      navigate('/admin/services');
    } else {
      setError('Failed to save service. Check console for details.');
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
        <h1 className="text-xl sm:text-2xl font-semibold text-navy">
          {isNew ? 'New Service' : 'Edit Service'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        {/* Image upload */}
        <div className="bg-white rounded-xl border border-background-200 p-5">
          <label className="block text-xs font-semibold text-foreground-700 mb-2">Service Image</label>
          <div className="flex items-start gap-4">
            {(previewUrl || uploading) && (
              <div className="w-24 h-24 rounded-lg border border-background-200 overflow-hidden bg-background-50 flex-shrink-0">
                {uploading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-accent-500 animate-spin" />
                  </div>
                ) : (
                  <img src={previewUrl!} alt="Preview" className="w-full h-full object-cover" />
                )}
              </div>
            )}
            <label className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-background-200 text-sm text-foreground-600 hover:bg-background-50 transition-colors">
              <ImageIcon className="w-4 h-4" />
              {form.image_url || previewUrl ? 'Replace Image' : 'Upload Image'}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Title + Slug */}
        <div className="bg-white rounded-xl border border-background-200 p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleField('title', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100"
                placeholder="e.g., Custom Software Development"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleField('slug', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 font-mono"
                placeholder="custom-software-dev"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleField('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 resize-y"
              placeholder="A short description of this service..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Icon (Lucide name)</label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => handleField('icon', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 font-mono"
              placeholder="e.g., Server, Code, Cloud"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Features (one per line)</label>
            <textarea
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 resize-y font-mono"
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground-700 mb-1.5">Sort Order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => handleField('sort_order', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-navy focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100"
              />
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => handleField('published', e.target.checked)}
                  className="w-4 h-4 rounded border-background-300 text-accent-500 focus:ring-accent-300"
                />
                <span className="text-sm text-foreground-700">Published</span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Service'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
            className="whitespace-nowrap cursor-pointer px-5 py-2.5 rounded-lg border border-background-200 text-sm text-foreground-600 hover:bg-background-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}