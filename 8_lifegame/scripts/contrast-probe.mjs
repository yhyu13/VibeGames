// Contrast probe — WCAG AA contrast ratio of every leaf text node against its effective
// background. Upgrades observe-runtime's informational <3.0 check into a proper gate:
//   FAIL  ratio < 3.0  (unreadable — must fix)
//   WARN  3.0 ≤ ratio < 4.5  (candidate for darkening, logged for Day-2 visual pass)
// Run from 8_lifegame/:  npm exec --offline --yes --package=playwright -- node scripts/contrast-probe.mjs
import { delimiter, join, resolve } from 'node:path'
import { createRequire } from 'node:module'

const binDir = process.env.PATH.split(delimiter).find((e) => e.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`))
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package')
const require = createRequire(join(resolve(binDir, '..'), 'noop.js'))
const { chromium } = require('playwright')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } })
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.__sim.store.setState({ rand: () => 0.5 }))

// Walk through the beats so every panel type gets a chance to render, sampling contrast at each.
const samples = []
async function sample(label) {
  const list = await page.evaluate(() => {
    function lum(hex) {
      const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
      if (!m) return null
      const v = parseInt(m[1], 16)
      const c = [(v >> 16) & 255, (v >> 8) & 255, v & 255].map((x) => {
        const s = x / 255
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
    }
    function ratio(fg, bg) {
      const a = lum(fg), b = lum(bg)
      if (a == null || b == null) return null
      const [l, d] = a > b ? [a, b] : [b, a]
      return (l + 0.05) / (d + 0.05)
    }
    const out = []
    document.querySelectorAll('span, p, h1, h2, h3, button, div, a, li, dt, dd, b, i, strong').forEach((el) => {
      const cs = getComputedStyle(el)
      const fg = cs.color
      let bg = null, node = el
      while (node && node !== document.body) {
        const b = getComputedStyle(node).backgroundColor
        if (b && b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent') { bg = b; break }
        node = node.parentElement
      }
      if (!bg) return
      const r = ratio(fg, bg)
      // only leaf nodes that actually carry their own text (skip container re-flags)
      const hasText = (el.textContent ?? '').trim().length > 0 && el.children.length === 0
      if (hasText && r != null && r < 4.5) {
        out.push({ sel: (el.tagName + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : '')).slice(0, 34), ratio: +r.toFixed(2), text: el.textContent.trim().slice(0, 26) })
      }
    })
    return out
  })
  samples.push({ label, list })
}

await sample('opening')
await page.click('button:has-text("接下来")')
await page.waitForTimeout(250)
await sample('goals')
await page.click('button:has-text("走进校园")')
await page.waitForTimeout(400)
await sample('map')
await page.locator('.building:has-text("宿舍")').click()
await page.waitForTimeout(950)
await sample('dice')
await page.click('button:has-text("掷骰子")')
await page.waitForTimeout(2600)
await sample('dice-result')
await page.click('button:has-text("继续")')
await page.waitForTimeout(350)
await sample('event')
await page.locator('.btn-choice').first().click()
await page.waitForTimeout(300)
await sample('invest')

// Aggregate: a node is reported once by its text+ratio fingerprint across beats.
const seen = new Set()
const fail = []
const warn = []
for (const { label, list } of samples) {
  for (const node of list) {
    const key = node.sel + '|' + node.text
    if (seen.has(key)) continue
    seen.add(key)
    if (node.ratio < 3.0) fail.push(`[${label}] ${node.sel} ratio=${node.ratio} "${node.text}"`)
    else warn.push(`[${label}] ${node.sel} ratio=${node.ratio} "${node.text}"`)
  }
}

await browser.close()

console.log(`contrast: ${fail.length} FAIL (<3.0), ${warn.length} WARN (3.0–4.5) across ${samples.length} beats`)
if (warn.length) console.log('  WARN candidates (for darkening):\n    ' + warn.slice(0, 40).join('\n    '))
if (fail.length) {
  console.error('  FAIL (unreadable <3.0):\n    ' + fail.join('\n    '))
  process.exit(1)
}
console.log('OK — contrast probe passed (no leaf text node below 3.0:1)')
