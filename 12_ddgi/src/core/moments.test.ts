import { describe, expect, it } from 'vitest'
import { accumulateDistanceMoments, normalizeIrradiance } from './moments'

describe('normalizeIrradiance', () => {
  it('golden: (2,4,6) ÷ (2·2) = (0.5, 1, 1.5)', () => {
    expect(normalizeIrradiance([2, 4, 6], 2)).toEqual([0.5, 1, 1.5])
  })

  it('zero weight sum falls back to the epsilon divisor (never NaN)', () => {
    const out = normalizeIrradiance([1, 1, 1], 0)
    expect(Number.isFinite(out[0])).toBe(true)
    expect(out[0]).toBeGreaterThan(0)
  })
})

describe('accumulateDistanceMoments', () => {
  it('golden: d={1,3}, w={1,1}, exponent=50 → mean 1, meanSq 2.5', () => {
    const m = accumulateDistanceMoments([
      { distance: 1, weight: 1 },
      { distance: 3, weight: 1 },
    ])
    expect(m.mean).toBeCloseTo(1, 9)
    expect(m.meanSq).toBeCloseTo(2.5, 9)
  })

  it('backface negative distances are abs()ed (sign is a marker)', () => {
    const m = accumulateDistanceMoments([
      { distance: -0.5, weight: 1 },
      { distance: 1.5, weight: 1 },
    ])
    expect(m.mean).toBeCloseTo(0.5, 9)
    expect(m.meanSq).toBeCloseTo(0.625, 9)
  })

  it('maxRayDistance clamps far hits', () => {
    const m = accumulateDistanceMoments(
      [
        { distance: 1, weight: 1 },
        { distance: 100, weight: 1 },
      ],
      { maxRayDistance: 2 },
    )
    expect(m.mean).toBeCloseTo(0.75, 9)
    expect(m.meanSq).toBeCloseTo(1.25, 9)
  })

  it('the exponent (50) makes a 0.9-cosine ray dominate a 0.1-cosine ray', () => {
    const m = accumulateDistanceMoments([
      { distance: 1, weight: 0.9 },
      { distance: 3, weight: 0.1 },
    ])
    // 0.9^50 ≈ 0.005154; 0.1^50 ≈ 1e-50 (negligible)
    expect(m.mean).toBeCloseTo(0.5, 9)
    expect(m.meanSq).toBeCloseTo(0.5, 9)
  })
})
