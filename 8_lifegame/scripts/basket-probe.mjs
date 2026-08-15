// v2.11: multi-order basket UI probe — verifies the 委托篮 flow end-to-end:
//   (a) submit MULTIPLE drafts across different assets (one per asset),
//   (b) withdraw a draft BEFORE final confirmation (取消/✕ removes it from the basket,
//       so it is NOT executed),
//   (c) 确认 N 笔下单 submits the whole basket in one click and resolveOrders fills it.
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/basket-probe.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const consoleErrors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
page.on('pageerror', (err) => consoleErrors.push(String(err)))

await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.__sim.store.setState({ rand: () => 0.5 }))

// opening cinematic
await page.click('button:has-text("接下来")')
await page.waitForTimeout(350)
await page.click('button:has-text("走进校园")')
await page.waitForTimeout(350)

// mirror showcase's proven building sequence for turns 1-3
const BUILDING_INDEXES = [1, 1, 4]

async function playToInvestBeat(turn) {
  await page.locator('.building').nth(BUILDING_INDEXES[turn - 1]).click()
  await page.waitForTimeout(950)
  await page.click('button:has-text("掷骰子")')
  await page.waitForTimeout(3000)
  await page.click('button:has-text("继续")')
  await page.waitForTimeout(400)
  if (await page.locator('.event-panel-special .btn-choice').first().isVisible()) {
    await page.locator('.event-panel-special .btn-choice').first().click()
    await page.waitForTimeout(300)
  }
  const pendingEventId = await page.evaluate(() => window.__sim.getState().pendingEvent?.event.id)
  if (pendingEventId === 'choose_track') await page.locator('.btn-choice:has-text("人工智能")').click()
  else await page.locator('.btn-choice').first().click()
  await page.waitForTimeout(350)
}

const fails = []

// ---- turn 1: 开户 (no trade) ----
await playToInvestBeat(1)
await page.click('button:has-text("下一周")')
await page.waitForTimeout(500)

// ---- turn 2: add TWO drafts, then WITHDRAW one before confirming → exactly 1 fill ----
await playToInvestBeat(2)
// money_fund is the default-selected row; draft it at 50%
await page.locator('.quick-pct-button:has-text("50%")').click()
await page.locator('.add-draft-button').click()
// select bond and draft it at 25%
await page.locator('.invest-row:has-text("债券")').click()
await page.locator('.quick-pct-button:has-text("25%")').click()
await page.locator('.add-draft-button').click()

const twoDraftRows = await page.locator('.basket-row').count()
if (twoDraftRows !== 2) fails.push(`turn 2: expected 2 basket rows after two drafts, got ${twoDraftRows}`)

// withdraw money_fund (first basket row = canonical product order) BEFORE confirming
await page.locator('.basket-remove').first().click()
const oneDraftRow = await page.locator('.basket-row').count()
if (oneDraftRow !== 1) fails.push(`turn 2: expected 1 basket row after withdraw, got ${oneDraftRow}`)

await page.locator('.invest-actions .btn-primary').click()
const withdrawResult = await page.evaluate(() => {
  const inv = window.__sim.getState().pendingInvestment
  return inv ? { side: inv.side, fills: inv.fills.length, amount: inv.amount } : null
})
if (!withdrawResult || withdrawResult.side !== 'buy' || withdrawResult.fills !== 1) {
  fails.push(`turn 2: withdrawn basket should fill exactly 1 buy order, got ${JSON.stringify(withdrawResult)}`)
}
await page.waitForTimeout(4000)
await page.click('button:has-text("下一周")')
await page.waitForTimeout(500)

// ---- turn 3: submit TWO drafts and confirm the whole basket → exactly 2 fills ----
await playToInvestBeat(3)
await page.locator('.invest-row:has-text("货币基金")').click()
await page.locator('.quick-pct-button:has-text("50%")').click()
await page.locator('.add-draft-button').click()
await page.locator('.invest-row:has-text("债券")').click()
await page.locator('.quick-pct-button:has-text("50%")').click()
await page.locator('.add-draft-button').click()

const rowsBeforeConfirm = await page.locator('.basket-row').count()
if (rowsBeforeConfirm !== 2) fails.push(`turn 3: expected 2 basket rows, got ${rowsBeforeConfirm}`)

const confirmLabel = await page.locator('.invest-actions .btn-primary').innerText()
if (!confirmLabel.includes('确认 2 笔')) fails.push(`turn 3: confirm button should read 确认 2 笔下单, got "${confirmLabel}"`)

await page.locator('.invest-actions .btn-primary').click()
const basketResult = await page.evaluate(() => {
  const inv = window.__sim.getState().pendingInvestment
  return inv ? { side: inv.side, fills: inv.fills.length, amount: inv.amount, blocked: inv.blocked.length } : null
})
if (!basketResult || basketResult.side !== 'buy' || basketResult.fills !== 2 || basketResult.blocked !== 0) {
  fails.push(`turn 3: basket should fill exactly 2 buy orders with no blocks, got ${JSON.stringify(basketResult)}`)
}
await page.waitForTimeout(4000)
const fillLineCount = await page.locator('.invest-fill-line').count()
if (fillLineCount !== 2) fails.push(`turn 3: results should render 2 fill lines, got ${fillLineCount}`)

if (consoleErrors.length) fails.push(`console errors: ${consoleErrors.join(' | ')}`)

await browser.close()

if (fails.length) {
  console.error('BASKET PROBE FAILURES:\n' + fails.join('\n'))
  process.exit(1)
}
console.log('basket probe OK — multi-order submit + withdraw-before-confirm + confirm N 笔, 0 console errors')
