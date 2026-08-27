import { describe, expect, it } from 'vitest'
import { MLP_PARAM_COUNT } from './constants'
import { evalTeacher } from './ggx'
import { clayMask, encodeLatent, materialAt, veinMask } from './material'
import { backwardLogL1, decode, emptyWeights, forward, xavierInit } from './mlp'
import { rusinkiewicz, sampleHemisphere, sampleRusinkiewicz } from './rusinkiewicz'
import { cosineLr, mulberry32, trainDecoder, trainStep, createAdam, validateLogL1 } from './train'
import type { DecoderInput, MlpWeights, Vec3 } from './types'

describe('rusinkiewicz', () => {
  it('maps a head-on reflection to a half-vector near +Z', () => {
    const wi: [number, number, number] = [0, 0, 1]
    const wo: [number, number, number] = [0, 0, 1]
    const { wh } = rusinkiewicz(wi, wo)
    expect(wh[2]).toBeCloseTo(1, 5)
  })

  it('sampleRusinkiewicz rejects grazing and returns unit vectors', () => {
    const rng = mulberry32(7)
    let ok = 0
    for (let i = 0; i < 64; i++) {
      const s = sampleRusinkiewicz(rng(), rng(), rng(), rng())
      if (!s) continue
      ok++
      expect(Math.hypot(...s.wi)).toBeCloseTo(1, 5)
      expect(Math.hypot(...s.wo)).toBeCloseTo(1, 5)
      expect(s.wi[2]).toBeGreaterThan(0)
      expect(s.wo[2]).toBeGreaterThan(0)
    }
    expect(ok).toBeGreaterThan(10)
  })
})

describe('ggx teacher', () => {
  it('is zero below the horizon', () => {
    const s = materialAt([0.5, 0.5])
    const rgb = evalTeacher(s, [0, 0, -1], [0, 0, 1])
    expect(rgb).toEqual([0, 0, 0])
  })

  it('returns a bright specular peak on the glaze at mirror', () => {
    const glaze = materialAt([0.02, 0.02]) // ink glaze, low roughness
    const clay = materialAt([0.35, 0.55])
    const wi = sampleHemisphere(0.95, 0.1)
    const wo = [...wi] as [number, number, number]
    const g = evalTeacher(glaze, wi, wo)
    const c = evalTeacher(clay, wi, wo)
    const gPeak = g[0] + g[1] + g[2]
    const cPeak = c[0] + c[1] + c[2]
    expect(gPeak).toBeGreaterThan(cPeak)
    expect(gPeak).toBeGreaterThan(0)
  })
})

describe('encoder', () => {
  it('packs 8 channels in [0, 1.2]', () => {
    const z = encodeLatent(materialAt([0.2, 0.4]))
    expect(z).toHaveLength(8)
    for (const c of z) {
      expect(c).toBeGreaterThanOrEqual(0)
      expect(c).toBeLessThan(1.3)
    }
  })
})

describe('mlp', () => {
  it('packs 1635 parameters', () => {
    expect(emptyWeights().data.length).toBe(MLP_PARAM_COUNT)
    expect(xavierInit(mulberry32(1)).data.length).toBe(MLP_PARAM_COUNT)
  })

  it('decode of zero weights is ~1 (exp(0))', () => {
    const y = decode(emptyWeights(), [
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 1,
    ])
    expect(y[0]).toBeCloseTo(1, 5)
    expect(y[1]).toBeCloseTo(1, 5)
    expect(y[2]).toBeCloseTo(1, 5)
  })

  it('forward cache matches decode', () => {
    const w = xavierInit(mulberry32(3))
    const input: [
      number, number, number, number, number, number, number, number,
      number, number, number, number, number, number,
    ] = [0.1, 0.2, 0.3, 0.4, 0.5, 0.1, 0.6, 0.2, 0, 0, 1, 0.1, 0, 0.9]
    const a = decode(w, input)
    const b = forward(w, input).y
    expect(a[0]).toBeCloseTo(b[0], 6)
  })
})

describe('train', () => {
  it('cosine lr starts high and ends low', () => {
    expect(cosineLr(0, 100)).toBeCloseTo(1e-3, 8)
    expect(cosineLr(100, 100)).toBeCloseTo(1e-5, 8)
  })

  it('a handful of Adam steps drop training loss', () => {
    const rng = mulberry32(11)
    const w = xavierInit(rng)
    const adam = createAdam()
    const first = trainStep(w, adam, rng, 1e-3, 64)
    let last = first
    for (let i = 0; i < 40; i++) last = trainStep(w, adam, rng, 1e-3, 64)
    expect(last).toBeLessThan(first)
    expect(last).toBeGreaterThan(0)
  })

  it('short bake produces finite weights', () => {
    const { weights, finalVal } = trainDecoder({ steps: 20, batch: 32, seed: 2 })
    expect(weights.data.length).toBe(MLP_PARAM_COUNT)
    expect(Number.isFinite(finalVal)).toBe(true)
    expect(finalVal).toBeGreaterThan(0)
  })
})

describe('rusinkiewicz golden vector', () => {
  it('head-on reflection maps wh and wd to +Z', () => {
    const { wh, wd } = rusinkiewicz([0, 0, 1], [0, 0, 1])
    expect(wh[2]).toBeCloseTo(1, 5)
    expect(wd[0]).toBeCloseTo(0, 5)
    expect(wd[1]).toBeCloseTo(0, 5)
    expect(wd[2]).toBeCloseTo(1, 5)
  })

  it('sampled wi/wo are mirror-symmetric about their half vector', () => {
    const rng = mulberry32(21)
    let checked = 0
    for (let i = 0; i < 64; i++) {
      const s = sampleRusinkiewicz(rng(), rng(), rng(), rng())
      if (!s) continue
      const h = [s.wi[0] + s.wo[0], s.wi[1] + s.wo[1], s.wi[2] + s.wo[2]] as Vec3
      const len = Math.hypot(h[0], h[1], h[2])
      expect(len).toBeGreaterThan(0)
      const wh: Vec3 = [h[0] / len, h[1] / len, h[2] / len]
      const dWi = s.wi[0] * wh[0] + s.wi[1] * wh[1] + s.wi[2] * wh[2]
      const dWo = s.wo[0] * wh[0] + s.wo[1] * wh[1] + s.wo[2] * wh[2]
      // wo = 2·(wh·wi)·wh − wi ⇒ dot(wh, wo) === dot(wh, wi)
      expect(dWi).toBeCloseTo(dWo, 5)
      checked++
    }
    expect(checked).toBeGreaterThan(10)
  })
})

describe('backprop gradient check', () => {
  it('analytic gradient matches central finite differences', () => {
    const rng = mulberry32(5)
    const w = xavierInit(rng)
    const input: DecoderInput = [
      0.2, 0.1, 0.4, 0.3, 0.5, 0.05, 0.7, 0.15,
      0.3, 0.1, 0.8, 0.2, -0.1, 0.7,
    ]
    const target: Vec3 = [1.2, 0.8, 0.3]
    const cache = forward(w, input)
    const grad = new Float32Array(MLP_PARAM_COUNT)
    backwardLogL1(w, cache, target, grad)

    const lossAt = (weights: MlpWeights): number => {
      const y = forward(weights, input).y
      let loss = 0
      for (let i = 0; i < 3; i++) {
        loss += Math.abs(Math.log1p(y[i]) - Math.log1p(Math.max(0, target[i])))
      }
      return loss / 3
    }

    // Probe both weight matrices and all three bias vectors, plus the middle
    // of W0/W1 rows — a transposition or sign bug shows up as O(1) relative
    // error. Tolerance slack (2e-3) absorbs central-difference crossings of
    // the leaky-ReLU / abs kinks; a real bug is 100x bigger than that.
    const probes = [0, 13, 447, 448, 479, 480, 1503, 1504, 1535, 1536, 1631, 1632, 1634]
    const eps = 1e-4
    for (const i of probes) {
      const orig = w.data[i]
      w.data[i] = orig + eps
      const lp = lossAt(w)
      w.data[i] = orig - eps
      const lm = lossAt(w)
      w.data[i] = orig
      const numeric = (lp - lm) / (2 * eps)
      const scale = Math.max(1, Math.abs(numeric), Math.abs(grad[i]))
      expect(Math.abs(grad[i] - numeric) / scale).toBeLessThan(2e-3)
    }
  })
})

describe('train pipeline', () => {
  it('a short bake drops val L1 well below Xavier init', () => {
    const xavier = xavierInit(mulberry32(42))
    const baseline = validateLogL1(xavier, mulberry32(7), 256)
    const { finalVal } = trainDecoder({ steps: 150, batch: 64, seed: 42 })
    expect(baseline).toBeGreaterThan(0.3) // random weights are far from the teacher
    expect(finalVal).toBeLessThan(baseline * 0.5)
  })

  it('bake is bit-reproducible for a fixed seed', () => {
    const a = trainDecoder({ steps: 30, batch: 32, seed: 123 })
    const b = trainDecoder({ steps: 30, batch: 32, seed: 123 })
    expect(a.finalVal).toBe(b.finalVal)
    expect(Array.from(a.weights.data)).toEqual(Array.from(b.weights.data))
  })
})

describe('material zones', () => {
  it('vein/clay masks stay in [0,1] and encoder stays in [0,1.2] everywhere', () => {
    for (let i = 0; i < 500; i++) {
      const u = (i * 0.6180339887) % 1
      const v = (i * 0.3819660113) % 1
      const vein = veinMask(u, v)
      const clay = clayMask(u, v)
      expect(vein).toBeGreaterThanOrEqual(0)
      expect(vein).toBeLessThanOrEqual(1)
      expect(clay).toBeGreaterThanOrEqual(0)
      expect(clay).toBeLessThanOrEqual(1)
      const s = materialAt([u, v])
      expect(s.metallic).toBeGreaterThanOrEqual(0)
      expect(s.metallic).toBeLessThanOrEqual(0.96)
      expect(s.roughness).toBeGreaterThanOrEqual(0.015)
      expect(s.roughness).toBeLessThanOrEqual(0.72)
      for (const c of encodeLatent(s)) {
        expect(c).toBeGreaterThanOrEqual(0)
        expect(c).toBeLessThan(1.3)
      }
    }
  })

  it('scans enough UV to hit both the gold vein and the clay island', () => {
    const rng = mulberry32(99)
    let maxMetal = 0
    let maxRough = 0
    for (let i = 0; i < 4000; i++) {
      const s = materialAt([rng(), rng()])
      maxMetal = Math.max(maxMetal, s.metallic)
      maxRough = Math.max(maxRough, s.roughness)
    }
    expect(maxMetal).toBeGreaterThan(0.85) // gold vein reaches 0.96
    expect(maxRough).toBeGreaterThan(0.5) // clay island reaches 0.72
  })
})
