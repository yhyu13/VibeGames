import { describe, expect, it } from 'vitest'
import type { DdgiVolumeConfig } from './constants'
import type { Vec3 } from './vec3'
import {
  biasedQueryPosition,
  gridCoordsOf,
  probeGridShift,
  probeMaxRayDistance,
  probeWorldPosition,
  trilinearWeights,
  wrapShadingWeight,
} from './probeGrid'

const cfg: DdgiVolumeConfig = { origin: [0, 0, 0], probeSpacing: [2, 3, 4], probeCounts: [4, 3, 2] }

describe('probeGridShift / probeWorldPosition', () => {
  it('shift centers the grid on origin: (spacing·(counts−1))·0.5', () => {
    expect(probeGridShift([2, 3, 4], [4, 3, 2])).toEqual([3, 3, 2])
  })

  it('golden: corner probe positions', () => {
    expect(probeWorldPosition(cfg, [0, 0, 0])).toEqual([-3, -3, -2])
    expect(probeWorldPosition(cfg, [3, 2, 1])).toEqual([3, 3, 2])
  })

  it('gridCoordsOf inverts probeWorldPosition', () => {
    const cases: Vec3[] = [
      [0, 0, 0],
      [3, 2, 1],
      [1, 1, 0],
    ]
    for (const coords of cases) {
      const world = probeWorldPosition(cfg, coords)
      const back = gridCoordsOf(cfg, world)
      expect(back[0]).toBeCloseTo(coords[0], 9)
      expect(back[1]).toBeCloseTo(coords[1], 9)
      expect(back[2]).toBeCloseTo(coords[2], 9)
    }
  })
})

describe('trilinearWeights', () => {
  it('query exactly at a probe: weight 1 on it, 0 elsewhere, sum 1', () => {
    const x = probeWorldPosition(cfg, [1, 1, 0])
    const t = trilinearWeights(cfg, x)
    const sums = t.weights.reduce((a, b) => a + b, 0)
    expect(sums).toBeCloseTo(1, 9)
    const hit = t.probeCoords.findIndex((c) => c[0] === 1 && c[1] === 1 && c[2] === 0)
    expect(t.weights[hit]).toBeCloseTo(1, 9)
    for (let i = 0; i < t.weights.length; i++) {
      if (i !== hit) expect(t.weights[i]).toBe(0)
    }
  })

  it('query at a cell center: all 8 weights = 1/8', () => {
    const base = probeWorldPosition(cfg, [1, 1, 0])
    const x: Vec3 = [
      base[0] + cfg.probeSpacing[0] * 0.5,
      base[1] + cfg.probeSpacing[1] * 0.5,
      base[2] + cfg.probeSpacing[2] * 0.5,
    ]
    const t = trilinearWeights(cfg, x)
    for (const w of t.weights) expect(w).toBeCloseTo(1 / 8, 9)
  })
})

describe('wrapShadingWeight', () => {
  it('golden: aligned → w²+0.2 = 1.2; anti-aligned → 0.2; perpendicular → 0.45', () => {
    expect(wrapShadingWeight([0, 0, 0], [0, 1, 0], [0, 1, 0])).toBeCloseTo(1.2, 9)
    expect(wrapShadingWeight([0, 0, 0], [0, 1, 0], [0, -1, 0])).toBeCloseTo(0.2, 9)
    expect(wrapShadingWeight([0, 0, 0], [0, 1, 0], [1, 0, 0])).toBeCloseTo(0.45, 9)
  })
})

describe('biasedQueryPosition', () => {
  it('golden: x + normal·bias − cameraDir·bias', () => {
    const out = biasedQueryPosition([0, 0, 0], [0, 1, 0], [0, 0, 1], 0.1, 0.1)
    expect(out[0]).toBe(0)
    expect(out[1]).toBeCloseTo(0.1, 12)
    expect(out[2]).toBeCloseTo(-0.1, 12)
  })
})

describe('probeMaxRayDistance', () => {
  it('golden: ‖spacing‖·1.5 for (2,3,4) = 1.5·√29 ≈ 8.0777', () => {
    expect(probeMaxRayDistance(cfg)).toBeCloseTo(1.5 * Math.sqrt(29), 9)
  })
})
