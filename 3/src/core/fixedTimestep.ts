export const FIXED_HZ = 60;
export const FIXED_DT = 1 / FIXED_HZ;
const MAX_FRAME = 0.1;

export class FixedTimestep {
  private accumulator = 0;
  private last = 0;
  running = false;

  constructor(private hz: number = FIXED_HZ) {}

  start(now: number): void {
    this.last = now;
    this.accumulator = 0;
    this.running = true;
  }

  stop(): void {
    this.running = false;
  }

  reset(): void {
    this.accumulator = 0;
  }

  frame(now: number, onFixed: (dt: number) => void): void {
    if (!this.running) return;
    let frame = now - this.last;
    if (frame > MAX_FRAME) frame = MAX_FRAME;
    this.last = now;
    this.accumulator += frame;
    const dt = 1 / this.hz;
    while (this.accumulator >= dt) {
      onFixed(dt);
      this.accumulator -= dt;
    }
  }
}
