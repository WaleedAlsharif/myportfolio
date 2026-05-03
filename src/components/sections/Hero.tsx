import { motion } from 'framer-motion';
import { ArrowDown, Download, Code2 } from 'lucide-react';
import { AnimatedTerminal } from '../ui/AnimatedTerminal';
import { PERSONAL_INFO, TERMINAL_LINES } from '../../data/constants';
import type { SectionId } from '../../types';

interface HeroProps {
  readonly onNavigate: (id: SectionId) => void;
}

// Staggered children animation variant
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ onNavigate }: HeroProps): React.ReactElement {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center
                 px-4 sm:px-6 pt-20 pb-32 md:pb-20 overflow-hidden"
    >
      {/* ── Background effects ───────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      {/* Floating orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[500px] h-[500px] rounded-full
                   bg-accent/5 blur-[120px] pointer-events-none animate-pulse-glow"
      />

      {/* Floating code fragments (decorative) */}
      <FloatingFragment text="bloc.add(FetchEvent())" top="12%" left="5%" delay={0} />
      <FloatingFragment text="extends StatelessWidget" top="25%" right="4%" delay={1.2} />
      <FloatingFragment text="@override build(ctx)" top="70%" left="3%" delay={0.6} />
      <FloatingFragment text="final repo = ref.watch(...)" top="78%" right="5%" delay={1.8} />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Availability badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {PERSONAL_INFO.availability}
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants}>
          <h1 className="font-display font-extrabold text-display-xl text-text-primary">
            {PERSONAL_INFO.name}
          </h1>
        </motion.div>

        {/* Title line */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-2">
          <span className="font-display text-display-md font-semibold text-text-primary">
            {PERSONAL_INFO.title}
          </span>
          <span className="hidden sm:block text-text-muted font-light">—</span>
          <span className="font-display text-display-md font-semibold bg-gradient-to-r from-accent to-cyan-300 bg-clip-text text-transparent">
            {PERSONAL_INFO.subtitle}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-lg leading-relaxed max-w-xl"
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        {/* Terminal */}
        <motion.div variants={itemVariants} className="w-full max-w-md">
          <AnimatedTerminal lines={TERMINAL_LINES} />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-accent text-surface font-display font-semibold text-sm
                       hover:bg-cyan-300 hover:shadow-glow-md transition-all duration-200"
          >
            <Code2 size={16} />
            View Case Studies
          </button>

          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-surface-2 border border-surface-3 text-text-primary font-display font-semibold text-sm
                       hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"
          >
            <Download size={16} />
            Resume
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          variants={itemVariants}
          onClick={() => onNavigate('skills')}
          className="flex flex-col items-center gap-2 text-text-muted text-xs font-mono
                     hover:text-accent transition-colors group mt-4"
          aria-label="Scroll to skills"
        >
          <span className="tracking-widest uppercase">Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} className="group-hover:text-accent transition-colors" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}

// ─── Floating code fragment ────────────────────────────────────────────────
interface FloatingFragmentProps {
  text: string;
  top?: string;
  left?: string;
  right?: string;
  delay: number;
}

function FloatingFragment({ text, top, left, right, delay }: FloatingFragmentProps): React.ReactElement {
  return (
    <motion.div
      className="absolute hidden lg:block font-mono text-xs text-surface-4/70
                 bg-surface-2/40 border border-surface-3/30 rounded-lg px-3 py-1.5
                 pointer-events-none select-none backdrop-blur-sm"
      style={{ top, left, right }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 1.5, duration: 1 }}
    >
      <motion.span
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 4, delay, ease: 'easeInOut' }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
