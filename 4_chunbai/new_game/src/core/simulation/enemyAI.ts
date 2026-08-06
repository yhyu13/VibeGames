import { EnemyState, PlayerState, EnemyType, AIState, EnemyDef } from '../types';
import { vec3Add, vec3Scale, vec3Sub, vec3Normalize, vec3Dist } from '../math';

/**
 * 敌兵 AI — 平台无关的行为函数（C.A.T「A」原则：纯核心，无渲染/音频副作用）。
 * 副作用通过 ctx 回调（开火 / 自爆接触）交给宿主仿真统一转事件。
 */
export interface EnemyAIContext {
  /** 场上所有敌人（指挥官光环需要） */
  enemies: EnemyState[];
  /** 无敌时长（INVULN_DURATION） */
  invulnDuration: number;
  /** 敌人开火（生成弹体） */
  fire: (enemy: EnemyState, target: PlayerState) => void;
  /** 自爆兵接触玩家：爆炸 + 结算伤害 */
  onBomberContact: (enemy: EnemyState, target: PlayerState, damage: number) => void;
}

export function updateEnemyAI(
  e: EnemyState,
  target: PlayerState,
  dist: number,
  def: EnemyDef,
  dt: number,
  ctx: EnemyAIContext,
) {
  switch (e.type) {
    case EnemyType.Scout:
      updateAIScout(e, target, dist, def, dt, ctx);
      break;
    case EnemyType.Assault:
      updateAIAssault(e, target, dist, def, dt, ctx);
      break;
    case EnemyType.Sniper:
      updateAISniper(e, target, dist, def, dt, ctx);
      break;
    case EnemyType.Shield:
      updateAIShield(e, target, dist, def, dt, ctx);
      break;
    case EnemyType.Bomber:
      updateAIBomber(e, target, dist, def, dt, ctx);
      break;
    case EnemyType.Commander:
      updateAICommander(e, target, dist, def, dt, ctx);
      break;
    default:
      updateAIDefault(e, target, dist, def, dt, ctx);
  }
}

function updateAIDefault(e: EnemyState, target: PlayerState, dist: number, def: EnemyDef, dt: number, ctx: EnemyAIContext) {
  switch (e.state) {
    case AIState.Patrol:
      if (dist < def.alertRange) e.state = AIState.Chase;
      break;
    case AIState.Chase:
      if (dist < def.attackRange) e.state = AIState.Attack;
      else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
      else {
        const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
      }
      break;
    case AIState.Attack:
      if (dist > def.attackRange * 1.2) e.state = AIState.Chase;
      e.attackTimer -= dt;
      if (e.attackTimer <= 0) {
        ctx.fire(e, target);
        e.attackTimer = 0.8 + Math.random() * 0.6;
      }
      break;
    case AIState.Flee:
      if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
      const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
      e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
      break;
  }
}

function updateAIScout(e: EnemyState, target: PlayerState, dist: number, def: EnemyDef, dt: number, ctx: EnemyAIContext) {
  switch (e.state) {
    case AIState.Patrol:
      if (dist < def.alertRange) e.state = AIState.Chase;
      break;
    case AIState.Chase:
      if (dist < def.attackRange) e.state = AIState.Attack;
      else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
      else {
        const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
      }
      break;
    case AIState.Attack:
      if (dist > def.attackRange * 1.3) e.state = AIState.Chase;
      const orbitDir = vec3Normalize(vec3Sub(e.pos, target.pos));
      const strafe = { x: -orbitDir.z, y: 0, z: orbitDir.x };
      e.pos = vec3Add(e.pos, vec3Scale(strafe, e.speed * 0.8 * dt));
      e.attackTimer -= dt;
      if (e.attackTimer <= 0) {
        ctx.fire(e, target);
        e.attackTimer = 0.5 + Math.random() * 0.5;
      }
      break;
    case AIState.Flee:
      if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
      const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
      e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
      break;
  }
}

function updateAIAssault(e: EnemyState, target: PlayerState, dist: number, def: EnemyDef, dt: number, ctx: EnemyAIContext) {
  switch (e.state) {
    case AIState.Patrol:
      if (dist < def.alertRange) e.state = AIState.Chase;
      break;
    case AIState.Chase:
      const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
      e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
      if (dist < def.attackRange) e.state = AIState.Attack;
      break;
    case AIState.Attack:
      const atkDir = vec3Normalize(vec3Sub(target.pos, e.pos));
      e.pos = vec3Add(e.pos, vec3Scale(atkDir, e.speed * 0.5 * dt));
      e.attackTimer -= dt;
      if (e.attackTimer <= 0) {
        ctx.fire(e, target);
        e.attackTimer = 0.3 + Math.random() * 0.3;
      }
      if (dist > def.attackRange * 1.5) e.state = AIState.Chase;
      break;
    case AIState.Flee:
      if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
      const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
      e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
      break;
  }
}

function updateAISniper(e: EnemyState, target: PlayerState, dist: number, def: EnemyDef, dt: number, ctx: EnemyAIContext) {
  switch (e.state) {
    case AIState.Patrol:
      if (dist < def.alertRange) e.state = AIState.Chase;
      break;
    case AIState.Chase:
      if (dist < def.attackRange) {
        e.state = AIState.Attack;
      } else {
        const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
      }
      break;
    case AIState.Attack:
      if (dist < def.attackRange * 0.5) {
        const backDir = vec3Normalize(vec3Sub(e.pos, target.pos));
        e.pos = vec3Add(e.pos, vec3Scale(backDir, e.speed * dt));
      } else if (dist > def.attackRange * 1.2) {
        e.state = AIState.Chase;
      }
      e.attackTimer -= dt;
      if (e.attackTimer <= 0) {
        ctx.fire(e, target);
        e.attackTimer = 1.0 + Math.random() * 0.5;
      }
      break;
    case AIState.Flee:
      if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
      const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
      e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
      break;
  }
}

function updateAIShield(e: EnemyState, target: PlayerState, dist: number, def: EnemyDef, dt: number, ctx: EnemyAIContext) {
  switch (e.state) {
    case AIState.Patrol:
      if (dist < def.alertRange) e.state = AIState.Chase;
      break;
    case AIState.Chase:
      if (dist < def.attackRange) e.state = AIState.Attack;
      else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
      else {
        const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
      }
      break;
    case AIState.Attack:
      const approach = vec3Normalize(vec3Sub(target.pos, e.pos));
      e.pos = vec3Add(e.pos, vec3Scale(approach, e.speed * 0.3 * dt));
      e.attackTimer -= dt;
      if (e.attackTimer <= 0) {
        ctx.fire(e, target);
        e.attackTimer = 1.2 + Math.random() * 0.8;
      }
      if (dist > def.attackRange * 1.5) e.state = AIState.Chase;
      break;
    case AIState.Flee:
      if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
      const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
      e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
      break;
  }
}

function updateAIBomber(e: EnemyState, target: PlayerState, dist: number, def: EnemyDef, dt: number, ctx: EnemyAIContext) {
  switch (e.state) {
    case AIState.Patrol:
      if (dist < def.alertRange) e.state = AIState.Chase;
      break;
    case AIState.Chase:
    case AIState.Attack:
      const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
      e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
      break;
  }
  if (dist < 3) {
    ctx.onBomberContact(e, target, def.damage);
  }
}

function updateAICommander(e: EnemyState, target: PlayerState, dist: number, def: EnemyDef, dt: number, ctx: EnemyAIContext) {
  ctx.enemies.forEach(other => {
    if (other.id === e.id || other.hp <= 0) return;
    const d = vec3Dist(e.pos, other.pos);
    if (d < 30) {
      other.speed = def.speed * 1.3;
    }
  });

  switch (e.state) {
    case AIState.Patrol:
      if (dist < def.alertRange) e.state = AIState.Chase;
      break;
    case AIState.Chase:
      if (dist < def.attackRange) e.state = AIState.Attack;
      else if (dist > def.alertRange * 1.5) e.state = AIState.Patrol;
      else {
        const dir = vec3Normalize(vec3Sub(target.pos, e.pos));
        e.pos = vec3Add(e.pos, vec3Scale(dir, e.speed * dt));
      }
      break;
    case AIState.Attack:
      if (dist > def.attackRange * 1.2) e.state = AIState.Chase;
      e.attackTimer -= dt;
      if (e.attackTimer <= 0) {
        ctx.fire(e, target);
        e.attackTimer = 0.6 + Math.random() * 0.4;
      }
      break;
    case AIState.Flee:
      if (e.hp > def.hp * 0.3) e.state = AIState.Chase;
      const fleeDir = vec3Normalize(vec3Sub(e.pos, target.pos));
      e.pos = vec3Add(e.pos, vec3Scale(fleeDir, e.speed * 1.5 * dt));
      break;
  }
}
