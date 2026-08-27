// core/simulation/radio.ts — beat clock, click→tag, fail-2-abort. Pure.
import { FAILS_TO_ABORT } from '../constants'
import { RADIO_BEATS } from '../data/courtyard'
import type { EntityId, GameState, RadioBeat, SimEvent } from '../types'

function liveBeat(s: GameState): RadioBeat | null {
  if (s.radio.liveBeat === null) return null
  return RADIO_BEATS[s.radio.liveBeat - 1] ?? null
}

function failBeat(s: GameState, beat: RadioBeat, events: SimEvent[], tag?: string): void {
  if (s.radio.results[beat.id - 1] !== null) return
  s.radio.results[beat.id - 1] = 'fail'
  s.radio.fails += 1
  s.radio.liveBeat = null
  const tx = tag ?? (beat.id === 4 ? 'LATE' : 'NOJOY')
  s.radio.lastTx = tx
  s.radio.log.push({ t: s.elapsed, tag: tx, ok: false, beat: beat.id })
  events.push({ type: 'beatFail', beat: beat.id })
  events.push({ type: 'sound', sound: 'beatFail' })
}

function passBeat(s: GameState, beat: RadioBeat, events: SimEvent[]): void {
  if (s.radio.results[beat.id - 1] !== null) return
  s.radio.results[beat.id - 1] = 'pass'
  s.radio.liveBeat = null
  s.radio.lastTx = beat.txTag
  s.radio.log.push({ t: s.elapsed, tag: beat.txTag, ok: true, beat: beat.id })
  events.push({ type: 'beatPass', beat: beat.id, tag: beat.txTag })
  events.push({ type: 'sound', sound: 'tx' })
}

export function stepRadio(s: GameState, clickId: EntityId | null, events: SimEvent[]): void {
  if (s.phase !== 'playing') return

  for (const beat of RADIO_BEATS) {
    if (s.radio.results[beat.id - 1] !== null) continue
    if (s.radio.liveBeat === null && s.elapsed >= beat.t && s.elapsed < beat.t + beat.window) {
      s.radio.liveBeat = beat.id
      events.push({ type: 'beatStart', beat: beat.id })
      events.push({ type: 'sound', sound: 'beatAsk' })
    }
  }

  const beat = liveBeat(s)
  if (!beat) return

  if (s.elapsed >= beat.t + beat.window) {
    failBeat(s, beat, events)
    return
  }

  if (s.sensor.overheatTimer > 0 && s.radio.results[beat.id - 1] === null) {
    failBeat(s, beat, events, 'BLIND')
    return
  }

  if (!clickId) return

  if (beat.accept.includes(clickId)) {
    // Beat 7 needs a lock that was already tracking, not a same-frame click-to-lock.
    if (beat.id === 7 && (!s.lock.held || s.lock.heldFor < 0.25)) {
      failBeat(s, beat, events, 'NO LOCK')
      return
    }
    passBeat(s, beat, events)
    return
  }

  failBeat(s, beat, events)
}

export function abortTriggered(s: GameState): boolean {
  return s.radio.fails >= FAILS_TO_ABORT
}
