// engine/Tween.ts — 手写补间（TDD §2.6 R01：替代 GSAP）
// tween(target, key, from, to, dur, ease?) + 链式 Timeline + update(dt) + onComplete。
// ease 全部来自 core/math（无第三方依赖）。

import { clamp, easeLinear, lerp, type EaseFn } from '../core/math';

export type { EaseFn };
export { easeLinear };

export interface TweenHandle {
  readonly target: Record<string, number>;
  readonly key: string;
  readonly duration: number;
  onComplete: (() => void) | null;
}

class Tween implements TweenHandle {
  readonly target: Record<string, number>;
  readonly key: string;
  readonly duration: number;
  onComplete: (() => void) | null = null;
  private from: number;
  private to: number;
  private ease: EaseFn;
  private startAt: number;
  private finished = false;

  constructor(
    target: Record<string, number>,
    key: string,
    from: number,
    to: number,
    dur: number,
    ease: EaseFn,
    startAt: number,
  ) {
    this.target = target;
    this.key = key;
    this.from = from;
    this.to = to;
    this.duration = dur;
    this.ease = ease;
    this.startAt = startAt;
  }

  update(now: number): boolean {
    if (this.finished || now < this.startAt) return this.finished;
    const d = Math.max(this.duration, 0.0001);
    const p = clamp((now - this.startAt) / d, 0, 1);
    this.target[this.key] = this.from + (this.to - this.from) * this.ease(p);
    if (p >= 1) this.finished = true;
    return this.finished;
  }
}

export class TweenManager {
  private time = 0;
  private active: Tween[] = [];

  tween(
    target: Record<string, number>,
    key: string,
    from: number,
    to: number,
    dur: number,
    ease: EaseFn = easeLinear,
    delay = 0,
  ): TweenHandle {
    const t = new Tween(target, key, from, to, dur, ease, this.time + Math.max(0, delay));
    this.active.push(t);
    return t;
  }

  timeline(): Timeline {
    return new Timeline(this);
  }

  update(dt: number): void {
    if (dt <= 0) return;
    this.time += dt;
    const done: Tween[] = [];
    for (let i = this.active.length - 1; i >= 0; i--) {
      const t = this.active[i];
      if (t.update(this.time)) {
        this.active.splice(i, 1);
        done.push(t);
      }
    }
    for (const t of done) t.onComplete?.();
  }

  kill(target?: Record<string, number>): void {
    this.active = target === undefined ? [] : this.active.filter((t) => t.target !== target);
  }
}

export class Timeline {
  private manager: TweenManager;
  private cursor = 0;

  constructor(manager: TweenManager) {
    this.manager = manager;
  }

  to(target: Record<string, number>, key: string, from: number, to: number, dur: number, ease?: EaseFn): this {
    this.manager.tween(target, key, from, to, dur, ease, this.cursor);
    this.cursor += dur;
    return this;
  }

  delay(sec: number): this {
    this.cursor += sec;
    return this;
  }

  call(fn: () => void): this {
    const marker: Record<string, number> = {};
    const t = this.manager.tween(marker, 'k', 0, 0, 0, easeLinear, this.cursor);
    t.onComplete = fn;
    return this;
  }

  onComplete(fn: () => void): this {
    const marker: Record<string, number> = {};
    const t = this.manager.tween(marker, 'k', 0, 0, 0, easeLinear, this.cursor);
    t.onComplete = fn;
    return this;
  }
}

/** 03 §7.1：damp(current, target, lambda, dt) —— 状态切换统一阻尼过渡 */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}
