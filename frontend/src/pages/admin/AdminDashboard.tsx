import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Server, MessageSquare, AlertCircle, ArrowRight, Plus, FolderKanban } from 'lucide-react';
import { getDashboardStats } from '@/lib/api';
import { getProjectCount } from '@/lib/projectsApi';
import type { DashboardStats } from '@/lib/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 0,
    totalPosts: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getProjectCount()]).then(([s, count]) => {
      setStats(s);
      setProjectCount(count);
      setLoading(false);
    });
  }, []);

  const cards = [
    {
      label: 'Total Projects',
      value: projectCount,
      icon: FolderKanban,
      color: 'bg-accent-500',
      link: '/admin/projects',
    },
    {
      label: 'Total Services',
      value: stats.totalServices,
      icon: Server,
      color: 'bg-[#0891b2]',
      link: '/admin/services',
    },
    {
      label: 'Messages',
      value: stats.totalMessages,
      icon: MessageSquare,
      color: 'bg-[#7c3aed]',
      link: '/admin/messages',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadMessages,
      icon: AlertCircle,
      color: stats.unreadMessages > 0 ? 'bg-red-500' : 'bg-foreground-400',
      link: '/admin/messages',
    },
  ];

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-navy">Dashboard</h1>
        <p className="text-sm text-foreground-500 mt-1">Overview of your content and messages.</p>
      </div>

      {/* Stats grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-background-200 animate-pulse">
              <div className="h-4 bg-background-200 rounded w-24 mb-3" />
              <div className="h-8 bg-background-200 rounded w-12" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                to={card.link}
                className="bg-white rounded-xl p-5 border border-background-200 hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg ${card.color} flex items-center justify-center`}>
                    <Icon className="w-4.5 h-4.5 text-white" strokeWidth={2} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-foreground-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-navy">{card.value}</div>
                <div className="text-xs text-foreground-500 mt-1">{card.label}</div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="text-base font-semibold text-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/admin/services/new"
            className="bg-white rounded-xl p-5 border border-background-200 hover:shadow-card-hover transition-all duration-200 cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
              <Plus className="w-5 h-5 text-accent-500" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm font-semibold text-navy">Add New Service</div>
              <div className="text-xs text-foreground-500 mt-0.5">Create a new service listing</div>
            </div>
          </Link>
          <Link
            to="/admin/projects/new"
            className="bg-white rounded-xl p-5 border border-background-200 hover:shadow-card-hover transition-all duration-200 cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
              <Plus className="w-5 h-5 text-accent-500" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm font-semibold text-navy">Add New Project</div>
              <div className="text-xs text-foreground-500 mt-0.5">Create a new portfolio project</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}