import { useEffect, useRef } from 'react'
import { SceneManager } from './engine/SceneManager'
import { HUD } from './components/HUD'
import { ControlPanel } from './components/ControlPanel'

export default function App() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const mgr = new SceneManager(host)
    mgr.start()
    return () => mgr.dispose()
  }, [])

  return (
    <div id="app-root">
      <div id="canvas-host" ref={hostRef} />
      <HUD />
      <ControlPanel />
    </div>
  )
}
