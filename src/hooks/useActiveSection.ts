import { useState, useEffect, useCallback } from 'react';
import type { SectionId } from '../types';

/**
 * Observes all page sections and returns the currently visible one.
 * Uses IntersectionObserver for performance — no scroll event listeners.
 *
 * @param sectionIds - Ordered list of section IDs to observe
 * @param rootMargin - Optional IntersectionObserver rootMargin (default: '-40% 0px -40% 0px')
 */
export function useActiveSection(
  sectionIds: readonly SectionId[],
  rootMargin = '-40% 0px -40% 0px'
): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionId);
          break; // First intersecting entry wins
        }
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin,
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin, handleIntersect]);

  return activeSection;
}
