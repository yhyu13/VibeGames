import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

// v1.2 §1: the ONE center overlay shell. Exactly one beat card is visible at a time; the
// campus world stays as backdrop, dimmed. Enter motion lives in styles.css (.beat-card).
// v2.8 a11y: focus moves into the dialog on open so keyboard users start inside it.
export function BeatOverlay({ children, wide }: { children: ReactNode; wide?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    cardRef.current?.focus()
  }, [])
  return (
    <div className="beat-backdrop">
      <div className={`beat-card${wide ? ' beat-card-wide' : ''}`} role="dialog" aria-modal="true" tabIndex={-1} ref={cardRef}>{children}</div>
    </div>
  )
}
