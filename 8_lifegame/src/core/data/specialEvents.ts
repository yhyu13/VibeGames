import type { Origin, SpecialEvent } from '../types'

// v2.1: world-level events sit beside the location table. They fire often enough that a 13-week
// semester can contain several turning points: sometimes ten quiet years are followed by a few
// months of disproportionate progress. Positive breakthroughs coexist with real setbacks.
// v2.3: the pool grows from 11 market/world shocks to 49 themed 小镇 life surprises — friends,
// family/hometown, health, small money, and everyday surprises — all carrying a one-line `text`
// so every shock reads as a story, not a stat change. `unexpected` marks true no-warning shocks
// (market moves, sudden breakdowns) — the banner shows "· 无预兆" only for them; narrative
// daily-life events carry their surprise in the text instead.
// v2.3 balance pass: the original high-impact breakthroughs keep strong weights (6/6/4/4/3) so
// per-trigger odds stay ~7% each (~1.0-1.5 big moments per semester) instead of drowning in the
// larger pool — texture events mostly sit at weight 1-2.

// ── v2.1 core: market shocks + cognition/body breakthroughs ─────────────────────────────
const market: SpecialEvent[] = [
  {
    id: 'bull_market', label: '牛市突然启动', icon: '📈', weight: 2, wealthPct: 30,
    delta: { mood: 10 }, unexpected: true,
    assetShock: { assetId: 'a_index', pct: 4 },
    text: '周一的新闻推送突然热闹起来：央行放水、沪指放量，连食堂阿姨都在聊股票。',
  },
  {
    id: 'bear_market', label: '熊市急跌', icon: '🐻', weight: 2, wealthPct: -20,
    delta: { mood: -10 }, unexpected: true,
    assetShock: { assetId: 'a_index', pct: -5 },
    text: '行情毫无预兆地崩了，你盯着屏幕上的绿色数字，第一次体会什么叫钱会消失。',
  },
  {
    id: 'favorable_policy', label: '政策窗口打开', icon: '📜', weight: 2, wealthPct: 15,
    delta: { mood: 5 }, unexpected: true,
    assetShock: { assetId: 'hk_index', pct: 3 },
    text: '国务院出台新政策，你在推送里刷到标题时手都在抖 —— 机会是给看得懂的人准备的。',
  },
  {
    id: 'black_swan', label: '黑天鹅', icon: '🦢', weight: 1, wealthPct: -30,
    delta: { mood: -20 }, unexpected: true,
    assetShock: { assetId: 'btc', pct: -14 },
    text: '一场谁都没预料到的黑天鹅事件，所有曲线一夜之间面目全非。',
  },
  {
    id: 'knowledge_breakthrough', label: '认知跃迁', icon: '🧠', weight: 6, wealthPct: 0,
    delta: { cognition: 24, mood: 8 }, unexpected: true,
    text: '某个深夜，你突然把过去几周的一堆概念串通了，像打通了任督二脉。',
  },
  {
    id: 'research_obsession', label: '连续三周啃透一个问题', icon: '🔬', weight: 4, wealthPct: 0,
    delta: { cognition: 30, stamina: -12 }, unexpected: false,
    text: '为了一个不知道会不会考的问题，你连续三周啃完了三本参考资料。',
  },
  {
    id: 'world_class_course', label: '偶遇世界级公开课', icon: '🌐', weight: 4, wealthPct: 0,
    delta: { cognition: 20, mood: 12 }, unexpected: true, mentorFavor: 1,
    text: '你在公开课上偶遇一位真正的行业前辈，他讲的每句话都像在开灯。散场时他多看了你一眼：“有意思，有空来我办公室聊聊。”',
  },
  {
    id: 'recovery_streak', label: '作息突然走上正轨', icon: '🌅', weight: 6, wealthPct: 0,
    delta: { stamina: 22, mood: 18 }, unexpected: true,
    text: '早睡、晨跑、按时吃饭，你重新觉得身体是自己的。',
  },
  {
    id: 'team_belonging', label: '找到真正同频的伙伴', icon: '🤝', weight: 3, wealthPct: 0,
    delta: { cognition: 12, stamina: 10, mood: 22 }, unexpected: false,
    text: '你找到了一群真正同频的人，他们不问你考多少分，只问你想做什么。',
  },
  {
    id: 'burnout', label: '透支后的崩溃', icon: '🫥', weight: 1, wealthPct: 0,
    delta: { cognition: -8, stamina: -24, mood: -18 }, unexpected: true,
    text: '长期透支终于还了利息，你在图书馆趴着睡着了，醒来不知道几点。',
  },
  {
    id: 'illness', label: '突发重感冒', icon: '🤒', weight: 1, wealthPct: 0,
    delta: { stamina: -20, mood: -8 }, unexpected: true,
    text: '一场重感冒来得又急又凶，你在宿舍躺了三天。',
  },
]

// ── v2.3 朋友 / 人际 ─────────────────────────────────────────────────────────────
const friends: SpecialEvent[] = [
  {
    id: 'fr_roommate_noodles', label: '室友的深夜泡面', icon: '🍲', weight: 2, wealthPct: 0,
    delta: { mood: 8, stamina: 4 }, unexpected: false,
    text: '室友半夜带回一碗热腾腾的泡面，还顺手帮你把明天要交的作业模板传了过来。',
  },
  {
    id: 'fr_old_classmate', label: '高中同桌的消息', icon: '📱', weight: 2, wealthPct: 0,
    delta: { cognition: 5, mood: 6 }, unexpected: false,
    text: '高中同桌深夜发来一条消息：“我也在偷偷学投资，咱俩一起呗。”你不孤单了。',
  },
  {
    id: 'fr_club_overnight', label: '社团比赛前夜', icon: '🌙', weight: 1, wealthPct: 0,
    delta: { cognition: 8, stamina: -6, mood: 6 }, unexpected: false,
    text: '比赛前夜，一群人挤在活动室改方案，没人想走。凌晨三点，方案过了。',
  },
  {
    id: 'fr_birthday_forgot', label: '忘了朋友的生日', icon: '🎂', weight: 1, wealthPct: 0,
    delta: { mood: -8 }, unexpected: false,
    text: '好朋友生日，你忙到忘了。群里安静了一整天，你总觉得缺了点什么。',
  },
  {
    id: 'fr_roommate_snore', label: '室友的通宵游戏', icon: '😴', weight: 1, wealthPct: 0,
    delta: { stamina: -10, mood: -4 }, unexpected: false,
    text: '室友打呼噜加打游戏到凌晨三点，你翻来覆去，一夜没睡好。',
  },
  {
    id: 'fr_friend_borrow', label: '朋友开口借钱', icon: '💸', weight: 1, wealthPct: 0,
    delta: {}, unexpected: false,
    text: '高中老友突然打电话借钱，说家里有急事。你心里清楚，这笔钱大概率有去无回。',
    choices: [
      { id: 'fr_borrow_all', label: '借，能帮就帮', wealthPct: -3, delta: { mood: 4 } },
      { id: 'fr_borrow_half', label: '借一半', wealthPct: -1.5, delta: { mood: 1 } },
      { id: 'fr_borrow_refuse', label: '委婉拒绝', wealthPct: 0, delta: { mood: -8 } },
    ],
  },
  {
    id: 'fr_friends_gossip', label: '背后的闲话', icon: '💬', weight: 1, wealthPct: 0,
    delta: { cognition: 3, mood: -8 }, unexpected: false,
    text: '有人说“穷人家的孩子还学人家炒股”。你听见了，没回头，只是手里的笔握得更紧。',
  },
]

// ── v2.3 家庭 / 家乡 (小镇做题家的根) ─────────────────────────────────────────────
const hometown: SpecialEvent[] = [
  {
    id: 'hm_mom_call', label: '妈妈的电话', icon: '📞', weight: 2, wealthPct: 0,
    delta: { mood: 10 }, unexpected: false,
    text: '妈妈打电话来，第一句是“钱够不够花”。你听见她在那头把菜价念叨了一遍，眼眶一热。',
  },
  {
    id: 'hm_parcel', label: '家乡的包裹', icon: '📦', weight: 2, wealthPct: 0,
    delta: { mood: 8, stamina: 3 }, unexpected: false,
    text: '家里寄来一箱土特产，室友抢着分。宿舍一晚上都是小镇的味道。',
  },
  {
    id: 'hm_village_hope', label: '全村的目光', icon: '🏮', weight: 1, wealthPct: 0,
    delta: { cognition: 5, mood: -6 }, unexpected: false,
    text: '邻居家孩子考上大学的消息传遍全村，你妈被问了一下午“你家孩子以后干啥”。你突然不敢松懈。',
  },
  {
    id: 'hm_remittance', label: '家里的装修款', icon: '🏦', weight: 1, wealthPct: 0,
    delta: {}, unexpected: false,
    text: '家里装修缺钱，爸妈在电话里欲言又止。你知道他们不问你要，可你听见了那句话。',
    choices: [
      // v2.6 贫困逻辑: flat 生活费 amounts — a poor student sends ¥500, not "4% of ¥1,000".
      { id: 'hm_send_all', label: '全部转回去', wealthPct: 0, wealthFlat: -500, delta: { mood: -3 } },
      { id: 'hm_send_half', label: '转一半', wealthPct: 0, wealthFlat: -250, delta: { mood: 0 } },
      { id: 'hm_keep_study', label: '留着交学费', wealthPct: 0, wealthFlat: 0, delta: { mood: -8 } },
    ],
  },
  {
    id: 'hm_teacher_son', label: '物理老师的孩子', icon: '🧭', weight: 1, wealthPct: 0,
    delta: { cognition: 8, mood: 5 }, unexpected: false, mentorFavor: 1,
    text: '高中物理老师的儿子在券商实习，帮你把简历递进了一家你想都不敢想的公司。他爸在电话里说：“这孩子，值得被看见。”',
  },
  {
    id: 'hm_parents_fight', label: '电话那头的争吵', icon: '📵', weight: 1, wealthPct: 0,
    delta: { mood: -9, stamina: -3 }, unexpected: false,
    text: '电话那头，爸妈又吵起来了。你在走廊尽头站了很久，不知道能做什么。',
  },
  {
    id: 'hm_home_sick', label: '期末周的乡愁', icon: '🚄', weight: 1, wealthPct: 0,
    delta: { stamina: -6, mood: -4 }, unexpected: false,
    text: '期末周，你盯着车票软件发了半小时呆。想家，但路费要省着花。',
  },
  {
    id: 'gu_old_professor', label: '图书馆的老教授', icon: '🧓', weight: 2, wealthPct: 0,
    delta: { cognition: 4, mood: 3 }, unexpected: false, mentorFavor: 1,
    text: '你帮一位老教授把一摞书搬上楼，他随口问你学什么专业。走时，他往你手里塞了张纸条：“周三下午，来贵人办公室坐坐。”',
  },
  {
    id: 'gu_referral', label: '学长的内推', icon: '📨', weight: 1, wealthPct: 0,
    delta: { cognition: 3, mood: 5 }, unexpected: false, mentorFavor: 1,
    text: '社团学长听说了你最近在学的东西，默默把你的名字加进了实习内推名单。他拍拍你的肩：“你值得被推荐，别让出身挡住你。”',
  },
]

// ── v2.3 健康 / 身体 ─────────────────────────────────────────────────────────────
const health: SpecialEvent[] = [
  {
    id: 'he_all_nighter', label: '连续三晚熬夜', icon: '🌃', weight: 2, wealthPct: 0,
    delta: { stamina: -15, mood: -7 }, unexpected: false,
    text: '连续三晚刷题，洗澡时一阵头晕。身体在报警，你听见了吗。',
  },
  {
    id: 'he_street_food', label: '校门口的鸡排', icon: '🤢', weight: 1, wealthPct: -1,
    delta: { stamina: -12, mood: -5 }, unexpected: false,
    text: '校门口小摊的鸡排吃完，半夜胃开始抗议，第二天人都是飘的。',
  },
  {
    id: 'he_night_run', label: '第一次夜跑五公里', icon: '🏃', weight: 2, wealthPct: 0,
    delta: { stamina: 12, mood: 8 }, unexpected: false,
    text: '你加入了夜跑群，第一次跟跑五公里。累，但痛快，风都是甜的。',
  },
  {
    id: 'he_eye_check', label: '视力又降了', icon: '👓', weight: 1, wealthPct: 0,
    delta: { stamina: -6, mood: -4 }, unexpected: false,
    text: '校医院体检，医生说视力又降了：“少熬夜，多看远处。”',
  },
  {
    id: 'he_flu_shot', label: '免费流感疫苗', icon: '💉', weight: 2, wealthPct: 0,
    delta: { stamina: 6 }, unexpected: false,
    text: '校医院免费流感疫苗，你排了二十分钟队。针头扎下去的那一刻，你觉得自己在认真活着。',
  },
  {
    id: 'he_sprain', label: '下楼梯踩空', icon: '🩹', weight: 1, wealthPct: 0,
    delta: { stamina: -10, mood: -4 }, unexpected: false,
    text: '下楼梯看手机，一脚踩空扭了脚踝。你一瘸一拐回宿舍，决定明天开始不边走路边看手机。',
  },
]

// ── v2.3 财富 / 小钱 (小镇做题家的第一桶金往往来自这些小事) ─────────────────────────
const wealth: SpecialEvent[] = [
  {
    id: 'we_scholarship', label: '一等奖学金到账', icon: '🏆', weight: 2, wealthPct: 0, wealthFlat: 2000,
    delta: { mood: 8 }, unexpected: false,
    // v2.6: flat ¥2,000 — a real 一等奖学金, not "8% of a ¥1,000 生活费".
    text: '期中成绩单出来，一等奖学金 ¥2,000 到账。你妈在电话里念了一晚上“我家孩子出息了”。',
  },
  {
    id: 'we_lottery', label: '顺手刮中的彩票', icon: '🎟️', weight: 1, wealthPct: 0,
    delta: {}, unexpected: true,
    text: '门口彩票站顺手刮了一张，居然中了 ¥50。你笑了很久，然后开始想这笔钱怎么花。',
    choices: [
      { id: 'lot_save', label: '存起来', wealthPct: 0, wealthFlat: 50, delta: { mood: 8 } },
      { id: 'lot_treat', label: '请室友撮一顿', wealthPct: 0, wealthFlat: 30, delta: { mood: 12 } },
      { id: 'lot_position', label: '拿去加仓股票', wealthPct: 0, wealthFlat: 50, delta: { mood: 5, cognition: 2 } },
    ],
  },
  {
    id: 'we_sell_notes', label: '笔记卖断货', icon: '📝', weight: 2, wealthPct: 4,
    delta: { cognition: 4 }, unexpected: false,
    text: '你的期末笔记挂在论坛上，一个下午卖断货。原来整理过的东西真的值钱。',
  },
  {
    id: 'we_phone_screen', label: '碎掉的手机屏', icon: '📱', weight: 1, wealthPct: 0, wealthFlat: -800,
    delta: { mood: -6 }, unexpected: true,
    text: '手机从口袋里滑出来，屏幕碎成了蛛网。换屏八百块，你心疼了一整周。',
  },
  {
    id: 'we_teacher_envelope', label: '老师的信封', icon: '✉️', weight: 2, wealthPct: 5,
    delta: { cognition: 5 }, unexpected: false,
    text: '帮老师做完项目，老师往你手里塞了个信封：“拿去吃饭，别太省。”',
  },
  {
    id: 'we_impulse_buy', label: '双十一的冲动', icon: '🛒', weight: 1, wealthPct: -1,
    delta: { mood: -4 }, unexpected: false,
    text: '双十一冲动下单，到货才发现用不上。你把它挂在二手平台，标价-50%。',
  },
]

// ── v2.3 生活惊喜 / 意外日常 ─────────────────────────────────────────────────────
const life: SpecialEvent[] = [
  {
    id: 'lf_free_meal', label: '免单券的快乐', icon: '🍗', weight: 2, wealthPct: 0,
    delta: { mood: 7 }, unexpected: false,
    text: '外卖平台抽到一张免单券。你犹豫三秒，点了一份平时舍不得吃的炸鸡。',
  },
  {
    id: 'lf_locked_library', label: '被锁在图书馆', icon: '🚪', weight: 1, wealthPct: 0,
    delta: { cognition: 4, mood: -3 }, unexpected: true,
    text: '闭馆铃响，你被锁在图书馆里。管理员来开门时哭笑不得，你趁机多学了半小时。',
  },
  {
    id: 'lf_stray_cat', label: '跟你走了一路的橘猫', icon: '🐈', weight: 2, wealthPct: 0,
    delta: { mood: 9 }, unexpected: false,
    text: '一只橘猫跟着你从食堂走回宿舍，室友拍了一路。它走的时候，你心里暖了一晚上。',
  },
  {
    id: 'lf_rain_storm', label: '没带伞的暴雨', icon: '🌧️', weight: 1, wealthPct: 0,
    delta: { stamina: -5, mood: -3 }, unexpected: true,
    text: '突然暴雨，你没带伞。跑回宿舍全身湿透，室友们笑成一团。',
  },
  {
    id: 'lf_wrong_room', label: '走错教室的第一排', icon: '🙈', weight: 1, wealthPct: 0,
    delta: { mood: -6 }, unexpected: false,
    text: '冲进教室才发现上错课，还坐在第一排。老师看了你一眼，你只能硬着头皮听完。',
  },
  {
    id: 'lf_found_wallet', label: '食堂捡到的钱包', icon: '👛', weight: 1, wealthPct: 0,
    delta: { mood: 8 }, unexpected: false,
    text: '在食堂捡到一个鼓鼓的钱包，你送到失物招领处。失主追出来请了你一杯奶茶。',
  },
  {
    id: 'lf_newspaper', label: '上了校报角落', icon: '🗞️', weight: 2, wealthPct: 0,
    delta: { cognition: 3, mood: 10 }, unexpected: false,
    text: '校报采访“每天泡图书馆的那个人”，你上了头版角落。老妈把报纸拍照发了全家群。',
  },
  {
    id: 'lf_concert', label: '跑调的歌和全场掌声', icon: '🎤', weight: 1, wealthPct: 0,
    delta: { mood: 12, stamina: -3 }, unexpected: false,
    text: '社团晚会，你被起哄拉上台唱了一首跑调的歌。全场打着节拍，你第一次不怕出丑。',
  },
  {
    id: 'lf_blackout', label: '全校断网的一晚', icon: '🌐', weight: 2, wealthPct: 0,
    delta: { stamina: 9 }, unexpected: false,
    text: '全校断网一晚上。你被迫早睡，第二天精神好得反常。',
  },
]

// ── v2.3 罕见大惊喜 (weight 1, 小概率的人生转折) ───────────────────────────────────
const bigSurprises: SpecialEvent[] = [
  {
    id: 'big_internship', label: '大厂的面试通知', icon: '💼', weight: 1, wealthPct: 0,
    delta: { cognition: 15, mood: 10 }, unexpected: true, mentorFavor: 1,
    text: '随手投的一份实习简历，居然收到了一家大厂的面试通知。你盯着邮件看了三遍。',
  },
  {
    id: 'big_demolition', label: '小镇老房拆迁', icon: '🏗️', weight: 1, wealthPct: 0,
    delta: { cognition: 2, mood: 10 }, unexpected: true,
    // v2.6 贫困逻辑: 拆迁款是爸妈的钱，不是你的钱 —— 生活费不动，心态与认知是真正的
    // 礼物 (they also promise: 学费不用你操心 = 你可以更专注地学).
    text: '家里传来消息：小镇的老房划进了拆迁范围。爸妈在电话里笑：“学费的事你不用操心了。”你握着手机，第一次觉得身后的地基稳了一点。',
  },
  {
    id: 'big_app_idea', label: '被外校借走的报名小程序', icon: '💡', weight: 1, wealthPct: 0,
    delta: { cognition: 12, mood: 8 }, unexpected: false,
    text: '你给社团写的报名小程序，被外校学生会借去用了。原来做出来的东西真的能影响别人。',
  },
]

export const SPECIAL_EVENTS: SpecialEvent[] = [
  ...market,
  ...friends,
  ...hometown,
  ...health,
  ...wealth,
  ...life,
  ...bigSurprises,
]

// ── v2.5 金融世家生活池: 小镇池替换掉家乡/小钱/拆迁后，世家运行有它自己的戏剧 ─────────
// 同一个市场、同样的朋友与健康事件，但"家庭与家乡"换成家族与家产，"小钱"换成信托与分红,
// "日常惊喜"换成董事会、酒会与名流圈 —— 世家的麻烦和惊喜，和做题家的不是一个量级。
const dynastySurprises: SpecialEvent[] = [
  {
    id: 'dy_family_report', label: '家族季度汇报会', icon: '🗂️', weight: 2, wealthPct: 0,
    delta: { cognition: 8, mood: -4 }, unexpected: false,
    text: '季度汇报会上，你的提案被当众挑了三处毛病。散会后，叔叔拍了拍你的肩：“不错，比上次像话了。”',
  },
  {
    id: 'dy_father_call', label: '父亲的电话', icon: '📞', weight: 2, wealthPct: 0,
    delta: { cognition: 2, mood: -6 }, unexpected: false,
    text: '父亲打电话来，第一句是：“别让外面的人看轻你的姓氏。”你握着手机，听他把家里的难处讲了一路。',
  },
  {
    id: 'dy_mother_call', label: '母亲的电话', icon: '🤱', weight: 2, wealthPct: 0,
    delta: { mood: 8 }, unexpected: false,
    text: '母亲在电话那头说：“家里永远给你留了退路。你想做自己的事，就去做。”你眼眶一热。',
  },
  {
    id: 'dy_trust_dividend', label: '家族信托分红', icon: '🏦', weight: 2, wealthPct: 6,
    delta: { mood: 4 }, unexpected: false,
    text: '信托账户的季度分红到账。你盯着那串数字，第一次意识到：这笔钱不是挣来的，是继承来的。',
  },
  {
    id: 'dy_bank_manager', label: '私人银行经理的邀请', icon: '💼', weight: 2, wealthPct: 0,
    delta: { cognition: 5, mood: 3 }, unexpected: false,
    text: '私人银行经理约你喝了杯咖啡，聊了聊家族资产配置。他试探性地问：“要不要看看你名下的账户？”',
  },
  {
    id: 'dy_board_clash', label: '董事会的交锋', icon: '⚔️', weight: 1, wealthPct: 0,
    delta: { cognition: 10, stamina: -6 }, unexpected: false,
    text: '你旁听了一场董事会。两个董事当着所有人的面翻旧账，你坐在后排，第一次听懂什么叫“利益面前没有亲戚”。',
  },
  {
    id: 'dy_debutante', label: '名媛圈的邀请', icon: '💃', weight: 2, wealthPct: 0,
    delta: { mood: 8, stamina: -4 }, unexpected: false,
    text: '一个你叫不上名字的“世交之女”邀请你参加她的生日宴。宴会上所有人都在交换名片，没人问你在学什么。',
  },
  {
    id: 'dy_name_gossip', label: '“不过是投了个好胎”', icon: '💬', weight: 1, wealthPct: 0,
    delta: { cognition: 3, mood: -10 }, unexpected: false,
    text: '有人当着你的面说：“他有什么本事，不过是投了个好胎。”你想反驳，却发现他说的有一部分是真的。',
  },
  {
    id: 'dy_exchange_student', label: '海归交换生的夜聊', icon: '🌍', weight: 2, wealthPct: 0,
    delta: { cognition: 8, mood: 6 }, unexpected: false,
    text: '一个海归交换生在社团里和你聊到凌晨：“你家的事我不懂，但你问的问题，和我在纽约见过的人一模一样。”',
  },
  {
    id: 'dy_charity_gala', label: '慈善晚宴的签单', icon: '🎟️', weight: 1, wealthPct: -2,
    delta: { mood: 6 }, unexpected: false,
    text: '慈善晚宴上，你替父亲签了一张捐赠单。掌声响起的时候，你分不清他们是在鼓掌，还是在看那张单子上的数字。',
  },
  {
    id: 'dy_father_sick', label: '父亲住院', icon: '🏥', weight: 1, wealthPct: 0,
    delta: { mood: -14, stamina: -6 }, unexpected: true,
    text: '父亲突然住院。你坐在病房外的走廊里，第一次觉得家里那些数字，原来要靠人的身体去扛。',
  },
  {
    id: 'dy_first_earned', label: '第一笔自己挣的钱', icon: '💵', weight: 2, wealthPct: 2,
    delta: { cognition: 4, mood: 6 }, unexpected: false,
    text: '你帮一个学长做的项目结款了。钱不多，但那是你人生第一笔自己挣的钱。你在收款通知上看了很久。',
  },
  {
    id: 'dy_heir_sms', label: '继承人之争的短信', icon: '📱', weight: 1, wealthPct: 0,
    delta: { cognition: 2, mood: -8 }, unexpected: false,
    text: '家族群里，有人转发了一篇关于“二代接班”的文章，配文意味深长。你盯着手机，没回。',
  },
  {
    id: 'dy_private_dinner', label: '私募酒会上听到的真话', icon: '🥃', weight: 2, wealthPct: 0,
    delta: { cognition: 12 }, unexpected: true,
    text: '酒过三巡，一个喝醉的投资人说了一句清醒的话：“这个市场，钱多的人亏得最惨，看得懂的人才活得久。”你在旁边记了一整晚。',
  },
  {
    id: 'dy_car_pickup', label: '校门口的车', icon: '🚗', weight: 1, wealthPct: 0,
    delta: { mood: -4 }, unexpected: false,
    text: '接你的车停在校门口，你让司机绕到后街。你还没准备好，让室友看见自己坐什么车上学。',
  },
  {
    id: 'dy_old_photo', label: '老宅的照片', icon: '🖼️', weight: 1, wealthPct: 0,
    delta: { cognition: 2, mood: 5 }, unexpected: false,
    text: '母亲发来一张老宅的照片：二十年前，父亲还在小摊上修表。你忽然明白，家族不只是今天的样子。',
  },
]

// v2.5: 出身决定你的人生池 —— 小镇做题家看到的是妈妈的电话与奖学金，金融世家看到的是
// 季度汇报会与家族信托。市场冲击、朋友与健康事件两个出身共享(大学宿舍对谁都一样)。
export function specialEventsFor(origin: Origin): SpecialEvent[] {
  if (origin === 'finance_dynasty') {
    return [...market, ...friends, ...health, ...dynastySurprises]
  }
  return SPECIAL_EVENTS
}

// About 7 triggered world events across 13 weeks. The weighted table keeps breakthroughs common
// without making setbacks disappear — v2.3's bigger pool trades repetition for surprise while the
// breakthrough weights (6/6/4/4/3) hold their per-trigger odds at ~7% each.
export const SPECIAL_EVENT_TRIGGER_PROB = 0.55
