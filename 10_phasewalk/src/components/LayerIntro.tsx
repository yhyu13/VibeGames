// components/LayerIntro.tsx — layer card (worldview line + subtitle). Any key starts play.
import { PHASE_ICON } from '../core/constants'
import type { GameState } from '../core/types'

export function LayerIntro({ sim }: { sim: GameState }) {
  return (
    <div className="intro-card">
      <div className="intro-icon">{PHASE_ICON[sim.layer.theme]}</div>
      <h1>{sim.layer.name}</h1>
      <p className="intro-sub">{sim.layer.subtitle}</p>
      <p className="intro-hint">按任意键 · 四相之间，只有你能同行</p>
    </div>
  )
}
