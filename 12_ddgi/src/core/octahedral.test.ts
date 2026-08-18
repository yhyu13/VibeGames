import { describe, expect, it } from 'vitest'
import { octDecode, octEncode, octNormalizedCoords, signNotZero } from './octahedral'

const SQRT2_2 = Math.SQRT1_2

describe('octEncode', () => {
  it('maps the six canonical axis directions', () => {
    expect(octEncode([1, 0, 0])).toEqual([1, 0])
    expect(octEncode([0, 1, 0])).toEqual([0, 1])
    expect(octEncode([0, 0, 1])).toEqual([0, 0])
  })

  it('folds the south pole to a corner', () => {
    expect(octEncode([0, 0, -1])).toEqual([1, 1])
  })

  it('is linear on the equator plane', () => {
    expect(octEncode([0.5, 0.5, 0])).toEqual([0.5, 0.5])
  })
})

describe('octDecode', () => {
  it('reconstructs canonical directions', () => {
    expect(octDecode([1, 0])).toEqual([1, 0, 0])
    expect(octDecode([0, 1])).toEqual([0, 1, 0])
    expect(octDecode([0, 0])).toEqual([0, 0, 1])
  })

  it('recovers the south pole from a corner', () => {
    expect(octDecode([1, 1])).toEqual([0, 0, -1])
  })

  it('golden vector: (0.5, 0.5) → normalized (√2/2, √2/2, 0)', () => {
    const out = octDecode([0.5, 0.5])
    expect(out[0]).toBeCloseTo(SQRT2_2, 9)
    expect(out[1]).toBeCloseTo(SQRT2_2, 9)
    expect(out[2]).toBe(0)
  })
})

describe('oct roundtrip', () => {
  it('decode(encode(d)) ≈ normalize(d) for known directions', () => {
    const dirs = [
      [1, 2, 3],
      [-1, 0.5, -0.25],
      [0, -1, 0],
      [0.1, 0.1, -1],
      [0, 0, -1],
    ]
    for (const d of dirs) {
      const [x, y, z] = d
      const len = Math.hypot(x, y, z)
      const decoded = octDecode(octEncode([x, y, z]))
      expect(decoded[0]).toBeCloseTo(x / len, 9)
      expect(decoded[1]).toBeCloseTo(y / len, 9)
      expect(decoded[2]).toBeCloseTo(z / len, 9)
    }
  })
})

describe('signNotZero', () => {
  it('treats zero as positive (GLSL signNotZero)', () => {
    expect(signNotZero(0)).toBe(1)
    expect(signNotZero(3)).toBe(1)
    expect(signNotZero(-2)).toBe(-1)
  })
})

describe('octNormalizedCoords', () => {
  it('maps interior texel centers to [-1,1]²', () => {
    const interior = 6
    const lo = octNormalizedCoords([0, 0], interior)
    const hi = octNormalizedCoords([5, 5], interior)
    expect(lo[0]).toBeCloseTo(-5 / 6, 9)
    expect(lo[1]).toBeCloseTo(-5 / 6, 9)
    expect(hi[0]).toBeCloseTo(5 / 6, 9)
    expect(hi[1]).toBeCloseTo(5 / 6, 9)
  })
})
