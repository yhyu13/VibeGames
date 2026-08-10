import { useState } from 'react'
import type { Candle, InvestAdvice } from '../core/types'
import { ASSETS } from '../core/data/assets'
import { INVEST_ALLOCATION_CAP_PCT } from '../core/constants'
import { infoQuality } from '../core/simulation/invest'
import { useGameStore } from '../store'

// v1.2 §4: the preview the player sees is their MOOD-filtered version of the market — bad
// mood distorts pessimistically, great mood distorts optimistically, only 30–60 sees straight.
// The badge says it out loud. Assets themselves never change.
const QUALITY_LABEL = { rational: '理性', pessimistic: '情绪化', overconfident: '亢奋' } as const
const QUALITY_FLAVOR = {
  rational: '你看到的是真实走势。',
  pessimistic: '情绪低落 —— 你看到的前景可能比实际更糟。',
  overconfident: '心态亢奋 —— 你看到的前景可能被自己美化。',
} as const

// v1.3 §3: the spin subline — mood doesn't change the news, it changes your 解读.
const SPIN_LINE = {
  bearish: '但你总往坏处想 —— 再好的消息你也读出利空。',
  bullish: '但你只觉得要起飞 —— 再平的消息你也读出利好。',
} as const

// v1.5 §1: cognition-gated advice tag. Blind shows 「认知不足 · 看不懂」 so the gate itself
// teaches the loop (去图书馆涨认知 → 建议变准). Colors follow P&L semantics (gain green =
// 适宜), NOT the candle chart's 红涨绿跌 price-direction inversion.
const ADVICE_CLASS = { 适宜投资: 'advice-go', 谨慎参与: 'advice-care', 不适宜投资: 'advice-no', 看不懂: 'advice-blind' } as const

function AdviceTag({ advice }: { advice: InvestAdvice | undefined }) {
  if (!advice) return null
  if (advice.band === 'blind') return <span className="advice-tag advice-blind">认知不足 · 看不懂</span>
  return (
    <span className={`advice-tag ${ADVICE_CLASS[advice.label]}`} title={`认知${advice.band === 'sharp' ? '≥80,建议精准' : advice.band === 'clear' ? '≥60,建议较准' : '不足,建议模糊'}`}>
      建议:{advice.label}
    </span>
  )
}

// v1.3 §2: in-file SVG candlestick chart, HISTORY ONLY (past turns — no future leak).
// 红涨绿跌 (A股 convention): up candles use the --loss red token, down candles --gain green.
// v1.5 §2: mini variant renders the same viewBox math at half height for the 3-row layout.
function CandleChart({ candles, mini = false }: { candles: Candle[]; mini?: boolean }) {
  if (candles.length === 0) {
    return <div className={`candle-empty${mini ? ' candle-empty-mini' : ''}`}>尚无历史盘面 —— 你的第一笔交易,就是第一根 K 线。</div>
  }
  const W = 320
  const H = mini ? 44 : 110
  const PAD = mini ? 4 : 8
  const max = Math.max(...candles.map((c) => c.high))
  const min = Math.min(...candles.map((c) => c.low))
  const span = max - min || 1
  const y = (v: number) => H - PAD - ((v - min) / span) * (H - 2 * PAD)
  const bw = W / candles.length
  return (
    <svg className={`candle-chart${mini ? ' candle-chart-mini' : ''}`} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="K 线走势(历史)">
      {candles.map((c, i) => {
        const up = c.close >= c.open
        const cx = i * bw + bw / 2
        const bodyTop = y(Math.max(c.open, c.close))
        const bodyH = Math.max(1.5, Math.abs(y(c.open) - y(c.close)))
        return (
          <g key={i} className={up ? 'candle-up' : 'candle-down'}>
            <line x1={cx} x2={cx} y1={y(c.high)} y2={y(c.low)} strokeWidth={1.5} />
            <rect x={cx - bw * 0.28} width={bw * 0.56} y={bodyTop} height={bodyH} rx={1} />
          </g>
        )
      })}
    </svg>
  )
}

// v1.5 §2: ONE panel, all three assets on screen at once — no asset-tab switching.
// Each row carries its own mini K-line + 热点新闻 + cognition advice tag; clicking a row
// selects it (radio behavior, replaces the old 3-button tab strip). One slider + ONE
// 确认交易 button below.
export function InvestPanel() {
  const invest = useGameStore((s) => s.invest)
  const player = useGameStore((s) => s.state.player)
  const previews = useGameStore((s) => s.state.pendingAssetPreviews)
  const newsMap = useGameStore((s) => s.state.pendingMarketNews)
  const advices = useGameStore((s) => s.state.pendingMarketAdvices)
  const [assetId, setAssetId] = useState(ASSETS[0]!.id)
  const [pct, setPct] = useState(10)

  const info = infoQuality(player)

  return (
    <div className="panel invest-panel">
      <div className="invest-heading">模拟盘 · 虚拟资金练手(前 {player.turn - 1} 周盘面)</div>
      <div className={`info-badge info-${info.quality}`} title={QUALITY_FLAVOR[info.quality]}>
        信息状态:{QUALITY_LABEL[info.quality]}
        {info.narrowed ? ' · 认知收窄了失真' : ''}
      </div>
      <div className="invest-rows">
        {ASSETS.map((a) => {
          const news = newsMap?.[a.id]
          const selected = a.id === assetId
          return (
            <button
              key={a.id}
              className={`invest-row${selected ? ' invest-row-selected' : ''}`}
              onClick={() => setAssetId(a.id)}
            >
              <div className="invest-row-head">
                <span className="invest-row-name">
                  {a.icon} {a.label}
                </span>
                <AdviceTag advice={advices?.[a.id]} />
              </div>
              <CandleChart candles={previews?.[a.id] ?? []} mini />
              {news && (
                <div className="market-news">
                  <span>📰</span>
                  <span className="market-news-headline">{news.headline}</span>
                  {news.spin !== 'neutral' && <span className="market-news-spin">{SPIN_LINE[news.spin]}</span>}
                </div>
              )}
            </button>
          )
        })}
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
