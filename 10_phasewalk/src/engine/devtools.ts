// engine/devtools.ts — DEV-only hooks for browser playtest (window.__sim / __phase / __teleport / __shards / __perf).
import type { PhaseId } from '../core/types'
import { forcePhase } from '../core/simulation/GameSim'
import { getSim } from '../store'

// Record a frame's work time (ms) into the DEV __perf ring buffer (60fps gate, TDD §5.6 性能).
// No-op in prod — App.tsx calls this unconditionally from the render loop.
export function recordFrameTime(ms: number): void {
  if (!import.meta.env.DEV) return
  const w = window as unknown as Record<string, unknown>
  const p = w.__perf as { record: (ms: number) => void } | undefined
  p?.record(ms)
}

export function installDevtools(): void {
  if (!import.meta.env.DEV) return
  const w = window as unknown as Record<string, unknown>
  // __perf: rolling frame-time stats (last/avg/max/fps over the last 300 frames) for the
  // 60fps verification gate — lastFrameTime < 16ms @ 1080p (TDD §5.6).
  const times: number[] = []
  w.__perf = {
    record(ms: number): void {
      times.push(ms)
      if (times.length > 300) times.shift()
    },
    get last(): number { return times.length ? times[times.length - 1] : 0 },
    get avg(): number { return times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0 },
    get max(): number { return times.length ? Math.max(...times) : 0 },
    get fps(): number { const a = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0; return a > 0 ? 1000 / a : 0 },
  }
  w.__sim = () => getSim()
  w.__phase = (p: PhaseId) => {
    const s = getSim()
    if (s) forcePhase(s, p)
  }
  w.__teleport = (x: number, y: number, z: number) => {
    const s = getSim()
    if (s) {
      s.player.position = { x, y, z }
      s.player.velocity = { x: 0, y: 0, z: 0 }
    }
  }
  w.__shards = (n: number) => {
    const s = getSim()
    if (!s) return
    for (let i = 0; i < s.shards.length; i++) s.shards[i].collected = i < n
  }
  w.__beginPlay = () => {
    const s = getSim()
    if (s && s.phase === 'layer_intro') s.phase = 'playing'
  }
}
