export const BEAT_SECONDS = 1;
export const HIT_WINDOW_SECONDS = 0.22;
export type TimingGrade = 'PERFECT' | 'GOOD' | 'OK' | 'OFF BEAT';
export function timingGrade(distanceSeconds: number): TimingGrade {
  const ms = Math.abs(distanceSeconds) * 1000;
  return ms <= 80 ? 'PERFECT' : ms <= 160 ? 'GOOD' : ms <= 300 ? 'OK' : 'OFF BEAT';
}
export function timingPower(grade: TimingGrade): number {
  return { PERFECT: 1, GOOD: 0.75, OK: 0.5, 'OFF BEAT': 0.25 }[grade];
}

export function debrisCountForPower(power: number): number {
  return Math.round(20 + Math.min(1, Math.max(0, power)) * 44);
}

export function acceptsNextNote<T>(command: readonly T[], inputLength: number, note: T): boolean {
  return command[inputLength] === note;
}

export function distanceToBeat(clock: number): number {
  const phase = ((clock % BEAT_SECONDS) + BEAT_SECONDS) % BEAT_SECONDS;
  return Math.min(phase, BEAT_SECONDS - phase);
}

export function isInHitWindow(clock: number): boolean {
  return distanceToBeat(clock) <= HIT_WINDOW_SECONDS;
}
