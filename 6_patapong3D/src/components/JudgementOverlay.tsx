/**
 * components/JudgementOverlay.tsx - floating judgement text
 *
 * Consumes store.judgementFeed (pushed by GameEngine from beatHit/playerMiss),
 * so this component never touches Simulation or window.__sim (C.A.T rule 4).
 * Floaters live ~0.6s and drift upward.
 */

import { useEffect, useRef, useState } from 'react';
import { usePatapongStore } from '../store';
import type { Judgement, NoteType } from '../core/types';

interface FloatingText {
  id: number;
  text: string;
  color: string;
  size: number;
  bornAt: number; // ms
}

const DURATION_MS = 600;
const MAX_FLOATERS = 6;

const COLORS: Record<Judgement, { color: string; size: number }> = {
  300: { color: '#ffd83a', size: 64 }, // PERFECT
  100: { color: '#ff8a3a', size: 48 }, // GOOD
  50: { color: '#ffffff', size: 40 }, // NORMAL
  0: { color: '#ff3a3a', size: 32 }, // MISS
};

const TYPE_LABEL: Record<NoteType, string> = {
  PATA: 'PATA',
  PON: 'PON',
  DON: 'DON',
  CHAKA: 'CHAKA',
};

export function JudgementOverlay() {
  const phase = usePatapongStore((s) => s.phase);
  const judgementFeed = usePatapongStore((s) => s.judgementFeed);
  const [floaters, setFloaters] = useState<FloatingText[]>([]);
  const lastSeenId = useRef(-1);

  // Consume each feed item exactly once
  useEffect(() => {
    if (!judgementFeed || judgementFeed.id === lastSeenId.current) return;
    lastSeenId.current = judgementFeed.id;
    const { judgement, type, combo } = judgementFeed;
    const base = COLORS[judgement] ?? COLORS[0]!;
    const label =
      judgement === 300
        ? 'PERFECT!'
        : judgement === 100
          ? 'GOOD'
          : type
            ? `${TYPE_LABEL[type]}`
            : 'MISS';
    const text = combo > 0 && judgement === 300 ? `${label} x${combo}` : label;
    setFloaters((prev) => [...prev.slice(-(MAX_FLOATERS - 1)), {
      id: judgementFeed.id,
      text,
      color: base.color,
      size: base.size,
      bornAt: performance.now(),
    }]);
  }, [judgementFeed]);

  // Age out old floaters
  useEffect(() => {
    if (phase !== 'SONG') {
      setFloaters([]);
      return;
    }
    const id = setInterval(() => {
      const now = performance.now();
      setFloaters((prev) => prev.filter((f) => now - f.bornAt < DURATION_MS));
    }, 80);
    return () => clearInterval(id);
  }, [phase]);

  if (phase !== 'SONG') return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/3 flex flex-col items-center gap-1">
      {floaters.map((f) => {
        const age = (performance.now() - f.bornAt) / DURATION_MS;
        const opacity = Math.max(0, 1 - age);
        const lift = -40 * age;
        return (
          <span
            key={f.id}
            className="judge-pop font-arcade font-black italic"
            style={{
              fontSize: f.size,
              color: f.color,
              opacity,
              transform: `translateY(${lift}px)`,
              textShadow: `0 0 20px ${f.color}, 0 0 8px ${f.color}`,
            }}
          >
            {f.text}
          </span>
        );
      })}
    </div>
  );
}
