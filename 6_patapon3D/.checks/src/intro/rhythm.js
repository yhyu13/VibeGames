export const BEAT_SECONDS = 1;
export const HIT_WINDOW_SECONDS = 0.22;
export function distanceToBeat(clock) {
    return Math.min(clock, BEAT_SECONDS - clock);
}
export function isInHitWindow(clock) {
    return distanceToBeat(clock) <= HIT_WINDOW_SECONDS;
}
