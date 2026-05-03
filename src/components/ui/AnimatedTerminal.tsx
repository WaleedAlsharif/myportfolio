import { useState, useEffect, useRef } from 'react';

interface AnimatedTerminalProps {
  readonly lines: readonly string[];
  /** Typing speed in ms per character (default: 40) */
  readonly speed?: number;
  /** Pause between lines in ms (default: 800) */
  readonly linePause?: number;
}

interface TerminalLine {
  text: string;
  done: boolean;
}

/**
 * Simulates a terminal typewriter effect, cycling through multiple lines.
 * Each line is typed character-by-character, then pauses before the next.
 */
export function AnimatedTerminal({
  lines,
  speed = 40,
  linePause = 900,
}: AnimatedTerminalProps): React.ReactElement {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const targetText = lines[currentLine];

    if (currentChar < targetText.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          if (updated[currentLine]) {
            updated[currentLine] = {
              text: targetText.slice(0, currentChar + 1),
              done: false,
            };
          } else {
            updated.push({ text: targetText.slice(0, currentChar + 1), done: false });
          }
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, speed + Math.random() * 20); // Slight jitter for realism
    } else {
      // Line complete — mark done and advance
      timeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          if (updated[currentLine]) {
            updated[currentLine] = { ...updated[currentLine], done: true };
          }
          return updated;
        });
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, linePause);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLine, currentChar, lines, speed, linePause]);

  const isTyping = currentLine < lines.length;

  return (
    <div
      className="font-mono text-sm bg-surface-2/80 border border-surface-3 rounded-xl p-4
                 backdrop-blur-sm min-h-[120px] w-full max-w-md"
      role="log"
      aria-live="polite"
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-surface-3/60">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-text-muted text-xs">terminal</span>
      </div>

      {/* Lines */}
      <div className="flex flex-col gap-1">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex">
            <span
              className={`transition-colors duration-300 ${
                line.done ? 'text-text-secondary' : 'text-accent'
              }`}
            >
              {line.text}
            </span>
            {/* Cursor — only on current active line */}
            {i === currentLine && !line.done && (
              <span className="ml-0.5 w-2 h-4 bg-accent animate-cursor-blink inline-block" />
            )}
          </div>
        ))}

        {/* Idle cursor after all lines */}
        {!isTyping && (
          <div className="flex items-center">
            <span className="text-accent">{'>'}</span>
            <span className="ml-2 w-2 h-4 bg-accent animate-cursor-blink inline-block" />
          </div>
        )}
      </div>
    </div>
  );
}
