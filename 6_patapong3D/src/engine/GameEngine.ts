/**
 * engine/GameEngine.ts — 主编排:rAF + 固定步 sim + render
 *
 * M1.4 由 agent-engine 实现。当前是 M0 骨架。
 *
 * 硬规则:此文件**可以** import three(DOM/WebGL 在此层);不能 import react。
 */

import { Simulation } from '../core/simulation/Simulation';
import { FIXED_DT, MAX_FRAME_ACCUM, STORE_SYNC_INTERVAL } from '../core/constants';
import { usePatapongStore } from '../store';

export class GameEngine {
  private sim: Simulation;
  private rafId: number | null = null;
  private accumulator = 0;
  private lastTime = 0;
  private frameCount = 0;
  private running = false;

  constructor(sim: Simulation) {
    this.sim = sim;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick = (now: number): void => {
    if (!this.running) return;
    const elapsedMs = now - this.lastTime;
    this.lastTime = now;
    let dt = Math.min(elapsedMs / 1000, MAX_FRAME_ACCUM * FIXED_DT);
    this.accumulator += dt;

    // 固定步推进 sim
    let steps = 0;
    while (this.accumulator >= FIXED_DT && steps < MAX_FRAME_ACCUM) {
      this.sim.step(FIXED_DT);
      this.accumulator -= FIXED_DT;
      steps++;
    }

    // 排空事件(由 engine 消费,M1.4 实际接线)
    const events = this.sim.drainEvents();
    if (events.length > 0) {
      // TODO M1.4: dispatch to SceneManager / AudioManager / ParticleSystem
      void events;
    }

    // 同步到 zustand(每 N 帧 1 次,减少 re-render)
    this.frameCount++;
    if (this.frameCount % STORE_SYNC_INTERVAL === 0) {
      const snap = this.sim.snapshot();
      usePatapongStore.setState({
        phase: snap.phase,
        // TODO M1.5: 同步 score / rallyHits / juice
      });
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  getSim(): Simulation {
    return this.sim;
  }
}
