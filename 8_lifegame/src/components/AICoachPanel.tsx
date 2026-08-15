import { useEffect, useState } from 'react'
import type { AttributionDimension, CoachOutput, InvestmentResult } from '../core/types'
import { INTRO_TURN_LIMIT } from '../core/types'
import { COGNITION_INFO_THRESHOLD } from '../core/constants'
import { CHRISTMAS_EVENT, WINTER_REUNION_EVENT } from '../core/data/seasonEvents'
import { useGameStore } from '../store'
import { formatYuan } from './format'

const DIMENSION_LABEL: Record<AttributionDimension, string> = {
  origin: '出身',
  era: '时代',
  cognition: '认知',
  emotion: '情绪',
}

interface AICoachPanelProps {
  coach: CoachOutput
  investment: InvestmentResult | null // v1.3 §1: null on the turn-1 开户 beat (no trade yet)
  turn: number
}

export function AICoachPanel({ coach, investment, turn }: AICoachPanelProps) {
  const finishTurn = useGameStore((s) => s.finishTurn)
  const cognition = useGameStore((s) => s.state.player.cognition)
  const reviewCredits = useGameStore((s) => s.state.reviewCredits)
  const eventId = useGameStore((s) => s.state.pendingEvent?.event.id)
  const loveImpression = useGameStore((s) => s.state.loveImpression)
  const loveReunion = useGameStore((s) => s.state.loveReunion)
  const paperInitial = useGameStore((s) => s.state.paper.initialCapital)
  const [charCount, setCharCount] = useState(0)
  // v2.8 a11y: prefers-reduced-motion skips the typewriter — the full line lands instantly.
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    setCharCount(reducedMotion ? coach.line.length : 0)
  }, [coach.line, reducedMotion])

  // v2.5.2: slower typewriter + punctuation breath. Chinese chars are whole words, so the
  // old 18ms interval read as machine-gun text; 40ms normal with a ~260ms pause after
  // ,。!?;:… punctuation lets each clause land before the attribution + button reveal.
  useEffect(() => {
    if (reducedMotion || charCount >= coach.line.length) return
    const justTyped = charCount > 0 ? coach.line[charCount - 1] : ''
    const delay = /[,，。!！?？;；:：]/.test(justTyped) ? 260 : 40
    const timer = window.setTimeout(() => setCharCount((c) => c + 1), delay)
    return () => window.clearTimeout(timer)
  }, [charCount, coach.line, reducedMotion])

  const done = charCount >= coach.line.length
  const isLastTurn = turn >= INTRO_TURN_LIMIT

  return (
    <div className="panel coach-panel">
      <div className="coach-persona" role="heading" aria-level={2}><span aria-hidden>🧑‍🏫</span> 班主任</div>
      {investment ? (
        investment.side === 'hold' ? (
          <div className="invest-result invest-result-cash">
            本周不操作 · 继续持有 · 模拟盘 {investment.totalPnlAbs >= 0 ? '+' : ''}{formatYuan(investment.totalPnlAbs)} (总盈亏)
          </div>
        ) : (
          <div className="invest-result">
            {investment.side === 'buy' ? '买入' : '卖出'} {investment.units.toLocaleString()} 份 @ ¥{investment.price.toLocaleString()} · 本周模拟盘{' '}
            {investment.weekPnlAbs >= 0 ? '+' : ''}{formatYuan(investment.weekPnlAbs)} · 总盈亏 {investment.totalPnlAbs >= 0 ? '+' : ''}{formatYuan(investment.totalPnlAbs)}
          </div>
        )
      ) : (
        <div className="invest-result">开户成功 · 模拟盘初始资金 ¥{paperInitial.toLocaleString()} · 自下周解锁</div>
      )}
      {/* v1.6 §1: 复盘 — the coach beat reviews the trade. 认知 ≥ 60 turns it into 心得
          (advice gets sharper next turn); below that the trade was just gambling. */}
      {investment && investment.side !== 'hold' && investment.amount > 0 && (
        <div className="review-line">
          {cognition >= COGNITION_INFO_THRESHOLD
            ? `复盘心得 +1 (累计 ${reviewCredits + 1}) —— 下周的模拟盘建议会更准。`
            : '认知不足,这笔交易没有复盘 —— 建议不会变准。'}
        </div>
      )}
      {eventId === CHRISTMAS_EVENT.id && (
        <div className={`love-result love-result-${loveImpression}`}>
          {loveImpression === 'good'
            ? '❤️ 你留下了好印象 · 寒假还有再见一面的可能'
            : '🤍 这是一次普通相遇 · 爱情无关通关，先照顾好头脑与身体'}
        </div>
      )}
      {eventId === WINTER_REUNION_EVENT.id && loveReunion && (
        <div className="love-result love-result-good">
          ❤️ 寒假又见了一面 · 关系开始生长，但不改变觉醒结局
        </div>
      )}
      <div className="coach-line" role="status" aria-live="polite">{coach.line.slice(0, charCount)}</div>
      {done && (
        <>
          <div className="coach-attribution">
            {(Object.keys(DIMENSION_LABEL) as AttributionDimension[]).map((dim, i) => (
              <div key={dim} className={`attribution-bar ${dim === coach.dominant ? 'attribution-dominant' : ''}`}>
                <span className="attribution-label">{DIMENSION_LABEL[dim]}</span>
                <span
                  className="attribution-fill"
                  style={{ width: `${dim === coach.dominant ? Math.round(coach.dominantShare * 100) : 15}%`, animationDelay: `${i * 90}ms` }}
                />
              </div>
            ))}
          </div>
          <div className="coach-hint">{coach.hint}</div>
          <button className="btn btn-primary" onClick={finishTurn}>
            {isLastTurn ? '查看总结 →' : '下一周 →'}
          </button>
        </>
      )}
    </div>
  )
}
