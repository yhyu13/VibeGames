#!/usr/bin/env node
/**
 * vts-baseline.mjs — STEP 1 selection + anti-Goodhart normalized-reward driver.
 *
 * Turns the round's hand-waved "pick the lowest baseline, lift the bottom" into
 * deterministic code, and encodes the anti-Goodhart caps from AGENTS.md/CLAUDE.md
 * so a round cannot bless a change that would stand on a broken Coherence/Restraint
 * floor or a Restraint<=>Scope mismatch. It does NOT score anything itself — the
 * axis numbers are supplied by a blind judge; this only ranks and rewards them.
 *
 * USAGE
 *   node scripts/vts-baseline.mjs --rank   <game-scores.json>   VTS + ranking + lowest pick
 *   node scripts/vts-baseline.mjs --reward <game-scores.json> <game> <afterVTS>
 *                                                                 normalized reward ΔVTS/(base/100)
 *
 * game-scores.json shape:
 *   {
 *     "note": "per-game VTS baselines. axis scores 0-10; null = UNMEASURED (pending a
 *              real blind judge). The driver will not rank or reward an unscored game.",
 *     "games": {
 *       "11_blackhole": { "Feel": null, "Coherence": null, "Restraint": null,
 *                         "Signature": null, "Craft": null, "ScopeIntegrity": null }
 *     }
 *   }
 *
 * Weights (AGENTS.md) and the floor caps are single-source below; they mirror the
 * rubric exactly so the driver can never disagree with the judge's own floor rules.
 */
import { readFileSync, existsSync } from 'node:fs';

// VTS axes + weights (AGENTS.md). Named to match the guard's AXES exactly.
export const AXES = [
  ['Feel', 25],
  ['Coherence', 20],
  ['Restraint', 20],
  ['Signature', 15],
  ['Craft', 10],
  ['ScopeIntegrity', 10],
];
export const WEIGHTS = Object.fromEntries(AXES);

// Rubric caps — the anti-Goodhart walls. A bloated change that breaks these is
// self-defeating, and the driver enforces them so STEP 1/2 can never pick a game
// or bless a change that would stand on a broken floor.
export const COHERENCE_FLOOR = 4;          // Coherence < 4  => hard cap 60
export const RESTRAINT_FLOOR = 4;          // Restraint < 4  => hard cap 60
export const CAP_WHEN_FLOOR_BROKEN = 60;
export const RESTRAINT_FOR_RESTRAINT_SCORE = 6; // Restraint >= 6 requires ScopeIntegrity >= 6

/** True when an axis set is fully measured (no null/missing). */
function measured(g) {
  return AXES.every(([a]) => typeof g[a] === 'number');
}

/** VTS = Σ(wt × score) / 10, with the two floor caps + the Restraint<=>Scope
 *  coupling applied (so a top Restraint can't ride on a skeletal Scope). */
export function computeVTS(g) {
  if (!measured(g)) return null;
  let vts = 0;
  for (const [axis, wt] of AXES) vts += (wt * g[axis]) / 10;

  if (g.Coherence < COHERENCE_FLOOR || g.Restraint < RESTRAINT_FLOOR) {
    vts = Math.min(vts, CAP_WHEN_FLOOR_BROKEN);
  }
  // Top Restraint is only earned on a Scope-whole game. If Restraint is high but
  // the game is skeletal, it cannot hold that score — pin it to the floor+ε.
  if (g.Restraint >= RESTRAINT_FOR_RESTRAINT_SCORE && g.ScopeIntegrity < RESTRAINT_FOR_RESTRAINT_SCORE) {
    const corrected = AXES.reduce(
      (sum, [a, wt]) => sum + (a === 'Restraint' ? RESTRAINT_FOR_RESTRAINT_SCORE - 1 : g[a]) * wt,
      0,
    ) / 10;
    vts = Math.min(vts, corrected);
  }
  return vts;
}

/** Normalized reward that rewards lifting the bottom, not grazing the top:
 *  ΔVTS / (base/100). +5 from base 40 scores +12.5; the same +5 from base 80 scores
 *  +6.25 — so a bottom game is much cheaper to move meaningfully. */
export function normalizedReward(beforeVTS, afterVTS) {
  if (!(beforeVTS > 0)) return null;
  return (afterVTS - beforeVTS) / (beforeVTS / 100);
}

/** STEP 1 pick: the LOWEST measured baseline, ties broken lexicographically. */
export function pickLowest(games) {
  const scored = Object.entries(games)
    .map(([name, g]) => ({ name, vts: computeVTS(g) }))
    .filter((x) => x.vts !== null)
    .sort((a, b) => a.vts - b.vts || a.name.localeCompare(b.name));
  return scored.length ? scored[0] : null;
}

export function rank(games) {
  return Object.entries(games)
    .map(([name, g]) => ({ name, vts: computeVTS(g) }))
    .filter((x) => x.vts !== null)
    .sort((a, b) => a.vts - b.vts || a.name.localeCompare(b.name));
}

function main() {
  const argv = process.argv.slice(2);
  const rankAt = argv.indexOf('--rank');
  if (rankAt >= 0) {
    const file = argv[rankAt + 1];
    if (!file || !existsSync(file)) { console.error('--rank needs a game-scores.json path'); process.exit(2); }
    const data = JSON.parse(readFileSync(file, 'utf8'));
    const ranked = rank(data.games);
    console.log('VTS ranking (measured games only) — lowest first:');
    for (const r of ranked) console.log(`${r.vts.toFixed(1).padStart(6)}  ${r.name}`);
    const lowest = pickLowest(data.games);
    console.log(`\nSTEP 1 pick (lowest baseline): ${lowest ? `${lowest.name} @ ${lowest.vts.toFixed(1)}` : 'NO MEASURED GAME — judge the games first'}`);
    process.exit(0);
  }
  const rewardAt = argv.indexOf('--reward');
  if (rewardAt >= 0) {
    const file = argv[rewardAt + 1];
    const game = argv[rewardAt + 2];
    const after = Number(argv[rewardAt + 3]);
    if (!file || !game || !isFinite(after)) { console.error('--reward <game-scores.json> <game> <afterVTS>'); process.exit(2); }
    const data = JSON.parse(readFileSync(file, 'utf8'));
    const base = computeVTS(data.games[game]);
    if (base === null) { console.error(`${game}: not yet scored (needs a complete axis set)`); process.exit(2); }
    const r = normalizedReward(base, after);
    console.log(`${game}: base ${base.toFixed(1)} -> after ${after.toFixed(1)}  normalised reward ${r === null ? 'n/a' : r.toFixed(2)} (ΔVTS/(base/100))`);
    process.exit(0);
  }
  console.log('usage: node scripts/vts-baseline.mjs --rank <game-scores.json> | --reward <game-scores.json> <game> <afterVTS>');
}

const IS_DIRECT = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('vts-baseline.mjs');
if (IS_DIRECT) main();
