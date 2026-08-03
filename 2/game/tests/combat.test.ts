import { describe, expect, it } from "vitest";
import {
  computeWeaponDamage,
  applyDamageToDefense,
  applyDamageToShip,
  fireWeapon,
  pointDefenseIntercept,
} from "../src/logic/combat";
import { generateConditionProfile } from "../src/logic/conditions";
import { getWeapon } from "../src/logic/weapons";
import type { DefenseUnit, ShipState } from "../src/core/types";

const profile = generateConditionProfile(0, 0);
const mutations: import("../src/core/types").MutatorDefinition[] = [];

function makeShip(overrides: Partial<ShipState> = {}): ShipState {
  return {
    hull: 100,
    maxHull: 100,
    hullWeaversRepair: 0,
    armor: {},
    immunityType: null,
    yaw: 0,
    pitch: 0,
    weapons: [getWeapon("plasmaLance"), getWeapon("kineticRods"), getWeapon("radiationCloud")].map((s) => ({
      spec: s,
      cooldownRemaining: 0,
      charge: 0,
      level: 1,
    })),
    activeWeaponIndex: 0,
    systems: { hull: 3, weaponBay: 3, broadcastArray: 3, cortex: 3 },
    speed: 1,
    morale: 100,
    ...overrides,
  };
}

function makeDefense(overrides: Partial<DefenseUnit> = {}): DefenseUnit {
  return {
    id: "d1",
    kind: "turret",
    hp: 20,
    maxHp: 20,
    position: { x: 10, y: 0, z: 0 },
    disabled: false,
    charge: 0,
    ...overrides,
  };
}

describe("combat damage", () => {
  it("applies damage-type multipliers from condition profile", () => {
    const ionStorm = generateConditionProfile(1, 0);
    ionStorm.effective.damageMods.energy = 0.5;
    const dmg = computeWeaponDamage(20, "energy", ionStorm, []);
    expect(dmg).toBe(10);
  });

  it("applies mutation multipliers", () => {
    const dmg = computeWeaponDamage(20, "biological", profile, [
      { id: "x", name: "x", benefitDescription: "", baneDescription: "", benefit: { biological: 2 }, bane: {} },
    ]);
    expect(dmg).toBe(40);
  });

  it("destroys a defense at 0 hp", () => {
    const d = makeDefense({ hp: 10 });
    const { destroyed } = applyDamageToDefense(d, 10, "kinetic", profile, mutations);
    expect(destroyed).toBe(true);
    expect(d.hp).toBe(0);
  });

  it("respects ship immunity", () => {
    const ship = makeShip({ immunityType: "kinetic" });
    const { applied, dead } = applyDamageToShip(ship, 50, "kinetic", profile);
    expect(applied).toBe(0);
    expect(dead).toBe(false);
    expect(ship.hull).toBe(100);
  });

  it("applies armor reduction", () => {
    const ship = makeShip({ armor: { kinetic: 0.5 } });
    applyDamageToShip(ship, 40, "kinetic", profile);
    expect(ship.hull).toBe(80);
  });

  it("kills the ship at 0 hull", () => {
    const ship = makeShip({ hull: 10 });
    const { dead } = applyDamageToShip(ship, 50, "energy", profile);
    expect(dead).toBe(true);
  });
});

describe("fireWeapon", () => {
  it("respects cooldown", () => {
    const ship = makeShip();
    const first = fireWeapon(ship, 0, profile, mutations, () => "p1");
    expect(first.length).toBe(1);
    const second = fireWeapon(ship, 0, profile, mutations, () => "p2");
    expect(second.length).toBe(0);
  });

  it("spawns spread projectiles for nanite swarm", () => {
    const ship = makeShip({ weapons: [{ spec: getWeapon("naniteSwarm"), cooldownRemaining: 0, charge: 0, level: 1 }], activeWeaponIndex: 0 });
    const shots = fireWeapon(ship, 0, profile, mutations, () => "p");
    expect(shots.length).toBe(3);
  });
});

describe("pointDefenseIntercept", () => {
  it("can shoot down kinetic projectiles", () => {
    const ship = makeShip();
    const shots = fireWeapon(ship, 1, profile, mutations, () => "p"); // kinetic rods
    expect(shots.length).toBe(1);
    const turret = makeDefense({ position: { x: 0, y: 0, z: 10 }, kind: "turret" });
    // Place projectile near turret
    shots[0].position = { x: 0, y: 0, z: 8 };
    pointDefenseIntercept(shots, [turret], profile, 1, () => 0); // rng always 0 => always intercept
    expect(shots[0].alive).toBe(false);
  });
});
