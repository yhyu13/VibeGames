// core/simulation/GameSim.ts — reducer, dt 1/60. Pure.
import { FIXED_DT, LOCK_SHOT_HOLD, MISSION_TIME, SHOT_TIME } from '../constants'
import { spawnEntities } from '../data/courtyard'
import type { EndReason, GameState, SimEvent, TickInput } from '../types'
import { abortTriggered, stepRadio } from './radio'
import { stepHeat } from './sensor'
import { stepLock } from './tracking'
import { stepWorld } from './world'

export { FIXED_DT }

export function createInitialState(): GameState {
  return {
    phase: 'boot',
    elapsed: 0,
    zoom01: 0,
    entities: spawnEntities(),
    sensor: { sarOn: false, heat: 0, overheatTimer: 0 },
    lock: { held: false, targetId: null, canopyTimer: 0, sarOffTimer: 0, heldFor: 0 },
    radio: {
      liveBeat: null,
      results: [null, null, null, null, null, null, null],
      fails: 0,
      lastTx: null,
      log: [],
    },
    end: null,
    shot: false,
    frame: 0,
  }
}

function endMission(s: GameState, reason: EndReason, events: SimEvent[]): void {
  if (s.phase === 'ended') return
  s.phase = 'ended'
  s.end = reason
  events.push({ type: 'end', reason })
  events.push({ type: 'sound', sound: reason === 'win' ? 'win' : 'lose' })
}

function passCount(s: GameState): number {
  return s.radio.results.filter((r) => r === 'pass').length
}

export function step(s: GameState, input: TickInput, dt: number): SimEvent[] {
  const events: SimEvent[] = []
  if (s.phase !== 'playing') return events

  s.elapsed += dt
  s.frame += 1
  s.zoom01 = input.zoom01

  stepWorld(s)
  stepHeat(s, input.sarHeld, dt, events)
  stepLock(s, input, dt, events)
  stepRadio(s, input.clickId, events)

  if (abortTriggered(s)) {
    endMission(s, 'abort', events)
    return events
  }

  if (!s.shot && s.elapsed >= SHOT_TIME) {
    const beat7 = s.radio.results[6]
    const lockOk = s.lock.held && s.lock.heldFor >= LOCK_SHOT_HOLD
    if (beat7 === 'pass' && lockOk) {
      s.shot = true
      s.entities.vip.down = true
      events.push({ type: 'shot' })
      events.push({ type: 'sound', sound: 'shot' })
      endMission(s, 'win', events)
      return events
    }
    s.shot = true
    endMission(s, beat7 === 'pass' ? 'lockdrop' : 'miss', events)
    return events
  }

  if (s.elapsed >= MISSION_TIME) {
    endMission(s, 'timeout', events)
  }

  return events
}

export function restart(s: GameState): void {
  Object.assign(s, createInitialState())
  s.phase = 'playing'
}

export function beginPlay(s: GameState): void {
  if (s.phase === 'boot' || s.phase === 'paused') s.phase = 'playing'
}

export function score(s: GameState): number {
  return passCount(s)
}

export function describeState(s: GameState): string {
  const vip = s.entities.vip.pos
  return [
    `t=${s.elapsed.toFixed(2)} phase=${s.phase} zoom=${s.zoom01.toFixed(2)}`,
    `sar=${s.sensor.sarOn ? 'on' : 'off'} heat=${(s.sensor.heat * 100).toFixed(0)}% overheat=${s.sensor.overheatTimer.toFixed(2)}`,
    `lock=${s.lock.held ? 'held' : 'off'} heldFor=${s.lock.heldFor.toFixed(2)} canopy=${s.lock.canopyTimer.toFixed(2)}`,
    `beat=${s.radio.liveBeat ?? '-'} fails=${s.radio.fails} score=${passCount(s)}/7 lastTx=${s.radio.lastTx ?? '-'}`,
    `vip=(${vip.x.toFixed(2)},${vip.z.toFixed(2)}) down=${s.entities.vip.down} shot=${s.shot} end=${s.end ?? '-'}`,
  ].join('\n')
}
