// App.tsx — canvas host + game loop (fixed dt 1/60, repo convention) + overlays.
import { useEffect, useRef } from 'react'
import { getSim, useGame } from './store'
import { SceneManager } from './engine/SceneManager'
import { CameraRig } from './engine/CameraRig'
import { InputManager } from './engine/InputManager'
import { AudioManager } from './engine/AudioManager'
import { ParticleSystem } from './engine/ParticleSystem'
import { createRenderer, PHASE_PALETTE } from './engine/ToonRenderer'
import { installDevtools } from './engine/devtools'
import { FIXED_DT, restartLayer, step } from './core/simulation/GameSim'
import { saveProgress } from './engine/storage'
import { HUD } from './components/HUD'
import { LayerIntro } from './components/LayerIntro'
import { VictoryScreen } from './components/VictoryScreen'
import { PauseScreen } from './components/PauseScreen'

export default function App() {
  const holder = useRef<HTMLDivElement>(null)
  const started = useGame((s) => s.started)

  useEffect(() => {
    installDevtools()
  }, [])

  useEffect(() => {
    if (!started) return
    const el = holder.current
    if (!el) return
    const sim = getSim()
    if (!sim) return

    const renderer = createRenderer()
    el.appendChild(renderer.domElement)
    const scene = new SceneManager(sim.layer)
    const camera = new CameraRig(window.innerWidth / window.innerHeight)
    const input = new InputManager()
    const audio = new AudioManager()
    const particles = new ParticleSystem(scene.scene)
    input.attach()

    let acc = 0
    let last = performance.now()
    let raf = 0
    let lastPhase = sim.player.phase
    let revealed = false
    let frameCount = 0
    let running = true

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.resize(window.innerWidth / window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const loop = (now: number) => {
      if (!running) return
      raf = requestAnimationFrame(loop)
      let dt = (now - last) / 1000
      last = now
      if (dt > 0.1) dt = 0.1
      acc += dt
      const t = now / 1000

      // pause toggle / restart / intro confirm (edge-triggered)
      if (input.consume('Escape') || input.consume('KeyP')) {
        if (sim.phase === 'playing') sim.phase = 'paused'
        else if (sim.phase === 'paused') sim.phase = 'playing'
      }
      if (input.consume('KeyR') && sim.phase !== 'layer_intro') {
        restartLayer(sim)
        sim.phase = 'playing'
      }
      if (sim.phase === 'layer_intro' && input.consume('Enter')) {
        sim.phase = 'playing'
      }

      while (acc >= FIXED_DT && (sim.phase === 'playing' || sim.phase === 'layer_intro')) {
        const inState = input.poll()
        if (sim.phase === 'layer_intro' && inState.jumpPressed) sim.phase = 'playing'
        if (sim.phase === 'playing') {
          const ev = step(sim, inState, FIXED_DT)
          if (ev.collected) {
            audio.collect()
            const sh = sim.shards.find((x) => x.id === ev.collected)
            if (sh) particles.burst(sh.position.x, sh.position.y, sh.position.z, PHASE_PALETTE[sh.phase].highlight, 18, 3)
          }
          if (ev.died) {
            audio.death()
            // respawn burst at spawn — 被吃相了 (the Phaseless takes a phase away)
            particles.burst(sim.player.position.x, sim.player.position.y + 1, sim.player.position.z, '#cfcfd4', 22, 3)
          }
          if (ev.gate) {
            audio.gate()
            if (sim.finished) {
              audio.clear()
              const p = { bestSwitches: { ...sim.bestSwitches }, totalPhaseDust: sim.totalPhaseDust }
              saveProgress(p)
            }
          }
          if (sim.player.phase !== lastPhase) {
            const airborne = !sim.player.grounded
            audio.switchTone(sim.player.phase)
            if (airborne) {
              // 相弹 (air switch): momentum conserved → upward glide + 0.5s momentum trail (worldview-first §4 ⭐②)
              audio.phaseBounce()
              particles.startTrail(PHASE_PALETTE[sim.player.phase].highlight)
            }
            particles.burst(sim.player.position.x, sim.player.position.y + 1, sim.player.position.z, PHASE_PALETTE[sim.player.phase].highlight, 10, 2)
            if (!revealed) {
              // 四相同现 极致时刻①: ghost layers fade in + 三连音 (worldview-first §4 ⭐①)
              revealed = true
              scene.reveal()
              audio.fourPhaseReveal()
            }
            lastPhase = sim.player.phase
          }
        }
        acc -= FIXED_DT
      }

      scene.sync(sim, t, dt)
      particles.trailPoint(sim.player.position.x, sim.player.position.y + 1, sim.player.position.z)
      particles.update(dt)
      camera.update(sim.player.position, dt)
      renderer.render(scene.scene, camera.cam)

      if (frameCount++ % 3 === 0) useGame.getState().bump()
    }
    raf = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      input.detach()
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [started])

  const sim = useGame((s) => s.sim)
  const version = useGame((s) => s.version)
  void version

  return (
    <div className="app">
      <div ref={holder} className="stage" />
      <div className="vignette" />
      {sim && sim.phase === 'layer_intro' && <LayerIntro sim={sim} />}
      {sim && sim.phase === 'playing' && <HUD sim={sim} />}
      {sim && sim.phase === 'paused' && <PauseScreen sim={sim} />}
      {sim && sim.phase === 'victory' && <VictoryScreen sim={sim} />}
      {!started && (
        <div className="boot-overlay" onClick={() => useGame.getState().start()}>
          <div className="boot-title">PHASEWALK · 四相行者</div>
          <div className="boot-hint">点击进入四相塔</div>
        </div>
      )}
    </div>
  )
}
