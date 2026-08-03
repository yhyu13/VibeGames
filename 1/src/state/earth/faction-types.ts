import type { FactionId } from '../id.js';

export type FactionPosture = 'pacifist' | 'defensive' | 'opportunistic' | 'militaristic' | 'fanatic';

export interface FactionDef {
  id: FactionId;
  name: string;
  posture: FactionPosture;
  surrenderThreshold: number; // 0..100 Human Resolve threshold where they consider surrender
  propagandaResistance: number; // 0..1
}