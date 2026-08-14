import { ASSETS } from '../core/data/assets'
import { TRADING_RULES, TRADE_FEE_RATE } from '../core/constants'

// v2.7: 新手「?」手册 — the paper-trading rules, written for a 金融新手 who has never traded.
// Read once, but cheap enough to open every turn; the invest panel toggles it inline (no overlay).
// `ASSET_DISTINCTION` is shared with the attribute card so the "怎么跟别的品种不一样" line stays
// a single source of truth (UI content, not part of the frozen Asset contract).

export const ASSET_DISTINCTION: Record<string, string> = {
  money_fund: '最稳,当现金存,几乎不涨也不跌。',
  bond: '比货基多一点收益,波动也低。',
  gold: '避险资产,行情不好时有人躲进黄金。',
  index_fund: '跟着大盘走,分散了单只股票的风险。',
  a_index: 'A股大盘,情绪最极端,有 ±10% 涨跌停。',
  hk_index: '港股大盘,没有涨跌停,一天可以跌到怀疑人生。',
  btc: '数字货币,无涨跌停、24 小时交易,波动最大。',
}

const wanSan = Math.round(TRADE_FEE_RATE * 10000) // 3 → 万三
const pct = (TRADE_FEE_RATE * 100).toFixed(2) // 0.03%

export function TradingHelpPanel({ onClose }: { onClose: () => void }) {
  return (
    <section className="trading-help" aria-label="交易规则手册">
      <div className="trading-help-head">
        <h3 className="trading-help-title">📖 交易规则手册 · 新手必读</h3>
        <button className="btn btn-secondary trading-help-close" onClick={onClose}>收起 ✕</button>
      </div>

      <div className="trading-help-section">
        <h4 className="trading-help-h4">① 佣金</h4>
        <p>每笔成交收 <b>万{wanSan}({pct}%)</b> 佣金,买入卖出双向收取 —— 这是真实的券商成本,不是模拟。</p>
      </div>

      <div className="trading-help-section">
        <h4 className="trading-help-h4">② T+1 与 T+0</h4>
        <p><b>T+1</b>:今天买的,明天才能卖 —— A股 / 港股 / 基金 / 黄金。<b>T+0</b>:当天买当天就能卖 —— 比特币。</p>
      </div>

      <div className="trading-help-section">
        <h4 className="trading-help-h4">③ 涨跌停</h4>
        <p><b>A股</b> 单日最多涨跌 <b>±10%</b>(涨跌停)。港股、基金、黄金、比特币 <b>没有涨跌停</b> —— 跌起来没有地板。</p>
      </div>

      <div className="trading-help-section">
        <h4 className="trading-help-h4">④ 最小交易单位</h4>
        <p>A股/港股真实规则是 1手=100股;本模拟盘按「份」计价,BTC 可以细到 0.0001 份。</p>
      </div>

      <div className="trading-help-section">
        <h4 className="trading-help-h4">⑤ 产品区别</h4>
        <ul className="trading-help-assets">
          {ASSETS.map((asset) => {
            const rules = TRADING_RULES[asset.id]
            return (
              <li key={asset.id} className="trading-help-asset-row">
                <span className="trading-help-asset-name">{asset.icon} {asset.label}</span>
                <span className="trading-help-market">{rules?.market ?? '—'}</span>
                <span className="trading-help-distinction">{ASSET_DISTINCTION[asset.id] ?? ''}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
