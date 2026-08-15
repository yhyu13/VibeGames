// core/simulation/traps.ts — 相位陷阱 (M3 对抗式切相). Pure.
//   phase_lock  (相锁区): while the player is inside, a phase-switch request is cancelled — the
//     switching verb is pressured by forcing the player to choose a phase BEFORE entering.
//   phase_fence (逆相栅): resolved in collision.ts as a phase-gated wall (blocks all but its phase).
import { PLAYER_HALF_HEIGHT, PLAYER_RADIUS } from '../constants'
import type { GameState, InputState, Vec3 } from '../types'

function inside(s: GameState, min: Vec3, max: Vec3): boolean {
  const p = s.player
  return p.position.x + PLAYER_RADIUS > min.x && p.position.x - PLAYER_RADIUS < max.x &&
         p.position.y + PLAYER_HALF_HEIGHT > min.y && p.position.y - PLAYER_HALF_HEIGHT < max.y &&
         p.position.z + PLAYER_RADIUS > min.z && p.position.z - PLAYER_RADIUS < max.z
}

// 相锁区: cancel an in-region switch request before movement so stepPlayer never sees it.
// Called at the top of step() — additive pre-step, the frozen step order is otherwise unchanged.
export function resolveTraps(s: GameState, input: InputState): void {
  for (const t of s.layer.traps) {
    if (t.kind !== 'phase_lock') continue
    if (inside(s, t.min, t.max)) { input.switchPhase = null; return }
  }
}

// HUD reads this to surface "此区锁定" while the player stands inside a 相锁区.
export function isPhaseLocked(s: GameState): boolean {
  return s.layer.traps.some((t) => t.kind === 'phase_lock' && inside(s, t.min, t.max))
}
