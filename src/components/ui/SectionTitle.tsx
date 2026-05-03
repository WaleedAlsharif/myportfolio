import { motion } from 'framer-motion';

interface SectionTitleProps {
  readonly label: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly align?: 'left' | 'center';
}

/**
 * Consistent animated section heading used across all portfolio sections.
 * Accepts a decorative label (e.g. "02 / Stack"), a main title, and an optional subtitle.
 */
export function SectionTitle({
  label,
  title,
  subtitle,
  align = 'left',
}: SectionTitleProps): React.ReactElement {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start';

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Decorative label */}
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
        {label}
      </span>

      {/* Main heading */}
      <h2 className="font-display text-display-lg font-bold text-text-primary leading-tight">
        {title}
      </h2>

      {/* Accent underline */}
      <div
        className={`h-px w-16 bg-gradient-to-r from-accent to-transparent ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />

      {/* Optional subtitle */}
      {subtitle && (
        <p className="text-text-secondary text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
