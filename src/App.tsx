import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Journey } from './components/sections/Journey';
import { Contact } from './components/sections/Contact';
import { useActiveSection } from './hooks/useActiveSection';
import { NAV_ITEMS } from './data/constants';
import type { SectionId } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * App.tsx — Root Orchestrator
 *
 * Responsibilities:
 *  1. Own the active-section state (derived from IntersectionObserver via hook)
 *  2. Provide the `navigateTo` function used by Header, BottomNav, and Hero CTAs
 *  3. Compose the page layout — Header (desktop) + sections + BottomNav (mobile)
 *
 * No business logic lives here. Sections are fully self-contained.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function App(): React.ReactElement {
  const activeSection = useActiveSection(SECTION_IDS);

  /**
   * Scrolls smoothly to a section by its ID.
   * Uses native scrollIntoView — no third-party scroll library needed.
   */
  const navigateTo = useCallback((id: SectionId): void => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-surface text-text-primary font-body">
      {/* ── Desktop header ─────────────────────────────────────────────────── */}
      <Header activeSection={activeSection} onNavigate={navigateTo} />

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Each section owns its own `id` attribute for IntersectionObserver */}
            <Hero onNavigate={navigateTo} />

            {/* Divider */}
            <SectionDivider />

            <Skills />

            <SectionDivider />

            <Projects />

            <SectionDivider />

            <Journey />

            <SectionDivider />

            <Contact />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Mobile bottom navigation ────────────────────────────────────────── */}
      <BottomNav activeSection={activeSection} onNavigate={navigateTo} />
    </div>
  );
}

/** Subtle decorative divider between sections */
function SectionDivider(): React.ReactElement {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-surface-3 to-transparent" />
    </div>
  );
}
