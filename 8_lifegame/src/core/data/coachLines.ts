import type { AttributionDimension, DiceTier, Origin } from '../types'

// 班主任型 persona — scripted, not a live LLM call (see TDD.md §2 / GDD.md §2 decision D3).
// Voice: strict but warm, concrete, Socratic per source doc §5.5. The 出身 (origin) line is
// the only dimension that is origin-aware: town_exam_kid gets the poverty voice, finance_dynasty
// gets a dynasty voice (see DYNASTY_ORIGIN_LINES) — a rich kid can't hear "起手就比别人少两成运气".
const LINES: Record<DiceTier, Record<AttributionDimension, string>> = {
  big_fail: {
    origin: '这把摔得有点狠。别急着怪自己 —— 你起手就比别人少两成运气，这是出身的账，不是你能力的账。但摔了就要记：兜里没钱的时候，别碰风险最高的格子。',
    era: '这个时代你还没摸透规律，摔跟头很正常。上一轮行情很多人也是这么摔的 —— 陌生的牌桌，先看别人打两轮。',
    cognition: '这把摔在认知上 —— 你还没读懂这张地图在告诉你什么。回去把图书馆格子走透，认知不够的时候，风险越高摔得越惨。',
    emotion: '我看你这次是情绪上头了。心态不稳的时候骰子也跟着抖 —— 先把心态拉回 60 以上，再掷骰子。',
  },
  fail: {
    origin: '原地不动，别灰心。这就是出身差的常态 —— 努力了但没见着水花，这不是你的错，这是起跑线的问题。',
    era: '这个时代对你来说还是生地，原地踏步也算正常发挥。',
    cognition: '认知还没跟上这一步的难度，先别急着往前冲，多学一格再走。',
    emotion: '你今天状态有点飘，原地不动也是骰子在提醒你：先把自己稳住。',
  },
  success: {
    origin: '还行吧 —— 普通人的稳定节奏就是这样，一步一步走，没有惊喜也没有意外，这才是大多数人的真实人生。',
    era: '这个时代你摸得还算顺，稳扎稳打，继续保持。',
    cognition: '认知在稳步爬升，这一步走得踏实，比瞎冲一步更值钱。',
    emotion: '心态稳的时候骰子也稳，你看，这不是巧合。',
  },
  big_success: {
    origin: '今天运气好，这一步走得漂亮。但记住 —— 这是偶发红利，不是能力证明，别把这次的顺当成常态。',
    era: '这个时代给了你一个红利期，你抓住了。但红利期不常有，下一格可能就没这么顺。',
    cognition: '这一步认知帮你翻了倍 —— 你想明白的东西，正在变成实际的分数。',
    emotion: '状态好的时候连骰子都愿意帮你，但别飘 —— 状态是会掉的。',
  },
  awaken: {
    origin: '你接住了!这一次你真的接住了命运给你的那个球 —— 记住这一刻的感觉，这种机会不常来第二次。',
    era: '你踩准了这个时代的鼓点。不是每个人都能听见，你听见了。',
    cognition: '认知在这一刻集中爆发 —— 这种发挥不常来，别浪费它。',
    emotion: '情绪稳、状态好、骰子给力，三件事撞在一起才有高光 —— 这不是运气，这是你把自己调到了对的频道。',
  },
}

// v2.8 三人行必有贵人: the 'origin' dimension only — a 金融世家 player born into capital reads
// the town poverty lines above as factually false, so a dynasty voice swaps in for that one
// dimension. (urban_middle / overseas_elite aren't playable this scope and fall back to the
// town voice, which is the honest default.)
const DYNASTY_ORIGIN_LINES: Record<DiceTier, string> = {
  big_fail: '出身给了你更高的起点，但这把还是摔了 —— 牌桌上的运气和家底是两回事。摔了记住：越是底子厚，越不能全仓押自己看不懂的格子。',
  fail: '原地不动，别灰心。你的起点比别人高，但这把没起水花 —— 光靠出身不够，路还是得自己走实。',
  success: '稳稳的一步。出身给你的资源你没浪费，但真正值钱的是这份不冒进的耐心。',
  big_success: '这一步走得漂亮，家底加上判断，红利自然来了。但记住 —— 偶发红利不是能力证明，别把这次的顺当成常态。',
  awaken: '你接住了!这一次你真的接住了命运给你的那个球 —— 记住这一刻的感觉，这种机会不常来第二次。',
}

export function getCoachLine(tier: DiceTier, dimension: AttributionDimension, origin: Origin = 'town_exam_kid'): string {
  if (dimension === 'origin' && origin === 'finance_dynasty') return DYNASTY_ORIGIN_LINES[tier]
  return LINES[tier][dimension]
}

// v1.2 §5 (critique E2): forward-looking "下次试试…" hint per dominant dimension — the coach
// used to only look backward. era is unreachable as dominant this scope (eraMod frozen at 0),
// so only 3 templates exist; getCoachHint falls back to cognition if ever asked for era.
// v2.8: origin-aware for the 出身 hint, same reason as getCoachLine.
const NEXT_TRY_HINT: Record<Exclude<AttributionDimension, 'era'>, string> = {
  cognition: '下次试试…先去图书馆把认知垫高 —— 认知 ≥60 时，你看穿市场噪音的能力会明显变强。',
  origin: '下次试试…出身改不了，但本金少的时候先去食堂/宿舍攒状态，别急着上高风险的牌桌。',
  emotion: '下次试试…先把心态调回 30–60 的理性区间再投资 —— 心态太低落或太亢奋，你看到的信息都是歪的。',
}

const DYNASTY_ORIGIN_HINT = '下次试试…出身改不了，但起点高不代表可以乱下注 —— 先去食堂/宿舍把状态稳住，别急着上高风险的牌桌。'

export function getCoachHint(dimension: AttributionDimension, origin: Origin = 'town_exam_kid'): string {
  if (dimension === 'origin' && origin === 'finance_dynasty') return DYNASTY_ORIGIN_HINT
  return NEXT_TRY_HINT[dimension as Exclude<AttributionDimension, 'era'>] ?? NEXT_TRY_HINT.cognition
}
