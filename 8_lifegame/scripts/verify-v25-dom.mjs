// Quick DOM-level verification of the v2.5 UI additions (opening cinematic, love badges,
// HUD goal chip, summary goals). Run: npm exec --offline --yes --package=playwright -- node scripts/verify-v25-dom.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const errors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
page.on('pageerror', (err) => errors.push(String(err)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.__sim.store.setState({ rand: () => 0.5 }))

const fails = []

// 1. Opening step 0 — 出身故事 cinematic
let ok = await page.evaluate(() => {
  const c = document.querySelector('.opening-cinematic')
  if (!c) return 'opening cinematic missing'
  if (!c.querySelector('.opening-kicker')) return 'opening kicker missing'
  if (document.querySelectorAll('.opening-beat').length !== 3) return 'expected 3 story beats'
  if (!c.textContent?.includes('小镇做题家')) return 'town story title missing'
  return null
})
if (ok) fails.push(`opening step 0: ${ok}`)

// 2. Step 1 — 人生目标 (love + wealth goals)
await page.click('button:has-text("接下来")')
await page.waitForTimeout(300)
ok = await page.evaluate(() => {
  const c = document.querySelector('.opening-cinematic')
  const copy = c?.textContent ?? ''
  if (!c) return 'goals cinematic missing'
  if (!copy.includes('财富目标')) return 'wealth goal missing'
  if (!copy.includes('爱情目标')) return 'love goal missing'
  if (!copy.includes('¥150,000')) return 'town wealth goal number missing'
  return null
})
if (ok) fails.push(`opening step 1: ${ok}`)
await page.click('button:has-text("走进校园")')
await page.waitForTimeout(300)

// 3. HUD goal chip visible on the map phase
ok = await page.evaluate(() => {
  const chip = document.querySelector('.hud-goal')
  if (!chip) return 'HUD goal chip missing'
  if (!chip.textContent?.includes('第一桶金')) return 'goal chip label missing'
  if (document.querySelector('.hud-goal-love')) return 'love chip should not render before the first beat'
  return null
})
if (ok) fails.push(`HUD chip: ${ok}`)

// Play turn 1 (开户 beat — forced, skips invest) so turn 2 can host the love beat.
await page.locator('.building:has-text("宿舍")').click()
await page.waitForTimeout(950)
await page.click('button:has-text("掷骰子")')
await page.waitForTimeout(2600)
await page.click('button:has-text("继续")')
await page.waitForTimeout(300)
await page.locator('.btn-choice').first().click()
await page.waitForTimeout(300)
await page.click('button:has-text("下一周")')
await page.waitForTimeout(500)

// 4. Turn 2 → love first encounter (go to the dorm — the love beat is waiting)
await page.locator('.building:has-text("宿舍")').click()
await page.waitForTimeout(950)
ok = await page.evaluate(() => {
  const s = window.__sim.getState()
  const ev = s.pendingEvent?.event
  if (ev?.id !== 'love_first_encounter') return `expected love_first_encounter on turn 2, got ${ev?.id}`
  return null
})
if (ok) fails.push(`love first beat: ${ok}`)

// Roll + advance to the event phase, then check the love card's badge and styling.
await page.click('button:has-text("掷骰子")')
await page.waitForTimeout(2600)
await page.click('button:has-text("继续")')
await page.waitForTimeout(300)
ok = await page.evaluate(() => {
  const badge = document.querySelector('.event-kind-badge-love')
  if (!badge?.textContent?.includes('爱情支线')) return 'love badge missing on the beat card'
  if (!document.querySelector('.event-panel-love')) return 'love card styling missing'
  return null
})
if (ok) fails.push(`love badge: ${ok}`)
await page.locator('.btn-choice').first().click()
await page.waitForTimeout(300)
ok = await page.evaluate(() => {
  const s = window.__sim.getState()
  if (s.loveStage !== 'met') return `loveStage should be met after first beat, got ${s.loveStage}`
  if (s.phase !== 'invest') return `phase should be invest after love beat, got ${s.phase}`
  return null
})
if (ok) fails.push(`love stage: ${ok}`)

// 6. Summary — goals section + love stage text
await page.evaluate(() => {
  const base = window.__sim.checks.createInitialState()
  window.__sim.store.setState({
    state: {
      ...base,
      phase: 'summary',
      finished: true,
      loveStage: 'knowing',
      loveImpression: 'good',
      player: { ...base.player, wealth: 130_000, awakened: false, log: [] },
    },
  })
})
await page.waitForTimeout(100)
ok = await page.evaluate(() => {
  const copy = document.querySelector('.summary-goals')?.textContent ?? ''
  if (!copy.includes('财富目标') || !copy.includes('爱情目标')) return 'summary goals missing'
  if (!copy.includes('87%')) return `wealth progress missing (expected 130k/150k = 87%): ${copy}`
  if (!copy.includes('进行中')) return 'goals should be in progress, not met'
  const love = document.querySelector('.summary-love')?.textContent ?? ''
  if (!love.includes('图书馆')) return `love stage text missing: ${love}`
  return null
})
if (ok) fails.push(`summary goals: ${ok}`)

// 7. 贵人好感 surfaces — banner line + HUD chip.
await page.evaluate(() => {
  const base = window.__sim.checks.createInitialState()
  window.__sim.store.setState({
    state: {
      ...base,
      phase: 'choose_destination',
      mentorFavor: 2,
      pendingSpecialEvent: {
        event: {
          id: 'gu_old_professor', label: '图书馆的老教授', icon: '🧓', weight: 0, wealthPct: 0,
          delta: { cognition: 4, mood: 3 }, unexpected: false, mentorFavor: 1,
        },
        playerDelta: { cognition: 4, mood: 3 },
        altDelta: {},
        wealthAbs: 0,
      },
    },
  })
})
await page.waitForTimeout(100)
ok = await page.evaluate(() => {
  const banner = document.querySelector('.special-event-banner')
  if (!banner?.textContent?.includes('贵人好感 +1')) return `favor line missing from banner: ${banner?.textContent ?? ''}`
  const chip = document.querySelector('.hud-goal-mentor')
  if (!chip?.textContent?.includes('贵人好感')) return `favor chip missing from HUD: ${chip?.textContent ?? ''}`
  return null
})
if (ok) fails.push(`mentor favor UI: ${ok}`)

await browser.close()
if (errors.length) fails.push(`console errors: ${errors.join(' | ')}`)
if (fails.length) {
  console.error('V2.5 DOM VERIFICATION FAILURES:\n' + fails.join('\n'))
  process.exit(1)
}
console.log('OK — v2.5 DOM verification passed (opening cinematic, goals, love beats, HUD chip, summary verdicts)')
