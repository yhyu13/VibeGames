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
      '#....L.N.#',
      '#.X....X.#',
      '#........#',
      '#........#',
      '#.X..X...#',
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
      { tile: { x: 2, y: 5 }, kind: 'sandbag' },
      { tile: { x: 5, y: 5 }, kind: 'sandbag' },
      { tile: { x: 7, y: 1 }, kind: 'neon_sign' },
    ],
  },
  // v3.6 S5:后间——2 名巡逻兵(警报传播验收房);油灯 L + 霓虹 N + 沙袋 X + 出口 D
  // 入口在左上(playerSpawn 贴门位),巡逻折返段:[2,5] @y4 与 [5,8] @y6,互不重叠
  {
    id: 'm1_backroom',
    nameZh: '后间',
    width: 10,
    height: 9,
    tileSize: 1,
    tiles: [
      '##########',
      '#.X....X.#',
      '#........#',
      '#..L.....#',
      '#........#',
      '#.X..N.X.#',
      '#........#',
      '#.....X.D#',
      '##########',
    ],
    playerSpawn: { x: 2, y: 2 },
    enemySpawns: [{ x: 2, y: 4 }, { x: 5, y: 6 }],
    weaponSpawns: [],
    maskSpawns: [],
    exitTile: { x: 8, y: 7 },
    floorPalette: ['#3a1410', '#050408'],
    wallPattern: 'red_brick',
    furniture: [
      { tile: { x: 2, y: 1 }, kind: 'sandbag' },
      { tile: { x: 7, y: 1 }, kind: 'sandbag' },
      { tile: { x: 2, y: 5 }, kind: 'sandbag' },
      { tile: { x: 7, y: 5 }, kind: 'sandbag' },
      { tile: { x: 6, y: 7 }, kind: 'sandbag' },
      { tile: { x: 5, y: 5 }, kind: 'neon_sign' },
    ],
  }],
}];

export function getMission(id: Mission['id']): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}
