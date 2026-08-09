// src/core/world/roomTokenizer.ts — ASCII 房间文本 → tile 网格(世界层)
// 职责:校验 RoomLayout.tiles 并转成可查询的 tile 网格。
// 非法字符采用"忽略并标注"策略:替换为地板保证房间始终可玩,同时记录 issue 供 DEV 观察。
// core/ 平台纯净:零 THREE / 零 DOM / 零 zustand。

import type { RoomLayout, TileChar, Vec2 } from '../types';

// tile 种类(与 TILE_KIND 一一对应,供查询 / 描述使用)
export type TileKind = 'floor' | 'wall' | 'door' | 'lamp' | 'neon' | 'searchlight' | 'cover';

// TileChar → TileKind 映射(单一真相源,与 TDD §5.1 注释语义一致)
export const TILE_KIND: Record<TileChar, TileKind> = {
  '.': 'floor', // 地板
  '#': 'wall', // 墙
  D: 'door', // 门
  L: 'lamp', // 油灯
  N: 'neon', // 霓虹
  S: 'searchlight', // 探照灯
  X: 'cover', // 静态掩体
};

// TileKind → 中文名(用于 world-as-text 描述)
export const TILE_KIND_ZH: Record<TileKind, string> = {
  floor: '地板',
  wall: '墙',
  door: '门',
  lamp: '油灯',
  neon: '霓虹',
  searchlight: '探照灯',
  cover: '掩体',
};

// 非法字符 / 缺失格子的统一回退 tile(地板,可通行)
export const FALLBACK_TILE: TileChar = '.';

// 校验问题描述(row / col 坐标;col = -1 表示整行级别问题)
export interface TokenizeIssue {
  row: number;
  col: number;
  message: string; // 中文说明
}

// tokenizeRoom 输出结构:tile 网格 + 校验问题 + 静态光源 tile 列表
export interface TokenizedRoom {
  width: number;
  height: number;
  tileSize: number; // u/tile(透传 RoomLayout.tileSize,非法值回退 1)
  tiles: TileChar[][]; // tiles[y][x]
  issues: TokenizeIssue[];
  // 静态光源(L / N / S),供 RC 光源注册与 world-as-text 描述使用
  lightTiles: { tile: Vec2; kind: 'lamp' | 'neon' | 'searchlight' }[];
}

// 判断字符是否为合法 TileChar
export function isTileChar(ch: string): ch is TileChar {
  return (Object.keys(TILE_KIND) as TileChar[]).includes(ch as TileChar);
}

// 判断 tile 字符是否可通行(地板 / 门 / 灯 / 霓虹 / 探照灯 / 掩体;墙不可通行)
export function isWalkable(ch: TileChar): boolean {
  return ch === '.' || ch === 'D' || ch === 'L' || ch === 'N' || ch === 'S' || ch === 'X';
}

// string[] → tile 网格。
// 容错规则(全部记录 issue,不抛错):
//   - 行数不足 height → 缺行按地板填充;
//   - 行数超出 height → 多余行忽略;
//   - 行长度不足 width → 缺失格子按地板填充;
//   - 行长度超出 width → 超出部分截断;
//   - 非 TileChar 字符 → 替换为地板并标注位置。
export function tokenizeRoom(room: RoomLayout): TokenizedRoom {
  const width = room.width;
  const height = room.height;
  const tileSize = room.tileSize > 0 ? room.tileSize : 1;
  const issues: TokenizeIssue[] = [];
  const lightTiles: { tile: Vec2; kind: 'lamp' | 'neon' | 'searchlight' }[] = [];
  const rows = room.tiles ?? [];

  if (width <= 0 || height <= 0) {
    issues.push({ row: 0, col: -1, message: `无效尺寸 width=${width} height=${height},已返回空网格` });
    return { width, height, tileSize, tiles: [], issues, lightTiles };
  }

  const tiles: TileChar[][] = [];
  for (let y = 0; y < height; y++) {
    const row = rows[y];
    const cells: TileChar[] = [];
    if (row === undefined) {
      issues.push({ row: y, col: -1, message: `第 ${y} 行缺失,已按地板填充` });
      for (let x = 0; x < width; x++) cells.push(FALLBACK_TILE);
      tiles.push(cells);
      continue;
    }
    if (row.length !== width) {
      issues.push({ row: y, col: -1, message: `第 ${y} 行长度 ${row.length} 与 width ${width} 不符` });
    }
    for (let x = 0; x < width; x++) {
      const ch = row[x];
      if (ch === undefined || !isTileChar(ch)) {
        if (ch !== undefined) {
          issues.push({ row: y, col: x, message: `非法字符 '${ch}',已替换为地板` });
        }
        cells.push(FALLBACK_TILE);
      } else {
        cells.push(ch);
        if (ch === 'L' || ch === 'N' || ch === 'S') {
          const kind = ch === 'L' ? 'lamp' : ch === 'N' ? 'neon' : 'searchlight';
          lightTiles.push({ tile: { x, y }, kind });
        }
      }
    }
    tiles.push(cells);
  }

  if (rows.length > height) {
    issues.push({ row: height, col: -1, message: `tiles 行数 ${rows.length} 超过 height ${height},多余行已忽略` });
  }

  return { width, height, tileSize, tiles, issues, lightTiles };
}
