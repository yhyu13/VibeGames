// Fixed-60Hz simulation loop with render interpolation.

import { Env } from './Env.js';

export interface LoopHooks {
  tick: (dt: number) => void;    // logical step in seconds
  render: (alpha: number) => void; // 0..1, position between previous and current tick
}

export class Loop {
  private acc = 0;
  private last = 0;
  private running = false;
  private rafId = 0;
  private readonly hooks: LoopHooks;

  constructor(hooks: LoopHooks) {
    this.hooks = hooks;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.acc = 0;
    this.rafId = requestAnimationFrame(this.frame);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  private frame = (now: number): void => {
    if (!this.running) return;
    const realDt = Math.min(now - this.last, Env.MAX_DT_MS);
    this.last = now;
    this.acc += realDt;

    let steps = 0;
    while (this.acc >= Env.LOGIC_STEP_MS && steps < 5) {
      this.hooks.tick(Env.LOGIC_STEP_MS / 1000);
      this.acc -= Env.LOGIC_STEP_MS;
      steps++;
    }
    if (steps === 5) this.acc = 0; // spiral guard

    const alpha = Math.min(1, this.acc / Env.LOGIC_STEP_MS);
    this.hooks.render(alpha);
    this.rafId = requestAnimationFrame(this.frame);
  };
}