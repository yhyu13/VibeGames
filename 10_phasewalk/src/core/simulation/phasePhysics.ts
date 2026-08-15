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

export function stepPlayer(s: GameState, input: InputState, dt: number): void {
  const p = s.player
  const gMul = PHASE_GRAVITY[p.phase]

  // timers
  p.switchCooldown = Math.max(0, p.switchCooldown - dt)
  p.jumpBuffer = Math.max(0, p.jumpBuffer - dt)
  p.burstCooldown = Math.max(0, p.burstCooldown - dt)
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
      if (p.velocity.y < -LIQUID_MAX_FALL) p.velocity.y = -LIQUID_MAX_FALL + (p.velocity.y + LIQUID_MAX_FALL) * Math.exp(-6 * dt)
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
    if (p.velocity.y < -cap) p.velocity.y = -cap + (p.velocity.y + cap) * Math.exp(-6 * dt)
  }

  // jump / burst (edge-triggered via jump buffer)
  if (input.jumpPressed) p.jumpBuffer = JUMP_BUFFER_TIME

  if (p.phase === 'solid') {
    // solid = double jump (ground/coyote = first, one air jump)
    const canJump = (p.grounded || p.coyote > 0 || p.jumpsUsed === 1) && p.jumpsUsed < 2
    if (canJump && p.jumpBuffer > 0) {
      p.velocity.y = JUMP_VELOCITY.solid
      p.jumpsUsed = (p.grounded || p.coyote > 0) ? 1 : 2
      p.jumpBuffer = 0
      p.coyote = 0
    }
  } else if (p.phase === 'plasma') {
    // plasma = 爆冲 burst launch (ground/coyote launch + one air redirect, like double-jump)
    const canBurst = (p.grounded || p.coyote > 0 || p.jumpsUsed === 1) && p.jumpsUsed < 2 && p.burstCooldown <= 0
    if (canBurst && p.jumpBuffer > 0) {
      p.velocity.x = input.x * PLASMA_BURST_H
      p.velocity.y = PLASMA_BURST_VY
      p.velocity.z = input.z * PLASMA_BURST_H
      p.jumpsUsed = (p.grounded || p.coyote > 0) ? 1 : 2
      p.burstCooldown = BURST_COOLDOWN
      p.jumpBuffer = 0
      p.coyote = 0
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
  s.introT = Math.max(0, s.introT - dt)
}

export function nextPhase(phase: PhaseId, dir: 1 | -1): PhaseId {
  const i = PHASE_ORDER.indexOf(phase)
  return PHASE_ORDER[(i + dir + PHASE_ORDER.length) % PHASE_ORDER.length]
}
