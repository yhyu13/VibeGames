// src/backend/RcWebgpuBackend.ts —— STUB / placeholder for the WebGPU+TSL backend.
//
// NOT implemented yet. This class exists so the demo's architecture is complete:
// the demo + verify.ts consume the `RcBackend` interface, and a future backend can
// drop in via the `backendFactory` below without touching the assertion suite.
//
// Planned TSL compute swap (do NOT implement now):
//   - Swap `src/backend/RcWebglBackend.ts` for a three/webgpu + three/tsl compute
//     pipeline. Use `WebGPURenderer` for the render targets and represent each RC
//     pass (prepscene, prepjfa, jfa, distfield, rc_interval, rc_merge, final) as a
//     `wgslFn`/TSL compute shader writing to `storageTexture` double-buffers.
//   - JFA and the cascade interval/merge passes are trivially parallel per-ray /
//     per-probe: JFA over the WxH seed grid, cascade over the WxatlasH atlas — each
//     thread computes one texel with no cross-thread dependency, exactly like the
//     current fragment-heavy passes. These are ideal compute workloads.
//   - Three.js ships `three/tsl` (TSL function, wgslFn, storageTexture, ...). The
//     `RcBackend.render/readPixel/debugShowStage/isContextLost/glError` surface
//     stays identical, so verify.ts runs unchanged. `readPixel` would read from a
//     CPU-side `readbackBuffer` via `computeAsync()` + `buffer.getMappedRange()`

import type { LabPipelineConfig, LabReadStage, LabSceneInput, LabStageTimings } from '../types';
import type { BackendState, RcBackend, StageProps } from './RcBackend';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class RcWebgpuBackend implements RcBackend {
  init(_canvas: HTMLCanvasElement): void {
    throw new Error(
      'RcWebgpuBackend is not implemented — swap to three/webgpu + three/tsl compute ' +
        '(JFA + cascade as wgslFn) here. See the block comment in this file.',
    );
  }

  render(_scene: LabSceneInput, _config: LabPipelineConfig): LabStageTimings {
    throw this.notImplemented();
  }

  readPixel(_stage: LabReadStage, _x: number, _y: number): [number, number, number, number] {
    throw this.notImplemented();
  }

  debugShowStage(_stage: LabReadStage, _boost?: number): void {
    throw this.notImplemented();
  }

  stageProps(_stage: LabReadStage): StageProps {
    throw this.notImplemented();
  }

  get state(): BackendState {
    throw this.notImplemented();
  }

  isContextLost(): boolean {
    throw this.notImplemented();
  }

  glError(): number {
    throw this.notImplemented();
  }

  debugMarkRadiance(): [number, number] {
    throw this.notImplemented();
  }

  debugRenderCascade(_stopIndex: number): { width: number; height: number } {
    throw this.notImplemented();
  }

  readJfa(_stage: 'jfaA' | 'jfaB' | 'jfaOut', _x: number, _y: number): [number, number, number, number] {
    throw this.notImplemented();
  }

  debugReadFbStatus(): { boundOk: boolean; statusHex: string; isCascadeA: boolean; isCascadeB: boolean } {
    throw this.notImplemented();
  }

  debugProbeReadback(): { readOk: boolean; drawBindingOk: boolean; bytes: number[] } {
    throw this.notImplemented();
  }

  debugReadSizes(): Array<[number, number, number]> {
    throw this.notImplemented();
  }

  dispose(): void {
    throw this.notImplemented();
  }

  private notImplemented(): Error {
    return new Error(
      'RcWebgpuBackend is not implemented — swap to three/webgpu + three/tsl compute here.',
    );
  }
}
