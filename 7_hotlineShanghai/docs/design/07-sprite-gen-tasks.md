# 07 · Sprite 图片生成任务清单(2026-08-09 v3.1 改:走几何光场 + 程序化 sprite)

> **v3.1 重要变更(2026-08-09)**:
> - 路径从"v2 M1-M3 placeholder + 8 方向帧"改为"v3.1 几何光场 + 程序化 sprite";
> - **生成图 = 美术参考**(进 `references/`,不进 repo 主线);
> - **最终 sprite 全部程序化**(`src/core/data/sprites.ts`,B26 程序化派生 walk 4 帧 + 突刺帧);
> - 8 方向帧明确**推迟到 M4.6 / M5**,M1-M3 placeholder 用对称 sprite + facingAngle 旋转;
> - 加 `flashlight_patrol` 灯锥的"灯芯亮区"要求(09 §5 巡逻手电);
> - 历史敏感度人审门扩到 sprite / 文案 / 任务文本 / 截图标题统一标准 → [`17-historical-sensitivity-checklist.md`](17-historical-sensitivity-checklist.md)。
>
> 与本文档冲突以本文档 v3.1 为准(老版本整体废弃)。

## 1. 全局约束(每条 prompt 都要带)

- 顶视角(top-down,几乎纯俯视,俯角约 75-85°),角色面朝上时脸可见。
- 硬边像素画,16×16 网格感,无渐变/无抗锯齿,纯色块,高饱和(riso 感)。
- 每角色 2 帧以上 idles + 4 帧走/跑循环(v3.1 placeholder 阶段用对称 sprite + facingAngle 旋转,8 方向帧推迟到 M4.6/M5)。
- 调色板:核心 12 色硬约束(近似 hex,允许 ±10%):`PAL_INK #0a0910` / `PAL_PLASTER #d4c8a8` / `PAL_RUST #7a2a1c` / `PAL_TEAL #2a8a7a` / `PAL_LANTERN #e54a1a` / `PAL_NEON #ff2a44` / `PAL_PAPER #e8dca0` / `PAL_IVORY #f5e6b8` / `PAL_JADE #2a9a6a` / `PAL_STEEL #4a4a52` / `PAL_MUZZLE #ffaa3a` / `PAL_BLOOD #d8201a`(完整表见 TDD §4.4.8 + `src/core/data/palette.ts`)。
- 1937 上海地下抵抗/占领军制服,不出现现代装备、不出现日文假名或军国符号、不出现血腥内脏(击杀反馈用色块/喷溅,不用解剖细节)。
- 透明背景 PNG,每帧单独一张或规整 8×8 网格 sheet,无边框无文字。

## 2. 角色任务(先做这 6 张 sheet:玩家 2 张 + 4 敌人各 1 张)

1. **玩家"线人"**:米色蒙面 + 深色风衣 + 灯笼红围巾;**对称 sprite 2 帧 idles + 程序化派生 walk 4 帧 + 突刺帧**;
   手持小刀/驳壳枪各一套(2 张 sheet,共 2 任务)。
2. **占领军(soldier)**:军绿钢盔 + 右肩袖章红条;**对称 sprite + walk 4 帧程序化派生**;持步枪。
3. **巡捕(policeman)**:深蓝制服 + 白手套;**对称 sprite + walk 4 帧程序化派生**;持手枪。
4. **特工(spy)**:便装大衣 + 圆帽 + 暗色围巾;**对称 sprite + walk 4 帧程序化派生**;持手枪。
5. **特务长(BOSS)**:军官大衣 + 勋章 + 冷色脸;**16×16 网格不变**(与 `05 §3.4` / TDD §3.5 一致;BOSS 识别靠警示描边 + 血条,不靠体积);
   **对称 sprite + walk 4 帧程序化派生 + 程序化派生 attack 2 帧**。

每个角色额外补 3 个单帧:攻击突刺 1(v3.1 程序化派生 lungeFrame)、受击 1、死亡(倒地 45°)1。

> **v3.1 关键**:`src/core/data/sprites.ts` 已实现 `strideFrame()` + `lungeFrame()`(B26 修复),从 base sprite 程序化派生 4 帧 walk + 1 帧突刺。**生成图只给 base 1 帧 idle** 就够,其余 5 帧代码派生,避免 AI 工具生成 6 帧时帧间不一致。

## 3. 家具/物件任务(12 种,每种 1 张)

沙发(3×2 tile)、圆桌(2×2)、床(2×2)、书架(2×3)、盆栽(1×2)、冰箱(2×2)、
茶几(2×2)、麻将桌(2×2)、沙袋掩体(1×1)、**油灯(1×1)⭐**、**霓虹招牌(1×2)⭐**、**探照灯(1×1)⭐**。

**⭐ = v3.1 关键**:油灯 / 霓虹 / 探照灯必须给"灯芯亮区"位置(单像素标记 `L`)— 这是几何光场 `lightAt(worldPos)` 计算的核心数据,灯芯错位 = 整个关卡光场错乱。

要求:与玩家 sprite 同一 16 格密度;家具硬边色块;油灯/霓虹/探照灯给出"灯芯亮区"位置(便于后续叠加 RC 发射点)。

## 4. 特效/反馈任务(3 张,可选)

1. 子弹弹道:3 帧(枪口出膛 / 飞行 / 消失)细线 + 火花。
2. 击杀喷溅:2 帧扇形血溅(纯色块,尺寸 ≤ 8×8)。
3. 死亡图标:旋转菱形/三角(48×48,带 4 向箭头),用于"尸体被击飞方向"提示。

## 5. v3.1 巡逻手电 `flashlight_patrol`(09 §5 + TDD §4.4.4 新增)

> 09-§5 落地新敌人 archetype:`flashlight_patrol`(`FLASHLIGHT_CONE_ARC_DEG=50` + `FLASHLIGHT_SWEEP_HZ=0.6` + 9 面具 mask `darkwatch` 主题)。**M1.0 spike 房间必出此 archetype**。

- **生成图新增要求**:`flashlight_patrol` 灯芯亮区单像素标记 `L` + **手电方向示意**(8 方向,3 帧旋转)
- **手电 cone 颜色**:暖白 `#ffe6b8`(区别于油灯 `#ffc966` 暖黄、霓虹 `#3ad8ff` 冷青)
- 灯被拆 = 退回 8u / 60° 几何锥(等同 soldier 默认视野)
- 灯锥不写血溅 / 死亡喷溅(v3.1 反馈:灯锥仅是几何)

## 6. 交付格式

- 每张 sheet 附一个 `grid.txt`:16×16 字符网格 + 调色板映射(直接可转 char-grid)。
- 若工具不能输出字符网格,输出 PNG 后由人工/代码按最近色映射到 16 色调色板。
- **保存路径**(v3.1 改):
  - 历史参考图进 `references/sprite-gen-v2-archive/`(已存在,v2 M1-M3 placeholder 阶段产物)
  - **新生成图**进 `references/sprite-gen/<room-id>/<role-id>.png` 或 `references/sprite-gen-vaporwave/<room-id>/<role-id>.png`(M2+ zone 区分)
  - **不**进 repo 主线(只是美术参考,不影响构建)

## 7. 历史敏感度人审门(2026-08-09 v3 必读)

> 详细统一 checklist 见 [`17-historical-sensitivity-checklist.md`](17-historical-sensitivity-checklist.md);本文档只列 sprite 特定条目。**17 文档是所有美术 + 文案 + 任务文本 + 截图标题的统一人审门**。

- [ ] 不出现种族 / 民族刻板造型(脸型、肤色、体型不得带"某族"暗示),只按职能区分(占领军 / 伪警 / 特务 / 平民)
- [ ] 占领军制服 = 无国别徽记的通用军装;不得出现日文假名、旭日 / 军国符号、军旗、任何现实军队番号
- [ ] 不出现现代装备(突击步枪 / 战术背心 / 对讲机 / 夜视仪 / 激光指示器)
- [ ] 不出现血腥内脏 / 断肢 / 解剖细节(击杀反馈只用色块喷溅)
- [ ] 平民 = 中性化 1937 上海市井造型(长衫 / 旗袍 / 黄包车),不出现贬义标签或丑化
- [ ] BOSS 命名与文案只用职能称谓(占领军长官 / 巡捕长),不写真实人名 / 现实原型
- [ ] 交付物含 `grid.txt` + 本 checklist,任一缺失即打回

**签核**:___ Mavis(日期)___

## 8. v3.1 状态

| 项 | 状态 |
|----|------|
| 07 路径对齐 v3.1 几何光场 | ✅ 2026-08-09 改 |
| 8 方向帧明确推迟 M4.6/M5 | ✅ 2026-08-09 改 |
| 程序化派生 walk 4 帧 + 突刺帧 | ✅ `src/core/data/sprites.ts` 已实现 |
| 12 色调色板硬约束 | ✅ 2026-08-09 改(原 8 色 → 12 色) |
| flashlight_patrol 灯芯要求 | ✅ 2026-08-09 加 |
| 16 张 v2 sprite-gen 归档 | ✅ `references/sprite-gen-v2-archive/` |
| 历史敏感度统一 17 文档 | 🕐 2026-08-09 立 |
