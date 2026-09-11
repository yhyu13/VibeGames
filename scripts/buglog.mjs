#!/usr/bin/env node
// scripts/buglog.mjs — the reader .wolf/buglog.json never had.
//
// WHY THIS FILE EXISTS
//
// OpenWolf's protocol says "read .wolf/buglog.json before fixing a bug — the fix may already
// be known" and "always append after fixing". Both are instructions to a human-shaped agent,
// and nothing in this harness enforced either one. A repo-wide grep for `buglog` found only
// OpenWolf plugins for OTHER harnesses (.kilo/, .opencode/ — not running here), the spent
// one-shot .vts-probes/wolf-update-r*.mjs scripts, and prose rules. So the file had no reader,
// and therefore no instrument that could see it was wrong. What accumulated unseen:
//
//   * four ids used twice by two different bugs each — bug-082, bug-224, bug-225, bug-227;
//   * 12 of 306 entries whose timestamp toISOString() cannot produce (a bare date, a
//     00:00:00Z sentinel, and hand-picked wall-clock times);
//   * an id sequence with holes where 236/237/238 were minted out of order.
//
// And it is not merely untidy: `related_bugs` carries bare references to "bug-224"/"bug-225"/
// "bug-227" that no longer identify a single bug, and the protocol's own read-before-fixing
// step resolves to the wrong entry for exactly the bugs that were logged under contention.
//
// FOUR SUBCOMMANDS
//
//   check   validate the whole file. Exits 1 on any NEW duplicate id, a malformed entry, a
//           non-generated timestamp that no one has declared, a dangling related_bugs
//           reference, or CR bytes.
//   add     append one entry. Re-reads the file IMMEDIATELY before writing and allocates the
//           id against that read, so the read-modify-write window that produced the four
//           collisions above is as small as it can be without a lockfile (see bug-260).
//   close   rewrite one entry's `fix` (optionally bumping `occurrences`/`last_seen`). This
//           subcommand exists because without it an entry logged `fix: "OPEN."` could only
//           ever be closed by editing the JSON by hand — and the hand-edit path is exactly
//           how the four duplicate ids and the twelve hand-written timestamps got in. A
//           reader plus an allocator with no closer still has a hand-edit path, and the
//           hand-edit path is the bug.
//   declare-legacy
//           record, ON AN ENTRY, that its `timestamp`/`last_seen` are not generated and why.
//           This is the same argument as `close`, one field over, and it was the last one
//           still missing: `check` reported a hand-written timestamp as an ERROR and told the
//           reader to "allocate it with `buglog.mjs add`" — advice about entries that do not
//           exist yet. For an entry that is already in the file there was no path at all
//           except a hand-edit of the JSON, or a hand-edit of this script's own allow-list
//           below. So four entries sat red, unrepairable by the tool that demands repair
//           (bug-493), and a gate nobody can clear is a gate nobody reads.
//
//           The declaration lives in the DATA rather than in this file so that the reason
//           travels with the value it excuses, and so that declaring is an ordinary write
//           instead of a source edit. It is deliberately NOT a mute button: the reason is
//           mandatory, the entry keeps warning afterwards, and the subcommand refuses to run
//           on an entry whose timestamps are already generated — there is nothing to declare
//           there, and a control that cannot fail is not evidence.
//
// THE ALLOW-LIST, AND WHY IT IS NOT A CONTROL THAT CANNOT FAIL
//
// The four known collisions are reported as WARN, not ERROR, because the honest repair is not
// available: renumbering one of each pair would make the file LOOK clean while silently
// resolving the inbound references to whichever entry the renumber picked. Repairing that
// properly means deciding, per reference, which bug was meant — a judgement call over history
// that this script must not make on its own. So the known four are declared here by id, with
// the reason, and `check` still fails the moment a FIFTH appears. A permanently-red gate would
// be a gate nobody reads; a gate that ignores duplicates entirely would be decoration.
//
// Usage:
//   node scripts/buglog.mjs check [--path .wolf/buglog.json]
//   node scripts/buglog.mjs add --error "..." --file "..." --root-cause "..." --fix "..." \
//        [--tags a,b,c] [--related bug-217,bug-260] [--occurrences 1] [--path .wolf/buglog.json]
//   node scripts/buglog.mjs close --id bug-313 --fix "..." [--occurrences 2] \
//        [--path .wolf/buglog.json]
//   node scripts/buglog.mjs declare-legacy --id bug-460 --why "..." [--path .wolf/buglog.json]

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_PATH = resolve(ROOT, '.wolf', 'buglog.json');

// The four collisions that predate this script, declared rather than ignored.
const KNOWN_DUPLICATE_IDS = new Set(['bug-082', 'bug-224', 'bug-225', 'bug-227']);
// Timestamps that predate this script too: a bare date, a midnight sentinel. They are reported
// as WARN so they stay visible, and an UNDECLARED one is an error. Two ways to declare, and the
// difference is who is doing the declaring: the ids below were already here when this script was
// written, so they are declared in source; an entry whose hand-written timestamp is discovered
// later is declared ON THE ENTRY with `declare-legacy`, so repairing it never needs a source edit.
const GENERATED_ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
// The on-entry declaration: a non-empty string explaining why this entry's timestamp is not
// generated. Its presence is what turns an ERROR into a WARN, so `check` validates it too — an
// empty or non-string value would be a declaration that says nothing.
const TIMESTAMP_LEGACY_FIELD = 'timestamp_legacy';
const LEGACY_TIMESTAMP_IDS = new Set([
  'bug-216', 'bug-217', 'bug-218', 'bug-227', 'bug-245', 'bug-246', 'bug-247',
  'bug-259', 'bug-260', 'bug-261', 'bug-266', 'bug-267',
]);

const REQUIRED_FIELDS = [
  'id', 'timestamp', 'error_message', 'file', 'root_cause', 'fix', 'tags', 'related_bugs',
  'occurrences', 'last_seen',
];

const argv = process.argv.slice(2);
const command = argv[0];
const flag = (name, fallback = undefined) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : fallback;
};
const target = resolve(ROOT, flag('path', DEFAULT_PATH));
const count = (s, ch) => s.split(ch).length - 1;

function fail(errors, warnings = []) {
  for (const w of warnings) console.log(`WARN  ${w}`);
  for (const e of errors) console.log(`ERROR ${e}`);
  console.log(`\nbuglog: ${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(1);
}

function load() {
  const raw = readFileSync(target, 'utf8');
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    fail([`${relative(ROOT, target)} is not valid JSON: ${e.message}`]);
  }
  if (!parsed || !Array.isArray(parsed.bugs)) fail([`${relative(ROOT, target)} has no "bugs" array`]);
  return { raw, parsed };
}

// ── check ───────────────────────────────────────────────────────────────────
function check() {
  const { raw, parsed } = load();
  const errors = [];
  const warnings = [];

  if (raw.includes('\r')) {
    errors.push(`${count(raw, '\r')} CR bytes — this file is LF, and a CRLF write is unrelated churn`);
  }

  const seen = new Map();
  for (const [i, e] of parsed.bugs.entries()) {
    const where = `bugs[${i}] (${e && e.id})`;
    if (!e || typeof e !== 'object') { errors.push(`${where} is not an object`); continue; }

    for (const f of REQUIRED_FIELDS) if (!(f in e)) errors.push(`${where} is missing ${f}`);
    if (typeof e.id !== 'string' || !/^bug-\d{3}$/.test(e.id)) errors.push(`${where} id is not bug-NNN`);
    if (!Array.isArray(e.tags) || e.tags.some((t) => typeof t !== 'string')) errors.push(`${where} tags must be a string array`);
    if (!Array.isArray(e.related_bugs)) errors.push(`${where} related_bugs must be an array`);
    if (!Number.isInteger(e.occurrences) || e.occurrences < 1) errors.push(`${where} occurrences must be a positive integer`);
    for (const f of ['error_message', 'file', 'root_cause', 'fix']) {
      if (typeof e[f] !== 'string' || e[f].trim() === '') errors.push(`${where} ${f} must be a non-empty string`);
    }

    const declaredHere = typeof e[TIMESTAMP_LEGACY_FIELD] === 'string' && e[TIMESTAMP_LEGACY_FIELD].trim() !== '';
    if (TIMESTAMP_LEGACY_FIELD in e && !declaredHere) {
      errors.push(`${where} ${TIMESTAMP_LEGACY_FIELD} must be a non-empty string — an empty declaration declares nothing`);
    }

    for (const f of ['timestamp', 'last_seen']) {
      const v = String(e[f]);
      if (GENERATED_ISO.test(v)) continue;
      if (LEGACY_TIMESTAMP_IDS.has(e.id)) {
        warnings.push(`${where} ${f} is ${JSON.stringify(v)}, not a generated ISO timestamp (pre-existing, declared in source)`);
      } else if (declaredHere) {
        warnings.push(`${where} ${f} is ${JSON.stringify(v)}, not a generated ISO timestamp (declared: ${e[TIMESTAMP_LEGACY_FIELD]})`);
      } else {
        errors.push(
          `${where} ${f} is ${JSON.stringify(v)}, which toISOString() cannot produce — ` +
            'allocate it with `buglog.mjs add`, or, if the entry is already here and the time of day is not ' +
            'recoverable, declare it with `buglog.mjs declare-legacy --id ... --why "..."`',
        );
      }
    }

    if (seen.has(e.id)) {
      const first = seen.get(e.id);
      if (KNOWN_DUPLICATE_IDS.has(e.id)) {
        warnings.push(`${where} repeats id ${e.id}, first used by bugs[${first}] (${JSON.stringify(String(parsed.bugs[first].error_message).slice(0, 60))}) — a KNOWN collision, left unrepaired on purpose`);
      } else {
        errors.push(`${where} repeats id ${e.id}, first used by bugs[${first}] — a NEW collision; ids are allocated by \`buglog.mjs add\`, so this means something wrote the file by hand`);
      }
    } else {
      seen.set(e.id, i);
    }
  }

  for (const e of parsed.bugs) {
    for (const r of e.related_bugs || []) {
      if (!seen.has(r)) errors.push(`${e.id} references ${r}, which is not in the file`);
    }
  }

  if (errors.length) fail(errors, warnings);
  for (const w of warnings) console.log(`WARN  ${w}`);
  console.log(
    `buglog: OK — ${parsed.bugs.length} entries, ${seen.size} distinct ids, ` +
      `LF only, no new duplicate id, every related_bugs reference resolved ` +
      `(${warnings.length} declared pre-existing warning(s))`,
  );
}

// ── add ─────────────────────────────────────────────────────────────────────
function add() {
  const fields = {
    error_message: flag('error'),
    file: flag('file'),
    root_cause: flag('root-cause'),
    fix: flag('fix'),
  };
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || String(v).trim() === '') {
      console.error(`buglog add: --${k.replace(/_/g, '-')} is required`);
      process.exit(2);
    }
  }
  const tags = (flag('tags', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
  const related = (flag('related', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
  const occurrences = Number(flag('occurrences', '1'));
  if (!Number.isInteger(occurrences) || occurrences < 1) {
    console.error('buglog add: --occurrences must be a positive integer');
    process.exit(2);
  }

  // bug-260: read IMMEDIATELY before allocating and writing, and re-read once more to prove
  // nobody slipped a write into the window. The previous pattern was "compute the next id from
  // what I last saw, then write the whole file", which is what collided four times.
  for (let attempt = 1; attempt <= 3; attempt++) {
    const before = JSON.parse(readFileSync(target, 'utf8'));
    const ids = before.bugs.map((b) => b.id);
    const taken = new Set(ids);
    const numeric = ids.map((i) => parseInt(String(i).replace(/\D/g, ''), 10)).filter(Number.isFinite);
    let n = numeric.length ? Math.max(...numeric) : 0;
    do { n += 1; } while (taken.has(`bug-${String(n).padStart(3, '0')}`));
    const id = `bug-${String(n).padStart(3, '0')}`;

    const now = new Date().toISOString();
    const next = { id, timestamp: now, ...fields, tags, related_bugs: related, occurrences, last_seen: now };

    const immediately = JSON.parse(readFileSync(target, 'utf8'));
    if (immediately.bugs.length !== before.bugs.length) {
      console.log(`buglog add: the file changed under me (attempt ${attempt}) — re-allocating`);
      continue;
    }

    before.bugs.push(next);
    writeFileSync(target, JSON.stringify(before, null, 2), 'utf8');

    // Prove the write landed, and that it did not introduce a duplicate.
    const after = JSON.parse(readFileSync(target, 'utf8'));
    const landed = after.bugs.find((b) => b.id === id && b.timestamp === now);
    const dupes = after.bugs.map((b) => b.id).filter((x, i, arr) => arr.indexOf(x) !== i);
    const newDupes = [...new Set(dupes)].filter((d) => !KNOWN_DUPLICATE_IDS.has(d));
    if (!landed) { console.error(`buglog add: ${id} did not land — nothing was recorded`); process.exit(1); }
    if (newDupes.length) { console.error(`buglog add: introduced duplicate id(s) ${newDupes.join(', ')}`); process.exit(1); }
    console.log(`buglog add: ${id}  (${after.bugs.length} entries, LF preserved, no new duplicate id)`);
    return;
  }
  console.error('buglog add: could not find a quiet window for the write after 3 attempts — nothing was written');
  process.exit(1);
}

// ── close ───────────────────────────────────────────────────────────────────
// Rewrite one entry's `fix`. Refuses anything ambiguous rather than guessing: four ids in
// this file are each used by two different bugs, and the whole reason they are still there
// is that "which bug did you mean" was never decided. A closer that picked the first match
// would silently rewrite the wrong bug's history, which is worse than failing.
function close() {
  const id = flag('id');
  const fix = flag('fix');
  if (id === undefined || String(id).trim() === '') {
    console.error('buglog close: --id is required');
    process.exit(2);
  }
  if (fix === undefined || String(fix).trim() === '') {
    console.error('buglog close: --fix is required');
    process.exit(2);
  }
  const occurrences = flag('occurrences');
  if (occurrences !== undefined && (!Number.isInteger(Number(occurrences)) || Number(occurrences) < 1)) {
    console.error('buglog close: --occurrences must be a positive integer');
    process.exit(2);
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    const rawBefore = readFileSync(target, 'utf8');
    const before = JSON.parse(rawBefore);
    const hits = before.bugs.map((b, i) => [b, i]).filter(([b]) => b.id === id);

    if (hits.length === 0) {
      console.error(`buglog close: ${id} is not in ${relative(ROOT, target)} — nothing to close`);
      process.exit(2);
    }
    if (hits.length > 1) {
      console.error(
        `buglog close: ${id} is used by ${hits.length} entries (bugs[${hits.map(([, i]) => i).join('], bugs[')}]). ` +
          'It cannot be closed by id alone — decide which bug is meant first. That undecided reference is the ' +
          'whole reason the collision is still in the file.',
      );
      process.exit(2);
    }

    const [entry, index] = hits[0];
    if (entry.fix === fix && occurrences === undefined) {
      console.error(`buglog close: ${id} already says exactly that — refusing a no-op write`);
      process.exit(2);
    }

    entry.fix = fix;
    entry.last_seen = new Date().toISOString();
    if (occurrences !== undefined) entry.occurrences = Number(occurrences);

    // Same discipline as `add`, but compared on BYTES rather than on length. `add` can get
    // away with a length test because appending always changes the length; a close rewrites
    // a field in place, so a second closer's write would leave the length untouched and the
    // length test would wave through the clobber.
    if (readFileSync(target, 'utf8') !== rawBefore) {
      console.log(`buglog close: the file changed under me (attempt ${attempt}) — re-reading`);
      continue;
    }
    writeFileSync(target, JSON.stringify(before, null, 2), 'utf8');

    const raw = readFileSync(target, 'utf8');
    const after = JSON.parse(raw);
    const landed = after.bugs[index];
    if (!landed || landed.id !== id || landed.fix !== fix) {
      console.error(`buglog close: the write did not land on ${id} — nothing was changed`);
      process.exit(1);
    }
    if (raw.includes('\r')) {
      console.error('buglog close: the write introduced CR bytes — this file is LF only');
      process.exit(1);
    }
    const ids = after.bugs.map((b) => b.id);
    const newDupes = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))].filter((d) => !KNOWN_DUPLICATE_IDS.has(d));
    if (newDupes.length) {
      console.error(`buglog close: introduced duplicate id(s) ${newDupes.join(', ')}`);
      process.exit(1);
    }
    console.log(`buglog close: ${id}  (${after.bugs.length} entries, LF preserved, no new duplicate id)`);
    return;
  }
  console.error('buglog close: could not find a quiet window for the write after 3 attempts — nothing was written');
  process.exit(1);
}

// ── declare-legacy ──────────────────────────────────────────────────────────
/**
 * Record ON AN ENTRY that its timestamps are not generated, and why.
 *
 * The refusals are the substance of this subcommand, not its politeness. It will not run without
 * a reason; it will not run on an entry whose timestamps are already generated, because there is
 * nothing there to excuse and a subcommand that always succeeds is evidence of nothing; and it
 * will not overwrite an existing declaration, because the second declaration is precisely the
 * one that would replace a true reason with a tidier one.
 */
function declareLegacy() {
  const id = flag('id');
  const why = flag('why');
  if (!id || !why) {
    console.error('usage: node scripts/buglog.mjs declare-legacy --id bug-460 --why "..." [--path .wolf/buglog.json]');
    process.exit(2);
  }
  if (why.trim() === '') {
    console.error('buglog declare-legacy: --why must say something — an empty declaration declares nothing');
    process.exit(2);
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    const rawBefore = readFileSync(target, 'utf8');
    const before = JSON.parse(rawBefore);
    const hits = before.bugs.map((b, i) => [b, i]).filter(([b]) => b.id === id);

    if (hits.length === 0) {
      console.error(`buglog declare-legacy: ${id} is not in ${relative(ROOT, target)} — nothing to declare`);
      process.exit(2);
    }
    if (hits.length > 1) {
      console.error(
        `buglog declare-legacy: ${id} is used by ${hits.length} entries (bugs[${hits.map(([, i]) => i).join('], bugs[')}]). ` +
          'It cannot be declared by id alone — decide which bug is meant first.',
      );
      process.exit(2);
    }

    const [entry, index] = hits[0];
    const handWritten = ['timestamp', 'last_seen'].filter((f) => !GENERATED_ISO.test(String(entry[f])));
    if (handWritten.length === 0) {
      console.error(
        `buglog declare-legacy: ${id} has no hand-written timestamp — both values are generated ISO. This ` +
          'subcommand excuses a value that cannot be regenerated, it does not annotate a good one.',
      );
      process.exit(2);
    }
    if (TIMESTAMP_LEGACY_FIELD in entry) {
      console.error(
        `buglog declare-legacy: ${id} is already declared (${JSON.stringify(entry[TIMESTAMP_LEGACY_FIELD])}) — ` +
          'refusing to overwrite one reason with another',
      );
      process.exit(2);
    }

    // Printed, not assumed: the values being excused are the whole subject of the write, and a
    // declaration that never stated what it was excusing could not be audited afterwards.
    for (const f of handWritten) {
      console.log(`  ${id} ${f}: ${JSON.stringify(entry[f])} — hand-written; the time of day is not recoverable`);
    }
    entry[TIMESTAMP_LEGACY_FIELD] = why;

    if (readFileSync(target, 'utf8') !== rawBefore) {
      console.log(`buglog declare-legacy: the file changed under me (attempt ${attempt}) — re-reading`);
      continue;
    }
    writeFileSync(target, JSON.stringify(before, null, 2), 'utf8');

    const raw = readFileSync(target, 'utf8');
    const after = JSON.parse(raw);
    const landed = after.bugs[index];
    if (!landed || landed.id !== id || landed[TIMESTAMP_LEGACY_FIELD] !== why) {
      console.error(`buglog declare-legacy: the write did not land on ${id} — nothing was changed`);
      process.exit(1);
    }
    if (raw.includes('\r')) {
      console.error('buglog declare-legacy: the write introduced CR bytes — this file is LF only');
      process.exit(1);
    }
    const ids = after.bugs.map((b) => b.id);
    const newDupes = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))].filter((d) => !KNOWN_DUPLICATE_IDS.has(d));
    if (newDupes.length) {
      console.error(`buglog declare-legacy: introduced duplicate id(s) ${newDupes.join(', ')}`);
      process.exit(1);
    }
    console.log(`buglog declare-legacy: ${id} declared (${after.bugs.length} entries, LF preserved, no new duplicate id)`);
    return;
  }
  console.error('buglog declare-legacy: could not find a quiet window for the write after 3 attempts — nothing was written');
  process.exit(1);
}

if (command === 'check') check();
else if (command === 'add') add();
else if (command === 'close') close();
else if (command === 'declare-legacy') declareLegacy();
else {
  console.error(
    'usage: node scripts/buglog.mjs check | add --error ... --file ... --root-cause ... --fix ... ' +
      '[--tags a,b] [--related bug-217] [--occurrences 1] | close --id bug-313 --fix ... [--occurrences 2] ' +
      '| declare-legacy --id bug-460 --why "..."',
  );
  process.exit(2);
}
