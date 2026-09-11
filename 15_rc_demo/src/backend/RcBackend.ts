// src/backend/RcBackend.ts —— the backend contract the demo + assertions consume.
//
// The demo code, verify.ts, and scenes.ts never talk to a specific GPU API. They
// only use this interface, so a future WebGPU/TSL backend (see RcWebgpuBackend)
// can substitute for the WebGL-first implementation without touching the
// assertion suite. This mirrors rc-lab's `RcLabPipeline` surface plus the debug
// hooks verify.ts relies on.

import type { LabPipelineConfig, LabReadStage, LabSceneInput, LabStageTimings } from '../types';
import { RcWebglBackend } from './RcWebglBackend';
import { RcWebgpuBackend } from './RcWebgpuBackend';

/** Backend GPU state snapshot exposed for diagnostics. */
export interface BackendState {
  width: number;
  height: number;
  jfaPasses: number;
  renderCount: number;
}

/** Debug stage-snapshot descriptor read back by debugShowStage callers. */
export interface StageProps {
  width: number;
  height: number;
}

/** The full backend surface (extends the structural RcRunner contract). */
export interface RcBackend {
  init(canvas: HTMLCanvasElement): void;
  render(scene: LabSceneInput, config: LabPipelineConfig): LabStageTimings;
  readPixel(stage: LabReadStage, x: number, y: number): [number, number, number, number];
  debugShowStage(stage: LabReadStage, boost?: number): void;
  stageProps(stage: LabReadStage): StageProps;
  get state(): BackendState;
  isContextLost(): boolean;
  glError(): number;
  debugMarkRadiance(): [number, number];
  debugRenderCascade(stopIndex: number): { width: number; height: number };
  readJfa(stage: 'jfaA' | 'jfaB' | 'jfaOut', x: number, y: number): [number, number, number, number];
  debugReadFbStatus(): { boundOk: boolean; statusHex: string; isCascadeA: boolean; isCascadeB: boolean };
  debugProbeReadback(): { readOk: boolean; drawBindingOk: boolean; bytes: number[] };
  debugReadSizes(): Array<[number, number, number]>;
  readRadiancePixels?(): number[];
  dispose(): void;
}

export type RcBackendKind = 'webgl' | 'webgpu';

/**
 * Backend factory. Today it always returns the WebGL-first backend (the
 * production path). The WebGPU branch is documented but intentionally not
 * wired: flip `backend` to 'webgpu' once RcWebgpuBackend is implemented.
 */
export function backendFactory(kind: RcBackendKind = 'webgl'): RcBackend {
  if (kind === 'webgpu') {
    // Not implemented yet — see RcWebgpuBackend.ts for the planned TSL compute swap.
    // Returning the stub keeps the architecture honest: RcWebgpuBackend implements
    // the same RcBackend surface, so verify.ts runs unchanged when it lands.
    return new RcWebgpuBackend();
  }
  return new RcWebglBackend();
}
