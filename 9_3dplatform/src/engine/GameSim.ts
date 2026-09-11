// Orchestrator: owns phase state machine, honest wall-clock timer, and calls the
// pure integrator at a fixed timestep. Phase flow: menu → playing ⇄ paused.
import { FIXED_DT, LAND_BEAT_MIN_IMPACT } from '../core/constants'
import { createPlayer, stepPlayer } from '../core/playerPhysics'
import type { JumpKind } from '../core/playerPhysics'
import type { AABB, GameState, Input, Vec3 } from '../core/types'

const SPAWN: [number, number, number] = [0, 2.2, 0]

function copy(v: Vec3): Vec3 {
  return { x: v.x, y: v.y, z: v.z }
}

// What the renderer must be TOLD about this frame, because it can no longer derive
// it: playerPos is interpolated between fixed steps, so a one-frame velocity edge
// on the drawn stream is smeared across several frames and never fires.
export interface SimFeedback {
  deniedJump: boolean // an air-jump press was spent (both jumps gone, no ground)
  landBeat: boolean // the touchdown cleared the beat floor — decided HERE, never re-tested below
  landImpact: number // m/s downward at touchdown; 0 when the frame had no landing
  launchSpeed: number // m/s upward at takeoff; 0 when the frame had no launch
  jumpKind: JumpKind // WHICH launch this was, for consumers that must tell the two apart
}

export class GameSim {
  readonly state: GameState
  // Fractional FIXED_DT carry between frames. The integrator only ever advances
  // in whole FIXED_DT steps, so jump feel is identical at 60Hz and 144Hz.
  private accumulator = 0
  // Where the last fixed step STARTED; renderPosition() lerps from here to the
  // stepped position so the renderer never sees the sim's discrete jumps.
  private prevPosition: Vec3
  // Input edges are HELD until a step actually runs. Above 60Hz most frames owe
  // zero steps, and InputManager.sample() has already cleared the edge by the
  // time a later frame steps — so an unheld press is dropped outright (~58% of
  // presses at 144Hz) and a lost release silently becomes a full-height jump.
  private pendingJump = false
  private pendingRelease = false

  constructor() {
    this.state = {
      phase: 'menu',
      player: createPlayer(...SPAWN),
      realTime: 0
    }
    this.prevPosition = copy(this.state.player.position)
  }

  startLevel(): void {
    this.state.phase = 'playing'
    this.state.player = createPlayer(...SPAWN)
    this.state.realTime = 0
    this.accumulator = 0
    this.prevPosition = copy(this.state.player.position)
    this.pendingJump = false
    this.pendingRelease = false
  }

  togglePause(): void {
    if (this.state.phase === 'playing') this.state.phase = 'paused'
    else if (this.state.phase === 'paused') this.state.phase = 'playing'
  }

  // Advance the simulation. realDt is the raw wall-clock frame delta; the caller
  // clamps it, so the accumulator can never bank a runaway backlog. The timer is
  // honest wall-clock (realDt), but the PHYSICS is stepped at a true fixed
  // timestep: a 144Hz frame runs the same number of FIXED_DT steps per second as
  // a 60Hz one, so jump height, coyote windows and fall speed read identically on
  // every display. Returns the beats the renderer has to cue this frame; callers
  // must not double-count frame time.
  update(realDt: number, input: Input, solids: ReadonlyArray<AABB>): SimFeedback {
    const phase = this.state.phase
    if (phase !== 'playing') return { deniedJump: false, landBeat: false, landImpact: 0, launchSpeed: 0, jumpKind: 'none' }

    this.state.realTime += realDt

    // Edges belong to the SIM, not to the frame that happened to carry them.
    if (input.jumpPressed) this.pendingJump = true
    if (input.jumpReleased) this.pendingRelease = true
    this.accumulator += realDt

    let denied = false
    let landImpact = 0
    let launchSpeed = 0
    let jumpKind: JumpKind = 'none'
    while (this.accumulator >= FIXED_DT) {
      // The first step this frame consumes the held edges; later substeps get
      // movement alone, so one press stays one jump however many steps are owed.
      const stepInput: Input = {
        moveX: input.moveX,
        moveZ: input.moveZ,
        jumpPressed: this.pendingJump,
        jumpReleased: this.pendingRelease
      }
      this.pendingJump = false
      this.pendingRelease = false
      const wasGrounded = this.state.player.grounded
      const prevVy = this.state.player.velocity.y
      const fallSpeed = -prevVy
      this.prevPosition = copy(this.state.player.position)
      const stepped = stepPlayer(this.state.player, stepInput, FIXED_DT, solids)
      denied = stepped.deniedJump || denied
      if (stepped.jumpKind !== 'none') jumpKind = stepped.jumpKind
      // Touchdown = the step that took the body from airborne to grounded. Signaled
      // rather than left to the renderer to infer (see SimFeedback above).
      if (!wasGrounded && this.state.player.grounded && fallSpeed > 0) {
        landImpact = Math.max(landImpact, fallSpeed)
      }
      // Takeoff = a step that INCREASED upward velocity. Gravity only ever
      // decreases vy and ground resolution only zeroes it, so a rise is the jump
      // impulse and nothing else — which also catches a double jump taken while
      // still rising, missed by the derived edge's `prevVy < 2`. Amplitude is
      // unchanged: post-step vy is 11 - 30/60 = 10.5 on a first jump, 9.5 - 0.5 =
      // 9.0 on a double, matching what the healthy derived path measured.
      const vy = this.state.player.velocity.y
      if (vy > prevVy && vy > 0) launchSpeed = Math.max(launchSpeed, vy)
      this.accumulator -= FIXED_DT
    }
    // The landing beat's floor is tested exactly once, here. Both consumers used to re-write the
    // comparison against the same constant — the same event decided in two places, free to drift
    // the moment one of them became `>=`. `landImpact` still travels alongside it: the predicate is
    // "did the beat fire", the number is how hard, and the squash and the thud both need the second.
    return { deniedJump: denied, landBeat: landImpact > LAND_BEAT_MIN_IMPACT, landImpact, launchSpeed, jumpKind }
  }

  // Position to DRAW this frame. The stepped position always sits up to one whole
  // FIXED_DT behind the wall clock, so at 144Hz it would advance only on the ~41%
  // of frames that owe a step — a judder against the smoothly damped camera.
  // Lerp from where the last step started to where it landed, by the fraction of
  // a step still in the accumulator.
  renderPosition(): Vec3 {
    const cur = this.state.player.position
    const alpha = this.accumulator / FIXED_DT
    return {
      x: this.prevPosition.x + (cur.x - this.prevPosition.x) * alpha,
      y: this.prevPosition.y + (cur.y - this.prevPosition.y) * alpha,
      z: this.prevPosition.z + (cur.z - this.prevPosition.z) * alpha
    }
  }
}
