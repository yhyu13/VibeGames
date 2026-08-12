// Multi-seed robustness smoke — 3 full 17-week runs with different seeded PRNGs, always
// clicking the first available building + first choice + hold (不操作), asserting the
// summary renders and zero console errors per seed. Catches seed-dependent crashes the
// fixed-0.5 showcase can't (love/relationship injection order, choice events, shocks).
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/smoke-seeds.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const SEEDS = [1, 42, 999]
const consoleErrors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(`[${msg.text()}]`) })
page.on('pageerror', (err) => consoleErrors.push(String(err)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })

for (const seed of SEEDS) {
  await page.evaluate((s) => {
    const { mulberry32 } = window.__sim.checks
    window.__sim.store.setState({
      state: window.__sim.checks.createInitialState(),
      rand: mulberry32(s),
      runId: window.__sim.store.getState().runId + 1,
    })
  }, seed)
  await page.click('button:has-text("接下来")')
  await page.waitForTimeout(150)
  await page.click('button:has-text("走进校园")')
  await page.waitForTimeout(250)

  for (let turn = 1; turn <= 17; turn++) {
    // First available (visible, enabled) building — locked ones are unclickable by contract.
    const target = page.locator('.building:not(:disabled):not(.building-locked)').first()
    await target.click()
    await page.waitForTimeout(950)
    await page.click('button:has-text("掷骰子")')
    await page.waitForTimeout(3000)
    await page.click('button:has-text("继续")')
    await page.waitForTimeout(350)
    if (await page.locator('.event-panel-special .btn-choice').first().isVisible()) {
      await page.locator('.event-panel-special .btn-choice').first().click()
      await page.waitForTimeout(250)
    }
    await page.locator('.btn-choice').first().click()
    await page.waitForTimeout(300)
    if (turn > 1) await page.click('.no-invest-button')
    await page.waitForTimeout(3800)
    const last = turn === 17
    await page.click(last ? 'button:has-text("查看总结")' : 'button:has-text("下一周")')
    await page.waitForTimeout(400)
  }

  const summaryOk = await page.evaluate(() => {
    if (!document.querySelector('.summary-panel')) return 'summary panel missing'
    if (!document.querySelector('.summary-goals')) return 'goals section missing'
    return null
  })
  if (summaryOk) throw new Error(`seed ${seed} summary: ${summaryOk}`)
  console.log(`seed ${seed}: 17 weeks OK`)
}

await browser.close()
if (consoleErrors.length) {
  console.error('CONSOLE ERRORS:\n' + consoleErrors.join('\n'))
  process.exit(1)
}
console.log(`OK — ${SEEDS.length} seeds × 17 weeks, summary every run, 0 console errors`)
