/**
 * components/RhythmBar.tsx — 4 lane 节奏条 React overlay
 *
 * v1.0 节奏战斗
 * - 与 NoteRenderer 同步:从 store.rhythm.charts 读即将 hit 的 note
 * - 4 lane 列,每列上方一个键位标 + lane 名
 * - note 从右滚到左,接近 hit zone 时颜色加深
 * - hit zone(左侧固定位置)金色高亮
 * - 4 lane 颜色:沿用 NOTE_PATA/PON/DON/CHAKA
 *
 * 设计取舍:NoteRenderer 已经在 3D 中渲染 voxel note;
 * 这个 2D overlay 是给玩家做"打击目标"提示,提升 4 键节奏的可读性。
 * (主体验是 3D,overlay 是辅助)
 */

import { useEffect, useState } from 'react';
import { usePatapongStore } from '../store';
import {
  HIT_ZONE_X_P1,
  JUDGE_GOOD_WINDOW_MS,
  JUDGE_NORMAL_WINDOW_MS,
  JUDGE_PERFECT_WINDOW_MS,
  NOTE_SCROLL_SPEED,
  RHYTHM_BAR_LENGTH_X,
  SONG_DURATION_S,
} from '../core/constants';
import { COLORS } from '../core/data/colors';
import type { Chart, Note, NoteType } from '../core/types';

const LANE_TYPES: readonly NoteType[] = ['PATA', 'PON', 'DON', 'CHAKA'];
const LANE_KEYS: readonly string[] = ['W', 'A', 'S', 'D'];
const LANE_COLORS: readonly string[] = [
  COLORS.NOTE_PATA,
  COLORS.NOTE_PON,
  COLORS.NOTE_DON,
  COLORS.NOTE_CHAKA,
];

const NOTE_TRAVEL_TIME = (RHYTHM_BAR_LENGTH_X / 2 - HIT_ZONE_X_P1) / NOTE_SCROLL_SPEED;

/** 时间差 → 判定 (跟 rhythm.judgeInput 保持一致) */
function judgementFromTimeDiff(absTimeDiffMs: number): 'PERFECT' | 'GOOD' | 'NORMAL' | 'MISS' {
  if (absTimeDiffMs <= JUDGE_PERFECT_WINDOW_MS) return 'PERFECT';
  if (absTimeDiffMs <= JUDGE_GOOD_WINDOW_MS) return 'GOOD';
  if (absTimeDiffMs <= JUDGE_NORMAL_WINDOW_MS) return 'NORMAL';
  return 'MISS';
}

export function RhythmBar() {
  const phase = usePatapongStore((s) => s.phase);
  const rhythm = usePatapongStore((s) => s.rhythm);
  const [, force] = useState(0);

  // 每帧重渲(本组件读 store 但 store sync 是每 STORE_SYNC_INTERVAL 帧,
  // 节奏条需要更细粒度所以本组件用本地 RAF 推)
  useEffect(() => {
    if (phase !== 'SONG') return;
    let raf = 0;
    const loop = (): void => {
      force((n) => n + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  if (phase !== 'SONG') return null;

  const chart: Chart | undefined = rhythm.charts[rhythm.songIndex];
  if (!chart) return null;
  const songTime = rhythm.songTime;

  // 按 lane 分组即将 hit 的 note(timeToHit 在 [0, NOTE_TRAVEL_TIME])
  const perLane: Note[][] = [[], [], [], []];
  for (const note of chart.notes) {
    if (note.resolved) continue;
    if (note.timeToHit > NOTE_TRAVEL_TIME) continue;
    if (note.timeToHit < -0.5) continue;
    const lane = note.lane;
    if (lane < 0 || lane > 3) continue;
    perLane[lane]!.push(note);
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center pb-8">
      {/* 节奏条:4 lane + hit zone(左侧固定) */}
      <div className="relative h-20 w-[80%] max-w-3xl rounded border border-[#ff3aaa]/30 bg-black/30 backdrop-blur-sm">
        {/* hit zone 标线 */}
        <div className="absolute left-[12.5%] top-0 h-full w-0.5 bg-[#ffd83a]/80 shadow-[0_0_10px_#ffd83a]" />
        <div className="absolute left-[6%] top-1/2 -translate-y-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest text-[#ffd83a] [text-shadow:0_0_6px_#ffd83a]">
          HIT
        </div>

        {/* 4 lane 列分隔线 */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px bg-white/10"
            style={{ left: `${12.5 + (i + 1) * 21.875}%` }}
          />
        ))}

        {/* 每个 lane 渲染 note */}
        {[0, 1, 2, 3].map((lane) => {
          const notes = perLane[lane]!;
          return notes.map((note) => {
            // 0..1 表示 note 在 lane 中的进度(0 = 起点,1 = hit zone)
            const progress = 1 - note.timeToHit / NOTE_TRAVEL_TIME;
            const xPct = 12.5 + progress * 81.25; // 12.5..93.75
            // 越接近 hit zone 越亮
            const distToHit = Math.abs(note.timeToHit * 1000);
            const judgement = judgementFromTimeDiff(distToHit);
            const brightness =
              judgement === 'PERFECT' ? 1.4 : judgement === 'GOOD' ? 1.1 : judgement === 'NORMAL' ? 0.8 : 0.5;
            return (
              <div
                key={note.timeToHit}
                className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2"
                style={{
                  left: `${xPct}%`,
                  background: LANE_COLORS[lane],
                  borderColor: LANE_COLORS[lane],
                  opacity: brightness,
                  boxShadow: `0 0 ${8 * brightness}px ${LANE_COLORS[lane]}`,
                }}
              />
            );
          });
        })}

        {/* 顶部:4 lane 键位标 + lane 名 */}
        <div className="absolute -top-7 left-0 right-0 flex justify-around font-mono text-[10px] tracking-widest">
          {LANE_TYPES.map((t, i) => (
            <div
              key={t}
              className="flex flex-col items-center gap-0.5"
              style={{ color: LANE_COLORS[i], width: '25%' }}
            >
              <span
                className="rounded border bg-black/50 px-2 font-bold"
                style={{ borderColor: `${LANE_COLORS[i]}66` }}
              >
                {LANE_KEYS[i]}
              </span>
              <span className="text-[8px] tracking-[0.3em]">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 歌曲进度条 */}
      <div className="mt-2 h-1 w-[60%] max-w-xl overflow-hidden rounded bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#3affc8] via-[#ffd83a] to-[#ff3aaa]"
          style={{ width: `${Math.min(100, (songTime / SONG_DURATION_S) * 100)}%` }}
        />
      </div>
    </div>
  );
}
