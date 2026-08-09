// Frozen numeric tables — transcribed verbatim from ch04-ch05.pdf. See ../../TDD.md §4.

export const START_WEALTH = 100_000
export const START_COGNITION = 50
export const START_STAMINA = 60
export const START_MOOD = 60

// This scope only supports origin = 'town_exam_kid'; other rows kept for the frozen contract's completeness.
export const ORIGIN_DICE_MOD: Record<string, number> = {
  town_exam_kid: -2,
  urban_middle: 0,
  overseas_elite: 1,
  finance_dynasty: 2,
}

// Frozen at 0 for the intro scene — Ch01-03 (origin<->home-era mapping) do not exist yet.
// See GDD.md §2 and docs/levels/intro_scene.md §8 (decision D1).
export const ERA_DICE_MOD = 0

export const ORIGIN_LEARN_MULTIPLIER: Record<string, number> = {
  town_exam_kid: 1.3,
  urban_middle: 0.9,
  overseas_elite: 1.0,
  finance_dynasty: 0.9,
}

export const ORIGIN_WORK_MULTIPLIER: Record<string, number> = {
  town_exam_kid: 0.8,
  urban_middle: 1.0,
  overseas_elite: 1.1,
  finance_dynasty: 1.3,
}

export const ORIGIN_REST_RECOVERY: Record<string, number> = {
  town_exam_kid: 10,
  urban_middle: 20,
  overseas_elite: 25,
  finance_dynasty: 30,
}

export const INVEST_ALLOCATION_CAP_PCT = 30

// Gap-teaser reference numbers for the summary screen — transcribed verbatim from ch04-ch05.pdf
// page 11 (Ch05 5.6), mid-level-player 32-round full-game net worth. A 4-turn intro session's own
// compounding is too small to feel dramatic (~0.5% gain) — the teaser instead previews what the full
// game's economics look like, which is the doc's own headline number, not a derived/scaled estimate.
export const TOWN_EXAM_KID_FULL_GAME_WEALTH = 2_085_000
export const FINANCE_DYNASTY_FULL_GAME_WEALTH = 13_300_000
