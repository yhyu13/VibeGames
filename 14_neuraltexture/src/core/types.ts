/** Platform-agnostic neural-material types. Zero THREE / DOM. */

export type Vec3 = [number, number, number]
export type Vec2 = [number, number]

/** 8-D latent code sampled from the latent texture. */
export type Latent8 = [
  number, number, number, number,
  number, number, number, number,
]

/** Decoder input: 8 latent + 6 Rusinkiewicz (wh.xyz, wd.xyz). */
export type DecoderInput = [
  number, number, number, number,
  number, number, number, number,
  number, number, number,
  number, number, number,
]

export interface Surface {
  albedo: Vec3
  roughness: number
  metallic: number
}

export interface EvalQuery {
  uv: Vec2
  wi: Vec3
  wo: Vec3
}

export interface MlpWeights {
  /** Packed row-major: W0, B0, W1, B1, W2, B2. Length = MLP_PARAM_COUNT. */
  data: Float32Array
}

export interface AdamState {
  m: Float32Array
  v: Float32Array
  t: number
}
