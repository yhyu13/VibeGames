import type { DiceRollResult, DiceTier, PlayerState } from '../types'
import { ORIGIN_DICE_MOD, ERA_DICE_MOD } from '../constants'
import { rollD6 } from '../../engine/rng'

function stateMod(player: PlayerState): number {
  let mod = 0
  if (player.stamina >= 60 || player.mood >= 60) mod += 1
  else if (player.stamina < 30 || player.mood < 30) mod -= 1
  if (player.awakened) mod += 1
  return mod
}

function tierForTotal(total: number): { tier: DiceTier; cellsToMove: number } {
  if (total <= 3) return { tier: 'big_fail', cellsToMove: -2 }
  if (total <= 6) return { tier: 'fail', cellsToMove: 0 }
  if (total <= 9) return { tier: 'success', cellsToMove: 1 }
  if (total <= 12) return { tier: 'big_success', cellsToMove: 2 }
  return { tier: 'awaken', cellsToMove: 3 }
}

export function rollDice(player: PlayerState, eventMod: number, rand: () => number): DiceRollResult {
  const d1 = rollD6(rand)
  const d2 = rollD6(rand)
  const originMod = ORIGIN_DICE_MOD[player.origin] ?? 0
  const eraMod = ERA_DICE_MOD
  const sMod = stateMod(player)
  const total = d1 + d2 + originMod + eraMod + sMod + eventMod
  const { tier, cellsToMove } = tierForTotal(total)
  return {
    rolls: [d1, d2],
    originMod,
    eraMod,
    stateMod: sMod,
    eventMod,
    total,
    tier,
    cellsToMove,
  }
}
