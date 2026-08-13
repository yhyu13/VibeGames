// core/simulation/phasePhysics.ts — pure integrator. 相弹 law: momentum conserved, gravity
// multiplier switches instantly, zero special cases (TDD §4, review D3).
import {
  COYOTE_TIME, GAS_HOVER_ACCEL, GAS_HOVER_MAX_VY, GAS_MAX_FALL, GRAVITY_BASE, JUMP_BUFFER_TIME,
  JUMP_VELOCITY, LIQUID_MAX_FALL, LIQUID_SWIM_MAX_VY, MAX_FALL_SPEED, MOVE_SPEED,
  PHASE_GRAVITY, PHASE_SWITCH_COOLDOWN, PHASE_ORDER,
} from '../constants'
import type { GameState, InputState, PhaseId } from '../types'

const TURN_SPEED = 10 // accel toward target velocity

export function stepPlayer(s: GameState, input: InputState, dt: number): void {
  const p = s.player
  const gMul = PHASE_GRAVITY[p.phase]

  // timers
  p.switchCooldown = Math.max(0, p.switchCooldown - dt)
  p.jumpBuffer = Math.max(0, p.jumpBuffer - dt)
  if (p.grounded) p.coyote = COYOTE_TIME
  else p.coyote = Math.max(0, p.coyote - dt)

  // horizontal move (ground/air same accel curve; air control via lower speed feel)
  const speed = MOVE_SPEED[p.phase]
  const targetX = input.x * speed
  const targetZ = input.z * speed
  p.velocity.x += (targetX - p.velocity.x) * Math.min(1, TURN_SPEED * dt)
  p.velocity.z += (targetZ - p.velocity.z) * Math.min(1, TURN_SPEED * dt)

  // gravity — all phases (plasma falls when off-wire; wires own velocity while riding)
  // liquid swim: holding jump = float upward (gravity suspended while held — polish U2)
  if (p.phase === 'liquid' && input.jumpHeld) {
    p.velocity.y += (LIQUID_SWIM_MAX_VY - p.velocity.y) * Math.min(1, 8 * dt)
  } else {
    p.velocity.y -= GRAVITY_BASE * gMul * dt
    if (p.phase === 'liquid') p.velocity.y = Math.max(p.velocity.y, -LIQUID_MAX_FALL)
    else if (p.phase === 'gas') p.velocity.y = Math.max(p.velocity.y, -GAS_MAX_FALL)
    else p.velocity.y = Math.max(p.velocity.y, -MAX_FALL_SPEED)
  }

  // air feel (polish U1): gas = hover while holding jump
  if (input.jumpHeld && p.phase === 'gas') {
    if (p.velocity.y < GAS_HOVER_MAX_VY) {
      p.velocity.y = Math.min(GAS_HOVER_MAX_VY, p.velocity.y + GAS_HOVER_ACCEL * dt)
    }
  }

  // jump (grounded or coyote; plasma never jumps — wires only)
  if (input.jumpPressed) p.jumpBuffer = JUMP_BUFFER_TIME
  const canJump = p.phase !== 'plasma' && (p.grounded || p.coyote > 0) && p.jumpsUsed < 2
  if (canJump && p.jumpBuffer > 0) {
    p.velocity.y = JUMP_VELOCITY[p.phase]
    p.jumpsUsed = p.grounded ? 1 : 2
    p.jumpBuffer = 0
    p.coyote = 0
  }

  // 相弹: momentum conserved — only gravity behavior changes next steps (no code needed here)
  if (input.switchPhase) {
    if (p.switchCooldown <= 0 && input.switchPhase !== p.phase) {
      p.phase = input.switchPhase
      p.switchCooldown = PHASE_SWITCH_COOLDOWN
      p.switches++
      p.wireReleased = false   // fresh phase = fresh wire capture
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
