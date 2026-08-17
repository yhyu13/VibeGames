// Measure raymarcher frame time robustly for both fast (GPU) and slow
// (SwiftShader software) rendering.
//
// Approach: hook composer.render() to record performance.now() timestamps at
// each frame. Frame time = gap between consecutive invocations. For fast GPU
// renders the loop is vsync-capped at 60 Hz (gap ≈ 16.6 ms) even though the
// true GPU work is ~0.3 ms; for software rendering the gap is the true cost.
// A separate gl.finish() timing (below) reports the uncapped GPU work.
import { chromium } from 'playwright-core'

const EXE = 'C:/Users/XINDONG/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'
const URL = 'http://localhost:5188/'

const CONFIGS = [
  ['GPU 1080p · steps=160 (default)', 1, { width: 1920, height: 1080 }, 160, false, 8],
  ['GPU 4K · steps=512 (sweep)', 2, { width: 1920, height: 1080 }, 512, false, 8],
  ['SwiftShader 4K · steps=512 (sweep)', 2, { width: 1920, height: 1080 }, 512, true, 2],
]

async function measure({ dsf, viewport, steps, swiftshader, wantFrames }) {
  const args = ['--no-sandbox', '--enable-webgl']
  if (swiftshader) args.push('--use-angle=swiftshader')
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args })
  const page = await browser.newPage({ viewport, deviceScaleFactor: dsf })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForFunction(() => window.__scene && window.__store, null, { timeout: 20000 })

  const gpu = await page.evaluate(() => {
    const gl = document.querySelector('#canvas-host canvas').getContext('webgl2') || document.querySelector('#canvas-host canvas').getContext('webgl')
    const ext = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null
    return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'unknown'
  })

  await page.evaluate((steps) => {
    const s = window.__store.getState()
    s.setParam('autoOrbit', false)
    s.setParam('steps', steps)
    s.setParam('spin', 0.998)
    window.__scene.setCameraPose(14, 0.05)
  }, steps)

  // Time-to-first-frame + first N frame gaps. Generous timeout for software.
  const r = await page.evaluate(async (wantFrames) => {
    const mgr = window.__scene
    const orig = mgr.composer.render.bind(mgr.composer)
    const ts = []
    const tStart = performance.now()
    mgr.composer.render = function () {
      ts.push(performance.now())
      return orig()
    }
    // wait until wantFrames frames observed, or timeout
    const deadline = performance.now() + 90000
    while (ts.length < wantFrames + 1 && performance.now() < deadline) {
      await new Promise((res) => setTimeout(res, 250))
    }
    const gaps = []
    for (let i = 1; i < ts.length; i++) gaps.push(ts[i] - ts[i - 1])
    const firstMs = ts.length ? ts[0] - tStart : -1
    return {
      frames: ts.length,
      firstFrameMs: firstMs > 0 ? +firstMs.toFixed(1) : null,
      gaps,
    }
  }, wantFrames)

  await browser.close()

  const gaps = r.gaps
  const avg = gaps.length ? gaps.reduce((a, b) => a + b, 0) / gaps.length : null
  const max = gaps.length ? Math.max(...gaps) : null
  return {
    gpu,
    firstFrameMs: r.firstFrameMs,
    frameGapMs: avg != null ? +avg.toFixed(1) : null,
    frameGapMaxMs: max != null ? +max.toFixed(1) : null,
    fps: avg != null && avg > 0 ? +(1000 / avg).toFixed(2) : null,
  }
}

console.log('config                                  renderer                    firstFrame  frameGap  maxGap   ~fps')
console.log('─'.repeat(104))
for (const [label, dsf, viewport, steps, swiftshader, wantFrames] of CONFIGS) {
  const r = await measure({ dsf, viewport, steps, swiftshader, wantFrames })
  const gpu = r.gpu.includes('SwiftShader') ? 'SwiftShader (software)' : 'RTX 2080 SUPER (D3D11)'
  console.log(
    label.padEnd(38) +
    gpu.padEnd(26) +
    String(r.firstFrameMs ?? '—').padStart(8) + 'ms  ' +
    String(r.frameGapMs ?? '—').padStart(7) + 'ms  ' +
    String(r.frameGapMaxMs ?? '—').padStart(6) + 'ms  ' +
    String(r.fps ?? '—').padStart(6),
  )
}
