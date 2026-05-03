import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { ProjectCard } from '../ProjectCard';
import { PROJECTS } from '../../data/constants';

type FilterTab = 'all' | 'featured';

/**
 * Projects section — derives unique categories from constants and
 * filters the project list locally. No global state needed.
 */
export function Projects(): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filters: { id: FilterTab; label: string; count: number }[] = useMemo(
    () => [
      { id: 'all',      label: 'All Projects', count: PROJECTS.length             },
      { id: 'featured', label: 'Featured',      count: PROJECTS.filter((p) => p.featured).length },
    ],
    []
  );

  const visibleProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.featured),
    [activeFilter]
  );

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[400px] rounded-full bg-accent/4 blur-[100px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="03 / Work"
          title="Case Studies"
          subtitle="Production apps shipped to real users — each with architectural decisions, trade-offs, and measurable outcomes."
        />

        {/* Filter tabs */}
        <div className="mt-8 flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                transition-all duration-200
                ${activeFilter === filter.id
                  ? 'text-accent bg-accent/10 border border-accent/30'
                  : 'text-text-secondary border border-surface-3 hover:border-surface-4 hover:text-text-primary'
                }`}
            >
              {filter.label}
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-mono
                  ${activeFilter === filter.id ? 'bg-accent/20 text-accent' : 'bg-surface-3 text-text-muted'}`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Project list */}
        <motion.div
          className="mt-8 flex flex-col gap-6"
          layout
        >
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Empty state */}
        {visibleProjects.length === 0 && (
          <div className="mt-12 text-center text-text-muted font-mono text-sm">
            No projects match this filter.
          </div>
        )}
      </div>
    </section>
  );
}
