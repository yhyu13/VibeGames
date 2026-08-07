# Patapong 3D — Game Design Document (GDD) v0.1

> **Pitch（一句话）**: 3D 体素版 Pong,加角色质感和打击感 —— 每一记挥拍都像一记"啪嗒"(Pata),节奏感是它的灵魂。
>
> **作者**: Mavis (设计阶段) · **目标周期**: 72h Vibe Game Jam
> **状态**: v0.1 初稿(冻结 GDD 主轴,数值细节见 TDD §4.4)
> **本文档是 TDD 与实现的设计层权威;与本文档冲突的代码视为 bug**

---

## 0. 系统性研究(Systemic Research)

### 0.1 名字解构:为什么叫 "Patapong"

- **"Pong"**:1972 年 Atari 经典,两条 + 球 + 边界 + 计分 —— 极致简化的 1v1 街机原型。Web 端历史悠久(3dponggame.com 等 2002 Shockwave 移植 + 2021 HTML5 重制版)。
- **"Pata"**:
  - 西班牙语 *pata* = 爪/掌/脚掌
  - 日语 *パタパタ*(patapata) = 啪嗒啪嗒(轻拍/扇动拟声词)
  - 与 PSP 经典 *Patapon* 同源:**节奏 + 打击 + 角色化**。Patapon 3 在 2007-2011 年建立了"打击感即玩法"的范式 —— 每一拍 drum 既是输入,也是反馈。
- **合成含义**:Patapong = "拍响 Pong 的一记" —— 把 Pong 的极简街机骨架,灌入 Patapon 式的"打击节奏感",在 3D 体素美学下重生。

> **风险声明**:网络上不存在已发布的"Patapong"游戏(经 Google / 163 / 百度 / itch.io / GitHub 多轮检索,**2026-08-07** 验证)。本设计是**原创合成**,不与任何已有 IP 同名。如未来发现重名,优先级 = 本文档(原创) > 第三方同名作品。

### 0.2 参考作品矩阵(Reference Matrix)

| 维度 | 参考 | 借鉴点 | 警惕点 |
|------|------|--------|--------|
| **核心循环** | Atari Pong(1972) | 1v1 + 先到 N 分 + 球速递增 | 不要做"现代 Pong 创新"(道具 / 多球) —— 留白给 juice |
| **节奏感** | Patapon 1-3(PSP, 2007-2011) | "一击一拍"的反馈密度;鼓点 → 反馈 → 节奏累积 | Patapon 的难度来自节奏窗口过严(IMDb 7/10 痛点),我们要**宽松窗口 + 强视觉** |
| **3D 视角** | 3D Pong(2002 Shockwave,2021 HTML5) | Z 轴深度 + 透视感的 Pong | 避免 2002 那种"扁扁的伪 3D" —— 我们要真体素透视 |
| **体素美学** | Minecraft / Blackvoxel / Veloren | 体素 = 创作友好 + 视觉一致 + 程序化几何 | 避免"复制 MC":我们用纯色 emissive,不做纹理 / 复杂合成 |
| **Voxel + Web 性能** | hamsters-vs-aliens(Rust+OpenGL 2018) | 破坏体素世界 + GPU instancing | 他们的"destructible"是 overkill,我们只需要 static voxel 装饰 + dynamic 球拍 |
| **JUICE / Game Feel** | Vlambeer(Nuclear Throne / Luftrausers) | screen shake + hitstop + slow-mo + 粒子 = 廉价但强的爽感 | 我们的 72h 不允许 Vlambeer 级精细粒子,用程序化 Points |
| **音频合成** | Patapon 鼓组 + 5_gamejam_1 Web Audio synth | 每次击拍 = 一次短合成音(80ms,attack 强) | 不依赖音频文件(零资产纪律,5_gamejam_1 沿用) |

### 0.3 同名风险扫描(Naming Risk Scan)

- ❌ **Patapon**(Sony) — 不同名,音节差 1,不易混淆
- ❌ **Papa's Games**(Flipline) — 完全不同域(餐厅管理)
- ⚠️ **Patatap** — 暂无同名游戏(Google 验证)
- ✅ **Patapong** = 未注册商标(经 163 / 百度 / 谷歌 / itch 检索,2026-08-07 验证),可安全用作 vibe game 项目名

### 0.4 设计决策的"为什么"摘要(Why This Design)

| 决策 | 替代方案 | 取舍 | 理由 |
|------|----------|------|------|
| **3D 体素 + 一屏街机** | 2D 像素 / 3D 写实 / 3D 卡通风 | ✅ 取 | 体素 = 高视觉一致 + 程序化 + 多人格化;一屏 = 72h MVP 友好 |
| **1v1 vs AI(MVP)/ 2P 本地(stretch)** | 单人剧情 / 联机 | ✅ 取 | 单机 AI = 零网络;街机气质保留 |
| **节奏 = juice 反馈层**(不是输入) | 像 Patapon 一样把节奏当输入 | ✅ 取 | 节奏当输入 = 学习曲线高(Patapon IMDb 7 分痛点);做反馈层 = 零门槛 + 强爽感 |
| **零资产文件**(程序化 + Web Audio) | 模型 / 音频文件 | ✅ 取 | 沿用 5_gamejam_1 惯例 + 72h 不能等资产 |
| **C.A.T 架构** | 单文件 mvp.js | ✅ 取 | 沿用 4_chunbai + 5_gamejam_1 验证过的多代理拆分友好模式 |

---

## 1. 高概念(High Concept)

- **Genre**: 街机 1v1 / 单屏 / 3-5 分钟一局
- **Tension 轴(Tension Axis)**: **不是"输赢",而是"下一拍能不能打得更爽"** —— 累积的 rally hits 让世界一起震(观众、灯光、镜头、音频),每一次击拍都是"现在 + 比刚才更爽"
- **Tone**: 复古街机 + 现代 juice,参考密度:
  - 视觉:Crossy Road + Minecraft(纯色 emissive,无贴图)
  - 反馈:Patapon(打拍)+ Vlambeer(juice)
  - 节奏:DDR / Patapon(每个 hit 都有"节拍点")
- **玩家扮演**:人类玩家 = **左侧 P1 体素角色**(W/S 上下移动,Space 首发球)
- **一句话**:你打的是 Pong,但每一记都像一记鼓点 —— 啪,啪,啪嗒-嘭!

---

## 2. 核心循环(Core Loop)

```
Main Menu → Ready (3s countdown) → Play (rally loop) → Point (1.2s) → Play... → Match Over → Win/Lose Screen → Rematch
              │                                    │
              │              rally loop:           │
              │  P1 hit → ball flies → AI hit ───┐ │
              │         ↕                        │ │
              │  particle + shake + SFX + score  │ │
              │  (juice layer, every hit)        │ │
              │                                  │ │
              │         milestone@3/5/7/10       │ │
              │           slow-mo + audience jump│ │
              └─ first to 7 ────────────────────┘
```

- **单局时长**:典型 2-4 分钟(强 rally 3-5 分钟;速胜 1-2 分钟)
- **节奏**:平均每 1.5-2.5s 一次 hit;每 3-5 次 hit 一次 milestone 慢镜
- **零状态切换**:游戏不暂停(没有 pause,因为没人会暂停街机)

---

## 3. 核心机制(Core Mechanics)

### 3.1 球物理(Ball Physics)

| 参数 | 默认值 | 说明 |
|------|--------|------|
| 初始速度 | 8 u/s | 第一拍(SPACE 启动) |
| 速度递增 | +0.6 / rally | 每次 hit 后 0.05s 内重算(无停顿) |
| 速度上限 | 18 u/s | 封顶;超过封顶则角度再倾斜 |
| 角度范围 | ±60° | 击中位置偏离球拍中心越远,角度越大 |
| Z 轴固定 | Vz = 14 u/s | 透视压缩用,ball 沿 Z 轴朝对家飞 |
| 边界 | Y ∈ [-7, +7] | 上下界,触之反弹(角度不变) |
| 失分 | X = ±10 | 出左右界 = 对方得分 |

> **简化原则**:没有旋转(spin)、没有曲线;碰撞用 AABB 简化,精度 ±0.05u 即可。

### 3.2 球拍控制(Paddle Control)

| 输入 | 作用 | 说明 |
|------|------|------|
| `W` | 向上 | 屏幕相对方向;P1 永远在左 |
| `S` | 向下 | |
| `Space` | 首发球(READY 状态) | PLAY 中无效 |
| `R` | 重开(match over 后) | |
| `Esc` | 暂停 / 退菜单 | 极简菜单 |

- **P1 移动**:加速度模型,目标速度 12 u/s,加速度 60 u/s²,无惯性刹停
- **球拍模型**:3u × 4u × 1u 的体素矩形,**有脸**(2 个 0.3u×0.3u 黑色 emissive 眼睛 emissive 0.0)
- **Squash & Stretch**:击拍瞬间 1.2× 宽,80ms 回弹(GDD §4.5)
- **AI 难度**:追踪球 Y 坐标,目标速度 8 u/s(慢于玩家),随机 ±0.3u 抖动,5% 概率主动错位(给玩家可赢)

### 3.3 AI 对手(AI Opponent)

- **目标**:让 P1 在 60% 局里赢(avoid 0/7 碾压局)
- **行为**:
  1. 每 0.1s 重算 `targetY = ball.y`(球在自己这侧时)
  2. 平滑插值:`velocity.y = lerp(currentVy, sign(targetY - currentY) * 8, dt * 4)`
  3. **预判**:球在自己半区时,预判 0.2s 后的 Y
  4. **5% 错位**:每秒掷骰 1 次,若命中则 `targetY += random(-2, 2)` 持续 0.5s
- **无 ML,纯规则**:72h 不允许训练 AI

### 3.4 评分系统(Score System)

- **先到 7 分者胜**(best of 13,但连胜难)
- **每次失分** = 1 分(对方)
- **rally hits 计数器**:每次 hit +1,失分清零,显示在 HUD
- **High score** 跨局保留(localStorage,见 TDD §3.3)

### 3.5 Rally 速度递增(Rally Escalation)

| Rally 第 N 拍 | 球速 | 玩家反应时间 | 说明 |
|--------------|------|------------|------|
| 1-2 | 8-9.2 u/s | ~700ms | 教学拍,慢 |
| 3-5 | 9.8-11.6 u/s | ~500ms | 节奏建立 |
| 6-8 | 12.2-14.0 u/s | ~350ms | 高手区 |
| 9-12 | 14.6-17.0 u/s | ~250ms | 上限区 |
| 13+ | 18.0 u/s(封顶) | ~220ms | 不可持续,谁能挺到这谁就赢 |

> 速度封顶 + 角度倾斜(命中位置离球拍中心越远)避免"球速无限大 → 不可玩"。

---

## 4. "Pata" Juice 层(Game Feel)

> 这是 Patapong 与普通 Pong 的**唯一区别**。所有 juice 必须**在 ball hit 那一帧同时触发**,且**全部在 §4.6 性能预算内**。

### 4.1 相机震动(Camera Shake)

- **触发**:每次 P1 / AI hit 球
- **强度**:`intensity = 0.15 + (ballSpeed - 8) * 0.04`,clamp [0.15, 0.5]
- **持续**:0.25s
- **衰减**:线性(开始强,结束 0)
- **类型**:3D 随机偏移(X/Y/Z 三个轴,合成向量)
- **实现**:`engine/CameraShake.ts`,每帧 `camera.position += shakeOffset`

### 4.2 粒子爆发(Particle Burst)

- **触发**:每次 hit
- **数量**:12-20 颗(随机)
- **形态**:0.3u 立方体,emissive 颜色 = 击拍方配色
- **物理**:初速 = 击拍反方向 + 球速 × 0.3,带重力(9.8 u/s² 下落)
- **生命**:0.5-0.8s(随机)
- **淡出**:最后 0.2s emissive 强度从 1.0 → 0
- **实现**:**单个 `THREE.Points` + `ShaderMaterial`**,或 `InstancedMesh<BoxGeometry>`,1 个 draw call

### 4.3 音频合成(Audio Synth)

- **"PATA!" 单音**:80ms 总长,attack 5ms / decay 60ms / release 15ms
  - Body:square wave 80Hz + 120Hz 谐波
  - Snap:noise burst(白噪)0-15ms 段,bandpass 600Hz
  - Pitch shift:每局随机 ±50Hz 偏移(让每局"音色"略不同)
- **Rally 累积音效**:
  - 3 hits → "PATA-PATA!" (双音,2 拍间隔 80ms)
  - 5 hits → "PATA-PATA-PATA!" (3 音)
  - 7+ hits → "PATA-PATA-PATA-PONG!" (3 + 1 音,PONG 是低频 50Hz 强音,持续 200ms)
- **Win / Lose**:
  - Win:上升琶音 C-E-G-C(各 100ms)
  - Lose:下降音 G-E-C(各 200ms,reverb 感)
- **Audience cheer**(milestone):4 voices 同时,短促噪声 burst(0.3s,衰减快)
- **实现**:`engine/AudioManager.ts` + `core/data/sfx.ts`(合成配方数据)

### 4.4 Milestone 慢动作(Milestone Slow-Mo)

| Rally 拍数 | 效果 |
|-----------|------|
| 3 | 慢镜 0.6× 持续 200ms + 观众小幅跳 + Audience cheer |
| 5 | 慢镜 0.5× 持续 250ms + 观众大幅跳 + Audience cheer + 灯光闪烁 |
| 7 | 慢镜 0.4× 持续 300ms + 全场灯闪 + 屏幕短暂高亮 + Audience cheer |
| 10+ | 每次 milestone 都触发(不再升级) |

- **实现**:`simulation.slowMoFactor`(影响 `dt`),`engine` 同步读出
- **注意**:慢镜期间**音频不慢**(保持节奏),仅视觉慢

### 4.5 球拍 Squash & Stretch

- **Hit 瞬间**:球拍宽度 × 1.2(80ms 内),高度 × 0.85
- **回弹**:80ms 后 lerp 回 1.0
- **实现**:`paddle.squashAmount` 字段(0=正常,1=最大),engine 读出乘到 InstancedMesh matrix

### 4.6 性能预算(Performance Budget,JUICE 不能踩线)

| 指标 | 预算 | 硬上限 | 触发动作 |
|------|------|--------|----------|
| 粒子活跃数 | ≤ 200 | 256 | 超过 → 旧的开始淡出(不阻塞新粒子) |
| Camera shake 计算 | ≤ 0.1ms/帧 | 0.5ms | 简单 lerp,无 noise lookup |
| Audio 节点数 | ≤ 8 active | 12 | 优先级抢占(hit > milestone > win) |
| 单帧总 juice 开销 | ≤ 1.5ms | 3ms | 超 → 关 Particle Burst(降级) |

> **降级路径**(autopilot,M1 实现):如果连续 3 帧 frame time > 14ms,自动把粒子数从 20 → 8 砍半。

---

## 5. 胜负(Win / Lose)

- **MVP**:先到 7 分者胜 → "MATCH OVER" 弹窗
  - Win:大字 "VICTORY" + Win audio + rematch 按钮 + menu 按钮
  - Lose:大字 "DEFEAT" + Lose audio + 同上
  - 共享:R 键 rematch
- **后端**:**无后端**,纯 localStorage:
  - `patapong.v1.stats` = `{ totalMatches, p1Wins, aiWins, longestRally, lastMatch }`
  - `patapong.v1.settings` = `{ muted, volume }`

---

## 6. Art Direction(概要,详细见 02-art-direction.md)

- **视角**:透视 3D,45° FOV,相机在 (0, 0, 18) 看 (0, 0, 0)
- **美学关键词**:体素、纯色、emissive、霓虹复古
- **配色**:
  - 球场地面:深紫 `#2a1a4a`(基底) + 霓虹粉 `#ff3aaa`(边线)
  - 球场背景:渐变深蓝 `#0a0a2a` → 紫 `#1a0a3a`
  - P1:青绿 `#3affc8`(身体) + `#ffffff`(眼睛 emissive)
  - AI:橙红 `#ff7a3a`(身体) + `#ffffff`(眼睛)
  - 球:金黄 `#ffd83a`(emissive 1.0)
  - 观众:6 色随机分配,每个 0.8u × 1.2u × 0.8u
- **光照**:
  - 主光:DirectionalLight,角度 (5, 8, 6),强度 1.0,色温暖白
  - 环境光:HemisphereLight(蓝紫上 + 暗红下),强度 0.4
  - 无阴影(性能优先;jam 友好;无 shadow acne 烦恼)
- **后处理**:UnrealBloom(轻量, threshold 0.85, strength 0.6) + Vignette(边缘暗角)
- **禁止**:贴图、外部模型、复杂 shader、SSAO / SSR / 动态天空(性能纪律)

---

## 7. Audio Direction(概要,详细见 03-audio-direction.md)

- **音色**:"8-bit chip + 现代低频"混合,square + noise 为主
- **无文件**:全部 `AudioContext` 程序化合成(沿用 5_gamejam_1 配方)
- **主调**:C 大调(亮) / A 小调(暗),局内 70% C 大,失分时 A 小 0.2s
- **音轨分层**(混音):
  - Layer 1:PATA! 单音(每 hit)
  - Layer 2:Rally 累积音(每 milestone)
  - Layer 3:Audience cheer(milestone)
  - Layer 4:背景 pad(50Hz 持续低频 + reverb 感,C 大调,可选)
- **优先级**:`hit > milestone > audience > pad`(抢占式 voice 管理,≤ 8 active)

---

## 8. 72h 里程碑(3-Day Milestones)

| Day | 里程碑 | 交付 | 签核 |
|-----|--------|------|------|
| **D1** | **M1:能玩** | 球场 + 球拍 + 球 + 基础反弹 + 分数 + 1P vs AI | agent-qa + 用户 |
| **D2** | **M2:有手感** | Juice 全部(camera shake + particle + SFX + squash) + milestone 慢镜 + AI 调优 | agent-qa + 用户 |
| **D3** | **M3:能发** | 菜单 + 观众反应 + Win/Lose + localStorage + post-fx + 完整调优 | agent-qa + 用户 |

### 8.1 可砍清单(⛔ Cut-First)

- ⛔ Audience 跳 → 砍(用灯光闪烁代替)
- ⛔ Squash & Stretch → 砍
- ⛔ 灯光闪烁(milestone) → 砍
- ⛔ 后处理 Bloom → 砍(只用 Vignette)
- ⛔ 背景 pad → 砍
- ⛔ localStorage highscore → 砍(M3 时间不够就不做)

### 8.2 Stretch Goals(超出 72h)

- 2P 本地对战(2 键盘,左 P1 = WASD,右 P2 = ↑↓)
- 4 难度 AI(简单/普通/困难/极端)
- Tournament mode(连战 5 局,跨局 stat)
- 体素皮肤系统(玩家可换 P1 配色)
- 3D voxel character creator(让 P1 是自创体素模型)
- 排名榜(纯本地,无网络)
- Steam 移植 / itch 发布

---

## 9. 关键风险 & 对策

| 风险 | 概率 | 影响 | 对策 |
|------|------|------|------|
| 球拍移动手感受限 | 中 | 高 | M2 中段强制 playtest,不通就调 lerp 系数;预留 0.5 天调手 |
| 体素性能超标 | 低 | 中 | M1 就用 InstancedMesh(不返工),加 frame time watchdog |
| AI 太弱(0/7 碾压) | 中 | 中 | 5% 主动错位 + 反应时间调优;3 难度参数;M2 末 playtest 至少 5 局 |
| 音频刺耳(PATA 频率踩坑) | 中 | 中 | 100ms 短音 + lowpass;M2 playtest 必带耳机;音量默认 0.5 |
| 72h 干不完 | 中 | 中 | §8.1 可砍清单硬纪律;M2 末必 review |
| 玩家不知道怎么玩(空菜单) | 低 | 中 | 标题屏大按钮 "PLAY" + 简单 5 行说明 |

---

## 10. 一句话总结(One-Liner)

> **Pong 太冷。Patapong 让每一次击拍都"啪嗒"作响——3D 体素 + 节奏 juice + AI 对手,72 小时做出能让人玩 5 局还不累的街机。**

---

## 附录 A:文档版本

| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| v0.1 | 2026-08-07 | Mavis (设计阶段) | 初稿 |

## 附录 B:依赖文档

- TDD(技术设计/契约):`TDD.md` — **本文件的下游权威**
- 设计细节: `docs/design/01..04-*.md`
- Agent 执行计划:`MVP-PLAN.md`
- 项目级规则:`AGENTS.md`
