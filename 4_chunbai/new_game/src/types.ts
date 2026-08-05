export interface Vector3 {
  x: number; y: number; z: number;
}

export interface PlayerState {
  id: number;
  pos: Vector3;
  rot: Vector3;
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
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
  fleeTimer?: number;
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
  smartRadius: number;
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
  /** C0: 3 秒开场动画进行中（暂停玩家输入与游戏逻辑） */
  introActive: boolean;
  /** C4: 屏幕边缘黄色脉冲触发时刻（performance.now() ms） */
  edgePulseAt: number;
  /** C4: 子弹时间结束时刻（ms）— 在此之前 dt 会被缩放 */
  timeDilationUntil: number;
  /** 锁定开关状态（Tab 切换）— HUD 显示用 */
  lockOn: boolean;
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
  lockToggle: boolean;
  pause: boolean;
}

export interface CameraState {
  pos: Vector3;
  target: Vector3;
  fov: number;
}
