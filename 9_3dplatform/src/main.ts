import { createScene } from './engine/SceneManager'
import { GameSim } from './engine/GameSim'
import { InputManager } from './engine/InputManager'
import { AudioManager } from './engine/AudioManager'
import type { Input } from './core/types'

const app = document.getElementById('app')!
const phaseEl = document.getElementById('phase')!
const timerEl = document.getElementById('timer')!
const hintEl = document.getElementById('hint')!
const centerEl = document.getElementById('center')!

const scene = createScene(app)
const sim = new GameSim()
const input = new InputManager()
const audio = new AudioManager()

const HINTS: Record<string, string> = {
  menu: '移动：WASD / 方向键 · 跳跃：空格（连按二段跳 · 松开缩短） · 暂停：P',
  playing: 'WASD / 方向键 移动 · 空格 跳跃（连按二段跳 · 松开缩短） · P 暂停',
  paused: '已暂停 — 按 P 或 Esc 继续'
}

function renderHUD(): void {
  phaseEl.textContent =
    sim.state.phase === 'menu' ? 'PRISM LEDGE — 菜单' :
    sim.state.phase === 'playing' ? '游戏中' :
    sim.state.phase === 'paused' ? '已暂停' : sim.state.phase
  timerEl.textContent =
    sim.state.phase === 'menu' ? '' : ` · ${sim.state.realTime.toFixed(2)}s`
  hintEl.textContent = HINTS[sim.state.phase] ?? ''
}

function renderCenter(): void {
  if (sim.state.phase === 'menu') {
    centerEl.innerHTML =
      `<h1>棱镜断崖</h1><p>PRISM LEDGE — 概念原型</p>` +
      `<button id="start">开始游戏 (Enter)</button>`
    document.getElementById('start')!.addEventListener('click', () => {
      sim.startLevel()
      renderCenter()
    })
  } else {
    centerEl.innerHTML = ''
  }
  renderHUD()
}

input.attach(window)
// The AudioContext must be CREATED inside a real user gesture. The start press is spent in the
// rAF loop below, and a context first built there is not a gesture — Chrome leaves it suspended,
// so the game would run silent with every gate green. Unlock on the first real input instead,
// whichever affordance (the start button or a key) actually begins the run.
const unlockAudio = (): void => { audio.ensure() }
window.addEventListener('keydown', unlockAudio, { once: true })
window.addEventListener('pointerdown', unlockAudio, { once: true })
renderCenter()

// --- Main loop: rAF + fixed-timestep sim ---
let last = performance.now()

function frame(now: number): void {
  const realDt = Math.min((now - last) / 1000, 0.05)
  last = now

  // Phase-control events (one-shot).
  if (input.takeStart() && sim.state.phase === 'menu') {
    sim.startLevel()
    // The Space that began the run is one physical press doing two jobs. It starts
    // the level and does nothing else — otherwise sample() hands the same edge
    // back as a jump and the run opens with a hop (see consumeJumpEdge).
    input.consumeJumpEdge()
    renderCenter()
  }
  if (input.takePause() && (sim.state.phase === 'playing' || sim.state.phase === 'paused')) {
    sim.togglePause()
    renderCenter()
  }

  const snap: Input = input.sample()
  const feedback = sim.update(realDt, snap, scene.solids)
  // The beat cues. The ear reads the SAME SimFeedback the eye does and infers nothing, so the
  // two senses cannot disagree about which beat fired — and the thud takes the squash's own
  // verdict and impact, so a step-off that does not squash does not thud, and a fall that
  // squashes hard does not thud softly.
  if (feedback.jumpKind !== 'none') audio.jump(feedback.jumpKind === 'double')
  if (feedback.landBeat) audio.land(feedback.landImpact)
  if (feedback.deniedJump) audio.denied()
  if (feedback.fellOut) audio.fall()
  // Draw the interpolated position, not the stepped one: the sim only advances on
  // frames that owe a whole FIXED_DT, which is a minority of them above 60Hz.
  scene.update(
    sim.renderPosition(),
    realDt,
    feedback.bodyScaleX,
    feedback.bodyScaleY,
    feedback.bodyVelX,
    feedback.bodyVelZ,
    feedback.fellOut
  )
  scene.render()

  renderHUD()
  requestAnimationFrame(frame)
}

requestAnimationFrame(frame)
