import { FIXED_DT } from "./types";

export interface FixedLoop {
  start(): void;
  stop(): void;
  setSimStep(step: (dt: number, time: number) => void): void;
  setRenderStep(step: (alpha: number, time: number) => void): void;
  readonly accumulator: number;
}

export class FixedLoopImpl implements FixedLoop {
  private readonly fixedDt: number;
  private simStep: (dt: number, time: number) => void = () => {};
  private renderStep: (alpha: number, time: number) => void = () => {};
  private rafId: number | null = null;
  private lastTime = 0;
  private acc = 0;
  private simTime = 0;
  private readonly maxFrameTime = 0.25;

  constructor(fixedDt: number = FIXED_DT) {
    this.fixedDt = fixedDt;
  }

  get accumulator(): number {
    return this.acc;
  }

  setSimStep(step: (dt: number, time: number) => void): void {
    this.simStep = step;
  }

  setRenderStep(step: (alpha: number, time: number) => void): void {
    this.renderStep = step;
  }

  start(): void {
    if (this.rafId !== null) return;
    this.lastTime = performance.now() / 1000;
    const tick = (nowMs: number): void => {
      const now = nowMs / 1000;
      let frame = Math.min(now - this.lastTime, this.maxFrameTime);
      this.lastTime = now;
      this.acc += frame;
      while (this.acc >= this.fixedDt) {
        this.simStep(this.fixedDt, this.simTime);
        this.simTime += this.fixedDt;
        this.acc -= this.fixedDt;
      }
      this.renderStep(this.acc / this.fixedDt, now);
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

/**
 * Pure accumulation math, usable headlessly (no rAF).
 * Returns the number of fixed steps that should run for `frameTime`
 * given a current accumulator, and the new accumulator value.
 */
export function accumulateSteps(frameTime: number, accumulator: number, dt: number): { steps: number; nextAcc: number } {
  const clamped = Math.min(Math.max(frameTime, 0), 0.25);
  let acc = accumulator + clamped;
  let steps = 0;
  while (acc >= dt) {
    steps++;
    acc -= dt;
  }
  return { steps, nextAcc: acc };
}
