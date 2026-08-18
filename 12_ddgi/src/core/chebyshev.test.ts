import { describe, expect, it } from 'vitest'
import { chebyshevBound, chebyshevWeight } from './chebyshev'

describe('chebyshevBound', () => {
  it('is 1 when the probe is not farther than the mean', () => {
    expect(chebyshevBound(1, 2, 1)).toBe(1)
    expect(chebyshevBound(1, 2, 0.5)).toBe(1)
  })

  it('golden: σ²=1, v=1 → 1/(1+1) = 0.5', () => {
    expect(chebyshevBound(1, 2, 2)).toBeCloseTo(0.5, 9)
  })

  it('golden: σ²=1, v=0.2 → 1/1.04 ≈ 0.96154', () => {
    expect(chebyshevBound(1, 2, 1.2)).toBeCloseTo(1 / 1.04, 9)
  })
})

describe('chebyshevWeight', () => {
  it('golden: cube + crush + floor — (1,2)@2 → 0.05', () => {
    // bound 0.5 → 0.125 (< 0.2) → crush 0.125³/0.04 = 0.04883 → floor 0.05
    expect(chebyshevWeight(1, 2, 2)).toBeCloseTo(0.05, 9)
  })

  it('golden: mid-weight stays above the crush threshold — (1,2)@1.2 → 0.88899636', () => {
    // bound 1/1.04 = 0.96153846 → cube (25/26)³ = 15625/17576 = 0.88899636 (≥ 0.2, no crush)
    expect(chebyshevWeight(1, 2, 1.2)).toBeCloseTo(0.88899636, 8)
  })

  it('zero variance with dist > mean → falls to the floor', () => {
    expect(chebyshevWeight(1, 1, 2)).toBe(0.05)
  })

  it('dist ≤ mean → weight 1', () => {
    expect(chebyshevWeight(1, 2, 0.5)).toBe(1)
  })

  it('never returns below the floor', () => {
    for (let d = 1.01; d < 10; d += 0.37) {
      expect(chebyshevWeight(1, 2, d)).toBeGreaterThanOrEqual(0.05)
    }
  })
})
