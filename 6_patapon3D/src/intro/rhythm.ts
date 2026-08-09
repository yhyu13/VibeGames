export const BEAT_SECONDS = 1;
export const HIT_WINDOW_SECONDS = 0.22;

export function distanceToBeat(clock: number): number {
  return Math.min(clock, BEAT_SECONDS - clock);
}

export function isInHitWindow(clock: number): boolean {
  return distanceToBeat(clock) <= HIT_WINDOW_SECONDS;
}
