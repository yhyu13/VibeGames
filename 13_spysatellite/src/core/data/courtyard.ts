// core/data/courtyard.ts — 20 m layout + 7-beat script (pure data).
import type { Aabb, Entity, EntityId, RadioBeat, Vec2 } from '../types'
import { COURTYARD_SIZE } from '../constants'

export const HALF = COURTYARD_SIZE / 2

export const WEST_WING: Aabb = { min: { x: -10, z: -8 }, max: { x: -5, z: 8 }, h: 8 }
export const EAST_WING: Aabb = { min: { x: 5, z: -8 }, max: { x: 10, z: 8 }, h: 8 }
export const CANOPY_BOX: Aabb = { min: { x: -2.2, z: -5.0 }, max: { x: 1.2, z: -2.4 }, h: 3.2 }
export const EAST_ALLEY_BOX: Aabb = { min: { x: 5.2, z: 6.0 }, max: { x: 9.4, z: 9.4 }, h: 0.05 }
export const WEST_ALLEY_BOX: Aabb = { min: { x: -4.4, z: 5.5 }, max: { x: -1.0, z: 9.2 }, h: 0.05 }

export interface Waypoint {
  t: number
  x: number
  z: number
}

export const VIP_PATH: Waypoint[] = [
  { t: 0, x: 0.0, z: 0.6 },
  { t: 18, x: 0.2, z: 0.4 },
  { t: 26, x: 0.0, z: -3.3 },
  { t: 36, x: -3.6, z: 2.4 },
  { t: 46, x: 1.4, z: 1.0 },
  { t: 56, x: 0.4, z: -1.1 },
  { t: 64, x: 0.0, z: -3.1 },
  { t: 72, x: -2.1, z: 3.2 },
  { t: 78, x: 0.3, z: 0.8 },
  { t: 90, x: 0.3, z: 1.3 },
]

export const GUARD_W1_PATH: Waypoint[] = [
  { t: 0, x: -6.4, z: 5.4 },
  { t: 20, x: -6.8, z: 6.6 },
  { t: 40, x: -5.8, z: 5.0 },
  { t: 60, x: -6.6, z: 6.2 },
  { t: 90, x: -6.3, z: 5.5 },
]

export const GUARD_W2_PATH: Waypoint[] = [
  { t: 0, x: -5.6, z: 6.2 },
  { t: 22, x: -5.2, z: 5.2 },
  { t: 44, x: -6.0, z: 6.8 },
  { t: 66, x: -5.4, z: 5.6 },
  { t: 90, x: -5.7, z: 6.1 },
]

export const VAN_POS: Vec2 = { x: 7.2, z: -3.1 }
export const KT_POS: Vec2 = { x: 2.6, z: 6.4 }
export const CANOPY_POS: Vec2 = { x: -0.5, z: -3.7 }
export const EAST_ALLEY_POS: Vec2 = { x: 7.3, z: 7.7 }
export const WEST_ALLEY_POS: Vec2 = { x: -2.7, z: 7.4 }

export const RADIO_BEATS: RadioBeat[] = [
  {
    id: 1, t: 22, window: 8, prompt: 'VIP visual?', accept: ['vip'], txTag: 'VISUAL',
    failTitle: 'NO EYES',
    failLine: "You told KT the VIP wasn't there. They never close the window, and the detail slips the block.",
  },
  {
    id: 2, t: 32, window: 8, prompt: 'West door count', accept: ['guard_w1', 'guard_w2'], txTag: '2 GDS',
    failTitle: 'WRONG DOOR',
    failLine: 'KT storms the west doors you miscounted and walks into a post that was never empty.',
  },
  {
    id: 3, t: 42, window: 8, prompt: 'Van — idle or hot?', accept: ['van'], txTag: 'IDLE',
    failTitle: 'HOT VAN',
    failLine: 'KT creeps to a "cold" van that was already running. The engine bark gives the detail time to scatter.',
  },
  {
    id: 4, t: 52, window: 8, prompt: 'Police inbound?', accept: ['east_alley'], txTag: 'CLEAR',
    failTitle: 'CORDON',
    failLine: 'You called the east alley clear, but the cordon rolls in. KT hits the police line and breaks off.',
  },
  {
    id: 5, t: 62, window: 8, prompt: 'Canopy — still covering?', accept: ['canopy'], txTag: 'COVER',
    failTitle: 'EXPOSED',
    failLine: "You gave a canopy GO it didn't deserve. KT fires as the VIP clears cover and the round hits dirt.",
  },
  {
    id: 6, t: 70, window: 6, prompt: 'LOS west alley', accept: ['west_alley'], txTag: 'LOS OK',
    failTitle: 'WATCHED',
    failLine: 'You cleared the west alley, but a guard is mid-post. KT is made in the open and has to withdraw.',
  },
  {
    id: 7, t: 78, window: 4, prompt: 'GO window', accept: ['vip'], txTag: 'GO',
    failTitle: 'NO GO',
    failLine: 'The GO never hit the wire. KT waits out the window and the shot is gone.',
  },
]

export function spawnEntities(): Record<EntityId, Entity> {
  return {
    vip: { id: 'vip', kind: 'person', pos: { x: VIP_PATH[0].x, z: VIP_PATH[0].z }, radius: 0.55, down: false },
    guard_w1: { id: 'guard_w1', kind: 'person', pos: { ...GUARD_W1_PATH[0] }, radius: 0.45, down: false },
    guard_w2: { id: 'guard_w2', kind: 'person', pos: { ...GUARD_W2_PATH[0] }, radius: 0.45, down: false },
    van: { id: 'van', kind: 'vehicle', pos: { ...VAN_POS }, radius: 1.4, down: false },
    kt: { id: 'kt', kind: 'person', pos: { ...KT_POS }, radius: 0.5, down: false },
    canopy: { id: 'canopy', kind: 'structure', pos: { ...CANOPY_POS }, radius: 2.2, down: false },
    east_alley: { id: 'east_alley', kind: 'marker', pos: { ...EAST_ALLEY_POS }, radius: 2.0, down: false },
    west_alley: { id: 'west_alley', kind: 'marker', pos: { ...WEST_ALLEY_POS }, radius: 1.8, down: false },
  }
}

export function pointInAabb(p: Vec2, box: Aabb): boolean {
  return p.x >= box.min.x && p.x <= box.max.x && p.z >= box.min.z && p.z <= box.max.z
}

export function lerpPath(path: Waypoint[], t: number): Vec2 {
  if (t <= path[0].t) return { x: path[0].x, z: path[0].z }
  const last = path[path.length - 1]
  if (t >= last.t) return { x: last.x, z: last.z }
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i]
    const b = path[i + 1]
    if (t >= a.t && t <= b.t) {
      const u = (t - a.t) / (b.t - a.t)
      return { x: a.x + (b.x - a.x) * u, z: a.z + (b.z - a.z) * u }
    }
  }
  return { x: last.x, z: last.z }
}
