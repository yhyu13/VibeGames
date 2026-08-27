// core/simulation/world.ts — scripted VIP/guard/van poses. Pure.
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
}
