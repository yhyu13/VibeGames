// core/simulation/GameSim.test.ts — golden vectors at the step() seam (TDD §4/§5).
import { describe, expect, it } from 'vitest'
import {
  COURTYARD_ZOOM,
  FAILS_TO_ABORT,
  FIXED_DT,
  LOCK_CANOPY_DROP,
  LOCK_SAR_OFF_DROP,
  LOCK_SHOT_HOLD,
  SAR_HEAT_COOL,
  SAR_HEAT_RISE,
  SAR_OVERHEAT_DROP,
  SHOT_TIME,
} from '../constants'
import { CANOPY_BOX, lerpPath, pointInAabb, VIP_PATH } from '../data/courtyard'
import type { EntityId, GameState, SimEvent, TickInput } from '../types'
import { beginPlay, createInitialState, score, step } from './GameSim'

function play(): GameState {
  const s = createInitialState()
  beginPlay(s)
  return s
}

function tick(s: GameState, n: number, input: Partial<TickInput> = {}): SimEvent[] {
  const base: TickInput = { zoom01: 1, sarHeld: false, clickId: null, ...input }
  const events: SimEvent[] = []
  for (let i = 0; i < n; i++) {
    const clickId = i === 0 ? base.clickId : null
    events.push(...step(s, { ...base, clickId }, FIXED_DT))
  }
  return events
}

function frames(seconds: number): number {
  return Math.ceil(seconds / FIXED_DT)
}

function holdSarAndLock(s: GameState): void {
  tick(s, 3, { zoom01: 1, sarHeld: true, clickId: 'vip' })
}

describe('sensor heat', () => {
  it('rises +18%/s while held', () => {
    const s = play()
    tick(s, frames(1), { zoom01: 1, sarHeld: true })
    expect(s.sensor.heat).toBeCloseTo(SAR_HEAT_RISE, 4)
    expect(s.sensor.sarOn).toBe(true)
  })

  it('cools −12%/s while released', () => {
    const s = play()
    tick(s, frames(1), { zoom01: 1, sarHeld: true })
    tick(s, frames(1), { zoom01: 1, sarHeld: false })
    expect(s.sensor.heat).toBeCloseTo(SAR_HEAT_RISE - SAR_HEAT_COOL, 4)
    expect(s.sensor.sarOn).toBe(false)
  })

  it('overheat at 100% forces 2.5s drop and lock lost', () => {
    const s = play()
    holdSarAndLock(s)
    expect(s.lock.held).toBe(true)
    tick(s, frames(1 / SAR_HEAT_RISE + 0.05), { zoom01: 1, sarHeld: true })
    expect(s.sensor.heat).toBe(0)
    expect(s.sensor.overheatTimer).toBeGreaterThan(0)
    expect(s.sensor.overheatTimer).toBeLessThanOrEqual(SAR_OVERHEAT_DROP)
    expect(s.sensor.sarOn).toBe(false)
    expect(s.lock.held).toBe(false)
  })

  it('after overheat drop, holding SAR does not instantly overheat again', () => {
    const s = play()
    tick(s, frames(1 / SAR_HEAT_RISE + 0.05), { zoom01: 1, sarHeld: true })
    expect(s.sensor.overheatTimer).toBeGreaterThan(0)
    tick(s, frames(SAR_OVERHEAT_DROP) + 2, { zoom01: 1, sarHeld: true })
    expect(s.sensor.overheatTimer).toBe(0)
    expect(s.sensor.sarOn).toBe(true)
    expect(s.sensor.heat).toBeLessThan(0.2)
  })

  it('sarOn is owned by stepHeat(sarHeld), not a sticky flag', () => {
    const s = play()
    s.sensor.sarOn = true
    step(s, { zoom01: 1, sarHeld: false, clickId: null }, FIXED_DT)
    expect(s.sensor.sarOn).toBe(false)
  })
})

describe('lock', () => {
  it('optical click does not lock', () => {
    const s = play()
    tick(s, 1, { zoom01: 1, sarHeld: false, clickId: 'vip' })
    expect(s.lock.held).toBe(false)
  })

  it('zoom below courtyard band does not lock', () => {
    const s = play()
    tick(s, 3, { zoom01: COURTYARD_ZOOM - 0.01, sarHeld: true, clickId: 'vip' })
    expect(s.lock.held).toBe(false)
  })

  it('SAR-on courtyard click on VIP acquires lock', () => {
    const s = play()
    holdSarAndLock(s)
    expect(s.lock.held).toBe(true)
    expect(s.lock.targetId).toBe('vip')
  })

  it('drops after SAR off ≥0.6s', () => {
    const s = play()
    holdSarAndLock(s)
    tick(s, frames(LOCK_SAR_OFF_DROP) + 1, { zoom01: 1, sarHeld: false })
    expect(s.lock.held).toBe(false)
  })

  it('drops after canopy ≥0.4s', () => {
    const s = play()
    holdSarAndLock(s)
    const underT = VIP_PATH.find((w) => pointInAabb({ x: w.x, z: w.z }, CANOPY_BOX))
    expect(underT).toBeTruthy()
    s.elapsed = underT!.t
    s.entities.vip.pos = { x: underT!.x, z: underT!.z }
    tick(s, frames(LOCK_CANOPY_DROP) + 1, { zoom01: 1, sarHeld: true })
    expect(s.lock.held).toBe(false)
  })
})

describe('radio', () => {
  it('correct VIP click at beat 1 TX VISUAL', () => {
    const s = play()
    tick(s, frames(22.05), { zoom01: 1, sarHeld: false })
    tick(s, 2, { zoom01: 1, sarHeld: true })
    const ev = tick(s, 1, { zoom01: 1, sarHeld: true, clickId: 'vip' })
    expect(s.radio.results[0]).toBe('pass')
    expect(s.radio.lastTx).toBe('VISUAL')
    expect(ev.some((e) => e.type === 'beatPass' && e.tag === 'VISUAL')).toBe(true)
  })

  it('beat 4: van is wrong, east_alley is CLEAR', () => {
    const s = play()
    s.radio.results = ['pass', 'pass', 'pass', null, null, null, null]
    s.elapsed = 52.05
    tick(s, 1, { zoom01: 1, sarHeld: true, clickId: 'van' })
    expect(s.radio.results[3]).toBe('fail')
    const s2 = play()
    s2.radio.results = ['pass', 'pass', 'pass', null, null, null, null]
    s2.elapsed = 52.05
    tick(s2, 1, { zoom01: 1, sarHeld: true, clickId: 'east_alley' })
    expect(s2.radio.results[3]).toBe('pass')
    expect(s2.radio.lastTx).toBe('CLEAR')
  })

  it(`${FAILS_TO_ABORT} failed beats abort`, () => {
    const s = play()
    tick(s, frames(22.05), { zoom01: 1, sarHeld: false })
    tick(s, 1, { zoom01: 1, sarHeld: true, clickId: 'van' })
    tick(s, frames(10), { zoom01: 1, sarHeld: false })
    tick(s, 1, { zoom01: 1, sarHeld: true, clickId: 'van' })
    expect(s.radio.fails).toBeGreaterThanOrEqual(FAILS_TO_ABORT)
    expect(s.phase).toBe('ended')
    expect(s.end).toBe('abort')
  })

  it('beat 7 same-frame click-to-lock is NO LOCK', () => {
    const s = play()
    s.elapsed = 78.05
    s.radio.liveBeat = 7
    const ev = tick(s, 1, { zoom01: 1, sarHeld: true, clickId: 'vip' })
    expect(s.radio.results[6]).toBe('fail')
    expect(s.radio.lastTx).toBe('NO LOCK')
    expect(ev.some((e) => e.type === 'beatFail')).toBe(true)
  })

  it('overheat during a live beat TX BLIND', () => {
    const s = play()
    tick(s, frames(22.05), { zoom01: 1, sarHeld: false })
    expect(s.radio.liveBeat).toBe(1)
    s.sensor.heat = 0.99
    tick(s, frames(0.2), { zoom01: 1, sarHeld: true })
    expect(s.radio.results[0]).toBe('fail')
    expect(s.radio.lastTx).toBe('BLIND')
  })
})

describe('shot @ 80s', () => {
  function passBeats(s: GameState, clicks: EntityId[]): void {
    const starts = [22, 32, 42, 52, 62, 70, 78]
    for (let i = 0; i < clicks.length; i++) {
      const t = starts[i]
      const wait = Math.max(0, t + 0.05 - s.elapsed)
      tick(s, frames(wait), { zoom01: 1, sarHeld: false })
      if (i === 6) {
        s.lock.held = true
        s.lock.targetId = 'vip'
        s.lock.heldFor = LOCK_SHOT_HOLD
        s.sensor.sarOn = true
      }
      tick(s, 1, { zoom01: 1, sarHeld: true, clickId: clicks[i] })
    }
  }

  it('GO + lock held 2s → win, VIP down', () => {
    const s = play()
    passBeats(s, ['vip', 'guard_w1', 'van', 'east_alley', 'canopy', 'west_alley', 'vip'])
    expect(s.radio.results[6]).toBe('pass')
    tick(s, frames(SHOT_TIME - s.elapsed + 0.05), { zoom01: 1, sarHeld: true })
    expect(s.phase).toBe('ended')
    expect(s.end).toBe('win')
    expect(s.entities.vip.down).toBe(true)
    expect(score(s)).toBe(7)
  })

  it('no GO at 80s → miss, not 90s timeout', () => {
    const s = play()
    s.radio.results = ['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'fail']
    s.radio.fails = 1
    s.elapsed = SHOT_TIME - FIXED_DT
    s.lock.held = true
    s.lock.heldFor = LOCK_SHOT_HOLD
    step(s, { zoom01: 1, sarHeld: true, clickId: null }, FIXED_DT)
    expect(s.end).toBe('miss')
    expect(s.shot).toBe(true)
  })

  it('GO but lock dropped at shot → lockdrop', () => {
    const s = play()
    s.radio.results = ['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass']
    s.elapsed = SHOT_TIME - FIXED_DT
    s.lock.held = false
    step(s, { zoom01: 1, sarHeld: true, clickId: null }, FIXED_DT)
    expect(s.end).toBe('lockdrop')
  })
})

describe('path lerp', () => {
  it('VIP at t=0 is the first waypoint', () => {
    expect(lerpPath(VIP_PATH, 0)).toEqual({ x: VIP_PATH[0].x, z: VIP_PATH[0].z })
  })

  it('VIP at t=26 is under the canopy AABB', () => {
    const p = lerpPath(VIP_PATH, 26)
    expect(pointInAabb(p, CANOPY_BOX)).toBe(true)
  })
})
