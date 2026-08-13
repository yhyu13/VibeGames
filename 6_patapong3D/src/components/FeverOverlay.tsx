/**
 * components/FeverOverlay.tsx - "FEVER!" big text (TDD module tree deliverable)
 *
 * Reads only the zustand store: shows while fever.active, fades out shortly
 * after it ends. Level 0-3 maps to FEVER!/FEVER!!/FEVER!!!/MAX FEVER!!!
 */

import { useEffect, useState } from 'react';
import { usePatapongStore } from '../store';

const LABELS = ['FEVER!', 'FEVER!!', 'FEVER!!!', 'MAX FEVER!!!'] as const;

export function FeverOverlay() {
  const phase = usePatapongStore((s) => s.phase);
  const fever = usePatapongStore((s) => s.fever);
  const [visible, setVisible] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (phase !== 'SONG') {
      setVisible(false);
      return;
    }
    if (fever.active) {
      setLevel(fever.level);
      setVisible(true);
      return;
    }
    const t = window.setTimeout(() => setVisible(false), 800);
    return () => window.clearTimeout(t);
  }, [phase, fever.active, fever.level]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[18%] flex justify-center">
      <span
        key={level}
        className="fever-pop font-arcade text-6xl font-black italic tracking-tight text-[#ffd83a] [text-shadow:0_0_24px_#ffd83a,0_0_60px_#ff3aaa]"
      >
        {LABELS[level] ?? 'FEVER!'}
      </span>
    </div>
  );
}
