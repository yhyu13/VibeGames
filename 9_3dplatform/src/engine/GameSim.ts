// Orchestrator: owns phase state machine, honest wall-clock timer, and calls the
// pure integrator at a fixed timestep. Phase flow: menu → playing ⇄ paused.
import { FIXED_DT } from '../core/constants'
import { createPlayer, stepPlayer } from '../core/playerPhysics'
import type { AABB, GameState, Input } from '../core/types'

const SPAWN: [number, number, number] = [0, 2.2, 0]

// Cap catch-up steps per frame so a backgrounded/throttled tab can't bank a
// burst of fixed steps and dump it on resume.
const MAX_SUBSTEPS = 5

export class GameSim {
  readonly state: GameState
  // Fractional FIXED_DT carry between frames. The integrator only ever advances
  // in whole FIXED_DT steps, so jump feel is identical at 60Hz and 144Hz.
  private accumulator = 0

  constructor() {
    this.state = {
      phase: 'menu',
      player: createPlayer(...SPAWN),
      realTime: 0
    }
  }

  startLevel(): void {
    this.state.phase = 'playing'
    this.state.player = createPlayer(...SPAWN)
    this.state.realTime = 0
    this.accumulator = 0
  }

  togglePause(): void {
    if (this.state.phase === 'playing') this.state.phase = 'paused'
    else if (this.state.phase === 'paused') this.state.phase = 'playing'
  }

  // Advance the simulation. realDt is the raw wall-clock frame delta. The timer
  // is honest wall-clock (realDt), but the PHYSICS is stepped at a true fixed
  // timestep via an accumulator: a 144Hz frame runs the same number of FIXED_DT
  // steps per second as a 60Hz one, so jump height, coyote windows and fall speed
  // read identically on every display. Returns whether an air-jump press was
  // spent (denied) during the frame, for the renderer to cue; callers must not
  // double-count frame time.
  update(realDt: number, input: Input, solids: ReadonlyArray<AABB>): boolean {
    const phase = this.state.phase
    if (phase !== 'playing') return false

    this.state.realTime += realDt

    // Edge signals belong to the FRAME, not to each substep: feed jumpPressed /
    // jumpReleased on the first step only, then hold movement alone, so one press
    // is one jump no matter how many substeps this frame owes.
    const heldInput: Input = {
      moveX: input.moveX,
      moveZ: input.moveZ,
      jumpPressed: false,
      jumpReleased: false
    }
    this.accumulator += realDt
    let denied = false
    let stepInput = input
    let steps = 0
    while (this.accumulator >= FIXED_DT && steps < MAX_SUBSTEPS) {
      denied = stepPlayer(this.state.player, stepInput, FIXED_DT, solids).deniedJump || denied
      stepInput = heldInput
      this.accumulator -= FIXED_DT
      steps += 1
    }
    // Backlog capped: drop the remainder rather than bank it (no death spiral).
    if (steps === MAX_SUBSTEPS) this.accumulator = 0
    return denied
  }
}
