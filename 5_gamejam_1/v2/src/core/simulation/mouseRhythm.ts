// core/simulation/mouseRhythm.ts — V2 osu 式鼠标谱（平台纯净）
// 判定圈固定；approach 圈从 APPROACH_OVERSCALE 缩到 1.0（=判定圈）即节拍点。
// 判定分档 300/100/50（完美/良好/普通）+ 早/晚方向 + 落空。

import { mulberry32, randRange, shuffle } from '../math';
import {
  APPROACH_OVERSCALE, HOLD_MAX_DURATION, HOLD_MIN_DURATION,
  RHYTHM_GOOD_MULT, RHYTHM_MISS_AFTER, RHYTHM_NORMAL_MULT, RHYTHM_PERFECT_WINDOW,
  RHYTHM_WINDOW_DIFFICULTY_REF,
} from '../constants';
import type { Vector3 } from '../types';

export type RhythmJudgement = 'perfect' | 'good' | 'normal' | 'miss';
export type RhythmTargetKind = 'tap' | 'hold' | 'shadow'; // shadow = 绑定替身的移动目标

export interface RhythmTarget {
  id: string;
  kind: RhythmTargetKind;
  x: number;                    // 屏幕坐标 0-1
  y: number;
  hitAt: number;                // 节拍点（谱面相对秒）
  holdDuration?: number;        // hold：按住秒数
  rank: number;                 // 目标编号（1-based，osu 式圈内数字）
}

export interface MouseRhythmChart {
  targets: RhythmTarget[];
  bpm: number;
  style: 'dignity' | 'tragic' | 'mad';
  duration: number;             // 总谱面秒数
}

export interface RhythmClickResult {
  judgement: RhythmJudgement;
  early: boolean;               // 早于节拍点
  completed: boolean;           // 本目标已终结
  inside: boolean;              // 指针是否在圈内
}

export interface RhythmHoldResult {
  judgement: RhythmJudgement;
  completed: boolean;
}

// ============ 谱面生成 ============

export interface ChartGenOptions {
  style: 'dignity' | 'tragic' | 'mad';
  targetCount: number;
  bpm: number;
  holdCount?: number;
  movingCount?: number;
  round?: number;
}

const STYLE_SPACING: Record<ChartGenOptions['style'], { minX: number; maxX: number; minY: number; maxY: number }> = {
  dignity: { minX: 0.18, maxX: 0.82, minY: 0.2, maxY: 0.72 },
  tragic: { minX: 0.22, maxX: 0.78, minY: 0.24, maxY: 0.68 },
  mad: { minX: 0.14, maxX: 0.86, minY: 0.18, maxY: 0.76 },
};

/** 目标间最小屏幕距离（同谱面内避免重叠） */
const MIN_TARGET_DIST = 0.16;

function beatSeconds(bpm: number): number {
  return 60 / bpm;
}

function windowFor(difficulty: number): { perfect: number; good: number; normal: number } {
  const scale = RHYTHM_WINDOW_DIFFICULTY_REF / Math.max(4, difficulty);
  const perfect = RHYTHM_PERFECT_WINDOW * Math.sqrt(scale);
  return {
    perfect,
    good: perfect * RHYTHM_GOOD_MULT,
    normal: perfect * RHYTHM_NORMAL_MULT,
  };
}

export function generateMouseRhythmChart(seed: number, opts: ChartGenOptions): MouseRhythmChart {
  const rand = mulberry32(seed);
  const beat = beatSeconds(opts.bpm);
  const bounds = STYLE_SPACING[opts.style];
  const holdCount = Math.max(0, opts.holdCount ?? 0);
  const movingCount = Math.max(0, opts.movingCount ?? 0);
  const tapCount = Math.max(1, opts.targetCount - holdCount - movingCount);

  // 紧凑密度：mad 谱面 BPM 高 → 目标间时间间距按半拍起步
  const baseGap = opts.style === 'mad' ? beat / 2 : beat * 0.75;

  const targets: RhythmTarget[] = [];
  let t = beat * 1.5; // 起手缓冲一拍半
  let rank = 1;

  const place = (kind: RhythmTargetKind, duration: number, holdLen: number): void => {
    let x = 0.5;
    let y = 0.5;
    for (let attempt = 0; attempt < 40; attempt++) {
      const cx = randRange(rand, bounds.minX, bounds.maxX);
      const cy = randRange(rand, bounds.minY, bounds.maxY);
      const farEnough = targets.every((p) => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        return Math.sqrt(dx * dx + dy * dy) >= MIN_TARGET_DIST;
      });
      if (farEnough) {
        x = cx;
        y = cy;
        break;
      }
    }
    targets.push({
      id: `${kind}-${targets.length + 1}`,
      kind,
      x,
      y,
      hitAt: t,
      holdDuration: holdLen,
      rank: rank++,
    });
    t += duration;
  };

  // 目标顺序：节奏骨架（先 tap 后 hold，shadow 穿插在 mad 折返位）
  const kinds: RhythmTargetKind[] = [];
  for (let i = 0; i < tapCount; i++) kinds.push('tap');
  for (let i = 0; i < holdCount; i++) kinds.push('hold');
  for (let i = 0; i < movingCount; i++) kinds.push('shadow');
  const ordered = shuffle(rand, kinds);

  for (const kind of ordered) {
    if (kind === 'hold') {
      const holdLen = clampHold(randRange(rand, HOLD_MIN_DURATION, HOLD_MAX_DURATION));
      place('hold', holdLen + beat, holdLen);
    } else if (kind === 'shadow') {
      place('shadow', beat * 1.6, 0);
    } else {
      const gap = baseGap * randRange(rand, 0.8, 1.3);
      place('tap', Math.max(gap, beat * 0.6), 0);
    }
  }

  return {
    targets,
    bpm: opts.bpm,
    style: opts.style,
    duration: t + beat,
  };
}

function clampHold(v: number): number {
  return Math.min(HOLD_MAX_DURATION, Math.max(HOLD_MIN_DURATION, v));
}

/** 单目标判定窗口（按风格难度缩放） */
export function judgementWindows(chart: MouseRhythmChart): { perfect: number; good: number; normal: number } {
  const difficulty: number = chart.style === 'mad' ? 18 : chart.style === 'tragic' ? 12 : 8;
  return windowFor(difficulty);
}

/** 点击判定：指针必须在圈内（半径 0.05 屏幕单位），时间窗口内 */
export function judgeRhythmClick(
  chart: MouseRhythmChart,
  target: RhythmTarget,
  elapsed: number,
  pointer: { x: number; y: number },
): RhythmClickResult {
  const dx = pointer.x - target.x;
  const dy = pointer.y - target.y;
  const inside = Math.sqrt(dx * dx + dy * dy) <= 0.055;
  const delta = elapsed - target.hitAt;
  if (!inside || Math.abs(delta) > RHYTHM_MISS_AFTER) {
    return { judgement: 'miss', early: delta < 0, completed: true, inside };
  }
  const w = judgementWindows(chart);
  if (Math.abs(delta) <= w.perfect) {
    return { judgement: 'perfect', early: delta < 0, completed: true, inside };
  }
  if (Math.abs(delta) <= w.good) {
    return { judgement: 'good', early: delta < 0, completed: true, inside };
  }
  if (Math.abs(delta) <= w.normal) {
    return { judgement: 'normal', early: delta < 0, completed: true, inside };
  }
  return { judgement: 'miss', early: delta < 0, completed: true, inside };
}

/** hold 头部判定（点击时刻） */
export function judgeHoldHead(
  chart: MouseRhythmChart,
  target: RhythmTarget,
  elapsed: number,
  pointer: { x: number; y: number },
): RhythmClickResult {
  return judgeRhythmClick(chart, target, elapsed, pointer);
}

/** hold 尾部判定（释放时刻；头尾漂移容差） */
export function judgeHoldTail(chart: MouseRhythmChart, target: RhythmTarget, releasedAt: number): RhythmHoldResult {
  const targetEnd = target.hitAt + (target.holdDuration ?? 0);
  const delta = Math.abs(releasedAt - targetEnd);
  const w = judgementWindows(chart);
  const holdJitter = 0.12;
  if (delta <= Math.max(w.perfect, holdJitter)) {
    return { judgement: 'perfect', completed: true };
  }
  if (delta <= w.good) return { judgement: 'good', completed: true };
  if (delta <= w.normal) return { judgement: 'normal', completed: true };
  return { judgement: 'miss', completed: true };
}

/** approach 进度 0→1（1 = 节拍点，approach 圈 = 判定圈） */
export function rhythmProgress(target: RhythmTarget, elapsed: number): number {
  const lead = Math.max(0.55, 0.55 * APPROACH_OVERSCALE * (target.kind === 'hold' ? 1.15 : 1));
  const t = (elapsed - (target.hitAt - lead)) / lead;
  return Math.min(1, Math.max(0, t));
}

/** 目标屏幕位置（shadow 目标由引擎注入替身屏幕坐标） */
export function targetPosition(target: RhythmTarget, shadowScreen: Vector3 | null): { x: number; y: number } {
  if (target.kind === 'shadow' && shadowScreen) return { x: shadowScreen.x, y: shadowScreen.y };
  return { x: target.x, y: target.y };
}

/** 测试用固定谱（确定窗口/朝向判定） */
export function createFixedChart(overrides?: Partial<MouseRhythmChart>): MouseRhythmChart {
  return {
    bpm: 72,
    style: 'dignity',
    duration: 10,
    targets: [
      { id: 'tap-1', kind: 'tap', x: 0.4, y: 0.5, hitAt: 2, rank: 1 },
      { id: 'hold-2', kind: 'hold', x: 0.6, y: 0.5, hitAt: 4, holdDuration: 1, rank: 2 },
      { id: 'shadow-3', kind: 'shadow', x: 0.5, y: 0.5, hitAt: 7, rank: 3 },
    ],
    ...overrides,
  };
}
