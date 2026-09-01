// core/simulation/world.ts — scripted VIP/guard/van poses. Pure.
import { KT_REPOSITION_SPEED } from '../constants'
import {
  GUARD_W1_PATH,
  GUARD_W2_PATH,
  lerpPath,
  VAN_POS,
  VIP_PATH,
} from '../data/courtyard'
import type { GameState } from '../types'

export function stepWorld(s: GameState): void {
  const t = s.elapsed
  if (!s.entities.vip.down) {
    s.entities.vip.pos = lerpPath(VIP_PATH, t)
  }
  s.entities.guard_w1.pos = lerpPath(GUARD_W1_PATH, t)
  s.entities.guard_w2.pos = lerpPath(GUARD_W2_PATH, t)
  s.entities.van.pos = { ...VAN_POS }

  // Kill team reacts to false intel: ease toward the bogus target once set.
  const target = s.ktTarget
  if (target) {
    const kt = s.entities.kt
    const dx = target.x - kt.pos.x
    const dz = target.z - kt.pos.z
    if (Math.abs(dx) + Math.abs(dz) < 0.01) {
      s.ktTarget = null
    } else {
      kt.pos.x += dx * KT_REPOSITION_SPEED
      kt.pos.z += dz * KT_REPOSITION_SPEED
    }
  }
}
