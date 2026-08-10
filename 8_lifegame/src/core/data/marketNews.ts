// v1.3 §3: 热点新闻 — per-asset, per-turn headline pairs (up/down variants), 2013 Web 2.0
// flavor. pickNews (core/simulation/invest.ts) is 80% faithful to the sign of the tick the
// headline PRECEDES: news breaks before the move, so it's a noisy signal, not a cheat code.
// "news ≠ signal" is itself the lesson. 8 entries per asset = one per intro turn.

interface NewsPair {
  up: string
  down: string
}

export const MARKET_NEWS: Record<string, NewsPair[]> = {
  a_index: [
    { up: '创业板新政落地,两市高开,营业部排队开户', down: 'IPO 重启传闻发酵,沪指低开低走' },
    { up: '汇金增持四大行,尾盘强势拉升', down: '钱荒余波:银行间利率飙升,A 股重挫' },
    { up: '自贸区概念爆发,沪指放量大涨', down: '地产调控加码,权重股集体熄火' },
    { up: '年报季开门红,蓝筹股稳步抬升', down: '外围市场走弱,A 股缩量整理' },
    { up: '杠杆资金加速入场,两融余额创新高', down: '监管严查配资,股指震荡下行' },
    { up: '政策暖风频吹,题材多点开花', down: '获利盘涌出,大盘高位回调' },
    { up: '改革红利释放,指数三连阳', down: '解禁洪峰来袭,市场情绪谨慎' },
    { up: '牛市旗手暴动,券商股集体涨停', down: '黑天鹅突袭,指数尾盘跳水' },
  ],
  hk_index: [
    { up: '南下资金涌入,恒指高开高走', down: '美联储缩减 QE 风声紧,恒指承压' },
    { up: '中资股业绩超预期,恒指大涨', down: '欧债阴云再起,港股跟随外围下挫' },
    { up: '人民币国际化提速,金融股领涨', down: '本地地产政策收紧,恒指窄幅波动' },
    { up: '互联互通预期升温,恒指走强', down: '热钱流出新兴市场,港股重挫' },
    { up: '中概股回归潮起,恒指放量上攻', down: '地缘扰动,避险情绪升温' },
    { up: '派息季来临,高息股受捧', down: '成交低迷,恒指横盘整理' },
    { up: '科技股发力,恒指触底反弹', down: '美债收益率飙升,成长股承压' },
    { up: '全球资金回流亚太,恒指创阶段新高', down: '黑天鹅事件冲击,恒指急跌' },
  ],
  btc: [
    { up: 'BTC 减半效应发酵,价格突破前高', down: '交易所被盗传闻,BTC 盘中闪崩' },
    { up: '硅谷大佬公开站台 BTC', down: '监管禁令传闻四起,BTC 单日暴跌' },
    { up: '媒体头条:BTC 是数字黄金?散户蜂拥入场', down: '矿池算力异动,恐慌情绪蔓延' },
    { up: '支付巨头试水 BTC 结算', down: '分叉争议升级,BTC 深度回调' },
    { up: 'BTC 再上头版,交易所注册量翻倍', down: '大空头报告:BTC 是本世纪最大泡沫' },
    { up: '机构首次配置 BTC 传闻流出', down: '钱包漏洞曝光,BTC 急挫' },
    { up: '减半周期临近,矿工惜售情绪浓', down: '交易所提币拥堵,市场观望' },
    { up: '全民热议 BTC,价格垂直拉升', down: '监管铁拳落地,BTC 血流成河' },
  ],
}
