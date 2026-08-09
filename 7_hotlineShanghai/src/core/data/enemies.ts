// src/core/data/enemies.ts — 敌人 archetype 模板(字段对齐 core/types.ts 的 Enemy 接口)
// 纯数据:ENEMY_ARCHETYPES 是 4 种 archetype 的初始参数表(冻结参考 TDD.md §4.4.4);
// createEnemy() 用模板生成带完整初始字段的 Enemy(velocity / weapon / patrolTarget / lastSeenPlayerAt 等)。
// 阵营按职能区分(占领军 / 巡捕 / 特务 / 头目),不做族群刻板(GDD.md §2.4 冻结原则)。

import type { Enemy, EnemyArchetype, Vec2, WeaponId } from '../types';
import {
  ENEMY_VIEW_DISTANCE,
  ENEMY_VIEW_ARC_DEG,
  ENEMY_HEAR_DISTANCE,
  ENEMY_FIRE_DISTANCE,
  ENEMY_SPEED_PATROL,
  ENEMY_SPEED_ALERT,
  ENEMY_REACT_TIME,
  ENEMY_FIRE_RATE,
  ENEMY_HITS_TO_KILL,
  BOSS_HITS,
  FLASHLIGHT_CONE_ARC_DEG,
  FLASHLIGHT_SWEEP_HZ,
  ENEMY_INVULN_WHILE_LIT,
} from '../constants';

// 敌人等级:普通(占领军 / 巡捕)/ 精英(特务)/ boss(任务头目)
export type EnemyRank = 'normal' | 'elite' | 'boss';

// archetype 模板:每种敌人的初始参数(Enemy 接口各字段的默认值 + AI 调参)
export interface EnemyArchetypeSpec {
  archetype: EnemyArchetype;
  nameZh: string;           // 中文显示名(按职能称谓)
  nameEn: string;           // 英文名(DEV manifest 用)
  hp: number;               // 击数:普通 = 1,boss = 3(§4.4.4)
  speedPatrol: number;      // 巡逻速度 u/s(§4.4.4 默认 3)
  speedAlert: number;       // 警觉 / 追击速度 u/s(§4.4.4 默认 5)
  fireRate: number;         // 射击频率 1/s(§4.4.4 默认 1.5)
  reactionTime: number;     // 发现玩家后的反应时间 s(§4.4.4 默认 0.4)
  viewDistance: number;     // 视野距离 u(§4.4.4 默认 8)
  viewArcDeg: number;       // 视野锥角 °(§4.4.4 默认 60)
  hearDistance: number;     // 听觉半径 u(§4.4.4 默认 4)
  fireDistance: number;     // 开火距离 u(§4.4.4 默认 14)
  weapon: WeaponId;         // 初始武器(对齐 Enemy.weapon,均为单发武器)
  rank: EnemyRank;
  /** v3.1 flashlight_patrol:RC 灯锥视野参数(灯被拆 → 几何退化为 viewDistance/viewArcDeg) */
  flashlightConeArcDeg?: number;
  flashlightSweepHz?: number;
  /** v3.1 光下无敌:受光护甲(ENEMY_INVULN_WHILE_LIT) */
  invulnWhileLit?: boolean;
}

// 4 种 archetype 模板(冻结数值参考 TDD.md §4.4.4;精英 / boss 做手感差异化)
export const ENEMY_ARCHETYPES: Record<EnemyArchetype, EnemyArchetypeSpec> = {
  // 占领军:步枪兵,标准数值,正面压制
  soldier: {
    archetype: 'soldier',
    nameZh: '占领军',
    nameEn: 'Garrison',
    hp: ENEMY_HITS_TO_KILL,
    speedPatrol: ENEMY_SPEED_PATROL,
    speedAlert: ENEMY_SPEED_ALERT,
    fireRate: ENEMY_FIRE_RATE,
    reactionTime: ENEMY_REACT_TIME,
    viewDistance: ENEMY_VIEW_DISTANCE,
    viewArcDeg: ENEMY_VIEW_ARC_DEG,
    hearDistance: ENEMY_HEAR_DISTANCE,
    fireDistance: ENEMY_FIRE_DISTANCE,
    weapon: 'mosin',
    rank: 'normal',
  },
  // 巡捕:手枪,标准数值,街头哨戒
  policeman: {
    archetype: 'policeman',
    nameZh: '巡捕',
    nameEn: 'Police',
    hp: ENEMY_HITS_TO_KILL,
    speedPatrol: ENEMY_SPEED_PATROL,
    speedAlert: ENEMY_SPEED_ALERT,
    fireRate: ENEMY_FIRE_RATE,
    reactionTime: ENEMY_REACT_TIME,
    viewDistance: ENEMY_VIEW_DISTANCE,
    viewArcDeg: ENEMY_VIEW_ARC_DEG,
    hearDistance: ENEMY_HEAR_DISTANCE,
    fireDistance: ENEMY_FIRE_DISTANCE,
    weapon: 'mauser_c96',
    rank: 'normal',
  },
  // 特务:精英,更快更敏锐,盒子炮快射
  spy: {
    archetype: 'spy',
    nameZh: '特务',
    nameEn: 'Agent',
    hp: ENEMY_HITS_TO_KILL,
    speedPatrol: 4,
    speedAlert: 6,
    fireRate: 2.0,
    reactionTime: 0.3,
    viewDistance: ENEMY_VIEW_DISTANCE,
    viewArcDeg: ENEMY_VIEW_ARC_DEG,
    hearDistance: ENEMY_HEAR_DISTANCE,
    fireDistance: ENEMY_FIRE_DISTANCE,
    weapon: 'boxer',
    rank: 'elite',
  },
  // 巡逻兵:手电兵(v3.1,09 §5)。视野 = RC 灯锥;看到玩家只 alert 呼叫,不开火(fireDistance=0);
  // 灯被拆 → 视野退化回 v2 几何锥(8u / 60°);受光护甲 = 光下无敌。
  flashlight_patrol: {
    archetype: 'flashlight_patrol',
    nameZh: '巡逻兵',
    nameEn: 'Flashlight Patrol',
    hp: ENEMY_HITS_TO_KILL,
    speedPatrol: 2.5,
    speedAlert: 4.5,
    fireRate: ENEMY_FIRE_RATE,
    reactionTime: ENEMY_REACT_TIME,
    viewDistance: ENEMY_VIEW_DISTANCE,
    viewArcDeg: ENEMY_VIEW_ARC_DEG,
    hearDistance: ENEMY_HEAR_DISTANCE,
    fireDistance: 0,
    weapon: 'mauser_c96',
    rank: 'normal',
    flashlightConeArcDeg: FLASHLIGHT_CONE_ARC_DEG,
    flashlightSweepHz: FLASHLIGHT_SWEEP_HZ,
    invulnWhileLit: ENEMY_INVULN_WHILE_LIT,
  },
  // 头目:任务 BOSS,3 击,汤普森压制(§4.4.4 BOSS_HITS = 3)
  boss: {
    archetype: 'boss',
    nameZh: '头目',
    nameEn: 'Boss',
    hp: BOSS_HITS,
    speedPatrol: 4,
    speedAlert: 6,
    fireRate: 2.0,
    reactionTime: 0.3,
    viewDistance: ENEMY_VIEW_DISTANCE,
    viewArcDeg: ENEMY_VIEW_ARC_DEG,
    hearDistance: ENEMY_HEAR_DISTANCE,
    fireDistance: ENEMY_FIRE_DISTANCE,
    weapon: 'thompson',
    rank: 'boss',
  },
};

// 按模板生成 Enemy 实例(完整初始字段,对齐 Enemy 接口)
export function createEnemy(
  archetype: EnemyArchetype,
  id: string,
  position: Vec2,
): Enemy {
  const spec = ENEMY_ARCHETYPES[archetype];
  return {
    id,
    archetype: spec.archetype,
    position: { x: position.x, y: position.y },
    velocity: { x: 0, y: 0 },
    facingAngle: 0,
    hp: spec.hp,
    state: 'patrol',             // 初始一律巡逻
    awareness: 'none', lastSuspiciousPosition: null,
    weapon: spec.weapon,
    patrolTarget: null,          // 巡逻目标:进入房间后由 enemyAI 随机选
    lastSeenPlayerAt: null,      // 上次看见玩家位置:null = 未发现
    alertTimer: 0,
    fireCooldown: 0,
  };
}
