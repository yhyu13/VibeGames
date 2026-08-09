// src/core/data/missions.ts — 关卡数据(2026-08-09 重置)
// 原 4 任务 / 13 房间已移除并归档至 `_archive-2026-08-09/src/core/data/missions.ts`(可恢复)。
// MISSIONS 暂为空:关卡内容待按新的视觉 / 玩法方向重建后再填回。
import type { Mission } from '../types';

export function missionBossEnemyId(missionId: Mission['id']): string {
  return `${missionId}_boss`;
}

export const MISSIONS: Mission[] = [];

export function getMission(id: Mission['id']): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}
