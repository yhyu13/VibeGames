// src/core/simulation/player.ts — 玩家移动(2026-08-09 P2 重建)
// 手感:线性加速 / 减速(PLAYER_ACCEL / PLAYER_DECEL),速度钳制 PLAYER_SPEED_MAX。
// 只更新 velocity;位置积分 + 碰撞由 moveCircleWithTiles 完成(避免双重积分)。
import type { Player, Vec2 } from '../types.ts';
import { PLAYER_ACCEL, PLAYER_DECEL, PLAYER_SPEED_MAX } from '../constants.ts';
import { clamp } from '../math.ts';

export function updatePlayerMove(player: Player, inputDir: Vec2, dt: number, speedMult = 1): void {
  const maxSpeed = PLAYER_SPEED_MAX * speedMult;
  const targetX = inputDir.x * maxSpeed;
  const targetY = inputDir.y * maxSpeed;
  const ax =
    (targetX - player.velocity.x) *
    (Math.abs(targetX) > Math.abs(player.velocity.x) ? PLAYER_ACCEL : PLAYER_DECEL);
  const ay =
    (targetY - player.velocity.y) *
    (Math.abs(targetY) > Math.abs(player.velocity.y) ? PLAYER_ACCEL : PLAYER_DECEL);
  player.velocity.x = clamp(player.velocity.x + ax * dt, -maxSpeed, maxSpeed);
  player.velocity.y = clamp(player.velocity.y + ay * dt, -maxSpeed, maxSpeed);
}
