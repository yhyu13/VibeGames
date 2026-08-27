/**
 * CPU Adam trainer. Distills the GGX teacher into the 14→32→32→3 decoder.
 * Encoder is closed-form (encodeLatent) — only decoder weights are learned.
 */
import {
  ADAM_B1, ADAM_B2, ADAM_EPS,
  MLP_PARAM_COUNT,
  TRAIN_BATCH, TRAIN_LR_END, TRAIN_LR_START, TRAIN_STEPS,
} from './constants'
import { evalTeacher } from './ggx'
import { encodeLatent, materialAt } from './material'
import { backwardLogL1, emptyWeights, forward, xavierInit } from './mlp'
import { rusinkiewicz, sampleRusinkiewicz } from './rusinkiewicz'
import type { AdamState, DecoderInput, MlpWeights, Vec3 } from './types'

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = a + 0x6d2b79f5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

export function cosineLr(step: number, total: number): number {
  const t = Math.min(1, Math.max(0, step / total))
  return TRAIN_LR_END + 0.5 * (TRAIN_LR_START - TRAIN_LR_END) * (1 + Math.cos(Math.PI * t))
}

export function createAdam(n = MLP_PARAM_COUNT): AdamState {
  return { m: new Float32Array(n), v: new Float32Array(n), t: 0 }
}

export function adamStep(
  weights: MlpWeights, grad: Float32Array, adam: AdamState, lr: number, batch: number,
): void {
  adam.t += 1
  const t = adam.t
  const bc1 = 1 - Math.pow(ADAM_B1, t)
  const bc2 = 1 - Math.pow(ADAM_B2, t)
  const invB = 1 / batch
  for (let i = 0; i < weights.data.length; i++) {
    const g = grad[i] * invB
    const m = adam.m[i] = ADAM_B1 * adam.m[i] + (1 - ADAM_B1) * g
    const v = adam.v[i] = ADAM_B2 * adam.v[i] + (1 - ADAM_B2) * g * g
    const mHat = m / bc1
    const vHat = v / bc2
    weights.data[i] -= lr * mHat / (Math.sqrt(vHat) + ADAM_EPS)
  }
}

function makeInput(z: readonly number[], wh: Vec3, wd: Vec3): DecoderInput {
  return [
    z[0], z[1], z[2], z[3], z[4], z[5], z[6], z[7],
    wh[0], wh[1], wh[2],
    wd[0], wd[1], wd[2],
  ]
}

export function trainStep(
  weights: MlpWeights, adam: AdamState, rng: () => number, lr: number, batch = TRAIN_BATCH,
): number {
  const grad = new Float32Array(MLP_PARAM_COUNT)
  let loss = 0
  let accepted = 0
  let guard = 0
  while (accepted < batch && guard < batch * 8) {
    guard++
    const sample = sampleRusinkiewicz(rng(), rng(), rng(), rng())
    if (!sample) continue
    const uv: [number, number] = [rng(), rng()]
    const s = materialAt(uv)
    const z = encodeLatent(s)
    const { wh, wd } = rusinkiewicz(sample.wi, sample.wo)
    const target = evalTeacher(s, sample.wi, sample.wo)
    const cache = forward(weights, makeInput(z, wh, wd))
    loss += backwardLogL1(weights, cache, target, grad)
    accepted++
  }
  adamStep(weights, grad, adam, lr, Math.max(1, accepted))
  return loss / Math.max(1, accepted)
}

export function validateLogL1(weights: MlpWeights, rng: () => number, n = 512): number {
  let loss = 0
  let accepted = 0
  let guard = 0
  while (accepted < n && guard < n * 8) {
    guard++
    const sample = sampleRusinkiewicz(rng(), rng(), rng(), rng())
    if (!sample) continue
    const uv: [number, number] = [rng(), rng()]
    const s = materialAt(uv)
    const z = encodeLatent(s)
    const { wh, wd } = rusinkiewicz(sample.wi, sample.wo)
    const target = evalTeacher(s, sample.wi, sample.wo)
    const y = forward(weights, makeInput(z, wh, wd)).y
    loss += (
      Math.abs(Math.log1p(y[0]) - Math.log1p(Math.max(0, target[0])))
      + Math.abs(Math.log1p(y[1]) - Math.log1p(Math.max(0, target[1])))
      + Math.abs(Math.log1p(y[2]) - Math.log1p(Math.max(0, target[2])))
    ) / 3
    accepted++
  }
  return loss / Math.max(1, accepted)
}

export interface TrainResult {
  weights: MlpWeights
  history: number[]
  finalVal: number
}

export function trainDecoder(opts?: {
  steps?: number
  batch?: number
  seed?: number
  onStep?: (step: number, trainLoss: number, lr: number) => void
}): TrainResult {
  const steps = opts?.steps ?? TRAIN_STEPS
  const batch = opts?.batch ?? TRAIN_BATCH
  const rng = mulberry32(opts?.seed ?? 1)
  const weights = xavierInit(rng)
  const adam = createAdam()
  const history: number[] = []
  for (let i = 0; i < steps; i++) {
    const lr = cosineLr(i, steps)
    const loss = trainStep(weights, adam, rng, lr, batch)
    if (i % 50 === 0 || i === steps - 1) {
      history.push(loss)
      opts?.onStep?.(i, loss, lr)
    }
  }
  const finalVal = validateLogL1(weights, mulberry32(99), 1024)
  return { weights, history, finalVal }
}

export function weightsToArray(w: MlpWeights): number[] {
  return Array.from(w.data)
}

export function weightsFromArray(arr: ArrayLike<number>): MlpWeights {
  const w = emptyWeights()
  w.data.set(arr)
  return w
}
