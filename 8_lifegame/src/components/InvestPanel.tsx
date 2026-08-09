import { useState } from 'react'
import { ASSETS } from '../core/data/assets'
import { INVEST_ALLOCATION_CAP_PCT } from '../core/constants'
import { useGameStore } from '../store'

export function InvestPanel() {
  const invest = useGameStore((s) => s.invest)
  const [assetId, setAssetId] = useState(ASSETS[0]!.id)
  const [pct, setPct] = useState(10)

  return (
    <div className="panel invest-panel">
      <div className="invest-heading">做一次模拟交易 · 虚拟资金</div>
      <div className="invest-assets">
        {ASSETS.map((asset) => (
          <button
            key={asset.id}
            className={`btn btn-asset ${asset.id === assetId ? 'btn-asset-selected' : ''}`}
            onClick={() => setAssetId(asset.id)}
          >
            <span>{asset.icon}</span> {asset.label}
          </button>
        ))}
      </div>
      <label className="invest-slider-label">
        仓位 {pct}% (上限 {INVEST_ALLOCATION_CAP_PCT}%)
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
