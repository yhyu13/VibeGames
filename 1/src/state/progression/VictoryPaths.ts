// Victory path progress math and ending detection.

import { signal } from '../signals.js';
import type { RunState, RunOutcome, VictoryProgress } from '../types.js';

export function emptyVictory(): VictoryProgress {
  return {
    annihilation: signal(0),
    submission: signal(0),
    digital: signal(0),
    fracture: signal(0),
  };
}

export function adjustAnnihilation(run: RunState, delta: number): void {
  run.victory.annihilation.value = Math.max(0, Math.min(1, run.victory.annihilation.peek() + delta));
}

export function adjustSubmission(run: RunState, delta: number): void {
  run.victory.submission.value = Math.max(0, Math.min(1, run.victory.submission.peek() + delta));
}

export function adjustDigital(run: RunState, delta: number): void {
  run.victory.digital.value = Math.max(0, Math.min(1, run.victory.digital.peek() + delta));
}

export function adjustFracture(run: RunState, delta: number): void {
  run.victory.fracture.value = Math.max(0, Math.min(1, run.victory.fracture.peek() + delta));
}

export function detectEnding(run: RunState): RunOutcome | null {
  const earth = run.earth;
  const v = run.victory;

  // Annihilation: planetary integrity at 0
  if (earth.planetaryIntegrity.peek() <= 0 && v.annihilation.peek() >= 0.5) {
    return { kind: 'annihilation' };
  }
  // Digital: network control at 1
  if (earth.networkControl.peek() >= 100) {
    return { kind: 'digital' };
  }
  // Submission: panic high, resolve low
  if (earth.globalPanic.peek() >= 80 && earth.humanResolve.peek() <= 20 && v.submission.peek() >= 0.5) {
    return { kind: 'submission' };
  }
  // Fracture: unity collapsed
  if (earth.humanUnity.peek() <= 10 && v.fracture.peek() >= 0.5) {
    return { kind: 'fracture' };
  }
  // Hybrid: digital + submission high + low resolve
  if (v.digital.peek() >= 0.7 && v.submission.peek() >= 0.5 && earth.humanResolve.peek() <= 30) {
    return { kind: 'hybrid', id: 'silent-takeover' };
  }
  return null;
}