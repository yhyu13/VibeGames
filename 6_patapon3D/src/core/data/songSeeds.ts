/**
 * core/data/songSeeds.ts — 谱面 RNG 种子(冻结,见 TDD §4.5)
 *
 * SONG_COUNT(3)张谱面各一个种子,喂给 core/math.ts 的 makeRng。
 * 加歌 = 只动这个文件(CLAUDE.md 扩展配方)。
 */

export const SONG_SEEDS: readonly number[] = [20260809, 20260810, 20260811] as const;
