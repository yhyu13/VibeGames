// core/types.ts — frozen contracts (TDD). Platform-pure: zero three/react/zustand/DOM.

export type EntityId =
  | 'vip'
  | 'guard_w1'
  | 'guard_w2'
  | 'van'
  | 'kt'
  | 'canopy'
  | 'east_alley'
  | 'west_alley'

export type EntityKind = 'person' | 'vehicle' | 'structure' | 'marker'

export type GamePhase = 'boot' | 'playing' | 'paused' | 'ended'

export type EndReason = 'win' | 'abort' | 'miss' | 'timeout' | 'lockdrop'

export type BeatResult = 'pass' | 'fail' | null

export type LockDropReason = 'canopy' | 'sar_off' | 'overheat' | 'zoom'

export interface Vec2 {
  x: number
  z: number
}

export interface Aabb {
  min: Vec2
  max: Vec2
  h: number
}

export interface Entity {
  id: EntityId
  kind: EntityKind
  pos: Vec2
  radius: number
  down: boolean
}

export interface RadioBeat {
  id: number
  t: number
  window: number
  prompt: string
  accept: EntityId[]
  txTag: string
}

export interface TickInput {
  zoom01: number
  sarHeld: boolean
  clickId: EntityId | null
}

export interface SensorState {
  sarOn: boolean
  heat: number
  overheatTimer: number
}

export interface LockState {
  held: boolean
  targetId: EntityId | null
  canopyTimer: number
  sarOffTimer: number
  heldFor: number
}

export interface TxEntry {
  t: number
  tag: string
  ok: boolean
  beat: number
}

export interface RadioState {
  liveBeat: number | null
  results: BeatResult[]
  fails: number
  lastTx: string | null
  log: TxEntry[]
}

export interface GameState {
  phase: GamePhase
  elapsed: number
  zoom01: number
  entities: Record<EntityId, Entity>
  sensor: SensorState
  lock: LockState
  radio: RadioState
  end: EndReason | null
  shot: boolean
  frame: number
}

export type SimEvent =
  | { type: 'sound'; sound: string }
  | { type: 'beatStart'; beat: number }
  | { type: 'beatPass'; beat: number; tag: string }
  | { type: 'beatFail'; beat: number }
  | { type: 'lockAcquire' }
  | { type: 'lockDrop'; reason: LockDropReason }
  | { type: 'overheat' }
  | { type: 'shot' }
  | { type: 'end'; reason: EndReason }
