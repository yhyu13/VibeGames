/**
 * core/simulation/fever.ts - v2.0 Fever state machine
 *
 * Combo = consecutive successful beats. Triggers at 8/16/24 (FEVER_TRIGGERS).
 * MIRACLE command can force-start Fever via startFeverAtLevel.
 */

import { FEVER_DURATIONS, FEVER_SLOWMO_FACTORS, FEVER_TRIGGERS } from '../constants';
import type { FeverState, SimEvent } from '../types';
import { emitFeverStartJuice } from './juiceEvents';

export function tickFever(
  state: FeverState,
  dt: number,
  emit: (e: SimEvent) => void,
): void {
  if (!state.active) return;
  state.timeLeft -= dt;
  if (state.timeLeft <= 0) {
    endFever(state, emit);
  }
}

export function startFeverIfComboReached(
  state: FeverState,
  combo: number,
  emit: (e: SimEvent) => void,
): void {
  if (state.active) return;
  const idx = FEVER_TRIGGERS.indexOf(combo as (typeof FEVER_TRIGGERS)[number]);
  if (idx < 0) return;
  startFeverAtLevel(state, idx, emit);
}

/** Force-start Fever at a trigger level (MIRACLE uses level 2). */
export function startFeverAtLevel(
  state: FeverState,
  level: number,
  emit: (e: SimEvent) => void,
): void {
  if (state.active) return;
  state.active = true;
  state.factor = FEVER_SLOWMO_FACTORS[level] ?? 0.6;
  state.timeLeft = FEVER_DURATIONS[level] ?? 3.0;
  state.level = level;
  emit({ type: 'feverStart', payload: { level, duration: state.timeLeft } });
  emitFeverStartJuice(level, emit);
}

export function endFever(state: FeverState, emit: (e: SimEvent) => void): void {
  if (!state.active) return;
  state.active = false;
  state.factor = 1;
  state.timeLeft = 0;
  state.level = 0;
  emit({ type: 'feverEnd', payload: {} });
}
