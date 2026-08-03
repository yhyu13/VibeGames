import type {
  ConditionProfile,
  DefenseUnit,
  DamageType,
  Projectile,
  ShipState,
} from "../core/types";
import type { MutatorDefinition } from "../core/types";
import { FIXED_DT, ORBIT_RADIUS } from "../core/types";

export interface MuzzleState {
  weaponId: string;
  type: DamageType;
  damage: number;
  pierceLeft: number;
  splashRadius: number;
  dot: { damage: number; duration: number } | null;
  speed: number;
  special: "none" | "emp" | "doomsday";
}

export function computeWeaponDamage(
  base: number,
  type: DamageType,
  profile: ConditionProfile,
  mutations: MutatorDefinition[]
): number {
  let mult = profile.effective.damageMods[type] ?? 1;
  for (const m of mutations) mult *= m.benefit[type] ?? 1;
  return base * mult;
}

export function applyDamageToDefense(
  defense: DefenseUnit,
  raw: number,
  type: DamageType,
  profile: ConditionProfile,
  mutations: MutatorDefinition[]
): { applied: number; destroyed: boolean } {
  const dmg = computeWeaponDamage(raw, type, profile, mutations);
  defense.hp = Math.max(0, defense.hp - dmg);
  return { applied: dmg, destroyed: defense.hp <= 0 };
}

export function applyDamageToShip(
  ship: ShipState,
  raw: number,
  type: DamageType,
  profile: ConditionProfile
): { applied: number; dead: boolean } {
  if (ship.immunityType === type) return { applied: 0, dead: false };
  let mult = profile.effective.damageMods[type] ?? 1;
  const armor = ship.armor[type] ?? 0;
  mult *= 1 - armor;
  const dmg = Math.max(0, raw * mult);
  ship.hull = Math.max(0, ship.hull - dmg);
  return { applied: dmg, dead: ship.hull <= 0 };
}

export function shipForward(ship: ShipState): { x: number; y: number; z: number } {
  const cosP = Math.cos(ship.pitch);
  return {
    x: cosP * Math.cos(ship.yaw),
    y: Math.sin(ship.pitch),
    z: -cosP * Math.sin(ship.yaw),
  };
}

export function shipPosition(ship: ShipState): { x: number; y: number; z: number } {
  const cosP = Math.cos(ship.pitch);
  return {
    x: ORBIT_RADIUS * cosP * Math.cos(ship.yaw),
    y: ORBIT_RADIUS * Math.sin(ship.pitch),
    z: -ORBIT_RADIUS * cosP * Math.sin(ship.yaw),
  };
}

export function fireWeapon(
  ship: ShipState,
  activeIndex: number,
  profile: ConditionProfile,
  mutations: MutatorDefinition[],
  nextId: () => string
): Projectile[] {
  const eq = ship.weapons[activeIndex];
  if (!eq || eq.cooldownRemaining > 0) return [];
  const spec = eq.spec;
  eq.cooldownRemaining = spec.cooldown * (spec.special === "doomsday" ? (mutations.some((m) => m.benefit.doomsdayCooldownMod) ? 0.5 : 1) : 1);

  const pos = shipPosition(ship);
  const fwd = shipForward(ship);
  const up: { x: number; y: number; z: number } = { x: pos.x / ORBIT_RADIUS, y: pos.y / ORBIT_RADIUS, z: pos.z / ORBIT_RADIUS };
  const right: { x: number; y: number; z: number } = normalize3(cross(fwd, up));

  const damage = computeWeaponDamage(spec.damage, spec.type, profile, mutations);
  const muzzleOffset = 1.6;
  const base = {
    x: pos.x + fwd.x * muzzleOffset,
    y: pos.y + fwd.y * muzzleOffset,
    z: pos.z + fwd.z * muzzleOffset,
  };

  const projectiles: Projectile[] = [];
  const spread = spec.spread;
  for (let i = 0; i < spread; i++) {
    const offset = spread > 1 ? (i - (spread - 1) / 2) * 0.8 : 0;
    const dir = normalize3({
      x: fwd.x + right.x * offset * 0.25,
      y: fwd.y + right.y * offset * 0.25,
      z: fwd.z + right.z * offset * 0.25,
    });
    projectiles.push({
      id: nextId(),
      weaponId: spec.id,
      type: spec.type,
      damage,
      position: base,
      direction: dir,
      speed: spec.projectileSpeed,
      pierceLeft: spec.pierce,
      splashRadius: spec.splashRadius,
      dot: spec.dot.damage > 0 ? { damage: spec.dot.damage, duration: spec.dot.duration, remaining: spec.dot.duration } : null,
      fromPlayer: true,
      hostile: false,
      alive: true,
      special: spec.special,
    });
  }
  return projectiles;
}

export function stepProjectiles(
  projectiles: Projectile[],
  defenses: DefenseUnit[],
  ship: ShipState,
  profile: ConditionProfile,
  mutations: MutatorDefinition[],
  dt: number,
  onHit: (p: Projectile, d: DefenseUnit) => void
): void {
  for (const p of projectiles) {
    if (!p.alive) continue;
    p.position.x += p.direction.x * p.speed * dt;
    p.position.y += p.direction.y * p.speed * dt;
    p.position.z += p.direction.z * p.speed * dt;

    if (p.hostile) {
      const distShip = dist(p.position, shipPosition(ship));
      if (distShip < 1.8) {
        applyDamageToShip(ship, p.damage, p.type, profile);
        p.alive = false;
        continue;
      }
      continue;
    }

    for (const d of defenses) {
      if (d.disabled || d.hp <= 0) continue;
      if (dist(p.position, d.position) < hitRadius(d)) {
        if (p.special === "emp" && d.kind !== "nukeSilo" && p.splashRadius > 0) {
          for (const other of defenses) {
            if (other.hp > 0 && !other.disabled && other.kind !== "nukeSilo" && dist(p.position, other.position) < p.splashRadius) {
              other.disabled = true;
              onHit(p, other);
            }
          }
        }
        const { destroyed } = applyDamageToDefense(d, p.damage, p.type, profile, mutations);
        if (p.dot) p.dot.remaining -= dt;
        if (p.pierceLeft > 0) {
          p.pierceLeft--;
          p.damage *= 0.6;
        } else {
          p.alive = false;
        }
        onHit(p, d);
        void destroyed;
        break;
      }
    }
  }
}

export function applyDot(projectiles: Projectile[], defenses: DefenseUnit[], profile: ConditionProfile, mutations: MutatorDefinition[], dt: number): void {
  for (const p of projectiles) {
    if (!p.alive || !p.dot || p.dot.remaining <= 0) continue;
    p.dot.remaining -= dt;
    for (const d of defenses) {
      if (d.hp <= 0 || d.disabled) continue;
      if (dist(p.position, d.position) < hitRadius(d) + 2.5) {
        applyDamageToDefense(d, p.dot.damage * dt, p.type, profile, mutations);
      }
    }
  }
}

export function pointDefenseIntercept(
  projectiles: Projectile[],
  defenses: DefenseUnit[],
  mutationMissileBonus: number,
  rng: () => number
): void {
  const interceptBonus = 0.4 * mutationMissileBonus;
  for (const d of defenses) {
    if (d.kind !== "turret" || d.disabled || d.hp <= 0) continue;
    for (const p of projectiles) {
      if (!p.alive || !p.fromPlayer) continue;
      if (p.type !== "kinetic" && p.type !== "radiation") continue;
      const dx = p.position.x - d.position.x;
      const dy = p.position.y - d.position.y;
      const dz = p.position.z - d.position.z;
      const chance = (1 - Math.min(1, Math.sqrt(dx * dx + dy * dy + dz * dz) / 50)) * 0.35 + interceptBonus;
      if (rng() < Math.min(0.9, chance)) {
        p.alive = false;
        break;
      }
    }
  }
}

export function hitRadius(d: DefenseUnit): number {
  switch (d.kind) {
    case "turret":
      return 1.0;
    case "aaNet":
      return 1.2;
    case "fighter":
      return 0.8;
    case "spaceStation":
      return 3.5;
    case "nukeSilo":
      return 1.2;
    default:
      return 0;
  }
}

function dist(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function cross(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }): { x: number; y: number; z: number } {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function normalize3(v: { x: number; y: number; z: number }): { x: number; y: number; z: number } {
  const l = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1;
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}

export const DT = FIXED_DT;
