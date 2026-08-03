// Escalation phases and transition logic.

import type { EarthState, RunState } from '../types.js';
import { Env } from '../../app/Env.js';
import { pickCounter, telegraphCounter, activateCounter, type CounterDef } from './Counter.js';
import { createRng, type RNG } from '../rng.js';

const PHASE_NAMES = ['Detection', 'Mobilization', 'Unification', 'Retaliation', 'Final Countermeasure'] as const;

export function phaseName(p: 1 | 2 | 3 | 4 | 5): string {
  return PHASE_NAMES[p - 1] ?? 'Unknown';
}

let escalationRng: RNG = createRng(1);

export function setEscalationRng(rng: RNG): void {
  escalationRng = rng;
}

export function tickEscalation(run: RunState, dt: number): void {
  const earth = run.earth;
  earth.responseClock.value = Math.min(Env.RESPONSE_CLOCK_MAX, earth.responseClock.peek() + 0.005);

  const clock = earth.responseClock.peek();
  const phase = earth.escalationPhase.peek();

  if (phase === 1 && clock >= 20) escalateTo(run, 2);
  else if (phase === 2 && clock >= 40) escalateTo(run, 3);
  else if (phase === 3 && clock >= 60) escalateTo(run, 4);
  else if (phase === 4 && clock >= 80) escalateTo(run, 5);

  if (phase === 5 && clock >= Env.RESPONSE_CLOCK_MAX) {
    run.outcome.value = { kind: 'defeat', reason: 'counter' };
  }
}

export function escalateTo(run: RunState, to: 1 | 2 | 3 | 4 | 5): void {
  run.earth.escalationPhase.value = to;
  const next: CounterDef = pickCounter(run.earth.playerBehavior, escalationRng);
  if (to >= 2) {
    telegraphCounter(run.earth, next);
  }
  if (to >= 3) {
    activateCounter(run.earth, run.ship);
  }
}

export function abortRun(run: RunState, reason: 'hull' | 'instability' | 'counter' | 'mission'): void {
  run.outcome.value = { kind: 'defeat', reason };
}