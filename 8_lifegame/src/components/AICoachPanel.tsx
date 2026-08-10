import { useEffect, useState } from 'react'
import type { AttributionDimension, CoachOutput, InvestmentResult } from '../core/types'
import { INTRO_TURN_LIMIT } from '../core/types'
import { useGameStore } from '../store'

const DIMENSION_LABEL: Record<AttributionDimension, string> = {
  origin: '出身',
  era: '时代',
  cognition: '认知',
  emotion: '情绪',
}

interface AICoachPanelProps {
  coach: CoachOutput
  investment: InvestmentResult
  turn: number
}

export function AICoachPanel({ coach, investment, turn }: AICoachPanelProps) {
  const finishTurn = useGameStore((s) => s.finishTurn)
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
      <div className="invest-result">
        本回合交易: {investment.pnlAbs >= 0 ? '+' : ''}¥{investment.pnlAbs.toLocaleString()} ({investment.pnlPct}%)
      </div>
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
          <div className="coach-hint">下次试试:{coach.hint}</div>
          <button className="btn btn-primary" onClick={finishTurn}>
            {isLastTurn ? '查看总结 →' : '下一回合 →'}
          </button>
        </>
      )}
    </div>
  )
}
