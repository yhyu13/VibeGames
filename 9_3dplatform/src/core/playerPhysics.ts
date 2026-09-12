// Pure platform integrator + sphere-as-AABB collision core. Zero engine deps.
// The player's collision shape is an AABB anchored at bottom-center (position.y = feet), with
// half-width PLAYER_RADIUS and half-height PASSED IN. The half-height is nominal by default and the
// caller varies it because the drawn body does: a landing squash is a shorter body and a launch
// stretch a taller one, and a world that resolved against the nominal box while the eye was shown a
// stretched one was describing two different players. Whatever half-height arrives here is the body
// — the same number the renderer draws, in the same frame.
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

// Which jump a step applied. Signalled, never inferred downstream: the two jumps are distinct
// verbs (GDD §2 freezes 11 and 9.5 m/s) and the 1.5 m/s between them is not a reading a consumer
// can take — the velocity a frame carries also depends on how long the key was held, since
// JUMP_RELEASE_FACTOR cuts it mid-rise, so an amplitude threshold would be a guess dressed as a
// fact. Signalled beats inferred even when the numbers look far apart.
export type JumpKind = 'none' | 'ground' | 'double'

// Integrate + collide the player against a list of static AABB solids at fixed dt.
// `halfHeight` is the shape's current half-height: PLAYER_HALF_HEIGHT when the body is its nominal
// size, less while a landing squash or a spent-press squeeze is crossing out, more while a launch
// stretch is. It defaults to nominal so a caller with no squash/stretch to report — a test, a tool —
// keeps the old single-argument shape.
export function stepPlayer(
  state: PlayerState,
  input: Input,
  dt: number,
  solids: ReadonlyArray<AABB>,
  halfHeight: number = PLAYER_HALF_HEIGHT
): { deniedJump: boolean; jumpKind: JumpKind } {
  const hw = PLAYER_RADIUS
  const hh = halfHeight

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
  let deniedJump = false
  let jumpKind: JumpKind = 'none'
  if (state.jumpBuffer > 0) {
    if (state.grounded || state.coyote > 0) {
      state.velocity.y = JUMP_VELOCITY
      state.jumpsUsed = 1
      state.jumpBuffer = 0
      state.coyote = 0
      state.grounded = false
      jumpKind = 'ground'
    } else if (state.jumpsUsed < 2) {
      state.velocity.y = DOUBLE_JUMP_VELOCITY
      state.jumpsUsed = 2
      state.jumpBuffer = 0
      jumpKind = 'double'
    } else {
      // Both jumps spent and airborne: this press has no jump to spend. Flag it so
      // the renderer reads the deny instead of silently swallowing the input. The
      // buffer is deliberately NOT cleared — a landing within the window still
      // grants the ground jump the press was really aimed at.
      //
      // Only the step that CARRIED the press edge reports the deny. The buffer stays armed for
      // 0.12 s — 7 steps at 60 Hz — so an ungated flag here re-fires on every one of them: the
      // renderer re-armed its squeeze 7 times (harmless, it merely held) and the audio cue
      // stuttered 7 clicks 20 ms apart. One press is one deny, which is what the renderer's own
      // comment already claims ("Edge-triggered (one press = one squeeze)").
      deniedJump = input.jumpPressed
    }
  }

  // --- Variable jump height (release cut) ---
  if (input.jumpReleased && state.velocity.y > 0) {
    state.velocity.y *= JUMP_RELEASE_FACTOR
  }

  // The velocity the body ENTERED the step with, before gravity is applied. The Y move below
  // averages it with the outgoing one; see there for why.
  const vyBeforeGravity = state.velocity.y

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
  //
  // The move is the AVERAGE of the velocity across the step, not the velocity at the end of it.
  // Gravity is this system's only constant acceleration, and for a constant acceleration the
  // trapezoid is the exact solution — `v·dt + ½a·dt²` — while advancing by the end-of-step velocity
  // moves `v·dt + a·dt²`: the same distance plus or minus a half-step of gravity, too little while
  // the body climbs (g points down) and too much while it falls. That error is not decorative: it is
  // 0.09 m on a jump, which is the difference between a step and a wall. TDD.md §4 publishes
  // JUMP_VELOCITY 11 against GRAVITY 30, i.e. a 2.02 m single jump and a ~3.5 m combined ceiling,
  // and GDD.md §4 sells those two numbers as the readouts that "make every gap fair"; the
  // reachability law those numbers serve allows a vertical step of up to 3.4 m. Measured off the
  // shipped step loop before this line changed: a single jump rose 1.925 m and a double 3.35 m —
  // short of the published 2.02 and of the law's own 3.4 m budget — so the raised island, whose top
  // is 2.0 m and which the scene itself calls "a step up", could not be walked onto with one jump.
  // It is the discretisation, not the design, that made it a wall.
  //
  // Only Y. The horizontal axes have no constant acceleration to be exact about: in flight the
  // velocity is constant and the average equals it, so this would be a no-op, and under air control
  // the rate is a clamped ramp whose "exact" value the trapezoid would not find either. One axis
  // has the property, so one axis gets the fix.
  state.position.y += ((vyBeforeGravity + state.velocity.y) * 0.5) * dt
  resolveAxis('y', state, solids, hw, hh)
  resolveAxis('y', state, solids, hw, hh) // re-resolve in case of step-through on land

  if (state.grounded) {
    state.jumpsUsed = 0
  }

  return { deniedJump, jumpKind }
}

/**
 * Which face of a solid to leave by, on one horizontal axis: the NEAREST one.
 *
 * This used to be three rules. A body that moved along the axis was read as having entered through
 * the opposite face, and that sign was handed back as the exit; a body that never got inside was
 * answered by the nearer face. The nearer face was right, and the sign was a guess about history
 * that the resolver cannot see. Two earlier rounds closed the halves of it that were reachable at
 * rest — the `v == 0` half, and the half where the centre was outside the solid's span — and what
 * survived was the case where the centre is strictly INSIDE the span with momentum, where the sign
 * is not an entry witness at all: it only says which way the player is pressing.
 *
 * The reachable instance is a keeper who rises into the side ledge's underside and, in the air,
 * presses jump again. `GameSim` collides against `PLAYER_HALF_HEIGHT * bodyScaleY`, so a body one
 * frame after a launch is 31.5% taller than its nominal box, and the ceiling branch below pins its
 * feet at exactly `s.min.y - hh * 2` — flush with the underside. The launch beat then ASSIGNS the
 * stretch, so the second press grows `hh` back through that flush fit and the x-pass finally sees a
 * centre strictly inside the span. Measured through the shipped orchestrator and shipped input
 * (.vts-probes/r64-buried-exit.mjs, 150 recipes on the real level): worst single-frame sideways
 * displacement 4.1625 m — from x = 8.813 to 4.65, thrown 4.16 m WEST while the stick was held EAST —
 * and every one of the 26 sign-branch rows landed on the FAR face, which is the signature of this.
 *
 * Why the nearer face is not a new guess: a body entering through a face this step has travelled at
 * most `MOVE_SPEED * FIXED_DT` = 0.13333 m, so the face it entered by is the nearer one whenever the
 * solid is wider than `2 * 0.13333` = 0.26667 m. Every solid in this level is metres wide (plate 60,
 * island 10, ledge 4, pad 3), so on every shipped solid the two rules must agree on every entering
 * row — and the probe checks that rather than assuming it: 98 of 98 entering rows bit-identical
 * before and after, and 110 of 110 bodies standing in the open still move by exactly `v * dt`.
 *
 * The same probe sweeps the boundary deliberately, so the claim is not silently wider than it is:
 * on synthetic solids NARROWER than 0.26667 m the rules genuinely disagree and the results differ —
 * 990 of 1980 rows changed at widths 0.2/0.24/0.2667/0.3/0.5. No solid in this level is that thin,
 * and the two rounds this one replaces are both preserved BY CONSTRUCTION rather than by argument:
 * rounds #36 and #60 both fixed `v == 0` paths, and the collapsed function below IS that path, so
 * their results carry over bit-for-bit. The guard that used to hold `p <= min || p >= max` is gone
 * for the same reason — it was this same expression.
 *
 * What this does NOT claim: the underside route now exits through the near face, which is still a
 * sideways displacement of up to ~2.4 m where pushing the body back DOWN out of the underside would
 * be the fully correct answer. The y pass does own that face and does resolve it — it is what pins
 * the feet flush in the first place — but the horizontal pass cannot decide it without knowing the
 * body's vertical approach, so it is not attempted here. Two of the recipe rows come out very
 * slightly LONGER than they were (2.2642 -> 2.4358 m, 0.17 m) while flipping from being thrown
 * against the stick to being thrown along it, which is what the minimal-translation rule picks.
 */
function exitFace(p: number, min: number, max: number, hw: number): number {
  return p - min < max - p ? min - hw : max + hw
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
        p.x = exitFace(p.x, s.min.x, s.max.x, hw)
        state.velocity.x = 0
      } else if (axis === 'z') {
        p.z = exitFace(p.z, s.min.z, s.max.z, hw)
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
