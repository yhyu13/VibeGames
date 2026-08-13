// engine/devtools.ts — DEV-only hooks for browser playtest (window.__sim / __phase / __teleport / __shards).
import type { PhaseId } from '../core/types'
import { forcePhase } from '../core/simulation/GameSim'
import { getSim } from '../store'

export function installDevtools(): void {
  if (!import.meta.env.DEV) return
  const w = window as unknown as Record<string, unknown>
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
