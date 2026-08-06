// engine/Tween.ts — 手写补间/timeline（替代 GSAP，TDD §2.6 R01）
// tween(target, key, from, to, dur, ease?) + 链式 timeline（to/wait/call/parallel）+ onComplete。
// ease 全部来自 core/math（cubic / elastic / back 曲线）。

import { clamp, easeLinear } from '../core/math';
import type { EaseFn } from '../core/math';

export type { EaseFn };

/** 可被 tween 的数值目标（THREE.Object3D.position / 姿态代理对象等） */
export type TweenTarget = Record<string, number>;

export interface TweenOpts {
  delay?: number;          // 开始前延迟（秒）
  onComplete?: () => void; // 结束回调（只触发一次）
}

/** 单个补间。由 TweenManager 驱动；killed 后立即结束且不触发 onComplete。 */
export class Tween {
  private elapsed = 0;
  private completed = false;
  private killedFlag = false;
  readonly ease: EaseFn;

  constructor(
    manager: TweenManager,
    private readonly target: TweenTarget,
    private readonly key: string,
    private readonly from: number,
    private readonly to: number,
    private readonly dur: number,
    ease: EaseFn = easeLinear,
    private opts: TweenOpts = {},
  ) {
    this.ease = ease;
    manager.attach(this);
  }

  /** 推进一帧；返回 true 表示已结束（完成或被 kill）。 */
  update(dt: number): boolean {
    if (this.killedFlag) return true;
    this.elapsed += dt;
    const t = this.dur <= 0 ? 1 : clamp((this.elapsed - (this.opts.delay ?? 0)) / this.dur, 0, 1);
    if (t < 0) return false;
    this.target[this.key] = this.from + (this.to - this.from) * this.ease(t);
    if (t >= 1) {
      if (!this.completed) {
        this.completed = true;
        const cb = this.opts.onComplete;
        this.opts = { ...this.opts, onComplete: undefined };
        if (cb) cb();
      }
      return true;
    }
    return false;
  }

  kill(): void {
    this.killedFlag = true;
  }

  get targetObject(): TweenTarget {
    return this.target;
  }
}

type Step =
  | { kind: 'seq'; target: TweenTarget; key: string; from: number | (() => number); to: number; dur: number; ease: EaseFn; opts: TweenOpts }
  | { kind: 'wait'; dur: number }
  | { kind: 'call'; fn: () => void }
  | { kind: 'par'; steps: Step[] };

/** 单条 step 序列的运行器（支持嵌套 parallel）。 */
class Runner {
  private idx = 0;
  private current: Tween | null = null;
  private wait = 0;
  private par: Runner[] | null = null;

  constructor(
    private readonly steps: Step[],
    private readonly manager: TweenManager,
  ) {}

  /** 推进；返回 true = 本序列完成。 */
  update(dt: number): boolean {
    while (this.idx < this.steps.length) {
      const s = this.steps[this.idx];
      if (s.kind === 'wait') {
        this.wait += dt;
        if (this.wait < s.dur) return false;
        this.wait = 0;
        this.idx += 1;
        continue;
      }
      if (s.kind === 'call') {
        s.fn();
        this.idx += 1;
        continue;
      }
      if (s.kind === 'seq') {
        if (!this.current) {
          const from = typeof s.from === 'function' ? s.from() : s.from;
          this.current = this.manager.tween(s.target, s.key, from, s.to, s.dur, s.ease, s.opts);
        }
        if (this.current.update(dt)) {
          this.current = null;
          this.idx += 1;
          continue;
        }
        return false;
      }
      if (!this.par) {
        this.par = s.steps.map((st) => new Runner([st], this.manager));
      }
      let allDone = true;
      for (const r of this.par) {
        if (!r.update(dt)) allDone = false;
      }
      if (allDone) {
        this.par = null;
        this.idx += 1;
        continue;
      }
      return false;
    }
    return true;
  }

  kill(): void {
    if (this.current) this.current.kill();
    if (this.par) for (const r of this.par) r.kill();
    this.current = null;
    this.par = null;
  }
}

/** 补间管理器：驱动全部 Tween / Timeline，每帧 update(dt)。 */
export class TweenManager {
  private active = new Set<Tween>();

  attach(t: Tween): void {
    this.active.add(t);
  }

  /** 单发补间（也用于 Timeline 内部）。 */
  tween(
    target: TweenTarget,
    key: string,
    from: number,
    to: number,
    dur: number,
    ease: EaseFn = easeLinear,
    opts: TweenOpts = {},
  ): Tween {
    return new Tween(this, target, key, from, to, dur, ease, opts);
  }

  /** 链式 timeline：to/wait/call/parallel 顺序或并行编排。 */
  timeline(target: TweenTarget): Timeline {
    return new Timeline(this, target);
  }

  /** 推进全部补间；已完成的移除。 */
  update(dt: number): void {
    for (const t of [...this.active]) {
      if (t.update(dt)) this.active.delete(t);
    }
  }

  /** 取消作用在指定目标上的全部补间（动画切换时防串扰）。 */
  kill(target: TweenTarget): void {
    for (const t of [...this.active]) {
      if (t.targetObject === target) t.kill();
    }
  }

  clear(): void {
    for (const t of this.active) t.kill();
    this.active.clear();
  }

  get activeCount(): number {
    return this.active.size;
  }
}

/** 链式时间线：步骤按入队顺序执行，parallel 组内并发。 */
export class Timeline {
  private steps: Step[] = [];
  private runner: Runner | null = null;
  private playingFlag = false;
  private onCompleteFn: (() => void) | null = null;

  constructor(
    private readonly manager: TweenManager,
    private readonly target: TweenTarget,
  ) {}

  /** 追加一个补间；from 传函数则在该步骤真正开始时才采样（支持承接上一步终值）。 */
  to(
    target: TweenTarget,
    key: string,
    from: number | (() => number),
    to: number,
    dur: number,
    ease: EaseFn = easeLinear,
    opts: TweenOpts = {},
  ): this {
    this.steps.push({ kind: 'seq', target, key, from, to, dur, ease, opts });
    return this;
  }

  wait(dur: number): this {
    this.steps.push({ kind: 'wait', dur });
    return this;
  }

  call(fn: () => void): this {
    this.steps.push({ kind: 'call', fn });
    return this;
  }

  /** 并行组：组内 to/wait/call 同时启动，全部结束后继续下一组。 */
  parallel(build: (p: Timeline) => void): this {
    const steps: Step[] = [];
    const sub = new Timeline(this.manager, this.target);
    sub.steps = steps;
    build(sub);
    this.steps.push({ kind: 'par', steps });
    return this;
  }

  onComplete(fn: () => void): this {
    this.onCompleteFn = fn;
    return this;
  }

  play(): this {
    this.runner = new Runner(this.steps, this.manager);
    this.playingFlag = true;
    return this;
  }

  /** 停止并取消未完成步骤（不触发 onComplete）。 */
  stop(): void {
    if (this.runner) this.runner.kill();
    this.runner = null;
    this.playingFlag = false;
  }

  get playing(): boolean {
    return this.playingFlag;
  }

  /** 推进一帧；播放结束后触发一次 onComplete。 */
  update(dt: number): void {
    if (!this.playingFlag || !this.runner) return;
    if (this.runner.update(dt)) {
      this.playingFlag = false;
      this.runner = null;
      const cb = this.onCompleteFn;
      this.onCompleteFn = null;
      if (cb) cb();
    }
  }
}
