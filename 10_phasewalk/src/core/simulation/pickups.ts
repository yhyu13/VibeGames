// core/simulation/pickups.ts — 相尘 collection + hazards + gate + respawn. Pure.
// Death policy (2026-08-14 playtest): respawn ALWAYS at layer spawn, phase reset to solid —
// no same-point retry; shards kept (progress loss = traversal, not collection).
import { GATE_OPEN_SHARDS, PLAYER_HALF_HEIGHT, PLAYER_RADIUS, SHARD_COLLECT_RADIUS } from '../constants'
import type { GameState } from '../types'

export function respawnAtSpawn(s: GameState): void {
  s.player.position = { ...s.layer.spawn }
  s.player.velocity = { x: 0, y: 0, z: 0 }
  s.player.phase = 'solid'
  s.player.switchCooldown = 0
  s.player.burstCooldown = 0
  s.player.burstBuffer = 0
  s.player.dispersed = 0
  s.player.jumpsUsed = 0
  s.player.coyote = 0
  s.player.jumpBuffer = 0
  s.player.grounded = true   // spawn sits on the spawn platform — mark grounded so the next frame's
  // resolveCollisions doesn't report a spurious landed (land cue) right on top of the death cue
}

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
// 雷云 kills gas only. Falling never kills (the all-phase ground holds every phase).
export function applyHazards(s: GameState): boolean {
  const p = s.player
  for (const hz of s.layer.hazards) {
    if (hz.phases !== 'all' && !hz.phases.includes(p.phase)) continue
    if (p.position.x + PLAYER_RADIUS > hz.min.x && p.position.x - PLAYER_RADIUS < hz.max.x &&
        p.position.y + PLAYER_HALF_HEIGHT > hz.min.y && p.position.y - PLAYER_HALF_HEIGHT < hz.max.y &&
        p.position.z + PLAYER_RADIUS > hz.min.z && p.position.z - PLAYER_RADIUS < hz.max.z) {
      respawnAtSpawn(s)
      s.player.deaths++
      return true
    }
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
  return dx * dx + dy * dy + dz * dz < 1.2 * 1.2
}
