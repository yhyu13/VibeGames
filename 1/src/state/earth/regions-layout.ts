// Region layout: arranges hand-crafted region defs along Earth's visible arc.

import { signal } from '../signals.js';
import type { EarthState, RegionState, VisualState, FactionAttitude } from '../types.js';
import type { RegionDef } from './region-types.js';
import { REGION_DEFS, REGION_DEFS_BY_ID } from './regions.js';
import type { RNG } from '../rng.js';
import type { ElementId, FactionId, RegionId } from '../id.js';

export function generateRegionLayout(rng: RNG, count: number): RegionDef[] {
  const n = Math.min(count, REGION_DEFS.length);
  return rng.shuffle(REGION_DEFS).slice(0, n);
}

export function instantiateRegions(defs: ReadonlyArray<RegionDef>): Record<string, RegionState> {
  const out: Record<string, RegionState> = {};
  for (const def of defs) {
    const r: RegionState = {
      id: def.id,
      visualState: signal<VisualState>('intact'),
      defenseSpec: def.defense,
      resourceStockpile: signal(100),
      networkSpec: {
        size: 20 + (def.id.length * 7) % 40,
        encryption: 0.3 + ((def.id.length * 13) % 50) / 100,
        ai: 0.2 + ((def.id.length * 11) % 60) / 100,
      },
      factionAttitude: signal<FactionAttitude>('hostile'),
      faction: def.factionSeed,
      hp: signal(def.defense.hp),
      shield: signal(def.defense.shield),
    };
    out[def.id] = r;
  }
  return out;
}

export function attachRegionsToEarth(earth: EarthState, defs: ReadonlyArray<RegionDef>): void {
  earth.regions.value = instantiateRegions(defs);
}

export function getRegionDef(id: RegionId): RegionDef | undefined {
  return REGION_DEFS_BY_ID[id];
}