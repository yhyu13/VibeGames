import type { ReactNode } from 'react'

// v1.2 §1: the ONE center overlay shell. Exactly one beat card is visible at a time; the
// campus world stays as backdrop, dimmed. Enter motion lives in styles.css (.beat-card).
export function BeatOverlay({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="beat-backdrop">
      <div className={`beat-card${wide ? ' beat-card-wide' : ''}`}>{children}</div>
    </div>
  )
}
