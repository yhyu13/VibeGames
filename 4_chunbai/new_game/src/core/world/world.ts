import { Vector3, EnemyType, ProjectileType, WeaponDef, EnemyDef, BossDef } from '../types';
import { WEAPONS } from '../data/weapons';
import { ENEMY_DEFS } from '../data/enemies';
import { BOSSES } from '../data/bosses';
import {
  WORLD_SIZE, WORLD_SIZE_Y, PLAYER_SIZE, PLAYER_SPEED, LOCK_RANGE, LOCK_DROP_RANGE, LOCK_AIM_STICK,
  MAX_ENEMIES, MAX_PROJECTILES, BOSS_WAVE_INTERVAL, FLEE_DURATION, CAMERA_DISTANCE, CAMERA_HEIGHT,
} from '../constants';

export interface ColliderSpec {
  key: string;
  label: string;
  radius: number;
  notes?: string;
}

export interface WorldMarker {
  id: string;
  label: string;
  pos: Vector3;
  kind: 'playerStart' | 'bossArena' | 'cameraHome' | 'spawnBand' | 'interceptRange';
}

export interface SpawnBandSpec {
  label: string;
  minDist: number;
  maxDist: number;
  note: string;
}

export interface WorldManifest {
  name: string;
  version: string;
  unit: string;
  arena: { halfExtents: Vector3; note: string };
  colliders: ColliderSpec[];
  markers: WorldMarker[];
  spawnBands: SpawnBandSpec[];
  caps: { maxEnemies: number; maxProjectiles: number };
  pacing: { bossWaveInterval: number; intermissionSeconds: number; fleeDurationSeconds: number };
  locks: { baseRange: number; dropRange: number; aimStick: number };
  weapons: WeaponDef[];
  enemies: EnemyDef[];
  bosses: BossDef[];
}

/**
 * 世界清单 — 3D 世界的唯一文本化事实源（C.A.T「T」原则）。
 * 竞技场边界、碰撞体、命名标记、生成带、数据表全部在此声明，
 * 供 `worldText.ts` 序列化为 AI 可直接读取的 token 文本。
 */
export const WORLD: WorldManifest = {
  name: 'Pure White Lancer — 纯白枪骑兵',
  version: '1.0',
  unit: 'meters',
  arena: {
    halfExtents: { x: WORLD_SIZE, y: WORLD_SIZE_Y, z: WORLD_SIZE },
    note: 'hard clamps applied to every entity each tick',
  },
  colliders: [
    { key: 'player', label: '玩家机体', radius: PLAYER_SIZE },
    { key: 'enemy-scout', label: '侦察兵', radius: 1.5 },
    { key: 'enemy-assault', label: '突击兵', radius: 1.5 },
    { key: 'enemy-sniper', label: '狙击手', radius: 1.5 },
    { key: 'enemy-shield', label: '护盾兵', radius: 1.5 },
    { key: 'enemy-bomber', label: '自爆兵', radius: 1.5 },
    { key: 'enemy-commander', label: '指挥官', radius: 1.5 },
    { key: 'boss', label: 'Boss', radius: 4, notes: '所有 Boss 共用' },
    { key: 'projectile', label: '弹体', radius: 0.3, notes: 'Laser 为 0.5' },
  ],
  markers: [
    { id: 'player-start', label: '玩家出生点', pos: { x: 0, y: 0, z: 0 }, kind: 'playerStart' },
    { id: 'camera-home', label: '追击相机位（相对玩家）', pos: { x: 0, y: CAMERA_HEIGHT, z: CAMERA_DISTANCE }, kind: 'cameraHome' },
    { id: 'boss-arena', label: 'Boss 竞技场（出生区）', pos: { x: 0, y: 5, z: -50 }, kind: 'bossArena', },
    { id: 'spawn-band', label: '敌兵生成环', pos: { x: 0, y: 0, z: 0 }, kind: 'spawnBand' },
    { id: 'lock-range', label: '锁定基准射程', pos: { x: 0, y: 0, z: 0 }, kind: 'interceptRange' },
  ],
  spawnBands: [
    { label: '敌兵生成环', minDist: 30, maxDist: 80, note: '按敌种感知范围收紧：min(alertRange+25, 80)' },
    { label: 'Boss 出生区', minDist: 0, maxDist: 0, note: 'x∈[-30,30] 随机，y=5，z=-50，位于玩家前方' },
  ],
  caps: { maxEnemies: MAX_ENEMIES, maxProjectiles: MAX_PROJECTILES },
  pacing: { bossWaveInterval: BOSS_WAVE_INTERVAL, intermissionSeconds: 2.5, fleeDurationSeconds: FLEE_DURATION },
  locks: { baseRange: LOCK_RANGE, dropRange: LOCK_DROP_RANGE, aimStick: LOCK_AIM_STICK },
  weapons: WEAPONS,
  enemies: ENEMY_DEFS,
  bosses: BOSSES,
};

/** 命中判定半径（球体碰撞）— 仿真与 token 清单共用同一事实源。 */
export function hitRadiusFor(type: EnemyType): number {
  return type === EnemyType.Boss ? 4 : 1.5;
}

/** 弹体碰撞半径。 */
export function projectileRadiusFor(type: ProjectileType): number {
  return type === ProjectileType.Laser ? 0.5 : 0.3;
}

/** 玩家命中半径。 */
export function playerHitRadius(): number {
  return PLAYER_SIZE;
}

/** 按关卡解锁的敌种表（Wave 1-2 基础三型，3+ 狙击，4+ 自爆，5+ 指挥官）。 */
export function enemyTypesForWave(wave: number): EnemyType[] {
  const types: EnemyType[] = [EnemyType.Scout, EnemyType.Assault, EnemyType.Shield];
  if (wave > 2) types.push(EnemyType.Sniper);
  if (wave > 3) types.push(EnemyType.Bomber);
  if (wave > 4) types.push(EnemyType.Commander);
  return types;
}

/** Boss 关判定（每 BOSS_WAVE_INTERVAL 关一个）。 */
export function isBossWave(wave: number): boolean {
  return wave % BOSS_WAVE_INTERVAL === 0;
}

/** 玩家基础属性（token 清单与 store 初始值共用）。 */
export function playerBaseline() {
  return { hp: 100, energy: 100, speed: PLAYER_SPEED, specialGaugeMax: 100 };
}
