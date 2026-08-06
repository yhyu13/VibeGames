import { EnemyState, PlayerState, BossPhase, ProjectileState, ProjectileType, EnemyType, AIState, Vector3 } from '../types';
import { vec3Add, vec3Scale, vec3Sub, vec3Normalize, randRange } from '../math';

/**
 * Boss 攻击模式 — 平台无关（C.A.T「A」原则）。
 * 弹体/小兵生成通过 ctx 回调交给宿主仿真（统一加 id、入列并转事件）。
 */
export interface BossPatternState {
  sweepAngle: number;
  netAngle: number;
}

export interface BossAttackContext {
  genId: () => number;
  target: PlayerState | null;
  patternState: BossPatternState;
  spawnProjectile: (proj: ProjectileState) => void;
  spawnMinion: (enemy: EnemyState) => void;
}

function bullet(
  genId: () => number,
  origin: Vector3,
  dir: Vector3,
  speed: number,
  damage: number,
  type: ProjectileType,
  lifetime: number,
  radius: number,
  color: string,
): ProjectileState {
  return {
    id: genId(), pos: { ...origin }, vel: vec3Scale(dir, speed),
    damage, owner: 0, type, lifetime, radius, color,
  };
}

export function runBossAttack(
  pattern: string,
  boss: EnemyState,
  phase: BossPhase,
  dt: number,
  ctx: BossAttackContext,
): void {
  const { genId, patternState, target } = ctx;
  const owner = boss.id + 10000;

  switch (pattern) {
    case 'spread': {
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const dir = { x: Math.cos(angle), y: 0, z: Math.sin(angle) };
        ctx.spawnProjectile(bullet(genId, boss.pos, dir, 10, 5, ProjectileType.BossBullet, 4, 0.3, '#ff4444'));
      }
      break;
    }
    case 'laser':
    case 'finalBeam': {
      if (!target) return;
      const dir = vec3Normalize(vec3Sub(target.pos, boss.pos));
      ctx.spawnProjectile(bullet(genId, boss.pos, dir, 30, 25, ProjectileType.Laser, 2, 0.5, '#ff0000'));
      break;
    }
    case 'missile': {
      if (!target) return;
      for (let i = 0; i < 5; i++) {
        const dir = vec3Normalize(vec3Sub(target.pos, boss.pos));
        const spread = { x: (Math.random() - 0.5) * 2, y: 0, z: (Math.random() - 0.5) * 2 };
        ctx.spawnProjectile(bullet(genId, boss.pos, vec3Add(dir, spread), 8, 10, ProjectileType.Missile, 5, 0.4, '#ffaa00'));
      }
      break;
    }
    case 'rush': {
      if (!target) return;
      boss.speed = 20;
      const rushDir = vec3Normalize(vec3Sub(target.pos, boss.pos));
      boss.pos = vec3Add(boss.pos, vec3Scale(rushDir, boss.speed * dt));
      break;
    }
    case 'clone': {
      if (!target) return;
      const baseDir = vec3Normalize(vec3Sub(target.pos, boss.pos));
      const baseAngle = Math.atan2(baseDir.z, baseDir.x);
      for (let i = -2; i <= 2; i++) {
        const a = baseAngle + i * 0.6;
        const dir = vec3Normalize({ x: Math.cos(a), y: baseDir.y, z: Math.sin(a) });
        ctx.spawnProjectile(bullet(genId, boss.pos, dir, 16, 8, ProjectileType.BossBullet, 3.5, 0.3, '#ff00ff'));
      }
      break;
    }
    case 'fullLaser': {
      for (let i = 0; i < 6; i++) {
        const a = patternState.sweepAngle + (i / 6) * Math.PI * 2;
        const dir = { x: Math.cos(a), y: 0, z: Math.sin(a) };
        ctx.spawnProjectile(bullet(genId, boss.pos, dir, 26, 15, ProjectileType.Laser, 2.2, 0.5, '#ff00ff'));
      }
      patternState.sweepAngle += Math.PI / 8;
      break;
    }
    case 'shield': {
      boss.shieldTimer = Math.max(boss.shieldTimer || 0, 4);
      break;
    }
    case 'laserNet': {
      if (!target) return;
      const netDir = vec3Normalize(vec3Sub(target.pos, boss.pos));
      const netAngle = Math.atan2(netDir.z, netDir.x) + patternState.netAngle;
      for (let i = 0; i < 9; i++) {
        const t = i / 8 - 0.5;
        const a = netAngle + t * Math.PI * 0.66;
        const dir = { x: Math.cos(a), y: 0, z: Math.sin(a) };
        ctx.spawnProjectile(bullet(genId, boss.pos, dir, 25, 12, ProjectileType.Laser, 2.5, 0.4, '#ffaa00'));
      }
      patternState.netAngle += Math.PI / 9;
      break;
    }
    case 'spawn': {
      if (phase.minionSpawn) {
        for (let i = 0; i < 3; i++) {
          const minion: EnemyState = {
            id: genId(), type: EnemyType.Scout,
            pos: { x: boss.pos.x + randRange(-5, 5), y: 0, z: boss.pos.z + randRange(-5, 5) },
            rot: { x: 0, y: 0, z: 0 }, hp: 20, maxHp: 20, speed: 10,
            state: AIState.Chase, targetId: 0, attackTimer: 1,
          };
          ctx.spawnMinion(minion);
        }
      }
      break;
    }
  }
}
