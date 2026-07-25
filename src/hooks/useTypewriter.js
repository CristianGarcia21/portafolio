import { useEffect, useRef, useState } from 'react';

const TYPING_SPEED_MS = 110;
const DELETING_SPEED_MS = 55;
const PAUSE_AFTER_TYPING_MS = 1800;
const PAUSE_AFTER_DELETING_MS = 500;

function getPrefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Types `text` out character by character, pauses, deletes it back to
 * empty, pauses, then loops. Renders the full text immediately (no
 * animation) when the user has requested reduced motion.
 *
 * Phase/text bookkeeping lives in refs rather than the React state
 * updater, since a state updater's execution isn't guaranteed to run
 * synchronously right after the `setState` call — reading a ref mutated
 * inside the updater immediately afterwards is unreliable.
 */
export function useTypewriter(text) {
  const [prefersReducedMotion] = useState(getPrefersReducedMotion);
  const [displayText, setDisplayText] = useState(prefersReducedMotion ? text : '');
  const phaseRef = useRef('typing');
  const textRef = useRef(prefersReducedMotion ? text : '');

  useEffect(() => {
    if (prefersReducedMotion) {
      textRef.current = text;
      setDisplayText(text);
      return undefined;
    }

    phaseRef.current = 'typing';
    textRef.current = '';
    setDisplayText('');
    let timeoutId;

    const step = () => {
      const phase = phaseRef.current;
      let nextPhase = phase;
      let nextText = textRef.current;

      if (phase === 'typing') {
        nextText = text.slice(0, textRef.current.length + 1);
        nextPhase = nextText.length === text.length ? 'pausing-full' : 'typing';
      } else if (phase === 'deleting') {
        nextText = textRef.current.slice(0, -1);
        nextPhase = nextText.length === 0 ? 'pausing-empty' : 'deleting';
      } else if (phase === 'pausing-full') {
        nextPhase = 'deleting';
      } else {
        // pausing-empty
        nextPhase = 'typing';
      }

      textRef.current = nextText;
      phaseRef.current = nextPhase;
      setDisplayText(nextText);

      const delay =
        nextPhase === 'typing'
          ? TYPING_SPEED_MS
          : nextPhase === 'deleting'
            ? DELETING_SPEED_MS
            : nextPhase === 'pausing-full'
              ? PAUSE_AFTER_TYPING_MS
              : PAUSE_AFTER_DELETING_MS;

      timeoutId = setTimeout(step, delay);
    };

    timeoutId = setTimeout(step, TYPING_SPEED_MS);
    return () => clearTimeout(timeoutId);
  }, [text, prefersReducedMotion]);

  return displayText;
}
