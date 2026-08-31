// src/core/data/missions.ts — 关卡数据(m1 哨塔大院已验证;m2 茶馆 2026-08-30 合入,蓝图 = docs/levels/m2_teahouse.md)
import { PAL_INK, PAL_WOOD_DARK } from '../constants';
import type { Mission } from '../types';

export function missionBossEnemyId(missionId: Mission['id']): string {
  return `${missionId}_boss`;
}

export const MISSIONS: Mission[] = [{
  id: 'm1_workshop',
  nameZh: '只此一院',
  brief: '你是戏班子出身的特务。穿过石库门大院：灯亮时守卫警觉、见你就开枪；拆掉油灯躲进暗处才能安静下手。切勿在灯下杀人，否则警报会招来更多守卫。',
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
    // 亮处击杀警报增援的刷入点:正门 D(15,10)+ 两条侧边(1,6)/(16,6),增援从门外涌入。
    reinforcementSpawns: [
      { position: { x: 15, y: 10 }, role: 'ground_patrol', patrolAxis: 'static' },
      { position: { x: 1, y: 6 }, role: 'ground_patrol', patrolAxis: 'static' },
      { position: { x: 16, y: 6 }, role: 'ground_patrol', patrolAxis: 'static' },
    ],
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
  },
  {
  // M2.2 春申茶馆(蓝图 = docs/levels/m2_teahouse.md;敌人 3 护院 + 1 阁楼哨,首次启用 policeman)
  id: 'm2_teahouse',
  nameZh: '春申茶馆',
  brief: '春申茶馆是线人的情报交换点,占领军稽查队已进驻。经后门潜入:拆掉账台明灯,阁楼哨位失明,清场后从霓虹招牌下的前门撤离。灯亮时别过堂心。',
  ratingS: 90,
  ratingA: 75,
  ratingB: 60,
  finalBossId: '',
  rooms: [{
    id: 'm2_teahouse',
    nameZh: '春申茶馆堂口',
    width: 18,
    height: 12,
    tileSize: 1,
    tiles: [
      '##################',
      '#......#......S.N#',
      '#.X....#..###.X..#',
      '#...L..#.........#',
      '#......###.......#',
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
      { position: { x: 7, y: 9 }, archetype: 'policeman', role: 'ground_patrol', patrolAxis: 'horizontal', patrolLength: 3, facingAngle: 0 },
      { position: { x: 4, y: 5 }, role: 'ground_patrol', patrolAxis: 'vertical', patrolLength: 2, facingAngle: -Math.PI / 2 },
      { position: { x: 11, y: 5 }, role: 'ground_patrol', patrolAxis: 'horizontal', patrolLength: 4, facingAngle: Math.PI },
      { position: { x: 14, y: 1 }, role: 'tower_guard', patrolAxis: 'static', patrolLength: 0, facingAngle: Math.PI / 2 },
    ],
    weaponSpawns: [{ tile: { x: 2, y: 8 }, weaponId: 'knife' }],
    maskSpawns: [],
    reinforcementSpawns: [
      { position: { x: 16, y: 10 }, role: 'ground_patrol', patrolAxis: 'static' },
      { position: { x: 1, y: 10 }, role: 'ground_patrol', patrolAxis: 'static' },
      { position: { x: 17, y: 6 }, role: 'ground_patrol', patrolAxis: 'static' },
    ],
    exitTile: { x: 15, y: 10 },
    floorPalette: [PAL_WOOD_DARK, PAL_INK], // 粉墙(墙图案 plaster_white)+ 深色木地板横条
    wallPattern: 'plaster_white',
    furniture: [
      { tile: { x: 14, y: 1 }, kind: 'searchlight' },
      { tile: { x: 2, y: 2 }, kind: 'sandbag' },
      { tile: { x: 14, y: 2 }, kind: 'sandbag' },
      { tile: { x: 3, y: 6 }, kind: 'sandbag' },
      { tile: { x: 13, y: 7 }, kind: 'sandbag' },
      { tile: { x: 5, y: 7 }, kind: 'sandbag' },
    ],
  }],
}];

export function getMission(id: Mission['id']): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}
