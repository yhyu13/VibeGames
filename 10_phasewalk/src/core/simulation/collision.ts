// core/simulation/collision.ts — sphere-vs-AABB vs CURRENT phase's platforms + solidified phase-fluid
// pools + ground + hall bounds. Pure.
import { PLAYER_HALF_HEIGHT, PLAYER_RADIUS, SOLIDIFY_RADIUS } from '../constants'
import type { GameState, Vec3 } from '../types'

function currentPlatforms(s: GameState): { min: Vec3; max: Vec3 }[] {
  const boxes: { min: Vec3; max: Vec3 }[] = []
  for (const pl of s.layer.platforms) if (pl.phase === s.player.phase) boxes.push(pl)
  // solidified phase-fluid pools are walkable by EVERY phase (固化造路 — a frozen bridge is solid)
  for (const pf of s.layer.phaseFluids) if (pf.solidified) boxes.push(pf)
  // 逆相栅 (phase_fence): a wall only its OWN phase passes through — blocks every other phase
  // (液态栅只挡固/气/焰). Resolved exactly like a platform (sphere-vs-AABB).
  for (const t of s.layer.traps) if (t.kind === 'phase_fence' && t.phase !== s.player.phase) boxes.push({ min: t.min, max: t.max })
  return boxes
}

function resolveBox(s: GameState, min: Vec3, max: Vec3): void {
  const p = s.player
  const cx = p.position.x, cy = p.position.y, cz = p.position.z
  const rx = PLAYER_RADIUS, ry = PLAYER_HALF_HEIGHT, rz = PLAYER_RADIUS
  const overlapX = cx + rx > min.x && cx - rx < max.x
  const overlapY = cy + ry > min.y && cy - ry < max.y
  const overlapZ = cz + rz > min.z && cz - rz < max.z
  if (!(overlapX && overlapY && overlapZ)) return

  const penX = Math.min(cx + rx - min.x, max.x - (cx - rx))
  const penY = Math.min(cy + ry - min.y, max.y - (cy - ry))
  const penZ = Math.min(cz + rz - min.z, max.z - (cz - rz))

  if (penY <= penX && penY <= penZ) {
    // velocity-based resolution (NOT midpoint): falling = land on top, rising = hit ceiling.
    // 相弹 momentum carry can shove the player into a thin platform from BELOW — the midpoint
    // heuristic misjudges that case and pushes them down through the floor.
    if (p.velocity.y <= 0) {
      p.position.y = max.y + ry
      p.velocity.y = 0
      p.grounded = true
      p.jumpsUsed = 0
    } else {
      p.position.y = min.y - ry
      p.velocity.y = 0
    }
  } else if (penX <= penZ) {
    p.position.x = cx > (min.x + max.x) / 2 ? max.x + rx : min.x - rx
    p.velocity.x = 0
  } else {
    p.position.z = cz > (min.z + max.z) / 2 ? max.z + rz : min.z - rz
    p.velocity.z = 0
  }
}

// 固化造路: the SOLID player freezes any nearby phase-fluid pool into a walkable slab (persists this run).
export function solidifyFluids(s: GameState): string | null {
  if (s.player.phase !== 'solid') return null
  for (const pf of s.layer.phaseFluids) {
    if (pf.solidified) continue
    const cx = (pf.min.x + pf.max.x) / 2
    const cy = (pf.min.y + pf.max.y) / 2
    const cz = (pf.min.z + pf.max.z) / 2
    const dx = s.player.position.x - cx
    const dy = s.player.position.y - cy
    const dz = s.player.position.z - cz
    if (dx * dx + dy * dy + dz * dz < SOLIDIFY_RADIUS * SOLIDIFY_RADIUS) {
      pf.solidified = true
      return pf.id   // report so the engine can play 固化 feedback (audio + particle)
    }
  }
  return null
}

export function resolveCollisions(s: GameState): { landed: boolean } {
  const p = s.player
  const wasAirborne = !p.grounded   // capture before reset so a landing edge can be surfaced
  p.grounded = false
  // ground plane (y=0) collides for ALL phases (v3: the world never swallows you —
  // falling is never lethal; hazards are the only death sources)
  if (p.position.y - PLAYER_HALF_HEIGHT < 0) {
    p.position.y = PLAYER_HALF_HEIGHT
    if (p.velocity.y <= 0) p.velocity.y = 0
    p.grounded = true
    p.jumpsUsed = 0
  }
  for (const box of currentPlatforms(s)) resolveBox(s, box.min, box.max)
  // hall bounds
  const h = s.layer.hallHalf
  const r = PLAYER_RADIUS
  p.position.x = Math.max(-h[0] + r, Math.min(h[0] - r, p.position.x))
  p.position.z = Math.max(-h[2] + r, Math.min(h[2] - r, p.position.z))
  return { landed: wasAirborne && p.grounded }
}
