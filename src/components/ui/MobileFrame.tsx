import { motion } from 'framer-motion';

interface MobileFrameProps {
  /** Array of screenshot URLs; first is shown by default */
  readonly screenshots: readonly string[];
  /** Optional className for sizing / positioning */
  readonly className?: string;
}

/**
 * Renders a realistic phone mockup frame around screenshot images.
 * Shows the first screenshot; expands to a small gallery on the side on wide viewports.
 * Uses a pure CSS/SVG approach — no image assets needed.
 */
export function MobileFrame({ screenshots, className = '' }: MobileFrameProps): React.ReactElement {
  const primary = screenshots[0];
  const hasPlaceholder = !primary || primary.startsWith('/screenshots/');
  // Treat /screenshots/* as placeholder paths that may not exist yet
  const showPlaceholder = hasPlaceholder;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-[44px] bg-accent/10 blur-2xl scale-95 pointer-events-none" />

      {/* Phone shell */}
      <motion.div
        className="relative w-[220px] h-[470px] rounded-[44px] bg-surface-2 border-2 border-surface-3 shadow-card overflow-hidden"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
      >
        {/* Dynamic island / notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-surface rounded-full z-10 flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-surface-3" />
          <div className="w-1.5 h-1.5 rounded-full bg-surface-3/60" />
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 rounded-[42px] overflow-hidden">
          {showPlaceholder ? (
            <PlaceholderScreen />
          ) : (
            <img
              src={primary}
              alt="App screenshot"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          )}
        </div>

        {/* Side buttons (decorative) */}
        <div className="absolute right-[-3px] top-28 w-[3px] h-8 bg-surface-3 rounded-l-sm" />
        <div className="absolute left-[-3px] top-20 w-[3px] h-6 bg-surface-3 rounded-r-sm" />
        <div className="absolute left-[-3px] top-28 w-[3px] h-10 bg-surface-3 rounded-r-sm" />

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-surface-4 rounded-full" />
      </motion.div>

      {/* Thumbnail strip for additional screenshots */}
      {screenshots.length > 1 && (
        <div className="absolute right-[-56px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {screenshots.slice(1, 4).map((src, i) => (
            <div
              key={i}
              className="w-10 h-20 rounded-lg bg-surface-2 border border-surface-3 overflow-hidden opacity-60 hover:opacity-100 transition-opacity"
            >
              <img
                src={src}
                alt={`Screenshot ${i + 2}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Shown when no real screenshot URL is provided yet */
function PlaceholderScreen(): React.ReactElement {
  return (
    <div className="w-full h-full bg-gradient-to-b from-surface-2 to-surface flex flex-col">
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-9 pb-2 opacity-40">
        <span className="font-mono text-[9px] text-text-secondary">9:41</span>
        <div className="flex gap-1">
          {[3, 2, 1.5].map((h, i) => (
            <div key={i} className="w-1 bg-text-secondary rounded-sm" style={{ height: `${h * 4}px` }} />
          ))}
        </div>
      </div>

      {/* App header skeleton */}
      <div className="px-4 pt-2">
        <div className="h-2.5 w-24 bg-accent/30 rounded mb-1" />
        <div className="h-1.5 w-16 bg-surface-3 rounded" />
      </div>

      {/* Content skeletons */}
      <div className="px-4 pt-4 flex flex-col gap-3 flex-1">
        {[80, 60, 90, 50, 70].map((w, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-lg bg-surface-3 flex-shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="h-1.5 rounded bg-surface-3" style={{ width: `${w}%` }} />
              <div className="h-1 rounded bg-surface-3/60" style={{ width: `${w - 20}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav skeleton */}
      <div className="flex justify-around items-center px-4 py-3 border-t border-surface-3/40">
        {[true, false, false, false].map((active, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-5 h-5 rounded-md ${active ? 'bg-accent/50' : 'bg-surface-3'}`} />
            <div className={`h-1 w-4 rounded ${active ? 'bg-accent/30' : 'bg-surface-3/60'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
