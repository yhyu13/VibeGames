import { describe, expect, it } from 'vitest'
import type { Vec3 } from './vec3'
import { blendDistance, blendRadiance, decodeGamma, encodeGamma, luminance } from './hysteresis'

describe('luminance / gamma', () => {
  it('luminance of (1,1,1) is 1 (BT.709 weights sum to 1)', () => {
    expect(luminance([1, 1, 1])).toBeCloseTo(1, 12)
  })

  it('golden: encodeGamma(2) = 2^0.2 ≈ 1.148698', () => {
    expect(encodeGamma([1, 2, 3])[1]).toBeCloseTo(1.14869835, 8)
    expect(encodeGamma([1, 2, 3])[2]).toBeCloseTo(1.24573094, 8)
  })

  it('decode∘encode = sqrt (gamma·0.5 decode curve)', () => {
    expect(decodeGamma(encodeGamma([4, 4, 4]))[0]).toBeCloseTo(2, 9)
  })
})

describe('blendRadiance', () => {
  it('first frame: hysteresis=0 but the impulse clamp still applies (RTXGI §7)', () => {
    // result = (1, 1.14870, 1.24573); luminance(delta) = 1.1241 > 0.1 → delta ×= 0.25
    const out = blendRadiance([1, 2, 3], [0, 0, 0])
    expect(out[0]).toBeCloseTo(0.25, 9)
    expect(out[1]).toBeCloseTo(0.28717459, 8)
    expect(out[2]).toBeCloseTo(0.31143273, 8)
  })

  it('steady state: gamma-encode(new) == history → returns history unchanged', () => {
    const history: Vec3 = [0.25, 0.25, 0.25]
    const out = blendRadiance([Math.pow(0.25, 5), Math.pow(0.25, 5), Math.pow(0.25, 5)], history)
    expect(out[0]).toBeCloseTo(0.25, 12)
    expect(out[1]).toBeCloseTo(0.25, 12)
  })

  it('sudden darkening drops hysteresis (h −= 0.75); signed luminance skips the clamp', () => {
    const history: Vec3 = [1.5, 1.5, 1.5]
    // result = 0.5^0.2 = 0.87055056; mean − result = 0.62945 > 0.25 → h = 0.22
    // delta = −0.62945 → luminance(delta) < 0 → no impulse clamp (asymmetric branch)
    const out = blendRadiance([0.5, 0.5, 0.5], history)
    // out = 1.5 + 0.78·(−0.62944944) = 1.00902944
    expect(out[0]).toBeCloseTo(1.00902944, 6)
  })

  it('sudden brightening skips the h-drop but fires the impulse clamp', () => {
    const history: Vec3 = [0.5, 0.5, 0.5]
    // result = 0.8 (encodeGamma of 0.8^5); mean − result = −0.3 → no drop
    // luminance(delta) = 0.3 > 0.1 → delta ×= 0.25 → out = 0.5 + 0.03·0.075
    const out = blendRadiance([Math.pow(0.8, 5), Math.pow(0.8, 5), Math.pow(0.8, 5)], history)
    expect(out[0]).toBeCloseTo(0.50225, 9)
  })

  it('small change keeps hysteresis and skips the impulse clamp', () => {
    const history: Vec3 = [0.5, 0.5, 0.5]
    // result = (0.55, 0.5, 0.5); |0.5 − 0.55| = 0.05 < 0.25 → h = 0.97
    // luminance(delta) = 0.05·0.2126 ≈ 0.0106 < 0.1 → no clamp
    const out = blendRadiance([Math.pow(0.55, 5), Math.pow(0.5, 5), Math.pow(0.5, 5)], history)
    expect(out[0]).toBeCloseTo(0.5 + 0.03 * 0.05, 9)
    expect(out[1]).toBeCloseTo(0.5, 9)
  })
})

describe('blendDistance', () => {
  it('is a plain lerp by hysteresis', () => {
    expect(blendDistance(1, 0)).toBeCloseTo(0.03, 9)
    expect(blendDistance(1, 0.5, 0.9)).toBeCloseTo(0.55, 9)
  })
})
