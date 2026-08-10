import { useState } from 'react'
import { ASSETS } from '../core/data/assets'
import { INVEST_ALLOCATION_CAP_PCT } from '../core/constants'
import { infoQuality } from '../core/simulation/invest'
import { useGameStore } from '../store'

// v1.2 §4: the preview the player sees is their MOOD-filtered version of the market — bad
// mood distorts pessimistically, great mood distorts optimistically, only 30–60 sees straight.
// The badge says it out loud; the distorted ticks are the proof. Assets themselves never change.
const QUALITY_LABEL = { rational: '理性', pessimistic: '情绪化', overconfident: '亢奋' } as const
const QUALITY_FLAVOR = {
  rational: '你看到的是真实走势。',
  pessimistic: '情绪低落 —— 你看到的前景可能比实际更糟。',
  overconfident: '心态亢奋 —— 你看到的前景可能被自己美化。',
} as const

export function InvestPanel() {
  const invest = useGameStore((s) => s.invest)
  const player = useGameStore((s) => s.state.player)
  const previews = useGameStore((s) => s.state.pendingAssetPreviews)
  const [assetId, setAssetId] = useState(ASSETS[0]!.id)
  const [pct, setPct] = useState(10)

  const info = infoQuality(player)
  const asset = ASSETS.find((a) => a.id === assetId)!
  const ticks = previews?.[assetId] ?? asset.ticks

  return (
    <div className="panel invest-panel">
      <div className="invest-heading">做一次模拟交易 · 虚拟资金</div>
      <div className={`info-badge info-${info.quality}`} title={QUALITY_FLAVOR[info.quality]}>
        信息状态:{QUALITY_LABEL[info.quality]}
        {info.narrowed ? ' · 认知收窄了失真' : ''}
      </div>
      <div className="invest-assets">
        {ASSETS.map((a) => (
          <button
            key={a.id}
            className={`btn btn-asset ${a.id === assetId ? 'btn-asset-selected' : ''}`}
            onClick={() => setAssetId(a.id)}
          >
            <span>{a.icon}</span> {a.label}
          </button>
        ))}
      </div>
      <div className="invest-preview">
        <span className="invest-preview-label">近期走势(你看到的):</span>
        {ticks.map((t, i) => (
          <span key={i} className={`preview-tick ${t >= 0 ? 'tick-gain' : 'tick-loss'}`}>
            {t >= 0 ? '+' : ''}
            {t}%
          </span>
        ))}
      </div>
      <label className="invest-slider-label">
        仓位 {pct}% (上限 {INVEST_ALLOCATION_CAP_PCT}%) · 0% = 稳健理财,不赌
        <input
          type="range"
          min={0}
          max={INVEST_ALLOCATION_CAP_PCT}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
        />
      </label>
      <button className="btn btn-primary" onClick={() => invest(assetId, pct)}>
        确认交易
      </button>
    </div>
  )
}
