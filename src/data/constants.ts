/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PORTFOLIO DATA — constants.ts
 *
 * This is your single source of truth. Update your projects, skills, and
 * timeline here without touching any JSX/TSX component files.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type {
  NavItem,
  Project,
  SkillGroup,
  TimelineItem,
  ContactLink,
} from '../types';

// ─── Personal Info ────────────────────────────────────────────────────────────
export const PERSONAL_INFO = {
  name: 'Your Name',
  title: 'Senior Flutter Developer',
  subtitle: 'Software Architect',
  tagline: 'Building Scalable Mobile & Cross-Platform Solutions',
  bio: `I architect and ship production-grade Flutter applications with a deep focus on 
  Clean Architecture, performance, and maintainability. My background in project management 
  gives me an edge in bridging the gap between technical execution and product vision.`,
  email: 'your.email@example.com',
  location: 'Your City, Country',
  availability: 'Open to senior & lead roles',
  resumeUrl: '/resume.pdf',
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home',     label: 'Home',     icon: 'Home'       },
  { id: 'skills',   label: 'Stack',    icon: 'Layers'     },
  { id: 'projects', label: 'Projects', icon: 'Briefcase'  },
  { id: 'journey',  label: 'Journey',  icon: 'GitBranch'  },
  { id: 'contact',  label: 'Contact',  icon: 'Mail'       },
] as const;

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'mobile',
    domain: 'Mobile Engineering',
    icon: '📱',
    accentColor: 'cyan',
    skills: [
      { name: 'Flutter',        level: 'expert'       },
      { name: 'Dart',           level: 'expert'       },
      { name: 'Bloc / Cubit',   level: 'expert'       },
      { name: 'Riverpod',       level: 'advanced'     },
      { name: 'Method Channels',level: 'advanced'     },
      { name: 'Platform Views', level: 'advanced'     },
      { name: 'GetX',           level: 'intermediate' },
    ],
  },
  {
    id: 'architecture',
    domain: 'Architecture & Patterns',
    icon: '🏗️',
    accentColor: 'violet',
    skills: [
      { name: 'Clean Architecture', level: 'expert'   },
      { name: 'MVVM',               level: 'expert'   },
      { name: 'SOLID Principles',   level: 'expert'   },
      { name: 'DDD',                level: 'advanced' },
      { name: 'Repository Pattern', level: 'expert'   },
      { name: 'Dependency Injection', level: 'expert' },
    ],
  },
  {
    id: 'backend',
    domain: 'Backend & Cloud',
    icon: '☁️',
    accentColor: 'emerald',
    skills: [
      { name: 'Firebase',       level: 'expert'       },
      { name: 'REST APIs',      level: 'expert'       },
      { name: 'GraphQL',        level: 'advanced'     },
      { name: 'Node.js',        level: 'intermediate' },
      { name: 'PostgreSQL',     level: 'intermediate' },
      { name: 'Supabase',       level: 'advanced'     },
    ],
  },
  {
    id: 'tools',
    domain: 'Tools & DevOps',
    icon: '⚙️',
    accentColor: 'amber',
    skills: [
      { name: 'Git / GitHub',   level: 'expert'       },
      { name: 'CI/CD',          level: 'advanced'     },
      { name: 'Fastlane',       level: 'advanced'     },
      { name: 'Codemagic',      level: 'advanced'     },
      { name: 'Figma',          level: 'intermediate' },
      { name: 'Jira / Linear',  level: 'expert'       },
    ],
  },
] as const;

// ─── Projects ─────────────────────────────────────────────────────────────────
//
// TIP: Add screenshots to /public/screenshots/ and reference them as
//      '/screenshots/project-name-1.png'
//
export const PROJECTS: readonly Project[] = [
  {
    id: 'project-alpha',
    title: 'FinTrack Pro',
    tagline: 'Real-time personal finance management',
    description:
      'A full-featured personal finance app built for iOS and Android. Handles real-time transaction sync, budget tracking, and financial analytics with offline-first architecture.',
    technicalDepth: {
      challenge:
        'The app needed to stay fully functional offline and sync reliably when connectivity returned, while serving 50k+ concurrent users without data conflicts.',
      solution:
        'Implemented an offline-first architecture using local SQLite (drift) as the single source of truth, combined with a CRDTs-inspired conflict-resolution strategy on the Firebase sync layer. Used Bloc for deterministic state management and clean separation between the domain and data layers.',
      outcome:
        'Achieved < 200ms perceived load time offline, zero data-loss incidents post-launch, and a 4.8★ App Store rating across 12k reviews.',
    },
    techStack: ['Flutter', 'Dart', 'Bloc', 'Firebase', 'Drift (SQLite)', 'Fastlane'],
    screenshots: [
      '/screenshots/fintrack-1.png',
      '/screenshots/fintrack-2.png',
      '/screenshots/fintrack-3.png',
    ],
    links: {
      appStore: 'https://apps.apple.com',
      playStore: 'https://play.google.com',
      github: 'https://github.com/yourusername/fintrack',
    },
    category: 'FinTech',
    featured: true,
    period: '2023–2024',
  },
  {
    id: 'project-beta',
    title: 'MedAssist',
    tagline: 'Telemedicine platform for 3 markets',
    description:
      'A cross-platform telemedicine app enabling video consultations, prescription management, and appointment scheduling. Deployed in 3 countries with multi-language and multi-currency support.',
    technicalDepth: {
      challenge:
        'Video call quality degraded severely on low-bandwidth connections (common in target markets), and the app needed to support Arabic RTL layout alongside English.',
      solution:
        'Integrated a custom Method Channel to use the native Agora SDK on both platforms, bypassing Flutter web-RTC limitations. Built a locale-aware layout system using a custom `DirectionalWidget` abstraction over `Directionality` that cascaded through the widget tree without prop-drilling.',
      outcome:
        'Reduced video call dropout rate from 22% to 3.4% on 2G/3G networks. RTL support shipped in 2 weeks with zero regressions in LTR layouts.',
    },
    techStack: ['Flutter', 'Riverpod', 'Method Channels', 'Agora SDK', 'Node.js', 'PostgreSQL'],
    screenshots: [
      '/screenshots/medassist-1.png',
      '/screenshots/medassist-2.png',
    ],
    links: {
      playStore: 'https://play.google.com',
      github: 'https://github.com/yourusername/medassist',
    },
    category: 'HealthTech',
    featured: true,
    period: '2022–2023',
  },
  {
    id: 'project-gamma',
    title: 'LogiFleet',
    tagline: 'Fleet management & live tracking',
    description:
      'An enterprise-grade fleet management platform with real-time GPS tracking, route optimization, and driver performance dashboards for a 400+ vehicle fleet.',
    technicalDepth: {
      challenge:
        'Rendering 400+ animated map markers simultaneously caused severe frame drops (< 20fps) on mid-range Android devices.',
      solution:
        'Replaced the standard marker rendering pipeline with a custom `Canvas`-based `CustomPainter` that batched all marker draws into a single layer. Introduced a viewport culling algorithm so only markers within the visible map bounds are painted. Offloaded route computation to an Isolate.',
      outcome:
        'Frame rate stabilized at 60fps on 4-year-old Android devices. Battery consumption during tracking dropped by 34%.',
    },
    techStack: ['Flutter', 'Bloc', 'Google Maps SDK', 'WebSockets', 'Firebase', 'Isolates'],
    screenshots: [
      '/screenshots/logifleet-1.png',
      '/screenshots/logifleet-2.png',
    ],
    links: {
      github: 'https://github.com/yourusername/logifleet',
      live: 'https://logifleet.example.com',
    },
    category: 'Enterprise',
    featured: false,
    period: '2021–2022',
  },
] as const;

// ─── Journey / Timeline ───────────────────────────────────────────────────────
export const TIMELINE_ITEMS: readonly TimelineItem[] = [
  {
    id: 'msc',
    year: '2021',
    title: "MSc in Software Engineering",
    subtitle: 'University Name — Graduated with Distinction',
    description:
      'Research focus on distributed systems and mobile performance optimization. Thesis: "Adaptive State Management Patterns for Large-Scale Flutter Applications."',
    type: 'education',
    tags: ['Distributed Systems', 'Mobile Architecture', 'Research'],
    highlight: true,
  },
  {
    id: 'flutter-lead',
    year: '2022',
    title: 'Lead Flutter Developer',
    subtitle: 'Tech Company Name',
    description:
      'Led a team of 5 engineers to architect and deliver 3 production Flutter apps from 0 to 50k+ users. Introduced Clean Architecture and code-review standards across the mobile team.',
    type: 'work',
    tags: ['Team Lead', 'Flutter', 'Architecture'],
  },
  {
    id: 'transition',
    year: '2020',
    title: 'Career Pivot: PM → Engineering',
    subtitle: 'Self-directed transition',
    description:
      'Made a deliberate transition from 3 years as a project manager into full-time software development. This background gives me a rare ability to translate product requirements into clean technical architecture.',
    type: 'milestone',
    tags: ['Career Change', 'Product Thinking'],
    highlight: true,
  },
  {
    id: 'pm',
    year: '2017',
    title: 'Project Manager',
    subtitle: 'Previous Company',
    description:
      'Managed cross-functional digital product teams delivering mobile-first web and native applications. Developed a deep appreciation for developer experience, CI/CD, and shipping velocity.',
    type: 'work',
    tags: ['Project Management', 'Agile', 'Product'],
  },
  {
    id: 'bsc',
    year: '2016',
    title: 'BSc in Computer Science',
    subtitle: 'University Name',
    description:
      'Foundations in algorithms, operating systems, databases, and software engineering principles.',
    type: 'education',
    tags: ['Computer Science', 'Algorithms'],
  },
] as const;

// ─── Contact Links ─────────────────────────────────────────────────────────────
export const CONTACT_LINKS: readonly ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    icon: 'Mail',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/yourusername',
    href: 'https://github.com/yourusername',
    icon: 'Github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/yourprofile',
    href: 'https://linkedin.com/in/yourprofile',
    icon: 'Linkedin',
  },
] as const;

// ─── Terminal Lines (Hero animation) ─────────────────────────────────────────
export const TERMINAL_LINES: readonly string[] = [
  '> Architecting clean, scalable solutions...',
  '> Flutter · Dart · Bloc · Clean Architecture',
  '> From concept to App Store — end to end.',
  '> Ready to ship. Ready to scale.',
] as const;
