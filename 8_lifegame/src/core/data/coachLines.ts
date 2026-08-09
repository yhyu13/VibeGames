import type { AttributionDimension, DiceTier } from '../types'

// 班主任型 persona only (this scope's origin is town_exam_kid). Scripted, not a live LLM call —
// see TDD.md §2 / GDD.md §2 decision D3. Voice: strict but warm, concrete, Socratic per source doc §5.5.
const LINES: Record<DiceTier, Record<AttributionDimension, string>> = {
  big_fail: {
    origin: '这把摔得有点狠。别急着怪自己 —— 你起手就比别人少两成运气,这是出身的账,不是你能力的账。但摔了就要记:兜里没钱的时候,别碰风险最高的格子。',
    era: '这个时代你还没摸透规律,摔跟头很正常。18 年那波很多人也是这么摔的 —— 陌生的牌桌,先看别人打两轮。',
    cognition: '这把摔在认知上 —— 你还没读懂这张地图在告诉你什么。回去把图书馆格子走透,认知不够的时候,风险越高摔得越惨。',
    emotion: '我看你这次是情绪上头了。心态不稳的时候骰子也跟着抖 —— 先把心态拉回 60 以上,再上牌桌。',
  },
  fail: {
    origin: '原地不动,别灰心。这就是出身差的常态 —— 努力了但没见着水花,这不是你的错,这是起跑线的问题。',
    era: '这个时代对你来说还是生地,原地踏步也算正常发挥。',
    cognition: '认知还没跟上这一步的难度,先别急着往前冲,多学一格再走。',
    emotion: '你今天状态有点飘,原地不动也是骰子在提醒你:先把自己稳住。',
  },
  success: {
    origin: '还行吧 —— 普通人的稳定节奏就是这样,一步一步走,没有惊喜也没有意外,这才是大多数人的真实人生。',
    era: '这个时代你摸得还算顺,稳扎稳打,继续保持。',
    cognition: '认知在稳步爬升,这一步走得踏实,比瞎冲一步更值钱。',
    emotion: '心态稳的时候骰子也稳,你看,这不是巧合。',
  },
  big_success: {
    origin: '今天运气好,前进两格。但记住 —— 这是偶发红利,不是能力证明,别把这次的顺当成常态。',
    era: '这个时代给了你一个红利期,你抓住了。但红利期不常有,下一格可能就没这么顺。',
    cognition: '这一步认知帮你翻了倍 —— 你想明白的东西,正在变成实际的分数。',
    emotion: '状态好的时候连骰子都愿意帮你,但别飘 —— 状态是会掉的。',
  },
  awaken: {
    origin: '我接住了!这一次你真的接住了命运给你的那个球 —— 记住这一刻的感觉,这种机会不常来第二次。',
    era: '你踩准了这个时代的鼓点。不是每个人都能听见,你听见了。',
    cognition: '这是真正的认知跃迁 —— 普通人一辈子可能 0 次,你现在有了一次。别浪费它。',
    emotion: '情绪稳、状态好、骰子给力,三件事撞在一起才有觉醒 —— 这不是运气,这是你把自己调到了对的频道。',
  },
}

export function getCoachLine(tier: DiceTier, dimension: AttributionDimension): string {
  return LINES[tier][dimension]
}
