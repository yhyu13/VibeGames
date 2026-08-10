import type { SpecialEventResult } from '../core/types'

interface SpecialEventBannerProps {
  result: SpecialEventResult
}

export function SpecialEventBanner({ result }: SpecialEventBannerProps) {
  const positive = result.event.wealthPct >= 0
  return (
    <div className={`special-event-banner ${positive ? 'special-event-positive' : 'special-event-negative'}`}>
      <span className="special-event-icon">{result.event.icon}</span>
      <span className="special-event-label">{result.event.label} · 无预兆</span>
      <span className="special-event-amount">
        财富 {positive ? '+' : ''}
        {result.event.wealthPct}% ({positive ? '+' : ''}¥{result.wealthAbs.toLocaleString()})
      </span>
    </div>
  )
}
