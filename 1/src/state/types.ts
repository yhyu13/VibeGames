// All state interfaces. State is pure data + signals; no Three.js types here.

import type { Signal, ReadonlySignal } from './signals.js';
import type {
  RegionId, WeaponId, AdaptationId, BurdenId, ConditionId, ElementId,
  FactionId, CommanderId, ArchetypeId, ProjectileId, DefenseId, MissileId,
} from './id.js';

// ----------------- Orbital / Combat -----------------

export type OrbitalLane = 'high' | 'low' | 'atmosphere';
export type VisualState = 'intact' | 'damaged' | 'occupied' | 'compromised' | 'rebelling' | 'destroyed';

// ----------------- Earth -----------------

export interface EarthState {
  planetaryIntegrity: Signal<number>;
  humanResolve: Signal<number>;
  globalPanic: Signal<number>;
  humanUnity: Signal<number>;
  networkControl: Signal<number>;
  alienExposure: Signal<number>;
  biosphereStability: Signal<number>;
  escalationPhase: Signal<1 | 2 | 3 | 4 | 5>;
  responseClock: Signal<number>;
  regions: Signal<Record<string, RegionState>>;
  activeConditions: Signal<ReadonlyArray<ConditionId>>;
  activeCounter: Signal<CounterDef | null>;
  nextCounter: Signal<CounterDef | null>;
  playerBehavior: PlayerBehavior;
}

export interface PlayerBehavior {
  weaponUse: Signal<Record<ElementId, number>>;
  laneUse: Signal<Record<OrbitalLane, number>>;
  regionTargeting: Signal<Record<string, number>>;
  destructionRatio: Signal<number>; // 0..1 destruction vs infiltration
  shieldReliance: Signal<number>;
}

export interface RegionState {
  id: RegionId;
  visualState: Signal<VisualState>;
  defenseSpec: DefenseSpec;
  resourceStockpile: Signal<number>;
  networkSpec: NetworkSpec;
  factionAttitude: Signal<FactionAttitude>;
  faction: FactionId;
  hp: Signal<number>;
  shield: Signal<number>;
}

export interface DefenseSpec {
  archetype: string;
  hp: number;
  shield: number;
  resistance: ElementId;
  weakness: ElementId;
  behavior: 'turret' | 'battery' | 'shield' | 'jammer' | 'satellite' | 'mine' | 'decoy' | 'nuclear';
}

export interface NetworkSpec {
  size: number;
  encryption: number;
  ai: number;
}

export type FactionAttitude = 'submissive' | 'neutral' | 'hostile' | 'rebellious';

// ----------------- Ship -----------------

export interface ShipState {
  hull: Signal<number>;
  hullMax: Signal<number>;
  shield: Signal<number>;
  shieldMax: Signal<number>;
  energy: Signal<number>;
  energyMax: Signal<number>;
  heat: Signal<number>;
  signal: Signal<number>;
  instability: Signal<number>;
  position: Signal<{ lane: OrbitalLane; arc: number }>;
  weapons: Signal<WeaponSlot[]>;
  modules: Signal<ShipModule[]>;
  adaptations: Signal<ReadonlyArray<AdaptationId>>;
  activeBurdens: Signal<ReadonlyArray<BurdenId>>;
}

export interface WeaponSlot {
  id: string;
  archetype: WeaponId;
  branch: 'a' | 'b' | null;
  cooldown: number;
  ammo: number;
}

export interface ShipModule {
  id: string;
  kind: 'shield' | 'engine' | 'cloaking' | 'drone' | 'hacking';
  level: number;
}

// ----------------- Combat -----------------

export interface Projectile {
  id: ProjectileId;
  archetype: WeaponId;
  lane: OrbitalLane;
  arc: number;
  vArc: number;
  element: ElementId;
  baseDamage: number;
  ttl: number;
  owner: 'player' | 'earth';
  flags: ProjectileFlags;
}

export interface ProjectileFlags {
  guided?: boolean;
  pierce?: boolean;
  chain?: boolean;
}

export interface Defense {
  id: DefenseId;
  type: DefenseSpec['behavior'];
  regionId: RegionId;
  lane: OrbitalLane;
  arc: number;
  hp: number;
  shield: number;
  resistance: ElementId;
  weakness: ElementId;
  cooldown: number;
  flags?: { nuclear?: boolean; shielded?: boolean };
}

export interface Missile {
  id: MissileId;
  sourceRegion: RegionId;
  target: 'player' | RegionId;
  phase: 'launch' | 'ascent' | 'orbit' | 'terminal';
  eta: number;
  warheadType: 'standard' | 'nuclear' | 'emp';
  intercepted: boolean;
}

// ----------------- Progression -----------------

export interface VictoryProgress {
  annihilation: Signal<number>;
  submission: Signal<number>;
  digital: Signal<number>;
  fracture: Signal<number>;
}

export interface RunState {
  seed: Signal<number>;
  commander: CommanderId;
  archetype: ArchetypeId;
  earth: EarthState;
  ship: ShipState;
  victory: VictoryProgress;
  events: Signal<GameEvent[]>;
  encounter: Signal<EncounterState | null>;
  clock: Signal<number>;
  outcome: Signal<RunOutcome | null>;
}

export type EncounterState =
  | { kind: 'combat'; regionId: RegionId; defenses: Defense[]; missiles: Missile[] }
  | { kind: 'puzzle'; puzzleId: string; seed: number; timer: number }
  | { kind: 'strategic' }
  | { kind: 'event'; eventId: string }
  | { kind: 'none' };

export type RunOutcome =
  | { kind: 'annihilation' }
  | { kind: 'submission' }
  | { kind: 'digital' }
  | { kind: 'fracture' }
  | { kind: 'hybrid'; id: string }
  | { kind: 'defeat'; reason: 'hull' | 'instability' | 'counter' | 'mission' };

export interface GameEvent {
  tick: number;
  kind: string;
  payload?: unknown;
}

export interface CounterDef {
  id: string;
  name: string;
  description: string;
  triggerCondition: (b: PlayerBehavior) => number;
  /** Effect identifier consumed by applyCounterEffects + Damage. */
  effect: string;
  telegraphTicks: number;
}

// ----------------- Puzzles -----------------

export type PuzzleKind = 'virus' | 'propaganda' | 'decryption' | 'social';

export interface PuzzleOutcome {
  networkDelta: number;
  unityDelta: number;
  resolveDelta: number;
  panicDelta: number;
  disableDefense?: DefenseSpec['behavior'];
  revealIntel?: string;
}

// ----------------- Save -----------------

export interface SaveSchemaV1 {
  version: 1;
  settings: Settings;
  meta: MetaProgress;
  runs: RunSummary[];
  live: RunStateSnapshot | null;
}

export interface Settings {
  volume: number;
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  screenShake: number;
  flashes: number;
  distortion: number;
  aimAssist: boolean;
  untimedPuzzles: boolean;
  bindings: Record<string, string>;
}

export interface MetaProgress {
  unlockedArchetypes: ArchetypeId[];
  unlockedCommanders: CommanderId[];
  unlockedAdaptations: AdaptationId[];
  unlockedWeapons: WeaponId[];
  intel: string[];
}

export interface RunSummary {
  id: string;
  seed: number;
  commander: CommanderId;
  outcome: RunOutcome;
  ticks: number;
  startedAt: number;
  endedAt: number;
}

export interface RunStateSnapshot {
  seed: number;
  commander: CommanderId;
  archetype: ArchetypeId;
  earth: EarthSnapshot;
  ship: ShipSnapshot;
  victory: { annihilation: number; submission: number; digital: number; fracture: number };
  events: GameEvent[];
  clock: number;
}

export interface EarthSnapshot {
  planetaryIntegrity: number;
  humanResolve: number;
  globalPanic: number;
  humanUnity: number;
  networkControl: number;
  alienExposure: number;
  biosphereStability: number;
  escalationPhase: 1 | 2 | 3 | 4 | 5;
  responseClock: number;
  regions: RegionSnapshot[];
  activeConditions: string[];
  activeCounter: string | null;
  nextCounter: string | null;
}

export interface RegionSnapshot {
  id: string;
  visualState: VisualState;
  hp: number;
  shield: number;
  resourceStockpile: number;
  factionAttitude: FactionAttitude;
  faction: string;
}

export interface ShipSnapshot {
  hull: number;
  hullMax: number;
  shield: number;
  shieldMax: number;
  energy: number;
  energyMax: number;
  heat: number;
  signal: number;
  instability: number;
  position: { lane: OrbitalLane; arc: number };
  weapons: WeaponSlot[];
  modules: ShipModule[];
  adaptations: string[];
  activeBurdens: string[];
}

// ----------------- Helpers -----------------

export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

export type { ReadonlySignal, Signal };