// core/simulation/GameSim.ts — orchestrator: fixed-dt reducer over GameState. Pure (no DOM/three).
import { INTRO_DURATION } from '../constants'
import { LAYERS } from '../data/levels'
import type { GameState, InputState, LayerData, PhaseId } from '../types'
import { stepBullets } from './bullets'
import { resolveCollisions, solidifyFluids } from './collision'
import { stepPlayer } from './phasePhysics'
import { applyDeath, applyHazards, applyPickups, checkGate } from './pickups'

export function createInitialState(layerIndex: number, bestSwitches: Record<string, number>, totalPhaseDust: number): GameState {
  const src = LAYERS[layerIndex]
  // clone the mutable arrays (emitters track cooldown/destroyed; phaseFluids track solidified) so
  // a run never mutates the frozen LAYERS source (same bug class as the v3 wire-endpoint sink).
  const layer: LayerData = {
    ...src,
    emitters: src.emitters.map((em) => ({ ...em })),
    phaseFluids: src.phaseFluids.map((pf) => ({ ...pf })),
  }
  const shards = src.shards.map((sh) => ({ ...sh }))
  return {
    phase: 'layer_intro',
    player: {
      position: { ...layer.spawn },
      velocity: { x: 0, y: 0, z: 0 },
      phase: 'solid',
      switchCooldown: 0,
      grounded: true,
      jumpsUsed: 0,
      coyote: 0,
      jumpBuffer: 0,
      phaseDust: 0,
      checkpoint: { ...layer.spawn },
      layer: layerIndex + 1,
      dead: false,
      switches: 0,
      burstCooldown: 0,
      dispersed: 0,
      deaths: 0,
    },
    layer,
    layerIndex,
    shards,
    bullets: [],
    elapsed: 0,
    bestSwitches,
    totalPhaseDust,
    finished: false,
    frame: 0,
    introT: INTRO_DURATION,
  }
}

export const FIXED_DT = 1 / 60

export interface StepEvents {
  collected: string | null
  died: boolean
  gate: boolean
  dispersed: boolean
  reflected: boolean
  destroyedEmitter: string | null
}

export function step(s: GameState, input: InputState, dt: number): StepEvents {
  const out: StepEvents = { collected: null, died: false, gate: false, dispersed: false, reflected: false, destroyedEmitter: null }
  if (s.phase !== 'playing') return out

  stepPlayer(s, input, dt)

  // 固化造路 before collision so a just-frozen pool is walkable this frame
  solidifyFluids(s)
  resolveCollisions(s)

  // 相灵弹 (bullets) — may kill (solid) or disperse (liquid) or reflect (plasma)
  const bev = stepBullets(s, dt)
  if (bev.died) { out.died = true; return out }
  out.dispersed = bev.dispersed
  out.reflected = bev.reflected
  out.destroyedEmitter = bev.destroyed

  const { collectedId } = applyPickups(s)
  if (collectedId) out.collected = collectedId
  out.died = applyHazards(s) || applyDeath(s)
  out.gate = checkGate(s)
  if (out.gate) {
    s.phase = s.layerIndex >= LAYERS.length - 1 ? 'victory' : 'layer_clear'
    if (s.phase === 'victory') s.finished = true
  }
  return out
}

export function beginPlay(s: GameState): void {
  if (s.phase === 'layer_intro') s.phase = 'playing'
}

export function restartLayer(s: GameState): void {
  const fresh = createInitialState(s.layerIndex, s.bestSwitches, s.totalPhaseDust)
  Object.assign(s, fresh)
}

export function forcePhase(s: GameState, phase: PhaseId): void {
  s.player.phase = phase
  s.player.switchCooldown = 0
}
