// Orchestrator: owns phase state machine, honest wall-clock timer, and calls the
// pure integrator at a fixed timestep. Phase flow: menu → playing ⇄ paused.
import { FIXED_DT } from '../core/constants'
import { createPlayer, stepPlayer } from '../core/playerPhysics'
import type { AABB, GameState, Input } from '../core/types'

const SPAWN: [number, number, number] = [0, 2.2, 0]

export class GameSim {
  readonly state: GameState

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
  }

  togglePause(): void {
    if (this.state.phase === 'playing') this.state.phase = 'paused'
    else if (this.state.phase === 'paused') this.state.phase = 'playing'
  }

  // Advance the simulation. realDt is the raw wall-clock frame delta; the sim
  // runs its integrator at a fixed timestep. Returns the real dt used for the
  // honest timer so it is frame-rate independent.
  update(realDt: number, input: Input, solids: ReadonlyArray<AABB>): number {
    const phase = this.state.phase
    if (phase !== 'playing') return 0

    this.state.realTime += realDt

    stepPlayer(this.state.player, input, FIXED_DT, solids)
    return realDt
  }
}
