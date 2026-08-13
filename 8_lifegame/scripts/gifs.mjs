// Capture the core "juice" animation (dice roll) as a smooth video for gif encoding.
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/gifs.mjs
// Produces showcase/gif-frames/dice.webm; then encode with ffmpeg (see docs/playability.md §12).
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { mkdirSync, rmSync, readdirSync, renameSync } from 'node:fs'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const outDir = fileURLToPath(new URL('../showcase/gif-frames/', import.meta.url))
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1366, height: 860 },
  recordVideo: { dir: outDir, size: { width: 1366, height: 860 } },
})
const page = await context.newPage()

const t0 = Date.now()
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.__sim.store.setState({ rand: () => 0.5 }))
// brief settle so the opening beat / map is fully painted before the dice pops in
await page.waitForTimeout(400)

// Dice roll — trigger the 'dice' phase with a big_success result so the full sequence
// (decel tumble → formula type-in → ✦ verdict burst) plays on mount.
const diceStartMs = Date.now() - t0
await page.evaluate(() => {
  const state = window.__sim.getState()
  window.__sim.store.setState({
    state: {
      ...state,
      phase: 'dice',
      pendingDice: {
        rolls: [5, 6], originMod: -2, eraMod: 0, stateMod: 1, eventMod: 0,
        total: 10, tier: 'big_success', extremeState: false,
      },
    },
  })
})

// Let the full roll + formula + verdict sequence play out, then settle.
await page.waitForTimeout(3200)

await context.close()
await browser.close()

const files = readdirSync(outDir).filter((f) => f.endsWith('.webm'))
if (files.length !== 1) throw new Error(`expected 1 webm, got ${files.length}: ${files.join(', ')}`)
renameSync(join(outDir, files[0]), join(outDir, 'dice.webm'))
console.log(`captured -> showcase/gif-frames/dice.webm`)
console.log(`dice-start offset ~${diceStartMs}ms (trim from here)`)
