// src/core/simulation/mission.ts — 任务 / 房间推进 / 评分(MissionScore)
// 纯函数 / 状态累加:协调器持有 MissionState,每 tick 推进计时、检测房间清除,
// 任务结算时生成 MissionScore 并派发 missionEnd 事件。
// 数值冻结:TDD §4.4.5(MISSION_DURATION_TARGET / SCORE_*_THRESHOLD)。
// 注意:受击次数(hitsTaken)由 damage.ts 记入 player.hitsTaken,本模块不在 state 里重复记账。
import type { Enemy, Mission, MissionScore, Rating, RoomLayout, SimEvent } from '../types';
import { SCORE_S_THRESHOLD, SCORE_A_THRESHOLD, SCORE_B_THRESHOLD, MISSION_DURATION_TARGET } from '../constants';
import { clamp } from '../math';

// 任务进行状态(协调器持有;死亡重开同任务时保留计时与拾取进度)
export interface MissionState {
  missionId: string;
  roomIndex: number;       // 当前房间下标(0 起)
  elapsedSeconds: number;  // 累计任务时间(暂停 / 死亡期间不计)
  pickupsTotal: number;    // 全任务可拾取物总数(武器 + 面具)
  pickupsTaken: number;    // 已拾取数
}

// 开始一个任务:房间下标归零,统计全任务可拾取物总数
export function startMission(mission: Mission): MissionState {
  const pickupsTotal = mission.rooms.reduce(
    (sum, room) => sum + room.weaponSpawns.length + room.maskSpawns.length,
    0,
  );
  return {
    missionId: mission.id,
    roomIndex: 0,
    elapsedSeconds: 0,
    pickupsTotal,
    pickupsTaken: 0,
  };
}

// 当前房间布局(无任务 / 越界返回 null)
export function currentRoom(state: MissionState, mission: Mission): RoomLayout | null {
  return mission.rooms[state.roomIndex] ?? null;
}

// 本房间清除判定:传入当前房间全部敌人(含已死亡未移除者),全部 hp ≤ 0 即清除
export function isRoomCleared(enemies: Enemy[]): boolean {
  return enemies.every((e) => e.hp <= 0);
}

// 任务通关判定:BOSS(finalBossId)已死亡
export function isMissionCleared(mission: Mission, enemies: Enemy[]): boolean {
  return enemies.some((e) => e.id === mission.finalBossId && e.hp <= 0);
}

// 推进到下一房间;已处于最后一间返回 null(由协调器派发 missionEnd)
export function advanceRoom(state: MissionState, mission: Mission): RoomLayout | null {
  if (state.roomIndex >= mission.rooms.length - 1) return null;
  state.roomIndex += 1;
  return mission.rooms[state.roomIndex];
}

// 记录一次拾取(武器 / 面具)
export function recordPickup(state: MissionState): void {
  state.pickupsTaken += 1;
}

// 推进任务计时(仅 MISSION_PLAY 时调用;暂停 / 死亡 / 结算期间不要调用)
export function tickMission(state: MissionState, dt: number): void {
  state.elapsedSeconds += dt;
}

// 结算评分:timeSeconds 越短越好 / pickupRate 越高越好 / hitsTaken 越少越好
export function finalizeScore(state: MissionState, hitsTaken: number): MissionScore {
  const pickupRate = state.pickupsTotal > 0 ? state.pickupsTaken / state.pickupsTotal : 1;
  return calculateRating(state.elapsedSeconds, pickupRate, hitsTaken, state.missionId);
}

// 评分计算(冻结阈值:SCORE_S=90 / SCORE_A=75 / SCORE_B=60 / SCORE_C=0)
export function calculateRating(timeSeconds: number, pickupRate: number, hitsTaken: number, missionId = ''): MissionScore {
  // 时间因子:基准 MISSION_DURATION_TARGET=180s,超出为 0
  const timeFactor = clamp(1 - timeSeconds / MISSION_DURATION_TARGET, 0, 1);
  // 拾取因子:0..1
  const pickupFactor = clamp(pickupRate, 0, 1);
  // 受击因子:每受击一次扣 0.1,最低 0
  const hitsFactor = clamp(1 - hitsTaken * 0.1, 0, 1);
  const total = Math.round((timeFactor * 0.4 + pickupFactor * 0.3 + hitsFactor * 0.3) * 100);
  const rating: Rating =
    total >= SCORE_S_THRESHOLD ? 'S' : total >= SCORE_A_THRESHOLD ? 'A' : total >= SCORE_B_THRESHOLD ? 'B' : 'C';
  return { missionId, timeSeconds, pickupRate, hitsTaken, total, rating };
}

// 事件构造(协调器直接 push 进 SimEvent 队列)
export function makeRoomEnterEvent(roomId: string): SimEvent {
  return { kind: 'roomEnter', roomId };
}

// 事件构造(协调器直接 push 进 SimEvent 队列)
export function makeRoomClearEvent(roomId: string): SimEvent {
  return { kind: 'roomClear', roomId };
}

// 事件构造(协调器在结算时 push)
export function makeMissionEndEvent(score: MissionScore): SimEvent {
  return { kind: 'missionEnd', score };
}
