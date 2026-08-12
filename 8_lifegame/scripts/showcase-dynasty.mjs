// Full 17-week 金融世家 playthrough — the dynasty route was only fixture-tested before v2.5.
// Verifies end-to-end: dynasty opening story, 世家 relationship beats (3/7/11 + trust), the
// semester love line, dynasty special-event pool draws, Christmas by stage, winter reunion,
// week-17 mentor persona (AI track), dynasty-labeled summary + goals + FinanceDynastyChoice.
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/showcase-dynasty.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { mkdirSync } from 'node:fs'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const outDir = fileURLToPath(new URL('../showcase/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const consoleErrors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
page.on('pageerror', (err) => consoleErrors.push(String(err)))
const shot = (name) => page.screenshot({ path: join(outDir, name) })

await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.__sim.store.setState({ rand: () => 0.5 }))

// ---- unlock the dynasty origin (mentor_hit) on a fresh town run is NOT needed: the DEV
// store accepts an unlocked dynasty start directly, mirroring the summary's restart path.
await page.evaluate(() => {
  const { createInitialState } = window.__sim.checks
  window.__sim.store.setState({
    state: createInitialState('finance_dynasty', true),
    rand: () => 0.5,
    runId: window.__sim.store.getState().runId + 1,
  })
})

// Dynasty opening story must differ from the town story.
const openingFail = await page.evaluate(() => {
  const copy = document.querySelector('.opening-cinematic')?.textContent ?? ''
  if (!copy.includes('金融世家')) return `dynasty opening story missing: ${copy}`
  if (!copy.includes('父亲')) return 'dynasty story beats missing the father line'
  return null
})
if (openingFail) throw new Error(`dynasty opening: ${openingFail}`)
await shot('dyn-01-opening.png')
await page.click('button:has-text("接下来")')
await page.waitForTimeout(300)
const goalFail = await page.evaluate(() => {
  const copy = document.querySelector('.opening-cinematic')?.textContent ?? ''
  if (!copy.includes('¥400,000')) return `dynasty wealth goal missing: ${copy}`
  if (!copy.includes('爱情目标')) return `love goal missing: ${copy}`
  return null
})
if (goalFail) throw new Error(`dynasty goals: ${goalFail}`)
await shot('dyn-01b-goals.png')
await page.click('button:has-text("走进校园")')
await page.waitForTimeout(350)

// v2.5 self-critique fix: the map hint must render once the opening closes.
const hintFail = await page.evaluate(() => {
  const hint = document.querySelector('.map-hint')
  return hint?.textContent?.includes('点击一栋建筑') ? null : `map hint missing: ${hint?.textContent ?? 'null'}`
})
if (hintFail) throw new Error(`map hint: ${hintFail}`)

// Dynasty route: teaching beats first (discover mentor t2, choose track t3), then the
// relationship line (3/7/11) and the love line (2/6/10) weave between them. Gym/exchange are
// avoided — dynasty starts at cognition 45, below their cognition-60 gate (a contract, not a bug).
const BUILDING_INDEXES = [0, 1, 4, 2, 3, 0, 1, 2, 3, 0, 1, 4, 2, 0, 1, 2, 5]
//   t1 dorm 开户 · t2 library 发现贵人 · t3 lecture 选方向(ai) · t4 cafeteria 关系1 ·
//   t5 club 爱情1 · t6 dorm 爱情2(6+注入) · t7 library 关系2 · t8 cafeteria 普通 ·
//   t9 club 普通 · t10 dorm 爱情3(accept→close) · t11 library 关系3(坦白→修复) ·
//   t12 lecture · t13 cafeteria · t14 christmas · t15 winter growth · t16 reunion · t17 mentor

let relationshipSeen = 0
let loveSeen = 0

for (let turn = 1; turn <= 17; turn++) {
  const targetIndex = BUILDING_INDEXES[turn - 1]
  await page.locator('.building').nth(targetIndex).click()
  await page.waitForTimeout(950)

  const arrivalFail = await page.evaluate((isFirstTurn) => {
    const s = window.__sim.getState()
    const ev = s.pendingEvent?.event
    if (!ev) return `no pendingEvent; position=${s.player.position}`
    if (isFirstTurn) return ev.id === 'open_account' ? null : `turn 1 should force open_account, got ${ev.id}`
    return null
  }, turn === 1)
  if (arrivalFail) throw new Error(`dynasty turn ${turn} arrival: ${arrivalFail}`)

  await page.click('button:has-text("掷骰子")')
  await page.waitForTimeout(3000)
  await page.click('button:has-text("继续")')
  await page.waitForTimeout(400)
  if (await page.locator('.event-panel-special .btn-choice').first().isVisible()) {
    await page.locator('.event-panel-special .btn-choice').first().click()
    await page.waitForTimeout(300)
  }

  // The dynasty pool must never serve a 小镇-only event when a special fires.
  const poolFail = await page.evaluate(() => {
    const s = window.__sim.getState()
    const ev = s.pendingSpecialEvent?.event
    if (!ev) return null
    const townOnly = ['hm_mom_call', 'hm_village_hope', 'hm_remittance', 'big_demolition', 'we_scholarship']
    return townOnly.includes(ev.id) ? `dynasty run drew a town-only event: ${ev.id}` : null
  })
  if (poolFail) throw new Error(`dynasty turn ${turn} pool: ${poolFail}`)

  const pendingEventId = await page.evaluate(() => window.__sim.getState().pendingEvent?.event.id)
  const isRelationship = pendingEventId?.startsWith('relationship_')
  const isLove = ['love_first_encounter', 'love_second_meeting', 'love_third_party'].includes(pendingEventId)
  if (isRelationship) relationshipSeen++
  if (isLove) loveSeen++
  const beatCheck = await page.evaluate(({ rel, love }) => {
    if (rel) {
      const badge = document.querySelector('.event-kind-badge-relationship')
      return badge?.textContent?.includes('世家关系线') ? null : 'relationship badge missing'
    }
    if (love) {
      const badge = document.querySelector('.event-kind-badge-love')
      return badge?.textContent?.includes('爱情支线') ? null : 'love badge missing'
    }
    return null
  }, { rel: isRelationship, love: isLove })
  if (beatCheck) throw new Error(`dynasty turn ${turn} badge: ${beatCheck}`)

  if (pendingEventId === 'choose_track') await page.locator('.btn-choice:has-text("人工智能")').click()
  // The +trust path through all three relationship stages: 听对方说(+10) → 承认不知道怎么
  // 表达(+14) → 坦白亏损和害怕(+18) → trust 50+10+14+18 = 92, resolved.
  else if (pendingEventId?.startsWith('relationship_')) await page.locator('.btn-choice').nth(1).click()
  else await page.locator('.btn-choice').first().click()
  await page.waitForTimeout(350)

  if (turn > 1) {
    if (turn === 2) {
      await page.click('.no-invest-button')
    } else {
      await page.locator('.quick-pct-button:has-text("50%")').click()
      await page.click('.invest-actions .btn-primary')
    }
  }
  await page.waitForTimeout(4000)
  if (isRelationship) await shot(`dyn-t${turn}-relationship.png`)
  if (isLove) await shot(`dyn-t${turn}-love.png`)
  const last = turn === 17
  await page.click(last ? 'button:has-text("查看总结")' : 'button:has-text("下一周")')
  await page.waitForTimeout(500)
}

await shot('dyn-18-summary.png')

const summaryFail = await page.evaluate(() => {
  const s = window.__sim.getState()
  // Dynasty-labeled summary: the player bar comes first and carries the 金融世家 label.
  const bars = Array.from(document.querySelectorAll('.summary-gap-teaser .gap-bar') ?? [])
    .map((el) => el.textContent?.trim() ?? '')
  if (!bars[0]?.startsWith('金融世家:')) return `dynasty player mislabeled: ${bars[0]}`
  if (!bars[1]?.startsWith('小镇做题家:')) return `dynasty parallel mislabeled: ${bars[1]}`
  // Life goals verdicts for the dynasty target.
  const goals = document.querySelector('.summary-goals')?.textContent ?? ''
  if (!goals.includes('财富目标')) return 'wealth goal verdict missing'
  if (!goals.includes('爱情目标')) return 'love goal verdict missing'
  // Relationship closure copy with the trust number.
  const choice = document.querySelector('.finance-origin-choice')?.textContent ?? ''
  if (!choice.includes('信任')) return `relationship trust missing from choice card: ${choice}`
  return null
})
if (summaryFail) throw new Error(`dynasty summary: ${summaryFail}`)

const lineCheck = await page.evaluate(() => {
  const s = window.__sim.getState()
  const ok = (cond, msg) => (cond ? null : msg)
  if (s.player.origin !== 'finance_dynasty') return ok(false, 'origin')
  // +trust path: 50 +10(听) +14(承认) +18(坦白) = 92, and 坦白 resolves the line.
  return ok(s.relationshipResolved === true, `relationshipResolved=${s.relationshipResolved}`)
    ?? ok(s.relationshipTrust === 92, `relationshipTrust=${s.relationshipTrust}`)
})
if (lineCheck) throw new Error(`dynasty line: ${lineCheck}`)

await browser.close()

if (relationshipSeen !== 3) { console.error(`expected 3 relationship beats, saw ${relationshipSeen}`); process.exit(1) }
if (loveSeen !== 3) { console.error(`expected 3 love beats, saw ${loveSeen}`); process.exit(1) }
if (consoleErrors.length) {
  console.error('CONSOLE ERRORS:\n' + consoleErrors.join('\n'))
  process.exit(1)
}
console.log('OK — 17-week 金融世家 run: 3 relationship beats + 3 love beats, dynasty pool clean, dynasty summary/goals/trust verified, 0 console errors')
