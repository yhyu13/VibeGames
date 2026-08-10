import { useGameStore } from '../store'
import { Board } from './Board'
import { HUD } from './HUD'
import { DiceRoller } from './DiceRoller'
import { EventModal } from './EventModal'
import { InvestPanel } from './InvestPanel'
import { AICoachPanel } from './AICoachPanel'
import { SummaryScreen } from './SummaryScreen'
import { SpecialEventBanner } from './SpecialEventBanner'
import { ParallelFateCard } from './ParallelFateCard'

export function IntroScene() {
  const state = useGameStore((s) => s.state)
  const {
    player,
    altPlayer,
    phase,
    pendingDice,
    pendingEvent,
    pendingEventChoiceId,
    pendingInvestment,
    pendingCoach,
    pendingMicroAwakening,
    pendingAltFate,
    pendingRealEventDelta,
    pendingSpecialEvent,
    finished,
  } = state

  if (finished) {
    return (
      <div className="intro-scene">
        <HUD player={player} microAwakeningToast={false} />
        <div className="summary-stage">
          <SummaryScreen player={player} altPlayer={altPlayer} />
        </div>
      </div>
    )
  }

  const realMentorHit = pendingEventChoiceId === 'mentor_hit' ? true : pendingEventChoiceId === 'mentor_miss' ? false : null

  return (
    <div className="intro-scene">
      <HUD player={player} microAwakeningToast={pendingMicroAwakening} />
      {pendingSpecialEvent && <SpecialEventBanner result={pendingSpecialEvent} />}
      <Board player={player} />
      <div className="context-panel">
        {(phase === 'map' || phase === 'dice') && <DiceRoller dice={pendingDice} />}
        {phase === 'event' && pendingEvent && <EventModal offer={pendingEvent} />}
        {phase === 'invest' && <InvestPanel />}
        {phase === 'coach' && pendingCoach && pendingInvestment && (
          <AICoachPanel coach={pendingCoach} investment={pendingInvestment} turn={player.turn} />
        )}
      </div>
      {phase === 'coach' && pendingDice && pendingAltFate && pendingInvestment && (
        <div className="fate-stage">
          <ParallelFateCard
            dice={pendingDice}
            altFate={pendingAltFate}
            realEventDelta={pendingRealEventDelta}
            realInvestmentPnlAbs={pendingInvestment.pnlAbs}
            realMentorHit={realMentorHit}
          />
        </div>
      )}
    </div>
  )
}
