import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, Eye, EyeOff, Shield } from 'lucide-react';
import { adminSignIn } from '@/lib/adminAuth';
import { resetIntro } from '@/components/feature/IntroLoader';

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || '';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupDone, setSetupDone] = useState(false);

  // Auto-reset admin password hash on mount
  useEffect(() => {
    if (setupDone) return;
    fetch(`${SUPABASE_URL}functions/v1/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ action: 'reset' }),
    }).then(() => setSetupDone(true)).catch(() => setSetupDone(true));
  }, [setupDone]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    const result = await adminSignIn(username.trim(), password);
    setLoading(false);

    if (result.success) {
      resetIntro();
      sessionStorage.setItem('conquer-intro-force', 'true');
      navigate('/admin', { replace: true });
    } else {
      setError(result.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#060d1a] px-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-lg font-semibold text-white">SINS Admin</span>
            </div>
          </Link>
        </div>

        <div className="bg-white dark:bg-[#0f1a2e] rounded-2xl p-6 sm:p-8 border border-background-200 dark:border-slate-700">
          <h1 className="text-xl font-semibold text-navy dark:text-white mb-1">Sign in to Admin</h1>
          <p className="text-sm text-foreground-500 dark:text-slate-400 mb-6">Enter your credentials to access the admin panel.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground-700 dark:text-slate-300 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-lg border border-background-200 dark:border-slate-600 bg-background-50 dark:bg-[#0a1628] text-sm text-navy dark:text-white placeholder:text-foreground-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 dark:focus:ring-accent-500/20 transition-all"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-11 rounded-lg border border-background-200 dark:border-slate-600 bg-background-50 dark:bg-[#0a1628] text-sm text-navy dark:text-white placeholder:text-foreground-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-100 dark:focus:ring-accent-500/20 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 hover:text-foreground-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="whitespace-nowrap cursor-pointer w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" strokeWidth={2} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-slate-500">
          <Link to="/" className="hover:text-white transition-colors">Back to website</Link>
        </p>
      </div>
    </div>
  );
}