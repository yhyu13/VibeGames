import { BAKED_STEPS } from './engine/baked'
import { installDevtools } from './engine/devtools'
import { convergedAt, createLiveBake, isConverged, type BakeSeries } from './engine/liveBake'
import { createScene, createSceneWebGL, type RendererMode } from './engine/SceneManager'

const hud = document.getElementById('status') as HTMLDivElement
const lossCanvas = document.getElementById('loss') as HTMLCanvasElement

function fmt(n: number): string {
  return n.toFixed(4)
}

/** Plot colours, both already in the page palette — no new hue, only a new role. */
const TRAIN_INK = '#cfe0ff'
const VAL_INK = '#9fe8ff'

/**
 * Log-y plot of the live bake's two series. The loss is log-L1 (log-compressed), so
 * each gridline is a decade boundary and the y-axis is labeled to make the descent
 * quantifiable rather than merely visible.
 *
 * Both series share ONE axis on purpose. The question the chart exists to answer is
 * comparative — does the curve that measures the decoder fall as far as the one that
 * measures batch fitting? — and two independently scaled axes would make any two
 * curves look alike, which is the flattering answer rather than the true one.
 */
function drawLoss(series: BakeSeries): void {
  const ctx = lossCanvas.getContext('2d')
  if (!ctx) return
  const W = lossCanvas.width
  const H = lossCanvas.height
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(5,8,16,0.62)'
  ctx.fillRect(0, 0, W, H)

  const pad = 6
  const { train, val } = series
  if (train.length < 2) {
    ctx.fillStyle = '#7a879c'
    ctx.font = '10px ui-monospace, monospace'
    ctx.fillText(`baking… ${train.length} pts`, pad, H / 2)
    return
  }

  // Domain over BOTH series: the val curve sits above the train curve for most of
  // the run, and a domain taken from train alone would push it off the top edge.
  let min = Infinity
  let max = 0
  for (const l of train.concat(val)) {
    if (l > max) max = l
    if (l < min) min = l
  }
  if (max <= min) max = min + 1e-6

  const x0 = pad
  const x1 = W - pad
  const y0 = pad
  const y1 = H - pad

  const logMin = Math.log10(Math.max(min, 1e-9))
  const logMax = Math.log10(max)
  const span = Math.max(logMax - logMin, 1e-6)

  ctx.strokeStyle = 'rgba(140,190,255,0.14)'
  ctx.lineWidth = 1
  ctx.fillStyle = '#7a879c'
  ctx.font = '9px ui-monospace, monospace'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (let g = 0; g <= 4; g++) {
    const y = y0 + (y1 - y0) * (g / 4)
    ctx.beginPath()
    ctx.moveTo(x0, y)
    ctx.lineTo(x1, y)
    ctx.stroke()
    // The curve maps max loss -> top (g=1 -> y0), min -> bottom (g=0 -> y1). Label the
    // gridlines the SAME way, so the top ring reads the max decade and the numbered
    // descent bottom. Before, g=0 (top) was 10^logMin — the minimum at the very top
    // of a curve that only ever moves DOWN toward it, i.e. the labels inverted the story.
    const dec = logMax - span * (g / 4)
    ctx.fillText(`10^${dec.toFixed(1)}`, x1 - 2, y)
  }

  const plot = (data: number[], ink: string): void => {
    if (data.length < 2) return
    ctx.strokeStyle = ink
    ctx.beginPath()
    for (let i = 0; i < data.length; i++) {
      const px = x0 + (x1 - x0) * (i / (data.length - 1))
      const g = (Math.log10(Math.max(data[i], 1e-9)) - logMin) / span
      const py = y1 - (y1 - y0) * g
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.stroke()
  }
  // Train first: it is the noisy, flat one, so the val curve stays legible on top.
  plot(train, TRAIN_INK)
  plot(val, VAL_INK)

  // Where the descent stopped. Measured at the shipped 8000 steps, the val curve falls 86%
  // of its total 37.7 px inside the first 8% of this plot's width, and the run draws its
  // last ~80% of samples after `isConverged` already holds — so most of the chart is a
  // flat line, and a flat line with nothing said about it is how a converged run gets read
  // as a stalled one. The mark is the same window test the HUD's `— converged` uses
  // (`liveBake`), drawn rather than printed, so the two cannot disagree.
  const at = convergedAt(val)
  if (at >= 0) {
    const cx = x0 + (x1 - x0) * (at / (val.length - 1))
    const cy = y1 - (y1 - y0) * ((Math.log10(Math.max(val[at], 1e-9)) - logMin) / span)
    ctx.strokeStyle = VAL_INK
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(cx + 0.5, cy - 7)
    ctx.lineTo(cx + 0.5, cy + 3)
    ctx.stroke()
    ctx.fillStyle = VAL_INK
    ctx.font = '9px ui-monospace, monospace'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText('converged', cx + 3, cy - 7)
  }

  // Legend. Two unlabeled curves would repeat the original defect at the drawing
  // layer — a reader would have to guess which line is the one that means anything.
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  let lx = x0 + 3
  for (const [label, ink] of [['train', TRAIN_INK], ['val', VAL_INK]] as const) {
    ctx.strokeStyle = ink
    ctx.beginPath()
    ctx.moveTo(lx, y0 + 5)
    ctx.lineTo(lx + 9, y0 + 5)
    ctx.stroke()
    ctx.fillStyle = ink
    ctx.fillText(label, lx + 12, y0 + 5)
    lx += 12 + ctx.measureText(label).width + 8
  }
}

async function main(): Promise<void> {
  if (!navigator.gpu) {
    hud.textContent = 'WebGL2 fallback: init…'
  } else {
    hud.textContent = 'WebGPU: init…'
  }

  const gpu = typeof navigator.gpu !== 'undefined'
  const scene = gpu
    ? await createScene(document.body)
    : await createSceneWebGL(document.body)
  installDevtools()

  let angle = 0.7
  let last = performance.now()
  let frames = 0
  let fps = 0
  let fpsAt = performance.now()

  // Live in-page bake: the decoder trains in the browser, streaming BOTH loss
  // series into the sparkline instead of asserting a single BAKED_VAL_L1.
  //
  // One `lastSeries` feeds the chart AND the HUD rows, so the number on screen and
  // the last plotted point are the same array element. They used to be two: the
  // readout showed the training loss for the whole bake under the label "bake
  // log-L1", then `onDone` swapped in the held-out val — a different quantity with a
  // ~4x different value, changed silently at the last frame.
  let liveSteps = 0
  let lastSeries: BakeSeries | undefined
  const bake = createLiveBake({
    onStep: (step, _loss, _lr, series) => {
      liveSteps = step
      lastSeries = series
      drawLoss(series)
    },
    onDone: (_finalVal, series) => {
      liveSteps = BAKED_STEPS
      lastSeries = series
      drawLoss(series)
    },
  })

  const rendererLabel: Record<RendererMode, string> = { webgpu: 'WebGPU', webgl2: 'WebGL2' }
  scene.setLightAngle(angle)

  const tick = (now: number): void => {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    angle += dt * 0.35
    scene.setLightAngle(angle)
    frames++
    if (now - fpsAt > 500) {
      fps = (frames * 1000) / (now - fpsAt)
      frames = 0
      fpsAt = now
      // Two rows, because there are two quantities. "bake log-L1" named neither of
      // them: it showed the batch-training loss while the bake ran and the held-out
      // val after, so the number a viewer watched descend was not the number the row
      // ended up reporting.
      // Converged here means the descent found a floor, not that step N was reached.
      // `— live` outranks it on purpose: while the bake is running, whether it has
      // finished is the more urgent fact, and the chart is already marking the other one.
      const tail = (a: number[] | undefined): string => (a?.length ? fmt(a[a.length - 1]) : '—')
      const progress = liveSteps < BAKED_STEPS
        ? ' — live'
        : isConverged(lastSeries?.val ?? []) ? ' — converged' : ' — done'
      const trainLine = lastSeries === undefined ? 'baking…' : tail(lastSeries.train)
      const valLine = lastSeries === undefined
        ? 'held out · sampled per 50 steps'
        : `${tail(lastSeries.val)} @ ${liveSteps} steps${progress}`
      hud.innerHTML = [
        `<div class="row"><span class="k">renderer</span><span class="v">${rendererLabel[scene.mode]}</span></div>`,
        `<div class="row"><span class="k">decoder</span><span class="v">8+6 → 32 → 32 → 3</span></div>`,
        `<div class="row"><span class="k">latent</span><span class="v">64² × 8  baked encoder</span></div>`,
        `<div class="row"><span class="k">train log-L1</span><span class="v">${trainLine}</span></div>`,
        `<div class="row"><span class="k">val log-L1</span><span class="v">${valLine}</span></div>`,
        `<div class="row"><span class="k">fps</span><span class="v">${fps.toFixed(0)}</span></div>`,
        `<div class="row"><span class="k">light</span><span class="v">${(angle % (Math.PI * 2)).toFixed(2)} rad</span></div>`,
      ].join('')
    }
    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
  bake.start()
}

void main()
