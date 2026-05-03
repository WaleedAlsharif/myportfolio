// ─── Navigation ────────────────────────────────────────────────────────────
export type SectionId = 'home' | 'skills' | 'projects' | 'journey' | 'contact';

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
  /** Lucide icon component name */
  readonly icon: string;
}

// ─── Skills ────────────────────────────────────────────────────────────────
export type SkillLevel = 'expert' | 'advanced' | 'intermediate';

export interface Skill {
  readonly name: string;
  readonly level: SkillLevel;
}

export interface SkillGroup {
  readonly id: string;
  readonly domain: string;
  /** Emoji or short label used as visual anchor */
  readonly icon: string;
  /** Tailwind color key — e.g. "cyan", "violet", "emerald" */
  readonly accentColor: string;
  readonly skills: readonly Skill[];
}

// ─── Projects ──────────────────────────────────────────────────────────────
export interface TechnicalDepth {
  readonly challenge: string;
  readonly solution: string;
  readonly outcome: string;
}

export interface ProjectLinks {
  readonly appStore?: string;
  readonly playStore?: string;
  readonly github?: string;
  readonly live?: string;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly technicalDepth: TechnicalDepth;
  readonly techStack: readonly string[];
  /** Absolute URLs or /public paths */
  readonly screenshots: readonly string[];
  readonly links: ProjectLinks;
  readonly category: string;
  readonly featured?: boolean;
  /** Year or "YYYY–YYYY" range */
  readonly period: string;
}

// ─── Journey / Timeline ────────────────────────────────────────────────────
export type TimelineItemType = 'education' | 'work' | 'milestone';

export interface TimelineItem {
  readonly id: string;
  readonly year: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly type: TimelineItemType;
  readonly tags?: readonly string[];
  /** Visually highlighted entry (e.g. MSc graduation) */
  readonly highlight?: boolean;
}

// ─── Contact ───────────────────────────────────────────────────────────────
export interface ContactLink {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly href: string;
  /** Lucide icon name */
  readonly icon: string;
}

// ─── App State ─────────────────────────────────────────────────────────────
export interface AppState {
  readonly activeSection: SectionId;
  readonly scrollProgress: number;
  readonly isMobileMenuOpen: boolean;
}
