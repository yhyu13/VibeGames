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
- 三个 plane 必须使用相同的上传/采样方向，最终北墙锚点仍在北墙。具体实现当前为 `UNPACK_FLIP_Y_WEBGL = 0`，不要从旧修复记录复制开关值；修改时以 orientation 测试结果为准。
- pointer mapping 仍基于 DOM/source canvas 的 top-left 坐标，不从 RC framebuffer 反推。
- 朝向测试必须包含一个不对称锚点，例如北墙油灯/石库门，避免对称测试场景掩盖翻转。

**以后修改 RC 上传或 shader UV 时的完成条件**：北墙锚点保持在北墙，三个 plane 对齐，鼠标点击同一视觉目标仍得到正确世界朝向。

## 6. 亮度与可读性

### 教训:不要在三个层级重复压暗

本轮曾同时存在 Canvas vignette、final shader 30–72% base multiplier 和 0.012 ambient，导致角色、地面和目标几乎不可读。增加灯光强度不能解决全局暗部信息丢失，只会让灯附近过曝。

当前有效 frame override（`RcPresenter.render()`）：

- final shader/管线以当前代码为准；presenter 每帧实际覆盖为 ambient `0.008`、light scale `1.15`、dither 关闭。构造时的 `0.04 / 1.8 / dither=true` 会被 frame override 覆盖，不能作为运行时事实引用。
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
```

`intro-polish:check` 会间接执行资产、类型、构建、拆灯和 combat-loop 检查。当前 `hotline-e2e.spec.js` 仍使用 simulation hook/位置注入，验证的是浏览器中的状态链而非完整公开输入路径；真正的键鼠移动/点击 E2E 仍是待补 gate。修改任何交互后，必须检查脚本是否通过内部 mutation 绕过了真实调用链。

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
