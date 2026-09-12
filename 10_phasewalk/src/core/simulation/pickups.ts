// core/simulation/pickups.ts — 相尘 collection + hazards + gate + hearts (被吃相 loss state). Pure.
// Death policy (P0 #1, 2026-09-01): hits now cost ONE heart + post-hit i-frames + knockback (recoverable
// drama) instead of an instant reset-to-spawn; hearts empty → game_over. A fatal hit does NOT teleport the
// player — the game-over screen covers the scene and R restarts the climb.
import { GATE_ARRIVE_RADIUS, GATE_OPEN_SHARDS, PLAYER_HALF_HEIGHT, PLAYER_RADIUS, POST_HIT_IFRAMES, POST_HIT_KNOCKBACK, POST_HIT_POP_VY, SHARD_COLLECT_RADIUS } from '../constants'
import type { GameState, Vec3 } from '../types'

export function applyPickups(s: GameState): { collectedId: string | null } {
  let collectedId: string | null = null
  for (const sh of s.shards) {
    if (sh.collected || sh.phase !== s.player.phase) continue
    const dx = s.player.position.x - sh.position.x
    const dy = s.player.position.y - sh.position.y
    const dz = s.player.position.z - sh.position.z
    if (dx * dx + dy * dy + dz * dz < SHARD_COLLECT_RADIUS * SHARD_COLLECT_RADIUS) {
      sh.collected = true
      s.player.phaseDust++
      s.totalPhaseDust++
      collectedId = sh.id
    }
  }
  return { collectedId }
}

// Phase hazards: 无相区 kills every phase (the Phaseless eats phases — worldview fact ⑥),
// 雷云 kills gas only. A hit costs ONE heart + post-hit i-frames + a knock-back away from the hazard
// (recoverable drama, not an instant respawn); hearts empty → game_over (fatal). Falling never kills
// (the all-phase ground holds every phase).
export function applyHazards(s: GameState): { died: boolean; hurt: boolean } {
  const p = s.player
  for (const hz of s.layer.hazards) {
    if (hz.phases !== 'all' && !hz.phases.includes(p.phase)) continue
    if (p.position.x + PLAYER_RADIUS > hz.min.x && p.position.x - PLAYER_RADIUS < hz.max.x &&
        p.position.y + PLAYER_HALF_HEIGHT > hz.min.y && p.position.y - PLAYER_HALF_HEIGHT < hz.max.y &&
        p.position.z + PLAYER_RADIUS > hz.min.z && p.position.z - PLAYER_RADIUS < hz.max.z) {
      const from: Vec3 = {
        x: (hz.min.x + hz.max.x) / 2,
        y: (hz.min.y + hz.max.y) / 2,
        z: (hz.min.z + hz.max.z) / 2,
      }
      // i-frames: the hit is ignored ENTIRELY — that is damagePlayer's own contract (its first line).
      // This guard is not an optimisation. Without it `hurt: !fatal` reports a heart loss for a step
      // that took none, and the flag's only consumer (App.tsx: audio.hurt() + a 16-particle burst) then
      // fires once per FIXED STEP for as long as the body overlaps the region. Measured on F1's 无相区:
      // 157 stings in 2.5 s (62.8/s, ~one per step) against 2 hearts actually lost — 149 of them on a
      // step where hp did not change. The bullet path guards exactly this case before calling the same
      // primitive (bullets.ts: `if (p.iFrames > 0) continue`); the two damage sources share one rule,
      // so they must report it the same way.
      if (p.iFrames > 0) continue
      const fatal = damagePlayer(s, from)
      // a hit (fatal or recoverable) — report both so the engine can flash the hurt cue / trigger game over
      return { died: fatal, hurt: !fatal }
    }
  }
  return { died: false, hurt: false }
}

// Core loss-state primitive (P0 #1): one heart + i-frames + knockback per hit; hearts empty = fatal.
// Returns true when the hit was FATAL (game_over). Shared by solid-bullet hits and hazard hits so the
// loss resource is one rule, not two. `from` is the damage source position — knockback pushes the
// player AWAY from it (and, for a hazard region, out of the AABB so the player isn't re-hit after the
// i-frame window lapses).
export function damagePlayer(s: GameState, from: Vec3): boolean {
  const p = s.player
  if (p.iFrames > 0) return false          // post-hit invulnerability — the hit is ignored entirely
  p.hp--
  p.iFrames = POST_HIT_IFRAMES
  const dx = p.position.x - from.x
  const dz = p.position.z - from.z
  const len = Math.hypot(dx, dz) || 1
  p.velocity.x = (dx / len) * POST_HIT_KNOCKBACK
  p.velocity.z = (dz / len) * POST_HIT_KNOCKBACK
  p.velocity.y = POST_HIT_POP_VY
  if (p.hp <= 0) {                         // hearts empty → 被吃相, the climb's loss state
    s.phase = 'game_over'                  // the ONLY write of game_over in the repo — a climb ends here
    s.totalDeaths++                        // and this is the ONLY place it can end, so the count is complete
    return true
  }
  return false
}

export function gateOpen(s: GameState): boolean {
  // counting loop, NOT shards.filter(...).length — this runs every rendered frame (SceneManager.sync
  // mirrors the gate glow) plus once per fixed-dt step (checkGate), and filter() allocates a throwaway
  // array each call. A loop is allocation-free in the hot path.
  let collected = 0
  for (const sh of s.shards) if (sh.collected) collected++
  if (collected < GATE_OPEN_SHARDS) return false
  // 相灵守层者 (M3): a live boss eye guards the gate — reflect-destroy it (plasma) before passing.
  if (s.layer.emitters.some((em) => em.boss && !em.destroyed)) return false
  // 密文石板 (password gate): a floor with a password must have its sequence fully stepped before the
  // gate opens (transparent-panel hide-and-seek). Floors without a password skip this (length 0).
  const needPw = s.layer.password?.length ?? 0
  return needPw === 0 || s.passwordProgress >= needPw
}

export function checkGate(s: GameState): boolean {
  if (!gateOpen(s)) return false
  const dx = s.player.position.x - s.layer.exit.x
  const dy = s.player.position.y - s.layer.exit.y
  const dz = s.player.position.z - s.layer.exit.z
  return dx * dx + dy * dy + dz * dz < GATE_ARRIVE_RADIUS * GATE_ARRIVE_RADIUS
}
