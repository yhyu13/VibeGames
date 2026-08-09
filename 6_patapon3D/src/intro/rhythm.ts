export const BEAT_SECONDS = 1;
export const HIT_WINDOW_SECONDS = 0.22;
export type TimingGrade = 'PERFECT' | 'GOOD' | 'OK' | 'OFF BEAT';
export type IntroCommandName = 'ATTACK' | 'MARCH' | 'DEFEND' | 'CHARGE' | 'RALLY' | 'VOLLEY' | 'RETREAT' | 'BERSERK' | 'HEAVY' | 'MIRACLE';
export interface IntroCommand { readonly name: IntroCommandName; readonly keys: readonly string[]; readonly notes: readonly string[]; }
export const INTRO_COMMANDS: readonly IntroCommand[] = [
  { name: 'ATTACK', keys: ['W', 'A', 'W', 'A'], notes: ['PATA', 'PON', 'PATA', 'PON'] },
  { name: 'MARCH', keys: ['W', 'W', 'W', 'A'], notes: ['PATA', 'PATA', 'PATA', 'PON'] },
  { name: 'DEFEND', keys: ['A', 'A', 'W', 'W'], notes: ['PON', 'PON', 'PATA', 'PATA'] },
  { name: 'CHARGE', keys: ['W', 'W', 'W', 'D'], notes: ['PATA', 'PATA', 'PATA', 'CHAKA'] },
  { name: 'RALLY', keys: ['A', 'A', 'A', 'A'], notes: ['PON', 'PON', 'PON', 'PON'] },
  { name: 'VOLLEY', keys: ['D', 'D', 'W', 'W'], notes: ['CHAKA', 'CHAKA', 'PATA', 'PATA'] },
  { name: 'RETREAT', keys: ['A', 'A', 'D', 'D'], notes: ['PON', 'PON', 'CHAKA', 'CHAKA'] },
  { name: 'BERSERK', keys: ['W', 'W', 'A', 'A'], notes: ['PATA', 'PATA', 'PON', 'PON'] },
  { name: 'HEAVY', keys: ['A', 'W', 'A', 'D'], notes: ['PON', 'PATA', 'PON', 'CHAKA'] },
  { name: 'MIRACLE', keys: ['D', 'S', 'W', 'A'], notes: ['CHAKA', 'DON', 'PATA', 'PON'] },
];
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
export function resolveIntroCommand(input: readonly string[]): IntroCommand | null {
  return INTRO_COMMANDS.find((command) => command.keys.every((key, index) => key === input[index])) ?? null;
}

export function distanceToBeat(clock: number): number {
  const phase = ((clock % BEAT_SECONDS) + BEAT_SECONDS) % BEAT_SECONDS;
  return Math.min(phase, BEAT_SECONDS - phase);
}

export function isInHitWindow(clock: number): boolean {
  return distanceToBeat(clock) <= HIT_WINDOW_SECONDS;
}
