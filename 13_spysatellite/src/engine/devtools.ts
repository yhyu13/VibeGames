// engine/devtools.ts — DEV hooks: window.__sim / __sar / __lock / __beat / __end
import { getSim } from '../store'
import { describeState } from '../core/simulation/GameSim'
import { RADIO_BEATS } from '../core/data/courtyard'
import type { EntityId } from '../core/types'

const times: number[] = []

export function recordFrameTime(ms: number): void {
  if (!import.meta.env.DEV) return
  times.push(ms)
  if (times.length > 300) times.shift()
}

export function installDevtools(): void {
  if (!import.meta.env.DEV) return
  const w = window as unknown as Record<string, unknown>
  w.__perf = {
    get last(): number { return times.length ? times[times.length - 1] : 0 },
    get avg(): number { return times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0 },
    get fps(): number {
      const a = times.length ? times.reduce((x, y) => x + y, 0) / times.length : 0
      return a > 0 ? 1000 / a : 0
    },
  }
  w.__sim = () => getSim()
  w.__manifest = () => {
    const s = getSim()
    return s ? describeState(s) : ''
  }
  w.__sar = (on: boolean) => {
    const hold = (w as { __holdSar?: (v: boolean) => void }).__holdSar
    if (hold) hold(on)
    const s = getSim()
    if (!s) return
    if (on && s.sensor.overheatTimer > 0) s.sensor.overheatTimer = 0
    s.sensor.sarOn = on
  }
  w.__lock = () => {
    const s = getSim()
    if (!s) return
    const hold = (w as { __holdSar?: (v: boolean) => void }).__holdSar
    const zoom = (w as { __zoomTo?: (v: number) => void }).__zoomTo
    hold?.(true)
    zoom?.(1)
    s.sensor.sarOn = true
    s.sensor.overheatTimer = 0
    s.zoom01 = 1
    s.lock.held = true
    s.lock.targetId = 'vip'
    s.lock.heldFor = 2
    s.lock.canopyTimer = 0
    s.lock.sarOffTimer = 0
  }
  w.__beat = (n: number) => {
    const s = getSim()
    if (!s) return
    const beat = RADIO_BEATS[n - 1]
    if (!beat) return
    s.elapsed = beat.t + 0.05
    s.radio.liveBeat = beat.id
  }
  w.__click = (id: EntityId) => {
    const s = getSim()
    if (!s) return
    ;(w as { __pendingClick?: EntityId }).__pendingClick = id
  }
  w.__end = () => getSim()?.end ?? null
  w.__beginPlay = () => {
    const s = getSim()
    if (s && s.phase === 'boot') s.phase = 'playing'
  }
}
