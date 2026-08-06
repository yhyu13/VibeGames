import { WORLD } from './world';
import { PlayerState, EnemyState, ProjectileState } from '../types';
import { getWeapon } from '../data/weapons';
import { getEnemyDef } from '../data/enemies';
import { getBoss } from '../data/bosses';
import { vec3Dist } from '../math';

/**
 * Token 化层（C.A.T「T」原则）— 把 3D 世界序列化为 AI 可直接读取的文本。
 * `buildPromptContext` 给出完整上下文（世界清单 + 域规则 + 实时实体状态）。
 */

export interface SimulationLike {
  players: PlayerState[];
  enemies: EnemyState[];
  projectiles: ProjectileState[];
  wave: number;
  lockOn: boolean;
  lockTargetId: number | null;
  currentBossIndex: number;
}

function fmt(v: number, digits = 1): string {
  return v.toFixed(digits);
}

/** 世界清单：竞技场、碰撞体、命名标记、生成带。 */
export function describeWorld(): string {
  const m = WORLD;
  const lines: string[] = [
    `# ${m.name} — World Manifest v${m.version}`,
    `unit: ${m.unit}`,
    '',
    `## Arena`,
    `bounds: x±${fmt(m.arena.halfExtents.x, 0)} y±${fmt(m.arena.halfExtents.y, 0)} z±${fmt(m.arena.halfExtents.z, 0)} (${m.arena.note})`,
    '',
    `## Colliders (sphere)`,
    ...m.colliders.map(c => `- ${c.key}: r=${c.radius}${c.notes ? ` (${c.notes})` : ''}`),
    '',
    `## Named markers`,
    ...m.markers.map(k => `- [${k.id}] ${k.label} @ (${fmt(k.pos.x)}, ${fmt(k.pos.y)}, ${fmt(k.pos.z)})`),
    '',
    `## Spawn bands`,
    ...m.spawnBands.map(s => `- ${s.label}: ${s.minDist}..${s.maxDist}m — ${s.note}`),
    '',
    `## Caps`,
    `maxEnemies=${m.caps.maxEnemies} maxProjectiles=${m.caps.maxProjectiles}`,
    '',
    `## Pacing`,
    `boss every ${m.pacing.bossWaveInterval} waves; ${m.pacing.intermissionSeconds}s intermission after clear; flee lasts ${m.pacing.fleeDurationSeconds}s`,
    '',
    `## Lock system`,
    `baseRange=${m.locks.baseRange} dropRange=${m.locks.dropRange} aimStick=${m.locks.aimStick} (effective range = max(weapon.lockRange, baseRange))`,
  ];
  return lines.join('\n');
}

/** 域规则：操作映射、胜负条件、经济循环（常量文本化）。 */
export function describeRules(): string {
  return [
    `# Domain Rules`,
    '',
    `## Controls`,
    `WASD = fly (camera-relative, W toward crosshair), Shift/Ctrl = up/down, mouse = aim, LMB = shoot`,
    `Space hold = boost (drains EN, 3x speed), Space double-tap = dodge dash (i-frames + cooldown), E = brake`,
    `1-6 = switch weapon (unlocked by wave), Tab = toggle lock-on, Z = special (costs full gauge), Esc/Enter = pause`,
    '',
    `## Win / lose`,
    `Clear all enemies in a wave to advance (boss wave: kill the boss). Intermission 2.5s between waves.`,
    `Game over when the player's HP reaches 0.`,
    '',
    `## Economy`,
    `Kills grant score per enemy table and raise combo (resets after ${2}s without a kill).`,
    `Wave n scales enemy hp ×(1+0.1n) and speed ×(1+0.05n).`,
    `Special gauge fills +2/s; Z fires a full-screen beam (150 dmg, 50m radius).`,
    `Boost drains EN 35/s; EN regenerates 25%/s when not boosting.`,
    '',
    `## Weapons`,
    ...WORLD.weapons.map(w =>
      `W${w.id} ${w.name}: dmg=${w.damage} rate=${w.fireRate}s speed=${w.speed} ${w.fireMode} lockRange=${w.lockRange} smartRadius=${w.smartRadius} unlock=wave${w.unlockLevel}`),
    '',
    `## Enemies`,
    ...WORLD.enemies.map(e =>
      `E-${e.type} ${e.name}: hp=${e.hp} speed=${e.speed} dmg=${e.damage} attackRange=${e.attackRange} alertRange=${e.alertRange} score=${e.score}`),
    '',
    `## Bosses`,
    ...WORLD.bosses.map(b =>
      `B${b.id} ${b.name}: score=${b.score} phases=${b.phases.map(p => `${Math.round(p.hpPercent * 100)}%:${p.attackPattern}`).join(' → ')}`),
  ].join('\n');
}

/** 实时实体状态快照 — 每帧可生成的“世界即文本”。 */
export function describeEntities(sim: SimulationLike): string {
  const lines: string[] = [`wave=${sim.wave} lock=${sim.lockOn ? 'ON' : 'off'}`];
  const p0 = sim.players[0];
  sim.players.forEach(p => {
    lines.push(
      `P${p.id} pos=(${fmt(p.pos.x)},${fmt(p.pos.y)},${fmt(p.pos.z)}) hp=${Math.ceil(p.hp)}/${p.maxHp} ` +
      `en=${Math.ceil(p.energy)}/${p.maxEnergy} weapon=${p.weapon}(${getWeapon(p.weapon).name}) ` +
      `combo=${p.combo} score=${p.score}`
    );
  });
  sim.enemies.forEach(e => {
    const def = getEnemyDef(e.type);
    const dist = p0 ? vec3Dist(e.pos, p0.pos) : 0;
    lines.push(
      `E${e.id} ${e.type} pos=(${fmt(e.pos.x)},${fmt(e.pos.y)},${fmt(e.pos.z)}) hp=${Math.ceil(e.hp)}/${e.maxHp} ` +
      `state=${e.state} dist=${fmt(dist)}${e.type === 'boss' ? ` bossName=${getBoss(sim.currentBossIndex + 1).name}` : ''}`
    );
  });
  if (sim.projectiles.length > 0) {
    lines.push(`projectiles=${sim.projectiles.length} (${sim.projectiles.map(p => p.type).join(',')})`);
  }
  return lines.join('\n');
}

/** 完整 prompt 上下文：世界 + 规则 + 实时状态。 */
export function buildPromptContext(sim: SimulationLike): string {
  return [
    describeWorld(),
    '',
    describeRules(),
    '',
    '## Live state',
    describeEntities(sim),
  ].join('\n');
}
