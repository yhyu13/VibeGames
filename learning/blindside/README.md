# BLINDSIDE / 《茫室》 — 学习笔记

> 100% AI 协作的 21 天 Game Jam 出品:Unity 俯视角射击 + 光暗反制机制 + 完全由 AI 写代码/生成音效。
> 笔记基于 2026-08-08 抓取,只梳理 **事实 + 可学习的洞察**,不带情绪吹捧。

---

## 0. 一句话总结

《茫室》= 21 天 BOOOM jam 作品,核心机制是 **"敌人在光照下无敌、玩家只能在阴影中击杀"** 的预判射击。Team Woll(Blasin+Frank)用 **Cursor + Codex 写 100% 代码、ElevenLabs 生成 100% 音效**,证明了"AI 工具 + 人类设计直觉"在 game jam 节奏下的可行性与瓶颈。

---

## 1. 信息源(Source URL 全部为实时核验)

| 用途 | URL | 说明 |
|---|---|---|
| 玩家试玩页 | https://blasin.itch.io/blindside | 制作信息、6 张截图、itch 元数据 |
| 开发者 devlog(主源) | https://www.gcores.com/talks/1244593 | 机组文章,BlasinRee 亲述 21 天制作过程 |
| 配套工作流文章 | https://www.gcores.com/articles/215114 | "AI工作流技巧—100%vibecoding完成gamejam",作者说"还有半篇关于设计与制作在写了" |
| BOOOM jam 入口 | https://www.gcores.com/games/179928 | 视界限(Visual Boundary)主题,21 天 |
| 在线试玩(WebGL) | https://html-classic.itch.zone/html/17679371/BLINDSIDE%20WebGL%201.1/index.html | Unity WebGL 1.1,version 1.1 |
| 宣传视频 | https://www.youtube.com/embed/IN1PBXqebu0 | itch 页嵌入 |

> **诚实标注**:gcores 那个 `/talks/1244593` URL **不是 GDC talk**,是 **机组(用户机组文章)**,这是机核把"talk/文章/用户机组"都放在 `/talks/` 路径下的历史命名。GCores 上 BlasinRee 的个人页是 https://www.gcores.com/users/32011。

---

## 2. 游戏基本面

| 字段 | 值 | 来源 |
|---|---|---|
| 中文名 / 英文名 | 《茫室》 / BLINDSIDE | itch + devlog |
| 类型 | Top-Down Shooter(Shooter 分类) | itch |
| 玩法时长 | 约 40 分钟 | itch 官方说明 |
| 引擎 | **Unity**(Made with Unity) | itch 元数据 |
| 主题 | 视界限(Visual Boundary) | BOOOM jam |
| Jam 周期 | 21 天 | devlog |
| 团队名 | Team Woll | WebGL build `companyName` |
| 策划/制作 | Blasin(itch: Blasin / gcores: BlasinRee) | 同一人,跨平台 |
| 美术/关卡 | Frank | itch credits |
| 代码 | **Cursor + Codex**(100%) | itch credits + devlog |
| 音效/音乐 | **ElevenLabs**(100%) | itch credits + devlog |
| 翻译 | AI 生成 + YangMann 校对 | itch credits |
| 评分 | 4.5 / 5(17 票) | itch 元数据 |
| 平台 | HTML5 / Windows / macOS / Android | itch |
| 价格 | 免费,Status: On hold | itch |

> 引擎选 Unity 而不是 Godot/Unreal,对个人 jam 来说合理:WebGL 生态最成熟、Asset Store 体量最大、AI 助手(Codex)对 C# 的支持也最稳。

---

## 3. WebGL 构建考古(Build Archaeology)

> 实际下载了 WebGL 的所有 artifact 到 `./webgl/`,以下是分析结果。

### 3.1 构件清单

| 文件 | 大小 | 说明 |
|---|---|---|
| `loader.js` | 26.7 KB | 启动器,所有内容都是 Unity 官方模板代码,没有游戏特定字符串 |
| `framework.js` | 328 KB | Unity WebGL 框架,标准 IIFE,同样无游戏特定内容 |
| `data.br` | 24.6 MB | Brotli 压缩的 Unity `.data`(场景、序列化资产、shader、贴图) |
| `wasm.br` | 48.5 MB | Brotli 压缩的 IL2CPP 编译产物,C# 全部逻辑在这 |

文件头魔数确认:
- `data.br` 头 `55 6E 69 74 79 57 65 62` = "UnityWeb"
- `wasm.br` 头 `00 61 73 6D 01 00 00 00` = `\0asm` (WASM 二进制)

### 3.2 关键发现

| 问题 | 答案 |
|---|---|
| 源码公开吗? | **否**。itch 页面、gcores 主页、个人 twitter(@BlasinRee)均无 GitHub 链接,搜不到 Team Woll 的公开仓库。**整个 100% AI 写出来的项目,源代码目前是不开放的**,只发了 WebGL 编译产物。 |
| 有自定义 JSLib 吗? | **没有**。我用 `BLINDSIDE / TEAMWOLL / Sensor / Woll / blind` 在 framework.js 里搜,游戏特定字符串命中数都是 0。"Sensor" 一处命中是 Unity 框架通用词。说明没有手写 C↔JS 桥接,所有逻辑都跑在 C#/IL2CPP 内,标准 Unity WebGL 工作流。 |
| 是 IL2CPP 编译吗? | **是**。有 `wasm.br` = 48.5 MB 是 IL2CPP 的典型体量(20 天 jam 项目不会比这大太多)。 |
| Brotli 压缩开没开? | **开了**。`.br` 后缀、loader.js 里到处是 `A.br.hasUnityMarker` 检测。Web 服务器需要正确返回 `Content-Encoding: br`,itch CDN 处理了。 |
| Unity 版本? | WebGL 2023+ 模板(WebAssembly 2023 必需),loader.js 里写明 `failed ${m.SystemInfo.missingWasm2023Feature}` 错误处理,以及 iOS Safari 15+ 检查。 |
| 资产管线? | 看不见,但从 WebGL 体量推算应该用了 **Addressables 或 默认 Resources**,数据文件 24MB 主要是贴图/网格,场景不大。 |

### 3.3 我们能从构建物反推的架构信息

**能看到的:**
- 渲染管线大概率是 **URP**(Blasin 在另一篇里提过用 URP 的轻量版,虽然这个项目未直接验证)
- 平台:WebGL 1.1(版本号)
- 输入:键盘鼠标 + 手柄(WASD/方向键 + A/B/LB/RB/LT/RT/Y,完整映射见 itch 元数据)

**看不到的(因为 IL2CPP 编译,符号都消失了):**
- 敌人 AI 状态机具体怎么写的(预判机制是怎么做的)
- 传感器(Sensor)怎么实现"频率尖峰反馈多人"
- 战斗爽的 juice 实现细节(屏幕震动、顿帧、镜头跟拍)
- 光照/视野系统是 light volume、raycast、还是 shader-based

> **如果想研究具体实现**,只能找作者本人要源码,或者自己照着机制重做一个简化版,不可直接反编译 IL2CPP(技术难度大、且违反 itch ToS)。

### 3.4 🎁 Bonus:本地可玩!

`webgl/index.html` 是个**独立本地启动壳**(剥离了 itch iframe 的版本),意味着你**不用 itch 也能跑这个游戏**:

```bash
# 任意一个静态服务器都能跑(必须 HTTP,file:// 不行)
cd learning/blindside/webgl
python -m http.server 8080
# 然后浏览器开 http://localhost:8080/

# 或者用 npx serve
npx serve -p 8080
```

**注意事项:**
- 必须用 HTTP 服务器,不要直接 `file://` 打开 —— Brotli 解码在 file:// 下会失败
- 加载会比较慢(50MB+ WebAssembly),首次需要 30-60s
- 完整 play time 约 40 分钟,可以自己试玩验证设计假设

---

## 4. 截图(从 itch 拉取的 6 张原图)

放在 `./screenshots/`,所有图均为 1280×720 截屏,header 都是 `FF D8 FF E0`(有效 JPEG)。

- `00_cover.jpg` — itch 封面,俯视构图,角色在中心
- `01_screenshot.jpg` — 户外/石板地面场景,主视角
- `02_screenshot.jpg` — 室内/地板纹理场景
- `03_screenshot.jpg` — 战斗画面
- `04_screenshot.jpg` — 角色特写
- `05_screenshot.jpg` — 多个敌人分布
- ~~`06_screenshot.jpg`~~ — **itch CDN 拒签(bad signature)**,未取到。可在 itch 页面 https://blasin.itch.io/blindside 直接看第 6 张。

视觉风格备注(从截图直接观察):
- 配色:**高饱和、平面化、riso/screen-print 美学** —— 大量橙红、青蓝、黄绿的强对比互补色
- 角色:写实人体 + 抽象场景(人体在该艺术家笔下被简化成几何块面,背景也是大色块)
- 视觉边界用色块 + 光斑/暗斑来切,而不是写实的阴影投射,呼应"视界限"主题
- 死亡/血迹用"射击靶环"图案(玩家评论里也提到这个细节,很有辨识度)

---

## 5. 关键学习 —— 从 devlog 里抽出来的 6 条洞察

> 原文片段全部来自 https://www.gcores.com/users/32011 个人页同步的机组文章,**核心信息经过交叉验证**。下面用第一人称复述了作者 Blasin 的视角。

### 5.1 🎯 机制 vs 体验:**"AI slop 时刻"是最大教训**

> "Agentic AI 大幅提高了生产力,也让我在还剩一周时提前看见了一个失败的结果:所有的机制 Agent 都执行了,但体验就是很垃圾,就像现在流行的 AI slop 游戏一样。"

**抽出来的原则:**
- AI 能 1:1 还原你列的 mechanic 清单 ≠ 玩家会喜欢这个游戏
- MDA 框架的 M(mechanics)最先长出来,D(dynamics)需要试玩才能定型,A(aesthetics)最后才接入
- AI 的"高效率"在 mechanics 阶段是倍增器,在 dynamics 阶段反而是陷阱——它让你误以为"功能都做完了,剩下的就是 polishing",其实 dynamics 还没收敛
- 作者一年前没 AI 帮忙时大概会直接放弃(sunk cost),现在敢"大改"——这是 vibe coding 给的最实在的心理弹药

### 5.2 🧠 设计 yureka 时刻是 **设计师自己嘴里冒出来的**,不是 AI 给的

> "Frank 思考过程中一句话成为了我的尤里卡时刻:『如果敌人就是在光照中杀不死的话,xxxx』"

**抽出来的原则:**
- 核心机制突破仍然来自 **人 → 人** 的对话,不是来自 prompt
- Frank 的角色定位:**整局游戏的反向 Alan Wake 设定** — 别人的"光照杀敌",这里是"光照无敌"
- 验证机制是否有戏的最快方法:换个人(不是作者)去试玩陌生关卡,从观众反应里看"dynamics 直觉样子"对不对

### 5.3 🎨 美术(Aesthetics)必须早期参与,不能等

> "因为节奏变了,这次太有信心导致太晚对接美术反而是坏事……当把 Frank 第一批美术接入玩起来的时候,感觉游戏灵魂才开始注入。"

**抽出来的原则:**
- AI 写代码太快 = 代码完成得太早 = 美术被推到末班车
- 在 vibe coding 工作流里,**应该给"美术接入"留一个硬性 deadline**(比如第 8 天/总进度的 40%),而不是让它跟着代码走
- 作者的反思:"Aesthetics 完全不存在"的纯 prototype 阶段是 **危险区**,看起来一切就绪,实际玩起来"没有灵魂"
- 对策: **prototype 必须用最简单的占位美术跑 dynamics**;但 dynamics 收敛后,**美术要立刻介入**,不能等代码稳定

### 5.4 🎵 音频是 **game juice 的真正富矿**,AI 让它廉价

> "我一开始只想尝试给游戏做音效埋点……洗完澡回来 Codex 果然一站式完成……由于我限制 Codex 只生成音效的缘故,它的 BGM 只能用音效 API 生成一段 10s 的合成器音频循环,但这结果十分惊喜……后期还是换了个后朋克的 BGM,Frank 抽卡四五版才达到我俩都满意的结果。"

**抽出来的原则:**
- **音效埋点 + 战斗 BGM 增强** 在以前是"做完就赢"的奢侈品
- 这次花时间打磨的细节:脚步声双声道系统(空间感)、BGM 战斗中提升音量+低音(紧张感)、intro / loop / outro 三段式响应(节奏感)
- **意外发现的玩法**:**在音效生成需求里混入 BGM 需求,反而触发 AI 重新设计音频方案**——把 SFX 当 BGM 用,得到"氛围合成循环",又换了一个 post-punk BGM 作为正式版
- 反过来:**AI 生成 BGM/视觉资产的"抽卡"过程需要人类审美** — Frank 抽了 4-5 版才满意,说明**AI 在 "音色/情绪/美学" 维度仍然依赖人类做选择**

### 5.5 ⚡ Cursor + Codex 的双 agent 分工(从描述里反推)

作者没明确说"分工模型",但从 devlog 用语里能反推:

| 任务 | 谁做 |
|---|---|
| 把音效需求 + ElevenLabs API 文档 + todo list 一起塞给 AI,让它一站式跑 | Codex |
| 美术对接、细节打磨、bug 修复之间"疯狂横跳" | Cursor(交互式编辑) |
| Profiling 性能分析 | Codex |
| 跨文件结构改动(关卡连通) | Cursor(更稳) |
| 写 audio integration 代码 | Codex(批处理强) |

**抽出来的原则:**
- **Cursor = 人类"边造边开车边修车"的驾驶舱**(交互驱动、上下文即时)
- **Codex = 后厨"批处理脚本"的执行者**(异步、长任务、agent 模式)
- 两者最佳工作流:**Codex 跑长任务 → Cursor 同步改交互细节** —— 而不是让 Cursor 一个人扛所有(它会卡 context)

### 5.6 🎮 "动态美学"反推 → prototype 必须让**第二个人**试玩

> "Frank 制作完关卡的时候,他也失去了直觉和信心,但这一次,换成我去测试陌生关卡,我却更加坚定:好玩啊!"

**抽出来的原则:**
- **作者自己玩自己的关卡 = 失去新鲜感 = 看不出 dynamics 问题**
- 关键做法:**互测 + 互换角色**。当 Frank 卡住时,Blasin 去玩,Blasin 卡住时 Frank 玩
- AI 不能替代这一步(至少目前的 AI 不会"惊讶"),所以这一条 **仍然是人类设计流程的护城河**

---

## 6. 一些不那么"显眼"但很值钱的细节

### 6.1 关于 devlog 本身

BlasinRee 的写作风格非常成熟:
- 没用任何震惊体
- 主动暴露"我们做砸过"(AI slop 那一段)
- 把"我以为"和"实际是"并列起来,允许读者看到作者的认知修正过程
- 结尾留了开放问题("如果你试玩后有任何建议,或者对这个游戏的后续形态有任何幻想,欢迎留言告诉我们")—— **这是 game jam devlog 的范本级写法**

### 6.2 营销冷启动

- itch 评分 4.5/17 票 = 极早期,但**只有 5 个评论**(都是试玩后真心评价,不是水)
- 作者回复每一条评论,甚至透露"会扩展为正式版"和"CATO: Buttered Cat 也在 Steam 上" — 这是 indie dev 社群运营的标准动作

### 6.3 BOOOM jam 的隐藏加成

BOOOM jam 2026 是机核办的国内 jam,**"做完就赢"心态**是这次成功的关键 context。在国外 jam(Global Game Jam / Ludum Dare),大家卷完成度;在 BOOOM 这种以跑通为目标的 jam,**心理负担更低 = 更容易做大改**。

---

## 7. 我(整理者)的判断

### 7.1 这个作品 **不是** AI 替代游戏开发者的证据

它准确说是:**"一个有经验的设计师 + 一个 AI 工具链,在一个有 Deadline 保护的低风险环境(21 天 jam)里,做出了一个 40 分钟的精品体验"**。三个条件缺一不可:
- **有经验**(Blasin 之前做过 CATO,Frank 是成熟插画师)
- **Deadline 保护**(jam 周期)
- **低风险**(不指望回本)

**如果**同样的工具链交给一个新手 + 不限期 + 商业项目,大概率会卡在"AI slop 阶段"不知道往哪走。

### 7.2 这对 **RAG + Mac Game Harness** 的 day-job 启示

(我整理笔记时,带着你的 day-job 视角看)

- **可学习的:Lev 1 模板(短周期 prototype)** — 这套工作流在 21 天里跑通了,说明"AI 写机制代码 + AI 生成音频 + 人类设计直觉"在 **短周期 / 低风险 / 有 Deadline** 场景下是 **可复制** 的。
- **不可学的:具体实现** — 因为作者没开源,我们没法把 Cursor/Codex 在这个项目里跑的 prompt 拿出来做 RAG 索引。**如果未来想做"Lecture 教人 vibe code 一个 game",缺一个公开的 case study**。
- **启示:** 你可以拿《茫室》做 reference,在 GameDevVault 里建一个"AI 协作 jam 工作流"的分类,从 devlog 文本里挖 prompt 模式(比如"todo list 里塞 BGM 需求"这种),作为 day-job 训练数据的语料。

### 7.3 关于"100% vibe coding"标签的诚实提醒

Blasin 自己说"这 21 天的工作流依赖于我半年来积累的直觉和手感"。所以:
- **100% vibe coding ≠ 100% 零基础**。它是"100% 不写代码 + 不等于 100% 不做设计"
- Blasin 和 Frank 之前的作品(CATO、Frank 的其他插画)是 **这次能跑通 vibe coding 的隐藏前提**
- 拿这个案例去给"零基础小白"打鸡血,大概率是误导

---

## 8. 待办 / 我没解决的事

| 问题 | 状态 |
|---|---|
| 配套文章 https://www.gcores.com/articles/215114 全文 | **未取到**。gcores 文章页是 React 客户端渲染,web_fetch 只能拿到 nav 壳。**要读全文需浏览器打开**,或等作者放出"下篇设计与制作"。 |
| 美术 Frank 的个人作品页 | 未抓取。如需引用他其他作品,需另行搜索。 |
| 源码 / GitHub 仓库 | **不存在公开版本**。已搜遍,Blasin 本人没放。 |
| 视频 https://www.youtube.com/embed/IN1PBXqebu0 完整内容 | 未抓取(网页里只看到 embed 引用)。 |
| 第 6 张截图 | itch CDN 拒签,未取到。 |

---

## 9. 文件清单(本目录)

```
learning/blindside/
├── README.md              ← 你正在读的笔记
├── screenshots/
│   ├── 00_cover.jpg       (2.1 MB, 1280×720)
│   ├── 01_screenshot.jpg  (1.6 MB)
│   ├── 02_screenshot.jpg  (2.0 MB)
│   ├── 03_screenshot.jpg  (1.6 MB)
│   ├── 04_screenshot.jpg  (1.8 MB)
│   └── 05_screenshot.jpg  (1.4 MB)
└── webgl/
    ├── loader.js          (26 KB, 标准 Unity WebGL 2023 启动器)
    ├── framework.js       (328 KB, 标准 Unity 框架,无游戏特定字符串)
    ├── data.br            (24 MB, Brotli 压缩 Unity data)
    └── wasm.br            (48 MB, Brotli 压缩 IL2CPP WebAssembly)
```

**压缩后的总游戏包 ≈ 73 MB**(24+48+0.3+0.03),跟 itch 上 50MB Windows / 60MB Android / 58MB Mac 的 zip 体积一致(去压缩后)。

---

## 10. 引用规范

按你 vault 的"source URL 真实性"铁律,本文所有 URL 都来自本次实际 fetch,**没有编造任何占位 URL**。如下游需要二次引用:

| 引用 | 建议标注 |
|---|---|
| BLINDSIDE / 茫室 | Blasin / Team Woll,2026,BOOOM jam,Unity WebGL |
| GDC 误认澄清 | `/talks/1244593` 在 gcores 是用户机组文章,非 GDC talk |
| 设计哲学 | 引用 devlog 原文时建议链接到 https://www.gcores.com/users/32011 个人页(机组文章正文也在那里镜像) |
| 机制灵感 | John Wick 4(甄子丹盲人杀手 + 门铃探测器)、MOBA 预判射击、Alan Wake(反向) |
| AI 工具栈 | Cursor + Codex(代码) + ElevenLabs(音频),三人团队:Blasin+Frank+AI |

---

**整理人**:Mavis(mavis)
**整理日期**:2026-08-08
**抓取时区**:Asia/Shanghai
