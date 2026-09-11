#!/usr/bin/env node
/**
 * vts-gate.mjs — the round's hard gate, as an executable instead of a sentence.
 *
 * The round prompt used to say "gate green or REVERT" in prose. Prose is a wall an
 * agent can argue with; an exit code is not. This runs the gates the registry
 * declares for one game, in that game's own directory, and exits non-zero if any
 * of them is red — so a round that cannot pass has nothing to commit.
 *
 * It deliberately does NOT know how to build anything itself. It only runs the npm
 * scripts listed in vts-games.json, which were probed green on a clean tree when
 * the registry was written. A gate that is red at baseline could never land a
 * round, so an unprobed gate must never be listed there.
 *
 * USAGE
 *   node scripts/vts-gate.mjs <game>          run that game's gates (exit 1 if any red)
 *   node scripts/vts-gate.mjs --all           run every game's gates
 *   node scripts/vts-gate.mjs --probe <game>  run a SUPERSET (typecheck+test+build)
 *                                             to discover which gates are green
 *   node scripts/vts-gate.mjs --list          show what is configured
 *
 * Exit: 0 all green · 1 a gate failed · 2 bad usage / unknown game
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(HERE, '..');
const REGISTRY_PATH = join(HERE, 'vts-games.json');

// Same order as the round prompt's "npm run typecheck && npm run build": fail fast
// on the cheapest gate so a broken round is rejected before a full build runs.
const PROBE_GATES = ['typecheck', 'test', 'build'];
const GATE_TIMEOUT_MS = 300_000;

export function loadRegistry(path = REGISTRY_PATH) {
  const data = JSON.parse(readFileSync(path, 'utf8'));
  return data;
}

/** npm run <script> inside <dir>. Returns { ok, exit, ms, tail }. */
function runScript(dir, script, timeout = GATE_TIMEOUT_MS) {
  const started = Date.now();
  const res = spawnSync('npm', ['run', script], {
    cwd: dir,
    shell: true, // npm is a .cmd shim on Windows
    encoding: 'utf8',
    timeout,
    env: { ...process.env, CI: '1' }, // keep vite/tsc non-interactive
  });
  const ms = Date.now() - started;
  const out = `${res.stdout || ''}${res.stderr || ''}`.trimEnd();
  // npm exits 1 for both "script failed" and "script not found". Distinguish them
  // so a typo in the registry is not silently read as a red gate.
  const missing = res.status !== 0 && /Missing script/i.test(out);
  return {
    ok: res.status === 0,
    missing,
    exit: res.status === null ? `timeout/${timeout}ms` : res.status,
    ms,
    tail: out.split('\n').slice(-18).join('\n'),
  };
}

/** Run one game's configured gates. Returns { game, ok, results }. */
export function runGates(gameId, registry = loadRegistry(), { gates, quiet = false } = {}) {
  const game = registry.games[gameId];
  if (!game) throw new Error(`unknown game "${gameId}" — not in vts-games.json`);
  const list = gates || game.gates;
  const dir = join(ROOT, game.runDir);
  const results = [];
  for (const gate of list) {
    if (!quiet) process.stdout.write(`  ${gameId}  npm run ${gate} … `);
    const r = runScript(dir, gate);
    results.push({ gate, ...r });
    if (!quiet) {
      const verdict = r.ok ? 'OK' : r.missing ? 'MISSING SCRIPT' : 'RED';
      process.stdout.write(`${verdict}  (${(r.ms / 1000).toFixed(1)}s)\n`);
    }
    if (r.ok) continue;
    // A missing script is a REGISTRY bug, not a broken round. Say so loudly.
    if (!quiet) {
      console.error(`\n--- ${gameId} / npm run ${gate} (exit ${r.exit}) ---`);
      console.error(r.tail);
      console.error(
        r.missing
          ? `\n!! "${gate}" is not a script in ${game.runDir}/package.json — fix vts-games.json.`
          : `\n!! gate RED for ${gameId}. The round does not land. Revert, fix, re-gate.`
      );
    }
    return { game: gameId, ok: false, results };
  }
  return { game: gameId, ok: true, results };
}

function listGames(registry) {
  console.log('Configured targets (scripts/vts-games.json):\n');
  for (const [id, g] of Object.entries(registry.games)) {
    const flags = [g.anchor?.ratified === false ? 'anchor UNRATIFIED' : null].filter(Boolean);
    console.log(
      `  ${id.padEnd(20)} ${g.runDir.padEnd(22)} gates: ${g.gates.join(', ').padEnd(26)}${flags.join(' ')}`
    );
  }
  console.log(
    `\n  policy: features=${registry.policy.featurePolicy}  newDeps=${registry.policy.noNewRuntimeDeps ? 'blocked' : 'allowed'}  maxDiff=${registry.policy.maxDiffLines} lines`
  );
  console.log(`  frozen: ${registry.policy.forbiddenPaths.join(', ')}`);
}

function main() {
  const argv = process.argv.slice(2);
  const registry = loadRegistry();
  const ids = Object.keys(registry.games);

  if (argv.includes('--list') || argv.length === 0) {
    listGames(registry);
    process.exit(0);
  }

  if (argv.includes('--probe')) {
    const targets = argv.filter((a) => !a.startsWith('--'));
    const games = targets.length ? targets : ids;
    console.log('Probing a SUPERSET of gates to find which are green on this tree.\n');
    for (const id of games) {
      if (!registry.games[id]) {
        console.error(`unknown game "${id}"`);
        process.exit(2);
      }
      const g = registry.games[id];
      const usable = [];
      for (const gate of PROBE_GATES) {
        // A game with no `test` script legitimately lacks it; that is not a red gate.
        const r = runScript(join(ROOT, g.runDir), gate);
        if (r.ok) usable.push(gate);
        console.log(
          `  ${id.padEnd(20)} ${gate.padEnd(10)} ${r.ok ? 'green' : r.missing ? 'absent' : 'RED'}`
        );
      }
      console.log(`  => ${id}: set "gates": ${JSON.stringify(usable)}\n`);
    }
    process.exit(0);
  }

  const targets = argv.filter((a) => !a.startsWith('--'));
  if (argv.includes('--all')) {
    let failed = 0;
    for (const id of ids) {
      const r = runGates(id, registry);
      if (!r.ok) failed++;
    }
    console.log(failed ? `\n${failed} game(s) RED` : '\nall games green');
    process.exit(failed ? 1 : 0);
  }

  if (!targets.length) {
    console.error('usage: node scripts/vts-gate.mjs <game> | --all | --probe [game] | --list');
    process.exit(2);
  }
  let failed = 0;
  for (const id of targets) {
    if (!registry.games[id]) {
      console.error(`unknown game "${id}" — not in vts-games.json`);
      process.exit(2);
    }
    const r = runGates(id, registry);
    if (!r.ok) failed++;
  }
  if (!failed) console.log(`\ngate GREEN: ${targets.join(', ')}`);
  process.exit(failed ? 1 : 0);
}

const IS_DIRECT = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('vts-gate.mjs');
if (IS_DIRECT) main();
