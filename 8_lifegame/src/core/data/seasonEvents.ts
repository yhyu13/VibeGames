import type { LocationEvent, LoveImpression, PlayerState } from '../types'

export const CHRISTMAS_TURN = 14
export const WINTER_GROWTH_TURN = 15
export const WINTER_REUNION_TURN = 16
export const NEXT_SEMESTER_TURN = 17
export const LOVE_COGNITION_THRESHOLD = 60
export const LOVE_WELLBEING_THRESHOLD = 70

export const CHRISTMAS_EVENT: LocationEvent = {
  id: 'christmas_encounter',
  cellType: 'special',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: [],
  title: '圣诞夜 · 遇见她',
  text: '雪落在校门外的灯串上。你第一次遇见那个后来会成为女友的人。爱情不决定你能否觉醒，但这一刻值得认真对待。',
  choices: [
    {
      id: 'love_be_present',
      label: '认真认识她',
      description: `认知 ≥ ${LOVE_COGNITION_THRESHOLD} 且身心健康 ≥ ${LOVE_WELLBEING_THRESHOLD}，才能自然地留下好印象`,
      delta: {},
      coefficient: null,
      coefficientStats: [],
    },
    {
      id: 'love_talk_dreams',
      label: '聊聊彼此的梦想',
      description: '不炫耀结果，只说你真正想去的远方',
      delta: {},
      coefficient: null,
      coefficientStats: [],
    },
  ],
}

export const WINTER_GROWTH_EVENT: LocationEvent = {
  id: 'winter_growth',
  cellType: 'learn',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: ['cognition', 'stamina', 'mood'],
  title: '寒假 · 回家也不停止生长',
  text: '离开课表以后，你终于有时间把身体、头脑和梦想放回同一张纸上。小镇做题家不只会完成别人给的题，也可以决定自己要解什么题。',
  choices: [
    {
      id: 'winter_build_routine',
      label: '建立自己的寒假节奏',
      description: '认知 +4,体力 +5,心态 +5',
      delta: { cognition: 4, stamina: 5, mood: 5 },
      coefficient: null,
      coefficientStats: [],
    },
  ],
}
export const WINTER_REUNION_EVENT: LocationEvent = {
  id: 'winter_reunion',
  cellType: 'rest',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: ['mood'],
  title: '寒假 · 再见一面',
  text: '回家前，她问你要不要再走一段路。圣诞夜留下的好印象，让这次见面不再只是偶然。',
  choices: [
    {
      id: 'love_keep_walking',
      label: '陪她慢慢走',
      description: '心态 +8 · 爱情继续生长，但不改变觉醒结局',
      delta: { mood: 8 },
      coefficient: null,
      coefficientStats: [],
    },
  ],
}

export const WINTER_REFLECTION_EVENT: LocationEvent = {
  id: 'winter_reflection',
  cellType: 'learn',
  kind: 'neutral',
  weight: 0,
  eventMod: 0,
  scaledStats: ['cognition', 'mood'],
  title: '寒假 · 把梦想写下来',
  text: '没有第二次相遇也不代表故事结束。你把真正想做的事写下来：小镇做题家，也可以有自己的梦想。',
  choices: [
    {
      id: 'love_keep_dreaming',
      label: '继续成为更好的自己',
      description: '认知 +5,心态 +5',
      delta: { cognition: 5, mood: 5 },
      coefficient: null,
      coefficientStats: [],
    },
  ],
}

export const NEXT_SEMESTER_MENTOR_BLOCKED_EVENT: LocationEvent = {
  id: 'next_semester_mentor_blocked',
  cellType: 'mentor',
  kind: 'neutral',
  weight: 0,
  eventMod: 0,
  scaledStats: ['cognition'],
  title: '新学期开学 · 擦肩而过',
  text: '你听说开学有人在找年轻人聊未来，但没有提前发现那间办公室，最终没能找到入口。梦想还在，只是这次没有接上。',
  choices: [
    {
      id: 'mentor_blocked',
      label: '记住这次错过',
      description: '认知 +3 · 下次先主动寻找入口',
      delta: { cognition: 3 },
      coefficient: null,
      coefficientStats: [],
    },
  ],
}

export function wellbeingOf(player: Pick<PlayerState, 'stamina' | 'mood'>): number {
  return Math.round((player.stamina + player.mood) / 2)
}

export function christmasImpressionFor(player: PlayerState): Exclude<LoveImpression, 'none'> {
  return player.cognition >= LOVE_COGNITION_THRESHOLD
    && wellbeingOf(player) >= LOVE_WELLBEING_THRESHOLD
    ? 'good'
    : 'ordinary'
}
