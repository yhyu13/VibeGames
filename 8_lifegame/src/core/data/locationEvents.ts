import type { LocationEvent, LocationEventChoice } from '../types'

// v1.2 §3: per-location weighted event tables — opportunity / neutral / trap, drawn once per
// arrival via the seeded turn rand stream (drawLocationEvent in core/simulation/events.ts).
// Weight convention per table: opportunity 2 / neutral 3 / trap 1 (trap ≈ 17%).
// eventMod: traps carry −1 (a bad turn of luck feeds the dice formula), mentor entries +1
// (preserves v1.1's 贵人格子+1 under the destination-event rule, spec §7.2), all others 0.
// Rest stamina bases encode v1.1's reciprocal divisors as fractions (spec §3: 10×0.5=5 etc.).

const library: LocationEvent[] = [
  {
    id: 'lib_notes',
    cellType: 'learn',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['cognition'],
    title: '学长笔记',
    text: '一位学长毕业前把四年的笔记留在了书架夹层里。',
    choices: [
      { id: 'deep_read', label: '认真研读', description: '认知 +12 × 出身系数,体力 −8', delta: { cognition: 12, stamina: -8 }, coefficient: 'learn', coefficientStats: ['cognition'] },
      { id: 'skim', label: '快速浏览', description: '认知 +6 × 出身系数,体力 −3', delta: { cognition: 6, stamina: -3 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'lib_quiet',
    cellType: 'learn',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['cognition'],
    title: '安静自习',
    text: '普通的一天,自习室里只有翻书声。',
    choices: [
      { id: 'self_study', label: '自习刷题', description: '认知 +6 × 出身系数,体力 −3', delta: { cognition: 6, stamina: -3 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'lib_seat_war',
    cellType: 'learn',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['stamina', 'mood'],
    title: '占座大战',
    text: '期末周,你的座位被人用书占了,对方还振振有词。',
    choices: [
      { id: 'argue', label: '争一口气', description: '体力 −10,心态 −5', delta: { stamina: -10, mood: -5 }, coefficient: null, coefficientStats: [] },
      { id: 'yield', label: '忍了,换个位子', description: '体力 −4,心态 −2', delta: { stamina: -4, mood: -2 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

const lecture: LocationEvent[] = [
  {
    id: 'lec_master',
    cellType: 'learn',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['cognition'],
    title: '名师公开课',
    text: '外校名师来讲行业实操,教室挤满了人。',
    choices: [
      { id: 'front_row', label: '前排认真听', description: '认知 +10 × 出身系数,体力 −5', delta: { cognition: 10, stamina: -5 }, coefficient: 'learn', coefficientStats: ['cognition'] },
      { id: 'back_row', label: '后排刷手机', description: '认知 +3 × 出身系数,心态 +2', delta: { cognition: 3, mood: 2 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'lec_routine',
    cellType: 'learn',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['cognition'],
    title: '例行大课',
    text: '照本宣科的一节课,但多少能学到点东西。',
    choices: [
      { id: 'attend', label: '随堂听讲', description: '认知 +5 × 出身系数,体力 −2', delta: { cognition: 5, stamina: -2 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'lec_called_out',
    cellType: 'learn',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['mood', 'stamina'],
    title: '点名答不出',
    text: '老师点名提问,你正好走神,全班都在看你。',
    choices: [
      { id: 'wing_it', label: '硬着头皮答', description: '心态 −8,体力 −3', delta: { mood: -8, stamina: -3 }, coefficient: null, coefficientStats: [] },
      { id: 'fake_sick', label: '装病溜号', description: '心态 −3,体力 −2', delta: { mood: -3, stamina: -2 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

const cafeteria: LocationEvent[] = [
  {
    id: 'caf_tips',
    cellType: 'work',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['wealth'],
    title: '小费翻倍日',
    text: '校庆客流爆满,经理说今天小费翻倍。',
    choices: [
      { id: 'extra_shift', label: '多接一单', description: '生活费 +¥8,000 × 出身系数,体力 −18', delta: { wealth: 8000, stamina: -18 }, coefficient: 'work', coefficientStats: ['wealth'] },
      { id: 'steady_shift', label: '稳定打工', description: '生活费 +¥3,000 × 出身系数,体力 −8', delta: { wealth: 3000, stamina: -8 }, coefficient: 'work', coefficientStats: ['wealth'] },
    ],
  },
  {
    id: 'caf_normal',
    cellType: 'work',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['wealth'],
    title: '普通一班',
    text: '人潮如常,你熟练地打完了这一班。',
    choices: [
      { id: 'routine_shift', label: '例行打工', description: '生活费 +¥3,000 × 出身系数,体力 −8', delta: { wealth: 3000, stamina: -8 }, coefficient: 'work', coefficientStats: ['wealth'] },
    ],
  },
  {
    id: 'caf_spill',
    cellType: 'work',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['wealth', 'mood'],
    title: '打翻餐盘',
    text: '高峰期手一滑,一整托盘的餐盘摔了一地。',
    choices: [
      { id: 'own_it', label: '自认倒霉', description: '生活费 −¥1,500,心态 −5', delta: { wealth: -1500, mood: -5 }, coefficient: null, coefficientStats: [] },
      { id: 'beg_manager', label: '跟经理求情', description: '生活费 −¥800,体力 −5', delta: { wealth: -800, stamina: -5 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

const club: LocationEvent[] = [
  {
    id: 'club_night',
    cellType: 'rest',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['mood', 'stamina'],
    title: '社团之夜',
    text: '社团办了场露天电影,大家坐在草坪上聊天到很晚。',
    choices: [
      { id: 'club_activity', label: '尽情玩一场', description: '心态 +15,体力 +出身恢复÷2', delta: { mood: 15, stamina: 0.5 }, coefficient: 'rest', coefficientStats: ['stamina'] },
    ],
  },
  {
    id: 'club_lounge',
    cellType: 'rest',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['mood', 'stamina'],
    title: '活动室小坐',
    text: '活动室没什么人,你安安静静待了一下午。',
    choices: [
      { id: 'quiet_rest', label: '安静待会儿', description: '心态 +5,体力 +出身恢复', delta: { mood: 5, stamina: 1 }, coefficient: 'rest', coefficientStats: ['stamina'] },
    ],
  },
  {
    id: 'club_drama',
    cellType: 'rest',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['mood', 'stamina'],
    title: '社团矛盾',
    text: '两个部长吵起来了,群里@了所有人站队。',
    choices: [
      { id: 'mediate', label: '出面调解', description: '心态 −10,体力 −5', delta: { mood: -10, stamina: -5 }, coefficient: null, coefficientStats: [] },
      { id: 'lurk', label: '装没看见', description: '心态 −4', delta: { mood: -4 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

// 宿舍: Cell record keeps legacy type 'start', but its events carry cellType 'rest' —
// attribution reads the EVENT's cellType (spec §6), so 宿舍 turns attribute to 情绪.
const dorm: LocationEvent[] = [
  {
    id: 'dorm_roommate',
    cellType: 'rest',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['mood', 'stamina'],
    title: '室友带饭',
    text: '室友带了热腾腾的饭回来,还帮你占了浴室。',
    choices: [
      { id: 'good_sleep', label: '好好睡一觉', description: '心态 +8,体力 +出身恢复×1.2', delta: { mood: 8, stamina: 1.2 }, coefficient: 'rest', coefficientStats: ['stamina'] },
    ],
  },
  {
    id: 'dorm_plain',
    cellType: 'rest',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['stamina', 'mood'],
    title: '平凡一天',
    text: '没课的一天,补了个午觉。',
    choices: [
      { id: 'nap', label: '补个午觉', description: '体力 +出身恢复×0.8,心态 +3', delta: { stamina: 0.8, mood: 3 }, coefficient: 'rest', coefficientStats: ['stamina'] },
    ],
  },
  {
    id: 'dorm_insomnia',
    cellType: 'rest',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['stamina', 'mood'],
    title: '失眠到天亮',
    text: '翻来覆去到凌晨四点,脑子里全是事。',
    choices: [
      { id: 'push_through', label: '硬撑新一天', description: '体力 −12,心态 −6', delta: { stamina: -12, mood: -6 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

// 贵人办公室: NOT weight-drawn. Arrival triggers the v1.1 mentor roll
// (ORIGIN_MENTOR_FREE_HIT_PROB per origin, seeded) and picks hit/miss (spec §3 exception).
// Both entries carry eventMod +1 (preserves v1.1's 贵人+1). Choice ids mentor_hit/mentor_miss
// are load-bearing — mentorHitFromChoiceId decodes them.
// v2.5: 贵人多元化 — the office's persona follows the 方向 chosen at the 职业规划课 beat
// (MENTOR_EVENTS_BY_TRACK). track === null falls back to the generic pair below. The
// mechanics are identical (hit/miss ids, eventMod, trust flag); only the VOICE changes —
// a 券商前辈, an AI 技术前辈, a 厂长 or a 退休教授 each 接住你 differently.
export const MENTOR_EVENTS: { hit: LocationEvent; miss: LocationEvent } = {
  hit: {
    id: 'mentor_hit',
    cellType: 'mentor',
    kind: 'opportunity',
    weight: 0,
    eventMod: 1,
    scaledStats: ['cognition', 'mood'],
    title: '贵人指点',
    text: '免费的贵人接住了你 —— 一顿饭换来半小时真东西。',
    choices: [
      { id: 'mentor_hit', label: '虚心求教', description: '认知 +10,心态 +10', delta: { cognition: 10, mood: 10 }, coefficient: null, coefficientStats: [] },
    ],
  },
  miss: {
    id: 'mentor_miss',
    cellType: 'mentor',
    kind: 'neutral',
    weight: 0,
    eventMod: 1,
    scaledStats: ['cognition'],
    title: '贵人不在',
    text: '办公室没人,你在门口留了张字条。',
    choices: [
      { id: 'mentor_miss', label: '留个联系方式', description: '认知 +2(至少认识了个人)', delta: { cognition: 2 }, coefficient: null, coefficientStats: [] },
    ],
  },
}

interface MentorPersona {
  hit: LocationEvent
  miss: LocationEvent
}

function personaHit(title: string, text: string): LocationEvent {
  return {
    id: 'mentor_hit',
    cellType: 'mentor',
    kind: 'opportunity',
    weight: 0,
    eventMod: 1,
    scaledStats: ['cognition', 'mood'],
    title,
    text,
    choices: [
      { id: 'mentor_hit', label: '虚心求教', description: '认知 +10,心态 +10', delta: { cognition: 10, mood: 10 }, coefficient: null, coefficientStats: [] },
    ],
  }
}

function personaMiss(title: string, text: string): LocationEvent {
  return {
    id: 'mentor_miss',
    cellType: 'mentor',
    kind: 'neutral',
    weight: 0,
    eventMod: 1,
    scaledStats: ['cognition'],
    title,
    text,
    choices: [
      { id: 'mentor_miss', label: '留个联系方式', description: '认知 +2(至少认识了个人)', delta: { cognition: 2 }, coefficient: null, coefficientStats: [] },
    ],
  }
}

// v2.5: 4 personas, one per 方向 — each 贵人 looks like the future they believe in.
export const MENTOR_EVENTS_BY_TRACK: Record<string, MentorPersona> = {
  ai: {
    hit: personaHit(
      '贵人指点 · 码农出身的技术前辈',
      '"2013 年敢选人工智能的人不多。"他把一杯咖啡推过来,"我当年辞职学机器学习的时候,全家都觉得我疯了。你现在做的事,我懂。看懂下一个时代的人,值得接。"',
    ),
    miss: personaMiss(
      '贵人不在 · 技术前辈',
      '办公室的门虚掩着,里面的人在改代码。你站了一会儿,没敢敲门,把名片塞进门缝,心里记下了门牌号。',
    ),
  },
  finance: {
    hit: personaHit(
      '贵人指点 · 券商营业部经理',
      '"金融是显学,但显学不缺人,缺的是懂钱也懂人的。"他晃了晃手里的杯子,"你选这条路我不意外——但你得证明你不只是来分一杯羹的。"',
    ),
    miss: personaMiss(
      '贵人不在 · 营业部经理',
      '预约的时间过了十分钟,经理还在接电话。助理给你倒了杯水:"今天估计没空了,改天再来吧。"你点点头,把名片留在桌上。',
    ),
  },
  industry: {
    hit: personaHit(
      '贵人指点 · 制造业厂长',
      '"都去追风口了,没人愿意把手弄脏。"他搓了搓手上的机油印,"传统行业饿不死也发不了?那是没做对的人说的话。你选这条路,起码实在。"',
    ),
    miss: personaMiss(
      '贵人不在 · 厂长',
      '工厂的会开到了晚上八点。你在门口等到八点半,保安说厂长已经走了,留了句话:"年轻人,下次提前约。"',
    ),
  },
  academia: {
    hit: personaHit(
      '贵人指点 · 退休的经济学教授',
      '"读书这条路,最怕读成了逃避。"老教授从书架上层抽出一本泛黄的笔记,"选读研的人很多,想清楚为什么读的人很少。你来找我,说明你至少在想。"',
    ),
    miss: personaMiss(
      '贵人不在 · 老教授',
      '办公室门上的字条写着"周三下午在".你周三下午来,门锁着。楼下管理员说教授临时去了市图书馆。你把字条塞回信封,改天再来。',
    ),
  },
}

export function mentorEventsFor(track: string | null): { hit: LocationEvent; miss: LocationEvent } {
  const pair = track ? MENTOR_EVENTS_BY_TRACK[track] : undefined
  return pair ?? MENTOR_EVENTS
}

// v2.7: 贵人换向 — after the first 贵人指点 (mentor HIT) a non-AI track earns ONE chance to
// 改押 AI. Injected onto the hit card (NOT part of the module-level MENTOR_EVENTS constant —
// Simulation.arrive shallow-copies the choices to append it, so the frozen tables stay intact).
export const RETRACK_CHOICE: LocationEventChoice = {
  id: 'retrack_ai',
  label: '改押人工智能',
  description: '贵人点破 AI 才是下一波 · 换方向押注 AI,对口信任从此到手',
  delta: { cognition: 10 },
  coefficient: null,
  coefficientStats: [],
}

// v1.7 §1: 健身房 — the 身体 line's home: 回复心智(情绪)and 回体力, the campus's
// state-reset spot (身心健康 feeds the dice stateMod). Rest coefficient on stamina,
// matching the dorm table's parity.
const gym: LocationEvent[] = [
  {
    id: 'gym_train',
    cellType: 'rest',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['stamina', 'mood'],
    title: '流汗的一小时',
    text: '器械区人不多,你完整练完了一套。内啡肽到账,脑子像被清水冲过。',
    choices: [
      { id: 'full_workout', label: '认真练透', description: '心态 +10,体力 +6 × 休息系数', delta: { mood: 10, stamina: 6 }, coefficient: 'rest', coefficientStats: ['stamina'] },
      { id: 'light_workout', label: '出出汗就好', description: '心态 +6,体力 +3', delta: { mood: 6, stamina: 3 }, coefficient: null, coefficientStats: [] },
    ],
  },
  {
    id: 'gym_run',
    cellType: 'rest',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['mood'],
    title: '操场夜跑',
    text: '晚风、跑道、耳机里的歌。跑完,白天的烦心事小了一半。',
    choices: [
      { id: 'night_run', label: '跑五圈', description: '心态 +7,体力 −2', delta: { mood: 7, stamina: -2 }, coefficient: null, coefficientStats: [] },
    ],
  },
  {
    id: 'gym_overtrain',
    cellType: 'rest',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['stamina'],
    title: '练过头了',
    text: '硬拉冲重量,腰闪了一下。教练说至少歇三天。',
    choices: [
      { id: 'push_through', label: '忍忍继续', description: '体力 −10,心态 −4', delta: { stamina: -10, mood: -4 }, coefficient: null, coefficientStats: [] },
      { id: 'rest_up', label: '老实养着', description: '体力 −5', delta: { stamina: -5 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

// v1.7 §2: 对外交流中心 — the 头脑 line's high-risk table: 开拓认知 pays MORE than the
// library (+8~14 vs +5~6) but the trap bites 认知 itself (展示翻车), not just stamina/mood.
// Gated by cognition ≥ EXCHANGE_COGNITION_THRESHOLD (chooseDestination rejects below it).
const exchange: LocationEvent[] = [
  {
    id: 'exc_workshop',
    cellType: 'learn',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['cognition'],
    title: '外教的工作坊',
    text: '来访教授开小班工作坊,全英文,限 20 人。讲的东西和国内市场贴得出奇地近。',
    choices: [
      { id: 'grill_prof', label: '缠着教授问到底', description: '认知 +14 × 出身系数,体力 −5', delta: { cognition: 14, stamina: -5 }, coefficient: 'learn', coefficientStats: ['cognition'] },
      { id: 'take_notes', label: '安静记笔记', description: '认知 +10 × 出身系数,体力 −2', delta: { cognition: 10, stamina: -2 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'exc_mixer',
    cellType: 'learn',
    kind: 'neutral',
    weight: 2,
    eventMod: 0,
    scaledStats: ['cognition', 'mood'],
    title: '留学生联谊会',
    text: '披萨、汽水和七八种口音。聊了一晚上,世界比课本里大。',
    choices: [
      { id: 'mingle', label: '放开聊', description: '认知 +8 × 出身系数,心态 +6', delta: { cognition: 8, mood: 6 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'exc_freeze',
    cellType: 'learn',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['mood', 'cognition'],
    title: '展示翻车',
    text: '轮到你做英文展示,准备了三页的词全忘了,台下安静得可怕。',
    choices: [
      { id: 'stammer_on', label: '硬着头皮讲完', description: '心态 −10,认知 −4', delta: { mood: -10, cognition: -4 }, coefficient: null, coefficientStats: [] },
      { id: 'bolt', label: '借口溜走', description: '心态 −6,认知 −2', delta: { mood: -6, cognition: -2 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

export const LOCATION_EVENTS: Record<string, LocationEvent[]> = {
  start: dorm,
  library,
  cafeteria,
  club,
  lecture,
  gym,
  exchange,
  // mentor office uses MENTOR_EVENTS via the probability roll, not this table
}

// v1.3 §1: the 开户 beat — FORCED on turn 1 regardless of which building the player
// clicked (Simulation.arrive intercepts the draw). Investing is a story unlock, not a
// day-one given. weight 0: never part of any location table. scaledStats []: a story
// beat, not tier-scaled. cellType 'learn' so the coach attributes it to 认知.
// Both choices unlock the sim account — no soft-lock.
export const ACCOUNT_OPENING_EVENT: LocationEvent = {
  id: 'open_account',
  cellType: 'learn',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: [],
  title: '第一次听说股市',
  text: '', // filled per arrival building from ACCOUNT_OPENING_FLAVOR at draw time
  choices: [
    {
      id: 'open_sim',
      label: '开个模拟盘练练',
      description: '认知 +5 × 出身系数 · 解锁模拟盘',
      delta: { cognition: 5 },
      coefficient: 'learn',
      coefficientStats: ['cognition'],
    },
    {
      id: 'open_watch',
      label: '先听听再说',
      description: '心态 +3 · 解锁模拟盘',
      delta: { mood: 3 },
      coefficient: null,
      coefficientStats: [],
    },
  ],
}

// Per-building flavor text for the 开户 beat — the SAME unlock, witnessed from wherever
// the player happened to walk on turn 1 (keyed by cell id; 'start' = 宿舍).
export const ACCOUNT_OPENING_FLAVOR: Record<string, string> = {
  start: '室友躺在床上刷手机,突然坐起来:"你敢信吗,隔壁寝室老王模拟盘一周赚了 20 个点。"',
  library: '书架转角,一本翻旧了的《聪明的投资者》夹着张纸条:"模拟盘第 3 周,终于看懂 K 线了。"',
  cafeteria: '隔壁桌两个男生拍着桌子争论满仓还是空仓,你端着餐盘听了一整顿饭。',
  club: '社团招新摊位上,投资协会的学长把一张模拟盘大赛传单塞进你手里。',
  lecture: '公开课老师放下粉笔:"这节课不讲理论——每个人回去开一个模拟盘,下周交割。"',
  mentor: '贵人的办公室门开着,里面飘出一句话:"先拿模拟盘练。真金白银的事,急什么。"',
}

// v1.4: the 发现贵人 beat — FORCED on the first library visit AFTER the 开户 turn
// (Simulation.arrive intercepts the library draw when !mentorUnlocked). 贵人办公室 is
// outside an ordinary origin's 认知: you literally don't know it exists until you browse
// the library. Same shape as the 开户 beat: weight 0 (never table-drawn), both choices
// unlock, no soft-lock. Unlike 开户 this does NOT skip the invest phase (the account is
// already open by then) — discovery is a normal library turn with a revelation attached.
export const MENTOR_DISCOVERY_EVENT: LocationEvent = {
  id: 'discover_mentor',
  cellType: 'learn',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: ['cognition'],
  title: '海报栏里的发现',
  // v2.6 认知引擎: the discovery beat also plants the 投资宝典 — the guaranteed first half
  // of the cognition-growth story (宝典 + 心理学书 + 爱人接住 → 认知涨得快, per user arc).
  text: '图书馆海报栏,一堆招新传单底下压着张讲座海报:"校友返校分享 —— 一杯咖啡,换半小时真东西。地点:贵人办公室。"你盯着"贵人"两个字看了很久。\n离开前,你在旧书堆里花三块钱淘到一本 1996 年的《投资学入门》。回宿舍连夜翻完,你第一次听说"止损"两个字。',
  choices: [
    {
      id: 'note_address',
      label: '记下地址',
      description: '认知 +8 × 出身系数 · 解锁贵人办公室',
      delta: { cognition: 8 },
      coefficient: 'learn',
      coefficientStats: ['cognition'],
    },
    {
      id: 'ask_librarian',
      label: '向管理员打听',
      description: '认知 +6 × 出身系数,心态 +2 · 解锁贵人办公室',
      delta: { cognition: 6, mood: 2 },
      coefficient: 'learn',
      coefficientStats: ['cognition'],
    },
  ],
}

// v1.6 §2: 选方向 — FORCED on the first 教学楼 visit (Simulation.arrive intercepts; 0 rand
// draws like the other story beats). Hidden line 2's fork: the 对口 choice must be a
// PREDICTION about the future, so the 2013 framing makes 金融 the safe 显学 and AI the
// uncertain bet — the 贵人 (an investor who rode the LAST wave) only trusts people who see
// the NEXT one. Pure fiction + flag: no deltas, no tier scaling. Like 发现贵人 this does
// NOT skip the invest phase.
export const TRACK_CHOICE_EVENT: LocationEvent = {
  id: 'choose_track',
  cellType: 'learn',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: [],
  title: '职业规划课',
  text: '大四的学长学姐回校做分享,讲台上翻来覆去就四个方向。金融的展位人最多 —— 谁都知道那赚钱;传统行业稳稳当当;也有人躲进读研再拖三年。角落里有个牌子几乎没人排队:"人工智能 —— 下一个十年?"主讲人说,这话他讲了五年,信的人不多。',
  choices: [
    { id: 'track_finance', label: '金融', description: '显学,康庄大道 · 所有人都看得见的路', delta: {}, coefficient: null, coefficientStats: [] },
    { id: 'track_industry', label: '传统行业', description: '稳稳当当,饿不死也发不了', delta: {}, coefficient: null, coefficientStats: [] },
    { id: 'track_ai', label: '人工智能', description: '没人看得准 · 你赌的是未来', delta: {}, coefficient: null, coefficientStats: [] },
    { id: 'track_academia', label: '读研深造', description: '再躲三年,学问本身也是路', delta: {}, coefficient: null, coefficientStats: [] },
  ],
}

// v1.7 §1: the 办卡 beat — FORCED on the first 宿舍 visit AFTER 开户 (Simulation.arrive
// intercepts when !gymUnlocked; 0 rand draws like the other story beats). The gym is the
// 身体 line's unlock: you don't think about training until someone drags you. Both choices
// unlock — no soft-lock. Like 发现贵人 this does NOT skip the invest phase.
export const GYM_DISCOVERY_EVENT: LocationEvent = {
  id: 'discover_gym',
  cellType: 'rest',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: [],
  title: '室友的健身卡',
  text: '回到宿舍,室友正往包里塞毛巾:"别躺了,跟我去健身房,学生卡便宜,练完睡得香。"你看了看桌上的书,又看了看他扔过来的运动手环。',
  choices: [
    { id: 'gym_join', label: '一起去,办张卡', description: '心态 +4 · 解锁健身房', delta: { mood: 4 }, coefficient: null, coefficientStats: [] },
    { id: 'gym_dragged', label: '被硬拉着去了', description: '心态 +2,体力 +2 · 解锁健身房', delta: { mood: 2, stamina: 2 }, coefficient: null, coefficientStats: [] },
  ],
}

// v2.8: 渐进投资引导 — three forced beats (投资导师 / 损友 / 骗子) that progressively unlock
// the 7-asset panel. Turn-keyed by Simulation.guidanceEventFor (0 rand draws, like the other
// story beats). 三人行必有贵人: the mentor is anyone you meet on the road — even the bad friend
// and the scammer teach you something the office can't. 觉醒 stays office-only (mentor_hit).
export const MENTOR_GUIDE_EVENT: LocationEvent = {
  id: 'guide_mentor',
  cellType: 'learn',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: ['cognition'],
  title: '投资导师 · 第一课',
  text: '你在投资协会摊位上拦住那位学长——就是模拟盘大赛传单上的主讲人。他摊开讲义:"别一上来就碰股票。先看货币基金和债券,这两个亏不了大钱,是练手的地方。黄金和指数基金,等你懂了波动再碰也不迟。"',
  choices: [
    { id: 'guide_accept', label: '听导师的,从稳的开始', description: '认知 +6 · 解锁 黄金 + 指数基金', delta: { cognition: 6 }, coefficient: null, coefficientStats: [] },
    { id: 'guide_ask', label: '追问一句"为什么"', description: '认知 +8 × 出身系数,体力 −2 · 解锁 黄金 + 指数基金', delta: { cognition: 8, stamina: -2 }, coefficient: 'learn', coefficientStats: ['cognition'] },
  ],
}

export const BAD_FRIEND_EVENT: LocationEvent = {
  id: 'guide_bad_friend',
  cellType: 'rest',
  kind: 'neutral',
  weight: 0,
  eventMod: 0,
  scaledStats: [],
  title: '损友的怂恿',
  text: '室友刷着手机凑过来:"听我一句,A股这两天疯涨,现在不追就晚了!我把下个月生活费都压进去了。"他眼睛发亮,语气却让你心里一紧。',
  choices: [
    { id: 'guide_chase', label: '跟着追一把', description: '心态 +5 · 解锁 A股 + 港股(追高有风险)', delta: { mood: 5 }, coefficient: null, coefficientStats: [] },
    { id: 'guide_hold', label: '稳住,先别追', description: '认知 +4 · 解锁 A股 + 港股', delta: { cognition: 4 }, coefficient: null, coefficientStats: [] },
  ],
}

export const SCAMMER_EVENT: LocationEvent = {
  id: 'guide_scammer',
  cellType: 'learn',
  kind: 'trap',
  weight: 0,
  eventMod: 0,
  scaledStats: ['mood'],
  title: '内幕消息的骗局',
  text: '社团里一个"有路子"的人把你拉到一边,压低声音:"我有 BTC 的内幕,下周必涨。给我转 400 块,带你起飞。"他掌心那枚硬币抛上抛下,像在数你的心跳。',
  choices: [
    { id: 'guide_fall', label: '信他一次', description: '生活费 −¥400,心态 −10 · 解锁 BTC', delta: { wealth: -400, mood: -10 }, coefficient: null, coefficientStats: [] },
    { id: 'guide_see', label: '识破它,转身走', description: '认知 +5 · 解锁 BTC', delta: { cognition: 5 }, coefficient: null, coefficientStats: [] },
  ],
}
