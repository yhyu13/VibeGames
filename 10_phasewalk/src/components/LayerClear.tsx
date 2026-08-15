// components/LayerClear.tsx — 登层卡 (layer cleared → next floor). Enter/Space advances.
import { PHASE_ICON } from '../core/constants'
import { LAYERS } from '../core/data/levels'
import type { GameState } from '../core/types'

export function LayerClear({ sim }: { sim: GameState }) {
  const next = LAYERS[sim.layerIndex + 1]
  return (
    <div className="intro-card">
      <div className="intro-icon">{next ? PHASE_ICON[next.theme] : '✦'}</div>
      <h1>{sim.layer.name} · 已明</h1>
      <p className="intro-sub">{next ? `下一层 · ${next.name}` : '塔顶已近'}</p>
      <p className="intro-hint">按 空格 / 回车 · 上行</p>
    </div>
  )
}
