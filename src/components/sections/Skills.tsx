import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { SkillBadge } from '../ui/SkillBadge';
import { SKILL_GROUPS } from '../../data/constants';

// Maps accentColor string to Tailwind gradient classes
const GRADIENT_MAP: Record<string, string> = {
  cyan:    'from-cyan-500/20 to-transparent border-cyan-500/20',
  violet:  'from-violet-500/20 to-transparent border-violet-500/20',
  emerald: 'from-emerald-500/20 to-transparent border-emerald-500/20',
  amber:   'from-amber-500/20 to-transparent border-amber-500/20',
};

const ICON_BG_MAP: Record<string, string> = {
  cyan:    'bg-cyan-500/15 border-cyan-500/30',
  violet:  'bg-violet-500/15 border-violet-500/30',
  emerald: 'bg-emerald-500/15 border-emerald-500/30',
  amber:   'bg-amber-500/15 border-amber-500/30',
};

export function Skills(): React.ReactElement {
  return (
    <section
      id="skills"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="02 / Stack"
          title="Engineering Stack"
          subtitle="Tools, patterns, and platforms I use to architect and ship production-grade mobile software."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_GROUPS.map((group, groupIndex) => {
            const gradientClass = GRADIENT_MAP[group.accentColor] ?? GRADIENT_MAP['cyan'];
            const iconBgClass = ICON_BG_MAP[group.accentColor] ?? ICON_BG_MAP['cyan'];

            return (
              <motion.div
                key={group.id}
                className={`relative flex flex-col gap-4 p-5 rounded-2xl border
                            bg-gradient-to-br ${gradientClass} bg-surface-2/60`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: groupIndex * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Domain header */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg ${iconBgClass}`}>
                    {group.icon}
                  </div>
                  <h3 className="font-display font-bold text-sm text-text-primary leading-tight">
                    {group.domain}
                  </h3>
                </div>

                {/* Divider */}
                <div className="h-px bg-surface-3/60" />

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skill.name}
                      skill={skill}
                      accentColor={group.accentColor}
                      index={groupIndex * 10 + skillIndex}
                    />
                  ))}
                </div>

                {/* Count indicator */}
                <div className="mt-auto pt-2 text-right">
                  <span className="font-mono text-[11px] text-text-muted">
                    {group.skills.length} skills
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Level:</span>
          {(
            [
              { label: 'Expert', dots: 5, color: 'bg-accent' },
              { label: 'Advanced', dots: 4, color: 'bg-violet-400' },
              { label: 'Intermediate', dots: 3, color: 'bg-slate-400' },
            ] as const
          ).map(({ label, dots, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i < dots ? color : 'bg-surface-3'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-text-muted font-body">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
