// src/core/world/lineOfSight.ts — 网格视线 / 听觉直线判定(Amanatides & Woo 网格 DDA)
// v3.6 新增:统一服务三个消费者——手电锥视觉(vision)、噪音听觉(sound)、弹道段测试。
// 穿墙规则(用户裁决):vision 被 '#' 墙与 'X' 掩体阻挡;sound 只被 '#' 墙阻挡(声音绕得过沙袋,穿不过砖墙)。
// core/ 平台纯净:零 THREE / 零 DOM / 零 zustand。

import type { Vec2 } from '../types';
import type { TileMap } from './tileMap';

export type LosMode = 'vision' | 'sound';

// a → b 世界坐标线段是否通畅。起点格(观察者自身所在格)不判定,终点格判定。
export function hasLineOfSight(map: TileMap, a: Vec2, b: Vec2, mode: LosMode): boolean {
  const s = map.tileSize > 0 ? map.tileSize : 1;
  const ax = a.x / s, ay = a.y / s, bx = b.x / s, by = b.y / s;
  const blocked = (tx: number, ty: number): boolean =>
    mode === 'vision' ? map.blocksBullet({ x: tx, y: ty }) : map.isWall({ x: tx, y: ty });

  let x = Math.floor(ax);
  let y = Math.floor(ay);
  const endX = Math.floor(bx);
  const endY = Math.floor(by);
  if (x === endX && y === endY) return true;

  const dx = bx - ax;
  const dy = by - ay;
  const stepX = dx > 0 ? 1 : -1;
  const stepY = dy > 0 ? 1 : -1;
  const tDeltaX = dx !== 0 ? Math.abs(1 / dx) : Infinity;
  const tDeltaY = dy !== 0 ? Math.abs(1 / dy) : Infinity;
  let tMaxX = dx !== 0 ? (dx > 0 ? (x + 1 - ax) * tDeltaX : (ax - x) * tDeltaX) : Infinity;
  let tMaxY = dy !== 0 ? (dy > 0 ? (y + 1 - ay) * tDeltaY : (ay - y) * tDeltaY) : Infinity;

  // 上限迭代 = 网格曼哈顿直径 + 2,防 NaN / 无穷输入死循环
  const maxSteps = map.width + map.height + 2;
  for (let i = 0; i < maxSteps; i++) {
    if (tMaxX < tMaxY) { tMaxX += tDeltaX; x += stepX; } else { tMaxY += tDeltaY; y += stepY; }
    if (blocked(x, y)) return false;
    if (x === endX && y === endY) return true;
  }
  return false;
}
