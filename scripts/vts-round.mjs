#!/usr/bin/env node
/**
 * vts-round.mjs — one round of the forever-pipeline, as code instead of prose.
 *
 * The round used to be a paragraph of instructions an agent could read loosely:
 * "pick the lowest game, make one change, gate green or revert, commit only that
 * project". Every clause of that paragraph is a sentence, and a sentence is a wall
 * an agent can argue with. This file makes each clause a check with an exit code:
 *
 *   --brief    STEP 1 + STEP 2's constraints, assembled from the registry and the
 *              measured baselines, so the agent does not re-derive the target.
 *   --verify   STEP 0 + STEP 3: the mutation guard, the scope wall, the diff budget,
 *              and the real gates. Non-zero exit = the round does not land.
 *   --land     STEP 4: verify, stage ONLY the target's paths, commit with a message
 *              whose shape is validated BEFORE it exists.
 *   --status   the local ledger, so a fresh session can see what previous rounds did.
 *
 * The one thing this file deliberately cannot do is decide WHAT to change. That is
 * the taste judgement the pipeline exists to elicit, and a script that could make it
 * would be a script that could game it.
 *
 * USAGE
 *   node scripts/vts-round.mjs --brief [game]
 *   node scripts/vts-round.mjs --verify [game] [--msg-file <path>]
 *   node scripts/vts-round.mjs --land <game> --subject "<one line>" --claim "<one line>"
 *   node scripts/vts-round.mjs --status
 *   node scripts/vts-round.mjs --revert <commit> [--why "<one line>"]
 *   node scripts/vts-round.mjs --verdict <commit> --vts <afterVTS>
 *
 * Exit: 0 the step passed · 1 the round is rejected · 2 bad usage
 */
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

import { loadRegistry, runGates, ROOT } from './vts-gate.mjs';
import { computeVTS, normalizedReward } from './vts-baseline.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SCORES = join(ROOT, 'game-scores.json');
const GUARD_FIXTURE = join(ROOT, 'scores.json');
const LEDGER = join(ROOT, '.wolf', 'vts-rounds.json');

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

// ---------------------------------------------------------------- git helpers

function git(args, { allowFail = false } = {}) {
  const res = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
  if (res.status !== 0 && !allowFail) {
    throw new Error(`git ${args.join(' ')} failed (${res.status}): ${res.stderr || res.stdout}`);
  }
  return { ok: res.status === 0, out: (res.stdout || '').trim(), err: (res.stderr || '').trim() };
}

/** Normalise a path to repo-relative forward slashes for comparison. */
const norm = (p) => p.replace(/\\/g, '/').replace(/^\.\//, '');

/** Is `path` inside `prefix` (a file, or a directory prefix)? */
function under(path, prefix) {
  const p = norm(path);
  const q = norm(prefix);
  return p === q || p.startsWith(q.endsWith('/') ? q : `${q}/`);
}

/** Working-tree changes (staged + unstaged + untracked) as repo-relative paths. */
function changedPaths() {
  const { out } = git(['status', '--porcelain', '--untracked-files=all'], { allowFail: true });
  return out
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      // " M path" / "?? path" / "R  old -> new"
      const rest = line.slice(3);
      const arrow = rest.indexOf(' -> ');
      return norm(arrow >= 0 ? rest.slice(arrow + 4) : rest);
    });
}

/**
 * Added+deleted line count over the given pathspecs, vs HEAD — including files the
 * round CREATES.
 *
 * `git diff HEAD --numstat` reports tracked changes only: a file that did not exist
 * at HEAD cannot be diffed against it, so it contributes nothing however large it
 * is. That made the budget blind in precisely the direction that matters, since the
 * whole point of a round is to add something. Measured on round #20: the budget read
 * 218 (161+57, tracked only) against a true 355 — a 137-line new test file was
 * invisible to it. Untracked, non-ignored files are therefore counted by reading them.
 *
 * `--exclude-standard` is load-bearing: without it `node_modules` would be counted
 * and every round would blow the budget on install artifacts.
 */
export function diffLines(paths) {
  let total = 0;
  const { out } = git(['diff', 'HEAD', '--numstat', '--', ...paths], { allowFail: true });
  for (const line of out.split('\n')) {
    if (!line) continue;
    const [a, d] = line.split('\t');
    total += (Number(a) || 0) + (Number(d) || 0);
  }

  const { out: untracked } = git(
    ['ls-files', '--others', '--exclude-standard', '--', ...paths],
    { allowFail: true },
  );
  for (const file of untracked.split('\n')) {
    if (!file) continue;
    let buf;
    try {
      buf = readFileSync(join(ROOT, file));
    } catch {
      continue; // listed but unreadable — never fail the budget over that
    }
    if (buf.includes(0)) continue; // binary: "lines" is not a meaningful count
    const text = buf.toString('utf8');
    if (text === '') continue;
    total += text.split('\n').length - (text.endsWith('\n') ? 1 : 0);
  }
  return total;
}

// ------------------------------------------------------------- the message law

/**
 * The commit-message constraints, as code. Returns a list of violations.
 * The body must state a CLAIM a human could check by playing, and nothing else:
 * no VTS numbers, because an author that prints its own score is grading its own
 * homework, and the whole protocol exists to stop that.
 */
export function checkMessage(game, subject, body) {
  const bad = [];
  const sub = (subject || '').trim();
  if (!new RegExp(`^enhance\\(${game.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\): \\S`).test(sub)) {
    bad.push(`subject must match "enhance(${game}): <one line>" — got "${sub}"`);
  }
  if (sub.includes('\n')) bad.push('subject must be ONE line');

  const claim = (body || '').trim();
  if (!claim) bad.push('body must carry the one-line observable claim');

  const AXIS_WORDS = /\b(VTS|Feel|Coherence|Restraint|Signature|Craft|ScopeIntegrity|Scope Integrity)\b/i;
  if (AXIS_WORDS.test(claim)) bad.push('body names a rubric axis or VTS — state an observable claim, not a score');
  if (/\d+(\.\d+)?\s*(->|→|=>)\s*\d+/.test(claim)) bad.push('body contains a score delta — no VTS numbers in the body');
  if (/\b\d{2}\.\d\b/.test(claim)) bad.push('body contains a VTS-shaped number — no VTS numbers in the body');
  return bad;
}

// ------------------------------------------------------------------ the ledger

function readLedger() {
  const empty = { note: 'Local round ledger (untracked). One entry per landed round.', rounds: [] };
  if (!existsSync(LEDGER)) return empty;
  try {
    const l = JSON.parse(readFileSync(LEDGER, 'utf8'));
    if (!Array.isArray(l.rounds)) return empty;
    return l;
  } catch {
    return empty;
  }
}

function writeLedger(l) {
  writeFileSync(LEDGER, `${JSON.stringify(l, null, 2)}\n`, 'utf8');
}

const today = () => new Date().toISOString().slice(0, 10); // ISO 8601 YYYY-MM-DD

// -------------------------------------------------------------- registry utils

/**
 * Static sanity of the registry itself. The dangerous failure is a target whose
 * `paths` overlap a frozen path: `--land` would then happily stage decompiled
 * original assets or a verbatim extraction study, which is exactly the thing the
 * frozen list exists to prevent. Catch it here rather than at commit time.
 */
function checkRegistry(registry) {
  const bad = [];
  for (const [id, g] of Object.entries(registry.games)) {
    for (const p of g.paths) {
      for (const f of registry.policy.forbiddenPaths) {
        if (under(p, f) || under(f, p)) bad.push(`${id}: path "${p}" overlaps frozen "${f}"`);
      }
    }
    if (!g.gates?.length) bad.push(`${id}: no gates declared — the round would land unverified`);
  }
  return bad;
}

/**
 * Each game's CURRENT best-known score: the measured baseline, overridden by the
 * verdict of any PAIRED round that landed on it.
 *
 * Ranking on the static baseline alone is a surface pretending to be information —
 * it never moves, so `--brief` re-selects the game that was just improved and the
 * loop does one thing forever while reporting a fresh target every time.
 *
 * Only a PAIRED verdict may re-rank the field. A paired verdict was produced by ONE
 * judge scoring both ends, so it sits on the same scale as the number it replaces;
 * an unpaired one is another instrument's reading and may decide a verdict, but it
 * may not silently rebase the ranking.
 */
function currentScores(registry) {
  const baselines = JSON.parse(readFileSync(SCORES, 'utf8')).games;
  const inRegistry = Object.keys(registry.games);
  const scores = new Map();
  for (const n of inRegistry) {
    const v = baselines[n] ? computeVTS(baselines[n]) : null;
    if (v !== null) scores.set(n, v);
  }
  for (const r of readLedger().rounds) {
    if (!r.paired || !scores.has(r.game)) continue;
    // A REVERTED round no longer describes the artifact. The ledger row names a commit;
    // the ranking claims to describe the game; a revert is exactly the operation that
    // pulls those apart. The artifact is back on the round's parent, and the same judge
    // scored that end of this very pair at `parentVTS` — so that is the honest number.
    // Keeping the reverted verdict instead ranks the game on a commit that is no longer
    // its head, and here it errs DOWNWARD: it would aim the next round at a game whose
    // real score is the one this round was reverted for failing to reach.
    if (r.reverted) {
      if (typeof r.parentVTS === 'number') scores.set(r.game, r.parentVTS);
      continue;
    }
    if (typeof r.verdict !== 'number') continue;
    scores.set(r.game, r.verdict);
  }
  const unscored = inRegistry.filter((n) => !scores.has(n));
  return { scores, unscored };
}

/** Rank the registry's games by current score, lowest first. Unscored last. */
function rankedTargets(registry) {
  const { scores, unscored } = currentScores(registry);
  const ranked = [...scores]
    .map(([name, vts]) => ({ name, vts }))
    .sort((a, b) => a.vts - b.vts || a.name.localeCompare(b.name));
  return { ranked, unscored };
}

/**
 * Games whose LATEST landed round has no verdict that may RE-RANK them.
 *
 * `currentScores()` only re-ranks on a PAIRED verdict, so a round that is unjudged — or scored by
 * a single-ended `--verdict`, which is a different instrument's reading — leaves its game sitting
 * on the number it had before the round, which means the very next `--brief` picks that game
 * again. Unattended, that is the same "do one thing forever" failure the re-ranking fix was
 * written to remove, one step further out: the loop improves a game, nobody scores it on the same
 * instrument, and the loop improves the same game again, forever, each pass reporting a fresh
 * target.
 *
 * The predicate here MUST match `currentScores()`'. Asking "is there a verdict?" in one place
 * while asking "is there a PAIRED verdict?" in the other strands every single-ended verdict in the
 * worst of both states — skipped by neither test, so the game neither moves nor stops being
 * picked. `--verdict` accepts a single-ended score by design (it is how a judge's first pass gets
 * recorded), so that state is reachable with a legal command, not a malformed ledger.
 *
 * The protocol already says an unpaired round cannot move the field, and Step 4 says to get a
 * paired re-score "before touching anything". This makes the driver say it too instead of quietly
 * working around it.
 *
 * Returns a Map of game -> why, so the caller can tell "nobody has scored this" apart from
 * "somebody scored it with one instrument". The remedy is the same command either way, but only
 * one of those is actually missing a judge, and a loop that cannot tell them apart will go looking
 * for a judge that already reported.
 */
function unjudgedGames() {
  const latest = new Map();
  for (const r of readLedger().rounds) latest.set(r.game, r);
  const pending = new Map();
  for (const [game, r] of latest) {
    if (typeof r.verdict !== 'number') pending.set(game, 'unjudged');
    else if (!r.paired) pending.set(game, `single-ended ${r.verdict}`);
  }
  return pending;
}

/**
 * The game a round is about, chosen the one way this file chooses it.
 *
 * `--brief` and `--verify` are two halves of one round: the brief names the game to work on and
 * prints the anchor; the verify gates the work that came back. They must therefore answer "which
 * game" with the SAME rule, and until round #43 they did not — `cmdBrief` filtered through
 * `unjudgedGames()` and `cmdVerify` did not, taking raw `rankedTargets()[0]` instead. The two
 * diverge in exactly one state, and it is the common one: a game whose round has landed but whose
 * verdict has not come back yet is withheld by the brief and picked by the verify. On round #43
 * the change sat uncommitted in `4_chunbai` while `--verify` printed "STEP 3a — scope: only
 * 9_3dplatform may change … PASS 0 added+deleted … ROUND MAY LAND": a full green wall, every line
 * true, about a game the working tree had not touched. Nothing in either command's own output
 * shows it; it is visible only in the disagreement, which is why the rule lives here once rather
 * than being restated at each call site.
 *
 * Withheld games come back rather than being dropped, so each caller can say in its own voice why
 * it did not pick them — "go find a judge" and "send it back for a paired re-score" are different
 * errands, and the command that owns the round is the one that should phrase them.
 */
function pickTarget(ranked) {
  const pending = unjudgedGames();
  const eligible = ranked.filter((r) => !pending.has(r.name));
  return {
    // Fall back to the floor when EVERY scored game is withheld. Stalling on a verdict that is
    // never coming is worse than re-ranking a game whose number is merely provisional — and both
    // commands must fall back on the same condition, or the disagreement returns through it.
    target: (eligible.length ? eligible : ranked)[0]?.name ?? null,
    eligible,
    skipped: ranked.filter((r) => pending.has(r.name)),
    pending,
  };
}

/** How a withheld game is described, in one place so the two commands cannot phrase it two ways. */
function withheldWhy(skipped, pending) {
  return skipped.map((r) => {
    const reason = pending.get(r.name);
    return reason === 'unjudged' ? r.name : `${r.name} (${reason}, needs a PAIRED re-score)`;
  });
}

/**
 * Games with LANDED `enhance(<game>)` work that the LEDGER HAS NO ROW FOR.
 *
 * `unjudgedGames()` can only withhold a game it can see, and it sees games THROUGH the ledger. A
 * round committed without `--land` — by hand, or by an older tool — leaves no row at all, so that
 * predicate cannot see the game however many unlodged rounds sit at its head. Measured 2026-09-12:
 * `13_spysatellite` has ZERO ledger rows while `943ea01 enhance(13_spysatellite): …` is the newest
 * commit touching its paths. It appears in the standings only through its stored baseline: every
 * other game's number there is a judge's reading, that one is an author's registration.
 *
 * This WARNS, it does not WITHHOLD, and the reason is that withholding here can only stall. The
 * remedy for an unjudged round is a `--verdict`, and `--verdict` finds the row it updates by sha —
 * a game with no row has no legal command that clears the state, so withholding it would remove it
 * from the loop permanently. The cost of NOT withholding is bounded and worth naming: the round
 * that eventually picks the game is still judged on one instrument against the game's head, so its
 * paired delta is valid; what is lost is the earlier unjudged improvement, which is silently folded
 * into the new round's parent. Making that fold-in visible is the whole fix.
 *
 * The predicate is the newest commit THAT TOUCHES THE GAME'S PATHS, compared against every sha the
 * ledger names — not the game's newest ledger row. That distinction is load-bearing: a head that is
 * a `chore(<game>): revert …` is a DOCUMENTED revert of an already-recorded round and must NOT be
 * flagged (`14_neuraltexture`'s head is exactly that). Only an `enhance(<game>)` subject that no
 * row names is landed work nobody has scored.
 */
function landedWithoutRow(registry) {
  const known = new Set(readLedger().rounds.map((r) => r.commit).filter(Boolean));
  const found = new Map();
  for (const [name, g] of Object.entries(registry.games)) {
    if (!g.paths || !g.paths.length) continue;
    const res = git(['log', '-1', '--format=%h%x09%s', '--', ...g.paths], { allowFail: true });
    if (!res.ok || !res.out) continue;
    const [sha, ...rest] = res.out.split('\t');
    const subject = rest.join(' ');
    if (!sha || !subject.startsWith(`enhance(${name})`)) continue;
    if (known.has(sha)) continue;
    found.set(name, { sha, subject });
  }
  return found;
}

// -------------------------------------------------------------------- commands

function cmdBrief(registry, argv) {
  const { ranked, unscored } = rankedTargets(registry);
  const explicit = argv.find((a) => registry.games[a]);

  let target;
  if (explicit) {
    target = explicit;
    console.log(dim(`(target pinned on the command line: ${explicit})\n`));
  } else if (ranked.length) {
    // STEP 1: the LOWEST CURRENT score — lift the bottom, don't graze the top.
    // Games whose last round has not been judged on ONE instrument are skipped: their number has
    // not moved, so re-choosing them would redo the work just done and call it a fresh target.
    const { target: pick, eligible, skipped, pending } = pickTarget(ranked);
    if (skipped.length) {
      // Say WHY each one is withheld. "unjudged" means go find a judge; "single-ended 71.5" means a
      // judge already reported and its reading cannot re-rank — send it back for the paired re-score
      // rather than hunting a second opinion at large.
      console.log(
        dim(`  waiting on a verdict before re-choosing: ${withheldWhy(skipped, pending).join(', ')}`)
      );
      if (!eligible.length) {
        console.log(
          dim('  (every scored game is withheld — falling back to the floor rather than stalling)')
        );
      }
    }
    target = pick;
  } else {
    console.error(red('no measured baselines at all — a blind judge must score the games first'));
    process.exit(1);
  }

  // Landed work the ledger has no row for is invisible to every other guard in this file — the
  // withholding predicate included — so it is said here, in the one command that runs before
  // every round.
  const orphaned = landedWithoutRow(registry);
  if (orphaned.size) {
    console.log(yellow('\n  landed work the ledger has no row for:'));
    for (const [name, { sha, subject }] of orphaned) {
      console.log(yellow(`    ${name}  ${sha}  ${subject}`));
    }
    console.log(dim('    `--verdict` finds the row it updates by sha, so no score can be attached to these;'));
    console.log(dim('    when a round picks one, its unscored change folds into that round\'s parent.'));
  }

  const g = registry.games[target];
  const { scores } = currentScores(registry);
  const baseline = computeVTS(JSON.parse(readFileSync(SCORES, 'utf8')).games[target] || {});
  const base = scores.has(target) ? scores.get(target) : baseline;
  const pos = ranked.findIndex((r) => r.name === target) + 1;

  // Print BOTH when they differ: the target is chosen on where the game stands NOW,
  // but the stored baseline is the number a fresh judge would be handed, and a
  // reader who only sees one of them cannot tell an improved game from an untouched one.
  const shown =
    base === null
      ? '  (UNSCORED)'
      : `  (current ${base.toFixed(1)}${base !== baseline ? `, baseline ${baseline.toFixed(1)}` : ''}, rank ${pos}/${ranked.length})`;
  console.log(`ROUND TARGET — ${target}${shown}`);
  if (unscored.length) {
    console.log(
      dim(`  unscored, so unrankable: ${unscored.join(', ')} — these need a blind judge before a round can pick them`)
    );
  }

  console.log(`\napp dir   ${g.runDir}`);
  console.log(`may touch ${g.paths.join(', ')}`);
  console.log(`gate      node scripts/vts-gate.mjs ${target}`);

  console.log(`\nanchor — Coherence and Signature are scored against this, not re-derived:`);
  console.log(`  ${g.anchor.essence}`);
  for (const x of g.anchor.exclusions) console.log(dim(`  ✕ ${x}`));
  if (g.anchor.ratified === false) {
    console.log(red('  !! this anchor is DRAFTED, not ratified by the maintainer — treat it as provisional'));
  }

  console.log(`\npolicy`);
  console.log(
    `  features          ${registry.policy.featurePolicy === 'free' ? 'FREE — a feature that raises VTS is allowed' : 'not allowed'}`
  );
  console.log(`  new runtime deps  ${registry.policy.noNewRuntimeDeps ? 'BLOCKED' : 'allowed'}`);
  console.log('  one change        yes — one idea, one commit');
  console.log(`  diff budget       ${registry.policy.maxDiffLines} lines (added+deleted), enforced by --verify`);
  console.log(`  frozen            ${registry.policy.forbiddenPaths.join(', ')}`);

  console.log(`\nland with`);
  console.log(dim(`  node scripts/vts-round.mjs --land ${target} --subject "<one line>" --claim "<observable claim>"`));
  console.log(`\nread before choosing the change`);
  console.log(dim('  .claude/docs/vts-round-prompt.md — the operating brief (the protocol is taste-anti-gaming.md)'));
  process.exit(0);
}

function cmdVerify(registry, argv) {
  const { ranked } = rankedTargets(registry);
  const explicit = argv.find((a) => registry.games[a]);
  // Same rule as --brief, by construction rather than by agreement: pickTarget() is the only place
  // in this file where the target is chosen, so a green verify cannot name a game the brief would
  // not have sent you to. See the round-#43 note on pickTarget() for what this cost when the two
  // rules lived apart. An explicitly named game still wins — that is the escape hatch when the
  // round's own choice is being questioned.
  const { target: pick, skipped, pending } = pickTarget(ranked);
  const target = explicit || pick;
  if (!target) {
    console.error(red('no target — pass a game name'));
    process.exit(2);
  }
  if (!explicit && skipped.length) {
    // Name the withheld games HERE too, on the verify side. Without this line the green wall reads
    // as "the tree is fine", when what it actually measured is the one game that was not waiting
    // on a verdict — which is the reading that let round #43's wrong target pass for correct.
    console.log(
      dim(`(target chosen by --brief's rule; withheld: ${withheldWhy(skipped, pending).join(', ')})\n`)
    );
  }
  const g = registry.games[target];
  const msgFileAt = argv.indexOf('--msg-file');
  const msgFile = msgFileAt >= 0 ? argv[msgFileAt + 1] : null;
  const problems = [...checkRegistry(registry)];

  console.log('STEP 0 — anti-Goodhart mutation guard');
  for (const [label, args] of [
    ['--selfcheck', ['--selfcheck']],
    [`--verify ${relative(ROOT, GUARD_FIXTURE)}`, ['--verify', GUARD_FIXTURE]],
  ]) {
    const r = spawnSync(process.execPath, [join(HERE, 'vts-mutation-guard.mjs'), ...args], {
      cwd: ROOT,
      encoding: 'utf8',
    });
    const ok = r.status === 0;
    console.log(`  ${ok ? green('PASS') : red('FAIL')}  ${label}`);
    if (!ok) {
      problems.push(`mutation guard ${label} did not pass`);
      console.log(dim((r.stdout || r.stderr || '').split('\n').slice(0, 12).join('\n')));
    }
  }

  console.log(`\nSTEP 3a — scope: only ${target} may change`);
  const staged = git(['diff', '--cached', '--name-only'], { allowFail: true })
    .out.split('\n')
    .filter(Boolean)
    .map(norm);
  const outside = staged.filter((p) => !g.paths.some((pre) => under(p, pre)));
  if (outside.length) {
    problems.push(`STAGED changes outside the target: ${outside.join(', ')}`);
    console.log(`  ${red('FAIL')}  staged outside target: ${outside.join(', ')}`);
  } else {
    console.log(`  ${green('PASS')}  ${staged.length ? `${staged.length} staged file(s), all inside` : 'nothing staged yet'}`);
  }

  const all = changedPaths();
  const peers = (p) => g.paths.some((pre) => under(p, pre));
  // A frozen path is VIOLATED only when something actually changed it. Files that
  // are merely UNTRACKED are not evidence: 15_rc_demo and 16_raytrace_demo are not
  // committed yet, so every file inside them shows up in `git status` on a clean
  // tree. Only a staged file, or a tracked file that differs from HEAD, counts.
  const trackedDiffs = git(['diff', 'HEAD', '--name-only'], { allowFail: true })
    .out.split('\n')
    .filter(Boolean)
    .map(norm);
  const touched = [...new Set([...staged, ...trackedDiffs])];
  const frozen = touched.filter((p) => registry.policy.forbiddenPaths.some((pre) => under(p, pre)));
  const theirs = all.filter((p) => !peers(p) && !p.startsWith('.wolf/') && !p.startsWith('scripts/'));
  if (frozen.length) {
    problems.push(`FROZEN paths changed: ${frozen.join(', ')}`);
    console.log(`  ${red('FAIL')}  frozen paths changed: ${frozen.join(', ')}`);
  }
  if (theirs.length) {
    console.log(
      dim(
        `  note: unrelated working-tree churn (never staged by --land): ${theirs.slice(0, 6).join(', ')}` +
          `${theirs.length > 6 ? ` … +${theirs.length - 6}` : ''}`
      )
    );
  }

  console.log(`\nSTEP 3b — diff budget (${registry.policy.maxDiffLines} lines over ${g.paths.join(', ')})`);
  const lines = diffLines(g.paths);
  const overBudget = lines > registry.policy.maxDiffLines;
  console.log(
    `  ${overBudget ? red('FAIL') : green('PASS')}  ${lines} added+deleted` +
      (overBudget ? ` (over by ${lines - registry.policy.maxDiffLines})` : '')
  );
  if (overBudget) problems.push(`diff is ${lines} lines, budget is ${registry.policy.maxDiffLines} — split the round`);

  console.log('\nSTEP 3c — gates');
  const gateResult = runGates(target, registry);
  if (!gateResult.ok) problems.push(`gate RED for ${target}`);

  if (msgFile) {
    console.log('\nSTEP 4a — commit message');
    const raw = readFileSync(msgFile, 'utf8');
    const [subject, ...rest] = raw.split('\n');
    const body = rest.join('\n').replace(/^Co-Authored-By:.*$/gim, '').trim();
    const bad = checkMessage(target, subject, body);
    if (bad.length) {
      problems.push(...bad);
      for (const b of bad) console.log(`  ${red('FAIL')}  ${b}`);
    } else {
      console.log(`  ${green('PASS')}  subject + claim are well-formed, no VTS numbers`);
    }
  }

  console.log('');
  if (problems.length) {
    console.log(red(`ROUND REJECTED — ${problems.length} problem(s):`));
    for (const p of problems) console.log(`  · ${p}`);
    process.exit(1);
  }
  console.log(green(`ROUND MAY LAND — ${target} is scoped, budgeted, guarded and green.`));
  process.exit(0);
}

function cmdLand(registry, argv) {
  const target = argv.find((a) => registry.games[a]);
  const subjAt = argv.indexOf('--subject');
  const claimAt = argv.indexOf('--claim');
  const subject = subjAt >= 0 ? argv[subjAt + 1] : '';
  const claim = claimAt >= 0 ? argv[claimAt + 1] : '';
  if (!target || !subject || !claim) {
    console.error('usage: --land <game> --subject "<one line>" --claim "<observable claim>"');
    process.exit(2);
  }
  const g = registry.games[target];
  // `--land <game>` already carries the game, so deriving the prefix removes a way
  // to get it wrong without loosening what the commit must look like: the FULL
  // subject is still validated below, prefix included.
  const named = /^enhance\(([^)]+)\):/.exec(subject.trim());
  if (named && named[1] !== target) {
    console.error(red(`subject names "${named[1]}" but the target is "${target}"`));
    process.exit(2);
  }
  const prefixed = named
    ? subject.trim()
    : `enhance(${target}): ${subject.trim()}`;

  const bad = checkMessage(target, prefixed, claim);
  if (bad.length) {
    console.log(red('message rejected before anything was staged:'));
    for (const b of bad) console.log(`  · ${b}`);
    process.exit(2);
  }

  // Stage ONLY the target's paths. This is the mechanical form of "never stage
  // unrelated churn": the staging command cannot see anything else, so the
  // constraint holds even if the working tree is full of someone else's edits.
  const add = git(['add', '--', ...g.paths], { allowFail: true });
  if (!add.ok) {
    console.error(red(`git add failed: ${add.err || add.out}`));
    process.exit(1);
  }
  const staged = git(['diff', '--cached', '--name-only'], { allowFail: true })
    .out.split('\n')
    .filter(Boolean);
  if (!staged.length) {
    console.error(red('nothing staged inside the target paths — is there a change at all?'));
    process.exit(1);
  }
  // Build output is not a round. `git add` already honours .gitignore, so anything
  // caught here is a build tree that is genuinely TRACKED — a hygiene defect that
  // would put a whole generated bundle in the commit and blow the diff budget.
  const artifact = staged.map(norm).filter(
    (p) => /(^|\/)(dist|build|out|\.vite|node_modules)\//.test(p) || /\.(map|min\.js)$/.test(p)
  );
  if (artifact.length) {
    console.error(red(`refusing to commit build output (${artifact.length} file(s)):`));
    for (const a of artifact.slice(0, 5)) console.error(`  · ${a}`);
    console.error('  Add it to .gitignore, or stage the authored files explicitly. Nothing was committed.');
    process.exit(1);
  }

  // Gate AFTER staging, so a red gate leaves the change staged and revertable
  // rather than committed.
  console.log(`gating ${target} before commit …`);
  const gateResult = runGates(target, registry);
  if (!gateResult.ok) {
    console.log(red('GATE RED — not committing. The change is staged; `git reset` to unstage.'));
    process.exit(1);
  }

  // The artifact's PREVIOUS state — the last commit that touched this game's paths.
  // Recorded so a verdict can be checked against a parent scored by the SAME judge:
  // a baseline from a different judge is a different scale, not a before/after.
  const parent = git(['log', '-1', '--format=%h', '--', ...g.paths], { allowFail: true }).out || null;

  const dir = mkdtempSync(join(tmpdir(), 'vts-msg-'));
  const msgPath = join(dir, 'COMMIT_EDITMSG');
  writeFileSync(
    msgPath,
    `${prefixed}\n\n${claim.trim()}\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>\n`,
    'utf8'
  );
  const commit = git(['commit', '-F', msgPath], { allowFail: true });
  if (!commit.ok) {
    console.error(red(`git commit failed: ${commit.err || commit.out}`));
    process.exit(1);
  }
  const sha = git(['rev-parse', '--short', 'HEAD']).out;

  const scores = JSON.parse(readFileSync(SCORES, 'utf8')).games;
  const measured = computeVTS(scores[target] || {});
  // Record where the game stands NOW, not the frozen baseline: an unpaired verdict
  // is divided by this number, and dividing an improvement to an already-improved
  // game by its ORIGINAL score would pay the round twice for the same lift.
  const { scores: current } = currentScores(registry);
  const base = current.has(target) ? current.get(target) : measured;
  const ledger = readLedger();
  ledger.rounds.push({
    n: ledger.rounds.length + 1,
    at: today(),
    game: target,
    commit: sha,
    parent,
    subject: prefixed,
    claim: claim.trim(),
    gates: 'green',
    baseline: base,
    measuredBaseline: measured,
    verdict: null,
    verdictAt: null,
  });
  writeLedger(ledger);

  console.log(green(`LANDED ${sha}  ${prefixed}`));
  console.log(dim(`  files: ${staged.join(', ')}`));
  console.log(dim(`  ledger: ${relative(ROOT, LEDGER)} round #${ledger.rounds.length}`));
  console.log(`\nNEXT — the author does NOT score this. Spawn a fresh-context judge on ${sha}; then:`);
  console.log(dim(`  node scripts/vts-round.mjs --verdict ${sha} --vts <afterVTS>`));
  process.exit(0);
}

/**
 * Undo a landed round, in one step, with the ledger kept honest.
 *
 * The round brief's rule is blunt: a PAIRED and negative verdict is a real regression and the
 * round is reverted. Doing that by hand runs `git revert`, then leaves the ledger describing a
 * commit that is no longer the artifact — and `currentScores()` reads the ledger, so the ranking
 * silently keeps the reverted number until someone remembers to correct it. Measured the one time
 * it was done by hand: 14_neuraltexture was reverted in `d7bce90`, and `--brief` still reported
 * `current 68.3` for a game whose shipped artifact the same judge had scored 76.5.
 *
 * So the revert and the marker are one command. `--why` is the one-line body; it defaults to the
 * plain observation rather than the round's claim, because the claim is the thing that failed.
 */
function cmdRevert(argv) {
  const whyAt = argv.indexOf('--why');
  // Skip --why's own value as well as the flags themselves, so `--revert --why "…"` reports the
  // missing commit rather than hunting the ledger for a sentence.
  const sha = argv.find((a, i) => !a.startsWith('--') && i !== whyAt + 1);
  if (!sha) {
    console.error('usage: --revert <roundCommit> [--why "<one line: what was observed>"]');
    process.exit(2);
  }

  const ledger = readLedger();
  const row = ledger.rounds.find((r) => r.commit === sha || (r.commit && r.commit.startsWith(sha)));
  if (!row) {
    console.error(`no ledger round at ${sha} — --revert only undoes a round this driver landed`);
    process.exit(2);
  }
  if (row.reverted) {
    console.error(`round #${row.n} was already reverted in ${row.reverted}; nothing to do`);
    process.exit(1);
  }

  const registry = loadRegistry();
  const g = registry.games[row.game];
  if (!g) {
    console.error(`${row.game} is no longer in the registry — revert it by hand`);
    process.exit(2);
  }

  const rev = git(['revert', '--no-commit', row.commit], { allowFail: true });
  if (!rev.ok) {
    console.error(red(`git revert ${row.commit} failed: ${rev.err || rev.out}`));
    console.error('  Resolve by hand; nothing was committed and nothing is marked reverted.');
    process.exit(1);
  }

  // Same scope wall as --land: a revert may only touch its own game.
  const staged = git(['diff', '--cached', '--name-only'], { allowFail: true })
    .out.split('\n').filter(Boolean).map(norm);
  const outside = staged.filter((p) => !g.paths.some((pre) => under(p, pre)));
  if (outside.length) {
    git(['reset'], { allowFail: true });
    console.error(red(`revert touched paths outside ${row.game}: ${outside.join(', ')}`));
    console.error('  Unstaged; investigate before reverting.');
    process.exit(1);
  }
  if (!staged.length) {
    console.error(`git revert ${row.commit} produced no change — already undone? Nothing staged.`);
    process.exit(1);
  }

  console.log(`gating ${row.game} before the revert commit …`);
  if (!runGates(row.game, registry).ok) {
    console.log(red('GATE RED — not committing the revert. The change is staged; `git reset` to unstage.'));
    process.exit(1);
  }

  const subject = `chore(${row.game}): revert ${row.commit} — a paired judge scored it below its own parent`;
  const body = whyAt >= 0 && argv[whyAt + 1]
    ? argv[whyAt + 1]
    : `The round's own claim is what the judge falsified; see the ledger row #${row.n} and the bug log.`;
  const dir = mkdtempSync(join(tmpdir(), 'vts-revert-'));
  const msgPath = join(dir, 'COMMIT_EDITMSG');
  writeFileSync(
    msgPath,
    `${subject}\n\n${body}\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>\n`,
    'utf8'
  );
  const commit = git(['commit', '-F', msgPath], { allowFail: true });
  if (!commit.ok) {
    console.error(red(`git commit failed: ${commit.err || commit.out}`));
    process.exit(1);
  }
  const revertSha = git(['rev-parse', '--short', 'HEAD']).out;

  row.reverted = revertSha;
  row.revertedAt = today();
  writeLedger(ledger);

  const { scores } = currentScores(registry);
  console.log(green(`REVERTED ${revertSha}  round #${row.n} (${row.game} @ ${row.commit})`));
  console.log(dim(`  files: ${staged.join(', ')}`));
  console.log(dim(`  ledger: round #${row.n} marked reverted; ${row.game} now ranks at ${scores.get(row.game)} (the parent it was reverted to, same instrument)`));
  process.exit(0);
}

function cmdVerdict(argv) {
  const sha = argv.find((a) => !a.startsWith('--'));
  const vtsAt = argv.indexOf('--vts');
  const vsAt = argv.indexOf('--vs');
  const judgeAt = argv.indexOf('--judge');
  const after = vtsAt >= 0 ? Number(argv[vtsAt + 1]) : NaN;
  const parentVTS = vsAt >= 0 ? Number(argv[vsAt + 1]) : NaN;
  const judge = judgeAt >= 0 ? argv[judgeAt + 1] : 'unnamed';
  if (!sha || !isFinite(after)) {
    console.error('usage: --verdict <commit> --vts <afterVTS> [--vs <parentVTS>] [--judge "<who scored it>"]');
    process.exit(2);
  }
  const ledger = readLedger();
  const row = ledger.rounds.find((r) => r.commit === sha || sha.startsWith(r.commit));
  if (!row) {
    console.error(red(`no ledger round for ${sha}`));
    process.exit(1);
  }
  // PAIRED (`--vs`) is the strong form: ONE judge scored both the parent and this
  // commit, so the delta is a real before/after. UNPAIRED compares against the
  // artifact baseline, which a DIFFERENT judge may have set — and blind judges
  // disagree by far more than a round moves (three judges have scored this repo's
  // 9_3dplatform at 46.5, 46.0 and 66.0). Cross-judge drift is not signal.
  const paired = isFinite(parentVTS);
  const base = paired ? parentVTS : row.baseline;
  row.verdict = after;
  row.verdictAt = today();
  row.judge = judge;
  row.paired = paired;
  if (paired) row.parentVTS = parentVTS;
  if (typeof base === 'number' && base > 0) row.reward = normalizedReward(base, after);
  writeLedger(ledger);

  console.log(
    `${row.game} @ ${row.commit}: ${paired ? `SAME-judge base ${parentVTS}` : `base ${row.baseline} (different judge)`}` +
      ` -> blind ${after}  normalised reward ${row.reward === undefined ? 'n/a' : row.reward.toFixed(2)} (ΔVTS/(base/100))`
  );
  if (paired) {
    console.log(
      row.reward < 0
        ? red(`REGRESSION — one instrument scored this BELOW its own parent. Revert ${row.commit}.`)
        : green(`IMPROVEMENT on one instrument — the round moved the artifact, not the scale.`)
    );
    process.exit(0);
  }
  if (row.reward === undefined || row.reward >= 0) process.exit(0);

  console.log(red('NEGATIVE reward — but this compared TWO DIFFERENT judges\' scales.'));
  console.log('  That is not yet evidence of a regression. Get it by re-scoring the parent with');
  console.log('  the judge that scored this commit, and passing it back as a paired verdict:');
  console.log(dim(`    node scripts/vts-round.mjs --verdict ${row.commit} --vts <thisScore> --vs <parentScore> --judge "same judge, both ends"`));
  console.log(`  Parent artifact commit: ${row.parent || 'unknown'}`);
  console.log('  And check the axis the round actually touched — if that axis did not move,');
  console.log('  the round did not cause the difference.');
  process.exit(0);
}

function cmdStatus() {
  const ledger = readLedger();
  if (!ledger.rounds.length) {
    console.log('no rounds landed yet');
    process.exit(0);
  }
  console.log(`Landed rounds (${relative(ROOT, LEDGER)}):\n`);
  for (const r of ledger.rounds) {
    // Three states, and `--brief` treats them differently, so the ledger has to show all three:
    // nobody has scored it, one instrument scored it (which cannot re-rank the field), or one judge
    // scored both ends (which can). Printing the middle one as a bare number hides the reason its
    // game keeps being withheld from selection.
    const v =
      typeof r.verdict !== 'number'
        ? dim('unjudged')
        : r.paired
          ? `${r.verdict}`
          : `${r.verdict} ${dim('single-ended')}`;
    const rw = r.reward === undefined ? '' : dim(` reward ${r.reward.toFixed(2)}`);
    // A paired verdict was computed against the parent scored by the SAME judge,
    // so print that base, not the artifact baseline it was never compared to.
    const base = r.paired ? `${r.parentVTS} paired` : `${r.baseline}`;
    console.log(
      `  #${String(r.n).padStart(2)}  ${r.at}  ${r.game.padEnd(20)} ${r.commit}  base ${base}  blind ${v}${rw}`
    );
    console.log(dim(`        ${r.subject}`));
  }
  // Same predicate `--brief` withholds on, so the summary cannot disagree with the selection.
  const unjudged = ledger.rounds.filter((r) => typeof r.verdict !== 'number');
  const singleEnded = ledger.rounds.filter((r) => typeof r.verdict === 'number' && !r.paired);
  if (unjudged.length) {
    console.log(`\n${unjudged.length} round(s) still need a fresh-context judge: ${unjudged.map((r) => r.commit).join(', ')}`);
  }
  if (singleEnded.length) {
    console.log(
      `\n${singleEnded.length} round(s) were scored by ONE instrument, so they cannot re-rank the field until re-scored paired: ` +
        singleEnded.map((r) => `${r.commit} (${r.verdict} — re-run --verdict with --vs <parentScore>)`).join(', ')
    );
  }
  process.exit(0);
}

// ------------------------------------------------------------------------ main

function main() {
  const argv = process.argv.slice(2);
  const registry = loadRegistry();

  if (argv.includes('--status')) return cmdStatus();
  if (argv.includes('--brief')) return cmdBrief(registry, argv);
  if (argv.includes('--verify')) return cmdVerify(registry, argv);
  if (argv.includes('--land')) return cmdLand(registry, argv);
  if (argv.includes('--verdict')) return cmdVerdict(argv);
  if (argv.includes('--revert')) return cmdRevert(argv);

  console.log('usage: node scripts/vts-round.mjs --brief [game] | --verify [game] [--msg-file f] |');
  console.log('                              --land <game> --subject "…" --claim "…" |');
  console.log('                              --verdict <commit> --vts <afterVTS> |');
  console.log('                              --revert <roundCommit> [--why "…"] | --status');
  process.exit(2);
}

const IS_DIRECT = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('vts-round.mjs');
if (IS_DIRECT) main();
