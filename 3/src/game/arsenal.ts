import type { DamageType, RunState, TargetState, WeaponStats } from '../core/types';
import { getWeapon } from '../data/weapons';

export function shipDamageMult(run: RunState, type: DamageType): number {
  let mult = 1;
  for (const m of run.mutations) {
    const v = m.damageMod[type];
    if (v !== undefined) mult *= v;
  }
  return mult;
}

export function effectiveDamage(
  weapon: WeaponStats,
  armor: Partial<Record<DamageType, number>>,
  run: RunState,
): number {
  const armorMult = armor[weapon.type] ?? 1;
  const condMult = run.profile.damageMod[weapon.type] ?? 1;
  const modBonus = run.ship.weaponMods[weapon.id] ?? 0;
  return (weapon.damage + modBonus) * armorMult * condMult * shipDamageMult(run, weapon.type);
}

export interface DamageResult {
  dealt: number;
  destroyed: boolean;
}

export function damageTarget(target: TargetState, weapon: WeaponStats, run: RunState): DamageResult {
  const dmg = effectiveDamage(weapon, target.armor, run);
  target.hp -= dmg;
  if (target.hp <= 0 && !target.destroyed) {
    target.hp = 0;
    target.destroyed = true;
    return { dealt: dmg, destroyed: true };
  }
  return { dealt: dmg, destroyed: false };
}

export function synthesize(a: WeaponStats, b: WeaponStats): WeaponStats {
  const sameType = a.type === b.type;
  const mult = sameType ? 1.4 : 1.2;
  return {
    id: `${a.id}+${b.id}`,
    name: `${a.name} / ${b.name}`,
    type: a.type,
    damage: Math.round(((a.damage + b.damage) / 2) * mult),
    fireRate: a.fireRate,
    projectileSpeed: Math.min(a.projectileSpeed, b.projectileSpeed),
    accuracy: Math.min(1, Math.max(a.accuracy, b.accuracy)),
    range: Math.max(a.range, b.range),
    splash: a.splash ?? b.splash,
    pierce: a.pierce || b.pierce || undefined,
    description: `Synthesis of ${a.name} and ${b.name}.`,
  };
}

export function weaponDps(w: WeaponStats, armor: Partial<Record<DamageType, number>>, run: RunState): number {
  return effectiveDamage(w, armor, run) * w.fireRate * w.accuracy;
}

export function findWeapon(id: string): WeaponStats {
  if (id.includes('+')) {
    const [a, b] = id.split('+');
    return synthesize(getWeapon(a), getWeapon(b));
  }
  return getWeapon(id);
}
