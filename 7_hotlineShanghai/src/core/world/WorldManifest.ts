// src/core/world/WorldManifest.ts — 世界即文本(DEV 可观测 / world-as-text)
// 按 TDD §3.4 __gameManifest 契约设计:
//   describeWorld()(当前房间 / 任务 / 光源)+ describeRules()(物理与玩法常量表)
//   + describeEntities()(玩家 / 敌人 / 子弹 / 投掷物 id 列表与关键状态)+ 快照组合。
// 文本为中文 + 英文标识符混合;所有数据来自 constants / data 与 SimSnapshot。
// core/ 平台纯净:零 THREE / 零 DOM / 零 zustand。

import type { ISimulation, MaskEffect, Player, RcLightKind, RoomLayout, SimSnapshot } from '../types';
import * as C from '../constants';
import { WEAPON_TABLE } from '../data/weapons';
import { MASK_TABLE } from '../data/masks';
import { RC_LIGHT_TABLE } from '../data/lights';
import { ENEMY_ARCHETYPES } from '../data/enemies';
import { TILE_KIND_ZH, tokenizeRoom } from './roomTokenizer';

// buildPromptContext 中最多携带的最近事件条数
const MAX_EVENTS_IN_PROMPT = 16;

// RcLightKind → 中文名
const RC_LIGHT_KIND_ZH: Record<RcLightKind, string> = {
  muzzle_flash: '枪火',
  explosion: '爆炸',
  oil_lamp: '油灯',
  neon_sign: '霓虹',
  searchlight: '探照灯',
  surgical: '手术灯',
  disco: '迪斯科',
  blood_splash: '血溅',
};

// 数字格式化:整数原样,否则保留 2 位小数
function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

// 弹药格式化:Infinity → ∞
function fmtAmmo(n: number): string {
  return n === Infinity ? '∞' : fmt(n);
}

// 弧度 → 角度(1 位小数)
function fmtDeg(rad: number): string {
  return `${((rad * 180) / Math.PI).toFixed(1)}°`;
}

// 玩家单行描述(describeWorld / describeEntities 共用)
function describePlayer(p: Player): string {
  const w = p.weapon ? WEAPON_TABLE[p.weapon] : null;
  return (
    `- 玩家 player pos=(${fmt(p.position.x)},${fmt(p.position.y)}) ` +
    `vel=(${fmt(p.velocity.x)},${fmt(p.velocity.y)}) facing=${fmtDeg(p.facingAngle)} hp=${p.hp} ` +
    `weapon=${p.weapon ?? 'fist(拳头)'}${w ? ` ${w.nameZh}` : ''} ammo=${fmtAmmo(p.ammo)} ` +
    `mode=${p.mode} reloading=${fmt(p.reloading)}s mask=${p.activeMask ?? 'null'} ` +
    `kills=${p.kills} hitsTaken=${p.hitsTaken}`
  );
}

// 面具效果 → 紧凑文本
function describeMaskEffect(effect: MaskEffect): string {
  switch (effect.kind) {
    case 'slowMoOnRoomEnter':
      return `slowMoOnRoomEnter(duration=${effect.slowMoDuration}s, factor=${effect.slowMoFactor})`;
    case 'ammoRefillOnPickup':
      return 'ammoRefillOnPickup';
    case 'meleeRangeBonus':
      return `meleeRangeBonus(+${effect.bonus}u)`;
    case 'dodgeCooldownMult':
      return `dodgeCooldownMult(x${effect.multiplier})`;
    case 'enemySenseMult':
      return `enemySenseMult(x${effect.multiplier})`;
    case 'playerSpeedMult':
      return `playerSpeedMult(x${effect.multiplier}, requiresWeapon=${effect.requiresWeapon})`;
    case 'footstepSilent':
      return 'footstepSilent';
  }
}

// 房间静态光源(L / N / S)与出生 / 刷新点 → 文本行
function describeRoomStatic(room: RoomLayout): string[] {
  const lines: string[] = [];
  const tok = tokenizeRoom(room);
  if (tok.issues.length > 0) {
    for (const iss of tok.issues) {
      lines.push(`  ! 校验 ${iss.message}(row=${iss.row},col=${iss.col})`);
    }
  }
  if (tok.lightTiles.length > 0) {
    const byKind = new Map<string, string[]>();
    for (const lt of tok.lightTiles) {
      const zh = TILE_KIND_ZH[lt.kind];
      const list = byKind.get(zh) ?? [];
      list.push(`(${lt.tile.x},${lt.tile.y})`);
      byKind.set(zh, list);
    }
    lines.push('- 房间静态光源 roomStaticLights:');
    for (const [zh, pts] of byKind) {
      lines.push(`  - ${zh}: ${pts.join(' ')}`);
    }
  } else {
    lines.push('- 房间静态光源 roomStaticLights: (无)');
  }
  lines.push(
    `- 出生点 spawns: player=(${room.playerSpawn.x},${room.playerSpawn.y}) ` +
      `enemies=[${room.enemySpawns.map((s) => `${s.role ?? 'ground_patrol'}@(${s.position.x},${s.position.y})`).join(',')}] ` +
      `exit=${room.exitTile ? `(${room.exitTile.x},${room.exitTile.y})` : 'null'}`,
  );
  if (room.weaponSpawns.length > 0) {
    lines.push(
      `- 武器刷新 weaponSpawns: ${room.weaponSpawns
        .map((s) => `${s.weaponId}@(${s.tile.x},${s.tile.y})`)
        .join(' ')}`,
    );
  }
  if (room.maskSpawns.length > 0) {
    lines.push(
      `- 面具刷新 maskSpawns: ${room.maskSpawns
        .map((s) => `${s.maskId}@(${s.tile.x},${s.tile.y})`)
        .join(' ')}`,
    );
  }
  return lines;
}

// 当前房间 / 任务 / 光源(世界状态)
export function describeWorld(snap: SimSnapshot): string {
  const lines: string[] = [];
  lines.push('# 世界状态 World State');
  lines.push(`- 阶段 phase=${snap.phase}`);
  const mission = snap.currentMission;
  lines.push(
    mission
      ? `- 任务 mission=${mission.id} ${mission.nameZh} (${mission.rooms.length} 房间, BOSS=${mission.finalBossId})`
      : '- 任务 mission=(无 null)',
  );
  const room = snap.currentRoom;
  if (room) {
    lines.push(`- 房间 room=${room.id} ${room.nameZh} 尺寸=${room.width}x${room.height} tileSize=${room.tileSize}u`);
    lines.push(...describeRoomStatic(room));
  } else {
    lines.push('- 房间 room=(无 null)');
  }
  lines.push(describePlayer(snap.player));
  lines.push(`- 存活敌人 aliveEnemies=${snap.enemies.length}`);
  lines.push(`- 活动光源 activeLights=${snap.activeLights.length}`);
  for (const l of snap.activeLights) {
    const ttl = l.ttl === Infinity ? '∞' : `${fmt(l.ttl)}s`;
    lines.push(
      `  - ${l.kind} ${RC_LIGHT_KIND_ZH[l.kind]} pos=(${fmt(l.position.x)},${fmt(l.position.y)}) ` +
        `i=${fmt(l.intensity)} r=${fmt(l.radius)}u ttl=${ttl}`,
    );
  }
  return lines.join('\n');
}

// 物理与玩法常量表(来自 constants.ts / data/*)
export function describeRules(): string {
  const lines: string[] = [];
  lines.push('# 规则 Rules(常量表 Constants)');

  lines.push('## 玩家 Player');
  lines.push(`- PLAYER_SPEED_MAX=${C.PLAYER_SPEED_MAX} u/s 最大移动速度`);
  lines.push(`- PLAYER_ACCEL=${C.PLAYER_ACCEL} u/s² 加速度 / PLAYER_DECEL=${C.PLAYER_DECEL} u/s² 减速度`);
  lines.push(`- PLAYER_BOUND_X=[${C.PLAYER_BOUND_X.join(',')}] PLAYER_BOUND_Y=[${C.PLAYER_BOUND_Y.join(',')}] 世界边界`);
  lines.push(`- PLAYER_RADIUS=${C.PLAYER_RADIUS} u 碰撞半径`);
  lines.push(
    `- PLAYER_MELEE_RANGE=${C.PLAYER_MELEE_RANGE} u / PLAYER_MELEE_ARC_DEG=${C.PLAYER_MELEE_ARC_DEG}° / ` +
      `PLAYER_MELEE_DURATION=${C.PLAYER_MELEE_DURATION}s 近战`,
  );
  lines.push(
    `- PLAYER_DASH_SPEED=${C.PLAYER_DASH_SPEED} u/s × ${C.PLAYER_DASH_DURATION}s,冷却 ${C.PLAYER_DASH_COOLDOWN}s 冲刺`,
  );
  lines.push(`- PLAYER_DODGE_INVULN=${C.PLAYER_DODGE_INVULN}s 无敌,冷却 ${C.PLAYER_DODGE_COOLDOWN}s 翻滚`);
  lines.push(`- PLAYER_RELOAD_DURATION=${C.PLAYER_RELOAD_DURATION}s 换弹`);
  lines.push(`- PLAYER_HITS_TO_KILL_BOSS=${C.PLAYER_HITS_TO_KILL_BOSS} BOSS 击数`);
  lines.push(`- MODE_SWITCH_DURATION=${C.MODE_SWITCH_DURATION}s F 切换近战/远程硬直`);
  lines.push(`- THROW_HOLD_DURATION=${C.THROW_HOLD_DURATION}s E 长按投掷阈值`);

  lines.push('## 武器 Weapons(v1 锁 8 件)');
  for (const w of Object.values(WEAPON_TABLE)) {
    lines.push(
      `- ${w.id} ${w.nameZh} ${w.nameEn}: type=${w.type} damage=${w.damage} ammo=${fmtAmmo(w.ammo)} ` +
        `fireRate=${fmt(w.fireRate)}/s reloadTime=${fmt(w.reloadTime)}s range=${fmt(w.range)}u spread=${w.spread}` +
        (w.silent ? ' silent' : ''),
    );
  }

  lines.push('## 面具 Masks(v1 锁 6 个)');
  for (const m of Object.values(MASK_TABLE)) {
    lines.push(`- ${m.id} ${m.nameZh} ${m.nameEn}: ${m.description} effect=${describeMaskEffect(m.effect)}`);
  }

  lines.push(`## 敌人 Enemies(${Object.keys(ENEMY_ARCHETYPES).length} 种 archetype)`);
  for (const a of Object.values(ENEMY_ARCHETYPES)) {
    lines.push(
      `- ${a.archetype} ${a.nameZh}: hp=${a.hp} speedPatrol=${a.speedPatrol} speedAlert=${a.speedAlert} ` +
        `fireRate=${a.fireRate}/s reactionTime=${a.reactionTime}s weapon=${a.weapon} rank=${a.rank}`,
    );
  }
  lines.push('- 感知 / 索敌(全局):');
  lines.push(`  - ENEMY_VIEW_DISTANCE=${C.ENEMY_VIEW_DISTANCE} u 视野距离 / ENEMY_VIEW_ARC_DEG=${C.ENEMY_VIEW_ARC_DEG}° 视野锥角`);
  lines.push(`  - ENEMY_HEAR_DISTANCE=${C.ENEMY_HEAR_DISTANCE} u 听觉距离 / ENEMY_FIRE_DISTANCE=${C.ENEMY_FIRE_DISTANCE} u 开火距离`);
  lines.push(`  - ENEMY_REACT_TIME=${C.ENEMY_REACT_TIME}s 反应时间 / ENEMY_FIRE_RATE=${C.ENEMY_FIRE_RATE}/s 射速`);
  lines.push(`  - ENEMY_HITS_TO_KILL=${C.ENEMY_HITS_TO_KILL}(一击必杀)/ BOSS_HITS=${C.BOSS_HITS}`);

  lines.push('## 任务 / 房间 Mission & Room');
  lines.push(`- TASKS_TOTAL=${C.TASKS_TOTAL} 任务数 / HIDDEN_TASK_REQUIRED_S=${C.HIDDEN_TASK_REQUIRED_S} 隐藏任务 S 条件`);
  lines.push(`- MISSION_DURATION_TARGET=${C.MISSION_DURATION_TARGET}s 目标时长`);
  lines.push(`- ROOM_ENTER_FADE=${C.ROOM_ENTER_FADE}s 进入淡入 / ROOM_CLEAR_DELAY=${C.ROOM_CLEAR_DELAY}s 清场延迟 / ROOM_EXIT_FADE=${C.ROOM_EXIT_FADE}s 退出淡出`);
  lines.push(`- DEATH_RESPAWN_DELAY=${C.DEATH_RESPAWN_DELAY}s 死亡重生 / BRIEF_TYPEWRITER_SPEED=${C.BRIEF_TYPEWRITER_SPEED}s/字 打字机`);
  lines.push(`- 评分阈值: S≥${C.SCORE_S_THRESHOLD} A≥${C.SCORE_A_THRESHOLD} B≥${C.SCORE_B_THRESHOLD} C≥${C.SCORE_C_THRESHOLD}`);

  lines.push('## RC 管线 RC Pipeline');
  lines.push(`- RC_CASCADE_COUNT=${C.RC_CASCADE_COUNT} / RC_BASE_RAY_COUNT=${C.RC_BASE_RAY_COUNT} / RC_BASE_INTERVAL_PX=${C.RC_BASE_INTERVAL_PX}px`);
  lines.push(`- RC_JFA_PASSES=${C.RC_JFA_PASSES}(-1=自动 log2(min(W,H))) / RC_JFA_RESOLUTION_SCALE=${C.RC_JFA_RESOLUTION_SCALE}`);
  lines.push(`- RC_PROPAGATION_RATE=${C.RC_PROPAGATION_RATE} / RC_MIX_FACTOR=${C.RC_MIX_FACTOR} / RC_MAX_ACTIVE_LIGHTS=${C.RC_MAX_ACTIVE_LIGHTS}`);
  lines.push(`- RC_RAY_BUDGET_PER_PIXEL=${C.RC_RAY_BUDGET_PER_PIXEL} / RC_RAY_BUDGET_TOTAL_HARD_CAP=${C.RC_RAY_BUDGET_TOTAL_HARD_CAP} / RC_MAX_RAY_STEPS=${C.RC_MAX_RAY_STEPS}`);
  lines.push(`- RC_LIGHT_INTENSITY_GAMMA=${C.RC_LIGHT_INTENSITY_GAMMA} / RC_DITHER_MATRIX_SIZE=${C.RC_DITHER_MATRIX_SIZE}×${C.RC_DITHER_MATRIX_SIZE} Bayer`);

  lines.push('## RC 光源 RC Lights(8 类)');
  for (const l of Object.values(RC_LIGHT_TABLE)) {
    const ttl = l.ttl === undefined ? 'static' : `${l.ttl}s`;
    const pulse = l.pulse ? ` pulse=${l.pulse}${l.pulseHz !== undefined ? `@${l.pulseHz}Hz` : ''}` : '';
    lines.push(`- ${l.kind} ${RC_LIGHT_KIND_ZH[l.kind]}: ${l.colorHex} i=${l.intensity} r=${l.radius}u ttl=${ttl}${pulse}`);
  }

  return lines.join('\n');
}

// 实体 id 列表与关键状态(玩家 / 敌人 / 子弹 / 手雷 / 投掷物 / 近战挥砍)
export function describeEntities(snap: SimSnapshot): string {
  const lines: string[] = [];
  lines.push('# 实体 Entities');
  lines.push('## 玩家 Player');
  lines.push(describePlayer(snap.player));
  lines.push(`## 敌人 Enemies ${snap.enemies.length}`);
  for (const e of snap.enemies) {
    lines.push(
      `- ${e.id} ${e.archetype} ${ENEMY_ARCHETYPES[e.archetype].nameZh} ` +
        `pos=(${fmt(e.position.x)},${fmt(e.position.y)}) vel=(${fmt(e.velocity.x)},${fmt(e.velocity.y)}) ` +
        `facing=${fmtDeg(e.facingAngle)} state=${e.state} hp=${e.hp} weapon=${e.weapon} ` +
        `alertTimer=${fmt(e.alertTimer)} fireCooldown=${fmt(e.fireCooldown)}`,
    );
  }
  lines.push(`## 子弹 Bullets ${snap.bullets.length}`);
  for (const b of snap.bullets) {
    lines.push(
      `- ${b.id} owner=${b.ownerId} weapon=${b.weaponId} pos=(${fmt(b.position.x)},${fmt(b.position.y)}) ` +
        `vel=(${fmt(b.velocity.x)},${fmt(b.velocity.y)}) damage=${b.damage} ttl=${fmt(b.ttl)}s`,
    );
  }
  lines.push(`## 手雷 Grenades ${snap.grenades.length}`);
  for (const g of snap.grenades) {
    lines.push(
      `- ${g.id} pos=(${fmt(g.position.x)},${fmt(g.position.y)}) timer=${fmt(g.timer)}s ` +
        `radius=${fmt(g.radius)}u damage=${g.damage}`,
    );
  }
  lines.push(`## 投掷物 ThrownWeapons ${snap.thrownWeapons.length}`);
  for (const tw of snap.thrownWeapons) {
    lines.push(
      `- ${tw.id} weapon=${tw.weaponId} pos=(${fmt(tw.position.x)},${fmt(tw.position.y)}) ` +
        `vel=(${fmt(tw.velocity.x)},${fmt(tw.velocity.y)}) spin=${fmt(tw.spin)} ttl=${fmt(tw.ttl)}s`,
    );
  }
  lines.push(`## 近战挥砍 MeleeSwings ${snap.melee.length}`);
  snap.melee.forEach((m, i) => {
    lines.push(
      `- swing_${i} owner=${m.ownerId} weapon=${m.weaponId} pos=(${fmt(m.position.x)},${fmt(m.position.y)}) ` +
        `facing=${fmtDeg(m.facingAngle)} range=${fmt(m.range)}u arc=${m.arcDeg}° damage=${m.damage} ttl=${fmt(m.ttl)}s`,
    );
  });
  return lines.join('\n');
}

// 组合全文(world-as-text):世界状态 + 规则表 + 实体 + 任务计分 + 最近事件
// 对应 TDD §3.4 __gameManifest 契约:describeWorld + describeRules + describeEntities + sim 快照。
export function buildPromptContext(sim: ISimulation): string {
  const snap = sim.snapshot();
  const parts: string[] = [];
  parts.push('# 热线上海 Hotline Shanghai — 世界即文本 World-as-Text');
  parts.push(describeWorld(snap));
  parts.push(describeRules());
  parts.push(describeEntities(snap));
  parts.push('## 任务计分 Mission Score');
  parts.push(
    snap.missionScore
      ? `- mission=${snap.missionScore.missionId} total=${snap.missionScore.total} rating=${snap.missionScore.rating} ` +
          `time=${fmt(snap.missionScore.timeSeconds)}s pickupRate=${fmt(snap.missionScore.pickupRate)} hitsTaken=${snap.missionScore.hitsTaken}`
      : '- (暂无 null)',
  );
  parts.push(`## 最近事件 Recent Events(最多 ${MAX_EVENTS_IN_PROMPT} 条)`);
  const events = sim.events.slice(-MAX_EVENTS_IN_PROMPT);
  if (events.length === 0) {
    parts.push('- (无)');
  } else {
    for (const ev of events) {
      parts.push(`- ${JSON.stringify(ev)}`);
    }
  }
  return parts.join('\n\n');
}
