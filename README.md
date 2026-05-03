# Portfolio — Flutter Developer & Software Architect

A production-ready portfolio built with **React + TypeScript + Tailwind CSS + Framer Motion**.
Designed with Clean Architecture principles — the same patterns you use in Flutter.

---

## Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

---

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Desktop sticky nav + scroll progress bar
│   │   └── BottomNav.tsx       # Mobile app-style bottom tab bar
│   ├── sections/
│   │   ├── Hero.tsx            # Full-viewport intro with terminal animation
│   │   ├── Skills.tsx          # Grouped skill domains with level badges
│   │   ├── Projects.tsx        # Filter tabs + ProjectCard list
│   │   ├── Journey.tsx         # Animated timeline
│   │   └── Contact.tsx         # Contact cards with copy-to-clipboard
│   ├── ui/
│   │   ├── SectionTitle.tsx    # Reusable animated section heading
│   │   ├── MobileFrame.tsx     # Phone mockup frame for screenshots
│   │   ├── SkillBadge.tsx      # Skill chip with level indicator
│   │   └── AnimatedTerminal.tsx# Typewriter terminal effect
│   └── ProjectCard.tsx         # ⭐ Main project case study card
├── hooks/
│   ├── useActiveSection.ts     # IntersectionObserver nav tracking
│   ├── useScrollProgress.ts    # rAF-throttled scroll progress
│   └── useClipboard.ts         # Copy-to-clipboard with feedback
├── data/
│   └── constants.ts            # ← UPDATE YOUR DATA HERE
├── types/
│   └── index.ts                # All TypeScript interfaces
├── App.tsx                     # Root orchestrator
├── main.tsx                    # React entry point
└── index.css                   # Tailwind directives + global styles
```

---

## Customizing Your Content

**All your data lives in one file: `src/data/constants.ts`**

Update these exported objects:

| Export | What to change |
|---|---|
| `PERSONAL_INFO` | Your name, title, email, resume URL |
| `SKILL_GROUPS` | Your skills grouped by domain |
| `PROJECTS` | Your case studies with technical depth |
| `TIMELINE_ITEMS` | Your education and career history |
| `CONTACT_LINKS` | Your contact channels |
| `TERMINAL_LINES` | The hero terminal animation text |

### Adding Project Screenshots

1. Place screenshots in `/public/screenshots/`
2. Reference them in `constants.ts` as `'/screenshots/my-project-1.png'`

The `MobileFrame` component renders a placeholder automatically when a screenshot isn't found yet.

---

## Architecture Notes

### Logic–View Separation (MVVM analogy)

| Flutter | This Portfolio |
|---|---|
| `ViewModel` | Custom hooks (`useActiveSection`, `useScrollProgress`) |
| `View` | Section components (`Hero`, `Skills`, etc.) |
| `Repository` | `constants.ts` (data source) |
| `Domain Models` | `types/index.ts` |

### Key Design Decisions

- **No prop-drilling for navigation** — `onNavigate` is passed down only one level (App → Section)
- **IntersectionObserver, not scroll events** — better performance for active section tracking
- **rAF-throttled scroll progress** — 60fps without jank
- **All data is `readonly`** — enforced at the type level, mirrors immutability in Flutter
- **Pure helper functions outside components** — e.g., `buildLinkConfigs` in `ProjectCard.tsx`

---

## Deployment

```bash
npm run build        # Outputs to /dist
npm run preview      # Preview the production build locally
```

Deploy the `/dist` folder to Vercel, Netlify, or any static host.

---

## Dependencies

| Package | Purpose |
|---|---|
| `framer-motion` | Page transitions and scroll-triggered animations |
| `lucide-react` | Icon set |
| `tailwindcss` | Utility-first styling |
| `typescript` (strict) | Type safety throughout |
