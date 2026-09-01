// Pure platform integrator + sphere-as-AABB collision core. Zero engine deps.
// The player's collision shape is an AABB: half-width PLAYER_RADIUS,
// half-height PLAYER_HALF_HEIGHT, anchored at bottom-center (position.y = feet).
import {
  AIR_CONTROL,
  COYOTE_TIME,
  DOUBLE_JUMP_VELOCITY,
  GRAVITY,
  GROUND_ACCEL,
  GROUND_DECEL,
  JUMP_BUFFER_TIME,
  JUMP_RELEASE_FACTOR,
  JUMP_VELOCITY,
  MAX_FALL_SPEED,
  MOVE_SPEED,
  PLAYER_HALF_HEIGHT,
  PLAYER_RADIUS
} from './constants'
import type { AABB, Input, PlayerState } from './types'

function accelToward(current: number, target: number, amount: number): number {
  if (current < target) return Math.min(target, current + amount)
  if (current > target) return Math.max(target, current - amount)
  return current
}

export function createPlayer(x: number, y: number, z: number): PlayerState {
  return {
    position: { x, y, z },
    velocity: { x: 0, y: 0, z: 0 },
    grounded: false,
    jumpsUsed: 0,
    coyote: 0,
    jumpBuffer: 0
  }
}

// Integrate + collide the player against a list of static AABB solids at fixed dt.
export function stepPlayer(
  state: PlayerState,
  input: Input,
  dt: number,
  solids: ReadonlyArray<AABB>
): void {
  const hw = PLAYER_RADIUS
  const hh = PLAYER_HALF_HEIGHT

  // --- Timers ---
  state.coyote = state.grounded ? COYOTE_TIME : Math.max(0, state.coyote - dt)
  state.jumpBuffer = input.jumpPressed ? JUMP_BUFFER_TIME : Math.max(0, state.jumpBuffer - dt)

  // --- Horizontal accel/decel (grounded vs air) ---
  const accel = state.grounded ? GROUND_ACCEL : GROUND_ACCEL * AIR_CONTROL
  const decel = state.grounded ? GROUND_DECEL : GROUND_DECEL * AIR_CONTROL
  const targetX = input.moveX * MOVE_SPEED
  const targetZ = input.moveZ * MOVE_SPEED
  // Use decel when the current speed exceeds the target (braking), else accel.
  const rateX = Math.abs(state.velocity.x) > Math.abs(targetX) ? decel : accel
  const rateZ = Math.abs(state.velocity.z) > Math.abs(targetZ) ? decel : accel
  state.velocity.x = accelToward(state.velocity.x, targetX, rateX * dt)
  state.velocity.z = accelToward(state.velocity.z, targetZ, rateZ * dt)

  // --- Jump (buffer + coyote + double jump) ---
  if (state.jumpBuffer > 0) {
    if (state.grounded || state.coyote > 0) {
      state.velocity.y = JUMP_VELOCITY
      state.jumpsUsed = 1
      state.jumpBuffer = 0
      state.coyote = 0
      state.grounded = false
    } else if (state.jumpsUsed < 2) {
      state.velocity.y = DOUBLE_JUMP_VELOCITY
      state.jumpsUsed = 2
      state.jumpBuffer = 0
    }
  }

  // --- Variable jump height (release cut) ---
  if (input.jumpReleased && state.velocity.y > 0) {
    state.velocity.y *= JUMP_RELEASE_FACTOR
  }

  // --- Gravity + fall clamp ---
  state.velocity.y -= GRAVITY * dt
  if (state.velocity.y < -MAX_FALL_SPEED) state.velocity.y = -MAX_FALL_SPEED

  state.grounded = false

  // --- Move per axis, then resolve ---
  // X
  state.position.x += state.velocity.x * dt
  resolveAxis('x', state, solids, hw, hh)
  // Z
  state.position.z += state.velocity.z * dt
  resolveAxis('z', state, solids, hw, hh)
  // Y (landing/ceiling sets grounded)
  state.position.y += state.velocity.y * dt
  resolveAxis('y', state, solids, hw, hh)
  resolveAxis('y', state, solids, hw, hh) // re-resolve in case of step-through on land

  if (state.grounded) {
    state.jumpsUsed = 0
  }
}

function resolveAxis(
  axis: 'x' | 'y' | 'z',
  state: PlayerState,
  solids: ReadonlyArray<AABB>,
  hw: number,
  hh: number
): void {
  const p = state.position
  for (const s of solids) {
    const px0 = p.x - hw
    const px1 = p.x + hw
    const py0 = p.y
    const py1 = p.y + hh * 2
    const pz0 = p.z - hw
    const pz1 = p.z + hw
    // Overlap test on all three axes.
    if (px1 > s.min.x && px0 < s.max.x && py1 > s.min.y && py0 < s.max.y && pz1 > s.min.z && pz0 < s.max.z) {
      if (axis === 'x') {
        p.x = state.velocity.x > 0 ? s.min.x - hw : s.max.x + hw
        state.velocity.x = 0
      } else if (axis === 'z') {
        p.z = state.velocity.z > 0 ? s.min.z - hw : s.max.z + hw
        state.velocity.z = 0
      } else {
        if (state.velocity.y <= 0) {
          p.y = s.max.y
          state.velocity.y = 0
          state.grounded = true
          state.jumpsUsed = 0
          state.coyote = COYOTE_TIME
        } else {
          p.y = s.min.y - hh * 2
          state.velocity.y = 0
        }
      }
    }
  }
}
