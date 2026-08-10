import type { EventOffer, LocationEventKind } from '../core/types'
import { getCellById } from '../core/data/cells'
import { useGameStore } from '../store'

// v1.2 §3: every location event declares its kind — the player learns that the same building
// can hand them an opportunity OR a trap (and the dice tier they just rolled scales it).
const KIND_LABEL: Record<LocationEventKind, string> = {
  opportunity: '机会',
  neutral: '日常',
  trap: '麻烦',
}

interface EventModalProps {
  offer: EventOffer
}

export function EventModal({ offer }: EventModalProps) {
  const chooseEvent = useGameStore((s) => s.chooseEvent)
  // The player has already ARRIVED — the location is their current position (EventOffer
  // deliberately doesn't carry the cell id; spec §7).
  const position = useGameStore((s) => s.state.player.position)
  const cell = getCellById(position)
  const { event } = offer

  return (
    <div className={`panel event-panel event-kind-${event.kind}`}>
      <div className="event-heading">
        <span className="event-icon">{cell.icon}</span> {cell.label} · {event.title}
        <span className={`event-kind-badge event-kind-badge-${event.kind}`}>
          {KIND_LABEL[event.kind]}
        </span>
      </div>
      <p className="event-text">{event.text}</p>
      <div className="event-choices">
        {event.choices.map((choice) => (
          <button key={choice.id} className="btn btn-choice" onClick={() => chooseEvent(choice.id)}>
            <span className="choice-label">{choice.label}</span>
            <span className="choice-description">{choice.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
