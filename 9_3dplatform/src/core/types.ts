// Frozen data contracts (TDD.md §3). Platform-pure: no three / DOM types here.
export type GamePhase = 'boot' | 'menu' | 'playing' | 'paused'

export interface Vec3 {
  x: number
  y: number
  z: number
}

export type JumpState = 0 | 1 | 2

export interface PlayerState {
  position: Vec3 // bottom-center of the player AABB
  velocity: Vec3
  grounded: boolean
  jumpsUsed: JumpState
  coyote: number // seconds remaining (COYOTE_TIME)
  jumpBuffer: number // seconds remaining (JUMP_BUFFER_TIME)
}

// Input snapshot produced by the InputManager. jumpPressed / jumpReleased are
// edge signals so the pure integrator can do buffered + variable-height jumps.
export interface Input {
  moveX: number // -1..1
  moveZ: number // -1..1
  jumpPressed: boolean // edge-triggered (starts the buffer)
  jumpReleased: boolean // edge-triggered (variable-height cut)
}

// Axis-aligned bounding box solid (platform / island). Pure data.
export interface AABB {
  min: Vec3
  max: Vec3
}

export interface GameState {
  phase: GamePhase
  player: PlayerState
  realTime: number // honest wall-clock seconds (speedrun)
}
