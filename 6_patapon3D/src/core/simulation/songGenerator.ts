/**
 * core/simulation/songGenerator.ts — 谱面生成(种子确定性)
 *
 * SONG_COUNT 张谱面,每张 SONG_DURATION_S 秒;拍间隔 = 60/SONG_BPM(120 → 0.5s),
 * 开头留 SONG_LEAD_IN_S 空白。音符 type 是装饰 glyph(判定 timing-only),
 * 由 makeRng(seed) 选取 —— 同一种子永远生成同一张谱。
 */

import { SONG_BPM, SONG_COUNT, SONG_DURATION_S, SONG_LEAD_IN_S } from '../constants.js';
import { SONG_SEEDS } from '../data/songSeeds.js';
import { makeRng } from '../math.js';
import type { BeatNote, NoteType } from '../types.js';

const NOTE_TYPES: readonly NoteType[] = ['PATA', 'PON', 'DON', 'CHAKA'];

/** 生成一首歌的谱面(装饰 glyph 由 seed 决定) */
export function generateChart(seed: number, durationS: number = SONG_DURATION_S): BeatNote[] {
  const rng = makeRng(seed);
  const beatInterval = 60 / SONG_BPM;
  const notes: BeatNote[] = [];
  for (let t = SONG_LEAD_IN_S; t < durationS; t += beatInterval) {
    const type = NOTE_TYPES[Math.floor(rng() * NOTE_TYPES.length)] ?? 'PATA';
    notes.push({ time: t, type, status: 'pending' });
  }
  return notes;
}

/** 全部 SONG_COUNT 张谱面(种子表 SONG_SEEDS) */
export function generateCharts(): BeatNote[][] {
  const charts: BeatNote[][] = [];
  for (let i = 0; i < SONG_COUNT; i++) {
    charts.push(generateChart(SONG_SEEDS[i] ?? i));
  }
  return charts;
}
