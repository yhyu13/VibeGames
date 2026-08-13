// core/simulation/collision.ts — sphere-vs-AABB vs CURRENT phase's platforms + ground + hall bounds. Pure.
import { PLAYER_HALF_HEIGHT, PLAYER_RADIUS } from '../constants'
import type { GameState, Platform } from '../types'

function currentPlatforms(s: GameState): Platform[] {
  return s.layer.platforms.filter((pl) => pl.phase === s.player.phase)
}

function resolvePlatform(s: GameState, pl: Platform): void {
  const p = s.player
  const cx = p.position.x, cy = p.position.y, cz = p.position.z
  const rx = PLAYER_RADIUS, ry = PLAYER_HALF_HEIGHT, rz = PLAYER_RADIUS
  const overlapX = cx + rx > pl.min.x && cx - rx < pl.max.x
  const overlapY = cy + ry > pl.min.y && cy - ry < pl.max.y
  const overlapZ = cz + rz > pl.min.z && cz - rz < pl.max.z
  if (!(overlapX && overlapY && overlapZ)) return

  const penX = Math.min(cx + rx - pl.min.x, pl.max.x - (cx - rx))
  const penY = Math.min(cy + ry - pl.min.y, pl.max.y - (cy - ry))
  const penZ = Math.min(cz + rz - pl.min.z, pl.max.z - (cz - rz))

  if (penY <= penX && penY <= penZ) {
    // velocity-based resolution (NOT midpoint): falling = land on top, rising = hit ceiling.
    // 相弹 momentum carry can shove the player into a thin platform from BELOW — the midpoint
    // heuristic misjudges that case and pushes them down through the floor.
    if (p.velocity.y <= 0) {
      p.position.y = pl.max.y + ry
      p.velocity.y = 0
      p.grounded = true
      p.jumpsUsed = 0
    } else {
      p.position.y = pl.min.y - ry
      p.velocity.y = 0
    }
  } else if (penX <= penZ) {
    p.position.x = cx > (pl.min.x + pl.max.x) / 2 ? pl.max.x + rx : pl.min.x - rx
    p.velocity.x = 0
  } else {
    p.position.z = cz > (pl.min.z + pl.max.z) / 2 ? pl.max.z + rz : pl.min.z - rz
    p.velocity.z = 0
  }
}

export function resolveCollisions(s: GameState): void {
  const p = s.player
  p.grounded = false
  // ground plane (y=0) applies to solid phase only — liquid/gas fall through
  if (p.phase === 'solid' && p.position.y - PLAYER_HALF_HEIGHT < 0) {
    p.position.y = PLAYER_HALF_HEIGHT
    if (p.velocity.y <= 0) p.velocity.y = 0
    p.grounded = true
    p.jumpsUsed = 0
  }
  for (const pl of currentPlatforms(s)) resolvePlatform(s, pl)
  // hall bounds
  const h = s.layer.hallHalf
  const r = PLAYER_RADIUS
  p.position.x = Math.max(-h[0] + r, Math.min(h[0] - r, p.position.x))
  p.position.z = Math.max(-h[2] + r, Math.min(h[2] - r, p.position.z))
  if (p.grounded) p.wireReleased = false // landed = can capture wires again
}
