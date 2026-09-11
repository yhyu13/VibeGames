#!/usr/bin/env node
// scripts/wolf-file.mjs — the writer .wolf/ never had, and the reason it keeps getting damaged.
//
// WHY THIS FILE EXISTS
//
// Every round of the VTS loop ends by editing the same three untracked files: `.wolf/STATUS.md`
// (the header stack and the Done bullet), `.wolf/memory.md` (a row per action) and
// `.wolf/cerebrum.md` (what was learned). None of them is in git — `git status` does not list a
// single byte of `.wolf/` — so a bad write has no undo that does not go through the session
// transcript. And each round wrote them with a fresh throwaway `node -e` or `.mjs` script, which
// meant the same three mistakes got made over and over:
//
//   * bug-485 — a script replaced the line whose prefix is `> Last updated:` on the assumption
//     that a line starting with a date is short. On this repo that line is an ACCUMULATING stack:
//     each round prepends its own paragraph and pushes the previous header down as a literal
//     `(Earlier: …)` tail. It was 11,856 characters long and became 347. Recovered byte-exactly
//     from the session transcript, which is not a backup strategy.
//   * bug-491 — a script did `s.split(/\r?\n/).join('\n')` to edit one element. Splitting on
//     /\r?\n/ strips the CR, so every line ending in the file was silently rewritten: 231 CRLF
//     became 233 lone LF. `core.autocrlf=true` and no `.gitattributes` means the repo is full of
//     files where this matters.
//   * four entries in `buglog.json` carry a hand-written `timestamp: "2026-09-12"` that
//     `toISOString()` cannot produce, because `buglog.mjs` — which exists precisely to allocate
//     generated timestamps — was bypassed in favour of a hand-edit.
//
// The common cause is not carelessness in any one round; it is that the correct path lived in
// scratch directories that get thrown away, so no round could inherit it. This file is that path,
// promoted into the tracked tree.
//
// THE THREE GUARDS
//
//   1. LINE ENDINGS ARE PRESERVED, AND THE PRESERVATION IS ASSERTED. The file's EOL is detected,
//      every inserted newline uses it, and a write is REFUSED if it would leave lone-LF bytes in a
//      file that had none. Not "we tried to preserve them" — the census is compared.
//   2. REPLACING A LINE REQUIRES STATING ITS CURRENT LENGTH. `replace-line` will not run without
//      `--expect-length N`, and refuses if the line is not exactly N characters. This is the
//      bug-485 guard: the accident was not "the new text was wrong", it was that nothing ever
//      looked at what was being replaced.
//   3. ANCHORS MUST BE UNIQUE. `splice-before` refuses unless the anchor occurs exactly the
//      expected number of times, so a splice cannot silently land in the wrong place.
//
// Every mutating command prints the census before and after, so the write carries its own receipt.
// A guard that fails writes NOTHING and exits non-zero.
//
// USAGE
//
//   node scripts/wolf-file.mjs census <file>
//   node scripts/wolf-file.mjs replace-line <file> <n> --expect-length N --text-file <f>
//   node scripts/wolf-file.mjs splice-before <file> --anchor-file <f> --text-file <f>
//                                                    [--expect-matches 1] [--expect-bytes N]
//   node scripts/wolf-file.mjs append <file> --text-file <f>
//
// Exit codes: 0 written, 1 guard refused, 2 usage error.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

/** EOL census of a text: how many CRLF pairs, and how many LF that are NOT part of one. */
export function census(text) {
  const crlf = (text.match(/\r\n/g) || []).length
  const loneLf = (text.match(/(?<!\r)\n/g) || []).length
  return { bytes: Buffer.byteLength(text, 'utf8'), chars: text.length, crlf, loneLf, lines: text.split(/\r\n|\n/).length }
}

const fmt = (c) => `${c.bytes} bytes, ${c.lines} lines, CRLF ${c.crlf}, lone LF ${c.loneLf}`

/** Read the file, remembering the EOL convention it uses so insertions can match it. */
export function readWolf(file) {
  const text = readFileSync(file, 'utf8')
  return { text, eol: text.includes('\r\n') ? '\r\n' : '\n' }
}

/**
 * Write `text` back to `file`, refusing any change that would alter the file's EOL convention.
 *
 * The refusal is the point. A file that was pure CRLF and comes back with lone LF has been
 * damaged in a way no reader will complain about — the content is right, the bytes are not, and
 * on this repo a later diff against a git-tracked sibling shows churn that did not happen.
 * Comparing the census is the only check that catches it.
 */
export function writeWolf(file, text, { before, eol } = {}) {
  const after = census(text)
  if (eol === '\r\n' && after.loneLf > 0) {
    throw new Error(
      `refusing to write ${file}: the file uses CRLF but this text has ${after.loneLf} lone LF ` +
        `(the split/join that strips \\r is the usual cause — see bug-491)`,
    )
  }
  if (before && before.loneLf === 0 && after.loneLf > 0) {
    throw new Error(`refusing to write ${file}: it had no lone LF before and would have ${after.loneLf} after`)
  }
  writeFileSync(file, text)
  return after
}

/**
 * Replace one 1-based line, but only after being told how long that line currently is.
 *
 * `expectLength` is required, not optional. bug-485 happened because a script replaced a line it
 * had never measured; making the caller state the number means the caller has to have looked.
 */
export function replaceLine(file, lineNumber, newText, { expectLength, expectBytes } = {}) {
  if (!Number.isInteger(lineNumber) || lineNumber < 1) throw new Error(`bad line number ${lineNumber}`)
  if (!Number.isInteger(expectLength)) {
    throw new Error('replaceLine requires expectLength — state the current length of the line you are replacing')
  }
  const { text, eol } = readWolf(file)
  const lines = text.split(/\r\n|\n/)
  if (lineNumber > lines.length) throw new Error(`${file} has ${lines.length} lines; line ${lineNumber} does not exist`)
  const old = lines[lineNumber - 1]
  if (old.length !== expectLength) {
    throw new Error(
      `refusing to replace line ${lineNumber} of ${file}: it is ${old.length} chars, not the ${expectLength} stated. ` +
        'Re-read it — on this repo a "date line" can be an accumulating stack of every previous header (bug-485).',
    )
  }
  const before = census(text)
  if (expectBytes !== undefined && before.bytes !== expectBytes) {
    throw new Error(`refusing: ${file} is ${before.bytes} bytes, not the ${expectBytes} stated`)
  }
  lines[lineNumber - 1] = newText
  return { before, after: writeWolf(file, lines.join(eol), { before, eol }), oldLength: old.length }
}

/**
 * Insert `insertText` immediately before a unique anchor, using the file's own EOL.
 *
 * `insertText` may be given with \n newlines; they are translated, so a caller working in a
 * heredoc cannot accidentally introduce LF into a CRLF file.
 */
export function spliceBefore(file, anchor, insertText, { expectMatches = 1, expectBytes } = {}) {
  const { text, eol } = readWolf(file)
  const before = census(text)
  if (expectBytes !== undefined && before.bytes !== expectBytes) {
    throw new Error(`refusing: ${file} is ${before.bytes} bytes, not the ${expectBytes} stated`)
  }
  const n = text.split(anchor).length - 1
  if (n !== expectMatches) {
    throw new Error(
      `refusing to splice ${file}: the anchor occurs ${n} time(s), expected ${expectMatches}. ` +
        'An ambiguous anchor lands somewhere, just not necessarily where you meant.',
    )
  }
  const i = text.indexOf(anchor)
  const insert = insertText.split('\n').join(eol)
  return { before, after: writeWolf(file, text.slice(0, i) + insert + text.slice(i), { before, eol }) }
}

/** Append text, translating its newlines to the file's convention. */
export function appendWolf(file, text, { expectBytes } = {}) {
  const { text: current, eol } = readWolf(file)
  const before = census(current)
  if (expectBytes !== undefined && before.bytes !== expectBytes) {
    throw new Error(`refusing: ${file} is ${before.bytes} bytes, not the ${expectBytes} stated`)
  }
  return { before, after: writeWolf(file, current + text.split('\n').join(eol), { before, eol }) }
}

// ── CLI ────────────────────────────────────────────────────────────────────────────────────────
const isEntry = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isEntry) {
  const argv = process.argv.slice(2)
  const cmd = argv[0]
  const flag = (name) => {
    const i = argv.indexOf(`--${name}`)
    return i >= 0 ? argv[i + 1] : undefined
  }
  const pos = argv.slice(1).filter((a, i, all) => !a.startsWith('--') && !(all[i] ?? '').startsWith('--'))
  const textFile = flag('text-file')
  const read = (f) => readFileSync(f, 'utf8').replace(/\r?\n$/, '')
  const optBytes = flag('expect-bytes') ? Number(flag('expect-bytes')) : undefined
  const usage = () =>
    console.error(
      'usage: node scripts/wolf-file.mjs census <file>\n' +
        '       node scripts/wolf-file.mjs replace-line <file> <n> --expect-length N --text-file <f>\n' +
        '       node scripts/wolf-file.mjs splice-before <file> --anchor-file <f> --text-file <f> [--expect-matches 1]\n' +
        '       node scripts/wolf-file.mjs append <file> --text-file <f>',
    )

  try {
    if (cmd === 'census') {
      const file = pos[0]
      if (!file) {
        usage()
        process.exit(2)
      }
      const { text, eol } = readWolf(file)
      console.log(`${file}: ${fmt(census(text))} (EOL ${JSON.stringify(eol)})`)
    } else if (cmd === 'replace-line') {
      const [file, n] = pos
      if (!file || !n || !textFile) {
        usage()
        process.exit(2)
      }
      const r = replaceLine(file, Number(n), read(textFile), {
        expectLength: Number(flag('expect-length')),
        expectBytes: optBytes,
      })
      console.log(`${file}: replaced line ${n} (was ${r.oldLength} chars)`)
      console.log(`  before: ${fmt(r.before)}\n  after:  ${fmt(r.after)}`)
    } else if (cmd === 'splice-before') {
      const file = pos[0]
      const anchorFile = flag('anchor-file')
      if (!file || !anchorFile || !textFile) {
        usage()
        process.exit(2)
      }
      const r = spliceBefore(file, read(anchorFile), readFileSync(textFile, 'utf8'), {
        expectMatches: flag('expect-matches') ? Number(flag('expect-matches')) : 1,
        expectBytes: optBytes,
      })
      console.log(`${file}: spliced`)
      console.log(`  before: ${fmt(r.before)}\n  after:  ${fmt(r.after)}`)
    } else if (cmd === 'append') {
      const file = pos[0]
      if (!file || !textFile) {
        usage()
        process.exit(2)
      }
      const r = appendWolf(file, readFileSync(textFile, 'utf8'), { expectBytes: optBytes })
      console.log(`${file}: appended`)
      console.log(`  before: ${fmt(r.before)}\n  after:  ${fmt(r.after)}`)
    } else {
      usage()
      process.exit(2)
    }
  } catch (e) {
    console.error(`REFUSED — ${e.message}`)
    process.exit(1)
  }
}
