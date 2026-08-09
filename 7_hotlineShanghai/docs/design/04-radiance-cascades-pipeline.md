# 04 — 2D Radiance Cascades Pipeline

> 设计层权威文件之一(与 01-concept-core-loop.md 并列)。TDD §15 的细化和算法对账。
> **v2 已按 `radiance-cascades-demo` 真实算法重写**(JFA pass 数、probe 数学、cascade merging、uPropagationRate/uMixFactor);与 TDD §15 / GDD §5 冲突时以 TDD §15 为准。

## 1. 为什么用 RC(Why Radiance Cascades)

1937 上海弄堂的核心辨识度 = **"灯下黑"**:
- 油灯下的黄晕 + 窗内灯光 + 远处霓虹渗光
- 暗处是隐身区,亮处暴露
- 玩家每开一枪,枪火瞬间点亮整个局部,逼你换位置

**RC 是 2D 像素氛围的天花板**:
- 真实软阴影(传统 fake additive 是硬边)
- 真实 indirect bounce(从墙反射回的光)
- 真实多尺度(从近到远 cascade 分级)

**关键:不是 fake additive** — 一定要走完整 6 阶段管线,否则跟普通 light 一样。

## 2. 6 阶段管线(Stage Diagram)

```
[1] prepscene pass
    用途:场景 + 灯位 → seed 纹理(occlusion + emission 合并)
    输入:SceneManager 渲染的 sceneTexture (RGBA)
         Simulation 的 ActiveRcLight[] (位置/颜色/强度/半径)
    输出:sceneSeed FB (RGBA: 地板 = 编码纹理坐标 seed / 墙 = 空 / 光源 = 光色)

[2] prepjfa pass
    用途:seed 编码统一格式
    输入:sceneSeed
    输出:jfaSeed FB (RGBA: RG = 最近 seed 纹理坐标, B = 距离, A = 有无 seed)

[3] JFA × log2(min(W,H)) passes
    用途:jump flood 生成 SDF
    输入:jfaSeed(prev)
    输出:jfaSeed(next)(final)→ distfield 输入
    pass 数:log2(min(width, height)) 向上取整(v2 冻结,demo 原式;1080p ≈ 10-11)
    跳距:n/2, n/4, ..., 1;每 pass 9 邻域;跳距 1 的 pass 可跳过(降级,±1px 精度)

[4] distfield pass
    用途:距离场提取
    输入:jfaSeed(final)
    输出:sceneSdf FB (R = 到最近墙的归一化距离)

[5] cascade × N(默认 3,ping-pong FB)
    用途:层级化 probe 算出 indirect light
    输入:sceneSdf + sceneSeed(光) + 灯位表 + uLastPass(上级 cascade)
    输出:cascadeBuffer FB (RGB = indirect, A = 占位)

[6] final pass
    用途:scene + cascade + dither → 屏幕
    输入:sceneTexture + cascadeBuffer
    输出:default framebuffer
    dither:4×4 Bayer matrix,量化 indirect 强度回像素
```

## 3. 算法细节(demo 原式)

### 3.1 JFA(Jump Flood Algorithm)

- pass 数 = `log2(min(W,H))` 向上取整,1080p ≈ 10-11(v2 冻结,替代 v1 的固定 5 pass)。
- 每个 pass 的 `uJumpSize` = n / 2^i(n = 短边像素);9 邻域采样,记录最近种子的 UV 和距离。
- 降级时**优先截断跳距序列尾部**(跳过跳距 1 的 pass,代价 ±1px 精度)。

### 3.2 Cascade Probes(demo rc.frag 原式)

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
- 每 ray 在 interval 内用距离场步进(`MAX_RAY_STEPS=128`、`EPS=0.0005`,demo 常量):
  - 命中表面 → 采样 scene 色(可选 mix 上级 lighting,`uPropagationRate`);
  - 未命中 → 从 `uLastPass`(上级 cascade)按 `p.position / up.spacing` 偏移取 probe 合并(merge,`deltaRadiance.a == 0.0` 条件)。
- 角度按 `(index / rayCount) * TWO_PI` 均分,方向乘宽高比修正 `vec2(cos(a) * min(W,H)/max(W,H), sin(a))`。
- `uPropagationRate`(光传播衰减)与 `uMixFactor`(scene / 上一帧光混合比)= demo 同名 uniform,进 Tweakpane 调参。

### 3.3 Dither 回压

4×4 Bayer matrix:
```
0  8  2  10
12 4  14 6
3  11 1  9
15 7  13 5
```

final pass 中:
```glsl
float threshold = bayer4x4[mod(gl_FragCoord.xy, 4)] / 16.0;
vec3 radiance = texture(cascadeBuffer, uv).rgb;
float luma = dot(radiance, vec3(0.299, 0.587, 0.114));
vec3 quantized = step(threshold, luma) * baseColor.rgb;
gl_FragColor = vec4(quantized + baseColor, 1.0);
```

效果:暗部保持 RC 软阴影,亮部回 4-pixel 颗粒,匹配 16×16 像素粒度。

## 4. Shader 清单(GLSL 300 es,移植自 demo)

| 文件 | 阶段 | 输入纹理 | 输出 | Uniform 关键 |
|------|------|----------|------|--------------|
| `fullscreen.vert` | — | — | — | `aPosition`(demo default.vert) |
| `prepscene.frag` | 1 | sceneTexture | sceneSeed FB | `uOcclusionMap, uEmissionMap, uBrushSize, uBrushColor` |
| `prepjfa.frag` | 2 | sceneSeed | jfaSeed FB | — |
| `jfa.frag` | 3 | jfaSeed(prev) | jfaSeed(next) | `uJumpSize` |
| `distfield.frag` | 4 | jfaSeed(final) | sceneSdf FB | — |
| `rc.frag` | 5 | sceneSdf, sceneSeed, uLastPass | cascadeBuffer FB | `uCascadeIndex, uCascadeAmount, uBaseRayCount, uBaseInterval, uPropagationRate, uMixFactor, uAmbientColor, uSrgb` |
| `gi.frag` | 降级 | sceneSdf, sceneSeed, uLastFrame | giBuffer FB | `uRayCount, uNoise, uPropagationRate, uMixFactor`(RC_OFF 前最后一档) |
| `final.frag` | 6 | sceneTexture, cascadeBuffer | default FB | `uDitherEnabled, uTime` |
| `broken.frag` | dev | — | default FB | — |

## 5. 性能预算(TDD §3.5 冻结)

| 指标 | 预算 | 硬上限 |
|------|------|--------|
| RC prepscene | ≤ 1ms | 2ms |
| RC JFA(log2(min(W,H)),1080p ≈ 10-11) | ≤ 2.5ms | 4ms |
| RC cascade × 3 | ≤ 4.5ms(3 × 1.5ms) | 6ms(3 × 2ms) |
| RC final + dither | ≤ 1ms | 2ms |
| 活动光源 | ≤ 16 | 32 |
| 中间 framebuffer | 3 × 1920×1080 RGBA8 | 6 × 1920×1080 |

## 6. 降级路径(autopilot,见 TDD §3.6)

```ts
if (rollingAvgFrameTime > 14ms for 3 frames) {
  applyDegradation('RC_CASCADE_REDUCE');    // cascade 3 → 2
}
if (rollingAvgFrameTime > 14ms for 6 frames) {
  applyDegradation('RC_HALF_RES');          // 1080p → 540p(仅 RC)
}
if (rollingAvgFrameTime > 14ms for 9 frames) {
  applyDegradation('RC_GI_SINGLE_PASS');    // gi.frag 单 pass(§15.3),RC_OFF 前最后一档
}
if (rollingAvgFrameTime > 14ms for 12 frames) {
  applyDegradation('RC_OFF');              // RC 全关,回退纯 base color(性能优先)
}
if (rollingAvgFrameTime < 10ms for 120 frames) {
  removeDegradation();                       // 自动恢复
}
```

降级状态可由 `window.__rcPipeline` 读出。**不**写入 localStorage(本次会话生效)。

## 7. 调试接口(DEV only)

- `window.__rcPipeline` = `{ activeCascades, resolutionScale, ditherEnabled, lastFrameTimeMs, lightCount, jfaPasses, propagationRate, mixFactor, degraded }`
- `window.__gameManifest()` 包含 RC 状态 + 当前 light 列表
- `components/DevPanel.tsx` 提供 Tweakpane 实时调参(cascade / baseRayCount / baseInterval / propagationRate / mixFactor / dither / jfaPasses)

## 8. 已知坑(Known Gotchas)

- **WebGL2 only** — RC 用 `RGBA8` framebuffer 即可,但 `EXT_color_buffer_float` 可选(用于 HDR 优化,M4 之后考虑)
- **Canvas 大小** — 必须 `setSize(width, height, false)`,**不**更新 CSS 大小(否则 1080p 缩放丢精度)
- **Ping-pong FB** — cascade 之间需要 2 个 framebuffer 切换读写
- **Shader 编译失败** — 优先看 `#version 300 es` 是否声明 + `precision highp float;` 是否在 frag 顶部
- **GLSL 330 → 300 es 迁移** — 只改语法(`gl_FragColor` → `out vec4`、`texture2D` → `texture`、`in/out` 属性),**不改算法**
- **JFA pass 数** — 必须按 `log2(min(W,H))` 运行时计算,不要写死 5(demo 原式;写死会在大分辨率下距离场不收敛)
- **M1 验证点** — 击杀时枪火必须瞬时亮起 + 油灯必须常亮(肉眼可见区别)+ 60 FPS @ 1080p

## 9. 移植参考

上游 C++/Raylib/GLSL 实现:
`C:\Git-repo-3rd\Radiance_Cascade_repos\radiance-cascades-demo`

- `res/shaders/rc.frag` ⭐(probe 数学 / propagationRate / mixFactor 原式)
- `res/shaders/prepscene.frag` + `prepjfa.frag` + `jfa.frag` + `distfield.frag`
- `res/shaders/gi.frag` + `final.frag` + `default.vert`
- `res/doc/` 详细文档
