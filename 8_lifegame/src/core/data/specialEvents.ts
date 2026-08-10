import type { SpecialEvent } from '../types'

// Ch04 §4.4: "⚡ 特殊事件 (4): 牛市/熊市/政策/黑天鹅, 财富±30%, 心态±20, 无预兆"
// Trigger probability + selection live in Simulation.ts (needs the shared rand()).
export const SPECIAL_EVENTS: SpecialEvent[] = [
  { id: 'bull_market', label: '牛市', icon: '📈', wealthPct: 30, moodDelta: 10 },
  { id: 'bear_market', label: '熊市', icon: '🐻', wealthPct: -20, moodDelta: -10 },
  { id: 'favorable_policy', label: '政策利好', icon: '📜', wealthPct: 15, moodDelta: 5 },
  { id: 'black_swan', label: '黑天鹅', icon: '🦢', wealthPct: -30, moodDelta: -20 },
]

// 20%/turn — frequent enough to matter across an 8-turn run (~1-2 expected), rare enough that
// most turns still read as "your own choices," not just external shocks.
export const SPECIAL_EVENT_TRIGGER_PROB = 0.2
