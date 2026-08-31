// Ch09 投资策略库 + 真实度自选 contract probe — RED-first draft.
// Asserts the three Ch09 mechanics against the pure sim via window.__sim.checks
// (no UI animation), matching the mentor-probe.mjs pattern.
//
// STATUS: written BEFORE the Ch09 implementation. Assertions are EXPECTED TO
// FAIL (red) until design/21-ch09-investment-strategy.md is built.
//
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/strategy-probe.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const failures = []
const eq = (label, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  if (!ok) failures.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
}
const okTrue = (label, cond) => { if (!cond) failures.push(`${label}: expected truthy`) }

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
const consoleErrors = []
page.on('pageerror', (err) => consoleErrors.push(String(err)))
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })

const results = await page.evaluate(() => {
  const c = window.__sim.checks
  const out = {}
  const TURN = 3

  // ─── A. 真实度自选 (novice / real) — realism is a resolveOrders param ──
  // novice: no commission, no T+1. real: commission + T+1. (realism threads
  // through resolveOrders/executeOrder as an optional param, default 'real'.)
  const buyThenSell = (realism) => {
    const acc = c.createPaperAccount(100000)
    const buy = c.resolveOrders(acc, [{ assetId: 'money_fund', side: 'buy', amount: 10000 }], TURN, undefined, realism)
    const sell = c.resolveOrders(buy.account, [{ assetId: 'money_fund', side: 'sell', amount: 10000 }], TURN, undefined, realism)
    return { fee: buy.result.fee, sellBlocked: sell.result.blocked.length > 0 }
  }
  try {
    const novice = buyThenSell('novice')
    const real = buyThenSell('real')
    out.A_novice_fee = novice.fee
    out.A_novice_sellBlocked = novice.sellBlocked
    out.A_real_fee = real.fee
    out.A_real_sellBlocked = real.sellBlocked
    // realism param defaults to 'real' when omitted (backward compat for single-arg callers)
    const defaulted = buyThenSell(undefined)
    out.A_default_fee = defaulted.fee
    out.A_default_sellBlocked = defaulted.sellBlocked
  } catch (e) { out.A_error = String(e) }

  // ─── C. 分品种费率 (per-product feeRate, real mode) ──────────────────
  const feeRateFor = (assetId) => {
    const acc = c.createPaperAccount(100000)
    const r = c.resolveOrders(acc, [{ assetId, side: 'buy', amount: 10000 }], TURN, undefined, 'real').result
    return r.amount > 0 ? r.fee / r.amount : NaN
  }
  out.C_money = feeRateFor('money_fund')
  out.C_btc = feeRateFor('btc')

  // ─── B. 策略层 (均线择时 in-out, real mode) ──────────────────────────
  out.B_hasSignal = typeof c.maTimingSignalFor === 'function'
  out.B_hasGate = typeof c.maTimingUnlockedFor === 'function'
  if (out.B_hasSignal) {
    const asset = 'index_fund'
    const ticks = (c.ASSETS.find((a) => a.id === asset) || {}).ticks ?? []
    const scan = []
    for (let t = 4; t <= Math.min(13, ticks.length); t++) {
      const sig = c.maTimingSignalFor(asset, t)
      const tick = ticks[t - 1] ?? 0
      scan.push({ t, sig, tick })
    }
    const winWeeks = scan.filter((s) => s.sig === 'up' && s.tick > 0)
    const winWeek = winWeeks.sort((a, b) => b.tick - a.tick)[0] // max-tick win week — amplification clearly beats the fee drag
    const falseWeek = scan.find((s) => s.sig === 'up' && s.tick < 0) // 假信号: said up, dropped
    const downWeek = scan.find((s) => s.sig === 'down')
    out.B_scan = { foundWin: !!winWeek, foundFalse: !!falseWeek, foundDown: !!downWeek }
    const run = (turn, strategy) => {
      const acc = c.createPaperAccount(100000)
      return c.resolveOrders(acc, [{ assetId: asset, side: 'buy', amount: 10000, strategy }], turn, undefined, 'real')
    }
    if (winWeek) {
      const hold = run(winWeek.t, 'buy_hold')
      const timed = run(winWeek.t, 'ma_timing')
      out.B_win_hold = hold.result.weekPnlAbs
      out.B_win_timed = timed.result.weekPnlAbs
      out.B_win_positionUnits = timed.account.positions[asset]?.units ?? 0  // in-out: must be 0
    }
    if (falseWeek) {
      const hold = run(falseWeek.t, 'buy_hold')
      const timed = run(falseWeek.t, 'ma_timing')
      out.B_false_hold = hold.result.weekPnlAbs
      out.B_false_timed = timed.result.weekPnlAbs
    }
    if (downWeek) {
      const timed = run(downWeek.t, 'ma_timing')
      out.B_down_blocked = timed.result.blocked.length > 0   // 均线之下不接刀
    }
  }
  if (out.B_hasGate) {
    out.B_gate_low = c.maTimingUnlockedFor(50)
    out.B_gate_high = c.maTimingUnlockedFor(70)
  }
  return out
})

// ─── assertions ────────────────────────────────────────────────────────
if (results.A_error) failures.push(`A: threw ${results.A_error}`)

// A: fidelity modes
if (results.A_novice_fee !== undefined) {
  eq('A: novice mode has zero commission', results.A_novice_fee, 0)
  eq('A: novice mode has no T+1 block', results.A_novice_sellBlocked, false)
  okTrue('A: real mode charges a fee', results.A_real_fee > 0)
  eq('A: real mode T+1 blocks same-turn sell', results.A_real_sellBlocked, true)
  okTrue('A: omitted realism defaults to real (fee > 0)', results.A_default_fee > 0)
  eq('A: omitted realism defaults to real (T+1)', results.A_default_sellBlocked, true)
}

// C: per-product fee rate
if (!Number.isNaN(results.C_money)) {
  okTrue('C: btc fee rate > money_fund fee rate (per-product)', results.C_btc > results.C_money)
  okTrue('C: per-product rate differs from old flat 万三', Math.abs(results.C_money - 0.0003) > 1e-9 || Math.abs(results.C_btc - 0.0003) > 1e-9)
}

// B: strategy layer
if (!results.B_hasSignal) failures.push('checks.maTimingSignalFor not implemented (expected red)')
if (!results.B_hasGate) failures.push('checks.maTimingUnlockedFor not implemented (expected red)')
if (results.B_hasSignal) {
  okTrue('B: deterministic curves contain a win week (signal up + tick up)', results.B_scan.foundWin)
  okTrue('B: deterministic curves contain a 假信号 week (signal up + tick down)', results.B_scan.foundFalse)
  okTrue('B: deterministic curves contain a down week (signal down → 拦单)', results.B_scan.foundDown)
  if (results.B_win_timed !== undefined) {
    okTrue('B: 择时成功 amplifies the week return vs buy-and-hold', results.B_win_timed > results.B_win_hold)
    eq('B: 均线择时是当周内 in-out 波段, 不持仓跨周', results.B_win_positionUnits, 0)
  }
  if (results.B_false_timed !== undefined) {
    okTrue('B: 假信号 amplifies the loss vs buy-and-hold', results.B_false_timed < results.B_false_hold)
  }
  if (results.B_down_blocked !== undefined) {
    eq('B: 下行趋势的择时买单被拦(均线之下不接刀)', results.B_down_blocked, true)
  }
}
if (results.B_gate_low !== undefined) {
  eq('B: 认知 50 择时不可用', results.B_gate_low, false)
  eq('B: 认知 70 择时可用', results.B_gate_high, true)
}

// ─── report ────────────────────────────────────────────────────────────
await browser.close()
console.log(`\n=== strategy-probe (Ch09 contract) ===`)
console.log(`${consoleErrors.length} page errors`)
if (consoleErrors.length) console.log(consoleErrors.join('\n'))
if (failures.length) {
  console.log(`\n${failures.length} RED assertion(s):`)
  failures.forEach((f) => console.log('  ✗ ' + f))
  process.exit(1)
}
console.log('\nALL GREEN — Ch09 contracts hold')
