/**
 * Scalar 14→32→32→3 decoder. Leaky ReLU 0.01, exp output (course steps 01–03).
 * Packed row-major weights; layout frozen in constants.ts.
 */
import {
  B0_OFF, B1_OFF, B2_OFF,
  DECODER_IN, DECODER_OUT, HIDDEN_WIDTH,
  LEAKY_RELU_SLOPE, MLP_PARAM_COUNT,
  W0_OFF, W1_OFF, W2_OFF,
} from './constants'
import type { DecoderInput, MlpWeights, Vec3 } from './types'

export function leakyRelu(x: number): number {
  return x > 0 ? x : x * LEAKY_RELU_SLOPE
}

export function emptyWeights(): MlpWeights {
  return { data: new Float32Array(MLP_PARAM_COUNT) }
}

/** Xavier uniform init, matching course linear_layer.py. */
export function xavierInit(rng: () => number): MlpWeights {
  const w = emptyWeights()
  fillLayer(w.data, W0_OFF, HIDDEN_WIDTH, DECODER_IN, rng)
  fillLayer(w.data, W1_OFF, HIDDEN_WIDTH, HIDDEN_WIDTH, rng)
  fillLayer(w.data, W2_OFF, DECODER_OUT, HIDDEN_WIDTH, rng)
  return w
}

function fillLayer(
  data: Float32Array, off: number, rows: number, cols: number, rng: () => number,
): void {
  const limit = Math.sqrt(6 / (rows + cols))
  const n = rows * cols
  for (let i = 0; i < n; i++) {
    data[off + i] = (rng() * 2 - 1) * limit
  }
}

function matVec(
  data: Float32Array, wOff: number, bOff: number,
  rows: number, cols: number, x: Float32Array, y: Float32Array,
): void {
  for (let r = 0; r < rows; r++) {
    let s = data[bOff + r]
    const row = wOff + r * cols
    for (let c = 0; c < cols; c++) s += data[row + c] * x[c]
    y[r] = s
  }
}

const tmpIn = new Float32Array(DECODER_IN)
const tmpH0 = new Float32Array(HIDDEN_WIDTH)
const tmpH1 = new Float32Array(HIDDEN_WIDTH)
const tmpOut = new Float32Array(DECODER_OUT)

export function decode(weights: MlpWeights, input: DecoderInput): Vec3 {
  tmpIn.set(input)
  matVec(weights.data, W0_OFF, B0_OFF, HIDDEN_WIDTH, DECODER_IN, tmpIn, tmpH0)
  for (let i = 0; i < HIDDEN_WIDTH; i++) tmpH0[i] = leakyRelu(tmpH0[i])
  matVec(weights.data, W1_OFF, B1_OFF, HIDDEN_WIDTH, HIDDEN_WIDTH, tmpH0, tmpH1)
  for (let i = 0; i < HIDDEN_WIDTH; i++) tmpH1[i] = leakyRelu(tmpH1[i])
  matVec(weights.data, W2_OFF, B2_OFF, DECODER_OUT, HIDDEN_WIDTH, tmpH1, tmpOut)
  return [
    Math.exp(Math.min(tmpOut[0], 12)),
    Math.exp(Math.min(tmpOut[1], 12)),
    Math.exp(Math.min(tmpOut[2], 12)),
  ]
}

/** Forward + cache for backprop. */
export interface ForwardCache {
  x: Float32Array
  h0pre: Float32Array
  h0: Float32Array
  h1pre: Float32Array
  h1: Float32Array
  ypre: Float32Array
  y: Vec3
}

export function forward(weights: MlpWeights, input: DecoderInput): ForwardCache {
  const x = new Float32Array(input)
  const h0pre = new Float32Array(HIDDEN_WIDTH)
  const h0 = new Float32Array(HIDDEN_WIDTH)
  const h1pre = new Float32Array(HIDDEN_WIDTH)
  const h1 = new Float32Array(HIDDEN_WIDTH)
  const ypre = new Float32Array(DECODER_OUT)
  matVec(weights.data, W0_OFF, B0_OFF, HIDDEN_WIDTH, DECODER_IN, x, h0pre)
  for (let i = 0; i < HIDDEN_WIDTH; i++) h0[i] = leakyRelu(h0pre[i])
  matVec(weights.data, W1_OFF, B1_OFF, HIDDEN_WIDTH, HIDDEN_WIDTH, h0, h1pre)
  for (let i = 0; i < HIDDEN_WIDTH; i++) h1[i] = leakyRelu(h1pre[i])
  matVec(weights.data, W2_OFF, B2_OFF, DECODER_OUT, HIDDEN_WIDTH, h1, ypre)
  const y: Vec3 = [
    Math.exp(Math.min(ypre[0], 12)),
    Math.exp(Math.min(ypre[1], 12)),
    Math.exp(Math.min(ypre[2], 12)),
  ]
  return { x, h0pre, h0, h1pre, h1, ypre, y }
}

function dLeaky(pre: number): number {
  return pre > 0 ? 1 : LEAKY_RELU_SLOPE
}

/**
 * Backprop of log-L1: mean over RGB of |log1p(y) - log1p(target)|.
 * Log compression tames the GGX specular dynamic range so the rare bright
 * highlight cannot dominate the gradient (course metric: log-L1 of log(1+max(x,0))).
 * Accumulates into `grad` (same packing as weights).
 */
export function backwardLogL1(
  weights: MlpWeights, cache: ForwardCache, target: Vec3, grad: Float32Array,
): number {
  const { x, h0pre, h0, h1pre, h1, y } = cache
  let loss = 0
  const dy = new Float32Array(DECODER_OUT)
  for (let i = 0; i < DECODER_OUT; i++) {
    const diff = Math.log1p(y[i]) - Math.log1p(Math.max(0, target[i]))
    loss += Math.abs(diff)
    const sign = diff > 0 ? 1 : diff < 0 ? -1 : 0
    // dL/d(y) = sign / (1 + y); dL/d(ypre) = dL/d(y) * exp(ypre) = sign * y / (1 + y).
    // Loss is the mean over RGB, so the gradient carries the same 1/DECODER_OUT.
    dy[i] = (sign * (y[i] / (1 + y[i]))) / DECODER_OUT
  }
  loss /= DECODER_OUT

  const data = weights.data
  const dh1 = new Float32Array(HIDDEN_WIDTH)
  for (let r = 0; r < DECODER_OUT; r++) {
    grad[B2_OFF + r] += dy[r]
    const row = W2_OFF + r * HIDDEN_WIDTH
    for (let c = 0; c < HIDDEN_WIDTH; c++) {
      grad[row + c] += dy[r] * h1[c]
      dh1[c] += data[row + c] * dy[r]
    }
  }
  for (let i = 0; i < HIDDEN_WIDTH; i++) dh1[i] *= dLeaky(h1pre[i])

  const dh0 = new Float32Array(HIDDEN_WIDTH)
  for (let r = 0; r < HIDDEN_WIDTH; r++) {
    grad[B1_OFF + r] += dh1[r]
    const row = W1_OFF + r * HIDDEN_WIDTH
    for (let c = 0; c < HIDDEN_WIDTH; c++) {
      grad[row + c] += dh1[r] * h0[c]
      dh0[c] += data[row + c] * dh1[r]
    }
  }
  for (let i = 0; i < HIDDEN_WIDTH; i++) dh0[i] *= dLeaky(h0pre[i])

  for (let r = 0; r < HIDDEN_WIDTH; r++) {
    grad[B0_OFF + r] += dh0[r]
    const row = W0_OFF + r * DECODER_IN
    for (let c = 0; c < DECODER_IN; c++) {
      grad[row + c] += dh0[r] * x[c]
    }
  }
  return loss
}
