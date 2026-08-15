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
  switches: number              // total phase-switch count this run (min-switch score)
  burstCooldown: number         // plasma 爆冲 cooldown (seconds)
  burstBuffer: number           // plasma air-redirect press buffered across the cooldown (no silent eat)
  dispersed: number             // liquid 被子弹打散 flash timer (visual feedback)
  deaths: number                // death count — respawn is ALWAYS at layer spawn (no same-point retry)
}

export interface Platform {
  id: string
  phase: PhaseId
  min: Vec3
  max: Vec3
  kind: 'static' | 'moving'
  move?: { axis: 'x' | 'y' | 'z'; range: [number, number]; speed: number; phase: number }
  gold?: boolean                // route platform — golden outline (锁链金, art-direction §3.1)
}

export interface Hazard {
  id: string
  min: Vec3
  max: Vec3
  phases: PhaseId[] | 'all'     // which phases it kills (无相区 = 'all')
  name: string                  // 无相区 / 雷云 ...
}

// 相液池 (phase-fluid pool) — intangible by default; SOLID phase freezes it into a walkable platform
// (matter verb 固化造路). Other phases pass through it.
export interface PhaseFluid {
  id: string
  min: Vec3
  max: Vec3
  solidified: boolean           // frozen → acts as a solid platform (persists this run)
}

// 相灵弹 (bullet) — neutral projectile from an Emitter; interaction is decided by the PLAYER's phase.
export interface Bullet {
  id: string
  position: Vec3
  velocity: Vec3
  reflected: boolean            // true after plasma absorbs it → homes back toward its emitter
  emitterId: string             // source emitter (reflection target)
  life: number                  // seconds remaining before despawn
}

// 相灵眼 (emitter) — stationary turret that periodically fires bullets.
export interface Emitter {
  id: string
  position: Vec3
  aim: Vec3 | 'player'          // fixed aim direction, or track the player
  interval: number              // seconds between shots
  speed: number                 // bullet speed
  cooldown: number              // time until next shot
  destroyed: boolean            // destroyed by a reflected bullet
}

export interface Shard {
  id: string
  phase: PhaseId                // only visible/collectible in this phase
  position: Vec3
  collected: boolean
  bobPhase: number
}

// 相位陷阱 (M3 对抗式切相) — static constraints that pressure the switching verb:
//   phase_lock  = 相锁区 (forbid switching inside; choose the phase BEFORE entering)
//   phase_fence = 逆相栅 (a wall only its own phase passes through; blocks all other phases)
export type TrapKind = 'phase_lock' | 'phase_fence'
export interface Trap {
  id: string
  kind: TrapKind
  phase: PhaseId                // phase_fence: the phase that passes THROUGH (blocks all others);
                                // phase_lock: unused (the region is phase-agnostic)
  min: Vec3
  max: Vec3
}

export interface LayerData {
  id: string
  name: string
  subtitle: string              // intro card line
  spawn: Vec3
  exit: Vec3                    // golden gate position
  platforms: Platform[]
  phaseFluids: PhaseFluid[]
  emitters: Emitter[]
  shards: Shard[]               // exactly 4
  hazards: Hazard[]
  traps: Trap[]                  // 相位陷阱 (M3): 相锁区 / 逆相栅
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
  bullets: Bullet[]
  elapsed: number               // layer timer, real time
  bestSwitches: Record<string, number>
  totalPhaseDust: number
  finished: boolean
  frame: number
}
