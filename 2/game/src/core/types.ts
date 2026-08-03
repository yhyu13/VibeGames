export type DamageType = "kinetic" | "energy" | "radiation" | "biological";

export type PopulationSegment = "civilian" | "military" | "scientist" | "government";

export type NetworkNodeId =
  | "powerGrid"
  | "defenseGrid"
  | "missileCommand"
  | "mediaNet"
  | "orbitalControl";

export type EarthThreat = "nuclearMissiles" | "pointDefense" | "orbitalObstacles" | "groundAA" | "fighters";

export interface ConditionModifier {
  id: string;
  name: string;
  description: string;
  /** Multipliers keyed by damage type. Missing entries are 1.0 */
  damageMods: Partial<Record<DamageType, number>>;
  /** Propaganda effectiveness multiplier. Default 1.0 */
  propagandaMod: number;
  /** Computer virus effectiveness multiplier. Default 1.0 */
  virusMod: number;
  /** Earth build speed multiplier. Default 1.0 */
  earthBuildMod: number;
  /** Extra daily defense strength contribution. Default 0 */
  defenseBonus: number;
  /** Extra orbital obstacle coverage. Default 0 */
  obstacleCoverage: number;
  /** Extra countermeasure slots per day. Default 0 */
  threatSlotsBonus: number;
  /** Salvage drop multiplier. Default 1.0 */
  salvageMod: number;
}

export interface ConditionProfile {
  seed: number;
  modifiers: ConditionModifier[];
  effective: {
    damageMods: Partial<Record<DamageType, number>>;
    propagandaMod: number;
    virusMod: number;
    earthBuildMod: number;
    defenseBonus: number;
    obstacleCoverage: number;
    threatSlotsBonus: number;
    salvageMod: number;
  };
}

export interface WeaponSpec {
  id: string;
  name: string;
  type: DamageType;
  damage: number;
  fireRate: number; // shots per second
  projectileSpeed: number; // world units per second
  cooldown: number; // seconds between shots
  pierce: number; // 0 = no pierce, 1+ = extra targets
  spread: number; // number of projectiles per shot
  splashRadius: number;
  dot: { damage: number; duration: number }; // zero => no DoT
  special: "none" | "emp" | "doomsday";
  chargeTime: number; // for doomsday, seconds
  unlockTier: number;
}

export interface EquippedWeapon {
  spec: WeaponSpec;
  cooldownRemaining: number;
  charge: number; // 0..1 progress for doomsday
  level: number;
}

export interface MutatorDefinition {
  id: string;
  name: string;
  benefitDescription: string;
  baneDescription: string;
  benefit: Partial<Record<DamageType, number>> & {
    virusSpeed?: number;
    propagandaPower?: number;
    repairPerDay?: number;
    immunityType?: DamageType;
    doomsdayCooldownMod?: number;
  };
  bane: {
    plagueDefenses?: boolean;
    hackBack?: boolean;
    missileInterceptionBonus?: number;
    crewMoraleDecay?: boolean;
    orbitMines?: boolean;
    retrofittedType?: DamageType;
  };
}

export interface MutationOffer {
  mutation: MutatorDefinition;
  offeredDay: number;
}

export interface PropagandaSegmentState {
  segment: PopulationSegment;
  conviction: number; // 0..100
  suspicion: number; // 0..100
  converted: boolean;
  jammedUntilDay: number;
}

export type MessageCardId =
  | "slogan"
  | "doctoredFootage"
  | "deepfake"
  | "defectorCall"
  | "disinfoBlitz";

export interface MessageCard {
  id: MessageCardId;
  name: string;
  conviction: number;
  suspicion: number;
  /** Multiplier applied when scientist segment already converted */
  scientistSynergy: number;
}

export interface VirusPuzzle {
  kind: "pattern" | "routing" | "timing";
  difficulty: number; // scales with Earth tech level
  /** Serializable puzzle data; solvers in logic/virus.ts */
  data: unknown;
  solution: unknown;
  solved: boolean;
}

export interface NetworkNodeState {
  node: NetworkNodeId;
  compromised: boolean;
  puzzle: VirusPuzzle;
  attemptsLeft: number;
}

export interface PrimaryTarget {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  position: { x: number; y: number; z: number };
}

export interface DefenseUnit {
  id: string;
  kind: "turret" | "aaNet" | "fighter" | "spaceStation" | "nukeSilo" | "orbitalObstacle";
  hp: number;
  maxHp: number;
  position: { x: number; y: number; z: number };
  targetId?: string;
  disabled: boolean;
  charge: number; // for nukes/stations
}

export interface Projectile {
  id: string;
  weaponId: string;
  type: DamageType;
  damage: number;
  position: { x: number; y: number; z: number };
  direction: { x: number; y: number; z: number };
  speed: number;
  pierceLeft: number;
  splashRadius: number;
  dot: { damage: number; duration: number; remaining: number } | null;
  fromPlayer: boolean;
  hostile: boolean;
  alive: boolean;
  special: "none" | "emp" | "doomsday";
}

export interface ShipState {
  hull: number;
  maxHull: number;
  hullWeaversRepair: number; // repair per day
  armor: Partial<Record<DamageType, number>>;
  immunityType: DamageType | null;
  yaw: number; // orbit angle radians
  pitch: number; // latitude radians, clamped to playable band
  weapons: EquippedWeapon[];
  activeWeaponIndex: number;
  systems: {
    hull: number;
    weaponBay: number;
    broadcastArray: number;
    cortex: number;
  };
  speed: number; // radians per second for yaw
  morale: number; // 0..100, decays with Mind Static bane
}

export interface RunStateData {
  seed: number;
  day: number;
  status: "setup" | "active" | "victory" | "defeat";
  winCondition: "annihilation" | "systemShutdown" | "totalConversion" | null;
  profile: ConditionProfile | null;
  ship: ShipState;
  defenses: DefenseUnit[];
  projectiles: Projectile[];
  segments: PropagandaSegmentState[];
  messageHand: MessageCard[];
  nodes: NetworkNodeState[];
  mutationsTaken: MutatorDefinition[];
  pendingMutations: MutationOffer[] | null;
  sabotageCharges: number; // from missile command
  disabledToday: string[]; // defense ids disabled by power grid today
  bloodless: boolean;
  actionsTaken: { destructive: number; propaganda: number; virus: number; minor: number };
  events: RunEvent[];
}

export type RunEvent =
  | { type: "dayStarted"; day: number }
  | { type: "earthEscalated"; threats: EarthThreat[] }
  | { type: "mutationOffered"; offers: MutationOffer[] }
  | { type: "mutationAccepted"; id: string }
  | { type: "damageTaken"; amount: number }
  | { type: "defenseDestroyed"; id: string; kind: DefenseUnit["kind"] }
  | { type: "nukeFired"; atShip: boolean }
  | { type: "segmentConverted"; segment: PopulationSegment }
  | { type: "nodeCompromised"; node: NetworkNodeId }
  | { type: "victory"; winCondition: RunStateData["winCondition"] }
  | { type: "defeat"; reason: string };

export const PLAYABLE_PITCH = Math.PI / 4; // ±45°
export const ORBIT_RADIUS = 30;
export const PLANET_RADIUS = 18;
export const FIXED_DT = 1 / 60;
export const MAX_RUN_DAYS = 7;
