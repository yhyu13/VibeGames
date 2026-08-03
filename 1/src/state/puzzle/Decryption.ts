// Signal Decryption puzzle: stub for non-MVP per GDD §9.4.
// Implements minimal version to satisfy the Puzzle interface.

import type { PuzzleState, PuzzleInput, PuzzleUpdate } from './Puzzle.js';
import { emptyOutcome } from './Puzzle.js';

export function initDecryption(id: string, _seed: number, timer: number): PuzzleState {
  return {
    id,
    kind: 'decryption',
    remaining: timer,
    success: null,
    outcome: null,
    data: {},
  };
}

export const updateDecryption: PuzzleUpdate = (state, dt) => {
  state.remaining -= dt;
  if (state.remaining <= 0) {
    state.success = false;
    state.outcome = emptyOutcome();
  }
  return state;
};