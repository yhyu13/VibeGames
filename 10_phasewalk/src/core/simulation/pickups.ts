// core/simulation/pickups.ts — 相尘 collection + gate + respawn. Pure.
import { FALL_DEATH_Y, GATE_OPEN_SHARDS, SHARD_COLLECT_RADIUS } from '../constants'
import type { GameState } from '../types'

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

export function gateOpen(s: GameState): boolean {
  const collected = s.shards.filter((sh) => sh.collected).length
  return collected >= GATE_OPEN_SHARDS
}

export function applyDeath(s: GameState): boolean {
  if (s.player.position.y < FALL_DEATH_Y) {
    s.player.position = { ...s.player.checkpoint }
    s.player.velocity = { x: 0, y: 0, z: 0 }
    s.player.phase = 'solid'
    s.player.jumpsUsed = 0
    s.player.dead = true
    return true
  }
  return false
}

export function checkGate(s: GameState): boolean {
  if (!gateOpen(s)) return false
  const dx = s.player.position.x - s.layer.exit.x
  const dy = s.player.position.y - s.layer.exit.y
  const dz = s.player.position.z - s.layer.exit.z
  return dx * dx + dy * dy + dz * dz < 1.2 * 1.2
}
