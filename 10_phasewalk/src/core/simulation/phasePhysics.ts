// core/simulation/phasePhysics.ts — pure integrator. 相弹 law: momentum conserved, gravity
// multiplier switches instantly, zero special cases (TDD §4, review D3).
//
// v4 movement verbs (one DISTINCT verb per phase — no auto-ride):
//   solid  = precise jump            (jump)
//   liquid = free swim               (hold jump = rise, release = sink)
//   gas    = hover cruise            (hold jump = float up, gravity is floaty)
//   plasma = 爆冲 burst launch       (jumpPressed = diagonal rocket, gravity 0.9 arcs it down)
import {
  BURST_COOLDOWN, COYOTE_TIME, GAS_HOVER_ACCEL, GAS_HOVER_MAX_VY, GAS_MAX_FALL, GRAVITY_BASE,
  JUMP_BUFFER_TIME, JUMP_VELOCITY, LIQUID_MAX_FALL, LIQUID_SWIM_ACCEL, LIQUID_SWIM_MAX_VY,
  MAX_FALL_SPEED, MOVE_SPEED, PHASE_GRAVITY, PHASE_SWITCH_COOLDOWN, PHASE_ORDER, PLASMA_BURST_H,
  PLASMA_BURST_VY,
} from '../constants'
import type { GameState, InputState, PhaseId } from '../types'

const TURN_SPEED = 10 // accel toward target velocity

// movement-verb edges surfaced to the engine so jump/swim/hover/burst have audio+particle feedback
// (each verb is the whole point of its phase — they must not be silent).
export interface MoveEvents {
  jumped: boolean            // solid jumped (ground or air double-jump)
  burst: boolean             // plasma 爆冲 launched (ground or air redirect)
}

export function stepPlayer(s: GameState, input: InputState, dt: number): MoveEvents {
  const p = s.player
  const gMul = PHASE_GRAVITY[p.phase]
  const ev: MoveEvents = { jumped: false, burst: false }

  // timers
  p.switchCooldown = Math.max(0, p.switchCooldown - dt)
  p.jumpBuffer = Math.max(0, p.jumpBuffer - dt)
  p.burstCooldown = Math.max(0, p.burstCooldown - dt)
  p.burstBuffer = Math.max(0, p.burstBuffer - dt)
  p.dispersed = Math.max(0, p.dispersed - dt)
  if (p.grounded) p.coyote = COYOTE_TIME
  else p.coyote = Math.max(0, p.coyote - dt)

  // horizontal move (same accel curve for every phase; air control via lower speed feel)
  const speed = MOVE_SPEED[p.phase]
  const targetX = input.x * speed
  const targetZ = input.z * speed
  p.velocity.x += (targetX - p.velocity.x) * Math.min(1, TURN_SPEED * dt)
  p.velocity.z += (targetZ - p.velocity.z) * Math.min(1, TURN_SPEED * dt)

  // vertical — per-phase verb
  if (p.phase === 'liquid') {
    // free swim: hold jump = rise toward cap, release = sink under gravity
    if (input.jumpHeld) {
      p.velocity.y += (LIQUID_SWIM_MAX_VY - p.velocity.y) * Math.min(1, LIQUID_SWIM_ACCEL * dt)
    } else {
      p.velocity.y -= GRAVITY_BASE * gMul * dt
      if (p.velocity.y < -LIQUID_MAX_FALL) p.velocity.y = -LIQUID_MAX_FALL
    }
  } else {
    p.velocity.y -= GRAVITY_BASE * gMul * dt
    // gas = hover cruise control while holding jump (floaty, capped rise + sink)
    if (p.phase === 'gas' && input.jumpHeld) {
      if (p.velocity.y < GAS_HOVER_MAX_VY) {
        p.velocity.y = Math.min(GAS_HOVER_MAX_VY, p.velocity.y + GAS_HOVER_ACCEL * dt)
      } else {
        p.velocity.y = Math.max(GAS_HOVER_MAX_VY, p.velocity.y - GAS_HOVER_ACCEL * 2 * dt)
      }
    }
    const cap = p.phase === 'gas' ? GAS_MAX_FALL : MAX_FALL_SPEED
    if (p.velocity.y < -cap) p.velocity.y = -cap
  }

  // jump / burst (edge-triggered via jump buffer). Only solid/plasma consume the buffer — liquid/gas
  // use jumpHeld (swim/hover), so buffering there would leak a stale tap into a fast switch (a liquid
  // tap re-read as an unrequested solid jump / plasma burst after the 0.12s buffer).
  if (input.jumpPressed && (p.phase === 'solid' || p.phase === 'plasma')) p.jumpBuffer = JUMP_BUFFER_TIME

  if (p.phase === 'solid') {
    // solid = double jump (ground = first, one air jump). Coyote time keeps the GROUND jump alive for
    // a short grace after walking off a ledge; past the window a walk-off (jumpsUsed still 0) skips
    // straight to the AIR jump so the single remaining jump is never lost.
    const groundJump = p.grounded || p.coyote > 0
    const canJump = p.jumpsUsed < 2 && (groundJump || p.jumpsUsed === 1 || (!p.grounded && p.jumpsUsed === 0))
    if (canJump && p.jumpBuffer > 0) {
      p.velocity.y = JUMP_VELOCITY.solid
      // 0 → 1 is the ground jump (grounded or within coyote); 0 → 2 is the air jump a walk-off earns
      // once the grace expires; 1 → 2 is the normal air jump after a ground jump.
      p.jumpsUsed = p.jumpsUsed === 0 ? (groundJump ? 1 : 2) : 2
      p.jumpBuffer = 0
      p.coyote = 0
      ev.jumped = true
    }
  } else if (p.phase === 'plasma') {
    // plasma = 爆冲 burst launch (ground/coyote launch + one air redirect, like double-jump).
    // The 0.4s cooldown outlasts the 0.12s jump buffer, so an early redirect press is silently eaten.
    // Buffer it: if airborne with one burst used but the cooldown still cooling, remember the press so
    // it fires the instant the cooldown clears — the redirect never drops.
    if (input.jumpPressed && p.jumpsUsed === 1 && !p.grounded && p.burstCooldown > 0) {
      p.burstBuffer = p.burstCooldown + JUMP_BUFFER_TIME
    }
    // coyote keeps the ground burst alive after a walk-off; past it a walk-off skips to the air
    // redirect (0 → 2) so the one remaining burst is never lost (same rule as solid's double-jump).
    const groundBurst = p.grounded || p.coyote > 0
    const canBurst = p.jumpsUsed < 2 && (groundBurst || p.jumpsUsed === 1 || (!p.grounded && p.jumpsUsed === 0)) && p.burstCooldown <= 0
    if (canBurst && (p.jumpBuffer > 0 || p.burstBuffer > 0)) {
      p.velocity.x = input.x * PLASMA_BURST_H
      p.velocity.y = PLASMA_BURST_VY
      p.velocity.z = input.z * PLASMA_BURST_H
      p.jumpsUsed = p.jumpsUsed === 0 ? (groundBurst ? 1 : 2) : 2
      p.burstCooldown = BURST_COOLDOWN
      p.jumpBuffer = 0
      p.burstBuffer = 0
      p.coyote = 0
      ev.burst = true
    }
  }

  // 相弹: momentum conserved — only gravity behavior changes next steps (no code needed here)
  if (input.switchPhase) {
    if (p.switchCooldown <= 0 && input.switchPhase !== p.phase) {
      p.phase = input.switchPhase
      p.switchCooldown = PHASE_SWITCH_COOLDOWN
      p.switches++
    }
    input.switchPhase = null
  }

  // integrate
  p.position.x += p.velocity.x * dt
  p.position.y += p.velocity.y * dt
  p.position.z += p.velocity.z * dt

  s.elapsed += dt
  s.frame++
  return ev
}

export function nextPhase(phase: PhaseId, dir: 1 | -1): PhaseId {
  const i = PHASE_ORDER.indexOf(phase)
  return PHASE_ORDER[(i + dir + PHASE_ORDER.length) % PHASE_ORDER.length]
}
