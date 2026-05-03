import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, MapPin, Clock } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { useClipboard } from '../../hooks/useClipboard';
import { CONTACT_LINKS, PERSONAL_INFO } from '../../data/constants';

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Mail, Github, Linkedin,
};

export function Contact(): React.ReactElement {
  const { copied, copy } = useClipboard();

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2
                   w-[400px] h-[300px] rounded-full bg-accent/8 blur-[80px] pointer-events-none"
      />

      <div className="max-w-3xl mx-auto">
        <SectionTitle
          label="05 / Contact"
          title="Get In Touch"
          subtitle="Open to senior Flutter roles, technical lead positions, and consulting engagements."
          align="center"
        />

        {/* Location + availability chips */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 border border-surface-3 text-xs text-text-secondary">
            <MapPin size={12} className="text-text-muted" />
            {PERSONAL_INFO.location}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-xs text-accent">
            <Clock size={12} />
            {PERSONAL_INFO.availability}
          </div>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          className="mt-10 grid sm:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          {CONTACT_LINKS.map((link, i) => {
            const Icon = ICON_MAP[link.icon] ?? Mail;
            const isEmail = link.id === 'email';

            return (
              <motion.div
                key={link.id}
                className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl
                           bg-surface-2 border border-surface-3/80
                           hover:border-accent/30 hover:shadow-glow-sm
                           transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center
                                group-hover:bg-accent/20 transition-colors">
                  <Icon size={20} className="text-accent" />
                </div>

                <div className="text-center">
                  <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">
                    {link.label}
                  </div>
                  <div className="text-sm text-text-secondary font-medium break-all">
                    {link.value}
                  </div>
                </div>

                {/* Action button */}
                {isEmail ? (
                  <button
                    onClick={() => copy(link.value)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                               bg-surface border border-surface-3 text-text-secondary
                               hover:border-accent/40 hover:text-accent transition-all duration-200"
                    aria-label="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copy
                      </>
                    )}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                               bg-surface border border-surface-3 text-text-secondary
                               hover:border-accent/40 hover:text-accent transition-all duration-200"
                  >
                    Open ↗
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-mono text-xs text-text-muted">
            Built with React, TypeScript & Tailwind CSS
            <span className="text-accent"> · </span>
            Designed with intent
          </p>
        </motion.div>
      </div>
    </section>
  );
}
