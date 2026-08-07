# 01 · 概念与核心循环(Concept & Core Loop)

> 供:Agent-core / Agent-engine / Agent-ui / Agent-audio 阅读
> 本文档细化 GDD §1-§5 的**设计决策与数值**;接口签名以 TDD 为准。

---

## 1. 高概念(High Concept)

- **Genre**:街机 1v1 / 单屏 / 3-5 分钟一局
- **Tension 轴(Tension Axis)**:**不是"输赢",而是"下一拍能不能打得更爽"** —— rally 累积让世界一起震(观众、灯光、镜头、音频),每一次击拍都是"现在 + 比刚才更爽"
- **Tone**:复古街机 + 现代 juice;参考密度 = Patapon(打拍)+ Vlambeer(juice)+ Crossy Road(纯色体素)
- **玩家扮演**:人类玩家 = 左侧 P1 体素角色;右侧 AI = 规则式对手
- **一句话**:你打的是 Pong,但每一记都像一记鼓点 —— 啪,啪,啪嗒-嘭!

---

## 2. 核心循环(Core Loop)

### 2.1 5-Phase FSM

| Phase | 时长 | 内容 | 退出条件 |
|---|---|---|---|
| **MENU** | 不定 | 主菜单:PLAY 按钮 + 说明 + 设置 | click "PLAY" |
| **READY** | 3.0s | 3-2-1 倒计时;球拍和球就位 | countdown 结束 |
| **PLAY** | 不定(到 7 分) | rally loop(P1/AI 互击) | 球出 X 边界 / Esc |
| **POINT** | 1.2s | 飘字 `+1`;球拍回中 | 1.2s timer |
| **MATCH_OVER** | 不定 | 弹窗 VICTORY/DEFEAT + rematch/menu | R / click |

**关键**:**没有 PAUSE 状态**(街机气质;Esc 在 PLAY 退到 MENU 前需要二次确认)。

### 2.2 PLAY 阶段子循环

```
Paddle hit (P1/AI) → ball 反弹 → 飞向对家 → 对家 paddle hit
  ↓                              ↓
emits: hit event              emits: hit event
  ↓
(camera shake + particle + SFX + squash)
  ↓
rally hits++
  ↓
if rally hits ∈ [3, 5, 7, 10]:
  emit milestone:
    - slowmo (200-300ms)
    - audience jump
    - "PATA-PATA!" / "PATA-PATA-PATA!" / "PATA-PATA-PATA-PONG!" SFX
    - light flash
```

### 2.3 单局时长拆解

| 局 | 预期 rally 数 | 预计时长 |
|---|---|---|
| 速胜(2-3 拍 rally 速胜) | 7 局×2 拍 = 14 拍 | ~30s |
| 普通(平均 5 拍 rally) | 7 局×5 拍 = 35 拍 | ~90s(1.5 分钟) |
| 拉锯(平均 8 拍 rally) | 7 局×8 拍 = 56 拍 | ~150s(2.5 分钟) |
| 极限(平均 12 拍 rally) | 7 局×12 拍 = 84 拍 | ~240s(4 分钟) |

> 命中时长 = 总拍数 × 平均单拍时间(约 2-3 秒一拍)。

---

## 3. 节奏设计(Rhythm Design)

### 3.1 击拍节奏(单拍时间分解)

| 子阶段 | 时间 | 说明 |
|---|---|---|
| Hit 反应(camera shake) | 0.25s | 球拍击中瞬间 |
| Particle 飞行 | 0.5-0.8s | 粒子淡出完成 |
| SFX(PATA!) | 0.08s | 短音 |
| Ball 飞行 | 0.5-1.5s(视速度) | 球从一边到另一边 |
| 对家反应 | ~0.1s | AI 反应时间 |

**单拍周期 ≈ 1.0-2.5s**,平均 1.5-2.0s。

### 3.2 Milestone 节奏

- **第 3 拍**:第一次"哟,有点意思" — 慢镜 0.6× / 200ms + 观众小幅跳 + 双音 PATA-PATA
- **第 5 拍**:"越来越爽" — 慢镜 0.5× / 250ms + 观众大幅跳 + 三音 PATA-PATA-PATA
- **第 7 拍**:"燃起来了" — 慢镜 0.4× / 300ms + 全场灯闪 + 四音 PATA-PATA-PATA-PONG
- **第 10+ 拍**:重复 7 拍效果(不升级)

> **目的**:让玩家有"我正在做一件了不起的事"的累积感 —— 但不要太频繁,以免失去 milestone 价值。

### 3.3 失分节奏

- 球出 X 边界 → 1.2s POINT 阶段(球回中 + 飘字)→ 下一拍
- 1.2s 是"让玩家消化"的时间;不能太长(打断节奏),不能太短(没反应)

---

## 4. 难度曲线(Difficulty Curve)

| Rally 拍数 | 球速(u/s) | 玩家反应时间 | 难度评价 |
|---|---|---|---|
| 1-2 | 8.0-9.2 | 700ms | 教学拍(慢,容错高) |
| 3-5 | 9.8-11.6 | 500ms | 节奏建立(标准) |
| 6-8 | 12.2-14.0 | 350ms | 高手区(快,需预判) |
| 9-12 | 14.6-17.0 | 250ms | 上限区(极快,边界技术) |
| 13+ | 18.0(封顶) | 220ms | 不可持续(谁能挺到这谁赢) |

**设计意图**:
- 1-2 拍 = 暖场,让玩家找手感
- 3-5 拍 = 甜蜜区,大多数局在这里
- 6+ 拍 = 高手对决
- 13+ 拍 = 戏剧性时刻(milestone 反复触发)

---

## 5. AI 难度设计(AI Difficulty)

### 5.1 行为规则

1. **追踪**:每 0.1s 重算 `targetY = ball.y`(球在自己半区时)
2. **平滑插值**:`velocity.y = lerp(currentVy, sign(targetY - currentY) * 8, dt * 4)`
3. **预判**:球在自己半区时,预判 0.2s 后的 Y(`targetY = ball.y + ball.vy * 0.2`)
4. **5% 错位**:每秒掷骰 1 次,若命中则 `targetY += random(-2, 2)` 持续 0.5s

### 5.2 三档预设(stretch,M3 时间够才做)

| 难度 | targetSpeed | lerpRate | misalignProb |
|---|---|---|---|
| Easy | 6 | 3 | 0.15 |
| Normal | 8 | 4 | 0.05 |
| Hard | 10 | 5 | 0.02 |

**MVP 只交付 Normal**;Easy/Hard 是 stretch。

### 5.3 平衡目标

- 平均每局 P1 胜率 ~ 60%
- 极端局(0/7 碾压)出现率 < 5%
- 高 rally(>10 拍)出现率 ~ 15%(有但稀有)

---

## 6. Juice 设计的"为什么"(Why This Juice)

| 反馈 | 替代方案 | 我们的选择 | 理由 |
|---|---|---|---|
| **Camera shake** | 仅 hitstop | shake + hitstop | shake 是"重量感"的廉价表达(参见 Nuclear Throne) |
| **Particle** | 仅 PATA SFX | particle + SFX | 视觉确认(玩家眼睛在屏幕上,先看到再听到) |
| **Squash & stretch** | 仅缩放 | squash 1.2× 80ms | "活物"感;球拍瞬间"打扁"再回弹 |
| **Slow-motion milestone** | 无 | 0.4-0.6× 200-300ms | 让 milestone 时刻成为"暂停回味",增强叙事 |
| **Audience jump** | 仅 light flash | jump + flash | 拟人化反馈(观众是"被逗乐"的角色) |
| **PATA-PATA-PONG 累积音** | 单一 PATA 重复 | 累积变奏 | 让 rally 累积感有听觉强化(Patapon 灵感) |

> **关键**:**所有 juice 同时触发**(同帧),不分散;否则会感觉"零零碎碎"。

---

## 7. 关键决策日志(Decision Log)

| # | 决策 | 日期 | 替代方案 | 理由 |
|---|---|---|---|---|
| D01 | 击拍 = 完整 juice 包(shake + particle + SFX + squash) | 2026-08-07 | 仅 SFX | 视觉先于听觉,玩家先看到再听到 |
| D02 | 球速上限 18 u/s | 2026-08-07 | 无上限 | 防止不可玩;18 是 DDR/音游 8-bit 的常见节奏速度 |
| D03 | Milestone 触发在 3/5/7/10 拍 | 2026-08-07 | 5/10 拍 | 3 拍时玩家已"进入状态",给早期强化 |
| D04 | 没有 PAUSE 状态 | 2026-08-07 | 有 PAUSE | 街机气质,简化 UI |
| D05 | AI 5% 错位 | 2026-08-07 | 0%(完美) | 0% 玩家输不起;20%+ 玩家赢不了 |
| D06 | 零资产文件 | 2026-08-07 | 用现有 8-bit 素材 | 沿用 5_gamejam_1;jam 友好 |
| D07 | 端口 5183 | 2026-08-07 | 5173 / 3000 | 5_gamejam_1 = 5173, 4_chunbai = 3000,本项目独占 5183 |

---

## 附录:文档版本

| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| v0.1 | 2026-08-07 | Mavis (设计阶段) | 初稿 |

## 附录:依赖文档

- GDD:`../GDD.md` §1-§5(本文件的上一级)
- TDD:`../TDD.md` §4(本文件数值的冻结表)
- Art:`02-art-direction.md`
- Audio:`03-audio-direction.md`
- UX:`04-ux-pacing.md`
