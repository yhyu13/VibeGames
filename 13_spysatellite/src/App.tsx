// App.tsx — canvas host + fixed-dt loop + overlays.
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getSim, useGame } from './store'
import { CameraRig } from './engine/CameraRig'
import { CourtyardTile } from './engine/CourtyardTile'
import { InputManager } from './engine/InputManager'
import { OrbitShell } from './engine/OrbitShell'
import { AudioManager } from './engine/AudioManager'
import { installDevtools, recordFrameTime } from './engine/devtools'
import { COURTYARD_ZOOM } from './core/constants'
import { FIXED_DT, step } from './core/simulation/GameSim'
import type { EntityId, SimEvent, TickInput } from './core/types'
import { HUD } from './components/HUD'
import { RadioLog } from './components/RadioLog'
import { EndCard } from './components/EndCard'
import { Pause } from './components/Pause'

export default function App() {
  const holder = useRef<HTMLDivElement>(null)
  const started = useGame((s) => s.started)
  const sim = useGame((s) => s.sim)
  const version = useGame((s) => s.version)

  useEffect(() => {
    installDevtools()
  }, [])

  useEffect(() => {
    if (!started) return
    const el = holder.current
    const state = getSim()
    if (!el || !state) return

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
      alpha: false,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x030812, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const orbit = new OrbitShell()
    const tile = new CourtyardTile()
    const camera = new CameraRig(window.innerWidth / window.innerHeight)
    const input = new InputManager()
    const audio = new AudioManager()
    scene.add(orbit.group)
    scene.add(tile.group)
    input.attach(renderer.domElement)
    audio.ensure()
    if (import.meta.env.DEV) {
      const w = window as unknown as {
        __zoomTo?: (v: number) => void
        __holdSar?: (on: boolean) => void
      }
      w.__zoomTo = (v: number) => camera.setZoom01(v)
      w.__holdSar = (on: boolean) => { input.forceSar = on }
    }

    let acc = 0
    let last = performance.now()
    let raf = 0
    let running = true
    let hudAcc = 0

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.resize(window.innerWidth / window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const dispatch = (events: SimEvent[]) => {
      for (const ev of events) {
        if (ev.type === 'sound') audio.playNamed(ev.sound)
      }
      if (events.length) useGame.getState().bump()
    }

    const loop = (now: number) => {
      if (!running) return
      raf = requestAnimationFrame(loop)
      const frameStart = performance.now()
      let dt = (now - last) / 1000
      last = now
      if (dt > 0.1) dt = 0.1

      if (input.consumePause()) {
        if (state.phase === 'playing') state.phase = 'paused'
        else if (state.phase === 'paused') state.phase = 'playing'
        useGame.getState().bump()
      }
      if (input.consumeRestart()) {
        useGame.getState().restart()
        camera.setZoom01(0)
        input.forceSar = false
        audio.ensure()
      }

      const zoomD = input.consumeZoom()
      if (zoomD) camera.setZoomDelta(zoomD)
      camera.followVip(state.entities.vip.pos, state.lock.held)
      camera.update(dt)

      const click = input.consumeClick()
      let clickId: EntityId | null = null
      const pending = (window as unknown as { __pendingClick?: EntityId }).__pendingClick
      if (pending) {
        clickId = pending
        delete (window as unknown as { __pendingClick?: EntityId }).__pendingClick
      } else if (click && camera.zoom01 >= COURTYARD_ZOOM) {
        clickId = tile.pick(camera.cam, click.x, click.y, renderer.domElement)
      }

      if (state.phase === 'playing') acc += dt
      while (acc >= FIXED_DT && state.phase === 'playing') {
        const tick: TickInput = {
          zoom01: camera.zoom01,
          sarHeld: input.sarActive,
          clickId,
        }
        const events = step(state, tick, FIXED_DT)
        dispatch(events)
        clickId = null
        acc -= FIXED_DT
      }

      orbit.update(camera.zoom01, state.sensor.sarOn, now / 1000)
      tile.update(state, now / 1000)
      renderer.render(scene, camera.cam)

      hudAcc += dt
      if (hudAcc > 0.12) {
        hudAcc = 0
        useGame.getState().bump()
      }
      recordFrameTime(performance.now() - frameStart)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      input.detach(renderer.domElement)
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [started])

  if (!started || !sim) {
    return (
      <div className="boot" onClick={() => useGame.getState().start()}>
        <div className="boot-title">EYE-13</div>
        <div className="boot-sub">NIGHT SAR · ONE BLOCK · 90s</div>
        <div className="boot-hint">CLICK TO ARM SENSOR</div>
      </div>
    )
  }

  void version
  return (
    <div className="app">
      <div className="stage" ref={holder} />
      <div className="scanlines" />
      <div className="vignette" />
      <HUD sim={sim} />
      <RadioLog sim={sim} />
      {sim.phase === 'paused' && <Pause />}
      {sim.phase === 'ended' && <EndCard sim={sim} />}
    </div>
  )
}
