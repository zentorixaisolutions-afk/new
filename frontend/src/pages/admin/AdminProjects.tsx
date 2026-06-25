import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, Check, X, Star, ImageIcon, ExternalLink } from 'lucide-react';
import { adminGetProjects, deleteProject, saveProject } from '@/lib/projectsApi';
import type { Project } from '@/lib/types';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminGetProjects();
      setProjects(data);
    } catch {
      setError('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    const ok = await deleteProject(id);
    if (ok) fetchProjects();
  };

  const handleTogglePublished = async (project: Project) => {
    await saveProject({
      id: project.id,
      title: project.title,
      slug: project.slug,
      category_id: project.category_id,
      published: !project.published,
    });
    fetchProjects();
  };

  const handleToggleFeatured = async (project: Project) => {
    await saveProject({
      id: project.id,
      title: project.title,
      slug: project.slug,
      category_id: project.category_id,
      featured: !project.featured,
    });
    fetchProjects();
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
          <h1 className="text-xl sm:text-2xl font-semibold text-navy">Projects</h1>
          <p className="text-sm text-foreground-500 mt-1">{projects.length} project(s) total. {projects.filter(p => p.featured).length} featured.</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Add Project
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-600">{error}</div>
      )}

      {projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-background-200 p-10 text-center">
          <p className="text-foreground-500 text-sm">No projects yet. Create your first portfolio piece!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-background-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200 bg-background-50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground-600 text-xs">Image</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-600 text-xs">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-600 text-xs hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground-600 text-xs hidden md:table-cell">Order</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground-600 text-xs">Featured</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground-600 text-xs">Published</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground-600 text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-background-100 hover:bg-background-50/50 transition-colors">
                    <td className="px-4 py-3">
                      {p.thumbnail_url ? (
                        <img src={p.thumbnail_url} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-background-100 flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-foreground-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/projects/${p.id}`} className="font-medium text-navy hover:text-accent-500 transition-colors cursor-pointer">
                          {p.title}
                        </Link>
                        <Link to={`/projects/${p.slug}`} target="_blank" className="text-foreground-400 hover:text-accent-500 transition-colors" title="View on site">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground-500 hidden sm:table-cell">
                      {p.category?.name || '—'}
                    </td>
                    <td className="px-4 py-3 text-foreground-500 hidden md:table-cell">{p.sort_order}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`whitespace-nowrap cursor-pointer inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          p.featured ? 'bg-yellow-50 text-yellow-700' : 'bg-foreground-100 text-foreground-500'
                        }`}
                      >
                        <Star className={`w-3 h-3 ${p.featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                        {p.featured ? 'Yes' : 'No'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleTogglePublished(p)}
                        className={`whitespace-nowrap cursor-pointer inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          p.published ? 'bg-green-50 text-green-700' : 'bg-foreground-100 text-foreground-500'
                        }`}
                      >
                        {p.published ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {p.published ? 'Live' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/projects/${p.id}`}
                          className="whitespace-nowrap cursor-pointer p-2 rounded-lg text-foreground-400 hover:text-accent-500 hover:bg-accent-50 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
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