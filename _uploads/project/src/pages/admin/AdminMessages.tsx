import { useState, useEffect } from 'react';
import {
  Loader2,
  Mail,
  Phone,
  Building2,
  Tag,
  Clock,
  Trash2,
  CheckCircle2,
  Archive,
  MessageCircle,
  X,
} from 'lucide-react';
import { getContactSubmissions, markContactRead, deleteContact } from '@/lib/api';
import type { ContactSubmission } from '@/lib/types';

export default function AdminMessages() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getContactSubmissions();
      setSubmissions(data);
    } catch {
      setError('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleMarkStatus = async (id: string, status: 'new' | 'read' | 'archived') => {
    await markContactRead(id, status);
    fetchSubmissions();
    if (selected?.id === id) {
      setSelected((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message permanently?')) return;
    await deleteContact(id);
    if (selected?.id === id) setSelected(null);
    fetchSubmissions();
  };

  const statusBadge = (status: string) => {
    if (status === 'new') {
      return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">New</span>;
    }
    if (status === 'read') {
      return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-700">Read</span>;
    }
    return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-foreground-100 text-foreground-500">Archived</span>;
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
          <h1 className="text-xl sm:text-2xl font-semibold text-navy">Messages</h1>
          <p className="text-sm text-foreground-500 mt-1">{submissions.length} submission(s).</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-600">{error}</div>
      )}

      {submissions.length === 0 ? (
        <div className="bg-white rounded-xl border border-background-200 p-10 text-center">
          <MessageCircle className="w-10 h-10 text-foreground-300 mx-auto mb-3" />
          <p className="text-foreground-500 text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* List */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-background-200 overflow-hidden">
            <div className="divide-y divide-background-100 max-h-[600px] overflow-y-auto">
              {submissions.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelected(sub);
                    if (sub.status === 'new') handleMarkStatus(sub.id, 'read');
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-background-50 transition-colors cursor-pointer ${
                    selected?.id === sub.id ? 'bg-accent-50 border-l-2 border-l-accent-500' : ''
                  } ${sub.status === 'new' ? 'font-medium' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm text-navy truncate">{sub.name || 'Anonymous'}</div>
                      <div className="text-xs text-foreground-500 truncate mt-0.5">{sub.email}</div>
                    </div>
                    {statusBadge(sub.status)}
                  </div>
                  <div className="text-xs text-foreground-400 mt-1 truncate">{sub.service_type || 'No service'}</div>
                  <div className="text-[10px] text-foreground-400 mt-1">
                    {new Date(sub.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-xl border border-background-200 p-5 sm:p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-semibold text-navy">{selected.name || 'Anonymous'}</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      {selected.company && (
                        <span className="inline-flex items-center gap-1 text-xs text-foreground-500">
                          <Building2 className="w-3 h-3" />
                          {selected.company}
                        </span>
                      )}
                      {selected.service_type && (
                        <span className="inline-flex items-center gap-1 text-xs text-foreground-500">
                          <Tag className="w-3 h-3" />
                          {selected.service_type}
                        </span>
                      )}
                      {statusBadge(selected.status)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-3.5 h-3.5 text-foreground-400 flex-shrink-0" />
                    <a href={`mailto:${selected.email}`} className="text-accent-500 hover:underline">{selected.email}</a>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-3.5 h-3.5 text-foreground-400 flex-shrink-0" />
                      <span className="text-foreground-600">{selected.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-foreground-400">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    {new Date(selected.created_at).toLocaleString('en-US', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    })}
                  </div>
                </div>

                <div className="bg-background-50 rounded-lg p-4 mb-5">
                  <p className="text-sm text-foreground-700 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selected.status !== 'read' && (
                    <button
                      onClick={() => handleMarkStatus(selected.id, 'read')}
                      className="whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Mark Read
                    </button>
                  )}
                  {selected.status !== 'archived' && (
                    <button
                      onClick={() => handleMarkStatus(selected.id, 'archived')}
                      className="whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-foreground-50 text-foreground-600 text-xs font-medium hover:bg-foreground-100 transition-colors"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      Archive
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-background-200 p-10 text-center">
                <MessageCircle className="w-10 h-10 text-foreground-300 mx-auto mb-3" />
                <p className="text-sm text-foreground-500">Select a message to view its details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}