import { useMemo, useState } from 'react'
import type { AssetRisk, Candle, DraftOrder, InvestAdvice, StrategyId } from '../core/types'
import { ASSETS } from '../core/data/assets'
import { COGNITION_INFO_THRESHOLD, TRADING_RULES } from '../core/constants'
import { frameCandlesFor, infoQuality, marketTemperatureFor, maTimingSignalFor, maTimingUnlockedFor, priceAt, unrealizedPnl, type ChartFrame } from '../core/simulation/invest'
import { useGameStore } from '../store'
import { TradingHelpPanel, ASSET_DISTINCTION } from './TradingHelpPanel'
import { formatYuan } from './format'

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
  const seenHints = useGameStore((store) => store.state.seenHints)
  const markHintSeen = useGameStore((store) => store.markHintSeen)
  const unlockedAssets = useGameStore((store) => store.state.unlockedAssets)
  const tradingRealism = useGameStore((store) => store.state.tradingRealism)
  const setTradingRealism = useGameStore((store) => store.setTradingRealism)
  const [assetId, setAssetId] = useState(ASSETS[0]!.id)
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [amountPct, setAmountPct] = useState(100)
  // v3.1 (Ch09): 当前委托的策略 — buy_hold (默认) / ma_timing (均线择时, 真实档+认知≥60).
  const [strategy, setStrategy] = useState<StrategyId>('buy_hold')
  // v2.11: the draft basket — one order per asset (key = assetId). Submitting an empty basket
  // is the "hold" (不操作) path. React-local: it resets on unmount (invest → results).
  const [basket, setBasket] = useState<Record<string, { side: 'buy' | 'sell'; amount: number; strategy: StrategyId }>>({})
  const [frame, setFrame] = useState<ChartFrame>('week')
  const [showHelp, setShowHelp] = useState(false)

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

  // v2.7: 市场温度 (确定性派生, 随本周 tick 变化) + 属性卡规则 + 渐进提示.
  const temperature = useMemo(() => marketTemperatureFor(ASSETS, turn), [turn])
  const selectedRules = TRADING_RULES[selectedAsset.id]
  // v3.1 (Ch09): 真实度 (新手=免佣免T+1免策略 / 真实=全规则) + 分品种费率 + 均线择时门.
  const isReal = tradingRealism === 'real'
  const selectedFeeRate = isReal ? (selectedRules?.feeRate ?? 0) : 0
  const timingUnlocked = isReal && maTimingUnlockedFor(player.cognition)
  const selectedSignal = maTimingSignalFor(assetId, turn)
  const toggleRealism = (next: 'novice' | 'real') => {
    setTradingRealism(next)
    if (next === 'novice') {
      setStrategy('buy_hold') // 新手档无策略 — 回到买入持有
      // 新手档无均线择时: 清掉篮里已存的择时委托, 避免残留 ⚡择时 徽标却按买入持有成交.
      setBasket((prev) => Object.fromEntries(Object.entries(prev).map(([id, d]) => [id, { ...d, strategy: 'buy_hold' as StrategyId }])))
    }
  }
  const hint = useMemo(() => {
    if (isReal && !seenHints.includes('hint-t1') && side === 'sell' && selectedRules?.tPlus1 === true && position) {
      return { id: 'hint-t1', text: `${selectedAsset.label} 是 ${selectedRules.market} · T+1 —— 今天买的明天才能卖。` }
    }
    if (!seenHints.includes('hint-btc') && selectedAsset.id === 'btc' && position) {
      return { id: 'hint-btc', text: 'BTC 无涨跌停、无 T+1 —— 高波动,一天能腰斩,别满仓。' }
    }
    if (!seenHints.includes('hint-temp') && temperature.regime !== 'warm') {
      return {
        id: 'hint-temp',
        text: temperature.regime === 'hot' ? '市场亢奋 —— 别人贪婪时,你要冷静。' : '市场低迷 —— 别人恐惧时,机会也可能在暗处。',
      }
    }
    return null
  }, [seenHints, side, selectedRules, position, selectedAsset.id, temperature.regime])

  const selectAsset = (nextAssetId: string) => {
    setAssetId(nextAssetId)
    if (side === 'sell' && !paper.positions[nextAssetId]) setSide('buy')
  }

  // v2.11: 委托篮 — add/remove drafts; confirm submits the whole basket (empty basket = hold).
  // Display order = canonical product order (matches resolveOrders execution), so the shown
  // sequence is exactly the fill sequence when cash runs short.
  const basketEntries = Object.entries(basket).sort(
    ([a], [b]) => ASSETS.findIndex((x) => x.id === a) - ASSETS.findIndex((x) => x.id === b),
  )
  const draftBuyTotal = basketEntries.reduce((sum, [, d]) => (d.side === 'buy' ? sum + d.amount : sum), 0)
  const overAllocated = draftBuyTotal > paper.cash + 0.5
  const inBasket = basket[assetId] !== undefined

  const addDraft = () => {
    if (amount <= 0) return
    // v3.1: 均线择时只对买入生效; 卖出委托强制 buy_hold, 不带择时徽标.
    const draftStrategy: StrategyId = side === 'sell' ? 'buy_hold' : strategy
    setBasket((prev) => ({ ...prev, [assetId]: { side, amount, strategy: draftStrategy } }))
  }
  const removeDraft = (draftAssetId: string) => {
    setBasket((prev) => {
      const next = { ...prev }
      delete next[draftAssetId]
      return next
    })
  }
  const clearBasket = () => setBasket({})
  const confirmOrders = () => {
    const orders: DraftOrder[] = basketEntries.map(([id, d]) => ({ assetId: id, side: d.side, amount: d.amount, strategy: d.strategy }))
    invest(orders)
  }

  return (
    <div className="panel invest-panel">
      <div className="paper-account-bar">
        <div className="paper-account-title">
          <span aria-hidden>💼</span> 模拟盘
          <span className="paper-initial">初始资金 ¥{paper.initialCapital.toLocaleString()}</span>
          {/* v3.1 (Ch09): 真实度自选 — 新手档免佣免T+1免策略(最简单), 真实档全规则. */}
          <div className="realism-toggle" role="group" aria-label="模拟盘真实度">
            {(['novice', 'real'] as const).map((mode) => (
              <button
                key={mode}
                className={`realism-button${tradingRealism === mode ? ' realism-active' : ''}`}
                aria-pressed={tradingRealism === mode}
                title={mode === 'novice' ? '新手模式:免佣金、免 T+1、纯低买高卖 —— 最简单' : '真实模式:分品种佣金 + T+1 + 策略择时 —— 更接近真盘'}
                onClick={() => toggleRealism(mode)}
              >
                {mode === 'novice' ? '新手' : '真实'}
              </button>
            ))}
          </div>
          <button
            className="btn btn-secondary trading-help-toggle"
            aria-expanded={showHelp}
            onClick={() => setShowHelp((v) => !v)}
          >
            ? 规则
          </button>
        </div>
        <div className="paper-account-nums">
          <span>总资产 <b>¥{Math.round(Object.entries(paper.positions).reduce((s, [id, p]) => (p ? s + p.units * (prices.out[id] ?? 0) : s), paper.cash)).toLocaleString()}</b></span>
          <span>可用 ¥{Math.round(paper.cash).toLocaleString()}</span>
          <span className={floatPnl >= 0 ? 'pnl-up' : 'pnl-down'}>
            浮动盈亏 {floatPnl >= 0 ? '+' : ''}{formatYuan(Math.round(floatPnl))}
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

      <div
        className={`market-temp market-temp-${temperature.regime}`}
        title={`本周全市场平均涨跌 ${temperature.avgPct >= 0 ? '+' : ''}${temperature.avgPct.toFixed(2)}%`}
      >
        <span aria-hidden>{temperature.emoji}</span> 市场温度:{temperature.label}
      </div>

      {showHelp && <TradingHelpPanel onClose={() => setShowHelp(false)} />}

      <div className="chart-frame-tabs" role="group" aria-label="K线周期">
        {(Object.keys(FRAME_LABEL) as ChartFrame[]).map((f) => (
          <button
            key={f}
            className={`chart-frame-button${frame === f ? ' chart-frame-active' : ''}`}
            aria-pressed={frame === f}
            onClick={() => setFrame(f)}
          >
            {FRAME_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="trade-mode-tabs" role="group" aria-label="交易方向">
        {(['buy', 'sell'] as const).map((mode) => (
          <button
            key={mode}
            className={`trade-mode-button${side === mode ? ' trade-mode-active' : ''}${mode === 'sell' && !position ? ' trade-mode-disabled' : ''}`}
            aria-pressed={side === mode}
            disabled={mode === 'sell' && !position}
            onClick={() => {
              if (mode === 'sell' && !position) return
              setSide(mode)
              setAmountPct(100)
            }}
          >
            {mode === 'buy' ? '买入' : '卖出'}
          </button>
        ))}
      </div>

      {/* v3.1 (Ch09): 策略层 — 买入持有(持仓跨周) vs 均线择时(当周内开买收卖波段). 真实档+认知≥60 才可选; 只对买入生效. */}
      {isReal && side === 'buy' && (
        <div className="strategy-tabs" role="group" aria-label="交易策略">
          {(['buy_hold', 'ma_timing'] as const).map((s) => {
            const isTiming = s === 'ma_timing'
            const disabled = isTiming && !timingUnlocked
            return (
              <button
                key={s}
                className={`strategy-button${strategy === s ? ' strategy-active' : ''}${disabled ? ' strategy-disabled' : ''}`}
                aria-pressed={strategy === s}
                disabled={disabled}
                title={
                  isTiming
                    ? timingUnlocked
                      ? selectedSignal === 'up'
                        ? `均线择时:当前 ${selectedAsset.label} 趋势上行,当周波段收益放大 ×1.3;若假信号(趋势破)亏损也放大。当周内开买收卖,不持仓跨周。`
                        : `均线择时:当前 ${selectedAsset.label} 趋势下行 —— 均线之下不接刀,会被拦单。等趋势转上再择时。`
                      : `均线择时需认知 ≥ ${COGNITION_INFO_THRESHOLD}(基础课解锁) —— 当前 ${Math.round(player.cognition)}`
                    : '买入持有:买了就拿着,跟随该品种当周涨跌。'
                }
                onClick={() => !disabled && setStrategy(s)}
              >
                {isTiming ? '⚡ 择时' : '持有'}
              </button>
            )
          })}
        </div>
      )}

      <div className="invest-rows">
        {ASSETS.map((asset) => {
          const news = newsMap?.[asset.id]
          const price = prices.out[asset.id]!
          const change = prices.prev[asset.id] ? ((price - prices.prev[asset.id]!) / prices.prev[asset.id]!) * 100 : 0
          const shock = shockPct[asset.id]
          const selected = asset.id === assetId
          const held = paper.positions[asset.id]
          // v2.8: 渐进解锁 — a locked asset renders as a 🔒 teaser (name only, no price/K线/新闻).
          // The 投资引导 beat that named it (导师/损友/骗子) unlocks it before the player can trade.
          if (!unlockedAssets.includes(asset.id)) {
            return (
              <div key={asset.id} className="invest-row invest-row-locked" aria-disabled="true">
                <div className="invest-row-head">
                  <span className="invest-row-name"><span aria-hidden>{asset.icon}</span> {asset.label}</span>
                  <span className="locked-chip">🔒 尚未解锁</span>
                </div>
                <div className="invest-row-locked-hint">还没人教你碰它 —— 三人行必有贵人</div>
              </div>
            )
          }
          return (
            <button
              key={asset.id}
              className={`invest-row${selected ? ' invest-row-selected' : ''}`}
              onClick={() => selectAsset(asset.id)}
            >
              <div className="invest-row-head">
                <span className="invest-row-name"><span aria-hidden>{asset.icon}</span> {asset.label}</span>
                <span className={`risk-chip risk-${asset.risk}`}>{RISK_LABEL[asset.risk]}</span>
                <span className={`invest-quote quote-${change >= 0 ? 'up' : 'down'}`}>
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
                    <span aria-hidden>📰</span>
                    <span className="market-news-headline">{news.headline}</span>
                    {news.spin !== 'neutral' && <span className="market-news-spin">{SPIN_LINE[news.spin]}</span>}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selectedRules && (
        <div className="asset-attribute-card">
          <div className="asset-attribute-title"><span aria-hidden>{selectedAsset.icon}</span> {selectedAsset.label} · 属性卡</div>
          <div className="asset-attribute-grid">
            <span className="asset-attribute-key">所属市场</span>
            <b className="asset-attribute-val">{selectedRules.market}</b>
            <span className="asset-attribute-key">交易规则</span>
            <b className="asset-attribute-val">{selectedRules.tPlus1 && isReal ? 'T+1 · 今买明卖' : 'T+0 · 当日可卖'}</b>
            <span className="asset-attribute-key">涨跌停</span>
            <b className="asset-attribute-val">{selectedRules.priceLimitPct === null ? '无' : `±${selectedRules.priceLimitPct}%`}</b>
            <span className="asset-attribute-key">手续费</span>
            <b className="asset-attribute-val">{isReal ? `${(selectedFeeRate * 100).toFixed(2)}%` : '免佣'}</b>
            <span className="asset-attribute-key">最小单位</span>
            <b className="asset-attribute-val">{selectedRules.minUnits} 份</b>
          </div>
          <div className="asset-attribute-distinction">{ASSET_DISTINCTION[selectedAsset.id] ?? ''}</div>
        </div>
      )}

      <div className="order-controls">
        <label className="invest-slider-label">
          委托金额 {side === 'sell' ? `(持仓市值 ¥${Math.round(available).toLocaleString()})` : `(可用 ¥${Math.round(paper.cash).toLocaleString()})`} ¥{Math.round(amount).toLocaleString()}
          <input
            type="range"
            min={1}
            max={100}
            value={amountPct}
            aria-valuetext={`${amountPct}%`}
            disabled={available <= 0}
            onChange={(event) => setAmountPct(Number(event.target.value))}
          />
        </label>
        <div className="quick-pct-buttons">
          {[25, 50, 75, 100].map((pct) => (
            <button key={pct} aria-pressed={amountPct === pct} className={`quick-pct-button${amountPct === pct ? ' quick-pct-active' : ''}`} onClick={() => setAmountPct(pct)}>
              {pct}%
            </button>
          ))}
        </div>
        <div className="order-preview">
          {side === 'buy' ? '买入' : '卖出'} {selectedAsset.label} · ¥{Math.round(amount).toLocaleString()} ≈ {units.toLocaleString(undefined, { maximumFractionDigits: selectedAsset.decimals })} 份 @ ¥{prices.out[assetId]!.toLocaleString()}
          {amount > 0 && (selectedFeeRate > 0 ? <span className="order-fee">含手续费 ¥{(amount * selectedFeeRate).toFixed(2)}</span> : <span className="order-fee">新手模式 · 免手续费</span>)}
        </div>
        <button className="btn add-draft-button" disabled={amount <= 0} onClick={addDraft}>
          {inBasket ? `更新委托 · ${selectedAsset.label}` : `加入委托 · ${selectedAsset.label}`}
        </button>
      </div>

      {basketEntries.length > 0 && (
        <div className="basket" role="list" aria-label="委托篮">
          <div className="basket-head">
            <span className="basket-heading">委托篮 · 共 {basketEntries.length} 笔</span>
            <button className="basket-clear" onClick={clearBasket}>清空</button>
          </div>
          {overAllocated && (
            <div className="basket-warn">⚠ 买入委托合计超过可用资金，确认后将按产品顺序依次成交，靠后的可能不足额成交。</div>
          )}
          {basketEntries.map(([id, d]) => {
            const asset = ASSETS.find((a) => a.id === id)
            if (!asset) return null
            return (
              <div key={id} className="basket-row" role="listitem">
                <span className="basket-name"><span aria-hidden>{asset.icon}</span> {asset.label}</span>
                <span className={`basket-side ${d.side === 'buy' ? 'basket-side-buy' : 'basket-side-sell'}`}>{d.side === 'buy' ? '买入' : '卖出'}</span>
                <span className="basket-amount">¥{Math.round(d.amount).toLocaleString()}{d.strategy === 'ma_timing' ? <i className="basket-strategy"> · ⚡择时</i> : null}</span>
                <button className="basket-remove" aria-label={`取消 ${asset.label} 委托`} onClick={() => removeDraft(id)}>✕</button>
              </div>
            )
          })}
        </div>
      )}

      {hint && (
        <div className="rule-hint">
          <span className="rule-hint-text">💡 {hint.text}</span>
          <button className="rule-hint-dismiss" onClick={() => markHintSeen(hint.id)}>知道了</button>
        </div>
      )}

      {basketEntries.length === 0 && (
        <div className="two-step-hint" role="note">
          <span aria-hidden>①②</span> 两步走:先「加入委托」提交,再「确认下单」生效 —— 可多次提交,确认前可改/可撤。
        </div>
      )}
      <div className="invest-actions">
        <button className="btn btn-secondary no-invest-button" onClick={() => invest([])}>
          不操作,继续持有
        </button>
        <button
          className="btn btn-primary"
          disabled={basketEntries.length === 0}
          onClick={confirmOrders}
        >
          {basketEntries.length > 0
            ? `确认 ${basketEntries.length} 笔下单`
            : '先加入委托,再确认'}
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
                <span className="holding-name"><span aria-hidden>{asset.icon}</span> {asset.label}</span>
                <span className="holding-units">{pos.units.toLocaleString(undefined, { maximumFractionDigits: asset.decimals })} 份</span>
                <span className="holding-value">市值 ¥{Math.round(value).toLocaleString()}</span>
                <span className={`holding-pnl ${pnl >= 0 ? 'pnl-up' : 'pnl-down'}`}>
                  {pnl >= 0 ? '+' : ''}{formatYuan(Math.round(pnl))}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
