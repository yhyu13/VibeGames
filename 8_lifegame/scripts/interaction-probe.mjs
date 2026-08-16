// v2.13 interaction probe: verifies the Nintendo-style button feel actually ships as computed
// style, without needing to see the pixels. Asserts: (1) the --spring easing token is defined;
// (2) .btn / .building / .btn-choice all change transform on :hover AND :active (press is a
// distinct state from hover, and :active flips transition-duration to 60ms); (3) zero console
// errors across the whole reach. Press is held via mouse.down at the hovered center then released
// off-element (move to 0,0 before mouse.up) so the probe never commits a click. The active read
// waits 400ms — headless Chromium's compositor ticks transitions lazily, so 80ms reads land on the
// spring curve's slow start (cubic-bezier x1=0.34) and report the pre-press value.
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/interaction-probe.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const fails = []
const consoleErrors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
page.on('pageerror', (e) => consoleErrors.push(String(e)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })

const state = (sel) => page.evaluate((s) => {
  const e = document.querySelector(s)
  return { tf: getComputedStyle(e).transform, hov: e.matches(':hover'), act: e.matches(':active') }
}, sel)
const resetMouse = async () => { await page.mouse.move(0, 0); await page.waitForTimeout(200) }
// Read idle (mouse parked at 0,0), then hover, then hold :active — release off-element.
const pressStates = async (sel) => {
  await resetMouse()
  const idle = (await state(sel)).tf
  await page.hover(sel)
  await page.waitForTimeout(220)
  const hover = await state(sel)
  await page.mouse.down()
  await page.waitForTimeout(400)
  const active = await state(sel)
  await page.mouse.move(0, 0)
  await page.mouse.up()
  return { idle, hover, active }
}

// 1. --spring token must be defined with the back-out curve
const spring = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--spring').trim())
if (spring !== 'cubic-bezier(0.34, 1.56, 0.64, 1)') fails.push(`--spring=${spring || '(empty)'}`)

// 2. .btn (opening 接下来): hover lifts, press is a DISTINCT state
const btn = await pressStates('.btn-primary')
if (btn.hover.tf === btn.idle) fails.push('.btn hover transform did not change')
if (btn.active.tf === btn.hover.tf) fails.push('.btn active transform did not change from hover')

// 3. advance to the map, then .building (physical press)
await page.click('button:has-text("接下来")')
await page.waitForTimeout(400)
await page.click('button:has-text("走进校园")')
await page.waitForTimeout(400)
const building = await pressStates('.building:not(:disabled)')
if (building.hover.tf === building.idle) fails.push('.building hover transform did not change')
if (building.active.tf === building.hover.tf) fails.push('.building active transform did not change from hover')

// 4. reach an event, then .btn-choice (the most-clicked button)
await page.locator('.building').nth(1).click()
await page.waitForTimeout(950)
await page.click('button:has-text("掷骰子")')
await page.waitForTimeout(3000)
await page.click('button:has-text("继续")')
await page.waitForTimeout(400)
if (await page.locator('.event-panel-special .btn-choice').first().isVisible()) {
  await page.locator('.event-panel-special .btn-choice').first().click()
  await page.waitForTimeout(300)
}
const choice = await pressStates('.btn-choice')
if (choice.hover.tf === choice.idle) fails.push('.btn-choice hover transform did not change')
if (choice.active.tf === choice.hover.tf) fails.push('.btn-choice active transform did not change from hover')

await browser.close()
if (consoleErrors.length) fails.push('console errors: ' + consoleErrors.join(' | '))
if (fails.length) {
  console.error('INTERACTION FAILURES:\n' + fails.join('\n'))
  process.exit(1)
}
console.log('OK — interaction probe: --spring token + .btn/.building/.btn-choice hover & press transforms apply, 0 console errors')
