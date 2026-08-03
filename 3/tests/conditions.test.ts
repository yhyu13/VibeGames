import { describe, expect, it } from 'vitest';
import { computeProfile, generateProfile } from '../src/game/earth';
import { CONDITIONS, getCondition } from '../src/data/conditions';
import { RNG } from '../src/core/rng';

describe('earth conditions', () => {
  it('computeProfile aggregates multipliers multiplicatively', () => {
    const profile = computeProfile([getCondition('ion-storm'), getCondition('cyberpunk')]);
    expect(profile.damageMod.energy).toBeCloseTo(0.5);
    expect(profile.damageMod.radiation).toBeCloseTo(1.5);
    expect(profile.damageMod.emp).toBeCloseTo(1.5);
    expect(profile.virusMult).toBeCloseTo(0.8 * 1.5);
    expect(profile.propagandaMult).toBeCloseTo(0.9);
    expect(profile.difficulty).toBe(4);
  });

  it('default profile is neutral', () => {
    const profile = computeProfile([getCondition('iron-age')]);
    expect(profile.damageMod.kinetic).toBe(1);
    expect(profile.damageMod.emp).toBe(1);
  });

  it('generateProfile picks a known primary and bounded difficulty', () => {
    const rng = new RNG(2024);
    for (let i = 0; i < 50; i++) {
      const profile = generateProfile(rng, 3);
      expect(Object.values(CONDITIONS)).toContainEqual(profile.primary);
      expect(profile.difficulty).toBeLessThanOrEqual(4);
      expect(profile.secondary.length).toBeLessThanOrEqual(2);
    }
  });

  it('all condition defs have sane multiplier ranges', () => {
    for (const c of Object.values(CONDITIONS)) {
      for (const v of Object.values(c.damageMod)) {
        expect(v).toBeGreaterThanOrEqual(0.3);
        expect(v).toBeLessThanOrEqual(2);
      }
      expect(c.defenseHpMod).toBeGreaterThanOrEqual(-0.6);
      expect(c.defenseHpMod).toBeLessThanOrEqual(0.6);
    }
  });

  it('new conditions have the intended signatures', () => {
    expect(getCondition('mirror-shields').damageMod.energy).toBe(0.3);
    expect(getCondition('quiet-orbit').salvageMult).toBe(1.3);
    expect(getCondition('quiet-orbit').difficulty).toBe(-1);
    expect(getCondition('hive-mind').virusMult).toBe(1.3);
    expect(getCondition('hive-mind').propagandaMult).toBe(1.3);
  });
});
