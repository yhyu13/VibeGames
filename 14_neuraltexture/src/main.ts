import { BAKED_STEPS } from './engine/baked'
import { installDevtools } from './engine/devtools'
import { createLiveBake } from './engine/liveBake'
import { createScene, createSceneWebGL, type RendererMode } from './engine/SceneManager'

const hud = document.getElementById('status') as HTMLDivElement
const lossCanvas = document.getElementById('loss') as HTMLCanvasElement

function fmt(n: number): string {
  return n.toFixed(4)
}

/**
 * Log-y sparkline of the live bake `history[]`. The loss is log-L1 (log-compressed),
 * so the y-axis is labeled implicitly by the curve dropping on a log scale.
 */
function drawLoss(history: number[]): void {
  const ctx = lossCanvas.getContext('2d')
  if (!ctx) return
  const W = lossCanvas.width
  const H = lossCanvas.height
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(5,8,16,0.62)'
  ctx.fillRect(0, 0, W, H)

  const pad = 6
  if (history.length < 2) {
    ctx.fillStyle = '#7a879c'
    ctx.font = '10px ui-monospace, monospace'
    ctx.fillText(`baking… ${history.length} pts`, pad, H / 2)
    return
  }

  let min = Infinity
  let max = 0
  for (const l of history) {
    if (l > max) max = l
    if (l < min) min = l
  }
  if (max <= min) max = min + 1e-6

  const x0 = pad
  const x1 = W - pad
  const y0 = pad
  const y1 = H - pad

  ctx.strokeStyle = 'rgba(140,190,255,0.14)'
  ctx.lineWidth = 1
  for (let g = 0; g <= 4; g++) {
    const y = y0 + (y1 - y0) * (g / 4)
    ctx.beginPath()
    ctx.moveTo(x0, y)
    ctx.lineTo(x1, y)
    ctx.stroke()
  }

  const logMin = Math.log10(Math.max(min, 1e-9))
  const logMax = Math.log10(max)
  const span = Math.max(logMax - logMin, 1e-6)
  ctx.strokeStyle = '#9fe8ff'
  ctx.beginPath()
  for (let i = 0; i < history.length; i++) {
    const px = x0 + (x1 - x0) * (i / (history.length - 1))
    const g = (Math.log10(Math.max(history[i], 1e-9)) - logMin) / span
    const py = y1 - (y1 - y0) * g
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.stroke()
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

  // Live in-page bake: the decoder trains in the browser, streaming the loss
  // curve into the sparkline instead of asserting a single BAKED_VAL_L1.
  let liveVal: number | undefined
  let liveSteps = 0
  const bake = createLiveBake({
    onStep: (step, loss, _lr, history) => {
      liveSteps = step
      liveVal = loss
      drawLoss(history)
    },
    onDone: (finalVal, history) => {
      liveSteps = BAKED_STEPS
      liveVal = finalVal
      drawLoss(history)
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
      const bakeLine = liveVal === undefined
        ? 'baking…'
        : `${fmt(liveVal)} @ ${liveSteps} steps${liveSteps < BAKED_STEPS ? ' — live' : ''}`
      hud.innerHTML = [
        `<div class="row"><span class="k">renderer</span><span class="v">${rendererLabel[scene.mode]}</span></div>`,
        `<div class="row"><span class="k">decoder</span><span class="v">8+6 → 32 → 32 → 3</span></div>`,
        `<div class="row"><span class="k">latent</span><span class="v">64² × 8  baked encoder</span></div>`,
        `<div class="row"><span class="k">bake log-L1</span><span class="v">${bakeLine}</span></div>`,
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
