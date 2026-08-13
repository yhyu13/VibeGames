// core/types.ts — frozen contracts (TDD §3). Platform-pure: zero three/react/zustand/DOM.
export type PhaseId = 'solid' | 'liquid' | 'gas' | 'plasma'
export type GamePhase = 'boot' | 'menu' | 'layer_intro' | 'playing' | 'paused' | 'layer_clear' | 'victory'
export type Vec3 = { x: number; y: number; z: number }

export interface PlayerState {
  position: Vec3
  velocity: Vec3
  phase: PhaseId
  switchCooldown: number        // seconds remaining (PHASE_SWITCH_COOLDOWN)
  grounded: boolean
  jumpsUsed: 0 | 1 | 2
  coyote: number
  jumpBuffer: number
  phaseDust: number             // 相尘 collected this run
  checkpoint: Vec3
  layer: number                 // 1-based
  dead: boolean
  switches: number              // total phase-switch count this run (min-switch score)
  wireReleased: boolean         // true after wire exit-jump until grounded/phase-switch (no re-capture)
}

export interface Platform {
  id: string
  phase: PhaseId
  min: Vec3
  max: Vec3
  kind: 'static' | 'moving'
  move?: { axis: 'x' | 'y' | 'z'; range: [number, number]; speed: number; phase: number }
}

export interface Pipe {
  id: string
  points: Vec3[]                // tube centerline
  radius: number
  flowSpeed: number             // + = toward points[last]
}

export interface Vent {
  id: string
  position: Vec3
  radius: number
  impulse: Vec3                 // per-second velocity added while inside
}

export interface Wire {
  id: string
  points: Vec3[]
  slideSpeed: number
}

export interface Shard {
  id: string
  phase: PhaseId                // only visible/collectible in this phase
  position: Vec3
  collected: boolean
  bobPhase: number
}

export interface LayerData {
  id: string
  name: string
  subtitle: string              // intro card line
  spawn: Vec3
  exit: Vec3                    // golden gate position
  platforms: Platform[]
  pipes: Pipe[]
  vents: Vent[]
  wires: Wire[]
  shards: Shard[]               // exactly 4
  theme: PhaseId
  hallHalf: [number, number, number]  // visual hall half-extents (x, y, z)
}

export interface InputState {
  x: number
  z: number
  jumpPressed: boolean          // edge-triggered
  jumpHeld: boolean
  switchPhase: PhaseId | null   // edge-triggered
  pause: boolean
}

export interface GameState {
  phase: GamePhase
  player: PlayerState
  layer: LayerData
  layerIndex: number
  shards: Shard[]
  elapsed: number               // layer timer, real time
  bestSwitches: Record<string, number>
  totalPhaseDust: number
  finished: boolean
  frame: number
  introT: number               // layer_intro countdown
}
