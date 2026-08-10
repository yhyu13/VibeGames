/**
 * core/simulation/describe.ts — world-as-text 描述(用于 __gameManifest())
 *
 * v2.0 divine-drums。只读 sim.snapshot()(公共 API),不触碰内部状态。
 */

import {
  ARMY_UNIT_COUNT,
  ATTACK_DAMAGE,
  BERSERK_DAMAGE_MULT,
  BERSERK_TURNS,
  BOSS_AUTO_TURN_S,
  BOSS_ENRAGE_DAMAGE_MULT,
  BOSS_ENRAGE_HP,
  BOSS_HP_MAX,
  CHARGE_DAMAGE,
  COMMAND_LENGTH,
  FEVER_DAMAGE_MULT,
  FEVER_TRIGGERS,
  HEAVY_DAMAGE,
  JUDGE_WINDOW_GOOD_MS,
  JUDGE_WINDOW_NORMAL_MS,
  JUDGE_WINDOW_PERFECT_MS,
  MARCH_DISTANCE,
  PERF_DEGRADATION_FRAMES,
  PERF_FRAME_BUDGET_MS,
  PERF_RECOVERY_FRAMES,
  PROXIMITY_MAX_BONUS,
  RALLY_HEAL,
  SONG_BPM,
  SONG_COUNT,
  SONG_DURATION_S,
  UNIT_HP_MAX,
  VOLLEY_DAMAGE,
} from '../constants.js';
import { DEFAULT_AUDIENCE } from '../data/audience.js';
import { COMMANDS } from '../data/commands.js';
import { DEFAULT_COURT_VOXELS } from '../data/court.js';
import type { Simulation } from './Simulation.js';

const fmt = (n: number): string => n.toFixed(2);

/** 世界文本:phase / 军队 / boss / 节奏 */
export function describeWorld(sim: Simulation): string {
  const s = sim.snapshot();
  const units = s.army.units
    .map((u) => `${u.id}[${u.state}] hp=${u.hp}/${u.maxHp} x=${fmt(u.position.x)}`)
    .join(' ');
  return [
    'Patapong 3D — world (v2.0 divine-drums)',
    `phase=${s.phase} song=${s.rhythm.songIndex + 1}/${SONG_COUNT} t=${fmt(s.rhythm.songTime)}s note#${s.rhythm.activeNoteIndex} combo=${s.rhythm.combo}(max ${s.rhythm.maxCombo})`,
    `army x=${fmt(s.army.formationOffset)} def=${s.army.defendTurns} ret=${s.army.retreatTurns} brs=${s.army.berserkTurns} last=${s.army.lastCommand ?? '-'} :: ${units}`,
    `boss hp=${fmt(s.boss.hp)}/${s.boss.maxHp} state=${s.boss.state} telegraph=${s.boss.telegraph ?? '-'} enraged=${s.boss.enraged} attacks=${s.boss.attackCount}`,
    `fever active=${s.fever.active} level=${s.fever.level} t=${fmt(s.fever.timeLeft)}s dmgx=${s.fever.damageMult}`,
    `court floorVoxels=${DEFAULT_COURT_VOXELS.length} audience=${DEFAULT_AUDIENCE.length}`,
  ].join('\n');
}

/** 规则文本:冻结数值表(TDD §4) */
export function describeRules(_sim: Simulation): string {
  return [
    'Patapong 3D — rules(v2.0 冻结数值,见 TDD §4)',
    `judge: perfect=±${JUDGE_WINDOW_PERFECT_MS}ms good=±${JUDGE_WINDOW_GOOD_MS}ms normal=±${JUDGE_WINDOW_NORMAL_MS}ms`,
    `command: length=${COMMAND_LENGTH} attack=${ATTACK_DAMAGE} charge=${CHARGE_DAMAGE} heavy=${HEAVY_DAMAGE} volley=${VOLLEY_DAMAGE} rallyHeal=${RALLY_HEAL} march=${MARCH_DISTANCE}u berserk=x${BERSERK_DAMAGE_MULT}/${BERSERK_TURNS}t proximity<=+${PROXIMITY_MAX_BONUS * 100}%`,
    `army: units=${ARMY_UNIT_COUNT} hp=${UNIT_HP_MAX}each | boss: hp=${BOSS_HP_MAX} enrage<=${BOSS_ENRAGE_HP}(x${BOSS_ENRAGE_DAMAGE_MULT}) autoTurn=${BOSS_AUTO_TURN_S}s`,
    `fever: combo=[${FEVER_TRIGGERS.join('/')}] dmgx=${FEVER_DAMAGE_MULT}`,
    `song: count=${SONG_COUNT} dur=${SONG_DURATION_S}s bpm=${SONG_BPM}`,
    `perf: frameBudget=${PERF_FRAME_BUDGET_MS}ms degradeFrames=${PERF_DEGRADATION_FRAMES} recoveryFrames=${PERF_RECOVERY_FRAMES}`,
    `commands: ${COMMANDS.map((c) => `${c.name}=${c.sequence.join('·')}`).join(' | ')}`,
  ].join('\n');
}

/** 实体清单:体素 / 观众 / 军队 / boss */
export function describeEntities(sim: Simulation): string {
  const s = sim.snapshot();
  const audienceIds = DEFAULT_AUDIENCE.map((a) => a.id).join(',');
  return [
    'Patapong 3D — entities (v2.0)',
    `court.voxels=${DEFAULT_COURT_VOXELS.length}(floor+decor+drumpads)`,
    `court.audience=${DEFAULT_AUDIENCE.length}: ${audienceIds}`,
    `army.units: ${s.army.units.map((u) => `${u.id}=${u.characterId}`).join(', ')}`,
    'boss=boss-moloch',
  ].join('\n');
}
