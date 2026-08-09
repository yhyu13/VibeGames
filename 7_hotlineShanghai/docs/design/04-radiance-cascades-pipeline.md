# 04 — 2D Radiance Cascades Pipeline(教学层)

> **本文档从 v3.1 起只保留"为什么 + 算法直觉 + 移植源"**。
> 所有契约 / 数字 / 接口 / Shader 清单 / 性能预算 / 降级路径 / DEV 调试:
> [TDD §15 2D RC 管线契约](../../TDD.md)(冻结,真实 TS,主权威)
> [TDD §4.4.6 RC 管线数值表](../../TDD.md)
> [TDD §4.4.7 RC 光源数据](../../TDD.md)
> [TDD §15.8 已知坑 / GOTCHAS](../../TDD.md)
> 与 TDD §15 冲突时,以 TDD §15 为准。

---

## 1. 为什么用 RC(Why Radiance Cascades)

1937 上海弄堂的核心辨识度 = **"灯下黑"**:

| 视觉 | 实现 |
|------|------|
| 油灯下的黄晕 | `oil_lamp` 强度 0.4 / 半径 5u(inverse-square falloff) |
| 窗内灯光 | `searchlight` 强度 0.8 / 半径 16u / 旋转动画 |
| 远处霓虹渗光 | `neon_sign` 强度 0.6 / 半径 12u / 脉动 |

**暗处是隐身区,亮处暴露** — 这就是 v3.1 光暗反制机制的视觉基底(详见 [GDD §12](../../GDD.md) + [TDD §4.6](../../TDD.md) + [`09-blindside-integration.md`](../09-blindside-integration.md))。

**RC 是 2D 像素氛围的天花板**:
- 真实软阴影(传统 fake additive 是硬边)
- 真实 indirect bounce(从墙反射回的光)
- 真实多尺度(从近到远 cascade 分级)

**关键:不是 fake additive** — 一定要走完整 6 阶段管线,否则跟普通 light 一样。**B24/B28 教训**:删 addLampGlow 假光晕,装饰灯走真 RC 发射(见 [BUGS B24/B28](../../BUGS.md))。

### 1.1 视觉对照(本项目自截图 + HM 真机)

| 场景 | 截图 |
|------|------|
| RC 真发射下的房间(全屏像素锚定 1920×1080) | [../../m1-room1-gameplay.png](../../m1-room1-gameplay.png) |
| 房间定稿(RC 真光 + 像素取整) | [../../final-room1-frozen.png](../../final-room1-frozen.png) |
| M0 末 RC 全开 + ambient 0.12 实测(无 void 灰带) | [../../smoke-04-room1.png](../../smoke-04-room1.png) |
| HM 真机对照(条带地板 / 砖块墙基准) | [../../references/hotline-miami-screenshots/](../../references/hotline-miami-screenshots/) |
| 家具 + 霓虹取样 | [../../references/05-furniture-neon.png](../../references/05-furniture-neon.png) |

## 2. 6 阶段管线(Stage Diagram)

> 6 阶段 = 最终形态;v3 里程碑 = **先无 RC 基线(纯 base color)→ 单级 final-pass(油灯+霓虹+枪火)→ cascade 3 级 = M2 性能目标**。
> 完整 6 阶段的 shader 清单 / uniforms / 性能预算 = [TDD §15.3](../../TDD.md) + [TDD §3.5/§3.6](../../TDD.md)。

```
[1] prepscene pass    SceneManager 全场景纹理(occlusion + emission 合并)
                       → sceneSeed (RGBA: 地板 = 编码纹理坐标 seed / 墙 = 空 / 光源 = 光色)
[2] prepjfa pass      sceneSeed → jfaSeed (RG = 最近 seed 纹理坐标, B = 距离, A = 有无 seed)
[3] JFA × log2(min(W,H)) passes
                       每 pass 9 邻域跳距减半 → 最近 seed 距离场
                       pass 数 = log2(短边)向上取整(1080p ≈ 10-11)
[4] distfield pass    jfaSeed(final) → sceneSdf (R = 到最近墙的归一化距离)
[5] cascade × N(默认 3,ping-pong FB)
                       sceneSdf + sceneSeed(光) + 灯位表 →
                       cascadeBuffer (RGB = indirect, A = 占位)
[6] final pass        sceneTexture + cascadeBuffer + dither(4×4 Bayer)→ default framebuffer
                       **v3.1 增**:同时写 1 × 240×135 R32F `uLightField` 光场缓存(给 CPU 端 LightField.sampleAt)
```

## 3. 算法直觉(demo 原式,见 [`radiance-cascades-demo`](C:/Git-repo-3rd/Radiance_Cascade_repos/radiance-cascades-demo))

### 3.1 JFA(Jump Flood Algorithm)

- pass 数 = `log2(min(W,H))` 向上取整(v2 冻结,替代 v1 的固定 5 pass)。
- 每个 pass 的 `uJumpSize` = n / 2^i(n = 短边像素);9 邻域采样,记录最近种子的 UV 和距离。
- 降级时**优先截断跳距序列尾部**(跳过跳距 1 的 pass,代价 ±1px 精度)。

直觉:每像素用"跳格子"的方式把"最近的种子是谁"广播到全图。第 1 步每像素只问它的 9 邻域里最远的种子(跳距 = 长边/2),第 2 步跳距减半,问的是"再近一点的种子",如此迭代直到跳距 = 1,此时每像素都知道了真正的最近种子。`log2(N)` 步 = 因为每步跳距减半,`log2` 步就把所有距离都覆盖到了。

### 3.2 Cascade Probes(每级 probe 数量指数增长)

每 pass(索引 index = 0..cascadeCount-1):

```
probeAmount  = pow(baseRayCount, index)             // 该级 probe 总数
spacing      = sqrt(probeAmount)                    // 每维 probe 数
size         = 1.0 / vec2(spacing)                  // probe 屏幕尺寸(uv 域)
position     = mod(fragCoord, size) * spacing       // 在 probe 内的相对坐标
rayCount     = pow(baseRayCount, index + 1)         // 角度分辨率(指数增长)
intervalStart = (index == 0) ? 0.0
              : a * pow(baseRayCount, index)   / min(W, H)   // a = uBaseInterval(px)
intervalEnd   = a * pow(baseRayCount, index + 1) / min(W, H)
```

- `RC_BASE_RAY_COUNT=4` → cascade 0: 4 ray / cascade 1: 16 ray / cascade 2: 64 ray。
- 每 ray 在 interval 内用距离场步进(`MAX_RAY_STEPS=128`、`EPS=0.0005`):
  - 命中表面 → 采样 scene 色(可选 mix 上级 lighting,`uPropagationRate`);
  - 未命中 → 从 `uLastPass`(上级 cascade)按 `p.position / up.spacing` 偏移取 probe 合并(merge,`deltaRadiance.a == 0.0` 条件)。
- 角度按 `(index / rayCount) * TWO_PI` 均分,方向乘宽高比修正 `vec2(cos(a) * min(W,H)/max(W,H), sin(a))`。

直觉:cascade 0 是大探针(4 根射线,扫整张图),抓"远处墙的间接光"大致方位;cascade 1 中探针(16 根射线),抓"近处灯池边界";cascade 2 小探针(64 根射线),抓"脚下 1 像素的精确软阴影"。**指数增长的射线数 = 多尺度 = 不同距离用不同分辨率**,这才是 RC 比 fake additive 强的关键。

### 3.3 Dither 回压

4×4 Bayer matrix 把 indirect 强度回压到 4-pixel 颗粒,匹配 16×16 像素粒度。代码见 [TDD §15.2](../../TDD.md) + rc-lab shader。

### 3.4 v3.1 LightField 缓存(光暗反制机制支撑)

```
final.frag 同时输出 2 个 attachment:
  - fragColor (default framebuffer)     屏幕
  - lightField (1 × 240×135 R32F)      CPU 端 glReadPixels 8×8 downsample
  - 评估 = cascadeBuffer.a (归一化辐射强度 0..1)
CPU 端每帧 glReadPixels(~0.2ms), 双线性插值,LightField.sampleAt(worldPos) → 0..1
Game 端判断:
  sampleAt > LIGHT_SHIELD_THRESHOLD(0.30) → 敌人受光护甲(INVULNERABLE)
  sampleAt > LIGHT_EXPOSED_THRESHOLD(0.10) → 玩家暴露(敌弹必中, 不享受 SHADOW_SHOT_MISS)
```

**关键设计**:0.30 vs 0.10 不等 = 给玩家"灯池边缘"小安全区(灯下 0.10-0.30 = 暗但安全)。详见 [TDD §4.6.1-§4.6.5](../../TDD.md) + [TDD §15.3-§15.4](../../TDD.md) + [09-§9](../09-blindside-integration.md)。

## 4. Shader 清单(摘要,详见 [TDD §15.3](../../TDD.md))

| 文件 | 阶段 | 移植自 |
|------|------|--------|
| `fullscreen.vert` | — | demo `default.vert`(GLSL 300 es) |
| `prepscene.frag` | 1 | demo `prepscene.frag` |
| `prepjfa.frag` | 2 | demo `prepjfa.frag` |
| `jfa.frag` | 3 | demo `jfa.frag` |
| `distfield.frag` | 4 | demo `distfield.frag` |
| `rc.frag` | 5 | demo `rc.frag`(probe 数学原式) |
| `gi.frag` | 降级 | demo `gi.frag`(RC_OFF 前最后一档) |
| `final.frag` | 6 + **v3.1 写 lightField cache** | demo `final.frag` + R32F attachment |

rc-lab 目录(`rc-lab/`)是 live shader playground,可即时改 + 浏览器看效果(详见 `rc-lab/README.md`)。

## 5. 性能预算(摘要,详见 [TDD §3.5](../../TDD.md))

| 指标 | 预算 | 硬上限 |
|------|------|--------|
| RC prepscene | ≤ 1ms | 2ms |
| RC JFA(log2(min(W,H)),1080p ≈ 10-11) | ≤ 2.5ms | 4ms |
| RC cascade × 3 | ≤ 4.5ms(3 × 1.5ms) | 6ms(3 × 2ms) |
| RC final + dither | ≤ 1ms | 2ms |
| **`lightField.update` v3.1** | **≤ 0.2ms** | **0.4ms** |
| 活动光源 | ≤ 16 | 32 |
| 中间 framebuffer | 3 × 1920×1080 RGBA8 + **1 × 240×135 R32F** | 6 × 1920×1080 |
| **v3 总预算** | **≈ 9.7ms** | **15ms** |

## 6. 降级路径(autopilot,详见 [TDD §3.6](../../TDD.md))

```
frame time > 14ms for 3 frames   → cascade 3 → 2
frame time > 14ms for 6 frames   → 1080p → 540p(仅 RC)
frame time > 14ms for 9 frames   → gi.frag 单 pass(RC_OFF 前最后一档)
frame time > 14ms for 12 frames  → RC 全关,回退纯 base color

**v3.1 硬底(C8 决策)**:rcPipelineState.activeCascades === 0 时
  → lightField.setMode('disabled')  // 所有 sampleAt 返 0,所有敌人 = 暗中可杀
  → playPowerOutageAnimation(0.3s)  // 停电动画
  → hud.showMessage('照明失效,机制退回')
```

降级状态可由 `window.__rcPipeline` 读出。**不**写入 localStorage(只在本次会话生效)。

## 7. 调试接口(DEV only,详见 [TDD §15.6](../../TDD.md) + [TDD §3.4](../../TDD.md))

- `window.__rcPipeline.state()` 返回完整 RC 状态(12 字段,v3.1 加 4 个 lightField 字段)
- `window.__lightField`(v3.1 新增)= LightFieldCache.downsample 只读快照
- `components/DevPanel.tsx` 提供 Tweakpane 实时调参

## 8. 已知坑(Known Gotchas,详见 [TDD §15.8](../../TDD.md) + [BUGS B24-B28](../../BUGS.md))

| 坑 | 教训来源 |
|----|----------|
| WebGL2 only(否则 RC 跑不起) | 平台 |
| Canvas 大小必须 `setSize(w, h, false)`(不更新 CSS) | demo 移植 |
| GLSL 330 → 300 es 迁移:int→float 显式化(pow 第二参 / vec4/=int) | **D2(06 §6.2)→ B24 修复** |
| 全屏 pass 写状态:必须 `disable(BLEND/DEPTH_TEST/SCISSOR/CULL) + drawBuffers([COLOR_ATTACHMENT0])` | **D4(06 §6.4)→ 白屏修复** |
| Three ↔ 裸 GL 状态污染:save/restore `CURRENT_PROGRAM` + `VERTEX_ARRAY_BINDING` | **D3(06 §6.3)** |
| sRGB 色彩空间:SceneManager target `texture.colorSpace = SRGBColorSpace` | **D1(06 §6.1)** |
| JFA pass 数 = `log2(min(W,H))`,不要写死 5 | demo 原式 |
| M1 验证点:击杀时枪火必须瞬时亮起 + 油灯必须常亮 + 60 FPS @ 1080p | `M1-smoke-02-room1-spawn.png` / `final-room1-frozen.png` |
| **v3.1 新坑**:cascade=0 必须硬底禁用 lightSmash(否则机制破坏游戏) | [TDD §3.6](../../TDD.md) C8 决策 |
| **v3.1 新坑**:lightField 写入 ≠ sRGB 转换(linear cache,CPU 直接读) | [TDD §15.3 final.frag 注解](../../TDD.md) |

## 9. 移植参考

上游 C++/Raylib/GLSL 实现:
`C:/Git-repo-3rd/Radiance_Cascade_repos/radiance-cascades-demo`

- `res/shaders/rc.frag` ⭐(probe 数学 / propagationRate / mixFactor 原式)
- `res/shaders/prepscene.frag` + `prepjfa.frag` + `jfa.frag` + `distfield.frag`
- `res/shaders/gi.frag` + `final.frag` + `default.vert`
- `res/doc/` 详细文档

## 10. v3.1 实施子阶段(详见 [MVP-PLAN §M1.0 spike](../../MVP-PLAN.md))

| 子阶段 | 何时 | 交付 |
|--------|------|------|
| 无 RC 渲染基线 | M1.0 Day 2 / M1.3 | 纯 base color,验证场景 / 玩家 / 房间可读 |
| 单级 final-pass | M1.0 Day 2 / M1.4 | 油灯 / 霓虹 / 枪火 3 个光源走 RC |
| cascade 3 级 | **M2 性能目标**(非 M1) | 多尺度真实软阴影 |
| v3.1 lightField 缓存 | M1.0 Day 2-3 | 8×8 downsample + R32F framebuffer + 14 个光暗常量 |
| v3.1 INVULNERABLE 强制检查 | M1.0 Day 3 | 敌人 FSM 每 tick 调 `lightField.isShielded()` |

> D1-D8 决策点(全部待 M1.0 spike 实证)见 [TDD §4.7](../../TDD.md) + [09-§11](../09-blindside-integration.md)。
