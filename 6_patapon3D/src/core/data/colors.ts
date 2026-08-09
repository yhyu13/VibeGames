/**
 * core/data/colors.ts — 配色表(冻结,见 TDD §4.5 / 02-art-direction §3.2)
 *
 * M1.2 由 agent-content 完成。
 */

export const COLORS = {
  FLOOR_BASE: '#2a1a4a',
  FLOOR_LINE: '#ff3aaa',
  BG_TOP: '#0a0a2a',
  BG_BOTTOM: '#1a0a3a',
  P1_BODY: '#3affc8',
  P1_EYE: '#ffffff',
  AI_BODY: '#ff7a3a',
  AI_EYE: '#ffffff',
  BALL: '#ffd83a',
  AUDIENCE_POOL: ['#ff3a8a', '#3a8aff', '#8aff3a', '#ff8a3a', '#3affc8', '#c83aff'] as const,
} as const;

export type ColorKey = keyof typeof COLORS;
