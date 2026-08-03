import type { EquippedWeapon, WeaponSpec } from "../core/types";
import { hashStringToSeed, mulberry32, type Rng } from "../core/rng";

export const ARSENAL: WeaponSpec[] = [
  {
    id: "plasmaLance",
    name: "Plasma Lance",
    type: "energy",
    damage: 14,
    fireRate: 2.5,
    projectileSpeed: 55,
    cooldown: 0.4,
    pierce: 2,
    spread: 1,
    splashRadius: 0,
    dot: { damage: 0, duration: 0 },
    special: "none",
    chargeTime: 0,
    unlockTier: 0,
  },
  {
    id: "kineticRods",
    name: "Kinetic Rods",
    type: "kinetic",
    damage: 42,
    fireRate: 1.0,
    projectileSpeed: 40,
    cooldown: 1.0,
    pierce: 0,
    spread: 1,
    splashRadius: 0,
    dot: { damage: 0, duration: 0 },
    special: "none",
    chargeTime: 0,
    unlockTier: 0,
  },
  {
    id: "radiationCloud",
    name: "Radiation Cloud",
    type: "radiation",
    damage: 8,
    fireRate: 1.2,
    projectileSpeed: 30,
    cooldown: 0.8,
    pierce: 0,
    spread: 1,
    splashRadius: 4,
    dot: { damage: 3, duration: 4 },
    special: "none",
    chargeTime: 0,
    unlockTier: 0,
  },
  {
    id: "naniteSwarm",
    name: "Nanite Swarm",
    type: "biological",
    damage: 10,
    fireRate: 1.6,
    projectileSpeed: 35,
    cooldown: 0.6,
    pierce: 1,
    spread: 3,
    splashRadius: 0,
    dot: { damage: 2, duration: 5 },
    special: "none",
    chargeTime: 0,
    unlockTier: 1,
  },
  {
    id: "empPulse",
    name: "EMP Pulse",
    type: "energy",
    damage: 6,
    fireRate: 0.8,
    projectileSpeed: 45,
    cooldown: 1.2,
    pierce: 0,
    spread: 1,
    splashRadius: 6,
    dot: { damage: 0, duration: 0 },
    special: "emp",
    chargeTime: 0,
    unlockTier: 1,
  },
  {
    id: "doomsdayRay",
    name: "Doomsday Ray",
    type: "energy",
    damage: 300,
    fireRate: 0.1,
    projectileSpeed: 80,
    cooldown: 20,
    pierce: 99,
    spread: 1,
    splashRadius: 0,
    dot: { damage: 0, duration: 0 },
    special: "doomsday",
    chargeTime: 2.5,
    unlockTier: 2,
  },
];

const ARSENAL_BY_ID = new Map(ARSENAL.map((w) => [w.id, w]));

export function getWeapon(id: string): WeaponSpec {
  const w = ARSENAL_BY_ID.get(id);
  if (!w) throw new Error(`Unknown weapon: ${id}`);
  return w;
}

export function startingLoadout(): WeaponSpec[] {
  return [getWeapon("plasmaLance"), getWeapon("kineticRods"), getWeapon("radiationCloud")];
}

export function createEquipped(spec: WeaponSpec): EquippedWeapon {
  return { spec, cooldownRemaining: 0, charge: 0, level: 1 };
}

export function synthWeapons(a: WeaponSpec, b: WeaponSpec): WeaponSpec {
  const damage = Math.round((a.damage + b.damage) * 1.4);
  const type: WeaponSpec["type"] =
    a.type === b.type ? a.type : a.type === "energy" || b.type === "energy" ? "energy" : "kinetic";
  return {
    id: `${a.id}+${b.id}`,
    name: `${a.name}-${b.name} Synth`,
    type,
    damage,
    fireRate: Math.min(a.fireRate + b.fireRate, 6),
    projectileSpeed: Math.max(a.projectileSpeed, b.projectileSpeed),
    cooldown: Math.max(0.1, Math.min(a.cooldown, b.cooldown) * 0.8),
    pierce: Math.max(a.pierce, b.pierce),
    spread: a.spread + b.spread,
    splashRadius: Math.max(a.splashRadius, b.splashRadius),
    dot: { damage: Math.max(a.dot.damage, b.dot.damage), duration: Math.max(a.dot.duration, b.dot.duration) },
    special: a.special !== "none" ? a.special : b.special,
    chargeTime: Math.min(a.chargeTime, b.chargeTime),
    unlockTier: Math.max(a.unlockTier, b.unlockTier),
  };
}

export function damageMultiplierForType(weaponType: WeaponSpec["type"], mods: Partial<Record<string, number>>): number {
  return mods[weaponType] ?? 1;
}

export function weaponPool(seed: string | number, unlockedTiers: number): WeaponSpec[] {
  const rng: Rng = mulberry32(typeof seed === "string" ? hashStringToSeed(seed) : seed);
  const pool = ARSENAL.filter((w) => w.unlockTier <= unlockedTiers);
  return rng.shuffle(pool).slice(0, Math.max(3, pool.length - 1));
}
