import { describe, expect, it } from 'vitest'
import type { Vec3 } from './vec3'
import { averageCosine, frameRaySet, randomUnitQuaternion, rotateByQuaternion, sphericalFibonacci } from './fibonacci'

const SQRT3_2 = Math.sqrt(3) / 2

describe('sphericalFibonacci', () => {
  it('N=1 ray 0 is +X on the equator', () => {
    expect(sphericalFibonacci(0, 1)).toEqual([1, 0, 0])
  })

  it('golden vectors for N=2', () => {
    expect(sphericalFibonacci(0, 2)[0]).toBeCloseTo(SQRT3_2, 9)
    expect(sphericalFibonacci(0, 2)[1]).toBe(0)
    expect(sphericalFibonacci(0, 2)[2]).toBeCloseTo(0.5, 9)
    expect(sphericalFibonacci(1, 2)[2]).toBeCloseTo(-0.5, 9)
  })

  it('all rays are unit length', () => {
    for (const n of [8, 32, 256]) {
      for (let i = 0; i < n; i++) {
        const r = sphericalFibonacci(i, n)
        expect(Math.hypot(r[0], r[1], r[2])).toBeCloseTo(1, 12)
      }
    }
  })

  it('splits the sphere exactly evenly for even N', () => {
    let pos = 0
    let neg = 0
    for (let i = 0; i < 8; i++) {
      if (sphericalFibonacci(i, 8)[2] > 0) pos++
      else neg++
    }
    expect(pos).toBe(4)
    expect(neg).toBe(4)
  })

  it('is approximately uniform: E[max(0,cosθ)] ≈ 1/4 for N=256', () => {
    const mean = averageCosine([0, 0, 1], Array.from({ length: 256 }, (_, i) => sphericalFibonacci(i, 256)))
    expect(mean).toBeGreaterThan(0.23)
    expect(mean).toBeLessThan(0.27)
  })
})

describe('randomUnitQuaternion (Arvo)', () => {
  let seed = 12345
  const rng = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }

  it('produces unit quaternions', () => {
    for (let i = 0; i < 100; i++) {
      const q = randomUnitQuaternion(rng)
      expect(Math.hypot(q[0], q[1], q[2], q[3])).toBeCloseTo(1, 9)
    }
  })
})

describe('rotateByQuaternion', () => {
  it('identity quaternion is a no-op', () => {
    const d: Vec3 = [0.3, -0.4, 0.86]
    expect(rotateByQuaternion(d, [0, 0, 0, 1])).toEqual(d)
  })

  it('rotating +X by 90° about Z yields +Y', () => {
    // q = [0, 0, sin(45°), cos(45°)] rotates +X → +Y
    const s = Math.SQRT1_2
    const out = rotateByQuaternion([1, 0, 0], [0, 0, s, s])
    expect(out[0]).toBeCloseTo(0, 9)
    expect(out[1]).toBeCloseTo(1, 9)
    expect(out[2]).toBeCloseTo(0, 9)
  })

  it('preserves unit length under a random rotation', () => {
    let seed = 777
    const rng = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed / 0x7fffffff
    }
    for (let i = 0; i < 100; i++) {
      const q = randomUnitQuaternion(rng)
      const out = rotateByQuaternion(sphericalFibonacci(i % 256, 256), q)
      expect(Math.hypot(out[0], out[1], out[2])).toBeCloseTo(1, 9)
    }
  })
})

describe('frameRaySet', () => {
  it('returns the rotated full set and an unrotated fixed subset', () => {
    let seed = 42
    const rng = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed / 0x7fffffff
    }
    const { rotated, fixed } = frameRaySet(64, 32, rng)
    expect(rotated).toHaveLength(64)
    expect(fixed).toHaveLength(32)
    expect(fixed[0]).toEqual(sphericalFibonacci(0, 32))
  })
})
