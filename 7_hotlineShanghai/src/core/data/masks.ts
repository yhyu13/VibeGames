// src/core/data/masks.ts — 6 个面具(v1 冻结)
// themeColor = 面具主题色(05-character-design.md §4 冻结表),渲染层用它替换
// 玩家 sprite 的蒙面 'w' 像素(core/data/sprites.ts 契约 §5.1)。
// MaskSpec 冻结于 types.ts(无 themeColor 字段),此处用交集类型本地扩展,不改冻结契约。
import type { MaskSpec } from '../types';

/** MaskSpec + 面具主题色(玩家蒙面替换色,§4 表) */
export type MaskSpecWithTheme = MaskSpec & { themeColor: string };

export const MASK_TABLE: Record<MaskSpec['id'], MaskSpecWithTheme> = {
  actor: {
    id: 'actor',
    nameZh: '戏子',
    nameEn: 'Actor',
    description: '进入房间 0.5 秒内,所有敌人攻击延迟。',
    effect: { kind: 'slowMoOnRoomEnter', slowMoDuration: 0.5, slowMoFactor: 0.3 },
    themeColor: '#e54a1a', // 红(红脸谱纹,§4;v1.1 PAL_LANTERN)
  },
  runner: {
    id: 'runner',
    nameZh: '帮工',
    nameEn: 'Runner',
    description: '拾取武器时弹药直接满。',
    effect: { kind: 'ammoRefillOnPickup' },
    themeColor: '#2a9a6a', // 翡翠(绿蒙面,§4;v1.1 PAL_JADE)
  },
  righteous: {
    id: 'righteous',
    nameZh: '蒙面义士',
    nameEn: 'Righteous',
    description: '一击必杀范围 +0.5u。',
    effect: { kind: 'meleeRangeBonus', bonus: 0.5 },
    themeColor: '#f5e6b8', // 米(白蒙面,默认同玩家,§4;v1.1 PAL_IVORY)
  },
  dancer: {
    id: 'dancer',
    nameZh: '舞女',
    nameEn: 'Dancer',
    description: '翻滚冷却减半。',
    effect: { kind: 'dodgeCooldownMult', multiplier: 0.5 },
    themeColor: '#9c2c9c', // 紫(紫蒙面 + 腮红,§4)
  },
  waiter: {
    id: 'waiter',
    nameZh: '茶馆跑堂',
    nameEn: 'Waiter',
    description: '敌人视野和听觉 -30%。',
    effect: { kind: 'enemySenseMult', multiplier: 0.7 },
    themeColor: '#b8967a', // 茶褐(茶褐蒙面,§4)
  },
  officer: {
    id: 'officer',
    nameZh: '军爷',
    nameEn: 'Officer',
    description: '持远程武器时移动速度 +20%。',
    effect: { kind: 'playerSpeedMult', multiplier: 1.2, requiresWeapon: 'ranged' },
    themeColor: '#4a4a52', // 钢灰(灰蒙面 + 帽徽金,§4;v1.1 PAL_STEEL)
  },
};
