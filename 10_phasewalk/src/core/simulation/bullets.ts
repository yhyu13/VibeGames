// core/simulation/bullets.ts — 相灵弹 system (v4). Pure.
// Emitters (相灵眼) fire neutral projectiles; the interaction is decided by the PLAYER's phase:
//   solid  = hit → death (被吃相)
//   liquid = hit → disperse (forced back to solid + momentum cleared, soft penalty)
//   gas    = bullet passes through (intangible)
//   plasma = absorb + reflect (bullet homes back toward its emitter; a hit destroys the emitter)
import { BULLET_LIFE, BULLET_RADIUS, BULLET_REFLECT_SPEED, BULLET_STAGE_MARGIN, PLAYER_HALF_HEIGHT, PLAYER_RADIUS } from '../constants'
import type { GameState, Vec3 } from '../types'
import { respawnAtSpawn } from './pickups'

let bulletSeq = 0

export interface BulletEvents {
  died: boolean              // solid hit → death
  dispersed: boolean         // liquid hit → forced solid
  reflected: boolean         // plasma absorb + reflect
  destroyed: string | null   // emitter id destroyed by a reflected bullet
}

function norm(v: Vec3): Vec3 {
  const l = Math.hypot(v.x, v.y, v.z) || 1
  return { x: v.x / l, y: v.y / l, z: v.z / l }
}

export function stepBullets(s: GameState, dt: number): BulletEvents {
  const ev: BulletEvents = { died: false, dispersed: false, reflected: false, destroyed: null }
  const p = s.player

  // 1. emitters fire on their interval
  for (const em of s.layer.emitters) {
    if (em.destroyed) continue
    em.cooldown -= dt
    if (em.cooldown <= 0) {
      em.cooldown = em.interval
      const dir = em.aim === 'player' ? norm({ x: p.position.x - em.position.x, y: p.position.y - em.position.y, z: p.position.z - em.position.z }) : norm(em.aim)
      s.bullets.push({
        id: `b${bulletSeq++}`,
        position: { ...em.position },
        velocity: { x: dir.x * em.speed, y: dir.y * em.speed, z: dir.z * em.speed },
        reflected: false,
        emitterId: em.id,
        life: BULLET_LIFE,
      })
    }
  }

  // 2. move bullets + resolve interactions
  for (let i = s.bullets.length - 1; i >= 0; i--) {
    const b = s.bullets[i]
    b.life -= dt
    b.position.x += b.velocity.x * dt
    b.position.y += b.velocity.y * dt
    b.position.z += b.velocity.z * dt

    if (b.life <= 0) { s.bullets.splice(i, 1); continue }

    // despawn off-stage: a ghost bullet that clears the wall plane has left the play — cull it
    // instead of letting it sail into the void (bounded by BULLET_LIFE but reads as clutter).
    const [hhx, hhy, hhz] = s.layer.hallHalf
    if (Math.abs(b.position.x) > hhx + BULLET_STAGE_MARGIN ||
        Math.abs(b.position.z) > hhz + BULLET_STAGE_MARGIN ||
        b.position.y > hhy + BULLET_STAGE_MARGIN || b.position.y < -BULLET_STAGE_MARGIN) {
      s.bullets.splice(i, 1); continue
    }

    // reflected bullet → homing back toward its emitter (destroy it on contact)
    if (b.reflected) {
      const em = s.layer.emitters.find((e) => e.id === b.emitterId && !e.destroyed)
      if (em) {
        const dx = b.position.x - em.position.x
        const dy = b.position.y - em.position.y
        const dz = b.position.z - em.position.z
        if (dx * dx + dy * dy + dz * dz < 0.5 * 0.5) {
          em.destroyed = true
          ev.destroyed = em.id
          s.bullets.splice(i, 1)
        }
      } else {
        // its emitter was already destroyed by an earlier reflection — cull instead of letting an
        // untracked bullet sail in a straight line for the rest of its life
        s.bullets.splice(i, 1)
      }
      continue
    }

    // player interaction — decided by phase
    if (p.phase === 'gas') continue // passes through, no collision
    const dx = b.position.x - p.position.x
    const dz = b.position.z - p.position.z
    const dy = b.position.y - p.position.y
    const r = BULLET_RADIUS + PLAYER_RADIUS
    if (dx * dx + dz * dz < r * r && Math.abs(dy) < BULLET_RADIUS + PLAYER_HALF_HEIGHT) {
      if (p.phase === 'solid') {
        // hard hit → death (被吃相)
        respawnAtSpawn(s)
        s.player.deaths++
        ev.died = true
        s.bullets.splice(i, 1)
        return ev
      } else if (p.phase === 'liquid') {
        // disperse: forced back to solid, momentum cleared (soft penalty, no death).
        // return immediately so a 2nd bullet in the same frame can't re-hit the now-solid player
        // and turn a soft disperse into a hard death (both bullets resolve against the same phase).
        p.phase = 'solid'
        p.velocity = { x: 0, y: 0, z: 0 }
        p.dispersed = 0.6
        ev.dispersed = true
        s.bullets.splice(i, 1)
        return ev
      } else if (p.phase === 'plasma') {
        // absorb + reflect back toward the emitter
        const em = s.layer.emitters.find((e) => e.id === b.emitterId)
        if (em) {
          const dir = norm({ x: em.position.x - b.position.x, y: em.position.y - b.position.y, z: em.position.z - b.position.z })
          b.velocity = { x: dir.x * BULLET_REFLECT_SPEED, y: dir.y * BULLET_REFLECT_SPEED, z: dir.z * BULLET_REFLECT_SPEED }
          b.reflected = true
          ev.reflected = true
        }
      }
    }
  }
  return ev
}

// All emitters destroyed (used by gate conditions / HUD).
export function emittersCleared(s: GameState): boolean {
  return s.layer.emitters.every((em) => em.destroyed)
}
