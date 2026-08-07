# 04 · UX 与节奏(UX & Pacing)

> 供:Agent-ui + Agent-engine 共同阅读
> 本文档细化 GDD §8 里程碑的 UX 细节。

---

## 1. 一句话体验目标(One-Sentence Experience Goal)

> **打开 → 看到 PLAY → 一键进入 → 5 分钟后还想"再来一局"**

任何破坏这条主线的设计都是负优化。

---

## 2. 首次启动(First-Run Experience)

### 2.1 流程(理想 10s 内进入)

```
0s: 用户打开 localhost:5183
0.5s: 看到 MENU 屏(PATA-PONG 标题 + PLAY 按钮 + 控件说明)
1s: 用户 click "PLAY"
1.2s: 首次 AudioContext.resume() + 3-2-1 倒计时开始
4.2s: 倒计时结束,球 spawn,P1 可控
4.2s+: 第一拍开打
```

### 2.2 关键 UX 决策

- **不强制教程**:MENU 屏 5 行控件说明已足够;不弹 modal
- **不强制注册 / 登录**:完全匿名,纯 localStorage
- **不强制设置**:mute / 音量可在 MENU 右上角调节,默认 0.5 / unmute
- **不弹广告 / 商店推荐**:零

### 2.3 视觉引导

- **标题 PATA-PONG**:逐字渐入(每字符 50ms delay),共 ~400ms 完成
- **PLAY 按钮**:从下方 20px 滑入,弹性缓动(spring damping = 12)
- **控件说明**:在标题出现后 300ms 渐入(opacity 0 → 1,400ms)

---

## 3. 主菜单(MENU)

### 3.1 元素

| 元素 | 位置 | 大小 | 行为 |
|---|---|---|---|
| 标题 PATA-PONG | 屏幕中央偏上 | 80px | 渐入动画(逐字) |
| PLAY 按钮 | 屏幕中央 | 240×60px | click → READY phase |
| 控件说明 | 标题下方 80px | 14px | 静态 |
| Highscore 显示 | 控件说明下方 | 12px | localStorage 读出 |
| Mute 按钮 | 右上角 | 32×32px | toggle |
| 音量滑块 | mute 按钮下方 | 100px | 0..1 |

### 3.2 配色(覆盖在游戏画面上)

- 背景:全黑 50% 透明 + Vignette(让背后 3D 球场隐约可见)
- 标题字色:emerald(P1 配色)+ emissive glow
- 按钮:bg #1a1a3a + border #ff3aaa + text #ffffff
- 按钮 hover:bg #2a2a4a + scale 1.05
- 按钮 active:scale 0.95

### 3.3 背景动效(让菜单"活"起来)

- 3D 球场**持续渲染**(静默状态,无球)
- 球拍做 idle 摆动:`position.y = baseY + sin(t * 2) * 0.2`
- 球拍眼睛偶尔闪一下(emissive bump,随机 5s 一次)
- 观众(若 M3 激活)随机小幅跳

---

## 4. Ready 阶段(3-2-1 Countdown)

### 4.1 视觉

- **大字 "3"** → 1.0s 渐入 + 缩放 0.5 → 1.5 + 渐出(opacity 1 → 0,最后 200ms)
- **同理 "2"**、**"1"**
- **最后 "GO!"** 或 **"PATA!"**(用 PATA! 字样,呼应品牌),1.0s 渐出
- 字号:160px,emerald(emissive)
- 位置:屏幕中央

### 4.2 音频(每数字 + 球拍摆动)

- "3" → 低音 tick(60Hz,80ms)
- "2" → 中音 tick(80Hz,80ms)
- "1" → 高音 tick(100Hz,80ms)
- "GO!/PATA!" → PATA! SFX + 球 spawn + sim.step 开始

### 4.3 3D 球场

- 球拍移动到初始位(P1 = (-10, 0, 0),AI = (+10, 0, 0))
- 球 spawn 在 (0, 0, 0),velocity = 随机向 P1 / AI 之一

---

## 5. Play 阶段(主循环)

### 5.1 HUD

| 元素 | 位置 | 内容 | 字号 |
|---|---|---|---|
| P1 比分 | 左上(40, 40) | 数字 | 48px(emerald) |
| AI 比分 | 右上(width-40, 40,right-anchor) | 数字 | 48px(coral) |
| Rally 拍数 | 屏幕中央顶部(40px from top) | "Rally: 7" | 24px(white emissive) |
| Milestone 提示 | 屏幕中央 | "PATA-PATA!" / "PATA-PATA-PATA!" / "PONG!" | 60px(emerald) |

### 5.2 比分飘字(+1 Overlay)

- 失分方球拍上方出现 `+1`(对方得分)
- 字号:40px,emerald / coral 配色
- 动画:scale 0 → 1.5(200ms 弹跳)→ opacity 1 → 0(800ms 总时长)
- 位置:失分方球拍位置(0, +3, 0)

### 5.3 Milestone 慢镜

- 触发瞬间:屏幕中央出现 milestone 提示文字(大字)
- 文字内容:
  - 3 拍: "PATA-PATA!"
  - 5 拍: "PATA-PATA-PATA!"
  - 7 拍: "PATA-PATA-PATA-PONG!"
  - 10+ 拍: 复用 7 拍文字
- 字号:60px
- 动画:scale 0.5 → 1.0(150ms) → 渐出(opacity 1 → 0,200ms 总)

### 5.4 暂停

- **MVP 不支持暂停**(街机气质)
- `Esc` 键在 PLAY 阶段:弹二次确认 modal("退到菜单?Y / N")
  - Y → MENU
  - N → 继续 PLAY

---

## 6. Point 阶段(失分后 1.2s)

### 6.1 视觉

- 球拍回中(从当前位置 lerp 到 y=0,1.2s)
- 球隐藏或 fade out(0.3s)
- 比分 +1 飘字(失分方上方,800ms)
- HUD 比分数字**弹跳更新**:
  - 旧数字 scale 1 → 1.5(150ms)
  - 旧数字 opacity 1 → 0(150ms)
  - 新数字 scale 0.5 → 1.0(150ms,错开 100ms)
- 1.2s 后:球回中央,新一拍的 READY 状态

### 6.2 音频

- 失分方播 A 小调下行琶音(50ms × 4 音,0.2s,volume 0.2)
- 得分方无(避免抢戏)

---

## 7. Match Over 阶段

### 7.1 视觉

- 全屏 overlay 渐入(opacity 0 → 0.7,500ms)
- "VICTORY" 或 "DEFEAT" 大字从屏幕外飞入:
  - 位置:从屏幕外(off-top)→ 屏幕中央
  - 时长:600ms
  - 缓动:overshoot bounce
- 比分大字:80px,在标题下方 100px,200ms 渐入
- 按钮:REMATCH(主)+ MENU(次),从下方滑入(stagger 100ms)

### 7.2 音频

- Win 音效(VICTORY 出现时)
- Lose 音效(DEFEAT 出现时)
- 背景音:ball 停止,audience(若激活)持续 cheer 2s 然后淡出

### 7.3 交互

- `R` 键 → REMATCH
- click "REMATCH" → 重新 READY
- click "MENU" → 回 MENU
- `Esc` → 回 MENU(同 click "MENU")

---

## 8. 输入延迟预算(Input Latency Budget)

> 街机游戏必须"指哪打哪"。我们目标是 < 50ms(从按键到画面变化)。

| 阶段 | 耗时 |
|---|---|
| 浏览器 input event | < 5ms |
| InputManager → sim 缓冲 | < 1ms |
| sim.step(FIXED_DT) → paddle 更新 | < 0.5ms |
| sim.snapshot() → renderer.sync | < 0.5ms |
| renderer.update → 矩阵写入 | < 1ms |
| composer.render | < 8ms(60FPS 预算) |
| GPU 渲染 + 显示 | < 16ms(60Hz) |
| **总** | **< 32ms(典型)** |

> **不要** 在 rAF 回调里 await 任何东西;所有逻辑必须同步。

---

## 9. 可访问性(Accessibility,72h 简版)

> 72h 不做完整 a11y,但 MVP 必有的:

- [x] 键盘控制(W/S) — 主路径
- [x] 控件说明在 MENU 显示
- [x] Mute 快捷键 `M`
- [x] 配色对比度足够(emerald on dark = 7:1)
- [ ] 屏幕阅读器(不做)
- [ ] 色盲模式(不做)
- [ ] 字体大小调节(不做)

---

## 10. 错误状态与边界(Error States & Edge Cases)

| 情况 | UX 行为 |
|---|---|
| 浏览器不支持 WebGL2 | MENU 显示 "Browser not supported"(静态 HTML,无 three.js 渲染) |
| AudioContext 创建失败 | mute 按钮自动 ON,console.warn |
| localStorage 写失败 | console.warn,设置 / 分数不持久化,游戏照玩 |
| 用户窗口最小化 | sim 暂停?否(rAF 暂停但 sim step 用 Date.now() 累计时间);避免失分 |
| 帧率掉到 30 FPS | PerfWatchdog 启用降级(关 bloom / 砍粒子) |
| 帧率掉到 15 FPS | 进一步降级(球拍缩放简化 / 观众隐藏) |

---

## 11. 性能 vs 体验平衡(Performance vs Experience)

> 关键:**降级路径不能破坏游戏性**

| 降级 | 体验影响 | 可接受 |
|---|---|---|
| 关 Bloom | 球不再发光,有点"哑" | ✅ 可接受(基础 lighting 仍亮) |
| 粒子数减半(20→10) | 视觉反馈"少一半" | ✅ 可接受(主反馈仍存在) |
| 关 audience(M3) | 背景空一点 | ✅ 可接受 |
| Squash 简化 | 球拍不弹 | ⚠️ 谨慎(影响手感) |
| 关闭 shake | 击拍感"轻" | ⚠️ 谨慎(影响打击感) |
| 关闭 slowmo | milestone 效果弱 | ✅ 可接受 |
| 关闭 AI(改固定路径) | 难度乱 | ❌ 不可接受 |

---

## 12. 复盘与迭代(Retrospective Loop)

每 M 末:
- [ ] D1 末:用户打 1 局,记录 N 个手感问题
- [ ] D2 末:用户打 5 局,记录 milestone 触发问题
- [ ] D3 末:用户打 10 局,记录"想再来一局"率
- [ ] 任何一局失分 / 胜方播错 → bug

---

## 附录:文档版本

| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| v0.1 | 2026-08-07 | Mavis (设计阶段) | 初稿 |

## 附录:依赖文档

- GDD:`../GDD.md` §8
- TDD:`../TDD.md` §4.6(FSM 转移表)+ §3.5(性能)
- Concept:`01-concept-core-loop.md`
- Art:`02-art-direction.md`
- Audio:`03-audio-direction.md`
