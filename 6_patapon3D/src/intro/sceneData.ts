import type { Lane, NoteType, Vec3 } from './types';

export const COLORS = {
  BG_TOP: '#030812',
  FLOOR_BASE: '#10142a',
  FLOOR_LINE: '#ffd83a',
  NOTE_PATA: '#3affc8',
  NOTE_PON: '#ffd83a',
  NOTE_DON: '#3a8aff',
  NOTE_CHAKA: '#ff3a8a',
  ARMY: ['#3affc8', '#9aff3a', '#3ac8ff'],
  BOSS: '#d52c2c',
  BOSS_HORN: '#ffd83a',
} as const;

export interface DrumPadDef {
  lane: Lane;
  note: NoteType;
  position: Vec3;
  color: string;
}

export const DRUM_PAD_DEFS: readonly DrumPadDef[] = [
  { lane: 0, note: 'PATA', position: { x: -4.2, y: -3.4, z: 3 }, color: COLORS.NOTE_PATA },
  { lane: 1, note: 'PON', position: { x: -1.4, y: -3.4, z: 3 }, color: COLORS.NOTE_PON },
  { lane: 2, note: 'DON', position: { x: 1.4, y: -3.4, z: 3 }, color: COLORS.NOTE_DON },
  { lane: 3, note: 'CHAKA', position: { x: 4.2, y: -3.4, z: 3 }, color: COLORS.NOTE_CHAKA },
];

export const DEFAULT_AUDIENCE = Array.from({ length: 12 }, (_, index) => ({
  position: {
    x: -5.5 + (index % 4) * 3.6,
    y: -1.8 + Math.floor(index / 4) * 0.8,
    z: -5.5,
  },
  color: [COLORS.NOTE_PATA, COLORS.NOTE_PON, COLORS.NOTE_DON, COLORS.NOTE_CHAKA][index % 4]!,
}));
