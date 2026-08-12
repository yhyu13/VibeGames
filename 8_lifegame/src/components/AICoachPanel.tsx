import { useEffect, useState } from 'react'
import type { AttributionDimension, CoachOutput, InvestmentResult } from '../core/types'
import { INTRO_TURN_LIMIT } from '../core/types'
import { COGNITION_INFO_THRESHOLD } from '../core/constants'
import { CHRISTMAS_EVENT, WINTER_REUNION_EVENT } from '../core/data/seasonEvents'
import { useGameStore } from '../store'

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

  useEffect(() => {
    setCharCount(0)
    const interval = window.setInterval(() => {
      setCharCount((c) => {
        if (c >= coach.line.length) {
          window.clearInterval(interval)
          return c
        }
        return c + 1
      })
    }, 18)
    return () => window.clearInterval(interval)
  }, [coach.line])

  const done = charCount >= coach.line.length
  const isLastTurn = turn >= INTRO_TURN_LIMIT

  return (
    <div className="panel coach-panel">
      <div className="coach-persona">🏚️ 班主任</div>
      {investment ? (
        investment.side === 'hold' ? (
          <div className="invest-result invest-result-cash">
            本周不操作 · 继续持有 · 账户 {investment.totalPnlAbs >= 0 ? '+' : ''}¥{investment.totalPnlAbs.toLocaleString()}(总盈亏)
          </div>
        ) : (
          <div className="invest-result">
            {investment.side === 'buy' ? '买入' : '卖出'} {investment.units.toLocaleString()} 份 @ ¥{investment.price.toLocaleString()} · 本周账户{' '}
            {investment.weekPnlAbs >= 0 ? '+' : ''}¥{investment.weekPnlAbs.toLocaleString()} · 总盈亏 {investment.totalPnlAbs >= 0 ? '+' : ''}¥{investment.totalPnlAbs.toLocaleString()}
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
            ? `复盘心得 +1(累计 ${reviewCredits + 1})—— 下周的模拟盘建议会更准。`
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
      <div className="coach-line">{coach.line.slice(0, charCount)}</div>
      {done && (
        <>
          <div className="coach-attribution">
            {(Object.keys(DIMENSION_LABEL) as AttributionDimension[]).map((dim) => (
              <div key={dim} className={`attribution-bar ${dim === coach.dominant ? 'attribution-dominant' : ''}`}>
                <span className="attribution-label">{DIMENSION_LABEL[dim]}</span>
                <span
                  className="attribution-fill"
                  style={{ width: `${dim === coach.dominant ? Math.round(coach.dominantShare * 100) : 15}%` }}
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
