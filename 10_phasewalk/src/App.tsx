// App.tsx — canvas host + game loop (fixed dt 1/60, repo convention) + overlays.
import { useEffect, useRef } from 'react'
import { getSim, useGame } from './store'
import { SceneManager } from './engine/SceneManager'
import { CameraRig } from './engine/CameraRig'
import { InputManager } from './engine/InputManager'
import { AudioManager } from './engine/AudioManager'
import { ParticleSystem } from './engine/ParticleSystem'
import { createRenderer, PHASE_PALETTE } from './engine/ToonRenderer'
import { installDevtools, recordFrameTime } from './engine/devtools'
import { FIXED_DT, restartLayer, restartRun, step } from './core/simulation/GameSim'
import { saveProgress } from './engine/storage'
import { HUD } from './components/HUD'
import { LayerIntro } from './components/LayerIntro'
import { LayerClear } from './components/LayerClear'
import { VictoryScreen } from './components/VictoryScreen'
import { PauseScreen } from './components/PauseScreen'
import { RadialMenu } from './components/RadialMenu'

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
    let revealed = false
    input.setRadialListener((r) => {
      useGame.getState().setRadial(r)
      // 四相同现 极致时刻①: ghost layers fade in on first Tab-open (worldview-first §4 ⭐①) — not on the
      // first phase change (which can never be "切到固相" since spawn is already solid). Start the pad here.
      if (r.active && !revealed) {
        revealed = true
        scene.reveal()
        audio.fourPhaseReveal()
        audio.startPad(sim.player.phase)
      }
    })

    let acc = 0
    let last = performance.now()
    let raf = 0
    let lastPhase = sim.player.phase
    let lastLayerIndex = sim.layerIndex
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
      // accumulate only while the sim actually steps — pausing/victory must not bank time (B: pause timewarp)
      if (sim.phase === 'playing' || sim.phase === 'layer_intro') acc += dt
      const t = now / 1000

      // pause toggle / restart / intro confirm (edge-triggered)
      if (input.consume('Escape') || input.consume('KeyP')) {
        if (sim.phase === 'playing') { sim.phase = 'paused'; audio.setPadMuted(true) }
        else if (sim.phase === 'paused') { sim.phase = 'playing'; audio.setPadMuted(false) }
      }
      if (input.consume('KeyR') && sim.phase !== 'layer_intro') {
        // victory R = new climb from F1; any other phase R = reset the current floor
        if (sim.phase === 'victory') restartRun(sim)
        else { restartLayer(sim); sim.phase = 'playing' }
        lastPhase = sim.player.phase   // restart-forced solid reset is NOT a player switch
        input.clearQueuedInput()        // drop a phase request queued before the reset
      }
      if (sim.phase === 'layer_intro' && input.consume('Enter')) {
        sim.phase = 'playing'
      }
      // 登层 → 下一层（consume 不依赖 simActive，layer_clear 时 Space/Enter 也能触发）
      if (sim.phase === 'layer_clear' && (input.consume('Enter') || input.consume('Space'))) {
        useGame.getState().advanceLayer()
      }

      while (acc >= FIXED_DT && (sim.phase === 'playing' || sim.phase === 'layer_intro')) {
        const inState = input.poll()
        if (sim.phase === 'layer_intro' && inState.jumpPressed) {
          sim.phase = 'playing'
          inState.jumpPressed = false // "start" via jump must not also launch a jump on frame one
        }
        if (sim.phase === 'playing') {
          const prePos = { x: sim.player.position.x, y: sim.player.position.y, z: sim.player.position.z }
          const ev = step(sim, inState, FIXED_DT)
          if (ev.collected) {
            audio.collect()
            const sh = sim.shards.find((x) => x.id === ev.collected)
            if (sh) particles.burst(sh.position.x, sh.position.y, sh.position.z, PHASE_PALETTE[sh.phase].highlight, 18, 3)
          }
          if (ev.died) {
            audio.death()
            // 被吃相 at the point of contact (captured before respawn moved the player), not just at spawn
            particles.burst(prePos.x, prePos.y + 1, prePos.z, '#cfcfd4', 22, 3)
            lastPhase = sim.player.phase // death-forced phase reset is NOT a player switch — no spurious switch tone
            input.clearQueuedInput()      // drop a phase request queued before the kill
          }
          if (ev.dispersed) {
            audio.disperse()
            // liquid 被打散 (soft penalty — forced back to solid, momentum cleared)
            particles.burst(sim.player.position.x, sim.player.position.y + 1, sim.player.position.z, PHASE_PALETTE.liquid.highlight, 18, 3)
            lastPhase = sim.player.phase // forced-solid reset is NOT a player switch
            input.clearQueuedInput()      // drop a phase request queued before the disperse reset
          }
          if (ev.reflected) {
            audio.reflect()
            particles.burst(sim.player.position.x, sim.player.position.y + 1, sim.player.position.z, PHASE_PALETTE.plasma.highlight, 12, 3)
          }
          if (ev.destroyedEmitter) {
            audio.destroy()
            const em = sim.layer.emitters.find((x) => x.id === ev.destroyedEmitter)
            if (em) particles.burst(em.position.x, em.position.y, em.position.z, '#ffd166', 26, 4)
          }
          if (ev.solidified) {
            audio.solidify()
            const pf = sim.layer.phaseFluids.find((x) => x.id === ev.solidified)
            if (pf) particles.burst((pf.min.x + pf.max.x) / 2, (pf.min.y + pf.max.y) / 2, (pf.min.z + pf.max.z) / 2, PHASE_PALETTE.liquid.highlight, 16, 3)
          }
          if (ev.jumped) {
            audio.jump()
            particles.burst(sim.player.position.x, sim.player.position.y, sim.player.position.z, PHASE_PALETTE.solid.highlight, 6, 2)
          }
          if (ev.burst) {
            audio.burst()
            particles.burst(sim.player.position.x, sim.player.position.y, sim.player.position.z, PHASE_PALETTE.plasma.highlight, 14, 4)
          }
          if (ev.landed) {
            audio.land()
            particles.burst(sim.player.position.x, sim.player.position.y, sim.player.position.z, '#cfcfd4', 5, 2)
          }
          if (ev.fired.length) {
            for (const eid of ev.fired) {
              audio.shot()
              const em = sim.layer.emitters.find((x) => x.id === eid)
              if (em) particles.burst(em.position.x, em.position.y, em.position.z, '#8fa3c8', 4, 2)
            }
          }
          if (ev.gate) {
            audio.gate()
            // min-switch score is recorded in GameSim.step; persist on every gate (non-final layers too)
            saveProgress({ bestSwitches: { ...sim.bestSwitches }, totalPhaseDust: sim.totalPhaseDust })
            if (sim.finished) audio.clear()
          }
          if (sim.player.phase !== lastPhase) {
            const airborne = !sim.player.grounded
            audio.switchTone(sim.player.phase)
            audio.setPadPhase(sim.player.phase)
            if (airborne) {
              // 相弹 (air switch): momentum conserved → upward glide + 0.5s momentum trail (worldview-first §4 ⭐②)
              audio.phaseBounce()
              particles.startTrail(PHASE_PALETTE[sim.player.phase].highlight)
            }
            particles.burst(sim.player.position.x, sim.player.position.y + 1, sim.player.position.z, PHASE_PALETTE[sim.player.phase].highlight, 10, 2)
            lastPhase = sim.player.phase
          }
        }
        acc -= FIXED_DT
      }

      // floor advance rebuilds the 4-layer scene for the new LayerData (per-floor geometry)
      if (sim.layerIndex !== lastLayerIndex) {
        scene.rebuild(sim.layer)
        lastLayerIndex = sim.layerIndex
        lastPhase = sim.player.phase
        input.clearQueuedInput()   // drop a phase request queued before the floor transition
      }
      scene.sync(sim, t, dt)
      particles.trailPoint(sim.player.position.x, sim.player.position.y + 1, sim.player.position.z)
      particles.update(dt)
      camera.update(sim.player.position, dt)
      renderer.render(scene.scene, camera.cam)
      recordFrameTime(performance.now() - now)

      if (frameCount++ % 3 === 0) useGame.getState().bump()
    }
    raf = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      input.detach()
      window.removeEventListener('resize', onResize)
      audio.stopPad()
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
      {sim && sim.phase === 'layer_clear' && <LayerClear sim={sim} />}
      {sim && sim.phase === 'playing' && <HUD sim={sim} />}
      <RadialMenu />
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
