// src/types.ts —— shared RC pipeline types (ported verbatim from rc-lab/pipeline.ts).
//
// These types are the backend contract: the demo + the assertion engine consume
// only this surface, so a future WebGPU/TSL backend (RcWebgpuBackend) can drop in
// without touching verify.ts / scenes.ts. The numeric defaults are identical to
// rc-lab (DEFAULT_LAB_CONFIG) so the assertion oracle is a true port.

/** Pipeline configuration (values aligned with rc-lab TDD §4.4.6 / §15). */
export interface LabPipelineConfig {
  cascadeCount: number;      // 1..4; 0 = RC off, fall back to base color
  baseRayCount: number;      // 2..8 (demo uBaseRayCount)
  baseIntervalPx: number;    // demo uBaseInterval (px)
  propagationRate: number;   // demo uPropagationRate
  mixFactor: number;         // demo uMixFactor
  lightScale: number;        // final.frag uLightScale (additive compositing gain)
  ambientIntensity: number;  // rc.frag uAmbientIntensity
  eps: number;               // rc.frag uEps (RGBA8 SDF hit threshold)
  ditherEnabled: boolean;    // final.frag 4x4 Bayer (lab default off)
  jfaPasses: number;         // -1 = auto ceil(log2(min(W,H))); >=0 manual
  debugDisplay?: number;     // rc.frag debug passthrough: -1/-2/-3
  twoLoop: boolean;          // demo two-round cascade (direct->indirect); false = game old single-round variant
  mergeMode: 0 | 1 | 2;      // 0=demo mirror 1=this-pixel bilinear 2=ray-end bilinear
  canonicalSpacing: boolean; // 1=canonical(cascade0 finest) 0=demo(reversed)
}

export const DEFAULT_LAB_CONFIG: LabPipelineConfig = {
  cascadeCount: 3,
  baseRayCount: 4,
  baseIntervalPx: 1.5,
  propagationRate: 0.85,
  mixFactor: 0.5,
  lightScale: 1.35,
  ambientIntensity: 0.06,
  eps: 3 / 255,
  ditherEnabled: false,
  jfaPasses: -1,
  twoLoop: true,
  mergeMode: 0,
  canonicalSpacing: false,
};

/** Scene input: three same-sized RGBA textures (ImageData row order = top at row 0). */
export interface LabSceneInput {
  width: number;
  height: number;
  occlusion: ImageData;   // white = empty, black = wall (occluder)
  emission: ImageData;    // black = no light, light blobs = emissive seed
  sceneColor: ImageData;  // base color for final composite
}

export interface LabStageTimings {
  prepscene: number;
  jfa: number;
  distfield: number;
  cascade: number;
  final: number;
  total: number;
}

export type LabReadStage = 'seed' | 'sdf' | 'radiance' | 'final';

/** The runnable pipeline contract (structural) that verify.ts consumes. */
export interface RcRunner {
  render(input: LabSceneInput, config: LabPipelineConfig): LabStageTimings;
  readPixel(stage: LabReadStage, x: number, y: number): [number, number, number, number];
}
