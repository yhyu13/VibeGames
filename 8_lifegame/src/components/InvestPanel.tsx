import { useMemo, useState } from 'react'
import type { AssetRisk, Candle, InvestAdvice } from '../core/types'
import { ASSETS } from '../core/data/assets'
import { COGNITION_INFO_THRESHOLD } from '../core/constants'
import { frameCandlesFor, infoQuality, priceAt, unrealizedPnl, type ChartFrame } from '../core/simulation/invest'
import { useGameStore } from '../store'

const FRAME_LABEL: Record<ChartFrame, string> = {
  day: '日K',
  week: '周K',
  month: '月K',
  halfYear: '半年K',
  year: '年K',
}

const QUALITY_LABEL = { rational: '理性', pessimistic: '情绪化', overconfident: '亢奋' } as const
const QUALITY_FLAVOR = {
  rational: '你看到的是真实走势。',
  pessimistic: '情绪低落 —— 你看到的前景可能比实际更糟。',
  overconfident: '心态亢奋 —— 你看到的前景可能被自己美化。',
} as const

const SPIN_LINE = {
  bearish: '但你总往坏处想 —— 再好的消息你也读出利空。',
  bullish: '但你只觉得要起飞 —— 再平的消息你也读出利好。',
} as const

const ADVICE_CLASS = { 适宜投资: 'advice-go', 谨慎参与: 'advice-care', 不适宜投资: 'advice-no', 看不懂: 'advice-blind' } as const
const RISK_LABEL: Record<AssetRisk, string> = {
  cash: '现金管理',
  low: '低风险',
  medium: '中风险',
  high: '高风险',
}

function AdviceTag({ advice, cognition, reviewCredits }: { advice: InvestAdvice | undefined; cognition: number; reviewCredits: number }) {
  if (!advice) return null
  if (advice.band === 'blind') {
    const noSkill = cognition < COGNITION_INFO_THRESHOLD
    return (
      <span
        className="advice-tag advice-blind"
        title={noSkill ? '认知 ≥60 才会复盘 —— 先去图书馆/公开课涨认知' : '完成一笔交易并复盘后,建议才会出现'}
      >
        {noSkill ? '不会复盘 · 看不懂' : '未复盘 · 看不懂'}
      </span>
    )
  }
  const confidence = advice.band === 'sharp' ? '精准' : advice.band === 'clear' ? '较准' : '模糊'
  return (
    <span className={`advice-tag ${ADVICE_CLASS[advice.label]}`} title={`已复盘 ${reviewCredits} 笔交易 · 建议${confidence}`}>
      建议:{advice.label}
    </span>
  )
}

function CandleChart({ candles }: { candles: Candle[] }) {
  if (candles.length === 0) {
    return <div className="candle-empty candle-empty-mini">尚无历史盘面</div>
  }
  const width = 320
  const height = 38
  const padding = 4
  const max = Math.max(...candles.map((candle) => candle.high))
  const min = Math.min(...candles.map((candle) => candle.low))
  const span = max - min || 1
  const y = (value: number) => height - padding - ((value - min) / span) * (height - 2 * padding)
  const candleWidth = width / candles.length

  return (
    <svg className="candle-chart candle-chart-mini" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="K 线走势(历史)">
      {candles.map((candle, index) => {
        const up = candle.close >= candle.open
        const centerX = index * candleWidth + candleWidth / 2
        const bodyTop = y(Math.max(candle.open, candle.close))
        const bodyHeight = Math.max(1.5, Math.abs(y(candle.open) - y(candle.close)))
        return (
          <g key={index} className={up ? 'candle-up' : 'candle-down'}>
            <line x1={centerX} x2={centerX} y1={y(candle.high)} y2={y(candle.low)} strokeWidth={1.5} />
            <rect x={centerX - candleWidth * 0.28} width={candleWidth * 0.56} y={bodyTop} height={bodyHeight} rx={1} />
          </g>
        )
      })}
    </svg>
  )
}

export function InvestPanel() {
  const invest = useGameStore((store) => store.invest)
  const player = useGameStore((store) => store.state.player)
  const paper = useGameStore((store) => store.state.paper)
  const shockPct = useGameStore((store) => store.state.shockPct)
  const previews = useGameStore((store) => store.state.pendingAssetPreviews)
  const newsMap = useGameStore((store) => store.state.pendingMarketNews)
  const advices = useGameStore((store) => store.state.pendingMarketAdvices)
  const reviewCredits = useGameStore((store) => store.state.reviewCredits)
  const [assetId, setAssetId] = useState(ASSETS[0]!.id)
  const [side, setSide] = useState<'buy' | 'sell' | 'hold'>('buy')
  const [amountPct, setAmountPct] = useState(100)
  const [frame, setFrame] = useState<ChartFrame>('week')

  const selectedAsset = ASSETS.find((asset) => asset.id === assetId) ?? ASSETS[0]!
  const turn = player.turn
  const info = infoQuality(player)
  const reviewUnlocked = player.cognition >= COGNITION_INFO_THRESHOLD

  const prices = useMemo(() => {
    const out: Record<string, number> = {}
    const prev: Record<string, number> = {}
    for (const asset of ASSETS) {
      out[asset.id] = priceAt(asset, turn)
      prev[asset.id] = priceAt(asset, Math.max(0, turn - 1))
    }
    return { out, prev }
  }, [turn])

  // v2.4: per-frame candles — 周K = the mood-distorted weekly preview; 日K/月/半年/年 derive
  // from it (day uses the raw deterministic daily tape; coarse frames aggregate the weekly).
  const candleMap = useMemo(() => {
    const out: Record<string, Candle[]> = {}
    for (const asset of ASSETS) {
      out[asset.id] = frameCandlesFor(asset, turn, frame, previews?.[asset.id] ?? [])
    }
    return out
  }, [turn, frame, previews])

  const position = paper.positions[assetId]
  const available = side === 'buy' ? paper.cash : (position?.units ?? 0) * prices.out[assetId]!
  const amount = Math.max(0, (available * amountPct) / 100)
  const units = amount > 0 ? amount / prices.out[assetId]! : 0
  const floatPnl = unrealizedPnl(paper, prices.out)
  const nextAdviceMilestone = reviewCredits === 0
    ? '完成首笔买入/卖出 → 解锁模糊建议'
    : reviewCredits === 1
      ? '再复盘 1 笔 → 建议较准'
      : reviewCredits === 2
        ? '再复盘 1 笔 → 建议精准'
        : '精准建议已解锁'

  const selectAsset = (nextAssetId: string) => {
    setAssetId(nextAssetId)
    if (side === 'sell' && !paper.positions[nextAssetId]) setSide('buy')
  }

  return (
    <div className="panel invest-panel">
      <div className="paper-account-bar">
        <div className="paper-account-title">
          💼 模拟盘
          <span className="paper-initial">初始资金 ¥{paper.initialCapital.toLocaleString()}</span>
        </div>
        <div className="paper-account-nums">
          <span>总资产 <b>¥{Math.round(Object.entries(paper.positions).reduce((s, [id, p]) => (p ? s + p.units * (prices.out[id] ?? 0) : s), paper.cash)).toLocaleString()}</b></span>
          <span>可用 ¥{Math.round(paper.cash).toLocaleString()}</span>
          <span className={floatPnl >= 0 ? 'pnl-up' : 'pnl-down'}>
            浮动盈亏 {floatPnl >= 0 ? '+' : ''}¥{Math.round(floatPnl).toLocaleString()}
          </span>
        </div>
      </div>
      <div className={`review-skill-status ${reviewUnlocked ? 'review-skill-unlocked' : 'review-skill-locked'}`}>
        <div className="review-skill-head">
          <strong>复盘能力 · 认知达到 {COGNITION_INFO_THRESHOLD} 解锁</strong>
          <span>{reviewUnlocked ? '已解锁' : `未解锁 · 当前 ${Math.round(player.cognition)}/${COGNITION_INFO_THRESHOLD}`}</span>
        </div>
        <div className="review-skill-track" aria-hidden>
          <span style={{ width: `${Math.max(0, Math.min(100, (player.cognition / COGNITION_INFO_THRESHOLD) * 100))}%` }} />
        </div>
        <div className="review-skill-hint">
          {reviewUnlocked
            ? `一笔买入/卖出才会计入复盘 · 已复盘 ${reviewCredits} 笔 · ${nextAdviceMilestone}`
            // v2.6 被本能使唤: the poor student's first instinct is all-in — the panel says
            // it out loud before the market does.
            : '先提高认知;达到阈值后,用真实买卖积累复盘。在这之前,你的手比你的脑快——追涨、杀跌、满仓,初学者的钱都是这么亏的。'}
        </div>
      </div>
      <div className={`info-badge info-${info.quality}`} title={QUALITY_FLAVOR[info.quality]}>
        信息状态:{QUALITY_LABEL[info.quality]}{info.narrowed ? ' · 认知收窄了失真' : ''}
      </div>

      <div className="chart-frame-tabs" role="group" aria-label="K线周期">
        {(Object.keys(FRAME_LABEL) as ChartFrame[]).map((f) => (
          <button
            key={f}
            className={`chart-frame-button${frame === f ? ' chart-frame-active' : ''}`}
            onClick={() => setFrame(f)}
          >
            {FRAME_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="trade-mode-tabs" role="group" aria-label="交易方向">
        {(['buy', 'sell', 'hold'] as const).map((mode) => (
          <button
            key={mode}
            className={`trade-mode-button${side === mode ? ' trade-mode-active' : ''}${mode === 'sell' && !position ? ' trade-mode-disabled' : ''}`}
            aria-disabled={mode === 'sell' && !position}
            onClick={() => {
              if (mode === 'sell' && !position) return
              setSide(mode)
              setAmountPct(100)
            }}
          >
            {mode === 'buy' ? '买入' : mode === 'sell' ? '卖出' : '不操作 · 持有'}
          </button>
        ))}
      </div>

      <div className="invest-rows">
        {ASSETS.map((asset) => {
          const news = newsMap?.[asset.id]
          const price = prices.out[asset.id]!
          const change = prices.prev[asset.id] ? ((price - prices.prev[asset.id]!) / prices.prev[asset.id]!) * 100 : 0
          const shock = shockPct[asset.id]
          const selected = asset.id === assetId
          const held = paper.positions[asset.id]
          return (
            <button
              key={asset.id}
              className={`invest-row${selected ? ' invest-row-selected' : ''}`}
              onClick={() => selectAsset(asset.id)}
            >
              <div className="invest-row-head">
                <span className="invest-row-name">{asset.icon} {asset.label}</span>
                <span className={`risk-chip risk-${asset.risk}`}>{RISK_LABEL[asset.risk]}</span>
                <span className={`invest-quote pnl-${change >= 0 ? 'up' : 'down'}`}>
                  ¥{price.toLocaleString(undefined, { minimumFractionDigits: asset.decimals, maximumFractionDigits: asset.decimals })}
                  <i>{change >= 0 ? '+' : ''}{change.toFixed(2)}%</i>
                </span>
                {held && <span className="hold-chip">持仓 {held.units.toLocaleString(undefined, { maximumFractionDigits: asset.decimals })}</span>}
                {shock !== undefined && (
                  <span className={`shock-chip ${shock >= 0 ? 'shock-up' : 'shock-down'}`}>
                    ⚡异动 {shock >= 0 ? '+' : ''}{shock}%
                  </span>
                )}
                <AdviceTag advice={advices?.[asset.id]} cognition={player.cognition} reviewCredits={reviewCredits} />
              </div>
              <div className="invest-row-market">
                <CandleChart candles={candleMap[asset.id] ?? []} />
                {news && (
                  <div className="market-news">
                    <span>📰</span>
                    <span className="market-news-headline">{news.headline}</span>
                    {news.spin !== 'neutral' && <span className="market-news-spin">{SPIN_LINE[news.spin]}</span>}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="order-controls">
        <label className="invest-slider-label">
          委托金额 {side === 'sell' ? `(持仓市值 ¥${Math.round(available).toLocaleString()})` : `(可用 ¥${Math.round(paper.cash).toLocaleString()})`} {Math.round(amount).toLocaleString()} 元
          <input
            type="range"
            min={1}
            max={100}
            value={amountPct}
            disabled={available <= 0}
            onChange={(event) => setAmountPct(Number(event.target.value))}
          />
        </label>
        <div className="quick-pct-buttons">
          {[25, 50, 75, 100].map((pct) => (
            <button key={pct} className={`quick-pct-button${amountPct === pct ? ' quick-pct-active' : ''}`} onClick={() => setAmountPct(pct)}>
              {pct}%
            </button>
          ))}
        </div>
        {side !== 'hold' && (
          <div className="order-preview">
            {side === 'buy' ? '买入' : '卖出'} {selectedAsset.label} · ¥{Math.round(amount).toLocaleString()} ≈ {units.toLocaleString(undefined, { maximumFractionDigits: selectedAsset.decimals })} 份 @ ¥{prices.out[assetId]!.toLocaleString()}
            {amount > 0 && <span className="order-fee">含手续费 ¥{(amount * 0.0003).toFixed(2)}</span>}
          </div>
        )}
      </div>

      <div className="invest-actions">
        <button className="btn btn-secondary no-invest-button" onClick={() => invest(assetId, 'hold', 0)}>
          不操作,继续持有
        </button>
        <button
          className="btn btn-primary"
          disabled={side !== 'hold' && amount <= 0}
          onClick={() => invest(assetId, side, side === 'hold' ? 0 : amount)}
        >
          {side === 'hold'
            ? '确认 · 本周不操作'
            : `确认${side === 'buy' ? '买入' : '卖出'} ${selectedAsset.label} ¥${Math.round(amount).toLocaleString()}`}
        </button>
      </div>

      {Object.keys(paper.positions).length > 0 && (
        <div className="holdings">
          <div className="holdings-heading">当前持仓</div>
          {Object.entries(paper.positions).map(([id, pos]) => {
            if (!pos) return null
            const asset = ASSETS.find((a) => a.id === id)
            if (!asset) return null
            const price = prices.out[id]!
            const value = pos.units * price
            const pnl = value - pos.costBasis
            return (
              <div key={id} className="holding-row">
                <span className="holding-name">{asset.icon} {asset.label}</span>
                <span className="holding-units">{pos.units.toLocaleString(undefined, { maximumFractionDigits: asset.decimals })} 份</span>
                <span className="holding-value">市值 ¥{Math.round(value).toLocaleString()}</span>
                <span className={`holding-pnl ${pnl >= 0 ? 'pnl-up' : 'pnl-down'}`}>
                  {pnl >= 0 ? '+' : ''}¥{Math.round(pnl).toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
