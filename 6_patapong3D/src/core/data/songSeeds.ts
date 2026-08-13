/**
 * core/data/songSeeds.ts - v2.0 song metadata
 *
 * Density = beats per second. v2.0 uses denser charts (0.8-1.2 beats/s) so a
 * 4-beat command resolves every ~3-5s (Patapon drum cadence).
 */

export interface SongMeta {
  index: number;
  name: string;
  seed: number;
  density: number;
  flavor?: string;
}

export const SONG_META: readonly SongMeta[] = [
  { index: 0, name: 'Pata Plains', seed: 1001, density: 0.8, flavor: 'Warm-up' },
  { index: 1, name: 'Chaka Storm', seed: 1002, density: 1.0, flavor: 'Bumpy' },
  { index: 2, name: 'Pon Finale', seed: 1003, density: 1.2, flavor: 'Frenzy' },
] as const;
