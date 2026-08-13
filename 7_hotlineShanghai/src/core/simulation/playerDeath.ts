// src/core/simulation/playerDeath.ts — 死亡 / 重生(2026-08-09 P5)
// HM 范式(B14):死亡清空装备 / 弹药 / 面具 / 击杀数,回到房间出生点。
// 死亡计时 / 阶段机由协调器(Simulation)持有;本模块只提供纯函数重置。
import type { Player, Vec2 } from '../types';

/** 玩家重生:回到 spawn 并清空全部进度(MISSION_DEATH → MISSION_PLAY 时调用) */
export function respawnPlayer(player: Player, spawn: Vec2): void {
  player.position = { ...spawn };
  player.velocity = { x: 0, y: 0 };
  player.facingAngle = 0;
  player.hp = 1;
  player.ammo = 0;
  player.reloading = 0;
  player.weapon = null;
  player.mode = 'melee';
  player.modeSwitchTimer = 0;
  player.activeMask = null;
  player.dodgeTimer = 0;
  player.dodgeCooldown = 0;
  player.dashTimer = 0;
  player.dashCooldown = 0;
  player.kills = 0;
  player.hitsTaken = 0;
}
