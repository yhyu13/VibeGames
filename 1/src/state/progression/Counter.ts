// Adaptive Earth counter engine.
// Tracks player behavior, picks a counter at each escalation transition.

import type { CounterDef, EarthState, PlayerBehavior, ShipState, RunState } from '../types.js';
import type { ElementId, OrbitalLane } from '../id.js';
import { asElementId } from '../id.js';

export type { CounterDef };

const COUNTER_POOL: CounterDef[] = [
  {
    id: 'kinetic-counter',
    name: 'Reactive Armor',
    description: 'Earth coats defenses in reactive plates. Kinetic damage reduced by 50%.',
    triggerCondition: (b) => b.weaponUse.value['kinetic' as ElementId] ?? 0,
    effect: 'global:kinetic-resist',
    telegraphTicks: 180,
  },
  {
    id: 'plasma-counter',
    name: 'Plasma Sinks',
    description: 'Defenses vent plasma-absorbing vapor. Plasma damage reduced by 50%.',
    triggerCondition: (b) => b.weaponUse.value['plasma' as ElementId] ?? 0,
    effect: 'global:plasma-resist',
    telegraphTicks: 180,
  },
  {
    id: 'electric-counter',
    name: 'Grounded Hulls',
    description: 'All defenses grounded against electric attacks. Electric damage halved.',
    triggerCondition: (b) => b.weaponUse.value['electric' as ElementId] ?? 0,
    effect: 'global:electric-resist',
    telegraphTicks: 180,
  },
  {
    id: 'low-orbit-trap',
    name: 'Low Orbit Ambush',
    description: 'Heavy defenses concentrate in low orbit. Low lane defenses fire twice as often.',
    triggerCondition: (b) => b.laneUse.value['low' as OrbitalLane] ?? 0,
    effect: 'low-orbit:double-fire',
    telegraphTicks: 180,
  },
  {
    id: 'high-orbit-jam',
    name: 'High Orbit Jam',
    description: 'Jammers blanket high orbit. Ship Signal regen reduced to 0.',
    triggerCondition: (b) => b.laneUse.value['high' as OrbitalLane] ?? 0,
    effect: 'high-orbit:jam-signal',
    telegraphTicks: 180,
  },
  {
    id: 'propaganda-shield',
    name: 'Info Curtain',
    description: 'Factions only receive vetted broadcasts. Propaganda outcomes halved.',
    triggerCondition: (b) => 1 - b.destructionRatio.peek(),
    effect: 'propaganda:half-effect',
    telegraphTicks: 180,
  },
  {
    id: 'cyber-hunter',
    name: 'Cyber Hunter Satellites',
    description: 'AI satellites hunt intrusions. Puzzle detection rises 50% faster.',
    triggerCondition: (b) => b.destructionRatio.peek() < 0.4 ? 1 : 0,
    effect: 'puzzle:faster-detection',
    telegraphTicks: 180,
  },
  {
    id: 'shield-breaker',
    name: 'Shield Breaker Drones',
    description: 'Drones auto-target shield users. Ship shield regen halved.',
    triggerCondition: (b) => b.shieldReliance.peek(),
    effect: 'ship:shield-regen-halved',
    telegraphTicks: 180,
  },
  {
    id: 'nuclear-first-strike',
    name: 'Nuclear First Strike',
    description: 'A nuke launches immediately at phase 3. Telegraphed for 4 seconds.',
    triggerCondition: () => 1,
    effect: 'phase3:force-missile',
    telegraphTicks: 240,
  },
];

/** Pick counter using seeded RNG + weighted scoring against player history. */
export function pickCounter(
  behavior: PlayerBehavior,
  rng: { weighted<T>(items: ReadonlyArray<T>, weights: ReadonlyArray<number>): T }
): CounterDef {
  const scored = COUNTER_POOL.map((c) => ({ c, score: c.triggerCondition(behavior) + 0.01 }));
  scored.sort((a, b) => b.score - a.score);
  const top3 = scored.slice(0, 3);
  const weights = [0.6, 0.3, 0.1];
  return rng.weighted(top3.map((s) => s.c), weights);
}

export function telegraphCounter(earth: EarthState, next: CounterDef): void {
  earth.nextCounter.value = next;
}

export function activateCounter(earth: EarthState, ship: ShipState): void {
  const c = earth.nextCounter.peek();
  if (!c) return;
  earth.activeCounter.value = c;
  earth.nextCounter.value = null;
}

/**
 * Apply counter effects every tick. Real effects touch the live state.
 */
export function applyCounterEffects(
  run: RunState,
  defenses: { hp: number; lane: string; type: string }[],
  _missiles: { intercepted: boolean }[]
): void {
  const c = run.earth.activeCounter.peek();
  if (!c) return;
  const fx = c.effect;

  // global element-resist counters tag defenses so Damage.ts can compute the reduction
  if (fx === 'global:kinetic-resist') {
    for (const d of defenses) {
      const def = d as { resistance?: ElementId; effectiveResist?: ElementId };
      if (def.resistance !== asElementId('kinetic')) {
        def.effectiveResist = asElementId('kinetic');
      }
    }
  } else if (fx === 'global:plasma-resist') {
    for (const d of defenses) {
      const def = d as { resistance?: ElementId; effectiveResist?: ElementId };
      if (def.resistance !== asElementId('plasma')) {
        def.effectiveResist = asElementId('plasma');
      }
    }
  } else if (fx === 'global:electric-resist') {
    for (const d of defenses) {
      const def = d as { resistance?: ElementId; effectiveResist?: ElementId };
      if (def.resistance !== asElementId('electric')) {
        def.effectiveResist = asElementId('electric');
      }
    }
  }
  // Other effects are read by Game.ts / Damage.ts via run.earth.activeCounter.id
}

export function getActiveCounterElementReduction(
  element: ElementId,
  activeCounterId: string | null
): number {
  if (!activeCounterId) return 1.0;
  if (
    (activeCounterId === 'kinetic-counter' && element === ('kinetic' as ElementId)) ||
    (activeCounterId === 'plasma-counter' && element === ('plasma' as ElementId)) ||
    (activeCounterId === 'electric-counter' && element === ('electric' as ElementId))
  ) {
    return 0.5;
  }
  return 1.0;
}

export function getCounterPoolSize(): number {
  return COUNTER_POOL.length;
}

export function getCounterById(id: string): CounterDef | undefined {
  return COUNTER_POOL.find((c) => c.id === id);
}

/** Read the active counter's effect ID (or null). */
export function getActiveCounterEffect(earth: EarthState): string | null {
  return earth.activeCounter.peek()?.effect ?? null;
}