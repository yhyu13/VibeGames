// core/simulation/tracking.ts — lock acquire/drop + canopy occlusion. Pure.
import { COURTYARD_ZOOM, LOCK_CANOPY_DROP, LOCK_SAR_OFF_DROP } from '../constants'
import { CANOPY_BOX, pointInAabb } from '../data/courtyard'
import type { EntityId, GameState, SimEvent, TickInput } from '../types'

export function onCourtyard(zoom01: number): boolean {
  return zoom01 >= COURTYARD_ZOOM
}

export function tryLock(s: GameState, clickId: EntityId | null, events: SimEvent[]): void {
  if (!clickId) return
  if (clickId !== 'vip') return
  if (!s.sensor.sarOn) return
  if (!onCourtyard(s.zoom01)) return
  if (s.entities.vip.down) return
  if (s.lock.held) return
  s.lock.held = true
  s.lock.targetId = 'vip'
  s.lock.canopyTimer = 0
  s.lock.sarOffTimer = 0
  s.lock.heldFor = 0
  events.push({ type: 'lockAcquire' })
  events.push({ type: 'sound', sound: 'lock' })
}

function dropLock(s: GameState, reason: 'canopy' | 'sar_off' | 'overheat' | 'zoom', events: SimEvent[]): void {
  if (!s.lock.held) return
  s.lock.held = false
  s.lock.targetId = null
  s.lock.canopyTimer = 0
  s.lock.sarOffTimer = 0
  s.lock.heldFor = 0
  events.push({ type: 'lockDrop', reason })
  events.push({ type: 'sound', sound: 'lockDrop' })
}

export function stepLock(s: GameState, input: TickInput, dt: number, events: SimEvent[]): void {
  s.zoom01 = input.zoom01
  tryLock(s, input.clickId, events)

  if (!s.lock.held) return

  s.lock.heldFor += dt

  if (!onCourtyard(s.zoom01)) {
    dropLock(s, 'zoom', events)
    return
  }
  if (s.sensor.overheatTimer > 0) {
    dropLock(s, 'overheat', events)
    return
  }
  if (!s.sensor.sarOn) {
    s.lock.sarOffTimer += dt
    if (s.lock.sarOffTimer >= LOCK_SAR_OFF_DROP) {
      dropLock(s, 'sar_off', events)
      return
    }
  } else {
    s.lock.sarOffTimer = 0
  }

  const under = pointInAabb(s.entities.vip.pos, CANOPY_BOX)
  if (under) {
    s.lock.canopyTimer += dt
    if (s.lock.canopyTimer >= LOCK_CANOPY_DROP) {
      dropLock(s, 'canopy', events)
    }
  } else {
    s.lock.canopyTimer = 0
  }
}
