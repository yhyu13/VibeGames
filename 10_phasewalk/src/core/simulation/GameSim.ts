// core/simulation/GameSim.ts — orchestrator: fixed-dt reducer over GameState. Pure (no DOM/three).
import { LAYERS } from '../data/levels'
import type { GameState, InputState, LayerData, PhaseId } from '../types'
import { stepBullets } from './bullets'
import { resolveCollisions, solidifyFluids } from './collision'
import { stepPlayer } from './phasePhysics'
import { applyHazards, applyPickups, checkGate } from './pickups'
import { resolveTraps } from './traps'

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
      layer: layerIndex + 1,
      switches: 0,
      burstCooldown: 0,
      burstBuffer: 0,
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
  }
}

export const FIXED_DT = 1 / 60

export interface StepEvents {
  collected: string | null
  solidified: string | null
  died: boolean
  gate: boolean
  dispersed: boolean
  reflected: boolean
  destroyedEmitters: string[] // emitter ids destroyed by reflected bullets this step (multi-valued)
  jumped: boolean              // solid jumped
  burst: boolean               // plasma 爆冲 launched
  landed: boolean              // landed on ground/platform this frame
  fired: string[]              // emitter ids that fired a bullet this step
}

export function step(s: GameState, input: InputState, dt: number): StepEvents {
  const out: StepEvents = { collected: null, solidified: null, died: false, gate: false, dispersed: false, reflected: false, destroyedEmitters: [], jumped: false, burst: false, landed: false, fired: [] }
  if (s.phase !== 'playing') return out

  resolveTraps(s, input)   // 相位陷阱: 相锁区 cancels a switch request before movement

  const mev = stepPlayer(s, input, dt)
  out.jumped = mev.jumped
  out.burst = mev.burst

  // 固化造路 before collision so a just-frozen pool is walkable this frame
  out.solidified = solidifyFluids(s)
  out.landed = resolveCollisions(s).landed

  // 相灵弹 (bullets) — may kill (solid) or disperse (liquid) or reflect (plasma)
  const bev = stepBullets(s, dt)
  // Copy ALL bullet events before the death early-return: a solid death can coincide this frame with
  // an emitter fire (bev.fired) or a reflected-bullet boss kill (bev.destroyed) — the state DID mutate,
  // and dropping its event silently skips the muzzle-flash / destroy feedback in the engine.
  out.dispersed = bev.dispersed
  out.reflected = bev.reflected
  out.destroyedEmitters = bev.destroyed
  out.fired = bev.fired
  if (bev.died) { out.died = true; return out }

  const { collectedId } = applyPickups(s)
  if (collectedId) out.collected = collectedId
  out.died = applyHazards(s)
  // a death respawns the player to spawn — never also register a gate win this frame
  if (!out.died) out.gate = checkGate(s)
  if (out.gate) {
    s.phase = s.layerIndex >= LAYERS.length - 1 ? 'victory' : 'layer_clear'
    if (s.phase === 'victory') s.finished = true
    // record the min-switch score keyed by layer id (was gated on victory, silently losing non-final
    // layers' scores and dead-ending in layer_clear once LAYERS grows past F1). This is the RUN-
    // CUMULATIVE switches at each gate (switches is never reset), so the final layer's value = min
    // switches to clear the tower — VictoryScreen reads only that final value (summing inflates 3–5×).
    const k = s.layer.id
    s.bestSwitches[k] = Math.min(s.bestSwitches[k] ?? Infinity, s.player.switches)
  }
  return out
}

export function restartLayer(s: GameState): void {
  // R resets the FLOOR (shards/emitters/phaseFluids are re-cloned fresh) but NOT the run: switches /
  // deaths / elapsed are run-cumulative (advanceLayer carries them; bestSwitches reads the run-total
  // switches). phaseDust / totalPhaseDust are ALSO run-cumulative, but the floor's shards are re-cloned
  // as uncollected — so roll back the dust THIS floor contributed before re-cloning, or the same shards
  // can be re-collected to farm 相尘 (restart-until-perfect exploit).
  const { switches, deaths, phaseDust } = s.player
  const collectedThisFloor = s.shards.reduce((n, sh) => n + (sh.collected ? 1 : 0), 0)
  const elapsed = s.elapsed
  const fresh = createInitialState(s.layerIndex, s.bestSwitches, s.totalPhaseDust - collectedThisFloor)
  Object.assign(s, fresh)
  s.player.switches = switches
  s.player.deaths = deaths
  s.player.phaseDust = phaseDust - collectedThisFloor
  s.elapsed = elapsed
}

// Restart the whole climb from F1 (victory-screen R). Preserves the persistent accumulators
// (bestSwitches / totalPhaseDust) but drops the run-level stats, exactly like a fresh boot.
export function restartRun(s: GameState): void {
  const fresh = createInitialState(0, s.bestSwitches, s.totalPhaseDust)
  Object.assign(s, fresh)
  s.phase = 'playing'
}

// Advance to the next floor (layer_clear → next layer_intro). Carry the RUN-LEVEL accumulators
// (phaseDust / switches / deaths / elapsed) so the tower reads as one continuous climb — those are
// per-run stats, not per-layer; createInitialState zeroes them because it also serves fresh runs.
export function advanceLayer(s: GameState): void {
  const next = createInitialState(s.layerIndex + 1, s.bestSwitches, s.totalPhaseDust)
  next.player.phaseDust = s.player.phaseDust
  next.player.switches = s.player.switches
  next.player.deaths = s.player.deaths
  next.elapsed = s.elapsed
  Object.assign(s, next)
}

export function forcePhase(s: GameState, phase: PhaseId): void {
  s.player.phase = phase
  s.player.switchCooldown = 0
}
