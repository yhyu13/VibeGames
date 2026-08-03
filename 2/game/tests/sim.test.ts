import { describe, expect, it } from "vitest";
import { accumulateSteps } from "../src/core/fixedLoop";
import { createRunSim } from "../src/logic/sim";

describe("fixedLoop accumulator", () => {
  it("runs the correct number of steps at 60Hz", () => {
    const { steps, nextAcc } = accumulateSteps(1 / 60, 0, 1 / 60);
    expect(steps).toBe(1);
    expect(nextAcc).toBeCloseTo(0, 8);
  });

  it("accumulates partial frames", () => {
    const { steps, nextAcc } = accumulateSteps(1 / 120, 0, 1 / 60);
    expect(steps).toBe(0);
    expect(nextAcc).toBeCloseTo(1 / 120, 8);
  });

  it("caries leftover across frames", () => {
    const a = accumulateSteps(1 / 120, 0, 1 / 60);
    const b = accumulateSteps(1 / 120, a.nextAcc, 1 / 60);
    expect(a.steps).toBe(0);
    expect(b.steps).toBe(1);
  });

  it("clamps runaway frame times", () => {
    const { steps } = accumulateSteps(10, 0, 1 / 60);
    expect(steps).toBe(Math.floor(0.25 / (1 / 60)));
  });
});

describe("run determinism", () => {
  it("same seed produces identical state after fixed ticks", () => {
    const run = (seed: number) => {
      const sim = createRunSim({ seed, meta: { unlocks: { weapons: [], loadoutSlots: 3, chassis: 0 } } });
      sim.start();
      sim.setInput({ yaw: 0.3, pitch: -0.2, fire: true, weaponIndex: 0 });
      for (let i = 0; i < 600; i++) sim.tick(1 / 60);
      return {
        shipHull: sim.ship.hull,
        shipYaw: sim.ship.yaw,
        shipPitch: sim.ship.pitch,
        defenses: sim.defenses.map((d) => d.id).sort(),
        projectiles: sim.projectiles.length,
        events: sim.lastEvents.map((e) => e.type),
      };
    };
    expect(run(12345)).toEqual(run(12345));
  });

  it("different seeds produce different condition profiles", () => {
    const simA = createRunSim({ seed: 1, meta: { unlocks: { weapons: [], loadoutSlots: 3, chassis: 0 } } });
    const simB = createRunSim({ seed: 2, meta: { unlocks: { weapons: [], loadoutSlots: 3, chassis: 0 } } });
    const a = simA.profile.modifiers.map((m) => m.id).join(",");
    const b = simB.profile.modifiers.map((m) => m.id).join(",");
    expect(a).not.toBe(b);
  });
});
