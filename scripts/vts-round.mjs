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
import { rank, computeVTS, normalizedReward } from './vts-baseline.mjs';

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

/** Rank the registry's games by measured baseline, lowest first. Unscored last. */
function rankedTargets(registry) {
  const scores = JSON.parse(readFileSync(SCORES, 'utf8')).games;
  const inRegistry = Object.keys(registry.games);
  const ranked = rank(
    Object.fromEntries(Object.entries(scores).filter(([n]) => inRegistry.includes(n)))
  );
  const unscored = inRegistry.filter((n) => !ranked.some((r) => r.name === n));
  return { ranked, unscored };
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
    // STEP 1: the LOWEST measured baseline — lift the bottom, don't graze the top.
    target = ranked[0].name;
  } else {
    console.error(red('no measured baselines at all — a blind judge must score the games first'));
    process.exit(1);
  }

  const g = registry.games[target];
  const base = computeVTS(JSON.parse(readFileSync(SCORES, 'utf8')).games[target] || {});
  const pos = ranked.findIndex((r) => r.name === target) + 1;

  console.log(
    `ROUND TARGET — ${target}` +
      (base !== null ? `  (baseline ${base.toFixed(1)}, rank ${pos}/${ranked.length})` : '  (UNSCORED)')
  );
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
  const base = computeVTS(scores[target] || {});
  const ledger = readLedger();
  ledger.rounds.push({
    n: ledger.rounds.length + 1,
    at: today(),
    game: target,
    commit: sha,
    subject: prefixed,
    claim: claim.trim(),
    gates: 'green',
    baseline: base,
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
  const after = vtsAt >= 0 ? Number(argv[vtsAt + 1]) : NaN;
  if (!sha || !isFinite(after)) {
    console.error('usage: --verdict <commit> --vts <afterVTS>');
    process.exit(2);
  }
  const ledger = readLedger();
  const row = ledger.rounds.find((r) => r.commit === sha || sha.startsWith(r.commit));
  if (!row) {
    console.error(red(`no ledger round for ${sha}`));
    process.exit(1);
  }
  row.verdict = after;
  row.verdictAt = today();
  if (typeof row.baseline === 'number' && row.baseline > 0) {
    row.reward = normalizedReward(row.baseline, after);
  }
  writeLedger(ledger);
  console.log(
    `${row.game} @ ${row.commit}: base ${row.baseline} -> blind ${after}  ` +
      `normalised reward ${row.reward === undefined ? 'n/a' : row.reward.toFixed(2)} (ΔVTS/(base/100))`
  );
  if (row.reward !== undefined && row.reward < 0) {
    console.log(red('NEGATIVE — the blind judge says this round made the game worse. Revert it.'));
  }
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
    console.log(
      `  #${String(r.n).padStart(2)}  ${r.at}  ${r.game.padEnd(20)} ${r.commit}  base ${r.baseline}  blind ${v}${rw}`
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
