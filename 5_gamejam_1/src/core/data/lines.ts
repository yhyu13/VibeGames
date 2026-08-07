// core/data/lines.ts — L_* 全部台词池（02-content-narrative.md 逐条转写）
// 池：AMB / SENSE / DIG / TRG / MAD / FREE / PANIC / SELFDOUBT / EVAL / P5STAR / END_N / END_H
// 变体约定（02 §1.2）：变体 = 主行 id 追加后缀 `_forgot`（忘词）/ `_free`（自由发挥），挂在本池内。
// MAD 池键 = 'MAD'，dialogueEngine.resolvePool 以 'L_MAD' 查询时自动剥 L_ 前缀对齐（F18 池键约定）。

import type { DialogueLine } from '../types';

// ============ 隐藏结局链选项（01 §6 步骤 3，TDD G09/G10） ============
// 提问行（END_H 池内）显示 A/B/C 三选项；Dialogue.tsx 依此渲染按钮。
export const HIDDEN_CHAIN_QUESTION_ID = 'L_END_H_004'; // "你为什么一定要杀我？"
export const HIDDEN_CHAIN_CHOICES: ReadonlyArray<{ key: 'A' | 'B' | 'C'; text: string }> = [
  { key: 'A', text: '因为你是 Boss 啊' },
  { key: 'B', text: '我也不知道' },
  { key: 'C', text: '我也累了' },
];

export const LINE_POOLS: Record<string, DialogueLine[]> = {
  // ============ HINT — 系统操作提示（第一幕开演时） ============
  HINT: [
    { id: 'L_HINT_001', speaker: 'system', text: '操作：WASD 走进金色光圈 · 节拍圈变红时按左键出手 · 台词会自动念' },
  ],

  // ============ AMB — Wait 状态自语（02 §2.1，5 行） ============
  AMB: [
    { id: 'L_AMB_001', speaker: 'boss', emotion: 'calm', text: '……又是新的一天。对魔王来说，"新"的意思是：没有人来，或者，有人来。' },
    { id: 'L_AMB_002', speaker: 'boss', emotion: 'calm', text: '王座这东西，坐久了腰疼。可我不能换姿势——形象管理，懂吗？' },
    { id: 'L_AMB_003', speaker: 'boss', emotion: 'nervous', text: '我数过天花板上的裂缝，十七道。第十七道像一张嘴，它在问：今天有人来吗？' },
    { id: 'L_AMB_004', speaker: 'boss', emotion: 'calm', text: '（小声）我准备好了。真的。……好吧，至少准备好了"准备"。' },
    { id: 'L_AMB_005', speaker: 'boss', emotion: 'calm', text: '如果今天也没人来，我就把这段独白再练一遍。练到它不像独白，像呼吸。' },
  ],

  // ============ SENSE — 察觉玩家，慌忙整理盔甲（02 §3，6 行） ============
  SENSE: [
    { id: 'L_SENSE_001', speaker: 'boss', emotion: 'nervous', text: '……来了。脚步。一个。深呼吸。我可以的。' },
    { id: 'L_SENSE_002', speaker: 'boss', emotion: 'panic', text: '（慌忙）等一下等一下——我的头盔呢！我的……哦，在我头上。吓死我了。' },
    { id: 'L_SENSE_003', speaker: 'boss', emotion: 'nervous', text: '盔甲片又掉了三颗钉子。现在粘……来得及，来得及。' },
    { id: 'L_SENSE_004', speaker: 'boss', emotion: 'nervous', text: '（低声）别紧张。你就是个 Boss。你每个月——你每次——你天天都在干这个。' },
    { id: 'L_SENSE_005', speaker: 'boss', emotion: 'nervous', text: '披风别皱。披风皱了气势就垮了。气势垮了，就全完了。' },
    { id: 'L_SENSE_006', speaker: 'boss', emotion: 'calm', text: '（玩家走近，站直）……来了。欢迎，挑战者。这句我在心里排练了四百遍。' },
  ],

  // ============ DIG — 庄重威严（02 §4.2：15 主行 + 15 忘词 + 4 自由发挥） ============
  DIG: [
    { id: 'L_DIG_101', speaker: 'boss', emotion: 'calm', text: '挑战者，你的脚步停在了我的领地。你可知，这已是第一千零一次——有人站在这里。' },
    { id: 'L_DIG_102', speaker: 'boss', emotion: 'calm', text: '我并不惊讶。每年都有不自量力的勇者，敲响不属于他们的门。' },
    { id: 'L_DIG_103', speaker: 'boss', emotion: 'calm', text: '报上名来。虽然……我转头就忘。我记性不好，但气势要有。' },
    { id: 'L_DIG_104', speaker: 'boss', emotion: 'calm', text: '这柄剑，饮过无数英雄的血。今天，它想喝点新的——我是说，它很想喝。我在渲染气氛。' },
    { id: 'L_DIG_105', speaker: 'boss', emotion: 'calm', text: '（清了清嗓子）总而言之——开始吧。别让我等太久。……让我等太久的话，我会等的。' },
    { id: 'L_DIG_106', speaker: 'boss', emotion: 'nervous', text: '不错的闪避。可惜，闪避救不了你的——你的……那个词叫什么来着——命运！对，命运！' },
    { id: 'L_DIG_107', speaker: 'boss', emotion: 'nervous', text: '你看，我连你的招式都没记住，就已经躲开了。这说明——说明我经验丰富。' },
    { id: 'L_DIG_108', speaker: 'boss', emotion: 'nervous', text: '哼，你比上一个勇者强一点。上一个……上一个是谁来着？算了，不重要。你比他强一点。' },
    { id: 'L_DIG_109', speaker: 'boss', emotion: 'nervous', text: '我的剑在颤抖？不，这叫"蓄势待发"。震剑，是一种……很高级的剑术礼仪。' },
    { id: 'L_DIG_110', speaker: 'boss', emotion: 'nervous', text: '我劝你趁早投降。趁我还愿意给你留全尸——不是，趁我台词还没用完。' },
    { id: 'L_DIG_111', speaker: 'boss', emotion: 'shaky', text: '够了！我受够了这无聊的缠斗！就让你见识一下，魔王真正的姿态——' },
    { id: 'L_DIG_112', speaker: 'boss', emotion: 'shaky', text: '这就是我的全力。你看见了，对吧？你没有走神吧？……这很重要，请诚实回答。' },
    { id: 'L_DIG_113', speaker: 'boss', emotion: 'shaky', text: '（低声）剑……剑尖抬起来一点。对。现在这个剪影，完美。' },
    { id: 'L_DIG_114', speaker: 'boss', emotion: 'shaky', text: '黑暗终将吞噬一切——包括你，也包括……包括我今晚的晚饭。啊不是。这句不算。' },
    { id: 'L_DIG_115', speaker: 'boss', emotion: 'shaky', text: '最后问一次：你，准备好迎接你的结局了吗？……我也还没准备好，但流程走到这了，一起走吧。' },
    { id: 'L_DIG_101_forgot', speaker: 'boss', emotion: 'shaky', text: '……第、第一千零……（声音发虚）什么数字来着，不重要。重要的是，你站在这里。' },
    { id: 'L_DIG_102_forgot', speaker: 'boss', emotion: 'shaky', text: '每年都有……那个成语怎么说来着……"不自量力"。对。……我刚才是不是断句断错了。' },
    { id: 'L_DIG_103_forgot', speaker: 'boss', emotion: 'shaky', text: '报上名来。虽然……（卡壳）……这句我练过的，你等一下。' },
    { id: 'L_DIG_104_forgot', speaker: 'boss', emotion: 'shaky', text: '这柄剑，饮过无……（低头数剑上的划痕）……总之它喝过很多。你们的名字都在上面。' },
    { id: 'L_DIG_105_forgot', speaker: 'boss', emotion: 'shaky', text: '总而言之——开、开始……（转身低声）开场词怎么背的来着，完了，第一句就完了。' },
    { id: 'L_DIG_106_forgot', speaker: 'boss', emotion: 'shaky', text: '不错的闪避。可惜，闪避救不了你的——你的……（站在原地想了三秒）……呵，总之救不了。' },
    { id: 'L_DIG_107_forgot', speaker: 'boss', emotion: 'shaky', text: '你看，我连你的招式都没……（一道攻击擦肩而过，愣住）……好险。刚才那句你当我没说。' },
    { id: 'L_DIG_108_forgot', speaker: 'boss', emotion: 'shaky', text: '哼，你比上一个勇者……（翻开档案确认，又合上）……我档案忘带了。但你很强，这是台词，也是实话。' },
    { id: 'L_DIG_109_forgot', speaker: 'boss', emotion: 'shaky', text: '我的剑在颤抖？不，这叫……（剑掉在地上，弯腰捡起）……这叫"待会再发"。' },
    { id: 'L_DIG_110_forgot', speaker: 'boss', emotion: 'shaky', text: '我劝你趁早……（忘词，决定硬接）……趁早，趁早是种美德。这句也是台词。大概。' },
    { id: 'L_DIG_111_forgot', speaker: 'boss', emotion: 'panic', text: '够了！我受够了这无聊的缠……（摆出架势，忘了接下去，硬撑）……姿态！对！姿态！' },
    { id: 'L_DIG_112_forgot', speaker: 'boss', emotion: 'panic', text: '这就是我的全……（愣住）……力。……我刚才是不是只使了七成？你看见了什么？什么都别说，我重来。' },
    { id: 'L_DIG_113_forgot', speaker: 'boss', emotion: 'shaky', text: '（低声）剑……剑尖抬起来……（对自己说）抬起来没有？……没有。……剪影完了。' },
    { id: 'L_DIG_114_forgot', speaker: 'boss', emotion: 'panic', text: '黑暗终将吞噬一切——包括……（被自己的气势噎住）……包括我下一句台词。这句也不算。' },
    { id: 'L_DIG_115_forgot', speaker: 'boss', emotion: 'panic', text: '最后问一次：你，准备好迎接你的……（长久的沉默）……我忘了。真的忘了。来，你打我一拳，我清醒一下。' },
    { id: 'L_DIG_105_free', speaker: 'boss', emotion: 'nervous', text: '（叹气）我紧张。对，魔王也会紧张。现在你知道了，满意了？' },
    { id: 'L_DIG_109_free', speaker: 'boss', emotion: 'nervous', text: '剑在抖。你看到了吧。……我太想赢了。不是想赢你——是想赢回"我还能演好"这件事。' },
    { id: 'L_DIG_112_free', speaker: 'boss', emotion: 'nervous', text: '（疲惫）其实我根本不在乎你打不打得过我。我在乎的是……刚才那句台词，你有没有听到。' },
    { id: 'L_DIG_115_free', speaker: 'boss', emotion: 'nervous', text: '（放下剑）我背了一个月的词。刚才……全忘了。……好笑吧。一个魔王，怕忘词。' },
  ],

  // ============ TRG — 悲情独白（02 §4.3：15 主行 + 15 忘词 + 3 自由发挥） ============
  TRG: [
    { id: 'L_TRG_201', speaker: 'boss', emotion: 'calm', text: '你来了。……我就知道你会来。所有人都说"别怕，他不会来"——可你来了。' },
    { id: 'L_TRG_202', speaker: 'boss', emotion: 'calm', text: '三百年前，我也曾经是个人类。有名字，有家人，有一盆养不死的绿萝。' },
    { id: 'L_TRG_203', speaker: 'boss', emotion: 'calm', text: '后来我变成了魔王。没有人问我愿不愿意。就像没有人问你，愿不愿意成为勇者。' },
    { id: 'L_TRG_204', speaker: 'boss', emotion: 'calm', text: '我们都被写进了同一个故事，只是你拿的是剑，我拿的是台词本。' },
    { id: 'L_TRG_205', speaker: 'boss', emotion: 'calm', text: '（停顿）抱歉，开场白有点长。我攒了三百年，让我说完。' },
    { id: 'L_TRG_206', speaker: 'boss', emotion: 'nervous', text: '你的剑很快。……比我见过的任何一个勇者都快。这让我有点……高兴。真的。' },
    { id: 'L_TRG_207', speaker: 'boss', emotion: 'nervous', text: '王座上的日子，太安静了。安静到我能听见自己锈掉的声音。' },
    { id: 'L_TRG_208', speaker: 'boss', emotion: 'nervous', text: '其实我早就打腻了。可如果我不在这里等你，我还能在哪里？' },
    { id: 'L_TRG_209', speaker: 'boss', emotion: 'nervous', text: '（被打到踉跄）哈……好剑。这一下，够我写三行日记了。' },
    { id: 'L_TRG_210', speaker: 'boss', emotion: 'nervous', text: '别手下留情。你手下留情，我就得假装没看出来——那比挨打还疼。' },
    { id: 'L_TRG_211', speaker: 'boss', emotion: 'shaky', text: '来吧。用你全部的力量，结束这场我们都不想要的戏。' },
    { id: 'L_TRG_212', speaker: 'boss', emotion: 'shaky', text: '我会记住你的。不是因为你是勇者，是因为你在场。……有人在场的戏，才叫戏。' },
    { id: 'L_TRG_213', speaker: 'boss', emotion: 'shaky', text: '（剑尖拄地）我输了，会是笑话；我赢了，会是悲剧。……今晚我选悲剧。' },
    { id: 'L_TRG_214', speaker: 'boss', emotion: 'shaky', text: '最后一件事：如果你赢了，路过王座的时候，帮我把烛火吹了吧。它们烧了三百年了。' },
    { id: 'L_TRG_215', speaker: 'boss', emotion: 'shaky', text: '谢谢你听我说完。真的。……现在，来吧。' },
    { id: 'L_TRG_201_forgot', speaker: 'boss', emotion: 'shaky', text: '你来了。……我就知道你会来。所有人都说"别怕，他不会……"（声音哑掉）……你看，连这句话都锈了。' },
    { id: 'L_TRG_202_forgot', speaker: 'boss', emotion: 'shaky', text: '三百年前，我也曾经是个……（空茫地低头看自己的手）……绿萝。……那盆绿萝叫什么来着。' },
    { id: 'L_TRG_203_forgot', speaker: 'boss', emotion: 'shaky', text: '后来我变成了……（沉默很久）……那段词我明明记得的。……它可能不想被我念出来。' },
    { id: 'L_TRG_204_forgot', speaker: 'boss', emotion: 'shaky', text: '我们都被写进了同一个故事，只是你拿的是剑，我拿的是……（摸摸腰间，什么都没摸到）……我台词本呢？' },
    { id: 'L_TRG_205_forgot', speaker: 'boss', emotion: 'shaky', text: '（停顿）抱歉，开场白有点长。我攒了三百年……（忘词，反而笑了）……你看，攒太久的词，都发霉了。' },
    { id: 'L_TRG_206_forgot', speaker: 'boss', emotion: 'shaky', text: '你的剑很快。……比我见过的任何一个勇者都……（一道剑气扫过，头发被削掉一缕）……刚才那个不算。重来。' },
    { id: 'L_TRG_207_forgot', speaker: 'boss', emotion: 'shaky', text: '王座上的日子，太安静了。安静到我能听见自己……（沉默）……锈掉。这个词我上周刚学会的，怎么就忘了。' },
    { id: 'L_TRG_208_forgot', speaker: 'boss', emotion: 'shaky', text: '其实我早就打腻了。可如果我不在这里等你，我还能在哪……（愣住）……你等我一下，我想一下答案。' },
    { id: 'L_TRG_209_forgot', speaker: 'boss', emotion: 'shaky', text: '（被打到踉跄）哈……好剑。这一下，够我写……（在地上找笔）……我的日记笔呢。……算了，记在心里也一样。' },
    { id: 'L_TRG_210_forgot', speaker: 'boss', emotion: 'shaky', text: '别手下留情。你手下留情，我就得假装没……（顿了顿）……我没忘。这句我没忘。因为这句是真的。' },
    { id: 'L_TRG_211_forgot', speaker: 'boss', emotion: 'panic', text: '来吧。用你全部的力量，结束这场我们都不……（被自己的话绊住）……我们都不什么来着。……都不愿意承认，我们其实需要对方在场。' },
    { id: 'L_TRG_212_forgot', speaker: 'boss', emotion: 'panic', text: '我会记住你的。不是因为你是勇者，是因为你在……（停顿）……我刚才是不是说漏了什么。算了。说漏的，也是真的。' },
    { id: 'L_TRG_213_forgot', speaker: 'boss', emotion: 'panic', text: '（剑尖拄地）我输了，会是笑话；我赢了，会是悲……（一阵风吹灭了一根蜡烛，他看着它）……就它了。今晚听它的。' },
    { id: 'L_TRG_214_forgot', speaker: 'boss', emotion: 'panic', text: '最后一件事：如果你赢了，路过王座的时候，帮我把烛火吹了……（伸手护住火苗）……算了，别吹了。……我怕黑。这句也是台词。是吧。' },
    { id: 'L_TRG_215_forgot', speaker: 'boss', emotion: 'panic', text: '谢谢你听我说完。真的。……现在，来……（闭上眼睛，又睁开）……来吧。台词没了，人还在。' },
    { id: 'L_TRG_208_free', speaker: 'boss', emotion: 'nervous', text: '（轻声）我经常想，如果王座后面有一扇门，我会不会走。……答案是我不知道。这比"不会"更可怕。' },
    { id: 'L_TRG_210_free', speaker: 'boss', emotion: 'nervous', text: '别让着我。求你了。让着我，我就真的不知道自己还剩下什么了。' },
    { id: 'L_TRG_214_free', speaker: 'boss', emotion: 'nervous', text: '（沉默）烛火……其实是我自己点的。我喜欢有光。跟剧本没关系。这句你听听就好。' },
  ],

  // ============ MAD — 癫狂戏剧（02 §4.4：15 主行 + 15 忘词 + 3 自由发挥） ============
  MAD: [
    { id: 'L_MAD_301', speaker: 'boss', emotion: 'nervous', text: '啊啊——来了来了来了！心跳加速！肾上腺素！这就是——这就是活着的味道！' },
    { id: 'L_MAD_302', speaker: 'boss', emotion: 'nervous', text: '今晚的舞台，就我们两个！我，和我的观众！——哦，你，我说的是你。' },
    { id: 'L_MAD_303', speaker: 'boss', emotion: 'nervous', text: '看啊，烛火在为我颤抖！墙壁在为我低语！连我的影子都在鼓掌！——它在里面鼓掌，我看不见，但我感觉得到！' },
    { id: 'L_MAD_304', speaker: 'boss', emotion: 'nervous', text: '来吧来吧来吧！让这场战斗响一点！再响一点！让山下的村庄都听见我们的名字！——主要是我的名字。' },
    { id: 'L_MAD_305', speaker: 'boss', emotion: 'nervous', text: '剧本？什么剧本？今晚的剧本是即兴！是风暴！是——是这个词——是"精彩"！' },
    { id: 'L_MAD_306', speaker: 'boss', emotion: 'nervous', text: '躲啊！躲啊！你躲得越漂亮，我笑得越开心！这就是艺术的对决！' },
    { id: 'L_MAD_307', speaker: 'boss', emotion: 'nervous', text: '哈！这一剑我练了四百年！——什么？我今年三百岁？……时间观念，不重要！重要的是刚才那剑，帅！' },
    { id: 'L_MAD_308', speaker: 'boss', emotion: 'shaky', text: '受伤？我怎么会受伤！我——哦，我真的受伤了。没关系！伤口是勋章，勋章是道具，道具是——总之很帅！' },
    { id: 'L_MAD_309', speaker: 'boss', emotion: 'nervous', text: '你听见了吗！那个声音！是命运！命运在说：今夜，这里要有一个传说！' },
    { id: 'L_MAD_310', speaker: 'boss', emotion: 'shaky', text: '（喘息）哈哈哈哈……我有点喘。别告诉观众。观众——就是你。别告诉观众。' },
    { id: 'L_MAD_311', speaker: 'boss', emotion: 'shaky', text: '最后一幕！！！把你们——把你——的剑，交给我！我指的不是剑！我指的是——是——是高潮！！' },
    { id: 'L_MAD_312', speaker: 'boss', emotion: 'shaky', text: '灯光！——没有灯光。旁白！——没有旁白。那就……那就用我的声音填满这个房间！' },
    { id: 'L_MAD_313', speaker: 'boss', emotion: 'shaky', text: '燃烧吧！王座！——等一下，王座不能烧，我明天还要坐。燃烧吧……我的……斗志！' },
    { id: 'L_MAD_314', speaker: 'boss', emotion: 'shaky', text: '来！让我看看，是你先倒下，还是我先——我先想好下一句台词！' },
    { id: 'L_MAD_315', speaker: 'boss', emotion: 'nervous', text: '（安静了一瞬，轻声）……真的谢谢你今天来。……好！情绪转换完毕！继续打！' },
    { id: 'L_MAD_301_forgot', speaker: 'boss', emotion: 'shaky', text: '啊啊——来了来了……（太激动，一口气没接上，扶着膝盖喘）……活着的味道，呛着了。' },
    { id: 'L_MAD_302_forgot', speaker: 'boss', emotion: 'shaky', text: '今晚的舞台，就我们两……（开始掰手指）……两个，对，两个。我是怎么算出这个数的？总之很吉利！' },
    { id: 'L_MAD_303_forgot', speaker: 'boss', emotion: 'shaky', text: '看啊，烛火在为我颤抖！墙壁在为我低……（烛火真的被风吹歪了）……哇。这效果谁排的？太会了。' },
    { id: 'L_MAD_304_forgot', speaker: 'boss', emotion: 'shaky', text: '来吧来吧来吧！让这场战斗响一点！再响一点！让山下的村庄都听见我们的名……（卡住）……名字，名字，名字……你先帮我记着！' },
    { id: 'L_MAD_305_forgot', speaker: 'boss', emotion: 'shaky', text: '剧本？什么剧本？今晚的剧本是即兴！是风暴！是——（掏口袋，摸出一张皱巴巴的剧本，看了一眼，塞回去）——是"背过"。' },
    { id: 'L_MAD_306_forgot', speaker: 'boss', emotion: 'shaky', text: '躲啊！躲啊！你躲得越漂亮，我笑得越开……（笑到一半，剧烈咳嗽）……呛到口水了。艺术的对决，需要一口水。' },
    { id: 'L_MAD_307_forgot', speaker: 'boss', emotion: 'shaky', text: '哈！这一剑我练了四百年！——（掰手指数了数，陷入沉思）……不重要！重要的是刚才那剑——我刚才出剑了吗？' },
    { id: 'L_MAD_308_forgot', speaker: 'boss', emotion: 'panic', text: '受伤？我怎么会受伤！我——哦，我真的受伤了。没关系！伤口是勋……（低头看着血，晕了一下）……勋章的拼写是……我今天不拼了。' },
    { id: 'L_MAD_309_forgot', speaker: 'boss', emotion: 'shaky', text: '你听见了吗！那个声音！是命运！命运在说：今夜，这里要有一个传……（竖起耳朵）……是我肚子叫。命运今晚排了个满场，没空来。' },
    { id: 'L_MAD_310_forgot', speaker: 'boss', emotion: 'panic', text: '（喘息）哈哈哈哈……我有点喘。别告诉观……（想不起来，指了指你，又指了指自己）……保密协议。签了吗？好，那就好。' },
    { id: 'L_MAD_311_forgot', speaker: 'boss', emotion: 'panic', text: '最后一幕！！！把你们——把你——的剑，交给……（忘词，兴奋过头，原地转了一圈）……交……交……交个朋友！' },
    { id: 'L_MAD_312_forgot', speaker: 'boss', emotion: 'panic', text: '灯光！——没有灯光。旁白！——没有旁白。那就……那就用我的声音填满这个房……（嗓子劈了）……填到哪算哪吧。' },
    { id: 'L_MAD_313_forgot', speaker: 'boss', emotion: 'panic', text: '燃烧吧！王座！——等一下，王座不能烧，我明天还要坐。燃烧吧……我的……（打了两个喷嚏）……我的免疫系统！' },
    { id: 'L_MAD_314_forgot', speaker: 'boss', emotion: 'panic', text: '来！让我看看，是你先倒下，还是我先——（静默三秒）——还是我们先一起把词想好！' },
    { id: 'L_MAD_315_forgot', speaker: 'boss', emotion: 'shaky', text: '（安静了一瞬，轻声）……真的谢谢你今天来。……好！情绪转换——（忘词，索性放弃）——情绪，你自己悟吧！' },
    { id: 'L_MAD_308_free', speaker: 'boss', emotion: 'nervous', text: '（静下来）……疼。真疼。……但你看见我躲的那一下了吗？那一下，我练了很久。' },
    { id: 'L_MAD_311_free', speaker: 'boss', emotion: 'nervous', text: '（脱力）我说了很多"高潮""传说"……其实我只是怕冷场。我怕这个房间，又安静下来。' },
    { id: 'L_MAD_315_free', speaker: 'boss', emotion: 'nervous', text: '（低头）谢谢你来……我是说真的。你听见了吗？我安静下来的时候，说话是认真的。' },
  ],

  // ============ FREE — 自由发挥真实台词（02 全部 free 变体原文，出戏/自由发挥模式专用） ============
  FREE: [
    { id: 'L_FREE_001', speaker: 'boss', emotion: 'nervous', text: '（叹气）我紧张。对，魔王也会紧张。现在你知道了，满意了？' },
    { id: 'L_FREE_002', speaker: 'boss', emotion: 'nervous', text: '剑在抖。你看到了吧。……我太想赢了。不是想赢你——是想赢回"我还能演好"这件事。' },
    { id: 'L_FREE_003', speaker: 'boss', emotion: 'nervous', text: '（疲惫）其实我根本不在乎你打不打得过我。我在乎的是……刚才那句台词，你有没有听到。' },
    { id: 'L_FREE_004', speaker: 'boss', emotion: 'nervous', text: '（放下剑）我背了一个月的词。刚才……全忘了。……好笑吧。一个魔王，怕忘词。' },
    { id: 'L_FREE_005', speaker: 'boss', emotion: 'nervous', text: '（轻声）我经常想，如果王座后面有一扇门，我会不会走。……答案是我不知道。这比"不会"更可怕。' },
    { id: 'L_FREE_006', speaker: 'boss', emotion: 'nervous', text: '别让着我。求你了。让着我，我就真的不知道自己还剩下什么了。' },
    { id: 'L_FREE_007', speaker: 'boss', emotion: 'nervous', text: '（沉默）烛火……其实是我自己点的。我喜欢有光。跟剧本没关系。这句你听听就好。' },
  ],

  // ============ PANIC — 恐慌即兴补白（02 forgot 变体原文复用，忘词时 60% 概率替换） ============
  PANIC: [
    { id: 'L_PANIC_001', speaker: 'boss', emotion: 'panic', text: '报上名来。虽然……（卡壳）……这句我练过的，你等一下。' },
    { id: 'L_PANIC_002', speaker: 'boss', emotion: 'panic', text: '我劝你趁早……（忘词，决定硬接）……趁早，趁早是种美德。这句也是台词。大概。' },
    { id: 'L_PANIC_003', speaker: 'boss', emotion: 'panic', text: '最后问一次：你，准备好迎接你的……（长久的沉默）……我忘了。真的忘了。来，你打我一拳，我清醒一下。' },
    { id: 'L_PANIC_004', speaker: 'boss', emotion: 'panic', text: '（停顿）抱歉，开场白有点长。我攒了三百年……（忘词，反而笑了）……你看，攒太久的词，都发霉了。' },
    { id: 'L_PANIC_005', speaker: 'boss', emotion: 'panic', text: '别手下留情。你手下留情，我就得假装没……（顿了顿）……我没忘。这句我没忘。因为这句是真的。' },
  ],

  // ============ SELFDOUBT — 自我怀疑替换句（失格后首句 30% 替换；02 原文） ============
  SELFDOUBT: [
    { id: 'L_SELFDOUBT_001', speaker: 'boss', emotion: 'nervous', text: '（沉默良久）我走位……真的像老太太吗？' },
    { id: 'L_SELFDOUBT_002', speaker: 'boss', emotion: 'nervous', text: '手在抖……连你都看出来了。' },
    { id: 'L_SELFDOUBT_003', speaker: 'boss', emotion: 'nervous', text: '剑在抖。你看到了吧。……我太想赢了。不是想赢你——是想赢回"我还能演好"这件事。' },
    { id: 'L_SELFDOUBT_004', speaker: 'boss', emotion: 'nervous', text: '（把档案轻轻合上）演得……很差吗？……不对。你是怎么看出来这是演的？' },
  ],

  // ============ EVAL — 自评反应（02 §6.1 五星自评 + §6.2 日记提示） ============
  EVAL: [
    { id: 'L_EVAL_001', speaker: 'boss', emotion: 'nervous', text: '一星。……烂透了。忘词三次，披风踩了两次，最后还摔了个四脚朝天。观众都替我省蜡烛钱了。' },
    { id: 'L_EVAL_002', speaker: 'boss', emotion: 'nervous', text: '两星。比最差的预期好一点——好比我以为会忘词四次，结果只忘了三次。进步，是有的。渺茫的进步。' },
    { id: 'L_EVAL_003', speaker: 'boss', emotion: 'calm', text: '三星。中规中矩。没有掌声，也没有嘘声。这个房间像一块巨大的……等回声的石头。' },
    { id: 'L_EVAL_004', speaker: 'boss', emotion: 'calm', text: '四星。有几段，我自己都起鸡皮疙瘩了。真的。……但最后那个收尾，还差一点。差一点"被记住"。' },
    { id: 'L_EVAL_005', speaker: 'boss', emotion: 'calm', text: '五星。……我演得很开心。不是"演得好"，是开心。这好像是第一次，这两件事分开。' },
    { id: 'L_EVAL_006', speaker: 'boss', emotion: 'calm', text: '（翻开日记）今天的最后一页。……想写点什么吗？写给自己看的那种。' },
    { id: 'L_EVAL_007', speaker: 'boss', emotion: 'calm', text: '笔在手里。王座在屁股下面。没有借口了。写吧。' },
  ],

  // ============ P5STAR — 玩家 5 星特殊台词（02 §11 playerrate.star5.reply.01，GDD 原文） ============
  P5STAR: [
    { id: 'L_P5STAR_001', speaker: 'boss', emotion: 'nervous', text: '……你为什么要鼓励一个要杀你的人？' },
  ],

  // ============ END_N — 正常结局谢幕（02 §8.1 curtain，3 行） ============
  END_N: [
    { id: 'L_END_N_001', speaker: 'boss', emotion: 'calm', text: '（玩家离开后，对空无一人的门口鞠躬）感谢观看。这场演出，由我一人——不对，由我们共同完成。' },
    { id: 'L_END_N_002', speaker: 'boss', emotion: 'calm', text: '（直起身，对着空房间）明天见。……就算明天没有人来，我也会先到这里。' },
    { id: 'L_END_N_003', speaker: 'boss', emotion: 'calm', text: '（吹熄最后一根蜡烛，轻声）谢幕。……下一场，我想演得好一点。' },
  ],

  // ============ END_H — 隐藏结局链（02 §7 全树 18 行；STRETCH_FLAGS.hiddenEnding=false 时不可达） ============
  END_H: [
    { id: 'L_END_H_001', speaker: 'boss', emotion: 'nervous', text: '（坐在王座上，没有站起来）……今天，我不想打了。' },
    { id: 'L_END_H_002', speaker: 'boss', emotion: 'nervous', text: '你可以砍了我。砍了我，也算通关——但我今天不想演了。' },
    { id: 'L_END_H_003', speaker: 'boss', emotion: 'nervous', text: '（抬头看你）你走吧。或者……你留下来，我们说说话。这不在剧本里。但今晚，它最大。' },
    { id: 'L_END_H_004', speaker: 'boss', emotion: 'nervous', text: '你为什么一定要杀我？', duration: 3 },
    { id: 'L_END_H_005', speaker: 'boss', emotion: 'nervous', text: '是因为游戏里写着我"应该"被杀吗？还是因为，你其实也不想打？' },
    { id: 'L_END_H_006', speaker: 'boss', emotion: 'calm', text: '我猜你是好人。好人一般都很累。' },
    { id: 'L_END_H_007', speaker: 'boss', emotion: 'nervous', text: '如果我说"我不当魔王了"，你手里的剑，会放下来吗？' },
    { id: 'L_END_H_008', speaker: 'system', text: '你放下剑，说："……我也累了。"' },
    { id: 'L_END_H_009', speaker: 'boss', emotion: 'calm', text: '（长久的沉默）……嗯。' },
    { id: 'L_END_H_010', speaker: 'boss', emotion: 'calm', text: '那我们就坐一会儿吧。不用打，不用演，不用当勇者，不用当魔王。' },
    { id: 'L_END_H_011', speaker: 'boss', emotion: 'calm', text: '（把剑插回地面，坐在王座台阶上）这房间其实挺大的。两个人坐，也不挤。' },
    { id: 'L_END_H_012', speaker: 'boss', emotion: 'calm', text: '烛火是我点的。你可以随便看。……不收费。' },
    { id: 'L_END_H_013', speaker: 'boss', emotion: 'calm', text: '（你们并肩坐着。画面渐暗）……晚安，挑战者。晚安，观众。晚安，我。' },
    { id: 'L_END_H_014', speaker: 'system', text: '第二天，勇者没有来。第三天也没有。王座上多了一杯茶，两把椅子。' },
    { id: 'L_END_H_015', speaker: 'boss', emotion: 'nervous', text: '（沉默片刻）……是啊。你也是被写进故事里的人。' },
    { id: 'L_END_H_016', speaker: 'boss', emotion: 'nervous', text: '那就来吧。这次我认真陪你打完。不带剧本的那种认真。' },
    { id: 'L_END_H_017', speaker: 'boss', emotion: 'nervous', text: '（战至最后一击，无论胜负）不管输赢——今天，你让我不用一个人演完。谢谢。' },
    { id: 'L_END_H_018', speaker: 'boss', emotion: 'calm', text: '你不是我的观众。你是我的对手。这两个词，我今晚终于分得清了。' },
  ],
};
