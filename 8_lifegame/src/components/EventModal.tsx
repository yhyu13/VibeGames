import type { EventOffer } from '../core/types'
import { getCellById } from '../core/data/cells'
import { useGameStore } from '../store'

interface EventModalProps {
  offer: EventOffer
}

export function EventModal({ offer }: EventModalProps) {
  const chooseEvent = useGameStore((s) => s.chooseEvent)
  const cell = getCellById(offer.cellId)

  return (
    <div className="panel event-panel">
      <div className="event-heading">
        <span className="event-icon">{cell.icon}</span> {cell.label}
      </div>
      <div className="event-choices">
        {offer.choices.map((choice) => (
          <button key={choice.id} className="btn btn-choice" onClick={() => chooseEvent(choice.id)}>
            <span className="choice-label">{choice.label}</span>
            <span className="choice-description">{choice.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
