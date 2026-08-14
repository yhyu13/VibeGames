import type { SpecialEventResult, StatDelta } from '../core/types'

interface SpecialEventBannerProps {
  result: SpecialEventResult
}

const DELTA_LABEL: Array<[keyof StatDelta, string]> = [
  ['cognition', '认知'],
  ['stamina', '体力'],
  ['mood', '情绪'],
]

export function SpecialEventBanner({ result }: SpecialEventBannerProps) {
  const deltas = DELTA_LABEL.flatMap(([key, label]) => {
    const value = result.playerDelta[key]
    return value === undefined || value === 0 ? [] : [`${label} ${value > 0 ? '+' : ''}${value}`]
  })
  if (result.wealthAbs !== 0) {
    deltas.unshift(`生活费 ${result.wealthAbs > 0 ? '+' : ''}¥${result.wealthAbs.toLocaleString()}`)
  }
  // v2.5: 贵人好感 is a story gain, not a stat — its own line so the mechanic stays visible.
  if ((result.event.mentorFavor ?? 0) > 0) {
    deltas.push(`👁 贵人好感 +${result.event.mentorFavor}`)
  }

  const totalDirection = Object.values(result.playerDelta).reduce((sum, value) => sum + (value ?? 0), 0)
  const breakthrough = (result.playerDelta.cognition ?? 0) >= 20
    || ((result.playerDelta.stamina ?? 0) + (result.playerDelta.mood ?? 0)) >= 30
  const positive = totalDirection >= 0

  return (
    <div className={`special-event-banner ${positive ? 'special-event-positive' : 'special-event-negative'}${breakthrough ? ' special-event-breakthrough' : ''}`}>
      <span className="special-event-icon">{result.event.icon}</span>
      <div className="special-event-body">
        <span className="special-event-label">
          {breakthrough && <b>跃迁时刻 · </b>}
          {result.event.label}{result.event.unexpected ? ' · 无预兆' : ''}
        </span>
        <span className="special-event-text">{result.event.text}</span>
      </div>
      <span className="special-event-deltas">{deltas.join(' · ') || '世界变了,数值暂未改变'}</span>
    </div>
  )
}
