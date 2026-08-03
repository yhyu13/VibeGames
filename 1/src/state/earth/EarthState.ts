// Earth state factory and helpers.

import { signal } from '../signals.js';
import type { EarthState, PlayerBehavior } from '../types.js';
import type { ElementId } from '../id.js';
import type { OrbitalLane } from '../id.js';

export function createEarthState(): EarthState {
  const weaponUse = signal<Record<string, number>>({} as Record<string, number>);
  const laneUse = signal<Record<string, number>>({
    high: 0, low: 0, atmosphere: 0,
  });

  return {
    planetaryIntegrity: signal(100),
    humanResolve: signal(100),
    globalPanic: signal(0),
    humanUnity: signal(60),
    networkControl: signal(0),
    alienExposure: signal(0),
    biosphereStability: signal(100),
    escalationPhase: signal(1),
    responseClock: signal(0),
    regions: signal({}),
    activeConditions: signal([]),
    activeCounter: signal(null),
    nextCounter: signal(null),
    playerBehavior: {
      weaponUse,
      laneUse,
      regionTargeting: signal({}),
      destructionRatio: signal(0.5),
      shieldReliance: signal(0),
    },
  };
}

export function clampEarthStat(v: number): number {
  return Math.max(0, Math.min(100, v));
}

export function adjustEarthStat(
  state: EarthState,
  key: 'planetaryIntegrity' | 'humanResolve' | 'globalPanic' | 'humanUnity' | 'networkControl' | 'alienExposure' | 'biosphereStability',
  delta: number
): void {
  const sig = state[key];
  sig.value = clampEarthStat(sig.value + delta);
}

export function recordWeaponUse(state: EarthState, element: ElementId, lane: OrbitalLane): void {
  const w: Record<string, number> = { ...(state.playerBehavior.weaponUse.value as Record<string, number>) };
  w[String(element)] = (w[String(element)] ?? 0) + 1;
  state.playerBehavior.weaponUse.value = w as never;
  const l: Record<string, number> = { ...(state.playerBehavior.laneUse.value as Record<string, number>) };
  const lk = String(lane) as 'high' | 'low' | 'atmosphere';
  (l as Record<'high' | 'low' | 'atmosphere', number>)[lk] = (l[lk] ?? 0) + 1;
  state.playerBehavior.laneUse.value = l as never;
}