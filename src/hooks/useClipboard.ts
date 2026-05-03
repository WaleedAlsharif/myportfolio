import { useState, useCallback } from 'react';

interface ClipboardResult {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

/**
 * Provides a copy-to-clipboard helper with temporary "copied" feedback state.
 * Resets after `resetDelay` ms (default 2000ms).
 */
export function useClipboard(resetDelay = 2000): ClipboardResult {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string): Promise<void> => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      } catch {
        // Fallback for older browsers / non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      }
    },
    [resetDelay]
  );

  return { copied, copy };
}
