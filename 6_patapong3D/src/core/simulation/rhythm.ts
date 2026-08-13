/**
 * core/simulation/rhythm.ts - v2.0 beat scrolling + timing-only judgement
 *
 * v2.0: the drums are the input grammar, so judgement is TIMING-ONLY - any
 * of the 4 keys inside the beat window counts. The key pressed is recorded
 * into the 4-beat command sequence by Simulation.
 */

import {
  JUDGE_GOOD_WINDOW_MS,
  JUDGE_NORMAL_WINDOW_MS,
  JUDGE_PERFECT_WINDOW_MS,
} from '../constants';
import type { Judgement, Note, RhythmState } from '../types';

export function stepRhythm(state: RhythmState, dt: number): void {
  state.songTime += dt;
  const chart = state.charts[state.songIndex];
  if (!chart) return;
  for (const note of chart.notes) {
    if (!note.resolved) {
      note.timeToHit -= dt;
    }
  }
}

/** Find the current beat (skips resolved notes and advances the index). */
export function getActiveNote(state: RhythmState): Note | null {
  const chart = state.charts[state.songIndex];
  if (!chart) return null;
  while (
    state.activeNoteIndex < chart.notes.length &&
    chart.notes[state.activeNoteIndex]?.resolved
  ) {
    state.activeNoteIndex++;
  }
  return chart.notes[state.activeNoteIndex] ?? null;
}

/**
 * Judge a drum tap against the active beat. v2.0: the pressed key does NOT
 * need to match the note glyph - only timing matters (Patapon drum model).
 */
export function judgeBeat(activeNote: Note): Judgement {
  const diff = Math.abs(activeNote.timeToHit * 1000);
  if (diff <= JUDGE_PERFECT_WINDOW_MS) return 300;
  if (diff <= JUDGE_GOOD_WINDOW_MS) return 100;
  if (diff <= JUDGE_NORMAL_WINDOW_MS) return 50;
  return 0;
}

/** Player pressed a drum with no beat in range -> miss. */
export function judgeEmptyPress(): Judgement {
  return 0;
}
