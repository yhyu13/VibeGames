// src/core/world/tileMap.ts — tile 查询(墙 / 灯 / 门 / 掩体 + 邻接 + 坐标换算)
// 基于 roomTokenizer 的网格提供只读查询接口;越界一律视为墙(防止逃出房间)。
// 语义约定:墙 '#' 阻挡移动与子弹;掩体 'X' 可站立(遮挡物)但阻挡子弹 / 视线。
// core/ 平台纯净:零 THREE / 零 DOM / 零 zustand。

import type { RoomLayout, TileChar, Vec2 } from '../types';
import { isWalkable, TILE_KIND, TILE_KIND_ZH, tokenizeRoom } from './roomTokenizer';
import type { TileKind, TokenizeIssue } from './roomTokenizer';

// 四邻接方向(上 / 下 / 左 / 右)
const NEIGHBOR_DELTAS4: Vec2[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

// 八邻接方向(四邻接 + 对角)
const NEIGHBOR_DELTAS8: Vec2[] = [
  ...NEIGHBOR_DELTAS4,
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
];

export interface TileMap {
  width: number;
  height: number;
  tileSize: number; // u/tile
  tiles: TileChar[][];
  issues: readonly TokenizeIssue[]; // tokenizer 校验问题(DEV 观察用)
  inBounds(tile: Vec2): boolean;
  tileAt(tile: Vec2): TileChar; // 越界 = '#'(墙)
  tileKind(tile: Vec2): TileKind;
  kindNameZh(tile: Vec2): string; // tile 种类中文名
  isWall(tile: Vec2): boolean;
  isDoor(tile: Vec2): boolean;
  isCover(tile: Vec2): boolean;
  isLamp(tile: Vec2): boolean; // 油灯 L
  isLightTile(tile: Vec2): boolean; // 静态光源 tile(L / N / S)
  isWalkableTile(tile: Vec2): boolean;
  isSolid(tile: Vec2): boolean; // 墙(阻挡移动)
  blocksBullet(tile: Vec2): boolean; // 墙或掩体(阻挡子弹 / 视线)
  neighbors4(tile: Vec2): Vec2[]; // 界内四邻接
  neighbors8(tile: Vec2): Vec2[]; // 界内八邻接
  walkableNeighbors(tile: Vec2): Vec2[]; // 界内可通行的四邻接
  findAll(pred: (tile: Vec2) => boolean): Vec2[]; // 全网格扫描
}

// 由 RoomLayout 构建只读 tile 查询表
export function buildTileMap(room: RoomLayout): TileMap {
  const t = tokenizeRoom(room);
  const width = t.width;
  const height = t.height;
  const inBounds = (p: Vec2): boolean => p.x >= 0 && p.x < width && p.y >= 0 && p.y < height;
  const at = (p: Vec2): TileChar => (inBounds(p) ? (t.tiles[p.y]?.[p.x] ?? '.') : '#');

  const neighbors = (p: Vec2, deltas: Vec2[]): Vec2[] => {
    const out: Vec2[] = [];
    for (const d of deltas) {
      const n = { x: p.x + d.x, y: p.y + d.y };
      if (inBounds(n)) out.push(n);
    }
    return out;
  };

  return {
    width,
    height,
    tileSize: t.tileSize,
    tiles: t.tiles,
    issues: t.issues,
    inBounds,
    tileAt: at,
    tileKind: (p) => TILE_KIND[at(p)],
    kindNameZh: (p) => TILE_KIND_ZH[TILE_KIND[at(p)]],
    isWall: (p) => at(p) === '#',
    isDoor: (p) => at(p) === 'D',
    isCover: (p) => at(p) === 'X',
    isLamp: (p) => at(p) === 'L',
    isLightTile: (p) => at(p) === 'L' || at(p) === 'N' || at(p) === 'S',
    isWalkableTile: (p) => inBounds(p) && isWalkable(at(p)),
    isSolid: (p) => at(p) === '#',
    blocksBullet: (p) => at(p) === '#' || at(p) === 'X',
    neighbors4: (p) => neighbors(p, NEIGHBOR_DELTAS4),
    neighbors8: (p) => neighbors(p, NEIGHBOR_DELTAS8),
    walkableNeighbors: (p) => neighbors(p, NEIGHBOR_DELTAS4).filter((n) => isWalkable(at(n))),
    findAll: (pred) => {
      const out: Vec2[] = [];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const p = { x, y };
          if (pred(p)) out.push(p);
        }
      }
      return out;
    },
  };
}

// 世界坐标(u)→ tile 坐标(向下取整;tileSize 非法值回退 1)
export function worldToTile(pos: Vec2, tileSize: number): Vec2 {
  const s = tileSize > 0 ? tileSize : 1;
  return { x: Math.floor(pos.x / s), y: Math.floor(pos.y / s) };
}

// tile 坐标 → 世界坐标(u,tile 中心点;tileSize 非法值回退 1)
export function tileToWorld(tile: Vec2, tileSize: number): Vec2 {
  const s = tileSize > 0 ? tileSize : 1;
  return { x: (tile.x + 0.5) * s, y: (tile.y + 0.5) * s };
}
