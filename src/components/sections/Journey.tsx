import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Milestone } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { TIMELINE_ITEMS } from '../../data/constants';
import type { TimelineItemType } from '../../types';

// ─── Type icon map ────────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<
  TimelineItemType,
  { Icon: React.ElementType; colorClass: string; bgClass: string }
> = {
  education: {
    Icon: GraduationCap,
    colorClass: 'text-violet-400',
    bgClass: 'bg-violet-500/15 border-violet-500/30',
  },
  work: {
    Icon: Briefcase,
    colorClass: 'text-accent',
    bgClass: 'bg-accent/15 border-accent/30',
  },
  milestone: {
    Icon: Milestone,
    colorClass: 'text-amber-400',
    bgClass: 'bg-amber-500/15 border-amber-500/30',
  },
};

export function Journey(): React.ReactElement {
  return (
    <section
      id="journey"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          label="04 / Journey"
          title="Academic & Professional Path"
          subtitle="From project management to specialized Flutter architecture — a deliberate career built on curiosity and depth."
        />

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Vertical line */}
          <div
            className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0
                       w-px bg-gradient-to-b from-accent/60 via-surface-3 to-transparent"
          />

          <div className="flex flex-col gap-0">
            {TIMELINE_ITEMS.map((item, index) => {
              const config = TYPE_CONFIG[item.type];
              const isRight = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  className="relative flex md:items-center gap-4 md:gap-0 pb-10"
                  initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* ── Timeline node ─────────────────────────────────────── */}
                  <div
                    className="relative z-10 shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center
                                md:absolute md:left-1/2 md:-translate-x-1/2
                                shadow-card"
                    style={{ marginTop: '4px' }}
                    {...{ className: `relative z-10 shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2 shadow-card ${config.bgClass}` }}
                  >
                    <config.Icon size={16} className={config.colorClass} />

                    {/* Pulse ring for highlights */}
                    {item.highlight && (
                      <span className="absolute inset-0 rounded-xl border border-current opacity-30 animate-ping" />
                    )}
                  </div>

                  {/* ── Content card ──────────────────────────────────────── */}
                  <div
                    className={`flex-1 md:w-[calc(50%-3rem)]
                      ${isRight ? 'md:mr-auto md:pr-10 md:text-right' : 'md:ml-auto md:pl-10 md:text-left'}`}
                  >
                    <div
                      className={`p-4 rounded-2xl border transition-all duration-200
                        hover:border-accent/20 hover:shadow-card
                        ${item.highlight
                          ? 'bg-surface-2 border-accent/20'
                          : 'bg-surface-2/60 border-surface-3/60'
                        }`}
                    >
                      {/* Year badge + title */}
                      <div className={`flex items-center gap-2 mb-1 ${isRight ? 'md:justify-end' : ''}`}>
                        <span className="font-mono text-xs text-text-muted border border-surface-3 rounded-md px-2 py-0.5">
                          {item.year}
                        </span>
                        {item.highlight && (
                          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                            ★ Key Event
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-text-primary text-sm leading-tight">
                        {item.title}
                      </h3>
                      <p className={`text-xs text-text-secondary mt-0.5 ${config.colorClass}`}>
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-text-muted leading-relaxed mt-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className={`flex flex-wrap gap-1 mt-3 ${isRight ? 'md:justify-end' : ''}`}>
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-surface/60 border border-surface-3/40
                                         font-mono text-[10px] text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
