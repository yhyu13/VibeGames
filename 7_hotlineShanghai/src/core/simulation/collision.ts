// src/core/simulation/collision.ts — 圆 vs tile 网格碰撞(2026-08-09 P2 重建)
// 轴分离移动(先 x 后 y),撞墙清对应轴速度;M1 实体 = '#' 墙 + 'X' 掩体(家具表后续接入)。
import type { RoomLayout, Vec2 } from '../types.ts';

const SOLID_CHARS = new Set(['#', 'X']);

export function tileCharAt(room: RoomLayout, tx: number, ty: number): string {
  if (tx < 0 || ty < 0 || ty >= room.tiles.length) return '#';
  const row = room.tiles[ty];
  if (tx >= row.length) return '#';
  return row[tx] ?? '#';
}

export function isSolidTile(room: RoomLayout, tx: number, ty: number): boolean {
  return SOLID_CHARS.has(tileCharAt(room, tx, ty));
}

export function moveCircleWithTiles(
  pos: Vec2,
  vel: Vec2,
  dt: number,
  radius: number,
  room: RoomLayout,
): void {
  moveAxis('x');
  moveAxis('y');

  function moveAxis(axis: 'x' | 'y'): void {
    pos[axis] += vel[axis] * dt;
    const minTx = Math.floor(pos.x - radius);
    const maxTx = Math.floor(pos.x + radius);
    const minTy = Math.floor(pos.y - radius);
    const maxTy = Math.floor(pos.y + radius);
    for (let ty = minTy; ty <= maxTy; ty += 1) {
      for (let tx = minTx; tx <= maxTx; tx += 1) {
        if (!isSolidTile(room, tx, ty)) continue;
        const nearestX = Math.max(tx, Math.min(pos.x, tx + 1));
        const nearestY = Math.max(ty, Math.min(pos.y, ty + 1));
        const dx = pos.x - nearestX;
        const dy = pos.y - nearestY;
        if (dx * dx + dy * dy >= radius * radius) continue;
        if (axis === 'x') {
          pos.x = pos.x < nearestX ? nearestX - radius : nearestX + radius;
          vel.x = 0;
        } else {
          pos.y = pos.y < nearestY ? nearestY - radius : nearestY + radius;
          vel.y = 0;
        }
      }
    }
  }
}

/** 直线视线:从 a 到 b 每 0.25u 采样一格,命中实心 tile 即遮挡。 */
export function hasLineOfSight(room: RoomLayout, a: Vec2, b: Vec2): boolean {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const steps = Math.max(1, Math.ceil(dist / 0.25));
  for (let i = 1; i < steps; i += 1) {
    const t = i / steps;
    const tx = Math.floor(a.x + dx * t);
    const ty = Math.floor(a.y + dy * t);
    if (isSolidTile(room, tx, ty)) return false;
  }
  return true;
}
