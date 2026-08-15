import type { LocationEvent, LoveImpression, LoveStage, PlayerState } from '../types'
import { LOVE_FIRST_TURN, LOVE_SECOND_TURN, LOVE_THIRD_TURN } from '../constants'

export const CHRISTMAS_TURN = 14
export const WINTER_GROWTH_TURN = 15
export const WINTER_REUNION_TURN = 16
export const NEXT_SEMESTER_TURN = 17
export const LOVE_COGNITION_THRESHOLD = 60
export const LOVE_WELLBEING_THRESHOLD = 70

// v2.5: the love line's SEMESTER beats. 初次相遇 happens on campus (turn 2+), not at
// Christmas — 迎新晚会 is where the story starts, so the love goal can be set at the
// opening card and played toward. All three are forced-injection beats (weight 0, never
// table-drawn) with the same "wait for the next available arrival" semantics as the
// finance-dynasty relationship line; teaching beats outrank them.
export const LOVE_FIRST_EVENT: LocationEvent = {
  id: 'love_first_encounter',
  // v2.5 self-critique: cellType 'rest' (not 'special') so the weekly coach attributes the
  // welcome party to 情绪, not 出身 — a party night reading "你起手就比别人少两成运气" was
  // tonally wrong for a love beat.
  cellType: 'rest',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: [],
  title: '迎新晚会 · 初次相遇',
  text: '晚会散场时，她在门口等人，手里攥着一本翻旧了的诗集。你犹豫了三秒——主动认识一个人，比答对一道题难多了。',
  choices: [
    {
      id: 'love_first_join',
      label: '走过去聊两句',
      description: `心态与认知决定了你会留下怎样的第一印象(认知 ≥ ${LOVE_COGNITION_THRESHOLD} 且身心健康 ≥ ${LOVE_WELLBEING_THRESHOLD} 为佳)`,
      delta: { mood: 2 },
      coefficient: null,
      coefficientStats: [],
    },
    {
      id: 'love_first_quiet',
      label: '默默记住她',
      description: '心态 +1 · 故事可能慢一点开始，但不会消失',
      delta: { mood: 1 },
      coefficient: null,
      coefficientStats: [],
    },
  ],
}

export const LOVE_SECOND_EVENT: LocationEvent = {
  id: 'love_second_meeting',
  cellType: 'learn',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: ['cognition'],
  title: '期中 · 图书馆偶遇',
  // v2.6 认知引擎: 心理学书籍 + 爱人接住情绪 → 认知涨得快 (per user arc). She hands you
  // the book at the library meeting — the same chapter your impulse-buying brain needs.
  text: '期中复习周的图书馆，她坐在你对面的老位子，桌上摊着一本《心理学与生活》。你认出她，她也认出你——两个人都认出了对方的犹豫。',
  choices: [
    {
      id: 'love_second_share',
      label: '把笔记推过去',
      description: '认知 +4，心态 +3 · 她回赠你那本心理学书',
      delta: { cognition: 4, mood: 3 },
      coefficient: null,
      coefficientStats: [],
    },
    {
      id: 'love_second_hint',
      label: '聊几句就走',
      description: '心态 +1 · 保持距离，也保持可能',
      delta: { mood: 1 },
      coefficient: null,
      coefficientStats: [],
    },
  ],
}

export const LOVE_THIRD_EVENT: LocationEvent = {
  id: 'love_third_party',
  cellType: 'rest',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: ['mood'],
  title: '期末 · 跨年夜的邀约',
  text: '期末最后一门考完，她发来消息：“跨年夜，我们系有个露天放映，你来吗？”屏幕的光照在你脸上，你盯着这句话看了很久。',
  choices: [
    {
      id: 'love_third_accept',
      label: '答应她',
      description: '心态 +6 · 故事进入更近的一章',
      delta: { mood: 6 },
      coefficient: null,
      coefficientStats: [],
    },
    {
      id: 'love_third_raincheck',
      label: '这次算了',
      description: '心态 −2 · 有些故事需要更多时间',
      delta: { mood: -2 },
      coefficient: null,
      coefficientStats: [],
    },
  ],
}

// v2.5 injection helper — same "wait for the next available arrival" contract as
// relationshipEventFor: each stage waits at its threshold turn until it actually plays.
export function loveEventFor(turn: number, stage: LoveStage): LocationEvent | null {
  if (stage === 'none' && turn >= LOVE_FIRST_TURN) return LOVE_FIRST_EVENT
  if (stage === 'met' && turn >= LOVE_SECOND_TURN) return LOVE_SECOND_EVENT
  if (stage === 'knowing' && turn >= LOVE_THIRD_TURN) return LOVE_THIRD_EVENT
  return null
}

export function loveStageAfterChoice(stage: LoveStage, choiceId: string): LoveStage {
  if (stage === 'none' && choiceId.startsWith('love_first_')) return 'met'
  if (stage === 'met' && choiceId.startsWith('love_second_')) return 'knowing'
  if (stage === 'knowing' && choiceId.startsWith('love_third_')) {
    return choiceId === 'love_third_accept' ? 'close' : 'knowing'
  }
  return stage
}

export const CHRISTMAS_EVENT: LocationEvent = {
  id: 'christmas_encounter',
  cellType: 'special',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: [],
  title: '圣诞夜 · 灯串下的雪',
  text: '雪落在校门外的灯串上。这一刻值得认真对待——爱情不决定你能否觉醒，但它决定这段旅程里，你身边有没有人。',
  choices: [
    {
      id: 'love_be_present',
      label: '认真对待眼前的人',
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
      description: '认知 +4，体力 +5，心态 +5',
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
  // v2.5 self-critique: stage-neutral text — the reunion also opens for a 'close' semester
  // stage without a good Christmas impression, so it must not credit "圣诞夜的好印象" alone.
  text: '回家前，她问你要不要再走一段路。这个学期你们已经并肩走了很远，这次见面不再只是偶然。',
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
      description: '认知 +5，心态 +5',
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

// v2.5: the winter reunion opens to a semester-nurtured line too — a good Christmas
// impression OR a 'close' semester stage both warrant the second meeting.
export function shouldReunite(loveImpression: LoveImpression, loveStage: LoveStage): boolean {
  return loveImpression === 'good' || loveStage === 'close'
}

// v2.5: love-stage-aware Christmas framing — 初次相遇 vs 重逢.
export function christmasContext(stage: LoveStage): { title: string; text: string } {
  if (stage === 'none') {
    return {
      title: '圣诞夜 · 遇见她',
      text: '雪落在校门外的灯串上。你第一次遇见那个后来会成为你生命里重要的人。爱情不决定你能否觉醒，但这一刻值得认真对待。',
    }
  }
  if (stage === 'met') {
    return {
      title: '圣诞夜 · 灯下再遇',
      // 'met' = ONLY the welcome party played — the library beat (6+) never did, so this
      // must not claim a second meeting (v2.5 self-critique: factual consistency).
      text: '迎新晚会之后，你们一直没有机会好好说话。雪落在灯串上，这一次，你终于鼓起勇气走过去。',
    }
  }
  if (stage === 'knowing') {
    return {
      title: '圣诞夜 · 熟稔的并肩',
      text: '她记得你爱坐的老位子，你记得她读的那本诗集。雪落在灯串上，你们并肩走，谁都没急着说话。',
    }
  }
  return {
    title: '圣诞夜 · 两个人的跨年',
    text: '跨年夜那句“你来吗”之后，你们已经习惯了并肩。雪落在灯串上，你忽然觉得，这个冬天不算冷。',
  }
}
