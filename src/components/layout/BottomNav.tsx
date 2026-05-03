import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Briefcase, GitBranch, Mail } from 'lucide-react';
import { NAV_ITEMS } from '../../data/constants';
import type { SectionId } from '../../types';

const ICONS: Record<string, React.ElementType> = {
  Home, Layers, Briefcase, GitBranch, Mail,
};

interface BottomNavProps {
  readonly activeSection: SectionId;
  readonly onNavigate: (id: SectionId) => void;
}

/**
 * Mobile-only bottom navigation bar that mimics a native app tab bar.
 * Hidden on md+ breakpoints — the Header handles desktop navigation.
 *
 * Uses safe-area-inset to respect iPhone home indicator.
 */
export function BottomNav({ activeSection, onNavigate }: BottomNavProps): React.ReactElement {
  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Backdrop blur panel */}
      <div className="bg-surface/90 backdrop-blur-xl border-t border-surface-3/60">
        <div className="flex items-center justify-around px-2 h-16">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full
                           touch-manipulation select-none"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active background pill */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-indicator"
                      className="absolute top-2 w-10 h-8 rounded-xl bg-accent/15"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    size={20}
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-text-secondary'
                    }`}
                  />
                </motion.div>

                {/* Label */}
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-text-muted'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
