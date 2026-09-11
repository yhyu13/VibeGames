// src/port-check.ts —— cross-implementation check: run the SAME assertion suite
// against a second, self-contained reference implementation, so "both green" is
// preserved (mirrors rc-lab/port-check.ts, which validated the game-side port).
//
// Here the reference implementation is a second fresh instance of the WebGL
// backend (`PortedReference`), constructed independently on its own canvas. The
// main demo pipeline and this reference both satisfy the `RcRunner` contract, so
// runAll() applies the identical ~37 assertions to each.

import { runAll, type LabReport } from './verify';
import { RcWebglBackend } from './backend/RcWebglBackend';
import type { BackendState, RcBackend } from './backend/RcBackend';
import type { LabPipelineConfig, LabReadStage, LabSceneInput, LabStageTimings, RcRunner } from './types';

/** Reference verification profile (cancels any UI config so the reference is canonical). */
const REFERENCE_PROFILE: Partial<LabPipelineConfig> = {
  baseIntervalPx: 1.5,
  ditherEnabled: false,
};

/** Second self-contained implementation (a fresh RcWebglBackend instance). */
class PortedReference implements RcBackend {
  private readonly impl: RcWebglBackend;
  private readonly canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 480;
    this.canvas.height = 216;
    this.impl = new RcWebglBackend();
    this.impl.init(this.canvas);
  }

  init(canvas: HTMLCanvasElement): void {
    this.impl.init(canvas);
  }

  render(input: LabSceneInput, config: LabPipelineConfig): LabStageTimings {
    return this.impl.render(input, { ...config, ...REFERENCE_PROFILE });
  }

  readPixel(stage: LabReadStage, x: number, y: number): [number, number, number, number] {
    return this.impl.readPixel(stage, x, y);
  }

  debugShowStage(stage: LabReadStage, boost?: number): void {
    this.impl.debugShowStage(stage, boost);
  }

  stageProps(stage: LabReadStage): { width: number; height: number } {
    return this.impl.stageProps(stage);
  }

  get state(): BackendState {
    return this.impl.state;
  }

  isContextLost(): boolean {
    return this.impl.isContextLost();
  }

  glError(): number {
    return this.impl.glError();
  }

  debugMarkRadiance(): [number, number] {
    return this.impl.debugMarkRadiance();
  }

  debugRenderCascade(stopIndex: number): { width: number; height: number } {
    return this.impl.debugRenderCascade(stopIndex);
  }

  readJfa(stage: 'jfaA' | 'jfaB' | 'jfaOut', x: number, y: number): [number, number, number, number] {
    return this.impl.readJfa(stage, x, y);
  }

  debugReadFbStatus(): { boundOk: boolean; statusHex: string; isCascadeA: boolean; isCascadeB: boolean } {
    return this.impl.debugReadFbStatus();
  }

  debugProbeReadback(): { readOk: boolean; drawBindingOk: boolean; bytes: number[] } {
    return this.impl.debugProbeReadback();
  }

  debugReadSizes(): Array<[number, number, number]> {
    return this.impl.debugReadSizes();
  }

  dispose(): void {
    this.impl.dispose();
  }
}

export function runPortCheck(): LabReport {
  const reference = new PortedReference();
  // Keep canonical stage-coordinate checks at full resolution; skip the big stress
  // scene for the reference run (mirrors rc-lab, which excluded "stress" and the
  // game profile disables dither + uses baseIntervalPx=1.5).
  const runner: RcRunner = {
    render: (input, config) => reference.render(input, { ...config, ...REFERENCE_PROFILE }),
    readPixel: (stage, x, y) => reference.readPixel(stage, x, y),
  };
  return runAll(runner, new Set(['stress']));
}
