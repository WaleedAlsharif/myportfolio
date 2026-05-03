import { useState, useEffect } from 'react';

/**
 * Returns scroll progress as a value between 0 and 100.
 * Throttled using requestAnimationFrame for 60fps performance.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = (): void => {
      if (rafId !== null) return; // Already queued

      rafId = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const total = scrollHeight - clientHeight;
        const current = total > 0 ? Math.round((scrollTop / total) * 100) : 0;
        setProgress(current);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}
