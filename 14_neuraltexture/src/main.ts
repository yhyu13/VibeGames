import { BAKED_STEPS, BAKED_VAL_L1 } from './engine/baked'
import { installDevtools } from './engine/devtools'
import { createScene } from './engine/SceneManager'

const hud = document.getElementById('status') as HTMLDivElement

function fmt(n: number): string {
  return n.toFixed(4)
}

async function main(): Promise<void> {
  if (!navigator.gpu) {
    hud.innerHTML = '<span id="err">WebGPU NOT available — neural texture needs a fragment MLP on WebGPU.</span>'
    return
  }

  hud.textContent = 'WebGPU: init…'
  const scene = await createScene(document.body)
  installDevtools()

  let angle = 0.7
  let last = performance.now()
  let frames = 0
  let fps = 0
  let fpsAt = performance.now()
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
      hud.innerHTML = [
        `<div class="row"><span class="k">WebGPU</span><span class="v">OK</span></div>`,
        `<div class="row"><span class="k">decoder</span><span class="v">8+6 → 32 → 32 → 3</span></div>`,
        `<div class="row"><span class="k">latent</span><span class="v">64² × 8  baked encoder</span></div>`,
        `<div class="row"><span class="k">bake log-L1</span><span class="v">${fmt(BAKED_VAL_L1)} @ ${BAKED_STEPS} steps</span></div>`,
        `<div class="row"><span class="k">fps</span><span class="v">${fps.toFixed(0)}</span></div>`,
        `<div class="row"><span class="k">light</span><span class="v">${(angle % (Math.PI * 2)).toFixed(2)} rad</span></div>`,
      ].join('')
    }
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

void main()
