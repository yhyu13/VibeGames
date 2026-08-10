import type { DiceRollResult, DiceTier, ParallelState, PlayerState } from '../types'
import { PARALLEL_FATE_ORIGIN } from '../types'
import { ORIGIN_DICE_MOD, ERA_DICE_MOD } from '../constants'
import { rollD6 } from '../../engine/rng'

// Each threshold stacks independently (not OR) -- this is the only reading under which the
// source doc's own stated range (stateMod: -2~+3) is reachable at all: +1/+1 for stamina/mood
// >=60 (both can apply at once), -1/-1 for stamina/mood <30, +1 more post-awakening. Shared by
// both the real player and the parallel-fate trajectory (same formula, different stat values).
function stateMod(entity: { stamina: number; mood: number; awakened: boolean }): number {
  let mod = 0
  if (entity.stamina >= 60) mod += 1
  if (entity.mood >= 60) mod += 1
  if (entity.stamina < 30) mod -= 1
  if (entity.mood < 30) mod -= 1
  if (entity.awakened) mod += 1
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

// "平行命运" counterfactual — the SAME physical dice (d1, d2) and SAME eventMod (cell-type is
// shared until the two trajectories diverge), resolved through PARALLEL_FATE_ORIGIN's dice
// modifier and the alt trajectory's OWN evolving stamina/mood (so a recovering/depleting alt
// state compounds turn over turn, same as the real player's does).
export function rollAltDice(rolls: [number, number], eventMod: number, altPlayer: ParallelState): { total: number; tier: DiceTier } {
  const originMod = ORIGIN_DICE_MOD[PARALLEL_FATE_ORIGIN] ?? 0
  const total = rolls[0] + rolls[1] + originMod + ERA_DICE_MOD + stateMod(altPlayer) + eventMod
  const { tier } = tierForTotal(total)
  return { total, tier }
}
