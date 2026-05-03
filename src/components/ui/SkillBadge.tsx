import type { Skill, SkillLevel } from '../../types';

interface SkillBadgeProps {
  readonly skill: Skill;
  readonly accentColor?: string;
  readonly index?: number;
}

const LEVEL_CONFIG: Record<SkillLevel, { dots: number; label: string; classes: string }> = {
  expert:       { dots: 5, label: 'Expert',       classes: 'border-accent/40 bg-accent/10 text-accent'            },
  advanced:     { dots: 4, label: 'Advanced',     classes: 'border-violet-400/40 bg-violet-400/10 text-violet-300' },
  intermediate: { dots: 3, label: 'Intermediate', classes: 'border-slate-500/60 bg-slate-700/40 text-slate-300'    },
};

/**
 * Individual skill chip with a level indicator (filled dots).
 * The visual style is derived from the skill's level automatically.
 */
export function SkillBadge({ skill, index = 0 }: SkillBadgeProps): React.ReactElement {
  const config = LEVEL_CONFIG[skill.level];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-body font-medium
        transition-all duration-200 hover:scale-105 hover:shadow-glow-sm cursor-default
        ${config.classes}`}
      style={{
        animationDelay: `${index * 60}ms`,
      }}
      title={`${skill.name} — ${config.label}`}
    >
      <span>{skill.name}</span>
      <div className="flex gap-0.5 ml-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`w-1 h-1 rounded-full transition-colors ${
              i < config.dots ? 'bg-current opacity-80' : 'bg-current opacity-20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
