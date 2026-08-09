import { useGameStore } from '../store'
import { Board } from './Board'
import { HUD } from './HUD'
import { DiceRoller } from './DiceRoller'
import { EventModal } from './EventModal'
import { InvestPanel } from './InvestPanel'
import { AICoachPanel } from './AICoachPanel'
import { SummaryScreen } from './SummaryScreen'

export function IntroScene() {
  const state = useGameStore((s) => s.state)
  const { player, phase, pendingDice, pendingEvent, pendingInvestment, pendingCoach, pendingMicroAwakening, finished } =
    state

  if (finished) {
    return (
      <div className="intro-scene">
        <HUD player={player} microAwakeningToast={false} />
        <div className="summary-stage">
          <SummaryScreen player={player} />
        </div>
      </div>
    )
  }

  return (
    <div className="intro-scene">
      <HUD player={player} microAwakeningToast={pendingMicroAwakening} />
      <Board player={player} />
      <div className="context-panel">
        {(phase === 'map' || phase === 'dice') && <DiceRoller dice={pendingDice} />}
        {phase === 'event' && pendingEvent && <EventModal offer={pendingEvent} />}
        {phase === 'invest' && <InvestPanel />}
        {phase === 'coach' && pendingCoach && pendingInvestment && (
          <AICoachPanel coach={pendingCoach} investment={pendingInvestment} turn={player.turn} />
        )}
      </div>
    </div>
  )
}
