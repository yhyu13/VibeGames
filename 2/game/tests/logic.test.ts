import { describe, expect, it } from "vitest";
import { generateConditionProfile, computeEffective } from "../src/logic/conditions";
import { getCondition } from "../src/logic/conditions";
import { generateMutationOffers } from "../src/logic/mutations";
import { createSegments, applyMessage, totalConviction, getMessageCard } from "../src/logic/propaganda";
import { generatePuzzle, validateSolution, systemShutdownReached, createNodes, compromiseCount } from "../src/logic/virus";

describe("conditions", () => {
  it("generates N unique modifiers", () => {
    const profile = generateConditionProfile(123, 3);
    expect(profile.modifiers).toHaveLength(3);
    const ids = new Set(profile.modifiers.map((m) => m.id));
    expect(ids.size).toBe(3);
  });

  it("is deterministic per seed", () => {
    expect(generateConditionProfile(5, 3).modifiers.map((m) => m.id)).toEqual(
      generateConditionProfile(5, 3).modifiers.map((m) => m.id)
    );
  });

  it("computes effective multipliers", () => {
    const eff = computeEffective([getCondition("ionStorm"), getCondition("septicOceans")]);
    expect(eff.damageMods.energy).toBeCloseTo(0.5);
    expect(eff.damageMods.radiation).toBeCloseTo(1.5);
    expect(eff.damageMods.biological).toBeCloseTo(1.5);
    expect(eff.damageMods.kinetic).toBeCloseTo(0.75);
  });
});

describe("mutations", () => {
  it("offers 3 unique mutations with banes", () => {
    const offers = generateMutationOffers(42, 2, []);
    expect(offers).toHaveLength(3);
    const ids = new Set(offers.map((o) => o.mutation.id));
    expect(ids.size).toBe(3);
    for (const o of offers) {
      expect(o.mutation.bane).toBeTruthy();
      expect(o.mutation.benefit).toBeTruthy();
    }
  });

  it("excludes taken mutations", () => {
    const first = generateMutationOffers(42, 2, [])[0];
    const takenId = first?.mutation.id ?? "viralSpores";
    const offers = generateMutationOffers(42, 2, [takenId]);
    for (const o of offers) {
      expect(o.mutation.id).not.toBe(takenId);
    }
  });
});

describe("propaganda", () => {
  it("raises conviction and suspicion", () => {
    const segments = createSegments();
    const seg = segments[0];
    const result = applyMessage(seg, "slogan", { day: 1, propagandaPower: 1, propagandaMod: 1, scientistsConverted: false });
    expect(result.convictionGained).toBeGreaterThan(0);
    expect(result.suspicionGained).toBeGreaterThan(0);
    expect(seg.conviction).toBeGreaterThan(0);
  });

  it("converts at 100% conviction", () => {
    const segments = createSegments();
    const seg = segments[0];
    for (let i = 0; i < 50; i++) {
      applyMessage(seg, "disinfoBlitz", { day: 1, propagandaPower: 2, propagandaMod: 2, scientistsConverted: true });
      if (seg.converted) break;
    }
    expect(seg.converted).toBe(true);
  });

  it("jams at 100% suspicion", () => {
    const segments = createSegments();
    const seg = segments[0];
    let jammed = false;
    for (let i = 0; i < 30 && !jammed; i++) {
      const r = applyMessage(seg, "disinfoBlitz", { day: 1, propagandaPower: 2, propagandaMod: 2, scientistsConverted: false });
      if (r.jammed) {
        jammed = true;
        expect(seg.jammedUntilDay).toBe(3);
      }
    }
    expect(jammed).toBe(true);
  });

  it("scientist synergy multiplies effects", () => {
    const segments = createSegments();
    const card = getMessageCard("doctoredFootage");
    const seg1 = segments[0];
    const r1 = applyMessage(seg1, card.id, { day: 1, propagandaPower: 1, propagandaMod: 1, scientistsConverted: false });
    const seg2 = segments[1];
    const r2 = applyMessage(seg2, card.id, { day: 1, propagandaPower: 1, propagandaMod: 1, scientistsConverted: true });
    expect(r2.convictionGained).toBeGreaterThan(r1.convictionGained);
  });

  it("totalConviction averages across segments", () => {
    const segments = createSegments();
    segments[0].conviction = 100;
    expect(totalConviction(segments)).toBe(25);
  });
});

describe("virus", () => {
  it("generates solvable pattern puzzles", () => {
    const p = generatePuzzle("pattern", 3, 7);
    const data = p.data as { target: string[]; options: string[][] };
    const correct = data.options.findIndex((o) => o.join(",") === data.target.join(","));
    expect(correct).toBeGreaterThanOrEqual(0);
    expect(validateSolution(p, correct)).toBe(true);
    expect(validateSolution(p, (correct + 1) % data.options.length)).toBe(false);
  });

  it("generates routing puzzles with valid shortest paths", () => {
    const p = generatePuzzle("routing", 4, 9);
    const data = p.data as { start: number; end: number; graph: Array<{ from: number; to: number; cost: number }> };
    const sol = p.solution as number[];
    expect(sol[0]).toBe(data.start);
    expect(sol[sol.length - 1]).toBe(data.end);
    expect(validateSolution(p, sol)).toBe(true);
    expect(validateSolution(p, [data.start])).toBe(false);
  });

  it("timing puzzles have windows and solution ticks inside them", () => {
    const p = generatePuzzle("timing", 2, 3);
    const data = p.data as { windows: number[][] };
    const sol = p.solution as number[];
    expect(sol.length).toBe(data.windows.length);
    for (let i = 0; i < data.windows.length; i++) {
      expect(sol[i]).toBeGreaterThanOrEqual(data.windows[i][0]);
      expect(sol[i]).toBeLessThanOrEqual(data.windows[i][1]);
    }
    expect(validateSolution(p, sol)).toBe(true);
  });

  it("system shutdown requires 4 of 5 nodes", () => {
    const nodes = createNodes(11, 2);
    expect(compromiseCount(nodes)).toBe(0);
    nodes[0].compromised = true;
    nodes[1].compromised = true;
    nodes[2].compromised = true;
    nodes[3].compromised = true;
    expect(systemShutdownReached(nodes)).toBe(true);
  });
});
