// core/data/lines.ts — 对白池（剧本台词 / 恐慌补白 / 自疑 / 系统）

import type { DialogueLine } from '../types';

export const LINE_POOLS: Record<string, DialogueLine[]> = {
  dignity: [
    { id: 'L_DIG_101', text: '诸位……欢迎来到最后的谢幕。', speaker: 'boss', emotion: 'calm' },
    { id: 'L_DIG_201', text: '我这一生，都在等一句掌声。', speaker: 'boss', emotion: 'nervous' },
    { id: 'L_DIG_301', text: '反派的价值，是被记住。', speaker: 'boss', emotion: 'nervous' },
    { id: 'L_DIG_302', text: '那么——帷幕落下吧。', speaker: 'boss', emotion: 'calm' },
    { id: 'L_DIG_101b', text: '这间大厅，曾坐满为王座而来的人。', speaker: 'boss', emotion: 'calm' },
    { id: 'L_DIG_201b', text: '披风是新的，剑是旧的。', speaker: 'boss', emotion: 'nervous' },
    { id: 'L_DIG_301b', text: '没有人记得退场的配角。', speaker: 'boss', emotion: 'shaky' },
    { id: 'L_DIG_302b', text: '谢幕，也要谢得漂亮。', speaker: 'boss', emotion: 'calm' },
  ],
  tragic: [
    { id: 'L_TRA_101', text: '我的王座，是用误会堆成的。', speaker: 'boss', emotion: 'nervous' },
    { id: 'L_TRA_201', text: '他们以为我是魔王，其实我只是怕黑。', speaker: 'boss', emotion: 'shaky' },
    { id: 'L_TRA_301', text: '如果今晚是最后一幕……请别走。', speaker: 'boss', emotion: 'shaky' },
    { id: 'L_TRA_302', text: '我哭完了。轮到你们了。', speaker: 'boss', emotion: 'calm' },
    { id: 'L_TRA_101b', text: '这柄剑，从没真正伤过任何人。', speaker: 'boss', emotion: 'nervous' },
    { id: 'L_TRA_201b', text: '台下为什么……这么安静。', speaker: 'boss', emotion: 'shaky' },
    { id: 'L_TRA_301b', text: '一个人排练的台词，全都忘了。', speaker: 'boss', emotion: 'panic' },
    { id: 'L_TRA_302b', text: '至少，结局要由我来选。', speaker: 'boss', emotion: 'calm' },
  ],
  mad: [
    { id: 'L_MAD_101', text: '哈哈哈哈——欢迎！我的提线木偶们！', speaker: 'boss', emotion: 'shaky' },
    { id: 'L_MAD_201', text: '焦虑？那是本王的加冕礼！', speaker: 'boss', emotion: 'panic' },
    { id: 'L_MAD_301', text: '今晚没有剧本！只有即兴！', speaker: 'boss', emotion: 'panic' },
    { id: 'L_MAD_302', text: '我疯了吗？也许吧——但你们在看！', speaker: 'boss', emotion: 'panic' },
    { id: 'L_MAD_101b', text: '倒数十秒，英雄登场！哈？没人来？', speaker: 'boss', emotion: 'shaky' },
    { id: 'L_MAD_201b', text: '笑声是最短的剑。来！', speaker: 'boss', emotion: 'panic' },
    { id: 'L_MAD_301b', text: '弹幕！赐我一点声音！', speaker: 'boss', emotion: 'panic' },
    { id: 'L_MAD_302b', text: '谢幕？我偏要砸了这幕！', speaker: 'boss', emotion: 'panic' },
  ],
  panic: [
    { id: 'L_PANIC_01', text: '……台、台词是什么来着。', speaker: 'boss', emotion: 'panic' },
    { id: 'L_PANIC_02', text: '别、别盯着我看啊！', speaker: 'boss', emotion: 'panic' },
    { id: 'L_PANIC_03', text: '那个……空调是不是有点大声。', speaker: 'boss', emotion: 'panic' },
    { id: 'L_PANIC_04', text: '我是谁……我在演什么……', speaker: 'boss', emotion: 'panic' },
    { id: 'L_PANIC_05', text: '求求了，谁给我递一句词。', speaker: 'boss', emotion: 'panic' },
  ],
  selfDoubt: [
    { id: 'L_SELFDOUBT_01', text: '我……真的配站在这吗。', speaker: 'boss', emotion: 'shaky' },
    { id: 'L_SELFDOUBT_02', text: '他们是不是在笑我。', speaker: 'boss', emotion: 'shaky' },
    { id: 'L_SELFDOUBT_03', text: '今天观众比昨天多……更害怕了。', speaker: 'boss', emotion: 'shaky' },
  ],
  system: [
    { id: 'L_SYS_01', text: '直播间：观众已连接。', speaker: 'system' },
    { id: 'L_SYS_02', text: '检测到摄像头开启。', speaker: 'system' },
    { id: 'L_SYS_03', text: '录制中……一切都会被记住。', speaker: 'system' },
    { id: 'L_SYS_04', text: '新观众正在进入直播间。', speaker: 'system' },
    { id: 'L_SYS_05', text: '今晚的直播话题：#反派谢幕 #焦虑现场', speaker: 'system' },
    { id: 'L_SYS_06', text: '弹幕密度较高，请注意仪态。', speaker: 'system' },
  ],
  intro: [
    { id: 'L_INTRO_01', text: '……奇怪。明明只是排练。', speaker: 'boss' },
    { id: 'L_INTRO_02', text: '是谁打开了摄像头？', speaker: 'boss' },
    { id: 'L_INTRO_03', text: '嘘——观众上线了。', speaker: 'system' },
  ],
  ending: [
    { id: 'L_END_01', text: '……掌声。原来真的会有掌声。', speaker: 'boss' },
    { id: 'L_END_02', text: '谢谢你们，看完一个反派的自尊。', speaker: 'boss' },
    { id: 'L_END_03', text: '明天……还来吗？', speaker: 'boss' },
  ],
};
