import { useEffect, useState } from 'react'
import type { DiceRollResult } from '../core/types'
import { useGameStore } from '../store'
import { TIER_LABEL } from './tierLabels'
import { ORIGIN_DICE_MOD } from '../core/constants'

interface DiceRollerProps {
  dice: DiceRollResult | null
}

// v1.4 §2: the roll needed 带感. The old flat 8×60ms cycle is now a decelerating tumble —
// fast spins that physically slow down (delay ramp below), die 1 locking a beat BEFORE die 2
// (real dice never stop together — the stagger is the anticipation). Pure presentation:
// Math.random() faces are a visual scramble; the seeded result is never touched here.
const ROLL_DELAYS = [30, 35, 40, 50, 65, 80, 100, 130, 170, 220] // ≈0.9s of fast tumble
const DIE1_LOCK_FRAME = 6 // die 1 slams home before die 2

// The tumble wobble slows in sync with the digit ramp (v2.5.2): the CSS `die-tumble` is
// 120ms infinite, but as the roll decelerates we stretch its period from 120ms → 440ms so
// the physical wobble visibly settles alongside the face values (not just the digits).
const rollDur = (f: number) => Math.max(120, Math.min(440, (ROLL_DELAYS[Math.min(f, ROLL_DELAYS.length - 1)] ?? 420) * 2))

const TIER_EFFECT: Record<DiceRollResult['tier'], { glyph: string; label: string }> = {
  big_fail: { glyph: '✕', label: '大失败' },
  fail: { glyph: '!', label: '失败' },
  success: { glyph: '✓', label: '成功' },
  big_success: { glyph: '✦', label: '大成功' },
  awaken: { glyph: '★', label: '高光时刻' },
}

export function DiceRoller({ dice }: DiceRollerProps) {
  const player = useGameStore((s) => s.state.player)
  const roll = useGameStore((s) => s.roll)
  const advanceToEvent = useGameStore((s) => s.advanceToEvent)
  const [face1, setFace1] = useState(1)
  const [face2, setFace2] = useState(1)
  const [locked1, setLocked1] = useState(false)
  const [locked2, setLocked2] = useState(false)
  const [termsShown, setTermsShown] = useState(0)
  const [tickFrame, setTickFrame] = useState(0)

  const settled = locked1 && locked2
  // 6 formula terms, then the "= total" slam as the 7th beat (art doc: 120ms/term type-in)
  const terms = dice
    ? [String(dice.rolls[0]), String(dice.rolls[1]), `(${dice.originMod})`, `(${dice.eraMod})`, `(${dice.stateMod})`, `(${dice.eventMod})`]
    : []

  useEffect(() => {
    if (!dice) {
      setLocked1(false)
      setLocked2(false)
      setTermsShown(0)
      setTickFrame(0)
      return
    }
    setLocked1(false)
    setLocked2(false)
    setTermsShown(0)
    setTickFrame(0)
    let frame = 0
    let timer = 0
    const tick = () => {
      frame += 1
      setTickFrame(frame)
      if (frame < DIE1_LOCK_FRAME) setFace1(1 + Math.floor(Math.random() * 6))
      if (frame < ROLL_DELAYS.length) setFace2(1 + Math.floor(Math.random() * 6))
      if (frame === DIE1_LOCK_FRAME) {
        setFace1(dice.rolls[0])
        setLocked1(true)
      }
      if (frame >= ROLL_DELAYS.length) {
        setFace2(dice.rolls[1])
        setLocked2(true)
        return
      }
      timer = window.setTimeout(tick, ROLL_DELAYS[frame] ?? 420)
    }
    timer = window.setTimeout(tick, ROLL_DELAYS[0]!)
    return () => window.clearTimeout(timer)
  }, [dice])

  useEffect(() => {
    if (!settled || !dice) return
    if (termsShown >= terms.length + 1) return
    const timer = window.setTimeout(() => setTermsShown((n) => n + 1), 120)
    return () => window.clearTimeout(timer)
  }, [settled, termsShown, terms.length, dice])

  if (!dice) {
    return (
      <div className="panel dice-panel">
        <div className="origin-badge">
          {`${player.origin === 'finance_dynasty' ? '金融世家' : '小镇做题家'} · 骰子修正 ${(ORIGIN_DICE_MOD[player.origin] ?? 0) >= 0 ? '+' : '−'}${Math.abs(ORIGIN_DICE_MOD[player.origin] ?? 0)}`}
        </div>
        <button className="btn btn-primary" onClick={roll}>
          🎲 掷骰子
        </button>
      </div>
    )
  }

  const formulaDone = termsShown > terms.length
  return (
    <div className={`panel dice-panel tier-${dice.tier}`}>
      {formulaDone && (
        <div className={`dice-verdict dice-verdict-${dice.tier}`} role="status">
          <span>{TIER_EFFECT[dice.tier].glyph}</span>
          <b>{TIER_EFFECT[dice.tier].label}</b>
          <i className="dice-particle dice-particle-1" />
          <i className="dice-particle dice-particle-2" />
          <i className="dice-particle dice-particle-3" />
          <i className="dice-particle dice-particle-4" />
          <i className="dice-particle dice-particle-5" />
          <i className="dice-particle dice-particle-6" />
        </div>
      )}
      <div className="dice-faces">
        <span className={`die ${locked1 ? 'die-settled' : 'die-rolling'}`} style={locked1 ? undefined : { animationDuration: `${rollDur(tickFrame)}ms` }}>{face1}</span>
        <span className={`die ${locked2 ? 'die-settled' : 'die-rolling'}`} style={locked2 ? undefined : { animationDuration: `${rollDur(tickFrame)}ms` }}>{face2}</span>
      </div>
      {settled && (
        <div className="dice-formula" role="status">
          {terms.slice(0, Math.min(termsShown, terms.length)).map((t, i) => (
            <span key={i} className="dice-term">
              {i > 0 ? ' + ' : ''}
              {t}
            </span>
          ))}
          {formulaDone && (
            <strong className="dice-total"> = {dice.total}</strong>
          )}
        </div>
      )}
      {formulaDone && (
        <>
          <div className={`dice-tier tier-text-${dice.tier}`}>{TIER_LABEL[dice.tier]}</div>
          <button className="btn btn-primary" onClick={advanceToEvent}>
            继续 →
          </button>
        </>
      )}
    </div>
  )
}
