import { clamp, mulberry32 } from '../math';

export type RhythmRank = 'R1' | 'R2' | 'R3' | 'R4';
export type RhythmShape = 'circle' | 'diamond' | 'triangle' | 'square';
export type RhythmJudgement = 'perfect' | 'good' | 'normal' | 'miss';

export interface ScreenPoint {
  x: number;
  y: number;
}

export interface MouseRhythmTarget {
  id: string;
  rank: RhythmRank;
  shape: RhythmShape;
  appearAt: number;
  hitAt: number;
  radius: number;
  position: ScreenPoint;
  terminal: boolean;
  follow?: { from: ScreenPoint; to: ScreenPoint; speed: number };
}

export interface MouseRhythmChart {
  seed: number;
  duration: number;
  targets: readonly MouseRhythmTarget[];
}

export interface RhythmClickResult {
  targetId: string;
  judgement: RhythmJudgement;
  distance: number;
  timingOffset: number;
  /** 在节拍点之前按下为 true（早 / early），之后为 false（晚 / late）。用于 osu 式早晚方向箭头。 */
  early: boolean;
  completed: boolean;
}

export interface RhythmFixtureOptions {
  seed?: number;
  duration?: number;
  fixedPositions?: boolean;
  positions?: readonly ScreenPoint[];
  combo?: number;
}

const SHAPES: readonly RhythmShape[] = ['circle', 'diamond', 'triangle', 'square'];
const DEFAULT_POSITIONS: readonly ScreenPoint[] = [
  { x: 0.32, y: 0.38 },
  { x: 0.68, y: 0.42 },
  { x: 0.43, y: 0.62 },
  { x: 0.62, y: 0.64 },
  { x: 0.5, y: 0.5 },
];

function rankFor(index: number): RhythmRank {
  return `R${(index % 4) + 1}` as RhythmRank;
}

function shapeFor(rank: RhythmRank): RhythmShape {
  return SHAPES[Number(rank.slice(1)) - 1] ?? 'circle';
}

function normalizePoint(point: ScreenPoint): ScreenPoint {
  return { x: clamp(point.x, 0.12, 0.88), y: clamp(point.y, 0.2, 0.8) };
}

export function targetPosition(target: MouseRhythmTarget, elapsed: number): ScreenPoint {
  if (!target.follow) return target.position;
  const t = clamp((elapsed - target.appearAt) / Math.max(0.001, target.follow.speed), 0, 1);
  return {
    x: target.follow.from.x + (target.follow.to.x - target.follow.from.x) * t,
    y: target.follow.from.y + (target.follow.to.y - target.follow.from.y) * t,
  };
}

export function generateMouseRhythmChart(seed = 1, duration = 4.8, fixedPositions = false, positions?: readonly ScreenPoint[]): MouseRhythmChart {
  const safeDuration = clamp(duration, 3, 6);
  const rng = mulberry32(seed);
  const count = safeDuration >= 5.3 ? 5 : safeDuration >= 4 ? 4 : 3;
  const spacing = safeDuration / (count + 1);
  const supplied = positions && positions.length > 0 ? positions : DEFAULT_POSITIONS;
  const targets: MouseRhythmTarget[] = [];

  for (let i = 0; i < count; i += 1) {
    const appearAt = spacing * (i + 0.45);
    const hitAt = spacing * (i + 0.95);
    const rank = rankFor(i);
    const fallbackPoint = DEFAULT_POSITIONS[i % DEFAULT_POSITIONS.length] ?? { x: 0.5, y: 0.5 };
    const position = fixedPositions
      ? normalizePoint(supplied[i % supplied.length] ?? fallbackPoint)
      : { x: 0.22 + rng() * 0.56, y: 0.29 + rng() * 0.42 };
    const terminal = i === count - 1;
    const target: MouseRhythmTarget = {
      id: `rhythm-${seed}-${i + 1}`,
      rank,
      shape: shapeFor(rank),
      appearAt,
      hitAt,
      radius: terminal ? 0.065 : 0.06,
      position,
      terminal,
    };
    if (terminal && !fixedPositions) {
      target.follow = {
        from: position,
        to: { x: 0.48 + rng() * 0.12, y: 0.42 + rng() * 0.16 },
        speed: Math.min(1.1, safeDuration - appearAt),
      };
    }
    targets.push(target);
  }

  return { seed, duration: safeDuration, targets };
}

export function createMouseRhythmFixture(options: RhythmFixtureOptions = {}): MouseRhythmChart {
  return generateMouseRhythmChart(
    options.seed ?? 240807,
    options.duration ?? 4.8,
    options.fixedPositions ?? true,
    options.positions ?? DEFAULT_POSITIONS,
  );
}

export function judgeRhythmClick(
  target: MouseRhythmTarget,
  elapsed: number,
  pointer: ScreenPoint,
  remainingTargetCount: number,
): RhythmClickResult {
  const point = targetPosition(target, elapsed);
  const distance = Math.hypot(pointer.x - point.x, pointer.y - point.y);
  const timingOffset = Math.abs(elapsed - target.hitAt);
  const inside = distance <= target.radius;
  const judgement: RhythmJudgement = !inside || timingOffset > 0.42
    ? 'miss'
    : timingOffset <= 0.1 && distance <= target.radius * 0.38
      ? 'perfect'
      : timingOffset <= 0.22 && distance <= target.radius * 0.72
        ? 'good'
        : 'normal';
  return {
    targetId: target.id,
    judgement,
    distance,
    timingOffset,
    early: elapsed < target.hitAt,
    completed: remainingTargetCount <= 1,
  };
}

export function rhythmProgress(target: MouseRhythmTarget, elapsed: number): number {
  return clamp((target.hitAt - elapsed) / Math.max(0.001, target.hitAt - target.appearAt), 0, 1);
}
