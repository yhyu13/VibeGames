// engine/Tween.ts — 轻量补间（引擎内部动画）

export interface TweenSpec {
  from: number;
  to: number;
  duration: number;
  elapsed: number;
  ease?: (t: number) => number;
}

export function makeTween(from: number, to: number, duration: number, elapsed = 0, ease?: (t: number) => number): TweenSpec {
  return { from, to, duration, elapsed, ease };
}

export function tweenValue(tw: TweenSpec, dt: number): { value: number; done: boolean; tw: TweenSpec } {
  const elapsed = tw.elapsed + dt;
  const done = elapsed >= tw.duration;
  const t = done ? 1 : tw.duration <= 0 ? 1 : elapsed / tw.duration;
  const e = tw.ease ? tw.ease(t) : t;
  return { value: tw.from + (tw.to - tw.from) * e, done, tw: { ...tw, elapsed } };
}

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
export const easeInCubic = (t: number): number => t * t * t;
export const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
