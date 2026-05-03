import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Smartphone,
  ShoppingBag,
  ChevronDown,
  Zap,
  Wrench,
  TrendingUp,
  Star,
} from 'lucide-react';
import { MobileFrame } from './ui/MobileFrame';
import type { Project } from '../types';

interface ProjectCardProps {
  readonly project: Project;
  readonly index?: number;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ProjectCard
 *
 * Architecture:
 *  - All UI state (expanded depth section) is local — no global state needed.
 *  - Data is passed in via props from the Projects section (no direct constants import).
 *  - Logic helpers (link config, tech stack colors) are module-level pure functions.
 *  - The component is split into three visual regions:
 *      1. Header bar (title, category, featured badge, store links)
 *      2. Body (description + mobile frame side-by-side)
 *      3. Technical Depth accordion
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps): React.ReactElement {
  const [isDepthOpen, setIsDepthOpen] = useState(false);

  return (
    <motion.article
      className="relative rounded-2xl bg-surface-2 border border-surface-3/80 overflow-hidden
                 transition-shadow duration-300 hover:shadow-card-hover hover:border-accent/20
                 bg-card-glow"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* ── Featured badge ───────────────────────────────────────────────── */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2 py-1
                        bg-accent/15 border border-accent/30 rounded-full">
          <Star size={10} className="text-accent fill-accent" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Featured</span>
        </div>
      )}

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-4 border-b border-surface-3/50">
        <div className="flex items-start gap-3">
          {/* Category pill */}
          <span className="mt-0.5 shrink-0 px-2 py-0.5 rounded-md bg-surface-3/60 font-mono text-[11px]
                           text-text-muted uppercase tracking-wider">
            {project.category}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-bold text-text-primary leading-tight">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm mt-0.5">{project.tagline}</p>
          </div>
        </div>

        {/* Store / repo links */}
        <div className="flex flex-wrap gap-2 mt-4">
          {buildLinkConfigs(project.links).map((link) => (
            <LinkButton key={link.id} {...link} />
          ))}
          <span className="ml-auto font-mono text-xs text-text-muted self-center">
            {project.period}
          </span>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="px-6 py-5 flex flex-col md:flex-row gap-6 items-start">
        {/* Left: description + tech stack */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>

          {/* Tech stack chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-surface/80 border border-surface-3/60
                           font-mono text-xs text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right: mobile mockup */}
        {project.screenshots.length > 0 && (
          <div className="w-full md:w-auto flex justify-center md:justify-end flex-shrink-0">
            <MobileFrame screenshots={project.screenshots} className="scale-[0.85] origin-top" />
          </div>
        )}
      </div>

      {/* ── Technical Depth Accordion ─────────────────────────────────────── */}
      <div className="border-t border-surface-3/50">
        <button
          onClick={() => setIsDepthOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-6 py-3.5 group
                     hover:bg-surface-3/20 transition-colors duration-150"
          aria-expanded={isDepthOpen}
          aria-controls={`depth-${project.id}`}
        >
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Technical Depth
            </span>
          </div>
          <motion.div
            animate={{ rotate: isDepthOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown size={16} className="text-text-secondary group-hover:text-text-primary transition-colors" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isDepthOpen && (
            <motion.div
              id={`depth-${project.id}`}
              key="depth"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-1 grid md:grid-cols-3 gap-4">
                <DepthItem
                  icon={<Wrench size={14} />}
                  label="Challenge"
                  text={project.technicalDepth.challenge}
                  color="text-amber-400"
                />
                <DepthItem
                  icon={<Zap size={14} />}
                  label="Solution"
                  text={project.technicalDepth.solution}
                  color="text-accent"
                />
                <DepthItem
                  icon={<TrendingUp size={14} />}
                  label="Outcome"
                  text={project.technicalDepth.outcome}
                  color="text-emerald-400"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface DepthItemProps {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly text: string;
  readonly color: string;
}

function DepthItem({ icon, label, text, color }: DepthItemProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl bg-surface/60 border border-surface-3/50">
      <div className={`flex items-center gap-1.5 ${color}`}>
        {icon}
        <span className="font-mono text-[11px] uppercase tracking-widest font-medium">{label}</span>
      </div>
      <p className="text-text-secondary text-xs leading-relaxed">{text}</p>
    </div>
  );
}

interface LinkButtonConfig {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly icon: React.ReactNode;
}

function LinkButton({ label, href, icon }: LinkButtonConfig): React.ReactElement {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-3/80
                 bg-surface/60 text-text-secondary text-xs font-medium
                 hover:border-accent/40 hover:text-accent hover:bg-accent/5
                 transition-all duration-200"
    >
      {icon}
      {label}
    </a>
  );
}

// ─── Pure helper functions ────────────────────────────────────────────────────

function buildLinkConfigs(links: Project['links']): LinkButtonConfig[] {
  const configs: LinkButtonConfig[] = [];

  if (links.appStore) {
    configs.push({
      id: 'app-store',
      label: 'App Store',
      href: links.appStore,
      icon: <ShoppingBag size={12} />,
    });
  }
  if (links.playStore) {
    configs.push({
      id: 'play-store',
      label: 'Play Store',
      href: links.playStore,
      icon: <Smartphone size={12} />,
    });
  }
  if (links.github) {
    configs.push({
      id: 'github',
      label: 'GitHub',
      href: links.github,
      icon: <Github size={12} />,
    });
  }
  if (links.live) {
    configs.push({
      id: 'live',
      label: 'Live Demo',
      href: links.live,
      icon: <ExternalLink size={12} />,
    });
  }

  return configs;
}
