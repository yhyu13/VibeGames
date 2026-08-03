export type DamageType = 'kinetic' | 'energy' | 'radiation' | 'bio' | 'emp';

export type PhaseId =
  | 'menu'
  | 'scan'
  | 'combat'
  | 'puzzle'
  | 'build'
  | 'resolve'
  | 'runOver'
  | 'meta';

export type TargetKind =
  | 'turret'
  | 'fighter'
  | 'missile'
  | 'obstacle'
  | 'station'
  | 'nexus'
  | 'capital';

export type MajorAction = 'assault' | 'propaganda' | 'virus' | 'doomsday';
export type MinorAction = 'repair' | 'resupply' | 'drone' | 'analyze';

export type SegmentId = 'civilian' | 'military' | 'scientist' | 'government';
export type NodeId = 'power' | 'defense' | 'missile' | 'media' | 'orbital';

export interface WeaponStats {
  id: string;
  name: string;
  type: DamageType;
  damage: number;
  fireRate: number;
  projectileSpeed: number;
  accuracy: number;
  range: number;
  splash?: number;
  pierce?: boolean;
  description: string;
}

export interface DefenseProfile {
  hp: number;
  armor: Partial<Record<DamageType, number>>;
  size: number;
}

export interface TargetState {
  id: string;
  kind: TargetKind;
  name: string;
  hp: number;
  maxHp: number;
  armor: Partial<Record<DamageType, number>>;
  isPrimary: boolean;
  destroyed: boolean;
}

export interface SegmentState {
  id: SegmentId;
  conviction: number;
  suspicion: number;
  converted: boolean;
}

export interface NodeState {
  id: NodeId;
  compromised: boolean;
}

export interface ConditionDef {
  id: string;
  name: string;
  description: string;
  damageMod: Partial<Record<DamageType, number>>;
  defenseHpMod: number;
  propagandaMult: number;
  virusMult: number;
  salvageMult: number;
  difficulty: number;
}

export interface MutationDef {
  id: string;
  name: string;
  benefit: string;
  bane: string;
  baneDelay: number;
  hullBonus?: number;
  repairBonus?: number;
  damageMod: Partial<Record<DamageType, number>>;
  baneHpMod: number;
}

export interface MessageCard {
  id: string;
  name: string;
  text: string;
  conviction: number;
  suspicion: number;
  segments: Partial<Record<SegmentId, number>>;
}

export interface ShipState {
  hull: number;
  maxHull: number;
  weaponIds: string[];
  weaponMods: Record<string, number>;
  cortex: number;
  broadcast: number;
  repairRate: number;
  drones: number;
  doomCooldown: number;
}

export interface ConditionProfile {
  primary: ConditionDef;
  secondary: ConditionDef[];
  damageMod: Record<DamageType, number>;
  defenseHpMod: number;
  propagandaMult: number;
  virusMult: number;
  salvageMult: number;
  difficulty: number;
}

export interface RunState {
  seed: number;
  day: number;
  ship: ShipState;
  profile: ConditionProfile;
  earthName: string;
  targets: TargetState[];
  segments: SegmentState[];
  nodes: NodeState[];
  convertedApplied: SegmentId[];
  mutations: MutationDef[];
  salvage: number;
  jammedUntil: number;
  doomsdayUsed: number;
  autoDisables: number;
  missileSabotaged: boolean;
  missileInterceptChance: number;
  nukesIncoming: number;
  combatTimeBonus: number;
  log: string[];
  outcome: 'none' | 'annihilation' | 'shutdown' | 'conversion' | 'defeat';
  alienium: number;
}

export interface SaveFile {
  version: 1;
  alienium: number;
  unlocks: { weapons: string[]; mutations: string[]; chassis: string[]; factions: string[] };
  stats: { runs: number; wins: number; bloodlessWins: number };
  settings: { audio: { sfx: number; music: number }; gfx: { bloom: boolean; quality: 'low' | 'med' | 'high' } };
  lastRunSeed?: number;
}

export const STARTING_WEAPONS = ['plasma-lance', 'kinetic-rods'];
export const ALL_WEAPONS = [
  'plasma-lance',
  'kinetic-rods',
  'radiation-cloud',
  'nanite-swarm',
  'emp-pulse',
  'doomsday-ray',
  'graviton-lance',
  'solar-flare',
];

export const MAX_LOADOUT = 3;
