import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Server,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Shield,
  FolderKanban,
} from 'lucide-react';
import { adminSignOut } from '@/lib/adminAuth';
import { getContactSubmissions } from '@/lib/api';
import type { ContactSubmission } from '@/lib/types';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/services', label: 'Services', icon: Server },
  { path: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { path: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      const subs: ContactSubmission[] = await getContactSubmissions();
      setUnreadCount(subs.filter((s) => s.status === 'new').length);
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await adminSignOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-dvh flex bg-background-50">
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#060d1a] flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-white">SINS Admin</span>
          </Link>
          <button
            className="lg:hidden text-slate-400 hover:text-white cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const showBadge = item.path === '/admin/messages' && unreadCount > 0;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-accent-500/15 text-accent-400'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" strokeWidth={2} />
                <span>{item.label}</span>
                {showBadge && (
                  <span className="ml-auto bg-accent-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/10">
          <Link
            to="/"
            className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors mb-2 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            View Website
          </Link>
          <button
            onClick={handleSignOut}
            className="whitespace-nowrap cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4.5 h-4.5 flex-shrink-0" strokeWidth={2} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-background-200 bg-white flex items-center px-5 gap-4">
          <button
            className="lg:hidden text-foreground-600 hover:text-navy cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-foreground-500">SINS Admin Panel</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}