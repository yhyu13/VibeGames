// src/core/simulation/enemyAI.ts — 敌人 AI 状态机(patrol → suspicious → alert → engaging)
// ⚠️ DEPRECATED(2026-08-15):本模块是死代码,无任何调用者。开火 FSM 已内联进 Simulation.ts
// (0.4s 瞄准电报 ENEMY_AIM_TELEGRAPH_S → enemyFire() 子弹 → 玩家中弹 OHK)。保留仅为历史对照,勿接线。
// 纯函数:只修改传入的 Enemy 状态,不触碰事件队列 / 平台 API。
// 敌情以返回值(EnemyAiEvent[])暴露,由 Simulation 协调器派发为 SimEvent
// (enemyAlert / enemyAttack)并依据 enemyFire 创建敌方子弹。
// 感知数值(视野 / 听觉 / 反应 / 射速 / 移动)一律来自 constants.ts(冻结 §4.4.4)。
// 注意:本模块不做墙体碰撞,由协调器按 tileMap 钳制敌人位置。
import type { Enemy, Player, Vec2 } from '../types';
import {
  ENEMY_VIEW_DISTANCE,
  ENEMY_VIEW_ARC_DEG,
  ENEMY_HEAR_DISTANCE,
  ENEMY_FIRE_DISTANCE,
  ENEMY_SPEED_PATROL,
  ENEMY_SPEED_ALERT,
  ENEMY_REACT_TIME,
  ENEMY_FIRE_RATE,
} from '../constants';
import { v2Dist, v2Sub, isPointInArc, vecToAngle } from '../math';

// ─── 模块内常量(白名单限制:不进 constants.ts,均为状态机内部调参)───
// 巡逻目标到达判定距离(u)
const PATROL_REACH_DIST = 0.4;
// 巡逻随机目标半径(u)
const PATROL_TARGET_RADIUS = 4;
// 丢失玩家视线后维持警觉的时长(s),超时回到巡逻
const ALERT_LOSE_SECONDS = 3;

// 敌情事件(协调器派发用)
export type EnemyAiEvent =
  | { kind: 'enemyAlert'; enemyId: string; position: Vec2 }
  | { kind: 'enemyAttack'; enemyId: string; position: Vec2 }
  | { kind: 'enemyFire'; enemyId: string; position: Vec2; angle: number };

// 敌人更新参数
export interface EnemyUpdateParams {
  player: Player;
  dt: number;
  // 本帧响亮声音的位置(枪声 / 爆炸等);飞刀等 silent 武器不传入 → 不触发听觉
  noise?: Vec2 | null;
  // 感知倍率(waiter 面具 0.7):同时缩放视野与听觉距离,默认 1
  senseMult?: number;
  // 敌人时间缩放(actor 面具入场慢动作 0.3),默认 1
  timeScale?: number;
  // 巡逻 / 移动钳制范围(房间世界 AABB;缺省不钳制,防漫游出房)
  bounds?: { min: Vec2; max: Vec2 };
  // B02:视线遮挡回调(墙/掩体挡视线 → true);缺省不遮挡
  isLineBlocked?: (a: Vec2, b: Vec2) => boolean;
  // B02:目标点是否不可达(墙/掩体内 → true);巡逻选点避开实心 tile
  isBlocked?: (pos: Vec2) => boolean;
}

// 更新单个敌人一帧,返回本帧产生的敌情事件
export function updateEnemy(enemy: Enemy, params: EnemyUpdateParams): EnemyAiEvent[] {
  const events: EnemyAiEvent[] = [];
  const dt = params.dt * (params.timeScale ?? 1);
  const senseMult = params.senseMult ?? 1;
  const player = params.player;
  const noise = params.noise ?? null;
  const bounds = params.bounds;

  const seesPlayer = canEnemySeePlayer(enemy, player, senseMult, params.isLineBlocked);
  const hearsNoise = noise !== null && v2Dist(enemy.position, noise) <= ENEMY_HEAR_DISTANCE * senseMult;

  switch (enemy.state) {
    case 'patrol': {
      // 感知到玩家或噪音 → 怀疑(转头)
      if (seesPlayer) {
        enemy.lastSeenPlayerAt = { ...player.position };
        enterSuspicious(enemy);
      } else if (noise !== null && v2Dist(enemy.position, noise) <= ENEMY_HEAR_DISTANCE * senseMult) {
        enemy.lastSeenPlayerAt = { ...noise };
        enterSuspicious(enemy);
      } else {
        // 没有巡逻目标或已到达 → 重新选一个随机目标
        if (enemy.patrolTarget === null || v2Dist(enemy.position, enemy.patrolTarget) < PATROL_REACH_DIST) {
          enemy.patrolTarget = pickPatrolTarget(enemy.position, bounds, params.isBlocked);
        }
        moveToward(enemy, enemy.patrolTarget, ENEMY_SPEED_PATROL, dt, bounds);
      }
      break;
    }
    case 'suspicious': {
      if (seesPlayer) {
        enemy.lastSeenPlayerAt = { ...player.position };
        enemy.alertTimer += dt;
        if (enemy.alertTimer >= ENEMY_REACT_TIME) {
          enterAlert(enemy);
          events.push({ kind: 'enemyAlert', enemyId: enemy.id, position: { ...enemy.position } });
        }
      } else if (hearsNoise && noise !== null) {
        enemy.lastSeenPlayerAt = { ...noise };
        enemy.alertTimer += dt;
        if (enemy.alertTimer >= ENEMY_REACT_TIME) {
          enterAlert(enemy);
          events.push({ kind: 'enemyAlert', enemyId: enemy.id, position: { ...enemy.position } });
        }
      } else {
        // 既看不到也听不到:怀疑消退 → 回到巡逻
        enemy.alertTimer -= dt;
        if (enemy.alertTimer <= 0) {
          enemy.state = 'patrol';
          enemy.alertTimer = 0;
        }
      }
      // 怀疑期间朝最后已知位置转头
      if (enemy.lastSeenPlayerAt !== null) {
        enemy.facingAngle = vecToAngle(v2Sub(enemy.lastSeenPlayerAt, enemy.position));
      }
      break;
    }
    case 'alert': {
      if (seesPlayer) {
        enemy.lastSeenPlayerAt = { ...player.position };
        enemy.alertTimer = 0;
        if (v2Dist(enemy.position, player.position) <= ENEMY_FIRE_DISTANCE) {
          // 进入射程 → 交火
          enemy.state = 'engaging';
        } else {
          // 在射程外:追击(钳制在房间内)
          moveToward(enemy, player.position, ENEMY_SPEED_ALERT, dt, bounds);
        }
      } else {
        // 丢失视线:追向最后已知位置;超时回到巡逻
        enemy.alertTimer += dt;
        if (enemy.lastSeenPlayerAt !== null) {
          moveToward(enemy, enemy.lastSeenPlayerAt, ENEMY_SPEED_ALERT, dt, bounds);
        }
        if (enemy.alertTimer >= ALERT_LOSE_SECONDS) {
          enemy.state = 'patrol';
          enemy.alertTimer = 0;
          enemy.lastSeenPlayerAt = null;
          enemy.patrolTarget = null;
        }
      }
      break;
    }
    case 'engaging': {
      if (seesPlayer) {
        enemy.lastSeenPlayerAt = { ...player.position };
        enemy.alertTimer = 0;
        if (v2Dist(enemy.position, player.position) > ENEMY_FIRE_DISTANCE) {
          // 玩家拉出射程 → 退回警觉追猎
          enemy.state = 'alert';
          break;
        }
        // 面朝玩家并按射速开火
        enemy.facingAngle = vecToAngle(v2Sub(player.position, enemy.position));
        enemy.fireCooldown -= dt;
        if (enemy.fireCooldown <= 0) {
          enemy.fireCooldown = 1 / ENEMY_FIRE_RATE;
          events.push(
            { kind: 'enemyAttack', enemyId: enemy.id, position: { ...enemy.position } },
            { kind: 'enemyFire', enemyId: enemy.id, position: { ...enemy.position }, angle: enemy.facingAngle },
          );
        }
      } else {
        // 丢失视线 → 警觉追踪
        enemy.state = 'alert';
        enemy.alertTimer = 0;
      }
      break;
    }
  }
  return events;
}

// 兼容旧签名的便捷包装:默认 senseMult=1 / timeScale=1
export function updateEnemyAI(enemy: Enemy, player: Player, dt: number, noise?: Vec2 | null): EnemyAiEvent[] {
  return updateEnemy(enemy, { player, dt, noise });
}

// 敌人视野判定:距离 ≤ ENEMY_VIEW_DISTANCE 且位于 facing 的 60° 锥内(senseMult 可缩放距离)
export function canEnemySeePlayer(
  enemy: Enemy,
  player: Player,
  senseMult = 1,
  isLineBlocked?: (a: Vec2, b: Vec2) => boolean,
): boolean {
  const viewDist = ENEMY_VIEW_DISTANCE * senseMult;
  if (v2Dist(enemy.position, player.position) > viewDist) return false;
  if (!isPointInArc(enemy.position, enemy.facingAngle, player.position, ENEMY_VIEW_ARC_DEG, viewDist)) return false;
  if (isLineBlocked && isLineBlocked(enemy.position, player.position)) return false;
  return true;
}

// 敌人听觉判定:玩家距敌人 ≤ ENEMY_HEAR_DISTANCE(senseMult 可缩放距离)
export function canEnemyHearPlayer(enemy: Enemy, player: Player, senseMult = 1): boolean {
  return v2Dist(enemy.position, player.position) <= ENEMY_HEAR_DISTANCE * senseMult;
}

// 进入怀疑状态:重置反应计时与开火冷却
function enterSuspicious(enemy: Enemy): void {
  enemy.state = 'suspicious';
  enemy.alertTimer = 0;
  enemy.fireCooldown = 0;
}

// 进入警觉状态:重置"丢失视线"计时
function enterAlert(enemy: Enemy): void {
  enemy.state = 'alert';
  enemy.alertTimer = 0;
}

// 朝目标以给定速度移动一步(dt 已含时间缩放),并转向移动方向;给定 bounds 时钳制在范围内
function moveToward(enemy: Enemy, target: Vec2, speed: number, dt: number, bounds?: { min: Vec2; max: Vec2 }): void {
  const dx = target.x - enemy.position.x;
  const dy = target.y - enemy.position.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 1e-4) {
    enemy.velocity = { x: 0, y: 0 };
    return;
  }
  enemy.velocity = { x: (dx / dist) * speed, y: (dy / dist) * speed };
  enemy.position.x += enemy.velocity.x * dt;
  enemy.position.y += enemy.velocity.y * dt;
  const clamped = clampToBounds(enemy.position, bounds);
  enemy.position.x = clamped.x;
  enemy.position.y = clamped.y;
  enemy.facingAngle = vecToAngle(v2Sub(target, enemy.position));
}

// 巡逻目标点:以当前位置为圆心随机,再钳制进 bounds(房间内,防止漫游出房)
function pickPatrolTarget(
  from: Vec2,
  bounds?: { min: Vec2; max: Vec2 },
  isBlocked?: (pos: Vec2) => boolean,
): Vec2 {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * PATROL_TARGET_RADIUS;
    const candidate = clampToBounds({ x: from.x + Math.cos(a) * r, y: from.y + Math.sin(a) * r }, bounds);
    if (!isBlocked || !isBlocked(candidate)) return candidate;
  }
  // 全部候选被挡(极小房间):退回原地,避免原地打转
  return clampToBounds(from, bounds);
}

// 向量钳制到矩形范围(缺省原样返回)
function clampToBounds(v: Vec2, bounds?: { min: Vec2; max: Vec2 }): Vec2 {
  if (!bounds) return v;
  return {
    x: Math.min(Math.max(v.x, bounds.min.x), bounds.max.x),
    y: Math.min(Math.max(v.y, bounds.min.y), bounds.max.y),
  };
}
