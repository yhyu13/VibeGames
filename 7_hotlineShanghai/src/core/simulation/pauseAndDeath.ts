// src/core/simulation/pauseAndDeath.ts — 暂停 / 死亡计时(DEATH_RESPAWN_DELAY = 1.2s,冻结 §4.4.5)
// 协调器持有 PauseDeathState:玩家死亡时置 MISSION_DEATH 并复位计时,
// 每帧调用 updateDeathTimer 推进;计时完成后协调器重生到任务 Room 1。
// 暂停(Tab):paused = true 时协调器冻结整个模拟(含死亡计时与任务计时)。
import type { GamePhase } from '../types';
import { GamePhase as GP } from '../types';
import { DEATH_RESPAWN_DELAY } from '../constants';

// 死亡 / 暂停状态(协调器持有)
export interface PauseDeathState {
  deathTimer: number; // 死亡计时(0 → DEATH_RESPAWN_DELAY,仅 MISSION_DEATH 时推进)
  paused: boolean;    // Tab 暂停中(暂停时协调器不推进模拟)
}

// 新建死亡 / 暂停状态
export function createPauseDeathState(): PauseDeathState {
  return { deathTimer: 0, paused: false };
}

// 玩家死亡:进入 MISSION_DEATH(仅当处于 MISSION_PLAY),返回新阶段
export function triggerDeath(currentPhase: GamePhase): GamePhase {
  if (currentPhase === GP.MISSION_PLAY) return GP.MISSION_DEATH;
  return currentPhase;
}

// 死亡时调用:复位死亡计时并解除暂停
export function onPlayerKilled(state: PauseDeathState): void {
  state.deathTimer = 0;
  state.paused = false;
}

// 推进死亡计时;返回 true = 达到 DEATH_RESPAWN_DELAY,可以重生(协调器重置任务 Room 1 并回到 MISSION_PLAY)
export function updateDeathTimer(state: PauseDeathState, dt: number): boolean {
  if (state.paused) return false;
  state.deathTimer += dt;
  return state.deathTimer >= DEATH_RESPAWN_DELAY;
}

// 切换暂停(幂等;暂停时模拟冻结)
export function togglePause(state: PauseDeathState): void {
  state.paused = !state.paused;
}

// 是否处于暂停
export function isPaused(state: PauseDeathState): boolean {
  return state.paused;
}

// 旧接口保留:外部自行持有 timer 的死亡计时(phase 为 MISSION_DEATH 时推进)
export function tickDeath(phase: GamePhase, timer: number, dt: number): { phase: GamePhase; timer: number } {
  if (phase !== GP.MISSION_DEATH) return { phase, timer };
  const next = timer + dt;
  if (next >= DEATH_RESPAWN_DELAY) {
    return { phase: GP.MISSION_PLAY, timer: 0 };
  }
  return { phase, timer: next };
}
