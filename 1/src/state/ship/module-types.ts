import type { ShipModule } from '../types.js';

export interface ModuleEffect {
  regenPerSec?: number;
  shieldMaxBonus?: number;
  speedMultiplier?: number;
  detectionMultiplier?: number;
  droneDamage?: number;
  droneRange?: number;
  puzzleTimeBonus?: number;
}

export interface ModuleDef {
  id: ShipModule['kind'];
  name: string;
  description: string;
  maxLevel: number;
  effects: ModuleEffect[];
}