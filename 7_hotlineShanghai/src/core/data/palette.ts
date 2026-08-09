// src/core/data/palette.ts — 调色板(§4.4.8 冻结,12 色 PAL_* 命名)
// 数值唯一来源 = core/constants.ts 的 PAL_* 常量;本表按名称导出为 Record。
import * as C from '../constants';

export type PaletteKey =
  | 'PAL_INK'
  | 'PAL_PLASTER'
  | 'PAL_RUST'
  | 'PAL_TEAL'
  | 'PAL_LANTERN'
  | 'PAL_NEON'
  | 'PAL_PAPER'
  | 'PAL_IVORY'
  | 'PAL_JADE'
  | 'PAL_STEEL'
  | 'PAL_MUZZLE'
  | 'PAL_BLOOD';

export const PALETTE: Record<PaletteKey, string> = {
  PAL_INK: C.PAL_INK,
  PAL_PLASTER: C.PAL_PLASTER,
  PAL_RUST: C.PAL_RUST,
  PAL_TEAL: C.PAL_TEAL,
  PAL_LANTERN: C.PAL_LANTERN,
  PAL_NEON: C.PAL_NEON,
  PAL_PAPER: C.PAL_PAPER,
  PAL_IVORY: C.PAL_IVORY,
  PAL_JADE: C.PAL_JADE,
  PAL_STEEL: C.PAL_STEEL,
  PAL_MUZZLE: C.PAL_MUZZLE,
  PAL_BLOOD: C.PAL_BLOOD,
};
