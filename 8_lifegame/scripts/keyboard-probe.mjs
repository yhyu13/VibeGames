// Keyboard walkthrough — drive the full intro scene with keyboard only (Tab / Enter / arrows),
// asserting every beat is reachable and no console errors. Closes the "手感 键盘可走全程"
// dimension of the perfect definition that Day 1 never verified.
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/keyboard-probe.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const fails = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (m) => { if (m.type() === 'error') fails.push('console: ' + m.text()) })
page.on('pageerror', (e) => fails.push('pageerror: ' + String(e)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.__sim.store.setState({ rand: () => 0.5 }))

// Tab until document.activeElement satisfies `predExpr` (evaluated with `el` bound), then Enter.
async function tabEnter(predExpr, budget = 60) {
  for (let i = 0; i < budget; i++) {
    const hit = await page.evaluate((expr) => {
      const el = document.activeElement
      if (!el || el === document.body) return false
      if (el.tagName !== 'BUTTON') return false // never match the tabIndex=-1 dialog shell
      return new Function('el', `return ${expr}`)(el)
    }, predExpr)
    if (hit) { await page.keyboard.press('Enter'); return true }
    await page.keyboard.press('Tab')
  }
  return false
}
async function step(name, ok) { if (!ok) { fails.push(`keyboard unreachable: ${name}`); await dumpFocus(name) } }
async function dumpFocus(label) {
  const info = await page.evaluate(() => {
    const ae = document.activeElement
    const focusables = [...document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .map((el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''}:"${(el.textContent || '').trim().slice(0, 16)}"`)
    return {
      active: ae && ae !== document.body ? `${ae.tagName.toLowerCase()}.${(ae.className || '').toString().split(' ')[0]}:"${(ae.textContent || '').trim().slice(0, 16)}" tabindex=${ae.getAttribute('tabindex')}` : 'body/null',
      n: focusables.length,
      first: focusables.slice(0, 6),
    }
  })
  console.log(`  [${label}] active=${info.active}`)
  console.log(`    focusables(${info.n}): ${info.first.join('  ')}`)
}

await page.waitForSelector('button:has-text("接下来")')
await step('opening 接下来', await tabEnter(`el.textContent.includes('接下来')`))
await page.waitForTimeout(300)
await step('opening 走进校园', await tabEnter(`el.textContent.includes('走进校园')`))
await page.waitForTimeout(400)

// map: a building is tabbable + Enter chooses it
await step('map 建筑', await tabEnter(`el.classList && el.classList.contains('building')`))
await page.waitForTimeout(950)
await step('dice 掷骰子', await tabEnter(`el.textContent.includes('掷骰子')`))
await page.waitForTimeout(2600)
await step('dice 继续', await tabEnter(`el.textContent.includes('继续')`))
await page.waitForTimeout(350)
// event beat: a choice is tabbable + Enter picks it
await step('event 抉择', await tabEnter(`el.classList && el.classList.contains('btn-choice')`))
// results phase: 下一周 only renders after the coach typewriter settles
await page.waitForSelector('button:has-text("下一周")', { timeout: 8000 })
await step('turn1 下一周', await tabEnter(`el.textContent.includes('下一周')`))
await page.waitForTimeout(500)

// turn 2: real trade — test the slider arrow-key response + quick-pct + no-invest
await step('turn2 建筑', await tabEnter(`el.classList && el.classList.contains('building')`))
await page.waitForTimeout(950)
await step('turn2 掷骰子', await tabEnter(`el.textContent.includes('掷骰子')`))
await page.waitForTimeout(2600)
await step('turn2 继续', await tabEnter(`el.textContent.includes('继续')`))
await page.waitForTimeout(350)
await step('turn2 抉择', await tabEnter(`el.classList && el.classList.contains('btn-choice')`))
// invest phase: the trade slider must render before we drive it
await page.waitForSelector('input[type="range"]', { timeout: 8000 })

// slider: focus it, arrow-key it, assert value increases
const sliderInfo = await page.evaluate(() => {
  const s = document.querySelector('input[type="range"]')
  if (!s) return { found: false }
  s.focus()
  return { found: true, before: Number(s.value), max: Number(s.max), disabled: s.disabled }
})
if (!sliderInfo.found) {
  fails.push('invest slider not found (input[type="range"])')
} else {
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  const after = await page.evaluate(() => Number(document.querySelector('input[type="range"]').value))
  if (sliderInfo.disabled) fails.push('invest slider is disabled on turn 2 (should be tradeable)')
  else if (after <= sliderInfo.before && sliderInfo.before < sliderInfo.max) fails.push(`slider did not increase via ArrowRight (${sliderInfo.before} → ${after})`)
  await step('turn2 不操作', await tabEnter(`el.textContent.includes('不操作')`))
  await page.waitForSelector('button:has-text("下一周")', { timeout: 8000 })
  await step('turn2 下一周', await tabEnter(`el.textContent.includes('下一周')`))
  await page.waitForTimeout(400)
}

await browser.close()
if (fails.length) {
  console.error('KEYBOARD FAILURES:\n' + fails.join('\n'))
  process.exit(1)
}
console.log('OK — keyboard walkthrough passed (every beat reachable via Tab + Enter, slider arrow-keys work)')
