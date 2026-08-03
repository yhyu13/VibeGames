import { describe, expect, it } from 'vitest';
import { damageTarget, effectiveDamage, shipDamageMult, synthesize } from '../src/game/arsenal';
import { getWeapon } from '../src/data/weapons';
import { createRun } from '../src/game/run';
import { EventBus } from '../src/core/events';
import { applyMutation } from '../src/game/mutations';
import { getCondition } from '../src/data/conditions';
import { computeProfile } from '../src/game/earth';

function runWithCondition(id: string) {
  const run = createRun(1, ['plasma-lance', 'kinetic-rods']);
  run.profile = computeProfile([getCondition(id)]);
  return run;
}

describe('damage model', () => {
  it('applies armor multiplier per damage type', () => {
    const run = runWithCondition('iron-age');
    const turret = { id: 't', kind: 'turret' as const, name: 't', hp: 100, maxHp: 100, armor: { emp: 2 }, isPrimary: false, destroyed: false };
    const emp = effectiveDamage(getWeapon('emp-pulse'), turret.armor, run);
    const laser = effectiveDamage(getWeapon('plasma-lance'), turret.armor, run);
    expect(emp).toBe(getWeapon('emp-pulse').damage * 2);
    expect(laser).toBe(getWeapon('plasma-lance').damage);
  });

  it('applies condition modifiers', () => {
    const run = runWithCondition('ion-storm');
    const dmg = effectiveDamage(getWeapon('plasma-lance'), {}, run);
    expect(dmg).toBeCloseTo(22 * 0.5);
  });

  it('applies mutation damage modifiers multiplicatively', () => {
    const run = runWithCondition('iron-age');
    applyMutation(run, 'viral-spores', new EventBus());
    expect(shipDamageMult(run, 'bio')).toBeCloseTo(1.5);
    const dmg = effectiveDamage(getWeapon('nanite-swarm'), {}, run);
    expect(dmg).toBeCloseTo(16 * 1.5);
  });

  it('applies weapon upgrade mods', () => {
    const run = runWithCondition('iron-age');
    run.ship.weaponMods['plasma-lance'] = 10;
    const dmg = effectiveDamage(getWeapon('plasma-lance'), {}, run);
    expect(dmg).toBe(32);
  });

  it('damageTarget destroys at zero hp exactly once', () => {
    const run = runWithCondition('iron-age');
    const target = { id: 't', kind: 'turret' as const, name: 't', hp: 10, maxHp: 10, armor: {}, isPrimary: false, destroyed: false };
    const res = damageTarget(target, getWeapon('kinetic-rods'), run);
    expect(res.destroyed).toBe(true);
    expect(target.hp).toBe(0);
    const again = damageTarget(target, getWeapon('kinetic-rods'), run);
    expect(again.destroyed).toBe(false);
  });

  it('synthesis combines weapons', () => {
    const a = getWeapon('plasma-lance');
    const b = getWeapon('emp-pulse');
    const hybrid = synthesize(a, b);
    expect(hybrid.type).toBe('energy');
    expect(hybrid.damage).toBeGreaterThan((a.damage + b.damage) / 2);
    expect(hybrid.pierce).toBe(true);
  });

  it('synthesize of same type is stronger than cross-type', () => {
    const cross = synthesize(getWeapon('kinetic-rods'), getWeapon('plasma-lance'));
    const same = synthesize(getWeapon('kinetic-rods'), getWeapon('kinetic-rods'));
    expect(same.damage).toBeGreaterThan(cross.damage);
  });

  it('new arsenal weapons exist and deal positive damage', () => {
    const graviton = getWeapon('graviton-lance');
    const solar = getWeapon('solar-flare');
    expect(graviton.type).toBe('kinetic');
    expect(graviton.pierce).toBe(true);
    expect(graviton.damage).toBeGreaterThan(0);
    expect(solar.type).toBe('energy');
    expect(solar.damage).toBeGreaterThan(0);
    const run = runWithCondition('iron-age');
    expect(effectiveDamage(graviton, {}, run)).toBe(graviton.damage);
    expect(effectiveDamage(solar, {}, run)).toBe(solar.damage);
  });
});
