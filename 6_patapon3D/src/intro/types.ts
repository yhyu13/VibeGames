export type Vec3 = { x: number; y: number; z: number };
export type NoteType = 'PATA' | 'PON' | 'DON' | 'CHAKA';
export type Lane = 0 | 1 | 2 | 3;

export interface InputState {
  launch: boolean;
  type: NoteType | null;
}
