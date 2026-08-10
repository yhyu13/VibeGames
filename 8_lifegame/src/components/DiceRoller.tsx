import { useEffect, useState } from 'react'
import type { DiceRollResult } from '../core/types'
import { useGameStore } from '../store'
import { TIER_LABEL } from './tierLabels'

interface DiceRollerProps {
  dice: DiceRollResult | null
}

export function DiceRoller({ dice }: DiceRollerProps) {
  const roll = useGameStore((s) => s.roll)
  const advanceToEvent = useGameStore((s) => s.advanceToEvent)
  const [face1, setFace1] = useState(1)
  const [face2, setFace2] = useState(1)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (!dice) {
      setSettled(false)
      return
    }
    setSettled(false)
    let frame = 0
    const interval = window.setInterval(() => {
      frame += 1
      setFace1(1 + Math.floor(Math.random() * 6))
      setFace2(1 + Math.floor(Math.random() * 6))
      if (frame >= 8) {
        window.clearInterval(interval)
        setFace1(dice.rolls[0])
        setFace2(dice.rolls[1])
        setSettled(true)
      }
    }, 60)
    return () => window.clearInterval(interval)
  }, [dice])

  if (!dice) {
    return (
      <div className="panel dice-panel">
        <div className="origin-badge">小镇做题家 · 骰子修正 −2</div>
        <button className="btn btn-primary" onClick={roll}>
          🎲 掷骰子
        </button>
      </div>
    )
  }

  return (
    <div className={`panel dice-panel tier-${dice.tier}`}>
      <div className="dice-faces">
        <span className="die">{face1}</span>
        <span className="die">{face2}</span>
      </div>
      {settled && (
        <>
          <div className="dice-formula">
            {face1} + {face2} + ({dice.originMod}) + ({dice.eraMod}) + ({dice.stateMod}) + ({dice.eventMod}) ={' '}
            <strong>{dice.total}</strong>
          </div>
          <div className={`dice-tier tier-text-${dice.tier}`}>{TIER_LABEL[dice.tier]}</div>
          <button className="btn btn-primary" onClick={advanceToEvent}>
            继续 →
          </button>
        </>
      )}
    </div>
  )
}
