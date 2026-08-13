/**
 * core/simulation/songGenerator.ts - generate charts for the 3 songs (seed-reproducible)
 *
 * Frozen interface: TDD 5.6. v1.0.1 fix:
 * - notes are ordered "first to hit first": notes[i].timeToHit = interval * (i + 1), ascending;
 *   timeToHit means "seconds after song start when the note reaches the hit zone".
 * - generateCharts(seed) / generateSongChart(songIndex, seed) match TDD 5.6 signatures.
 */

import { SONG_DURATION_S } from '../constants';
import { SONG_META } from '../data/songSeeds';
import { makeRng } from '../math';
import type { Chart, Lane, Note, NoteType } from '../types';

/** lane index -> NoteType (keep in sync with Simulation.NOTE_LANES / RhythmBar / NoteRenderer) */
const NOTE_TYPES: readonly NoteType[] = ['PATA', 'PON', 'DON', 'CHAKA'];

/** Generate one song's chart (4-key random, density from SONG_META). */
export function generateSongChart(songIndex: number, seed: number): Chart {
  const meta = SONG_META[songIndex];
  if (!meta) {
    throw new Error(`songGenerator: no SONG_META for index ${songIndex}`);
  }
  const rng = makeRng(seed);
  const count = Math.max(1, Math.floor(meta.density * SONG_DURATION_S));
  const interval = SONG_DURATION_S / count;
  const notes: Note[] = [];
  for (let i = 0; i < count; i++) {
    const laneIdx = Math.floor(rng() * NOTE_TYPES.length);
    const lane = laneIdx as Lane;
    const type = NOTE_TYPES[laneIdx] ?? 'PATA';
    notes.push({
      type,
      lane,
      timeToHit: interval * (i + 1),
      resolved: false,
      judgement: 0,
      resolvedBy: null,
    });
  }
  return { notes, duration: SONG_DURATION_S, density: meta.density };
}

/** Generate all 3 songs' charts (config.seed is mixed into each song's meta.seed). */
export function generateCharts(seed: number): Chart[] {
  return SONG_META.map((meta) => generateSongChart(meta.index, meta.seed + seed));
}
