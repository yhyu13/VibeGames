# 06 — Rendering Readability(渲染可见性修复计划:场景接线 + RC 合成 + 对比度)

> 设计层权威文件之一。修复对象 = 当前原型"全黑 + 角色看不清"(2026-08-08 浏览器实测)。
> 状态:计划冻结,未实现。实现后更新 `04-radiance-cascades-pipeline.md` / `TDD.md` 对应契约。

## 1. 实测症状与根因(已定位)

| # | 症状 | 根因 | 证据 |
|---|------|------|------|
| S1 | 主画布纯 PAL_INK `#0e0d12`,无地板无墙 | `GameEngine` 从未调用 `sceneManager.setRoom()` → roomGroup 永远为空 | 画布 5 点采样全 `[14,13,18]`;GameEngine grep `setRoom` 零命中 |
| S2 | RC 管线从未运行(状态全零) | `SceneManager.getSceneTexture()` 恒返回 `null`(标注"待接线")→ `renderFrame` 守卫跳过 `rcPipeline.render` | `__rcPipeline` = `{activeCascades:0, lightCount:0, ...}`;SceneManager.ts:275 |
| S3 | 即使接线也会近全黑 | `final.frag:36` 乘性合成 `base × radiance`,而 `rc.frag:167` 环境光系数仅 `0.005` | 阴影区 radiance≈0.005 → base×0.005 ≈ 黑 |
| S4 | 角色看不清 | 占位 sprite 主色 = 背景同色(玩家风衣 `#0e0d12` = PAL_INK);无描边/锚点/旋转/动画 | SceneManager.ts:55 注释"正式美术待提供";05 文档前无可读性规则 |

## 2. 修复计划(冻结方案,按序实施)

### F1 场景接线(修 S1)

- `GameEngine.syncStore()` 中新增:`const room = snap.currentRoom; if (room) this.sceneManager.setRoom(room);`
  - setRoom 已有同房间幂等(`lastRoomId`),安全每帧调用。
- 验收:画布出现地板(灰泥 `#1a1922` + 墙 `#5e2418` + 门 + 油灯图块)。

### F2 场景纹理接入 RC(修 S2)

- `SceneManager` 增加 `WebGLRenderTarget`(1080p RGBA8):`render()` 输出到 target 而非直接上屏,再 `renderToScreen()` 把 target 拷回主 canvas。
  - 或更简:Three 先渲染到 target,RC 的 `prepscene.frag` 采样该 target 纹理;final 输出到屏幕。
- `getSceneTexture(): WebGLTexture | null` 改为返回 target 纹理(初始化失败返回 null,维持守卫)。
- 注意:Three `WebGLRenderer` 与 RC 共用同一 GL 上下文(renderer.getContext()),不得重复 `getContext('webgl2')`(RcPipeline.init 需改为接收已有上下文,或使用同一 canvas 的同一 context)。
- 验收:`__rcPipeline.lightCount` > 0(进房间后),JFA pass 数 ≈ log2(1080)≈10。

### F3 RC 合成公式修正(修 S3)

- **方案冻结:加法合成**(radiance 只携带"光贡献",场景色常驻):
  ```
  lit = base + radiance * uLightScale
  ```
  - `uLightScale` 默认 1.0,进 DevPanel 调参。
  - 环境光:`rc.frag` 的 `uAmbientColor * uAmbient * 0.005` → 改为可调 `uAmbientIntensity`(默认 0.25,暗部可见但不曝光;0 = 纯黑,2 = 过曝)。
  - dither 回压作用于**光贡献项**而非整图:`quantizedLight = step(threshold, luma(radiance)) * radiance`,再 `lit = base + mix(radiance, quantizedLight, 0.5) * uLightScale`。
- 弃用:乘性 `base × radiance`(阴影区把基色压没)。
- 验收:油灯 5u 暖光晕肉眼可见;阴影区 = base 原色(暗但可读);枪火 8u 瞬时亮起。

### F4 角色对比度(修 S4)

- 按 `05-character-design.md` 冻结的角色设计替换占位 sprite(§5 实现契约)。
- 验收:05 文档 §6 的 5 条验收标准。

### F5 兜底降级(防回归)

- RC 不可用(WebGL2 失败)时:base 场景直出 + 2D overlay 灯位图块照常 → 游戏始终可玩、可读,只是无动态光照。

## 3. 实施拆单(swarm 子任务,文件白名单)

| 子任务 | 白名单 | 依赖 |
|--------|--------|------|
| engine-scene:F1 + F2(target 渲染 + getSceneTexture) | `src/engine/SceneManager.ts`、`src/engine/GameEngine.ts` | 无 |
| engine-rc-composite:F3(加法合成 + uAmbientIntensity + uLightScale) | `src/engine/shaders/final.frag`、`src/engine/shaders/rc.frag`、`src/engine/RcPipeline.ts`、`src/core/constants.ts`(新常量)、`src/components/DevPanel.tsx`(调参项) | engine-scene(F2 提供纹理) |
| core-sprites:05 §5.1 数据(CHARACTERS + 面具色) | `src/core/data/sprites.ts`、`src/core/data/masks.ts`(主题色字段) | 05 文档 |
| engine-sprites:05 §5.2/5.3(旋转/描边/动画/消费) | `src/engine/sprites/PixelRenderer.ts`、`src/engine/SceneManager.ts` | core-sprites |
| qa-visual:浏览器断言(06 §2 各验收点) | 无文件所有权 | 全部 |

## 4. 验收总门

1. 画布出现完整房间(地板/墙/门/灯位),不再是纯背景色。
2. 油灯/霓虹/探照灯静态光可见,枪火/爆炸瞬时光可见,阴影区 base 色可读。
3. 玩家冷青描边 + 灯笼红围巾任意角落可辨;4 敌人 archetype 暖描边可区分。
4. `__rcPipeline` 状态非零且随房间变化;DevPanel 可调 `uLightScale` / `uAmbientIntensity`。
5. `npx tsc -b --noEmit` 0 error + `npm run build` 通过 + 60 FPS。

## 5. 文档联动

- 成功后更新:`04-radiance-cascades-pipeline.md`(§3.3 合成公式)、`TDD.md`(§15 final/rc uniform 表、§4.4.6 新增 `RC_AMBIENT_INTENSITY` / `RC_LIGHT_SCALE`)、`02-art-direction.md`(对比度规则引用 05)。
- `05-character-design.md` 为本计划的角色侧权威。

> **v1.1 决策记录(2026-08-08 锁定,详见 GDD §7 / 02 §0.5 / MVP-PLAN 顶部)**:D1 调色板 80% HM + 20% 上海(已落地 constants PAL_*);D2 敌密 2-5/房;D3 viewport 32×18u(PLAYER_BOUND ±16/±9);D4 mask 流 = HM 任务 intro(简报并入选择)。本文件 D5 亮度定档见 §6。

## 7. 一级可读性打磨(2026-08-08 玩家反馈:分不清墙/通路/敌人,不知道自己怎么死的)

> 渲染已通(见 §6 D1-D5)。本节省略为可执行计划;白屏修复后的实机观感:地板 [4,4,4] 过暗、墙 [67,14,10] 可见、整体"灯下黑"过头。

### P1 亮度定档(修"太暗看不清")
- 范围:在 DevPanel/运行时扫 `RC_AMBIENT_INTENSITY` 0.3→0.6 与 `uLightScale` 1.0→1.5,冻结一组"暗部可读 + 油灯暖光明显"的参数回写 `src/core/constants.ts`。
- 验收:站房间对角,地板/墙/门三者肉眼可辨(对比 ≥2 档)。

### P2 墙 vs 地板 vs 门(修"哪里是墙")
- 墙:亮度提到 PAL_RUST 变体(如 `#7a2e1e`)+ **墙沿地板一侧 1px 深色阴影线**(高度感,顶视角关键深度线索)。
- 地板:加**程序化噪点纹理**(每 tile 1-2 个随机暗点,同色系 ±8%),打破纯色平板感。
- 门:门 tile 用专属亮色(灯笼红 `#e54a1a` 底 + 米色门框,v1.1 调色板),与墙明显区分;门上方画"出口箭头"小三角(M1 可后置)。
- 实现:`SceneManager.setRoom` 的 tileColor 映射 + 地板噪点用 `Math.random` 种子化(房间 id 哈希,保证同房稳定)。

### P3 敌人可辨(修"敌人在哪")
- 敌人头顶**悬浮标记**:soldier/policeman/spy 用暖橙 `#ffb066` 小三角,boss 用 `#ff5a3c` 菱形,16px 见方、距 sprite 顶 4px。
- 敌人开火瞬间:**枪口闪光 2 帧**(overlay 层 4px 白块,方向 = facingAngle),让"谁在打我"可读。
- 锁定目标脉冲描边(05 §7 M2)提前到 M1(玩家瞄准敌人 0.5s 内出现 `#ff5a3c` 描边)。
- 实现:`SceneManager.drawOverlay` 敌人绘制处加标记;开火状态从 `enemy.state === 'engaging'` + 最近一次 enemyFire 事件时间戳驱动。

### P4 死亡原因(修"为什么死了")
- 死亡瞬间:**红闪 0.3s**(overlay 全屏红色 vignette,alpha 0.35)+ `playerKilled` 事件携带 `cause`(`'bullet' | 'melee' | 'grenade' | 'unknown'` — 由最后命中来源写入,sim 的 damagePlayer 调用点补参)。
- DeathScreen 显示原因文案:"你被占领军的子弹击中" / "你被特务的刀放倒" / "你被手雷炸死了"。
- 实现:① `Simulation.ts` 子弹/手雷命中玩家处传 cause;② `GameEngine` 把 cause 存入 store;③ `DeathScreen.tsx` 读 store 渲染文案。

### P5 实施拆单(单会话,文件白名单)
`src/core/constants.ts`(亮度定档)、`src/engine/SceneManager.ts`(P2 墙/地板/门 + P3 标记)、`src/engine/sprites/PixelRenderer.ts`(标记/闪光绘制辅助)、`src/core/simulation/Simulation.ts` + `src/engine/GameEngine.ts`(P4 cause 传递)、`src/components/DeathScreen.tsx`(P4 文案)。
验收门:tsc 0 error + 浏览器实测 P1-P4 各验收点。

## 6. 实施结果与新增决策(2026-08-08,已落地验证)

F1-F5 全部实现并通过浏览器验证(主画布出现地板/墙/油灯暖光,阴影区与亮区对比可见;RC `activeCascades:3 / jfaPasses:10`)。实施中发现三项计划外根因与对应决策,冻结如下:

### D1 色彩空间(全黑的主根因之一)
- 症状:场景 target 内容是线性值,raw 直出到 sRGB 画布 → 全域 gamma 变暗(看似全黑)。
- 决策:① SceneManager 场景 target `texture.colorSpace = SRGBColorSpace`(SRGB8_ALPHA8,硬件写时编码、采样时自动解码 → F5 兜底 blit 显示正确,RC 链仍按线性采样);② RcPipeline 新增全分辨率 sRGB 输出 target(final pass 渲染进 SRGB8_ALPHA8 → 硬件线性→sRGB 编码 → blit 上屏);③ `uSrgb=0`(radiance 保持线性,输出端只编码一次)。
- 影响:`04` 的 final 阶段描述增加"输出走 sRGB target + blit"。

### D2 GLSL ES 3.00 隐式转换(全黑的主根因之二)
- 症状:`prepscene.frag` 等 6 个 frag shader 全有 ES 3.00 非法隐式 int→float(pow 第二参、vec4/=int、int→vec4 赋值等),`RcPipeline.init` 抛错被 `.catch(()=>{})` 静默吞掉 → RC 从未启动。
- 决策:① GameEngine 不再静默吞 init 错误(改为 console.error 记录,仍走 F5 兜底);② `RcPipeline.compile()` 内置 ES3.00 兼容补丁表(编译期字符串替换,shader 文件保持 demo 原样便于对照移植;补丁表须在改 shader 时同步更新)。
- 影响:TDD §15.3 增补"移植时必须做 ES3.00 隐式转换修正(int→float 显式化),不得依赖隐式转换"。

### D3 Three ↔ 裸 GL 状态污染
- 症状:RC 的裸 GL pass 后,Three 缓存的 program/VAO 状态失效,下一帧场景渲染零 draw call(182 条 uniform/EBO warning)。
- 决策:`RcPipeline.render` 开头保存 `CURRENT_PROGRAM` + `VERTEX_ARRAY_BINDING`,结束恢复(帧缓冲绑定由 Three `setRenderTarget` 自愈)。
- 影响:`RcPipeline` 新增状态守卫,`04` 已知坑补一条。

### D4 全屏 pass 的写入状态(白屏根因,2026-08-08 实测确认)
- 症状:管线全部 pass 静默 no-op(0.1ms 完成整条链)、所有中间 target 恒白、屏幕全白;且**非确定性**(偶尔正常)。
- 根因链:① three 渲染后把 `GL_BLEND` / `DEPTH_TEST` / `CULL_FACE` 留在开启态;② 管线全屏 pass 沿用该状态,输出被 depth 测试/混合吞掉 → 任何 pass 都写不进 target;③ 上层"看不见"→ 误以为纹理绑定/色彩空间问题(前两轮排查方向均被实测排除)。
- 决策:① `drawFullscreen()` 每次绘制前强制 `disable(BLEND/DEPTH_TEST/SCISSOR_TEST/CULL_FACE)` + `colorMask(true)` + `drawBuffers([COLOR_ATTACHMENT0])`;② `saveGlState/restoreGlState` 增补这四个开关的保存/恢复(恢复给 three);③ 纹理单元恢复为解绑 null(防 feedback loop,已并入 D3 守卫)。
- 影响:验证后屏幕出现真实光照场景(墙 PAL_RUST 暖色、地板、阴影层次,0 白像素)。

### D5 亮度定档(已冻结,2026-08-08 w5 实机扫参)
- **锁定:`RC_AMBIENT_INTENSITY=0.2`、`RC_LIGHT_SCALE=1.0`**(constants.ts;GameEngine.buildRcConfig 从常量取权威值)。
- 扫参区间:0.1→99 / 0.15→114 / **0.2→129(冻结)** / 0.3→158 / 0.4+ 全白;计划范围 0.3-0.6 在灯位光斑修复后整体过曝,故下移定档。
- 环境事实:本 WebGL2 上下文不做 sRGB framebuffer 编码(屏幕显示原始线性字节,与 D5 初测 [4,4,4] 吻合),定档值按此路径校准。
- 灯位暖池 178 vs 远处 113(1.57×)可见、峰值无刺眼。
