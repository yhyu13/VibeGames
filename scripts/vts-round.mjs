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

/** Added+deleted line count over the given pathspecs, vs HEAD. */
function diffLines(paths) {
  const { out } = git(['diff', 'HEAD', '--numstat', '--', ...paths], { allowFail: true });
  return out
    .split('\n')
    .filter(Boolean)
    .reduce((sum, line) => {
      const [a, d] = line.split('\t');
      return sum + (Number(a) || 0) + (Number(d) || 0);
    }, 0);
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
    if (!r.paired || typeof r.verdict !== 'number' || !scores.has(r.game)) continue;
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
 * Games whose LATEST landed round has no verdict yet.
 *
 * `currentScores()` can only re-rank on a paired verdict, so an unjudged round leaves its game
 * sitting on the same number it had before the round — which means the very next `--brief` picks
 * that game again. Unattended, that is the same "do one thing forever" failure the re-ranking fix
 * was written to remove, one step further out: the loop improves a game, nobody scores it, and the
 * loop improves the same game again, forever, each pass reporting a fresh target.
 *
 * The protocol already says an unjudged round cannot move the field. This makes the driver say it
 * too instead of quietly working around it.
 */
function unjudgedGames() {
  const latest = new Map();
  for (const r of readLedger().rounds) latest.set(r.game, r);
  return new Set([...latest].filter(([, r]) => typeof r.verdict !== 'number').map(([game]) => game));
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
    // Games whose last round is still unjudged are skipped: their number has not moved, so
    // re-choosing them would redo the work just done and call it a fresh target.
    const pending = unjudgedGames();
    const eligible = ranked.filter((r) => !pending.has(r.name));
    const skipped = ranked.filter((r) => pending.has(r.name));
    if (skipped.length) {
      console.log(
        dim(`  waiting on a verdict before re-choosing: ${skipped.map((r) => r.name).join(', ')}`)
      );
      if (!eligible.length) {
        console.log(
          dim('  (every scored game has an unjudged round — falling back to the floor rather than stalling)')
        );
      }
    }
    target = (eligible.length ? eligible : ranked)[0].name;
  } else {
    console.error(red('no measured baselines at all — a blind judge must score the games first'));
    process.exit(1);
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
  const target = explicit || (ranked.length ? ranked[0].name : null);
  if (!target) {
    console.error(red('no target — pass a game name'));
    process.exit(2);
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
    const v = r.verdict === null ? dim('unjudged') : `${r.verdict}`;
    const rw = r.reward === undefined ? '' : dim(` reward ${r.reward.toFixed(2)}`);
    // A paired verdict was computed against the parent scored by the SAME judge,
    // so print that base, not the artifact baseline it was never compared to.
    const base = r.paired ? `${r.parentVTS} paired` : `${r.baseline}`;
    console.log(
      `  #${String(r.n).padStart(2)}  ${r.at}  ${r.game.padEnd(20)} ${r.commit}  base ${base}  blind ${v}${rw}`
    );
    console.log(dim(`        ${r.subject}`));
  }
  const unjudged = ledger.rounds.filter((r) => r.verdict === null);
  if (unjudged.length) {
    console.log(`\n${unjudged.length} round(s) still need a fresh-context judge: ${unjudged.map((r) => r.commit).join(', ')}`);
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

  console.log('usage: node scripts/vts-round.mjs --brief [game] | --verify [game] [--msg-file f] |');
  console.log('                              --land <game> --subject "…" --claim "…" |');
  console.log('                              --verdict <commit> --vts <afterVTS> | --status');
  process.exit(2);
}

const IS_DIRECT = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('vts-round.mjs');
if (IS_DIRECT) main();
