// Region type definitions.

import type { ElementId, FactionId, RegionId } from '../id.js';
import type { DefenseSpec } from '../types.js';

export type RegionSilhouette =
  | 'ice-cap'
  | 'megacity'
  | 'plains'
  | 'archipelago'
  | 'mountain'
  | 'desert'
  | 'forest'
  | 'volcanic'
  | 'oceanic-trench'
  | 'orbital-hub';

export type EffectId =
  | 'magnetic-arc'
  | 'heat-burst'
  | 'lightning-chain'
  | 'tunnel-network'
  | 'dense-traffic'
  | 'scan-window'
  | 'split-factions'
  | 'regrowth'
  | 'plume-cover'
  | 'scorch-amplify'
  | 'no-comms';

export interface RegionDef {
  id: RegionId;
  name: string;
  silhouette: RegionSilhouette;
  resistance: ElementId;
  weakness: ElementId;
  environmentalBonus: EffectId;
  defense: DefenseSpec;
  factionSeed: FactionId;
  resourceWeights: Partial<Record<'salvage' | 'biomass' | 'signal' | 'intelligence' | 'energy' | 'darkMatter', number>>;
  visual: {
    primaryColor: string;
    accentColor: string;
    geometryHints: string[];
    shaderUniforms: Record<string, number>;
  };
}