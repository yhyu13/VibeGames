// Puzzle base interface and helpers.

import type { PuzzleKind, PuzzleOutcome } from '../types.js';
import type { RNG } from '../rng.js';

export interface PuzzleState {
  id: string;
  kind: PuzzleKind;
  remaining: number;       // timer in seconds
  success: boolean | null;
  outcome: PuzzleOutcome | null;
  data: Record<string, unknown>;
}

export interface PuzzleInit {
  id: string;
  kind: PuzzleKind;
  seed: number;
  timer: number;
}

export type PuzzleUpdate = (state: PuzzleState, dt: number, input: PuzzleInput, detectionBoost?: number) => PuzzleState;

export interface PuzzleInput {
  primary: boolean;
  secondary: boolean;
  cursor: { x: number; y: number };
}

export function emptyOutcome(): PuzzleOutcome {
  return {
    networkDelta: 0,
    unityDelta: 0,
    resolveDelta: 0,
    panicDelta: 0,
  };
}

export function addOutcome(a: PuzzleOutcome, b: PuzzleOutcome): PuzzleOutcome {
  const out: PuzzleOutcome = {
    networkDelta: a.networkDelta + b.networkDelta,
    unityDelta: a.unityDelta + b.unityDelta,
    resolveDelta: a.resolveDelta + b.resolveDelta,
    panicDelta: a.panicDelta + b.panicDelta,
  };
  if (b.disableDefense !== undefined) out.disableDefense = b.disableDefense;
  else if (a.disableDefense !== undefined) out.disableDefense = a.disableDefense;
  if (b.revealIntel !== undefined) out.revealIntel = b.revealIntel;
  else if (a.revealIntel !== undefined) out.revealIntel = a.revealIntel;
  return out;
}