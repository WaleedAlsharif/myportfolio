import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Briefcase, GitBranch, Mail } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { NAV_ITEMS, PERSONAL_INFO } from '../../data/constants';
import type { SectionId } from '../../types';

const ICONS: Record<string, React.ElementType> = {
  Home, Layers, Briefcase, GitBranch, Mail,
};

interface HeaderProps {
  readonly activeSection: SectionId;
  readonly onNavigate: (id: SectionId) => void;
}

/**
 * Desktop-only sticky header with a scroll-progress indicator.
 * Hidden on mobile — BottomNav handles mobile navigation.
 */
export function Header({ activeSection, onNavigate }: HeaderProps): React.ReactElement {
  const progress = useScrollProgress();

  return (
    <motion.header
      className="hidden md:flex fixed top-0 left-0 right-0 z-50 flex-col"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Scroll progress bar */}
      <div className="h-[2px] bg-surface-3 w-full">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-cyan-300"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Nav bar */}
      <div className="bg-surface/80 backdrop-blur-xl border-b border-surface-3/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / name */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center
                            group-hover:bg-accent/30 group-hover:shadow-glow-sm transition-all duration-200">
              <span className="text-accent font-mono text-xs font-bold">&lt;/&gt;</span>
            </div>
            <span className="font-display font-bold text-sm text-text-primary group-hover:text-accent transition-colors">
              {PERSONAL_INFO.name}
            </span>
          </button>

          {/* Nav items */}
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = ICONS[item.icon];
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200 group
                    ${isActive
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                    }`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>

                  {/* Active indicator pill */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </nav>

          {/* CTA */}
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm font-medium
                       hover:bg-accent hover:text-surface transition-all duration-200 hover:shadow-glow-sm"
          >
            Resume ↗
          </a>
        </div>
      </div>
    </motion.header>
  );
}
