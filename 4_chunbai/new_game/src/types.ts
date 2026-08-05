export interface Vector3 {
  x: number; y: number; z: number;
}

export interface PlayerState {
  id: number;
  pos: Vector3;
  rot: Vector3;
  hp: number;
  maxHp: number;
  speed: number;
  weapon: number;
  weapons: number[];
  specialGauge: number;
  maxSpecialGauge: number;
  invulnTimer: number;
  alive: boolean;
  score: number;
  kills: number;
  combo: number;
}

export interface EnemyState {
  id: number;
  type: EnemyType;
  pos: Vector3;
  rot: Vector3;
  hp: number;
  maxHp: number;
  speed: number;
  state: AIState;
  targetId: number;
  attackTimer: number;
  phase?: number;
  shieldTimer?: number;
}

export enum EnemyType {
  Scout = 'scout',
  Assault = 'assault',
  Sniper = 'sniper',
  Shield = 'shield',
  Bomber = 'bomber',
  Commander = 'commander',
  Boss = 'boss'
}

export enum AIState {
  Idle = 'idle',
  Patrol = 'patrol',
  Alert = 'alert',
  Chase = 'chase',
  Attack = 'attack',
  Cooldown = 'cooldown',
  Flee = 'flee',
  Phase1 = 'phase1',
  Phase2 = 'phase2',
  Phase3 = 'phase3',
  Phase4 = 'phase4'
}

export interface ProjectileState {
  id: number;
  pos: Vector3;
  vel: Vector3;
  damage: number;
  owner: number;
  type: ProjectileType;
  lifetime: number;
  radius: number;
  color: string;
  /** Funnel 阶段：'orbit' 环绕玩家 → 'strike' 扑向目标 */
  phase?: string;
  /** 当前阶段剩余时间 */
  phaseTimer?: number;
  /** Funnel 环绕相位角（弧度） */
  orbitAngle?: number;
}

export enum ProjectileType {
  Bullet = 'bullet',
  Missile = 'missile',
  Beam = 'beam',
  Spread = 'spread',
  Sniper = 'sniper',
  Funnel = 'funnel',
  Laser = 'laser',
  BossBullet = 'bossBullet'
}

export enum FireMode {
  FreeFire = 'freeFire',
  LockShortRange = 'lockShortRange',
  LockRequired = 'lockRequired',
}

export interface WeaponDef {
  id: number;
  name: string;
  type: ProjectileType;
  damage: number;
  fireRate: number;
  speed: number;
  spread: number;
  color: string;
  unlockLevel: number;
  description: string;
  lockRange: number;
  fireMode: FireMode;
}

export interface SkillDef {
  id: number;
  name: string;
  description: string;
  cooldown: number;
  duration: number;
  icon: string;
}

export interface EnemyDef {
  type: EnemyType;
  name: string;
  hp: number;
  speed: number;
  damage: number;
  attackRange: number;
  alertRange: number;
  score: number;
  color: string;
  size: number;
}

export interface BossDef {
  id: number;
  name: string;
  phases: BossPhase[];
  score: number;
  color: string;
  size: number;
}

export interface BossPhase {
  hpPercent: number;
  speed: number;
  attacks: string[];
  minionSpawn: boolean;
  attackPattern: string;
}

export interface Particle {
  pos: Vector3;
  vel: Vector3;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface GameState {
  screen: 'menu' | 'pve' | 'pause' | 'result';
  gameMode: 'pve' | null;
  score: number;
  wave: number;
  time: number;
  paused: boolean;
  gameOver: boolean;
  bossFight: boolean;
  bossName: string;
}

export interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  shoot: boolean;
  aimX: number;
  aimY: number;
  weaponSwitch: number;
  boost: boolean;
  brake: boolean;
  dodge: boolean;
  special: boolean;
  lockTarget: boolean;
  pause: boolean;
}

export interface CameraState {
  pos: Vector3;
  target: Vector3;
  fov: number;
}
