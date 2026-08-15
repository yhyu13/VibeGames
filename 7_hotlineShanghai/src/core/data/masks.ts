// src/core/data/masks.ts — 6 张脸谱(v2 重设计;弃用动物面具)
// themeColor = 脸谱主题色,渲染层用它替换玩家 sprite 的脸部像素(05-character-design §4)。
// MaskSpec 冻结于 types.ts(无 themeColor 字段),此处用交集类型本地扩展,不改冻结契约。
// 主题 = 戏班子出身的特务:每张脸谱是京剧行当脸 + 一项贴合行当的效果(武生近战/净角静步/丑角伪装/花脸翻滚/绿林轻功/压轴满弹)。
import type { MaskSpec } from '../types';

/** MaskSpec + 脸谱主题色(玩家勾脸替换色,§4 表) */
export type MaskSpecWithTheme = MaskSpec & { themeColor: string };

export const MASK_TABLE: Record<MaskSpec['id'], MaskSpecWithTheme> = {
  red_face: {
    id: 'red_face',
    nameZh: '红脸·武生',
    nameEn: 'Red Face',
    description: '近战必杀范围 +0.5u(武生刀马,近身先手)。',
    effect: { kind: 'meleeRangeBonus', bonus: 0.5 },
    themeColor: '#e54a1a', // 红(PAL_LANTERN)
  },
  black_face: {
    id: 'black_face',
    nameZh: '黑脸·净角',
    nameEn: 'Black Face',
    description: '冲刺不再发出脚步噪音(净角沉稳,落地无声)。',
    effect: { kind: 'footstepSilent' },
    themeColor: '#1c1c22', // 黑(勾脸墨底)
  },
  white_face: {
    id: 'white_face',
    nameZh: '白脸·丑角',
    nameEn: 'White Face',
    description: '敌人视野与听觉 -30%(丑角乔装,不易被看破)。',
    effect: { kind: 'enemySenseMult', multiplier: 0.7 },
    themeColor: '#f5e6b8', // 米白(PAL_IVORY)
  },
  blue_face: {
    id: 'blue_face',
    nameZh: '蓝脸·花脸',
    nameEn: 'Blue Face',
    description: '翻滚冷却减半(花脸翻跌,身段利落)。',
    effect: { kind: 'dodgeCooldownMult', multiplier: 0.5 },
    themeColor: '#2a4a9c', // 蓝(靛青勾脸)
  },
  green_face: {
    id: 'green_face',
    nameZh: '绿脸·绿林',
    nameEn: 'Green Face',
    description: '移动速度 +20%(绿林好汉,轻功迅捷)。',
    effect: { kind: 'playerSpeedMult', multiplier: 1.2, requiresWeapon: 'any' },
    themeColor: '#2a9a6a', // 绿(PAL_JADE)
  },
  gold_face: {
    id: 'gold_face',
    nameZh: '金脸·压轴',
    nameEn: 'Gold Face',
    description: '拾取武器时弹药直接补满(压轴主角,气运加身)。',
    effect: { kind: 'ammoRefillOnPickup' },
    themeColor: '#d8a820', // 金(鎏金勾脸)
  },
};
