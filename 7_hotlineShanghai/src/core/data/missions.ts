// src/core/data/missions.ts — 关卡数据(2026-08-09 重置)
// 原 4 任务 / 13 房间已移除并归档至 `_archive-2026-08-09/src/core/data/missions.ts`(可恢复)。
// MISSIONS 暂为空:关卡内容待按新的视觉 / 玩法方向重建后再填回。
import type { Mission } from '../types';

export function missionBossEnemyId(missionId: Mission['id']): string {
  return `${missionId}_boss`;
}

export const MISSIONS: Mission[] = [{
  id: 'm1_workshop',
  nameZh: '只此一间',
  brief: '拆掉那盏油灯，在暗处了结巡逻兵。',
  ratingS: 90,
  ratingA: 75,
  ratingB: 60,
  finalBossId: '',
  rooms: [{
    id: 'm1_intro_scene',
    nameZh: '弄堂油灯',
    width: 10,
    height: 9,
    tileSize: 1,
    tiles: [
      '##########',
      '#....L...#',
      '#.X....X.#',
      '#........#',
      '#........#',
      '#........#',
      '#........#',
      '#......D.#',
      '##########',
    ],
    playerSpawn: { x: 2, y: 6 },
    enemySpawns: [{ x: 4, y: 4 }],
    weaponSpawns: [{ tile: { x: 6, y: 5 }, weaponId: 'knife' }],
    maskSpawns: [],
    exitTile: { x: 7, y: 7 },
    floorPalette: ['#3a1410', '#050408'],
    wallPattern: 'red_brick',
    furniture: [
      { tile: { x: 2, y: 2 }, kind: 'sandbag' },
      { tile: { x: 7, y: 2 }, kind: 'sandbag' },
    ],
  }],
}];

export function getMission(id: Mission['id']): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}
