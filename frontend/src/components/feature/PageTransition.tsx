import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [stage, setStage] = useState<'enter' | 'exit' | 'idle'>('idle');
  const exitingRef = useRef(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname && !exitingRef.current) {
      exitingRef.current = true;
      setStage('exit');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (stage === 'exit') {
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setDisplayLocation(location);
        setStage('enter');
        exitingRef.current = false;
      }, 300);
      return () => clearTimeout(timer);
    }
    if (stage === 'enter') {
      const timer = setTimeout(() => {
        setStage('idle');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [stage, children, location]);

  return (
    <div className="page-transition-wrapper">
      <div
        className={`page-transition-content ${stage === 'exit' ? 'page-transition-exit' : ''} ${stage === 'enter' ? 'page-transition-enter' : ''}`}
        key={displayLocation.pathname}
      >
        {displayChildren}
      </div>
    </div>
  );
}