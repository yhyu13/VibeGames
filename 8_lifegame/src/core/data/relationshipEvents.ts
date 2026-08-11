import type { LocationEvent } from '../types'

export interface RelationshipEffect {
  trustDelta: number
  resolves?: boolean
}

export const RELATIONSHIP_EVENT_TURNS = [3, 7, 11] as const

// v1.9 hidden line ③: 关系不是资产 — finance-dynasty exclusive, sequenced by crisis stage.
export const RELATIONSHIP_EVENTS: Record<number, LocationEvent> = {
  0: {
    id: 'relationship_doubt', cellType: 'rest', kind: 'neutral', weight: 0, eventMod: 0,
    scaledStats: ['mood'], title: '他们喜欢的是谁?',
    text: '聚会散场后,有人笑着问你父亲最近在看什么项目。你忽然分不清:他们记住的是你的名字,还是你的姓氏。',
    choices: [
      { id: 'rel_test', label: '试探他们', description: '心态 −5 · 关系信任 −8', delta: { mood: -5 }, coefficient: null, coefficientStats: [] },
      { id: 'rel_listen', label: '先认真听对方说', description: '认知 +3,心态 +2 · 关系信任 +10', delta: { cognition: 3, mood: 2 }, coefficient: null, coefficientStats: [] },
    ],
  },
  1: {
    id: 'relationship_money', cellType: 'rest', kind: 'trap', weight: 0, eventMod: -1,
    scaledStats: ['mood'], title: '银行卡被推了回来',
    text: '争执后你习惯性订了最贵的餐厅。对方把银行卡推回来:“我想知道你愿不愿意听我说话,不是你能给我多少钱。”',
    choices: [
      { id: 'rel_pay', label: '钱能解决大多数问题', description: '财富 −3000,心态 −8 · 危机加深', delta: { wealth: -3000, mood: -8 }, coefficient: null, coefficientStats: [] },
      { id: 'rel_admit', label: '承认自己不知道怎么表达', description: '认知 +5,心态 +4 · 关系信任 +14', delta: { cognition: 5, mood: 4 }, coefficient: null, coefficientStats: [] },
    ],
  },
  2: {
    id: 'relationship_break', cellType: 'rest', kind: 'trap', weight: 0, eventMod: -1,
    scaledStats: ['mood', 'cognition'], title: '情感危机',
    text: '模拟盘大跌的晚上,你把所有消息设成已读不回。门外的人只说了一句:“你每次害怕失去,就先把别人推开。”',
    choices: [
      { id: 'rel_leave', label: '转身离开', description: '心态 −15 · 封闭关系', delta: { mood: -15 }, coefficient: null, coefficientStats: [] },
      { id: 'rel_truth', label: '坦白亏损和害怕', description: '认知 +8,心态 +10 · 修复关系', delta: { cognition: 8, mood: 10 }, coefficient: null, coefficientStats: [] },
    ],
  },
}

export const RELATIONSHIP_EFFECTS: Record<string, RelationshipEffect> = {
  rel_test: { trustDelta: -8 },
  rel_listen: { trustDelta: 10 },
  rel_pay: { trustDelta: -10 },
  rel_admit: { trustDelta: 14 },
  rel_leave: { trustDelta: -12 },
  rel_truth: { trustDelta: 18, resolves: true },
}

export function relationshipEventFor(turn: number, crisis: number, resolved: boolean): LocationEvent | null {
  if (resolved || crisis >= RELATIONSHIP_EVENT_TURNS.length || turn < RELATIONSHIP_EVENT_TURNS[crisis]!) return null
  return RELATIONSHIP_EVENTS[crisis] ?? null
}

export function applyRelationshipChoice(trust: number, crisis: number, choiceId: string) {
  const effect = RELATIONSHIP_EFFECTS[choiceId]
  if (!effect) return null
  return {
    trust: Math.max(0, Math.min(100, trust + effect.trustDelta)),
    crisis: Math.min(RELATIONSHIP_EVENT_TURNS.length, crisis + 1),
    resolved: effect.resolves === true,
  }
}
