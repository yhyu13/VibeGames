// src/core/data/missions.ts — 单场景关卡数据(2026-08-10 哨塔大院重建)
import type { Mission } from '../types';

export function missionBossEnemyId(missionId: Mission['id']): string {
  return `${missionId}_boss`;
}

export const MISSIONS: Mission[] = [{
  id: 'm1_workshop',
  nameZh: '只此一院',
  brief: '穿过石库门大院，拆掉油灯，避开哨塔探照灯并清除四名守卫。',
  ratingS: 90,
  ratingA: 75,
  ratingB: 60,
  finalBossId: '',
  rooms: [{
    id: 'm1_tower_compound',
    nameZh: '石库门哨塔大院',
    width: 18,
    height: 12,
    tileSize: 1,
    tiles: [
      '##################',
      '#....#.......S..N#',
      '#.X..#..###..X...#',
      '#...L#...........#',
      '#....####........#',
      '#................#',
      '#..X.....##......#',
      '#....X...##..X...#',
      '#.####...........#',
      '#................#',
      '#..............D.#',
      '##################',
    ],
    playerSpawn: { x: 2, y: 10 },
    enemySpawns: [
      { position: { x: 6, y: 9 }, role: 'ground_patrol', patrolAxis: 'horizontal', patrolLength: 3, facingAngle: 0 },
      { position: { x: 4, y: 4 }, role: 'ground_patrol', patrolAxis: 'vertical', patrolLength: 3, facingAngle: -Math.PI / 2 },
      { position: { x: 10, y: 8 }, role: 'ground_patrol', patrolAxis: 'horizontal', patrolLength: 4, facingAngle: Math.PI },
      { position: { x: 13, y: 1 }, role: 'tower_guard', patrolAxis: 'static', patrolLength: 0, facingAngle: Math.PI / 2 },
    ],
    weaponSpawns: [{ tile: { x: 2, y: 9 }, weaponId: 'knife' }],
    maskSpawns: [],
    exitTile: { x: 15, y: 10 },
    floorPalette: ['#3a1410', '#050408'],
    wallPattern: 'red_brick',
    furniture: [
      { tile: { x: 2, y: 2 }, kind: 'sandbag' },
      { tile: { x: 13, y: 1 }, kind: 'searchlight' },
      { tile: { x: 13, y: 2 }, kind: 'sandbag' },
      { tile: { x: 3, y: 6 }, kind: 'sandbag' },
      { tile: { x: 13, y: 7 }, kind: 'sandbag' },
      { tile: { x: 5, y: 7 }, kind: 'sandbag' },
    ],
  }],
}];

export function getMission(id: Mission['id']): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}
