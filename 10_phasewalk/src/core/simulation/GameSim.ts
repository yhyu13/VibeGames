// core/simulation/GameSim.ts — orchestrator: fixed-dt reducer over GameState. Pure (no DOM/three).
import { INTRO_DURATION, WIRE_EXIT_JUMP } from '../constants'
import { LAYERS } from '../data/levels'
import type { GameState, InputState, PhaseId } from '../types'
import { resolveCollisions } from './collision'
import { stepPlayer } from './phasePhysics'
import { applyDeath, applyHazards, applyPickups, checkGate } from './pickups'
import { applyPipes, applyVents, applyWires } from './traverse'

export function createInitialState(layerIndex: number, bestSwitches: Record<string, number>, totalPhaseDust: number): GameState {
  const layer = LAYERS[layerIndex]
  const shards = layer.shards.map((sh) => ({ ...sh }))
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
      wireReleased: false,
      deaths: 0,
    },
    layer,
    layerIndex,
    shards,
    elapsed: 0,
    bestSwitches,
    totalPhaseDust,
    finished: false,
    frame: 0,
    introT: INTRO_DURATION,
  }
}

export const FIXED_DT = 1 / 60

export function step(s: GameState, input: InputState, dt: number): { collected: string | null; died: boolean; gate: boolean } {
  const out = { collected: null as string | null, died: false, gate: false }
  if (s.phase !== 'playing') return out

  stepPlayer(s, input, dt)

  // traversal systems (per phase)
  const ridingPipe = applyPipes(s, dt)
  const wireState = applyWires(s, dt)
  const ridingWire = wireState !== false
  applyVents(s)

  // wire exit jump (polish U2): jump off the wire — released flag prevents re-capture
  if (ridingWire && input.jumpPressed) {
    s.player.velocity.y = WIRE_EXIT_JUMP
    s.player.wireReleased = true
  }

  if (!ridingPipe && !ridingWire) {
    resolveCollisions(s)
  }

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
