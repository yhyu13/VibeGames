# VibeGames

一个独立网页游戏 monorepo —— 半记忆里的 Flash 经典重制、72 小时 game-jam 实验、以及纯粹的物理/图形炫技。每个项目都是独立 Vite 应用，各自带 `package.json` 与构建；没有两个游戏共享一个世界，但它们共享同一套纪律：**零运行时资源**（程序化几何、Web Audio 合成、纯 TypeScript）与 **C.A.T 架构**（平台纯净的 `core/` 被 engine 适配器和薄 React overlay 包裹）。

仓库没有根 `package.json`。想玩哪个，就进哪个目录 `npm`。

---

## 一览

| 目录 | 游戏 | 气质 | 状态 |
|---|---|---|---|
| `1/` | Alien Invader | 你是入侵者，地球是目标——而且它会反击。 | 完成 |
| `2/` | Alien Invader (zustand) | 同一场战争，换一个引擎。 | 可玩 |
| `3/` | Alien Invader (无 React) | 纯 Three.js 入侵循环。 | 可玩 |
| `4_chunbai/` | 纯白枪骑兵 Pure White Lancer | 白色机甲、黑色虚空、藏着伏击的战争进行曲。 | 活跃 |
| `5_gamejam_1/` | Boss 的焦虑 Boss Anxiety | 你是最终 Boss——你怕的不是输，是「表现不够好」。 | 已发布 |
| `6_patapon3D/` | Patapong 3D | 你是神圣鼓手；军队只服从节拍。 | Intro 展示 |
| `7_hotlineShanghai/` | 热线上海 Hotline Shanghai | Hotline Miami、1937 上海、真光物理。 | Intro 打磨完成 |
| `8_lifegame/` | 股神模拟器 Stock God Simulator | 出生彩票就是游戏机制。 | Intro 完成 |
| `9_3dplatform/` | PRISM LEDGE 棱镜断崖 | 光线追踪本身就是卖点的收集品平台跳跃。 | 仅设计文档 |
| `10_phasewalk/` | PHASEWALK 四相行者 | 四个世界像纸一样叠着；切相位就是切关卡。 | 进行中 |
| `11_blackhole/` | Kerr 旋转黑洞 | 一个逐像素光线追踪的旋转黑洞，就在你浏览器里。 | 可玩 |
| `12_ddgi/` | DDGI | 逐像素探针追踪的实时全局光照。 | 可玩 |
| `13_spysatellite/` | EYE-13 夜视卫星 | 你是那颗卫星；你从不扣扳机。 | 进行中 |
| `14_neuraltexture/` | NEURAL TEXTURE | 一张 8 维纹理 + 一个小 MLP 假扮陶瓷 SVBRDF。 | 进行中 |

---

## 各游戏简介

### 1–3. Alien Invader 系列

**这次你是入侵者。** 一艘外星战舰悬停在一颗风格化地球上空，而地球不是被动血条——它会加固基建、把轨道填满威胁，最后把核弹直直射进你的舰体。

火力只是其中一条路。轰炸间隙你可以广播宣传让人性自相残杀，或注入电脑病毒从内部瘫痪地球网络。最优雅的入侵是**解谜而非硬刚**。Roguelike：地球的境况、抗性、防御原型全部随机。

**[1 · 玩法 →](1/docs/how-to-play.md)** · **[2 · 玩法 →](2/game/docs/how-to-play.md)** · **[3 · 玩法 →](3/docs/how-to-play.md)**

### 4. 纯白枪骑兵 (Pure White Lancer)

phixcat 2008 Flash 原作的 3D 重制——纯白机甲对纯黑虚空。全 3D WASD 飞行、鼠标瞄准、锁定，还有留下 Sandevistan 式残影的加力冲刺。

Roguelite 战争进行曲：四层节点地图，你选路向上打向最终武器，而一个**未预告的中期 Boss** 可能随时撞进战斗、烧掉你留给终局的本钱。死亡带走一切，只留下路线知识。

**[玩法 →](4_chunbai/new_game/docs/how-to-play.md)**

### 5. Boss 的焦虑 (Boss Anxiety)

你演一个 RPG 的最终 Boss，坐在王座间等勇者——而你的恐惧不是输掉战斗，是**今晚的表演够不够好**。

5–8 分钟单幕，关于「被看见」。选一套脚本（庄重威严 / 癫狂戏剧 / 悲情独白），在焦虑让你的手发抖、台词卡壳的同时演完三个阶段。写三次「我不够好」解锁隐藏结局。

**[玩法 →](5_gamejam_1/docs/how-to-play.md)**

### 6. Patapong 3D

**你是神圣鼓手。** W/A/S/D 就是 PATA/PON/DON/CHAKA——踩着节拍敲鼓，串成四拍指令语法，指挥三只体素 Patapon 进攻、防御、集结，对抗 Moloch。

PBR 陶瓷大军在暖色轮廓光下陈列；连击 8/16/24 触发 Fever 慢动作；开场四拍在黑暗中唤醒军队，Moloch 咆哮回应。

**[玩法 →](6_patapon3D/docs/how-to-play.md)**

### 7. 热线上海 (Hotline Shanghai)

Hotline Miami 的一击必杀俯视角狂潮，移植到 1937 上海孤岛时期。枪火、油灯、霓虹、爆炸都是**真 2D Radiance Cascades 光源**——真正的 WebGL2 辐射场，不是假发光。

切掉中央的灯，塔楼守卫就半盲；戴着京剧面具穿过石库门弄堂；每道阴影都是物理算出来的。几何视线决定谁看见你——光纯属装饰，却是仓库里最漂亮的装饰。

**[玩法 →](7_hotlineShanghai/docs/playability.md)**

### 8. 股神模拟器 (Stock God Simulator)

大富翁式的命运与投资模拟，关于**出生彩票**——它要你「感受到」那道鸿沟，而不是被告诉。你生而为谁（Web 2.0 时代的小镇做题家），会悄悄灰掉你甚至不被允许看见的棋盘格：三格金融资源就贴在你旁边，被父母是谁永久锁死。

每周一次掷骰、一次落脚、一次 ⚡ 世界事件、一次模拟盘交易、一次 AI 教练对你决策的解读。投资建议是挣来的：零回测交易，教练只会说「看不懂」。

**[玩法 →](8_lifegame/docs/playability.md)** · **[图文攻略 →](8_lifegame/docs/playthrough/README.md)**

### 9. PRISM LEDGE (棱镜断崖)

三分钟一座岛的精准平台跳跃收集品，**光线追踪就是卖点**。你是最后一位灯塔守望者，爬上三座下沉的黄昏岛重新点燃大灯塔——镜面潮池、玻璃棱镜、磨光黄铜不是装饰，而是让每次跳跃可读的光物理。

两个渲染层级：保底光栅 PBR 全平台可跑，自研 WebGPU TSL 光线追踪器（真反射，最多两次弹射）在浏览器支持时叠加。三十颗棱镜——每座岛两颗，**只在反射里可见**。

*仅设计文档，暂无可玩构建。 [GDD →](9_3dplatform/GDD.md)*

### 10. PHASEWALK (四相行者)

3D 平台解谜，**四个世界像纸一样叠在一起，同时可见**：固、液、气、等离子。你只能站在自己的相位上——切相位就是切关卡，空中切换（**相弹**）是动量守恒的二段跳。

卡通剪纸皮影风格渲染——一盏幕布灯、墨线轮廓、15% 透明的幽灵层。四相塔五层、20 颗相尘，子弹会杀你、绕你、穿你、或反弹回去毁掉发射器——取决于你选择站在哪个相位。

**[玩法 →](10_phasewalk/docs/how-to-play.md)**

### 11. Kerr 旋转黑洞

不是游戏——是给广义相对论的情书。每个像素都是一条沿 Kerr 测地线数值积分的射线，实时渲染**旋转黑洞**：完整爱因斯坦环、被参考系拖拽扭曲的 D 形阴影、被拖动的吸积盘、嵌套的光子环。

拖拽绕轨、滚轮坠落、把自旋 â 从 0 调到 0.998，看阴影滑向顺行侧。HUD 算真物理——史瓦西半径、内外视界、能层、顺/逆行 ISCO。

**[玩法 →](11_blackhole/docs/how-to-play.md)**

### 12. DDGI (Dynamic Diffuse Global Illumination)

基于探针的实时全局光照演示：75 探针 × 256 射线穿过 BVH 做光线追踪，把辐照度 + 距离矩累加进八面体图集，用滞回 EMA 平滑，再用 Lambert 材质以 `albedo × (直接 N·L + DDGI 间接)` 着色。构建于 three.js r185 + WebGPU + TSL + three-mesh-bvh——一个 Cornell-box 场景，唯一光源是一张暖色自发光卡，一面厚墙就是漏光测试。

渲染深潜，不是游戏。 [GDD →](12_ddgi/GDD.md) · [RenderDoc 调试报告 →](12_ddgi/renderdoc-ddgi-debug-report.md)

### 13. EYE-13 (夜视 SAR 卫星)

你是一颗夜视 SAR 卫星。从轨道拉近、穿透云层、点击锁定 VIP，回答击杀小队问的每件事直到他们开枪——**你从不扣扳机**。无线电操作员的限时情报游戏：一个庭院、约 90 秒、7 段无线电节奏。

[GDD →](13_spysatellite/GDD.md)

### 14. NEURAL TEXTURE

一张 8 维潜变量纹理 + 一个 1635 参数的 Decoder MLP，在浏览器里实时近似陶瓷 SVBRDF。三颗球并排——解析 GGX teacher · 神经解码 · 8 倍绝对误差热图——用对照证明命题，而不是再造一套 PBR。面向 SIGGRAPH 人群的图形程序员炫技。

[GDD →](14_neuraltexture/GDD.md)

---

## 工艺

每个游戏都建在同一条自我约束上：

- **零运行时资源。** 无图片、无模型、无音频文件、无网络调用。几何程序化、纹理代码生成、声音 Web Audio 合成。
- **C.A.T 架构。** 平台纯净的 `core/`（类型、常量、数据表、模拟——禁 THREE/DOM/React）被 `engine/` 适配器和薄 `components/` overlay 包裹。规则可当数据编辑；DEV 构建里世界可经 `window.__gameManifest()` 导出为文本。
- **Doc-driven。** 每个项目配一份 GDD（设计权威）+ TDD（冻结技术契约）。代码与文档同 commit。

## 运行

```bash
cd <dir>          # 例如 cd 7_hotlineShanghai
npm install       # 仅首次（多数项目不提交 node_modules）
npm run dev       # 打开打印的 localhost 地址
```

| 项目 | 开发端口 |
|---|---|
| `4_chunbai/new_game` | 3000 |
| `5_gamejam_1` | 5173 |
| `6_patapon3D` | 5183 |
| `7_hotlineShanghai` | 5184 |
| `8_lifegame` | 5185 |
| `9_3dplatform` | 5186 |
| `10_phasewalk` | 5187 |
| `11_blackhole` | 5188 |
| `12_ddgi` | 5189 |
| `13_spysatellite` | 5191 |
| `14_neuraltexture` | 5190 |

`1/`、`2/game/`、`3/` 各自跑 Vite dev server——见各项目自己的 README。全仓库 `npm run build` = `tsc -b && vite build`；`npx tsc -b --noEmit` 是类型检查门。

---

## Claude Game Studio

这里的每款游戏都由 **Claude Game Studio** 产出——一套位于 `.claude/` 的「工作室形态」agent 架构：49 个分层 agent（总监 → 部门负责人 → 引擎专家）、约 90 个 slash command、以及 7 阶段流水线（Concept → Systems Design → Technical Setup → Pre-Production → Production → Polish → Release）。

操作规程固化在 [`.claude/docs/GAME-STUDIO-SOP.md`](.claude/docs/GAME-STUDIO-SOP.md)：从想法到上线的单一 recipe，围绕每款游戏必须携带的**四文档地板**——`AGENTS.md`（规则/状态）、`GDD.md`（设计）、`TDD.md`（数值/契约）、`JOURNEY.md`（决定）。每款游戏携带一份 `SOP-CONFORMANCE.md` 审计，记录它相对地板的位置。仓库级故事见 [JOURNEY.md](JOURNEY.md)。

开新游戏，运行 `/start`，跟随它把你导入的阶段。

---

## 非游戏（但属于仓库）

- `learning/blindside/` —— 2D 光/影可见性的学习练习，长成 Hotline Shanghai Radiance Cascades 管线的种子。
- `references/sprite-gen-vaporwave/` —— 为 Hotline Shanghai 生成的 sprite 参考。
- `kimi3.md` —— 关于本仓库遵循的 KIMI3 文档驱动、多 agent 游戏生成工作流的研究笔记。
