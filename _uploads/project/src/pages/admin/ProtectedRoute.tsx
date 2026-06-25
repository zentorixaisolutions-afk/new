import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { adminCheckAuth } from '@/lib/adminAuth';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const user = await adminCheckAuth();
      if (cancelled) return;
      if (!user) {
        navigate('/admin/login', { replace: true });
      } else {
        setAuthenticated(true);
      }
      setChecking(false);
    };

    check();

    return () => { cancelled = true; };
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#060d1a]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-accent-400 animate-spin" strokeWidth={2} />
          <p className="text-sm text-slate-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return <Outlet />;
}