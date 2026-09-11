// Orchestrator: owns phase state machine, honest wall-clock timer, and calls the
// pure integrator at a fixed timestep. Phase flow: menu → playing ⇄ paused.
import {
  DENIED_DECAY,
  DENIED_SQUASH,
  DENIED_SQUASH_WIDE,
  FALL_OUT_Y,
  FIXED_DT,
  LAND_BEAT_MIN_IMPACT,
  LAND_SQUASH_MAX,
  LAND_SQUASH_PER_IMPACT,
  LAND_SQUASH_WIDE,
  LAUNCH_STRETCH_MAX,
  LAUNCH_STRETCH_PER_SPEED,
  LAUNCH_STRETCH_THIN,
  PLAYER_HALF_HEIGHT,
  SQUASH_DECAY
} from '../core/constants'
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
  jumpKind: JumpKind // WHICH launch this was, for consumers that must tell the two apart
  fellOut: boolean // the body left the world and was put back on the spawn ledge, this frame
  // The body's current shape, as scales about the nominal box. Published because the sim COLLIDES
  // against it: a renderer that re-derived the numbers would hold a second opinion about a body the
  // sim had already fixed, and the two would drift.
  bodyScaleX: number
  bodyScaleY: number
  // The body's horizontal velocity in m/s — the physics, not a look. Published for the same reason
  // the two scales above are: the renderer draws `renderPosition()`, which is interpolated between
  // fixed steps, so a velocity differenced out of two drawn frames is a smear of the sim's, not the
  // sim's. What the renderer makes of it is the renderer's business; the core publishes m/s and does
  // not know what a radian looks like.
  //
  // Read at the END of the frame, so it is the velocity the world actually left the body with: a
  // keeper pressed into a wall has that component zeroed by the resolve, and a body reported as
  // travelling along a wall it is not travelling along would be the renderer animating a motion that
  // did not happen.
  bodyVelX: number
  bodyVelZ: number
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
  // The body's shape. Amplitudes decay in real time; the beats that RE-ARM them are the previous
  // frame's, because a launch is discovered by the very step that applies it and that step needs the
  // shape before it runs (see applyBeats). The one-frame delay costs a frame of onset and buys the
  // invariant the renderer relies on: within any frame, the box the world resolved against and the
  // body the eye was shown are the same box.
  private landSquash = 0
  private launchStretch = 0
  private deniedSquash = 0
  // Last frame's beats, waiting to be spent on the shape.
  private beatLanded = false
  private beatLandImpact = 0
  private beatLaunchSpeed = 0
  private beatDenied = false

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
    this.state.realTime = 0
    this.respawn()
  }

  // Put the keeper back on the spawn ledge without touching the phase or the stopwatch. The only
  // cost a fall can honestly carry here is time: this level has no goal, so it has nothing to fail
  // toward, and the clock that keeps running through the climb back is the whole penalty.
  //
  // Clearing the ACCUMULATOR matters as much as the position, but not for the reason it looks like:
  // it is what ENDS the frame the catch is made in. See the branch that calls this — the loop's
  // unconditional `-= FIXED_DT` turns this zero into -FIXED_DT and the loop exits, dropping the
  // substeps the frame still owed. That is also why a catch fires exactly once per departure.
  //
  // The two edge clears below are BELT AND BRACES, not the thing that stops a hop. On the fall-out
  // path they are already false when they run: the substep loop clears both at the top of every
  // iteration, before `stepPlayer`. `startLevel` reaches them from `phase: 'menu'`, where `update`
  // early-returns and never latched an edge either. They are kept for a future caller that restarts
  // mid-play and should be re-examined, not trusted, if one appears. Note what they do NOT do: a
  // press on the frame AFTER a catch still launches (measured: `jumpKind = 'double'`, off the spawn
  // ledge, 9.5 m/s) — correctly, because that is a new press and this ran a frame earlier.
  private respawn(): void {
    this.state.player = createPlayer(...SPAWN)
    this.accumulator = 0
    this.prevPosition = copy(this.state.player.position)
    this.pendingJump = false
    this.pendingRelease = false
  }

  togglePause(): void {
    if (this.state.phase === 'playing') this.state.phase = 'paused'
    else if (this.state.phase === 'paused') this.state.phase = 'playing'
  }

  // Beats cross out in real time, not per step: "crosses out fast" is a wall-clock claim, so the
  // squeeze must last the same milliseconds at 144Hz as at 60.
  private decayBeats(dt: number): void {
    const squash = Math.exp(-dt * SQUASH_DECAY)
    this.landSquash *= squash
    this.launchStretch *= squash
    this.deniedSquash *= Math.exp(-dt * DENIED_DECAY)
  }

  // Spend the beats the PREVIOUS frame reported. This runs before the step that will report the next
  // one, which is what makes the shape single-valued for the whole frame: the collision box, the
  // published scales and the drawn mesh are all read from the same pair of numbers.
  private applyBeats(): void {
    if (this.beatLanded) {
      this.landSquash = Math.min(LAND_SQUASH_MAX, LAND_SQUASH_PER_IMPACT * this.beatLandImpact)
    }
    if (this.beatLaunchSpeed > 0) {
      this.launchStretch = Math.min(LAUNCH_STRETCH_MAX, LAUNCH_STRETCH_PER_SPEED * this.beatLaunchSpeed)
    }
    if (this.beatDenied) this.deniedSquash = DENIED_SQUASH
    this.beatLanded = false
    this.beatLandImpact = 0
    this.beatLaunchSpeed = 0
    this.beatDenied = false
  }

  // Wide+short on a landing, tall+thin on a launch, small on a spent press. The three never fire on
  // the same moment: a landing needs a fall, a launch needs a stand-or-air spring, a deny needs a
  // press with nothing left to spend.
  private scaleX(): number {
    return (1 + this.landSquash * LAND_SQUASH_WIDE) *
           (1 - this.launchStretch * LAUNCH_STRETCH_THIN) *
           (1 + this.deniedSquash * DENIED_SQUASH_WIDE)
  }

  private scaleY(): number {
    return (1 - this.landSquash) * (1 + this.launchStretch) * (1 - this.deniedSquash)
  }

  // Advance the simulation. realDt is the raw wall-clock frame delta; the caller
  // clamps it, so the accumulator can never bank a runaway backlog. The timer is
  // honest wall-clock (realDt), but the PHYSICS is stepped at a true fixed
  // timestep: a 144Hz frame runs the same number of FIXED_DT steps per second as
  // a 60Hz one, so jump height, coyote windows and fall speed read identically on
  // every display. Returns the beats the renderer has to cue this frame; callers
  // must not double-count frame time.
  update(realDt: number, input: Input, solids: ReadonlyArray<AABB>): SimFeedback {
    // The shape for THIS frame, taken once. Everything below — the collision box, the scales handed
    // back — reads these two numbers and nothing else, so the world and the eye cannot disagree.
    this.decayBeats(realDt)
    this.applyBeats()
    const bodyScaleX = this.scaleX()
    const bodyScaleY = this.scaleY()

    const phase = this.state.phase
    if (phase !== 'playing') {
      return { deniedJump: false, landBeat: false, landImpact: 0, jumpKind: 'none', fellOut: false, bodyScaleX, bodyScaleY, bodyVelX: 0, bodyVelZ: 0 }
    }

    this.state.realTime += realDt

    // Edges belong to the SIM, not to the frame that happened to carry them.
    if (input.jumpPressed) this.pendingJump = true
    if (input.jumpReleased) this.pendingRelease = true
    this.accumulator += realDt

    let denied = false
    let landImpact = 0
    let launchSpeed = 0
    let jumpKind: JumpKind = 'none'
    let fellOut = false
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
      const stepped = stepPlayer(this.state.player, stepInput, FIXED_DT, solids, PLAYER_HALF_HEIGHT * bodyScaleY)
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
      // Out of the world. Until now the sim had NO lower bound at all: the ground is a finite plate,
      // so walking off an edge dropped the keeper forever, with no test anywhere that could notice
      // and no way back. Tested AFTER the beats above, so the step that ends the fall still reports
      // whatever it did before the fall ended.
      //
      // The catch also ENDS the frame. `respawn` zeroes the accumulator, and the unconditional
      // `-= FIXED_DT` under this branch drives it to -FIXED_DT before the loop test reads it, so
      // the loop exits and the substeps this frame still owed are dropped. That is how a catch
      // fires exactly once per departure — the branch cannot be re-entered within the frame — but
      // it is worth saying out loud that it is this arithmetic that provides that, not a guard.
      // It is also the right behaviour: the teleport is a cut, and a cut does not spend the rest of
      // the frame walking. This block used to claim the other thing — that the remaining substeps
      // run from the spawn ledge and that clearing the accumulator is what lets them — which is the
      // exact inverse.
      if (this.state.player.position.y < FALL_OUT_Y) {
        fellOut = true
        this.respawn()
      }
      this.accumulator -= FIXED_DT
    }
    // The landing beat's floor is tested exactly once, here. Both consumers used to re-write the
    // comparison against the same constant — the same event decided in two places, free to drift
    // the moment one of them became `>=`. `landImpact` still travels alongside it: the predicate is
    // "did the beat fire", the number is how hard, and the squash and the thud both need the second.
    const landBeat = landImpact > LAND_BEAT_MIN_IMPACT
    // Hand this frame's beats to the shape, to be spent at the top of the next one.
    this.beatLanded = landBeat
    this.beatLandImpact = landImpact
    this.beatLaunchSpeed = launchSpeed
    this.beatDenied = denied

    return {
      deniedJump: denied, landBeat, landImpact, jumpKind, fellOut, bodyScaleX, bodyScaleY,
      bodyVelX: this.state.player.velocity.x, bodyVelZ: this.state.player.velocity.z
    }
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
