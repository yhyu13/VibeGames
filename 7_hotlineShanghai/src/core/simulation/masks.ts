// src/core/simulation/masks.ts — 面具效果 dispatcher(6 种 MaskEffect kind,参数 = TDD §4.4.3)
// 纯函数 / 纯查询:协调器在 拾取、进入房间、近战判定、翻滚冷却、敌人感知、移动 时查询修正值。
// kind 列表:slowMoOnRoomEnter / ammoRefillOnPickup / meleeRangeBonus /
//           dodgeCooldownMult / enemySenseMult / playerSpeedMult(冻结 §4.4.3)。
import type { Player, MaskId, MaskEffect } from '../types';
import { MASK_TABLE } from '../data/masks';

// 可查询的面具修正值汇总(无面具 / 未命中效果 = 全默认)
export interface MaskModifiers {
  meleeRangeBonus: number;                             // 近战必杀范围加成(u),red_face +0.5
  dodgeCooldownMult: number;                           // 翻滚冷却倍率,blue_face 0.5
  enemySenseMult: number;                              // 敌人视野 / 听觉倍率,white_face 0.7
  playerSpeedMult: number;                             // 移动速度倍率,green_face 1.2
  playerSpeedWeapon: 'ranged' | 'melee' | 'any' | null; // 速度加成适用的武器类型
  ammoRefillOnPickup: boolean;                         // 拾取武器是否满弹(已弃用,保留兼容)
  footstepNoiseMult: number;                           // 脚步噪音倍率,black_face 0(静步)
  reinforcementMult: number;                           // 警报增援倍率,gold_face 0.5(增援减半)
}

// 默认修正值(无面具):加成 0、倍率 1、无适用条件、不满弹
const DEFAULT_MODIFIERS: MaskModifiers = {
  meleeRangeBonus: 0,
  dodgeCooldownMult: 1,
  enemySenseMult: 1,
  playerSpeedMult: 1,
  playerSpeedWeapon: null,
  ammoRefillOnPickup: false,
  footstepNoiseMult: 1,
  reinforcementMult: 1,
};

// 设定玩家当前面具(拾取面具时调用)
export function applyMask(player: Player, maskId: MaskId): void {
  player.activeMask = maskId;
}

// 取面具的 MaskEffect(按 MASK_TABLE);无面具返回 null
export function getMaskEffect(maskId: MaskId | null): MaskEffect | null {
  if (!maskId) return null;
  return MASK_TABLE[maskId].effect;
}

// 面具效果 dispatcher 主入口:按 effect.kind 汇总全部可查询修正值
export function getMaskModifiers(maskId: MaskId | null): MaskModifiers {
  const effect = getMaskEffect(maskId);
  if (!effect) return { ...DEFAULT_MODIFIERS };
  switch (effect.kind) {
    case 'meleeRangeBonus':
      return { ...DEFAULT_MODIFIERS, meleeRangeBonus: effect.bonus };
    case 'dodgeCooldownMult':
      return { ...DEFAULT_MODIFIERS, dodgeCooldownMult: effect.multiplier };
    case 'enemySenseMult':
      return { ...DEFAULT_MODIFIERS, enemySenseMult: effect.multiplier };
    case 'playerSpeedMult':
      return {
        ...DEFAULT_MODIFIERS,
        playerSpeedMult: effect.multiplier,
        playerSpeedWeapon: effect.requiresWeapon,
      };
    case 'ammoRefillOnPickup':
      return { ...DEFAULT_MODIFIERS, ammoRefillOnPickup: true };
    case 'reinforcementMult':
      return { ...DEFAULT_MODIFIERS, reinforcementMult: effect.multiplier };
    case 'footstepSilent':
      return { ...DEFAULT_MODIFIERS, footstepNoiseMult: 0 };
    case 'slowMoOnRoomEnter':
      // 无持续修正值,入场慢动作单独查询(getRoomEnterSlowMo)
      return { ...DEFAULT_MODIFIERS };
  }
}

// 入场慢动作 dispatcher(actor 面具):进入房间 0.5s 内敌人时间缩放 0.3;无此效果返回 null
export function getRoomEnterSlowMo(maskId: MaskId | null): { slowMoDuration: number; slowMoFactor: number } | null {
  const effect = getMaskEffect(maskId);
  if (!effect || effect.kind !== 'slowMoOnRoomEnter') return null;
  return { slowMoDuration: effect.slowMoDuration, slowMoFactor: effect.slowMoFactor };
}
