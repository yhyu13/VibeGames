import { useEffect, useState } from 'react'
import type { AttributionDimension, CoachOutput, InvestmentResult } from '../core/types'
import { INTRO_TURN_LIMIT } from '../core/types'
import { COGNITION_INFO_THRESHOLD } from '../core/constants'
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
        <div className="invest-result">
          本回合交易: {investment.pnlAbs >= 0 ? '+' : ''}¥{investment.pnlAbs.toLocaleString()} ({investment.pnlPct}%)
        </div>
      ) : (
        <div className="invest-result">开户成功 · 模拟盘自下一回合解锁</div>
      )}
      {/* v1.6 §1: 复盘 — the coach beat reviews the trade. 认知 ≥ 60 turns it into 心得
          (advice gets sharper next turn); below that the trade was just gambling. */}
      {investment && investment.allocationPct > 0 && (
        <div className="review-line">
          {cognition >= COGNITION_INFO_THRESHOLD
            ? `复盘心得 +1(累计 ${reviewCredits + 1})—— 下周的模拟盘建议会更准。`
            : '认知不足,这笔交易没有复盘 —— 建议不会变准。'}
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
            {isLastTurn ? '查看总结 →' : '下一回合 →'}
          </button>
        </>
      )}
    </div>
  )
}
