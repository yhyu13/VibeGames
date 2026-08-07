// core/data/audienceBarrage.ts — B 站式观众弹幕词库

import type { BarrageLine } from '../types';

export const AUDIENCE_BARRAGE_LINES: BarrageLine[] = [
  // ============ 环境（无厘头） ============
  { id: 'L_BARRAGE_001', text: '所以今晚吃什么', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_002', text: '刚来，谁是 Boss', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_003', text: '这个披风有链接吗', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_004', text: '有人知道二楼厕所在哪吗', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_005', text: '前面的别剧透', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_006', text: '他是不是忘了词', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_007', text: '这个王座看着好贵', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_008', text: '主播能翻个跟头吗', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_009', text: '弹幕礼仪：安静看演出', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_010', text: '这灯光是租的还是买的', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_011', text: '我妈问我为什么对着屏幕笑', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_012', text: '建议Boss开个网课', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_013', text: '中场休息了吗', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_014', text: '王座体验卡怎么领', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_015', text: '这演出不用门票吗', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_016', text: '孩子很喜欢，下次还来', style: 'normal', scene: 'ambient' },
  { id: 'L_BARRAGE_017', text: '我看不懂但我大受震撼', style: 'meme', scene: 'ambient' },
  { id: 'L_BARRAGE_018', text: '[战术后仰]', style: 'meme', scene: 'ambient' },
  { id: 'L_BARRAGE_019', text: '[地铁老人手机]', style: 'meme', scene: 'ambient' },
  { id: 'L_BARRAGE_020', text: '[当场泪目]', style: 'meme', scene: 'ambient' },

  // ============ 进场 ============
  { id: 'L_BARRAGE_021', text: '来了来了，前排围观', style: 'normal', scene: 'entrance' },
  { id: 'L_BARRAGE_022', text: '今日份反派营业', style: 'normal', scene: 'entrance' },
  { id: 'L_BARRAGE_023', text: '直播间人变多了？', style: 'normal', scene: 'entrance' },
  { id: 'L_BARRAGE_024', text: '欢迎新来的朋友', style: 'normal', scene: 'entrance' },
  { id: 'L_BARRAGE_025', text: '哇，今天排面', style: 'normal', scene: 'entrance' },
  { id: 'L_BARRAGE_026', text: '👏👏👏', style: 'emoji', scene: 'entrance' },
  { id: 'L_BARRAGE_027', text: '直播间的朋友大家晚上好', style: 'normal', scene: 'entrance' },

  // ============ 选剧本 ============
  { id: 'L_BARRAGE_031', text: '庄重点庄重点，反派要有排面', style: 'normal', scene: 'script' },
  { id: 'L_BARRAGE_032', text: '快哭一个给我们看看', style: 'normal', scene: 'script' },
  { id: 'L_BARRAGE_033', text: '发癫！发癫！发癫！', style: 'fast', scene: 'script' },
  { id: 'L_BARRAGE_034', text: '选哪个都行，别紧张', style: 'normal', scene: 'script' },
  { id: 'L_BARRAGE_035', text: '我赌他选癫狂', style: 'normal', scene: 'script' },
  { id: 'L_BARRAGE_036', text: '投币支持一下', style: 'normal', scene: 'script' },

  // ============ 走位 / 移动 ============
  { id: 'L_BARRAGE_041', text: '这走位突然专业起来了', style: 'normal', scene: 'move' },
  { id: 'L_BARRAGE_042', text: '滑步！是滑步！', style: 'fast', scene: 'move' },
  { id: 'L_BARRAGE_043', text: '走位这么骚，一定是练过的', style: 'normal', scene: 'move' },
  { id: 'L_BARRAGE_044', text: '666666', style: 'fast', scene: 'move' },
  { id: 'L_BARRAGE_045', text: '这脚步比我的代码还流畅', style: 'normal', scene: 'move' },
  { id: 'L_BARRAGE_046', text: '走位漂移警告', style: 'normal', scene: 'move' },

  // ============ 完美命中 ============
  { id: 'L_BARRAGE_051', text: '完美！', style: 'fast', scene: 'perfect' },
  { id: 'L_BARRAGE_052', text: '好准！', style: 'fast', scene: 'perfect' },
  { id: 'L_BARRAGE_053', text: '这都能中？？', style: 'normal', scene: 'perfect' },
  { id: 'L_BARRAGE_054', text: '👏👏👏', style: 'emoji', scene: 'perfect' },
  { id: 'L_BARRAGE_055', text: '名场面预订', style: 'normal', scene: 'perfect' },
  { id: 'L_BARRAGE_056', text: '名 场 面', style: 'top', scene: 'perfect' },
  { id: 'L_BARRAGE_057', text: '🌟', style: 'emoji', scene: 'perfect' },
  { id: 'L_BARRAGE_058', text: '主播手是铁做的吗', style: 'normal', scene: 'perfect' },

  // ============ 连击 ============
  { id: 'L_BARRAGE_061', text: '连击起来了！', style: 'fast', scene: 'combo' },
  { id: 'L_BARRAGE_062', text: '这下是名场面了吧', style: 'normal', scene: 'combo' },
  { id: 'L_BARRAGE_063', text: '这波建议载入史册', style: 'bottom', scene: 'combo' },
  { id: 'L_BARRAGE_064', text: '🔥🔥🔥', style: 'emoji', scene: 'combo' },
  { id: 'L_BARRAGE_065', text: '太燃了太燃了', style: 'normal', scene: 'combo' },
  { id: 'L_BARRAGE_066', text: '全员起立', style: 'fast', scene: 'combo' },

  // ============ 落空 ============
  { id: 'L_BARRAGE_071', text: '💀', style: 'emoji', scene: 'miss' },
  { id: 'L_BARRAGE_072', text: '就这？', style: 'fast', scene: 'miss' },
  { id: 'L_BARRAGE_073', text: '哈哈哈哈哈哈哈哈', style: 'fast', scene: 'miss' },
  { id: 'L_BARRAGE_074', text: '这下尴尬了', style: 'normal', scene: 'miss' },
  { id: 'L_BARRAGE_075', text: '手滑了手滑了', style: 'normal', scene: 'miss' },
  { id: 'L_BARRAGE_076', text: '典', style: 'fast', scene: 'miss' },
  { id: 'L_BARRAGE_077', text: '建议回放十遍', style: 'normal', scene: 'miss' },
  { id: 'L_BARRAGE_078', text: '👀', style: 'emoji', scene: 'miss' },

  // ============ 忘词 ============
  { id: 'L_BARRAGE_081', text: '词呢？？', style: 'fast', scene: 'forgot' },
  { id: 'L_BARRAGE_082', text: '重金求台词本', style: 'normal', scene: 'forgot' },
  { id: 'L_BARRAGE_083', text: '演技巅峰：假装在想', style: 'normal', scene: 'forgot' },
  { id: 'L_BARRAGE_084', text: '泪目', style: 'fast', scene: 'forgot' },
  { id: 'L_BARRAGE_085', text: '忘词也是演出的一部分', style: 'normal', scene: 'forgot' },
  { id: 'L_BARRAGE_086', text: '这就是即兴吗爱了爱了', style: 'normal', scene: 'forgot' },

  // ============ 击倒 / 危机 ============
  { id: 'L_BARRAGE_091', text: '危', style: 'fast', scene: 'knockdown' },
  { id: 'L_BARRAGE_092', text: '？？？', style: 'fast', scene: 'knockdown' },
  { id: 'L_BARRAGE_093', text: 'Boss倒了？！', style: 'normal', scene: 'knockdown' },
  { id: 'L_BARRAGE_094', text: '快起来啊！', style: 'normal', scene: 'knockdown' },
  { id: 'L_BARRAGE_095', text: '这波是大危机', style: 'bottom', scene: 'knockdown' },
  { id: 'L_BARRAGE_096', text: '😱', style: 'emoji', scene: 'knockdown' },
  { id: 'L_BARRAGE_097', text: '主播撑住，我们刷火箭', style: 'normal', scene: 'knockdown' },

  // ============ 出戏 ============
  { id: 'L_BARRAGE_101', text: '他绷不住了哈哈哈哈', style: 'normal', scene: 'break' },
  { id: 'L_BARRAGE_102', text: '破防了破防了', style: 'fast', scene: 'break' },
  { id: 'L_BARRAGE_103', text: '剧本？什么剧本', style: 'normal', scene: 'break' },
  { id: 'L_BARRAGE_104', text: '真正的表演从破防开始', style: 'normal', scene: 'break' },
  { id: 'L_BARRAGE_105', text: '喜剧效果拉满', style: 'normal', scene: 'break' },

  // ============ 自评 ============
  { id: 'L_BARRAGE_111', text: '自评时间！观众席投票', style: 'normal', scene: 'evaluate' },
  { id: 'L_BARRAGE_112', text: '我给满分，他值得', style: 'normal', scene: 'evaluate' },
  { id: 'L_BARRAGE_113', text: '评分标准：哭了没', style: 'normal', scene: 'evaluate' },
  { id: 'L_BARRAGE_114', text: '这轮剪成精华了', style: 'normal', scene: 'evaluate' },
  { id: 'L_BARRAGE_115', text: '建议Boss开巡演', style: 'normal', scene: 'evaluate' },
  { id: 'L_BARRAGE_116', text: '今晚最佳反派', style: 'top', scene: 'evaluate' },

  // ============ 谢幕 / 结局 ============
  { id: 'L_BARRAGE_121', text: '完结撒花', style: 'normal', scene: 'ending' },
  { id: 'L_BARRAGE_122', text: '🎉🎉🎉', style: 'emoji', scene: 'ending' },
  { id: 'L_BARRAGE_123', text: '谢谢主播的演出', style: 'normal', scene: 'ending' },
  { id: 'L_BARRAGE_124', text: '看哭了，真的', style: 'normal', scene: 'ending' },
  { id: 'L_BARRAGE_125', text: '你被记住了', style: 'bottom', scene: 'ending' },
  { id: 'L_BARRAGE_126', text: '谢 幕 名 场 面', style: 'top', scene: 'ending' },
  { id: 'L_BARRAGE_127', text: '下次开播记得@我', style: 'normal', scene: 'ending' },
  { id: 'L_BARRAGE_128', text: '泪目', style: 'fast', scene: 'ending' },

  // ============ 醒目留言（SC） ============
  { id: 'L_BARRAGE_SC1', text: '舰长 深海潜水员：今晚的剑，挥得很好。', style: 'sc', scene: 'perfect' },
  { id: 'L_BARRAGE_SC2', text: '舰长 不睡午觉：别怕，观众都是友军。', style: 'sc', scene: 'nervous' },
  { id: 'L_BARRAGE_SC3', text: '舰长 王座首席：这个直播间我收藏了。', style: 'sc', scene: 'entrance' },
  { id: 'L_BARRAGE_SC4', text: '舰长 加班废人：忘词也没关系，重来。', style: 'sc', scene: 'forgot' },
  { id: 'L_BARRAGE_SC5', text: '舰长 影子替身：我打你是因为我喜欢你。', style: 'sc', scene: 'knockdown' },
  { id: 'L_BARRAGE_SC6', text: '舰长 无糖奶茶：今天也在为你的演出充值。', style: 'sc', scene: 'combo' },
];

/** 复读词（允许连发） */
export const REPEAT_WORDS = ['草', '危', '？？？', '泪目', '6', '哈哈哈哈'];
