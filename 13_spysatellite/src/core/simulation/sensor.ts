// core/simulation/sensor.ts — SAR heat + overheat drop. Pure.
import { SAR_HEAT_COOL, SAR_HEAT_RISE, SAR_OVERHEAT_DROP } from '../constants'
import type { GameState, SimEvent } from '../types'

export function stepHeat(s: GameState, sarHeld: boolean, dt: number, events: SimEvent[]): void {
  const sensor = s.sensor
  if (sensor.overheatTimer > 0) {
    sensor.overheatTimer = Math.max(0, sensor.overheatTimer - dt)
    sensor.sarOn = false
    return
  }

  const wantOn = sarHeld
  if (wantOn) {
    sensor.heat = Math.min(1, sensor.heat + SAR_HEAT_RISE * dt)
    if (sensor.heat >= 1) {
      sensor.heat = 0
      sensor.overheatTimer = SAR_OVERHEAT_DROP
      sensor.sarOn = false
      events.push({ type: 'overheat' })
      events.push({ type: 'sound', sound: 'overheat' })
      return
    }
    if (!sensor.sarOn) {
      sensor.sarOn = true
      events.push({ type: 'sound', sound: 'sarOn' })
    }
  } else {
    if (sensor.sarOn) events.push({ type: 'sound', sound: 'sarOff' })
    sensor.sarOn = false
    sensor.heat = Math.max(0, sensor.heat - SAR_HEAT_COOL * dt)
  }
}
