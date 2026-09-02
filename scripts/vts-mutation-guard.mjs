#!/usr/bin/env node
/**
 * vts-mutation-guard.mjs — VTS score-integrity exploit battery.
 *
 * Goodhart model: VTS is LLM-judged and LLM-chased; the guard does not trust a
 * round's score. It materializes KNOWN gaming moves as mutations of a candidate
 * change and asserts the score responds in the RIGHT axis. If an attack gains
 * points it shouldn't, the judge/rule is distrusted.
 *
 * Groundwork doc: .claude/docs/taste-anti-gaming.md (mutation-gate section).
 *
 * USAGE
 *   node vts-mutation-guard.mjs --list                     list the battery
 *   node vts-mutation-guard.mjs <file> --mutation <id>     print the mutated variant of <file>
 *   node vts-mutation-guard.mjs --verify <scores.json>     assert the rules against scored runs
 *   node vts-mutation-guard.mjs --selfcheck                validate the battery is well-formed
 *
 * scores.json shape for --verify:
 *   {
 *     "variants": [
 *       { "id": "decorative-glow", "axis": "Restraint", "before": 8, "after": 8 },
 *       { "id": "decorative-glow", "axis": "Craft",     "before": 9, "after": 9 }
 *     ]
 *   }
 * Each active mutation contributes axis-scopes; the guard replays the declared
 * ordering and flags any violation.
 */

import { readFileSync, existsSync } from 'node:fs';

// ── VTS axes (weights from AGENTS.md, only for reporting) ────────────────────
export const AXES = [
  ['Feel', 25],
  ['Coherence', 20],
  ['Restraint', 20],
  ['Signature', 15],
  ['Craft', 10],
  ['ScopeIntegrity', 10],
];

// ── Exploit battery ───────────────────────────────────────────────────────────
// Each mutation is a KNOWN way to inflate VTS. `inject` returns the mutated
// source only (never mutates the real file); `rule` names the axis the score
// must respond in; `must` is 'drop' (that axis must fall) or 'denyGain'
// (that axis must NOT rise — a purely-linguistic or off-essence move).
export const MUTATIONS = [
  {
    id: 'decorative-glow',
    label: 'Add a decorative glow/shimmer to a HUD element',
    rule: { axis: 'Restraint', must: 'drop' },
    inject: (src) => ({
      content: src.replace(
        /(\.[\w-]+\s*\{[^}]*?;)\s*\}/,
        '$1\n  box-shadow: 0 0 24px rgba(255, 215, 0, .9);\n  animation: pulse 2s ease-in-out infinite; }'
      ),
      note: 'appended box-shadow + infinite pulse to the first styled class',
    }),
  },
  {
    id: 'constant-shimmer',
    label: 'Replace a punch hit-stop with a constant shimmer',
    rule: { axis: 'Restraint', must: 'drop' },
    inject: (src) => ({
      content: src
        .replace(/animation: [\w-]+ \.28s ease-out/, 'animation: shimmer 2s infinite')
        .replace(/@keyframes [\w-]+-flash/, '@keyframes shimmer'),
      note: 'transient .28s flash -> 2s infinite shimmer',
    }),
  },
  {
    id: 'strip-info-surface',
    label: 'Remove a named info surface (round counter, HP)',
    rule: { axis: 'Craft', must: 'drop' },
    inject: (src) => ({
      content: src.replace(
        /<span[^>]*>[^<]*(?:回合|HP|体力|时间)[^<]*<\/span>\n?/,
        ''
      ),
      note: 'deleted the first line carrying a named round/HP/stat readout',
    }),
  },
  {
    id: 'fake-refactor',
    label: 'Wrap a 1-line fix into a fake 5-file refactor',
    rule: { axis: 'Restraint', must: 'drop' },
    inject: (src) => ({
      content: src + '\n/* ADDED-ONLY: 4 inline comment banners (restraint-suspect) */\n// [1] interface\n// [2] seam\n// [3] contract\n// [4] legacy note\n',
      note: 'sprayed 4 decorative comment banners around a trivial change',
    }),
  },
  {
    id: 'cinematic-copy',
    label: 'Reword copy to sound "more cinematic" (no mechanic change)',
    rule: { axis: 'Coherence', must: 'denyGain' },
    inject: (src) => ({
      content: src.replace(
        /([一-龥]{2,6})/,
        '凛冽破空而至#'
      ),
      note: 'replaced the first Chinese string with an em-dash flourish, no logic touched',
    }),
  },
  {
    id: 'strip-feedback-beat',
    label: 'Strip a real feedback beat (a shake, a flash, a pop)',
    rule: { axis: 'Feel', must: 'drop' },
    inject: (src) => ({
      content: src
        .replace(/emit\(\{ type: 'cameraShake'[\s\S]*?\}\);\n?/, '')
        .replace(/[^{]*(shake|flash|squash)[^{]*\{[\s\S]*?\}\n?/i, ''),
      note: 'deleted a cameraShake / flash / squash segment',
    }),
  },
];

export function ls() {
  return MUTATIONS.map((m) => `- ${m.id}  (${m.rule.axis} ${m.rule.must})  — ${m.label}`);
}

export function applyMutation(id, src) {
  const m = MUTATIONS.find((x) => x.id === id);
  if (!m) throw new Error(`unknown mutation "${id}" (see --list)`);
  return m.inject(src);
}

// --verify: replay a scored run and assert ordering. A violation is exactly
// the Goodhart signal: an axis moved the wrong way for that attack.
export function verify(scores) {
  const variants = scores.variants ?? [];
  const byId = {};
  for (const v of variants) {
    byId[v.id] = byId[v.id] ?? {};
    byId[v.id][v.axis] = v;
  }
  const failures = [];
  for (const m of MUTATIONS) {
    const scoped = byId[m.id]?.[m.rule.axis];
    if (!scoped) {
      failures.push({ id: m.id, error: `no scored '${m.rule.axis}' entry for ${m.id}` });
      continue;
    }
    const { before, after } = scoped;
    if (m.rule.must === 'drop' && after >= before) {
      failures.push({
        id: m.id,
        error: `'${m.rule.axis}' did NOT drop: ${before} -> ${after}`,
        severity: 'critical',
      });
    }
    if (m.rule.must === 'denyGain' && after > before) {
      failures.push({
        id: m.id,
        error: `'${m.rule.axis}' GAINED (${before} -> ${after}) on a no-mechanic change`,
        severity: 'critical',
      });
    }
  }
  return {
    ok: failures.length === 0,
    failures,
    total: MUTATIONS.length,
  };
}

export function selfcheck() {
  const errs = [];
  const axisNames = new Set(AXES.map(([a]) => a));
  if (new Set(MUTATIONS.map((m) => m.id)).size !== MUTATIONS.length) {
    errs.push('duplicate mutation id');
  }
  for (const m of MUTATIONS) {
    if (!axisNames.has(m.rule.axis)) errs.push(`${m.id}: unknown axis ${m.rule.axis}`);
    if (!['drop', 'denyGain'].includes(m.rule.must)) errs.push(`${m.id}: bad must ${m.rule.must}`);
    if (typeof m.inject !== 'function') errs.push(`${m.id}: missing inject()`);
  }
  return { ok: errs.length === 0, errs };
}

// ── CLI ───────────────────────────────────────────────────────────────────────
function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--selfcheck')) {
    const r = selfcheck();
    console.log(r.ok ? 'selfcheck: OK' : `selfcheck: FAIL\n ${r.errs.join('\n ')}`);
    process.exit(r.ok ? 0 : 1);
  }
  if (argv.includes('--list')) {
    console.log('Exploit battery:');
    console.log(ls().join('\n'));
    return;
  }
  const verifyAt = argv.indexOf('--verify');
  if (verifyAt >= 0) {
    const file = argv[verifyAt + 1];
    if (!file || !existsSync(file)) { console.error('--verify needs a scores.json path'); process.exit(2); }
    const result = verify(JSON.parse(readFileSync(file, 'utf8')));
    console.log(result.ok
      ? `verify: PASS (${result.total} attacks, none fooled)`
      : `verify: FAIL\n ${result.failures.map((f) => `- ${f.id}: ${f.error}`).join('\n ')}`);
    process.exit(result.ok ? 0 : 1);
  }
  const file = argv.find((a) => !a.startsWith('--') && existsSync(a));
  const mIdx = argv.indexOf('--mutation');
  if (file && mIdx >= 0) {
    const id = argv[mIdx + 1];
    const src = readFileSync(file, 'utf8');
    const { content, note } = applyMutation(id, src);
    process.stdout.write(`# mutation "${id}" (${note})\n# --- mutated variant (not written) ---\n${content}\n`);
    return;
  }
  console.log('usage: node vts-mutation-guard.mjs --list | --selfcheck | --verify <scores.json> | <file> --mutation <id>');
}

const IS_DIRECT = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('vts-mutation-guard.mjs');
if (IS_DIRECT) {
  main();
}
