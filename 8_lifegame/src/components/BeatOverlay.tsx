import { useEffect, useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'

// v1.2 §1: the ONE center overlay shell. Exactly one beat card is visible at a time; the
// campus world stays as backdrop, dimmed. Enter motion lives in styles.css (.beat-card).
// v2.8 a11y: focus moves into the dialog on open so keyboard users start inside it.
// v2.9 a11y: focus trap — aria-modal="true" promises the backdrop is inert, so Tab (and
// Shift+Tab) must cycle within the card instead of leaking into the campus map behind it.
export function BeatOverlay({ children, wide }: { children: ReactNode; wide?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    cardRef.current?.focus()
  }, [])

  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const card = cardRef.current
    if (!card) return
    const focusables = Array.from(
      card.querySelectorAll<HTMLElement>(
        'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ),
    )
    if (focusables.length === 0) {
      e.preventDefault()
      card.focus()
      return
    }
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement
    if (e.shiftKey) {
      if (active === first || !card.contains(active)) {
        e.preventDefault()
        last.focus()
      }
    } else if (active === last || !card.contains(active)) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="beat-backdrop">
      <div
        className={`beat-card${wide ? ' beat-card-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={cardRef}
        onKeyDown={trapFocus}
      >
        {children}
      </div>
    </div>
  )
}
