# 25 — Intro Scene Implementation Lessons

> 目的:记录本轮 intro scene 从 debug tracer 到可玩闭环期间验证过的教训。后续修改输入、战斗、sprite、视野或 RC 前先读本文；数值与权威契约仍以代码、`TDD.md` 和对应 spec 为准。
> 快照:2026-08-10，基于 `41a9f92` 及之前的 intro/RC/input 修复历史；本文是经验索引，不是数值契约。

## 1. 最重要的结论

一个自动测试全绿的系统，仍可能在真实游戏里表现为“完全坏了”。本轮主要原因不是算法不会工作，而是测试绕开了玩家实际经过的边界：DOM 输入、坐标映射、攻击距离、视觉方向、目标可读性和任务完成路径。

因此，intro scene 的完成标准必须同时包含三层证据：

1. **Core**:确定性 simulation 检查规则与事件。
2. **Adapter**:浏览器公开输入验证 DOM → InputManager → Simulation。
3. **Human**:截图和实玩确认玩家看得懂目标、范围、方向和结果。

缺任何一层，都不能宣称完成。

## 2. 输入与伤害

### 教训:点击目标不等于命中目标

LMB 只表达“沿当前朝向挥刀”。命中仍取决于玩家位置、距离、瞄准角和目标状态。如果只验证 `melee` 事件，就会把“挥刀成功”误判为“伤害成功”。

本轮暴露的问题：

- 油灯原攻击距离 2.0u、敌人原 gameplay reach 1.4u，且瞄准容差只有 ±30°。
- 超距与未瞄准没有独立反馈，玩家只能看到挥刀动画。
- 旧 E2E 直接修改 `sim.player.position` 并调用 `sim.input()`，绕过真实鼠标、键盘、Canvas stacking 和坐标换算。
- 输入只绑定隐藏 source canvas 时，视觉 overlay 的变化可能让真实点击路径变得脆弱。

当前处理：

- 鼠标输入绑定到 `window`；RC/HUD 仅负责显示。
- 当前 gameplay 常量是油灯 2.4u、敌人 1.75u，瞄准容差 ±45°；`Simulation.ts` 中 melee swing 的 `range:1.4` 仍是表现/事件数据，不是敌人 damage gate。
- 进入油灯范围后出现世界空间提示，首击后更新为“再击一次”。
- 测试必须分别断言挥刀事件、目标 HP、灯光 invalidation 和敌人死亡。

**以后修改攻击时的完成条件**：公开鼠标点击路径必须证明 `HP 2→1→0` 和敌人 `HP 1→0`；仅有事件或动画不算通过。

## 3. 视野与敌人 AI

### 教训:规则必须直接画出来

两区视野即使在 core 中实现正确，如果画面只有一个均匀光锥，玩家不会知道远区和近区行为不同。

当前规则：

- 近区 0–2.5u：密集琥珀色；进入有效锥体必定触发 `!`。
- 设计远区是 2.5–8u，但当前 `inFlashlightCone()` 仍硬限制 5u，因此**有效实现仅为 2.5–5u**；5–8u 是待修 contract drift。
- `?` 面向最后快速移动位置；持续暴露或进入近区升级为 `!`。
- RC 只是视觉输出，core 使用确定性距离、角度、速度模式和计时器。

实现中需要避免：

- 扫描速度太快，光锥掠过时间短于发现计时。
- 怀疑/警觉期间仍无条件覆盖 `enemy.facingAngle`，导致残影朝向失效。
- 视觉锥长度与 gameplay 距离不一致。
- 没有慢走输入却声称“慢走不会被发现”。

**以后修改视野时的完成条件**：补齐“远区慢走 5 秒无警觉”的专门回归后，再把它视为已验证 gate；远区冲刺出现 `?`、近区出现 `!`；视觉分区半径必须与 effective core 距离一致。

## 4. Sprite 生成与方向

### 教训:生成图的“有八行”不代表八行方向一致

玩家和巡逻兵来源 sheet 使用不同方向顺序。将统一的 `N,NE,E,SE,S,SW,W,NW` 标签直接套给所有源图，导致巡逻兵视觉方向约反转 180°。播放器的 angle-to-direction 逻辑本身没有错，错的是生成 manifest 的语义标签。

当前资产流程：

- 输入白名单与 SHA-256 在 `references/sprite-samples/approved-intro-assets.json`。
- `scripts/process-intro-sprites.mjs` 负责去棋盘格、alpha、裁切、归一化、方向重排与 atlas 输出。
- 巡逻兵实际源顺序按 `S,SE,E,NE,N,NW,W,SW` 重排。
- 输出只进入 `public/sprites/intro/` 和生成的 `src/engine/sprites/intro-manifest.ts`。

**以后替换 sprite 时的完成条件**：用实际朝向截图逐行验收；不能只检查文件尺寸、alpha 和 atlas 帧数。

## 5. Canvas 与 WebGL 方向

### 教训:三个 plane 必须一起解决坐标原点

Canvas `ImageData` 是 top-first 行顺序，而 WebGL 采样与 framebuffer 路径使用 bottom-origin 语义。上传时未翻转导致整个关卡上下颠倒。只翻 sceneColor 会让 occlusion、emission 与画面错位。

当前 verified invariant：

- sceneColor、occlusion、emission 三个 CPU plane 尺寸一致。
- 三个 plane 必须使用相同的上传/采样方向，最终北墙锚点仍在北墙。具体实现当前为 `UNPACK_FLIP_Y_WEBGL = 1`（2026-08-13 以对齐探针复核：4 灯种子误差 <0.5px、RC↔场景梯度互相关偏移 (0,0)；旧文档写的 0 是历史值，勿复制）。
- pointer mapping 仍基于 DOM/source canvas 的 top-left 坐标，不从 RC framebuffer 反推。
- 朝向测试必须包含一个不对称锚点，例如北墙油灯/石库门，避免对称测试场景掩盖翻转。

### v3.8 补充:两个"看不见的"采样尺度 bug(B55/B56)

- **prepscene 采样尺度**：prepscene 渲染到工作分辨率(0.5×)seed 目标，却用 `textureSize(uOcclusionMap)`(上传纹理 720×480)归一化 gl_FragCoord → uv 只覆盖上传平面左上 1/4 象限，全部发光种子落空。修复：`uResolution` uniform 传工作尺寸。教训：**同一 shader 里"渲染目标尺寸"和"采样纹理尺寸"可能不同，归一化必须用渲染目标尺寸**。
- **final atlas 采样锚点**：probe 的 2×2 方向 texel 块，其"块角点"(texel 坐标 block*2+1.0)经 LINEAR 恰好 = 4 方向平均；旧 v3.7 公式 `(block*2+1+0.5+atlasOfs.x=0.5)/atlasSize` 在 texel 空间落在 block*2+2.0 → 只取 dir1+dir3 两个左向射线 → 光池按方向拉长、整体偏移。教训：**uv 换算 texel 空间要记得 -0.5(texel 中心偏移)，"块中心"≠"块内某 texel 中心"**；rc-lab S1 的 mid 探针(120px)曾靠该伪影才亮，修正后真实光池半径 ≈ 种子盘 + 级联扩展。

### v3.10 补充:粗粒度/伪影的四个成因(B63,用户实拍反馈)

用户以实机截图反馈"RC very coarse"。逐项定位与修复：

1. **块状边缘**：final.frag 取"最近 probe 块角点"，每个 4×4 屏幕块一个值 → 光池边缘 4px 楼梯。修复：**双线性插值 4 个相邻 probe**(probe 网格坐标 = texel/块边长-0.5，按 frac 混合) → 边缘平滑渐变。
2. **星形臂**：4 ray/probe 只在 4 条对角线上命中远距种子 → 光池呈 45° 星形臂。修复：**16 ray/probe**(22.5° 间隔，臂连成连续圆盘；块边长 2^(c+1)→2^(c+2)，interval 每 texel=1 条射线、成本不变，仅探针间距 2→4 工作像素)。
3. **环形硬缘**：硬边实心种子盘经传播形成可见圆形光圈。修复：静态灯种子 = **软边平方衰减盘**(0.5 格)。
4. **光传不远**：软边盘的零亮度盘缘让远距级联命中零亮度 → 光池缩到 ~0.5u(光源半径 3.5u 完全不达,e2e 灯亮/灭对比 17.7 卡门)。修复：盘缘**亮度地板 0.3** + lightScale 1.35→1.45。

实测(v3.10 品红染色探针)：质心偏移 -14px→+2px，径向剖面单调圆滑无平台段，池形圆润且沿房间开敞方向延伸 ~65px，e2e 灯亮/灭对比 19.6。教训：**种子盘的编码形状决定光的远场——"平滑"不能以零亮度收边，否则级联光死在盘缘**。

### v3.11 补充:暗环/台阶/小光丢失(B64,用户第二次实拍反馈)

用户继续反馈"still sharpy"。回到 rc-lab 隔离排查,径向剖面暴露三个暗伤:

1. **暗环伪影(主因)**:环境光的 `+=` 叠加语义——光池尾部(0.03)低于叠加后的环境光(0.078),
   池子周围一圈暗带,肉眼即"锐"。修复:**max 地板语义**(`radiance = max(radiance, ambient)`)——
   环境光是最低亮度地板,池子坐在其上,剖面单调。环境光不再随 merge 遍数累加,每遍传全量。
2. **盘缘台阶**:v3.10 的 0.3 亮度地板在盘缘处 0.3→0 硬跳。修复:**两层复合种子盘**
   max(核心(0.4r 平台+平方衰减尾), 宽软裙(1.7r, 0.4-0.55 增益))——处处连续、盘缘保有可传播
   亮度、无台阶。
3. **小光丢失**:平方衰减核心在 2px 内掉 20%+,10px 小盘(枪火)在 probe 网格采样下丢峰值 35%
   (枪火 0.602 < 油灯 0.651,S6 断言失败)。修复:**0.4r 平台核心**(C0 连续)保住小光峰值。

rc-lab 新增光池质量断言 `radialSmooth`(径向剖面无环状上跳)+ `centroid`(质心 ≤6px),
RC_LAB + PORT 37/37。游戏侧迁移调参:裙 1.8 格、lightScale 2.0、ambient 0.03;
e2e 对比度阈值按新合成重新定档(完好 13 / 灯碎 9——旧 18 对应"叠加环境光"把暗部抬到 ~35 的
旧合成,新合成暗部真实 ~24,光池核心 100+ 对比 4-10× 可读性更好)。教训:
**断言阈值绑定合成模型;合成语义一改(叠加→地板),阈值必须按新模型重新定档,而不是反向
调参迁就旧阈值**。

**以后修改 RC 上传或 shader UV 时的完成条件**：北墙锚点保持在北墙，三个 plane 对齐，鼠标点击同一视觉目标仍得到正确世界朝向。

## 6. 亮度与可读性

### 教训:不要在三个层级重复压暗

本轮曾同时存在 Canvas vignette、final shader 30–72% base multiplier 和 0.012 ambient，导致角色、地面和目标几乎不可读。增加灯光强度不能解决全局暗部信息丢失，只会让灯附近过曝。

当前有效 frame override（`RcPresenter.render()`）：

- final shader/管线以当前代码为准；presenter 每帧实际覆盖为 `twoLoop: true` + `ditherEnabled: false`，ambient 与 light scale 来自 `DEFAULT_RC_CONFIG`（RC_AMBIENT_INTENSITY 0.06 / 3 pass ≈ 0.02、RC_LIGHT_SCALE 1.35，2026-08-13 校准）。数值以 `src/core/constants.ts` 为准，本文只记录调参教训。
- 灯灭仍需有可测亮度下降，但暗处必须保留角色 silhouette 和通路。
- 亮度检查阈值必须基于当前展示目标校准，不能把旧视觉参数硬编码成永恒真理。

**以后修改光照时的完成条件**：灯亮/灯灭有可测差异；玩家、敌人、油灯和出口在两态都可辨；不存在局部过曝遮蔽 sprite。

## 7. 场景与任务可读性

### 教训:装饰不能抢交互物的语义

斜向晾衣杆在目标区域看起来像鱼竿或武器，油灯却没有范围提示，玩家自然无法判断该攻击什么。击杀后立即结算也让出口 tile 失去意义。

当前任务链：

1. 慢走观察远/近视野。
2. 靠近油灯，看到攻击范围提示。
3. 两击拆灯。
4. 暗处一刀击杀巡逻兵。
5. 绿色出口显示“撤离”。
6. 到达出口后结算。

当前场景纪律：

- 交互目标有尺寸、颜色、环形标记、状态文字和结果反馈。
- 非交互装饰不得与油灯、视野锥和出口形成相似 silhouette。
- HUD 只显示当前步骤；完整攻略不常驻屏幕。
- 通关条件必须通过真实空间行为触发，而不是内部事件自动跳过。

## 8. 测试纪律

| 风险 | 正确测试 seam | 失败的替代方案 |
|---|---|---|
| 伤害规则 | production `Simulation` + HP/事件断言 | 只断言挥刀动画 |
| 浏览器输入 | Playwright 键盘/鼠标公开输入 | teleport + `sim.input()` |
| RC 朝向 | 不对称场景锚点 + plane 对齐检查 | 对称测试图 |
| Sprite 方向 | 逐方向视觉 contact sheet | 只检查 atlas 尺寸 |
| 视野分区 | 近/远边界 + 快/慢输入 + `?/!` | 只检查一个 detection 事件 |
| 任务闭环 | 拆灯→杀敌→走到出口 | 杀敌后直接断言 SCORE |

当前 gate：

```bash
npm run intro-polish:check
npm run combat-loop:check
npm run e2e:playtest
npm run rc-intro-copy:check
npm run self-play:check
```

`intro-polish:check` 会间接执行资产、类型、构建、拆灯和 combat-loop 检查。`self-play:check`（2026-08-13 补）以真实键盘/鼠标走完"移动 → 瞄准 → RMB 拆灯（HP 2→1→0，RC 池亮度 160→44）→ 走出口 SCORE"，补上长期欠账的真键鼠 E2E gate；敌人 HP 归零仅跳过潜行编排（设计层的职责），输入路径 100% 真实。潜行 bot（读快照避锥/撤退/伏击）为记录版，完整潜行通关的 bot 工程仍在进行。当前 `hotline-e2e.spec.js` 仍使用 simulation hook/位置注入，验证的是浏览器中的状态链而非完整公开输入路径；修改任何交互后，必须检查脚本是否通过内部 mutation 绕过了真实调用链。

## 9. 下一次修改前检查

- [ ] 是否保留 core / engine / UI 边界？
- [ ] 自动测试是否经过玩家实际使用的输入路径？
- [ ] 视觉表现是否直接解释 gameplay 阈值？
- [ ] 是否用不对称锚点检查了 Canvas/WebGL 方向？
- [ ] Sprite manifest 的方向标签是否来自源图实际顺序？
- [ ] 灯亮与灯灭都能看清玩家、敌人和目标？
- [ ] 未命中、格挡、命中、破坏和死亡是否能区分？
- [ ] 通关是否需要玩家完成真实空间动作？
- [ ] 改动相关的文档、代码和测试是否尽量在同一 atomic commit 更新，并记录了验证 revision？
