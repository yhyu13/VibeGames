import { describe, expect, it } from "vitest";
import { THREAT_SCHEDULE, resolveDayEscalation } from "../src/logic/countermeasures";
import { generateConditionProfile } from "../src/logic/conditions";
import { awardAlienium, purchaseWeapon, purchaseLoadoutSlot, purchaseChassis, hullForChassis, DEFAULT_META } from "../src/logic/meta";

describe("countermeasures escalation", () => {
  it("matches the GDD day table", () => {
    expect(THREAT_SCHEDULE[1]).toContain("pointDefense");
    expect(THREAT_SCHEDULE[2]).toContain("orbitalObstacles");
    expect(THREAT_SCHEDULE[3]).toContain("groundAA");
    expect(THREAT_SCHEDULE[4]).toContain("nuclearMissiles");
    expect(THREAT_SCHEDULE[5]).toContain("orbitalObstacles");
    expect(THREAT_SCHEDULE[6]).toContain("nuclearMissiles");
  });

  it("escalates with day", () => {
    const profile = generateConditionProfile(1, 0);
    const r1 = resolveDayEscalation(1, profile, 99, [], { compromisedNodes: [], rallyBlocked: false });
    const r4 = resolveDayEscalation(4, profile, 99, [], { compromisedNodes: [], rallyBlocked: false });
    expect(r4.spawned.length).toBeGreaterThanOrEqual(r1.spawned.length);
  });

  it("blocks rally when propaganda high", () => {
    const profile = generateConditionProfile(1, 0);
    const r = resolveDayEscalation(6, profile, 99, [], { compromisedNodes: [], rallyBlocked: true });
    expect(r.rallyTriggered).toBe(false);
  });

  it("triggers rally on day 6+ without propaganda", () => {
    const profile = generateConditionProfile(1, 0);
    const r = resolveDayEscalation(6, profile, 99, [], { compromisedNodes: [], rallyBlocked: false });
    expect(r.rallyTriggered).toBe(true);
  });
});

describe("meta progression", () => {
  it("bloodless victory awards 2x", () => {
    expect(awardAlienium(100, true, 1)).toBe(200);
    expect(awardAlienium(100, false, 1)).toBe(100);
  });

  it("salvage modifier scales rewards", () => {
    expect(awardAlienium(100, false, 1.5)).toBe(150);
  });

  it("purchaseWeapon spends and unlocks", () => {
    let meta = { ...DEFAULT_META, alienium: 100 };
    meta = purchaseWeapon(meta, "naniteSwarm");
    expect(meta.alienium).toBe(70);
    expect(meta.unlocks.weapons).toContain("naniteSwarm");
  });

  it("cannot buy unaffordable or duplicate weapons", () => {
    let meta = { ...DEFAULT_META, alienium: 10 };
    meta = purchaseWeapon(meta, "naniteSwarm");
    expect(meta.unlocks.weapons).not.toContain("naniteSwarm");
    meta = purchaseWeapon(meta, "naniteSwarm");
    expect(meta.alienium).toBe(10);
  });

  it("purchaseLoadoutSlot caps at 5", () => {
    let meta = { ...DEFAULT_META, alienium: 1000 };
    for (let i = 0; i < 5; i++) meta = purchaseLoadoutSlot(meta);
    expect(meta.unlocks.loadoutSlots).toBe(5);
  });

  it("chassis upgrades increase hull", () => {
    expect(hullForChassis(0)).toBe(100);
    expect(hullForChassis(1)).toBe(125);
    let meta = { ...DEFAULT_META, alienium: 1000 };
    meta = purchaseChassis(meta);
    expect(meta.unlocks.chassis).toBe(1);
  });
});
