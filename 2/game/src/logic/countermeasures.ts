import type { ConditionProfile, DefenseUnit, EarthThreat, NetworkNodeId } from "../core/types";
import { mulberry32, type Rng } from "../core/rng";

export const THREAT_SCHEDULE: Record<number, EarthThreat[]> = {
  1: ["pointDefense"],
  2: ["pointDefense", "groundAA", "orbitalObstacles"],
  3: ["groundAA", "orbitalObstacles"],
  4: ["nuclearMissiles"],
  5: ["orbitalObstacles"],
  6: ["nuclearMissiles"],
};

export interface EscalationResult {
  threats: EarthThreat[];
  spawned: DefenseUnit[];
  nukeFired: boolean;
  rallyTriggered: boolean;
  hazardStrike: boolean;
}

function spawnTurret(idCounter: { n: number }, day: number, rng: Rng, defenseBonus: number): DefenseUnit {
  const lat = (rng.next() - 0.5) * 2;
  const lon = rng.next() * Math.PI * 2;
  const hp = Math.round(24 + day * 6 + defenseBonus * 3);
  return {
    id: `turret-${idCounter.n++}`,
    kind: "turret",
    hp,
    maxHp: hp,
    position: positionOnSphere(lat, lon),
    disabled: false,
    charge: 0,
  };
}

function spawnStation(idCounter: { n: number }, rng: Rng): DefenseUnit {
  const hp = 200;
  return {
    id: `station-${idCounter.n++}`,
    kind: "spaceStation",
    hp,
    maxHp: hp,
    position: { x: (rng.next() - 0.5) * 20, y: (rng.next() - 0.5) * 20, z: -25 },
    disabled: false,
    charge: 0,
  };
}

function positionOnSphere(lat: number, lon: number): { x: number; y: number; z: number } {
  const r = 18.5;
  return {
    x: r * Math.cos(lat) * Math.sin(lon),
    y: r * Math.sin(lat),
    z: r * Math.cos(lat) * Math.cos(lon),
  };
}

export function resolveDayEscalation(
  day: number,
  profile: ConditionProfile,
  seed: number,
  defenses: DefenseUnit[],
  opts: {
    compromisedNodes: NetworkNodeId[];
    rallyBlocked: boolean;
  }
): EscalationResult {
  const rng = mulberry32(seed * 104729 + day * 1299709);
  const threats: EarthThreat[] = [];
  const spawned: DefenseUnit[] = [];
  const idCounter = { n: defenses.length + 1 };

  if (opts.compromisedNodes.includes("orbitalControl")) {
    // orbital obstacles reduced
  }

  const slots = Math.max(1, day + profile.effective.threatSlotsBonus);
  for (let i = 0; i < slots; i++) {
    if (rng.chance(0.6)) {
      spawned.push(spawnTurret(idCounter, day, rng, profile.effective.defenseBonus));
      threats.push("pointDefense");
    }
    if (day >= 3 && rng.chance(0.4)) {
      spawned.push(spawnStation(idCounter, rng));
    }
  }

  const schedule = THREAT_SCHEDULE[day] ?? [];
  for (const t of schedule) threats.push(t);

  if (day >= 5 && rng.chance(0.5) && !spawned.some((d) => d.kind === "spaceStation")) {
    spawned.push(spawnStation(idCounter, rng));
    threats.push("orbitalObstacles");
  }

  let nukeFired = false;
  if (day >= 4 && rng.chance(Math.min(0.5, 0.25 + (day - 3) * 0.1))) {
    nukeFired = true;
  }

  let rallyTriggered = false;
  if (day >= 6 && !opts.rallyBlocked) {
    rallyTriggered = true;
    threats.push("groundAA");
  }

  return { threats, spawned, nukeFired, rallyTriggered, hazardStrike: false };
}
