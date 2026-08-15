# 06 — 渲染可读性 / 色彩校正(附录)

> **本文档从 v3.1 起只保留"RC 已知坑"附录**。
> 主权威 = [TDD §15 2D RC 管线契约](../../TDD.md) + [TDD §3.5 性能预算](../../TDD.md) + [TDD §3.6 降级路径](../../TDD.md) + [TDD §15.8 已知坑](../../TDD.md) + [BUGS B24-B28](../../BUGS.md)。
> 与上述冲突时,以 TDD §15 / §3.5 / §3.6 / §15.8 / BUGS 为准。

---

## 1. 为什么本文档从"完整渲染规范"缩成"已知坑附录"

v3.1 之前,本文档是完整渲染规范:
- 6 阶段管线全图
- 调色板 8 色硬约束
- 过曝 / 灰带 / 像素抖动 / 动画不可感知 4 大视觉病及修复
- 性能预算 + 降级路径
- DEV 调试接口

**这 5 块都已迁移到 TDD / BUGS**:
- 6 阶段管线图 → [04-§2](../04-radiance-cascades-pipeline.md) + [TDD §15.3](../../TDD.md)
- 调色板 8 色 → [TDD §4.4.8](../../TDD.md) + [05-§3](../05-character-design.md) + [02-§4.1](../02-art-direction.md)
- 4 大视觉病(过曝 / 灰带 / 像素抖动 / 动画不可感知)→ [BUGS B24/B25/B26/B27/B28](../../BUGS.md) + [B11 v3 viewport 重置](../../BUGS.md)
- 性能预算 + 降级路径 → [TDD §3.5/§3.6](../../TDD.md) + [04-§5/§6](../04-radiance-cascades-pipeline.md)
- DEV 调试接口 → [TDD §3.4](../../TDD.md) + [04-§7](../04-radiance-cascades-pipeline.md)

v3.1 起,本文档只剩**真正分散在 TDD/BUGS 里的"实战踩坑笔记"** + 新人入门必读 6 条(见 §2)。
新人 30 分钟入门:读完 [04-§1-§3](../04-radiance-cascades-pipeline.md) + 本文档 §2 + [BUGS B24-B28](../../BUGS.md) + [TDD §15.8](../../TDD.md),即可上手改 RC shader。

## 2. 新人 6 条入门必读(M1.0 spike 实战得来)

### 2.1 D1 — sRGB 色彩空间(原 §6.1)
**症状**:色彩发灰 / 发暗 / 过曝,所有 PBR / 调色板都对不上。
**修复**:SceneManager target 写 `texture.colorSpace = SRGBColorSpace`,所有颜色写 `Color('#XXXXXX')`(gamma encoded),shader 内部走 linear,输出时 webgl 自动转回 sRGB。
**M1 实测**:`sceneColorSpace = SRGBColorSpace` 之后 RC 灯光颜色与调色板对齐度 < 0.5% 偏差。

### 2.2 D2 — GLSL 330 → 300 es 迁移(原 §6.2 / B24)
**症状**:shader 编译报 `ERROR: 0:50: '*' : wrong operand types no operation '*' exists between 'int' and 'float'`(或类似)。
**修复**:`pow(intExp, floatExp)` 全部改为 `pow(float(floatExp), intExp)` 或 `pow(intExp, 2.0)`;`vec4 / int` 全部加 `vec4 / float(int)`。
**M1 实测**:`prepscene.frag` 报错 7 处,改后 0 错。

### 2.3 D3 — Three ↔ 裸 GL 状态污染(原 §6.3)
**症状**:Three 渲染正常,接着跑 RC 全屏 pass 出现 vertex attribute 错乱 / 颜色错位。
**修复**:每次进入裸 GL 前 `gl.saveStates`(`gl.getParameter(CURRENT_PROGRAM)` / `VERTEX_ARRAY_BINDING`),RC pass 退出前 restore。
**M1 实测**:save/restore 后 0 状态污染。

### 2.4 D4 — 全屏 pass 写状态(原 §6.4 / 白屏修复)
**症状**:屏幕纯白 / 纯黑 / 全帧只显示第一个 pass 的输出。
**修复**:每次全屏 pass 前 `gl.disable(BLEND | DEPTH_TEST | SCISSOR_TEST | CULL_FACE)` + `gl.drawBuffers([gl.COLOR_ATTACHMENT0])`(只写 attachment 0),pass 退出前 restore。
**M1 实测**:`gl.drawBuffers` 是隐性坑 — 漏写会出现"framebuffer complete 但只输出 attachment 0 内容"。

### 2.5 D5 — WebGL2 only
**症状**:`#version 300 es` 不识别,`R32F` 纹理解不出值。
**修复**:Canvas 上下文创建时强制 `webgl2: true`,启动时 `gl.getParameter(gl.VERSION)` 自检,版本不是 `WebGL 2.0` 直接 `hud.showMessage('需要 WebGL2')` + 退出。
**M1 实测**:Chrome / Edge / Firefox 默认就是 WebGL2;Safari 16.4+ 才有 RC 必备 R32F 纹理支持。

### 2.6 D6 — JFA pass 数 = `log2(min(W,H))`,不要写死
**症状**:JFA 距离场有"破洞"(部分像素距离算错)。
**修复**:`const jfaPasses = Math.ceil(Math.log2(Math.min(canvas.width, canvas.height)))`,不要写死 5。
**M1 实测**:1080p = 11 pass;每 pass 跳距 = `n / 2^i`(i = pass index),不要等差。

## 3. v3.1 新增 2 条坑(光暗反制机制相关)

### 3.1 v3.1.1 — cascade=0 时 lightField 必须硬底禁用
**症状**:性能极差时 RC 自动降级到 cascade=0,如果 lightField 仍然在跑(读 0..1 强度),玩家会"全场景无敌"(因为阈值检查 sampleAt > 0.30 永远不通过)→ 机制破坏游戏。
**修复**:`rcPipelineState.activeCascades === 0` 时 `lightField.setMode('disabled')`,所有 sampleAt 返 0(仅视觉;玩法不读 RC 像素),同时播 0.3s 停电动画 + HUD 提示"照明失效"。
**决策来源**:[TDD §3.6 C8 决策](../../TDD.md) + [09-§9](../09-blindside-integration.md)。

### 3.2 v3.1.2 — lightField 写入 ≠ sRGB 转换
**症状**:lightField 缓存值和屏幕颜色对比"差",实际是 linear vs gamma 转换未对齐。
**修复**:lightField cache 是 linear 空间(直接写 `cascadeBuffer.a`),CPU 端 `glReadPixels` 拿到的就是 linear 强度,**不**做 sRGB → linear 转换。CPU 端判断阈值(`> 0.30`)直接用 linear 值。
**为什么**:sRGB 转换会让"看似亮"的灯池(屏幕值 0.7)在 linear 空间是 0.5,玩家感觉"在灯下",机制却说"没在灯下" → 体验不一致。
**M1 待验证**:实际测 lightField 缓存值与屏幕人眼亮度的相关系数 r ≥ 0.9。

## 4. 4 大视觉病 → BUGS 迁移索引(原 §6.5-§6.8)

| 视觉病 | 修复 | BUGS ID |
|--------|------|---------|
| 灯光过曝(装饰光 + RC 把地板冲近白) | 删 addLampGlow 假光晕 + 装饰灯走真 RC 发射 + 半径收紧 + ambient 0.12 + lightScale 1.35 | [B24 / B28](../../BUGS.md) |
| 像素对齐缺陷(overlay 小数坐标抖动) | toPx 取整 + cellPx 取整 | [B25](../../BUGS.md) |
| 角色动画不可感知(walk 2 帧 + 1px 肩移) | walk 4 帧含腿部步幅 + animFps 6 + attack 突刺帧 + death 帧显示 | [B26](../../BUGS.md) |
| 画面 45% 灰色 void(环境光洗色) | ambient 0.2 → 0.12 + scanlines 0.18 → 0.10 + 房间 mid 60.7% | [B27](../../BUGS.md) |
| 房间 8-14 tile 宽 < 视口 32u(画面大量 void) | viewport 改为像素锚定 + 相机适配房间 | [B11 v3 重置](../../BUGS.md) |

## 5. RC 关键截图(视觉对照)

| 场景 | 截图 | 用途 |
|------|------|------|
| RC 真发射下的房间(全屏像素锚定 1920×1080) | [../../m1-room1-gameplay.png](../../m1-room1-gameplay.png) | B11 修复后 + B24/B28 修复后实机 |
| 房间定稿(RC 真光 + 像素取整 + walk 4 帧) | [../../final-room1-frozen.png](../../final-room1-frozen.png) | M1 候基线 |
| 视觉回归(ambient 0.12 + scanlines 0.10) | [../../smoke-04-room1.png](../../smoke-04-room1.png) | B27 修复后全屏亮度统计 |
| HM 真机对照(条带地板 / 砖块墙) | [../../references/hotline-miami-screenshots/](../../references/hotline-miami-screenshots/) | 调色板基准 |

## 6. M1.0 spike 待证伪清单

- [ ] RC 6 阶段管线端到端跑通,`__rcPipeline.state().activeCascades === 3`
- [ ] lightField cache 写入与屏幕亮度相关系数 r ≥ 0.9(§3.1.2)
- [ ] cascade=0 降级时 lightField 立即禁用,不停帧
- [ ] 60 FPS @ 1080p / 30 FPS @ 4K 稳定 30 分钟(性能预算 [TDD §3.5](../../TDD.md))
- [ ] B24/B25/B26/B27/B28 全部状态为 FIXED,无新视觉病
- [ ] 10 次 playtest 跑通连接式哨塔大院 / 3 地面巡逻 + 1 静态塔守 / 拆电→清敌→撤离 / 光暗机制

## 7. 与本文档同源但已独立的兄弟文档

- [04-§2 6 阶段管线图](../04-radiance-cascades-pipeline.md#2-6-阶段管线stage-diagram)
- [04-§3 算法直觉](../04-radiance-cascades-pipeline.md#3-算法直觉demo-原式见-radiance-cascades-demo)
- [04-§5 性能预算](../04-radiance-cascades-pipeline.md#5-性能预算摘要详见-tdd-35)
- [04-§6 降级路径](../04-radiance-cascades-pipeline.md#6-降级路径autopilot详见-tdd-36)
- [02-§4 调色板与风格](../02-art-direction.md#4-调色板与美术风格)
- [05-§3 角色配色](../05-character-design.md#3-角色配色)

> 再次强调:本文档**只**承载"实战踩坑笔记 + 新人 6 条入门"。新增 RC 相关决策/坑请直接更新 TDD §15 / §15.8 / BUGS,不要在本文档重复。
