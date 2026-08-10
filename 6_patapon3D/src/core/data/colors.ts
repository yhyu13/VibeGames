/**
 * core/data/colors.ts — 配色表(冻结,见 TDD §4.5 / 02-art-direction §3.2)
 *
 * v2.0 divine-drums:neon 夜场配色 + 鼓色 + 军队/boss 主色。
 */

export const COLORS = {
  FLOOR_BASE: '#2a1a4a',
  FLOOR_LINE: '#ff3aaa',
  BG_TOP: '#0a0a2a',
  BG_BOTTOM: '#1a0a3a',
  /** 四角灯柱 / 通用高光金 */
  HIGHLIGHT: '#ffd83a',
  /** 节奏条基线(洋红,同霓虹边缘) */
  RHYTHM_BAR: '#ff3aaa',
  /** 4 面鼓 / 音符 glyph(02-art-direction §4:PATA 青 / PON 金 / DON 蓝 / CHAKA 粉) */
  NOTE_PATA: '#3affc8',
  NOTE_PON: '#ffd83a',
  NOTE_DON: '#3a8aff',
  NOTE_CHAKA: '#ff3a8a',
  /** Moloch 身体主色(matBossBody) */
  BOSS_BODY: '#ff3a3a',
  P1_BODY: '#3affc8',
  P1_EYE: '#ffffff',
  AI_BODY: '#ff7a3a',
  AI_EYE: '#ffffff',
  BALL: '#ffd83a',
  AUDIENCE_POOL: ['#ff3a8a', '#3a8aff', '#8aff3a', '#ff8a3a', '#3affc8', '#c83aff'] as const,
} as const;

export type ColorKey = keyof typeof COLORS;
