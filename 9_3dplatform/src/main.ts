import { createScene } from './engine/SceneManager'
import { GameSim } from './engine/GameSim'
import { InputManager } from './engine/InputManager'
import type { Input } from './core/types'

const app = document.getElementById('app')!
const phaseEl = document.getElementById('phase')!
const timerEl = document.getElementById('timer')!
const hintEl = document.getElementById('hint')!
const centerEl = document.getElementById('center')!

const scene = createScene(app)
const sim = new GameSim()
const input = new InputManager()

const HINTS: Record<string, string> = {
  menu: '移动：WASD / 方向键 · 跳跃：空格（可二段跳） · 暂停：P',
  playing: 'WASD / 方向键 移动 · 空格 跳跃 · 松开空格 缩短跳跃 · P 暂停',
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
renderCenter()

// --- Main loop: rAF + fixed-timestep sim ---
let last = performance.now()

function frame(now: number): void {
  const realDt = Math.min((now - last) / 1000, 0.05)
  last = now

  // Phase-control events (one-shot).
  if (input.takeStart() && sim.state.phase === 'menu') {
    sim.startLevel()
    renderCenter()
  }
  if (input.takePause() && (sim.state.phase === 'playing' || sim.state.phase === 'paused')) {
    sim.togglePause()
    renderCenter()
  }

  const snap: Input = input.sample()
  sim.update(realDt, snap, scene.solids)
  scene.update(sim.state.player.position, realDt)
  scene.render()

  renderHUD()
  requestAnimationFrame(frame)
}

requestAnimationFrame(frame)
