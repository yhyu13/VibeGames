// Orchestrator: owns phase state machine, honest wall-clock timer, and calls the
// pure integrator at a fixed timestep. Phase flow: menu → playing ⇄ paused.
import { FIXED_DT } from '../core/constants'
import { createPlayer, stepPlayer } from '../core/playerPhysics'
import type { AABB, GameState, Input, Vec3 } from '../core/types'

const SPAWN: [number, number, number] = [0, 2.2, 0]

function copy(v: Vec3): Vec3 {
  return { x: v.x, y: v.y, z: v.z }
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
  // every display. Returns whether an air-jump press was spent (denied) during
  // the frame, for the renderer to cue; callers must not double-count frame time.
  update(realDt: number, input: Input, solids: ReadonlyArray<AABB>): boolean {
    const phase = this.state.phase
    if (phase !== 'playing') return false

    this.state.realTime += realDt

    // Edges belong to the SIM, not to the frame that happened to carry them.
    if (input.jumpPressed) this.pendingJump = true
    if (input.jumpReleased) this.pendingRelease = true
    this.accumulator += realDt

    let denied = false
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
      this.prevPosition = copy(this.state.player.position)
      denied = stepPlayer(this.state.player, stepInput, FIXED_DT, solids).deniedJump || denied
      this.accumulator -= FIXED_DT
    }
    return denied
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
