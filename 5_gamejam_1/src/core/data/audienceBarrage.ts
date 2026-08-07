import type { ScriptId } from '../types';

export type AudienceScene =
  | 'ambient' | 'entrance' | 'script' | 'move' | 'perfect'
  | 'combo' | 'miss' | 'forgot' | 'knockdown' | 'ending';

export type AudienceBarrageStyle = 'normal' | 'top' | 'bottom' | 'fast' | 'emoji' | 'meme';

export interface AudienceBarrageLine {
  id: string;
  text: string;
  scene: AudienceScene;
  style: AudienceBarrageStyle;
  nonsense?: true;
  repeatable?: true;
  script?: Exclude<ScriptId, 'freePlay'>;
}

type LineOptions = Pick<AudienceBarrageLine, 'nonsense' | 'repeatable' | 'script'>;

function line(
  id: number,
  text: string,
  scene: AudienceScene,
  style: AudienceBarrageStyle = 'normal',
  options: LineOptions = {},
): AudienceBarrageLine {
  return { id: `L_AUDIENCE_${String(id).padStart(3, '0')}`, text, scene, style, ...options };
}

export const AUDIENCE_BARRAGE_LINES: readonly AudienceBarrageLine[] = [
  // 旧版六条攻略弹幕，保留原文用于兼容转发。
  line(1, '他剑在抖！往左闪！', 'move', 'normal'),
  line(2, '他忘词了！趁现在快输出！', 'forgot', 'fast'),
  line(3, '别踩他披风！……算了踩了也没事。', 'move', 'normal'),
  line(4, '他走位像老太太！预判他下一步！', 'move', 'normal'),
  line(5, '第三句必卡壳！倒数三秒！', 'forgot', 'fast'),
  line(6, '王座后面没陷阱。真的。……你信我。', 'ambient', 'normal'),

  line(7, '开播了开播了，魔王老师请就位', 'entrance', 'top'),
  line(8, '今天气色不错，像睡了整整四小时', 'entrance'),
  line(9, '来了！', 'entrance', 'fast', { repeatable: true }),
  line(10, '披风角度满分，表情管理加油', 'entrance'),
  line(11, '灯光师懂行，先给王座一个特写', 'entrance', 'meme'),
  line(12, '先别打，我瓜子还没拆开', 'entrance', 'normal'),
  line(13, '今天也是努力营业的大魔王', 'ambient'),
  line(14, '王座坐久了记得起来活动一下', 'ambient'),
  line(15, '剑擦得挺亮，能照出黑眼圈', 'ambient'),
  line(16, '这直播间怎么还有烛火白噪音', 'ambient'),
  line(17, '安静得能听见铠甲在叹气', 'ambient'),
  line(18, '路过看看，不催进度', 'ambient'),
  line(19, '主播喝口水，勇者可以等两秒', 'ambient'),
  line(20, '王座扶手今天也承受了很多', 'ambient', 'meme'),
  line(21, '选这个本，台词少，活得久', 'script'),
  line(22, '剧本拿反了吧？哦，没有', 'script'),
  line(23, '开本！', 'script', 'fast', { repeatable: true }),
  line(24, '编剧出来挨夸，至少字挺大', 'script'),
  line(25, '建议先默读一遍，真的不丢人', 'script'),
  line(26, '纸张翻得很有职业感', 'script', 'meme'),
  line(27, '左一步，对，就是那块地砖', 'move'),
  line(28, '走位稳住，披风自己会跟上', 'move'),
  line(29, '这个横移有一种谨慎的优雅', 'move'),
  line(30, '别急，光圈不会下班', 'move'),
  line(31, '走！', 'move', 'fast', { repeatable: true }),
  line(32, '差半步，问题不大，气势补齐', 'move'),
  line(33, 'WASD 老师今天终于来上课了', 'move', 'meme'),
  line(34, '好走位，王座厅都显宽了', 'move'),
  line(35, '正中！这一剑有排练过', 'perfect', 'top'),
  line(36, '漂亮——收剑也别忘了', 'perfect', 'bottom'),
  line(37, '这一下连烛火都站直了', 'perfect'),
  line(38, '完美拍！魔王老师加一朵小红花', 'perfect', 'emoji'),
  line(39, '准得像王座偷偷开了辅助线', 'perfect'),
  line(40, '帅到了，允许本人回看三遍', 'perfect', 'meme'),
  line(41, '好！', 'perfect', 'fast', { repeatable: true }),
  line(42, '稳！', 'perfect', 'fast', { repeatable: true }),
  line(43, '连上了连上了，手别抖', 'combo', 'fast'),
  line(44, '二连！铠甲开始相信自己了', 'combo'),
  line(45, '节奏起来了，谁也别咳嗽', 'combo'),
  line(46, '继续！今天的剑有自己的拍子', 'combo', 'top'),
  line(47, '连击条比本人先自信起来', 'combo', 'meme'),
  line(48, '再来！', 'combo', 'fast', { repeatable: true }),
  line(49, '冲！', 'combo', 'fast', { repeatable: true }),
  line(50, '×好多，数学老师表示满意', 'combo', 'emoji'),
  line(51, '没点到，空气替勇者挡了一剑', 'miss'),
  line(52, '差一点，真的只差一个鼠标', 'miss'),
  line(53, '没事，我们统一眨眼没看见', 'miss', 'bottom'),
  line(54, '目标：我都缩成这样了', 'miss', 'meme'),
  line(55, '空！', 'miss', 'fast', { repeatable: true }),
  line(56, '危', 'miss', 'fast', { repeatable: true }),
  line(57, '手滑是传统艺能，不算事故', 'miss'),
  line(58, '连击离开得很安详', 'miss', 'emoji'),
  line(59, '台词去哪了，刚才还在嘴边', 'forgot'),
  line(60, '提词器老师也紧张了', 'forgot'),
  line(61, '停顿很有深度，假装是留白', 'forgot', 'meme'),
  line(62, '别催，他正在内存里搜索下一句', 'forgot'),
  line(63, '这段沉默获得了最佳男配角', 'forgot', 'bottom'),
  line(64, '想起来了吗？没事，我们也忘了', 'forgot'),
  line(65, '卡壳！', 'forgot', 'fast', { repeatable: true }),
  line(66, '……？', 'forgot', 'fast', { repeatable: true }),
  line(67, '倒了！但披风落地姿势很标准', 'knockdown', 'top'),
  line(68, '地板：今天又是我接住他', 'knockdown', 'meme'),
  line(69, '先躺两秒，不收加班费', 'knockdown'),
  line(70, '勇者轻点，王座厅没有医务室', 'knockdown'),
  line(71, '倒！', 'knockdown', 'fast', { repeatable: true }),
  line(72, '起得来，发型先扶一下', 'knockdown'),
  line(73, '谢幕！今天也完整地演完了', 'ending', 'top'),
  line(74, '掌声给勇者，也给坚持营业的人', 'ending', 'bottom'),
  line(75, '灯别急着关，让他再站一会儿', 'ending'),
  line(76, '辛苦了，王座和地板都辛苦了', 'ending'),
  line(77, '本场最佳：没有熄灭的那根蜡烛', 'ending', 'meme'),
  line(78, '演得不错，下次也不用完美', 'ending'),
  line(79, '散场慢走，披风请勿顺手带走', 'ending'),
  line(80, '今日份勇气已到账', 'ending', 'emoji'),
  line(81, '返场！', 'ending', 'fast', { repeatable: true }),

  // 30/120 无厘头池：与战况弱相关，但保持温和。
  line(82, '有人知道王座包邮吗', 'ambient', 'meme', { nonsense: true }),
  line(83, '烛台二号今天状态不对', 'ambient', 'normal', { nonsense: true }),
  line(84, '我宣布左边第三块砖赢了', 'move', 'meme', { nonsense: true }),
  line(85, '刚才有只看不见的鸽子飞过去了', 'ambient', 'normal', { nonsense: true }),
  line(86, '这披风洗标上写着不可翻滚', 'move', 'normal', { nonsense: true }),
  line(87, '🥔', 'ambient', 'emoji', { nonsense: true, repeatable: true }),
  line(88, '王座下面可能住着一只小板凳', 'ambient', 'meme', { nonsense: true }),
  line(89, '现在插播天气：室内，多云', 'ambient', 'normal', { nonsense: true }),
  line(90, '剑柄看起来像能开核桃', 'script', 'normal', { nonsense: true }),
  line(91, '勇者的鞋带拥有独立剧情', 'entrance', 'normal', { nonsense: true }),
  line(92, '我家的盆栽也会这个走位', 'move', 'normal', { nonsense: true }),
  line(93, '？？？', 'miss', 'fast', { nonsense: true, repeatable: true }),
  line(94, '草', 'combo', 'fast', { nonsense: true, repeatable: true }),
  line(95, '给铠甲上点润滑油会影响人设吗', 'ambient', 'normal', { nonsense: true }),
  line(96, '右下角不存在，但我还是看了一眼', 'ambient', 'meme', { nonsense: true }),
  line(97, '今天的空气很有层次感', 'entrance', 'normal', { nonsense: true }),
  line(98, '这个停顿适合煮半颗蛋', 'forgot', 'normal', { nonsense: true }),
  line(99, '地板刚才偷偷升级了防御', 'knockdown', 'meme', { nonsense: true }),
  line(100, '🕯️🕯️🕯️', 'ambient', 'emoji', { nonsense: true }),
  line(101, '谁把背景音乐藏在柱子后面了', 'ambient', 'normal', { nonsense: true }),
  line(102, '这剑法建议搭配一碗白粥', 'perfect', 'normal', { nonsense: true }),
  line(103, '王座今天坐北朝南，宜开演', 'script', 'meme', { nonsense: true }),
  line(104, '披风：我只是路过', 'move', 'meme', { nonsense: true }),
  line(105, '刚才那一下把星期二打掉了', 'perfect', 'normal', { nonsense: true }),
  line(106, '有人在弹幕里放了一把勺子🥄', 'combo', 'emoji', { nonsense: true }),
  line(107, '谢幕以后记得给烛台浇水', 'ending', 'normal', { nonsense: true }),
  line(108, '铠甲里面会不会有备用铠甲', 'knockdown', 'normal', { nonsense: true }),
  line(109, '本直播间由一块普通地砖赞助', 'ambient', 'meme', { nonsense: true }),
  line(110, '台词本闻起来像昨天下午', 'forgot', 'normal', { nonsense: true }),
  line(111, '🦆路过，不参与评分', 'ending', 'emoji', { nonsense: true }),

  // 三个剧本各三条专属梗。
  line(112, '威严本开场，请把笑声调成静音', 'script', 'normal', { script: 'dignity' }),
  line(113, '这句有王冠味，虽然他没戴王冠', 'perfect', 'top', { script: 'dignity' }),
  line(114, '庄重地走，庄重地差点绊到披风', 'move', 'meme', { script: 'dignity' }),
  line(115, '悲情本来了，纸巾先各拿一张', 'script', 'normal', { script: 'tragic' }),
  line(116, '三百年独白浓缩成这一口气', 'combo', 'normal', { script: 'tragic' }),
  line(117, '别急着哭，他只是忘了下一句', 'forgot', 'bottom', { script: 'tragic' }),
  line(118, '癫狂本启动，烛台请系好安全带', 'script', 'top', { script: 'mad' }),
  line(119, '这不是乱走，这是舞台风暴路径', 'move', 'fast', { script: 'mad' }),
  line(120, '情绪很满，肺活量正在提交辞呈', 'combo', 'meme', { script: 'mad' }),
];

export const LEGACY_AUDIENCE_BARRAGE = AUDIENCE_BARRAGE_LINES.slice(0, 6);
