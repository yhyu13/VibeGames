// Snapshot/Restore: convert live signal-backed state to/from a plain JSON-safe snapshot.

import type { RunState, RunStateSnapshot, EarthSnapshot, RegionSnapshot } from '../types.js';
import type { VisualState, FactionAttitude } from '../types.js';

export function snapshotRun(run: RunState): RunStateSnapshot {
  const earth = run.earth;
  const regions: RegionSnapshot[] = [];
  for (const r of Object.values(earth.regions.peek())) {
    regions.push({
      id: r.id,
      visualState: r.visualState.peek() as VisualState,
      hp: r.hp.peek(),
      shield: r.shield.peek(),
      resourceStockpile: r.resourceStockpile.peek(),
      factionAttitude: r.factionAttitude.peek() as FactionAttitude,
      faction: r.faction,
    });
  }
  const earthSnap: EarthSnapshot = {
    planetaryIntegrity: earth.planetaryIntegrity.peek(),
    humanResolve: earth.humanResolve.peek(),
    globalPanic: earth.globalPanic.peek(),
    humanUnity: earth.humanUnity.peek(),
    networkControl: earth.networkControl.peek(),
    alienExposure: earth.alienExposure.peek(),
    biosphereStability: earth.biosphereStability.peek(),
    escalationPhase: earth.escalationPhase.peek(),
    responseClock: earth.responseClock.peek(),
    regions,
    activeConditions: earth.activeConditions.peek().map((c) => String(c)),
    activeCounter: earth.activeCounter.peek()?.id ?? null,
    nextCounter: earth.nextCounter.peek()?.id ?? null,
  };
  return {
    seed: run.seed.peek(),
    commander: run.commander,
    archetype: run.archetype,
    earth: earthSnap,
    ship: {
      hull: run.ship.hull.peek(),
      hullMax: run.ship.hullMax.peek(),
      shield: run.ship.shield.peek(),
      shieldMax: run.ship.shieldMax.peek(),
      energy: run.ship.energy.peek(),
      energyMax: run.ship.energyMax.peek(),
      heat: run.ship.heat.peek(),
      signal: run.ship.signal.peek(),
      instability: run.ship.instability.peek(),
      position: run.ship.position.peek(),
      weapons: run.ship.weapons.peek(),
      modules: run.ship.modules.peek(),
      adaptations: run.ship.adaptations.peek().map((a) => String(a)),
      activeBurdens: run.ship.activeBurdens.peek().map((b) => String(b)),
    },
    victory: {
      annihilation: run.victory.annihilation.peek(),
      submission: run.victory.submission.peek(),
      digital: run.victory.digital.peek(),
      fracture: run.victory.fracture.peek(),
    },
    events: run.events.peek(),
    clock: run.clock.peek(),
  };
}

export function restoreRunSnapshot(snap: RunStateSnapshot): RunState {
  // Lightweight factory used only when restoring from disk; full hydration is
  // handled by Game.ts orchestrator. This avoids pulling Three.js into state.
  return {
    seed: { value: snap.seed } as never,
    commander: snap.commander,
    archetype: snap.archetype,
    earth: {} as never,
    ship: {} as never,
    victory: {
      annihilation: { value: snap.victory.annihilation } as never,
      submission: { value: snap.victory.submission } as never,
      digital: { value: snap.victory.digital } as never,
      fracture: { value: snap.victory.fracture } as never,
    },
    events: { value: snap.events } as never,
    encounter: { value: null } as never,
    clock: { value: snap.clock } as never,
    outcome: { value: null } as never,
  };
}