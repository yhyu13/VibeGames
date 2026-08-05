# 04 · 音频方向（Audio Direction）

> 供：Coder（TDD 契约方，本文档的事件钩子清单 = TDD 事件联合类型的直接输入）/ Audio 实现代理 / Content 代理（台词 blip 挂钩）阅读。
> 技术方向：**零音频文件** —— 全部音频用原生 **Web Audio API** 实时合成：`OscillatorNode` / `GainNode` / `BiquadFilterNode` / `ConvolverNode` / `StereoPannerNode` / `DynamicsCompressorNode`。
> 与 GDD §6.1 / §6.5 的偏差（本设计有意为之）：不用 Howler.js / Tone.js，不用免费素材 —— jam 72h 内零资产 + 完全程序化是最稳路径；GDD 若未同步更新，以本文档为准。
> 模块建议：`engine/audio/` 下拆 `AudioEngine.ts`（总线/复音预算）、`MusicScheduler.ts`（lookahead 调度器）、`musicPatterns.ts`（谱面数据）、`sfxTable.ts`（音效配方）、`roomImpulse.ts`（房间脉冲生成）。最终文件布局由 TDD 决定。

---

## 1. 音乐系统（Solo Piano + Unstable Strings）

### 1.1 主题动机（Lead Melody）

- 调性 **A 小调**，4/4 拍，基础 BPM **72**（拍长 0.833s，八分音符 0.417s，小节 3.333s，4 小节乐句 = 13.333s）。
- 和弦进行（每小节一个和弦，循环）：**Am – F – C – G**（即 i – VI – III – VII）。
- 音高一律用 MIDI 数字（频率换算：`440 × 2^((m-69)/12)`）。

| 小节 | 和弦 | 琶音/左手低音（half-note，每小节 2 音） | MIDI 数字 |
|------|------|------|------|
| 1 | Am | A2 (0.0s, 1.667s) → E3 (1.667s, 1.667s) | 45 → 52 |
| 2 | F | F2 (3.333s) → C3 (5.0s) | 41 → 48 |
| 3 | C | C3 (6.667s) → G3 (8.333s) | 48 → 55 |
| 4 | G | G2 (10.0s) → D3 (11.667s) | 43 → 50 |

**主旋律（右手独奏）**——时间以小节内拍位计（t 为该事件绝对秒数，72 BPM）：

| 小节 | 拍位 | t (s) | 音符 | MIDI | 时值 |
|------|------|-------|------|------|------|
| 1 (Am) | 1.0 | 0.000 | E5 | 76 | 四分 (0.833s) |
| 1 | 2.0 | 0.833 | A5 | 81 | 四分 |
| 1 | 3.0 | 1.667 | G5 | 79 | 八分 (0.417s) |
| 1 | 3.5 | 2.083 | E5 | 76 | 八分 |
| 1 | 4.0 | 2.500 | D5 | 74 | 四分 |
| 2 (F) | 1.0 | 3.333 | C5 | 72 | 四分 |
| 2 | 2.0 | 4.167 | A4 | 69 | 四分 |
| 2 | 3.0 | 5.000 | C5 | 72 | 四分 |
| 2 | 4.0 | 5.833 | D5 | 74 | 四分 |
| 3 (C) | 1.0 | 6.667 | E5 | 76 | 四分 |
| 3 | 2.0 | 7.500 | G5 | 79 | 四分 |
| 3 | 3.0 | 8.333 | E5 | 76 | 八分 |
| 3 | 3.5 | 8.750 | C5 | 72 | 八分 |
| 3 | 4.0 | 9.167 | D5 | 74 | 四分 |
| 4 (G) | 1.0 | 10.000 | B4 | 71 | 四分 |
| 4 | 2.0 | 10.833 | D5 | 74 | 四分 |
| 4 | 3.0 | 11.667 | G5 | 79 | 二分 (1.667s)，衰减回 Am |

**钢琴音色配方**（每个音符）：`OscillatorNode('triangle')` + 泛音 `OscillatorNode('sine')` 频率 ×2 增益 0.3 → 低通 3500 Hz → 包络 A=0.005s / D=1.2s 指数衰减至 0.0001。可选（性能允许时）：音符起音加 8ms 带通 2 kHz 噪声"锤击毛刺"。
**WAIT 稀疏化规则**：只演奏旋律偶数拍（跳过度拍与部分弱拍）：删除第 2、3 小节第 4 拍音符与第 1 小节第 3.5 拍 → 密度约 0.6×，速度不变。

### 1.2 不稳定弦乐层（Strings Pad）

- 每和弦 4 音弦乐（用 §1.1 和弦表的高声部密集排列：Am=`A3,E4,A4,E5` / F=`F3,A3,C4,F4` / C=`C4,E4,G4,C5` / G=`G3,B3,D4,G4`）。
- 每音 = **1 × sawtooth + 1 × triangle 双振荡器**（性能预算足够时才启用双振荡器，见 §6）。
- 参数：Attack **1.2–2.0s**（随机）、Release 2.5s、低通 1200–1800 Hz（随机 ±150 Hz）。
- 失谐（Detune）：静态 **±6 cents** + 慢 LFO：速率 **0.15–0.3 Hz**（每层随机）、深度 **±4 cents**。实现：LFO → GainNode(±4) → 各振荡器 `detune` AudioParam。

### 1.3 高焦虑时小提琴走音（Violin Out of Tune）

焦虑 **> 60** 启用小提琴层（旋律同 §1.1，sawtooth + 低通 2200 Hz，Attack 0.3s）：
- **颤音抖动（Wobble）**：LFO 速率 **5–9 Hz**（随机 1 Hz 内抖动）、深度 **±35–60 cents**（随焦虑线性涨，86+ 封顶 60）。
- **微音程偏移（Microtonal）**：每个音符固定随机偏移，从集合 `{+20, −14, +8, −27, +35, −22}` cents 抽取；**每 2 小节重抽一次**。
- **漂移（Wander）**：独立慢 LFO 速率 0.8–1.3 Hz、深度 ±12 cents，叠加在 wobble 上。
- 总计 detune = 静态(±6) + 微音程偏移 + 慢 LFO + 颤音 LFO；86+ 时**偶尔跳音**（10% 概率跳过旋律音，替换为低 7 度音，表现"手抖"）。

### 1.4 焦虑分带增益表（Layer Gain Table）

焦虑分带（0–100）：`calm 0–30 / alert 31–60 / high 61–85 / panic 86+`。层增益为线性幅度（各层独立，总和由主压缩器钳制）：

| 层 | 0–30 calm | 31–60 alert | 61–85 high | 86+ panic |
|----|-----------|-------------|------------|-----------|
| 钢琴旋律 | 0.22 | 0.26 | 0.30 | 0.34 |
| 钢琴低音 | 0.16 | 0.20 | 0.24 | 0.28 |
| 弦乐 Pad | 0.00 | 0.10 | 0.22 | 0.30 |
| 八分音型 Ostinato（A2/A3 交替） | 0.00 | 0.00 | 0.12 | 0.18 |
| 小提琴层（走音） | 0.00 | 0.00 | 0.18 | 0.26 |
| 心跳声 Heartbeat（55 Hz，双响） | 0.00 | 0.00 | 0.10 | 0.16 |
| 音乐总低通（§5 混音表） | 9000 | 6800 | 4800 | 3400 |

**分带转换规则**：跨带时所有层增益与低通用 `setTargetAtTime`（timeConstant 0.5s）平滑；调度器 tempo 同步插值（72/72/78/84 BPM），插值窗口 2.5s（见 §2 横移时长）。

---

## 2. 音乐状态机（Music FSM + Crossfade）

音乐状态 = 游戏 FSM 的音频镜像：`wait → sense → perform → evaluate → diary → ending`。

| 音乐状态 | 内容 | 乐句规格 |
|----------|------|----------|
| **wait** | 单人钢琴，稀疏 | §1.1 主题 0.6× 密度（见稀疏化规则），无低音无弦乐；**循环 8 小节**（约 26.7s） |
| **sense** | 上升张力 Ostinato | A2/A3 八分交替（triangle，增益 0.12），和声层每小节 Am/F 交替 + 第 3 小节升 **G# 小三度**制造不协；旋律基本不奏（只留每 4 小节一个 A5 长音）；**循环 2 小节** |
| **perform** | 全编制 | §1.1 完整主题 + 弦乐 + Ostinato + 心跳 +（高焦虑）小提琴；**循环 4 小节**；tempo 随焦虑带 72/78/84 |
| **evaluate** | 安静复奏 | 钢琴 0.5× tempo 主题（即每音时值 ×2），+ 弦乐 pad 0.06 极弱 + 单回声（delay 400ms / feedback 0.3，一阶）；**循环 8 小节** |
| **diary** | 无音乐 / 钢琴独音 | 主循环静默；仅每 **3–5s** 随机单音（A 五声音阶 A4 C5 D5 E5 G5 = 69/72/74/76/79），增益 0.08，R 2s —— "一个人在纸上写字的声音" |
| **ending** | 解决 | 终末 Am 大三度化（A–C#–E = 57/61/64，A 大调 Picardy 三度），**保持 6s** 后全静音；隐藏结局走 §3.15 全静音规程 |

**Crossfade 规格**（新状态调度器从横移开始点立即启动自己的循环，各层增益 linearRampToValueAtTime 在横移秒数内从旧值→新值；同时 tempo 按同窗口线性插值）：

| 转移 | 横移时长 | 附加 |
|------|----------|------|
| wait → sense | **1.2 s** | — |
| sense → perform | **2.5 s** | 横移开始 2.0s 处放 `riser`（§3.12） |
| perform → evaluate | **3.0 s** | 强衰减：低通 3.0s 内 9000→6000 Hz 再回 evaluate 设定 |
| evaluate → wait（下一轮） | **1.5 s** | — |
| evaluate → diary | **0.8 s** | — |
| diary → wait | **1.5 s** | — |
| 任意 → ending | **4.0 s** | 渐出至 Am(Picardy) 和弦，保持 6s 后总静音 |

---

## 3. 音效表（SFX Table，全部合成配方）

所有配方给出：节点链、频率/参数、包络、时长、目标总线（dry/room send）。统一约定：`A=attack, D=decay, R=release`；指数衰减用 `setTargetAtTime(0, t, tc)` 或 `linearRampToValueAtTime` 视场景（配方中注明"指数"即 setTargetAtTime）。

### 3.1 throneCreak · 王座吱呀（1.4s）
- osc1 `sine` **55→38 Hz** 下滑（0.9s linearRamp），增益 0.25，包络 A=0.05 / 指数 D=1.2；
- osc2 `sine` 42→31 Hz，**延迟 0.3s 起**，0.9s，增益 0.15（"第二根木头"）；
- 噪声爆发：白噪声 60ms → 带通 400 Hz Q=4，增益 0.12；
- 总线：低通 900 Hz → dry 90% / room 10%。
- 触发：Boss 入座/起身动画。

### 3.2 armorScrape · 盔甲片摩擦（0.8s）
- 白噪声 → 带通 **1800 Hz Q=8**，包络 A=0.15 / 指数 D=0.65，峰值 0.30；
- 幅度调制：`sine` 7 Hz LFO 经 GainNode 深度 0.6（"铁片一卡一卡"）；
- 第二层：带通 3200 Hz Q=10，增益 0.12，同步播放；
- 可选：起始频率每触发 ±200 Hz 随机。

### 3.3 footstep · 脚步声（0.15s + 距离处理）
- 低频重踏：`sine` **90→60 Hz**，0.09s，增益 0.4；
- 短噪：白噪声 → 低通 500 Hz，0.04s，增益 0.2；
- **距离 d（米）处理**（玩家是"概念"，只有脚步声道具）：
  - 音量 `gain = clamp(8 / (d+2)², 0.04, 1)`；
  - 低通截止 `cutoff = clamp(6000/d, 300, 5000)` Hz；
  - room send wet 比例 `0.04 + d/25`（近干远湿）；
- **3D 声像**：`StereoPannerNode`，`pan = clamp(sin(angle), −1, 1)`，`angle` = 玩家相对 Boss 朝向的方向角（0 = 正前方）→ 脚步横穿舞台时左→右声像移动；
- 节拍：逼近步进 0.6s；`Sense` 阶段每 0.6s 一次，共 5–8 次（匹配 01 文档 Sense 5–8s 时长）。

### 3.4 waterDrip · 远处水滴（1.8s 含混响尾）
- `sine` **2200→1800 Hz** 下滑，0.06s，增益 0.18，包络 A=0.002 / D=0.06；
- 强制进 ConvolverNode：**wet 70%**（房间尾音）；预延迟 20ms 内建于 IR（§5.2）；
- 触发：仅 wait / evaluate / diary 态，随机间隔 **4–9s**，立体声随机 pan ±0.8；
- "空房间"的核心意象，混响发送是普通音效的 3.5 倍（0.70）。

### 3.5 swordWhoosh · 剑风（0.4s）
- 白噪声 → 带通**频率扫描 300→2500 Hz**（0.35s ramp，Q 2→6）；
- 包络 A=0.08 / 指数 D=0.32，峰值 0.30；
- 变体：`whooshUp`（2500→300 Hz 反向扫描）/ `whooshDown`，随机抽取；
- pan：按攻击方向 ±0.6。

### 3.6 hitImpact · 命中（0.35s）
- 噪声爆发：低通 1200 Hz，0.12s，增益 0.50，A=0.002；
- 低频重击：`sine` **110→45 Hz**，0.18s，增益 0.60；
- 瞬态点击：噪声 → 高通 3000 Hz，0.02s，增益 0.15；
- 总线：dry 85% / room 15%。

### 3.7 miss · 未命中（0.28s）
- 带通噪声扫描 **1200→700 Hz 下行**，0.25s，Q=4，增益 0.15（"挥空了的风"）；
- 空中闷响：`sine` 70 Hz，0.08s，增益 0.05，延迟 0.05s 起；
- 若连续 3 次 miss → 触发一次 `stingerForgetLine`（Boss 信心崩）。

### 3.8 paperFlip · 翻档案（0.10s / 双翻变体 0.19s）
- 白噪声 → 带通 **2500 Hz Q=1.5**，包络 A=0.005 / 指数 D=0.085，增益 0.25；
- `flip2` 变体：第二段噪声 +0.09s 起，带通 3300 Hz，增益 0.15（翻第二页）。

### 3.9 candleFlicker · 烛火（循环 Ambient）
- 粉噪声发生器 → 带通 **650 Hz Q=3** → 低通 3000 Hz → 增益；
- 增益随机游走：每 **80–150ms** 从 0.06–0.22 重抽；焦虑 > 60 时改为每 40–80ms、区间 0.04–0.18（烛火随心跳发抖）；
- 基准增益 0.08；wait/sense/evaluate/diary 播放；perform 态降至 0.03。

### 3.10 dialogueBlip · 台词点（0.06s）
- `triangle`，频率随机取自 `C5 D5 E5 G5 A5`（72/74/76/79/81），0.05s，增益 0.06，A=0.005；
- **Boss 变体**：−2 半音、增益 0.05、A=0.02（不情愿的嘟囔）；**玩家变体**：原调、增益 0.07、A=0.005（急切）；
- 不过混响（近距感）、pan 居中；每条台词一个 blip（内容由 Content 代理的台词 JSON 驱动）。

### 3.11 uiClick · UI 点击（0.03s）/ uiHover（0.02s）
- 点击：`square` 2200 Hz，0.03s，增益 0.09，低通 4 kHz；
- 悬停：`sine` 1100 Hz，0.02s，增益 0.04。

### 3.12 riser · 升压过渡（sense→perform 专用，2.0s）
- 白噪声 → 带通扫描 **200→4000 Hz**，2.0s，Q=1；
- 增益 0→0.25（0–1.6s）→0.10（1.6–2.0s）；
- 仅在 `sense→perform` 横移开始 2.0s 处触发一次。

### 3.13 stingerForgetLine · 忘记台词 Stinger（1.2s）
- 双正弦 **440 Hz + 415 Hz**（小二度），A=0.15 / 保持 0.5 / R=0.5，增益 0.20 —— 大脑当机的"嗡"；
- 气声：白噪声 → 低通 300 Hz，0.4s，增益 0.10；
- **事件副作用**：音乐 duck −6 dB 持续 2s（§5.3）；心跳层暂停 1.5s（"世界静止"）。

### 3.14 stingerFallHair · 摔倒 + 整理头发 Stinger（1.4s，两段式）
- **段 1 摔倒（t=0）**：sawtooth **300→80 Hz** 下滑 0.4s + 白噪声低通 400 Hz，增益 0.25；t=0.35s 落地闷响 `sine` 80 Hz 0.15s 增益 0.30；
- **段 2 整理头发（t=0.7s）**：sawtooth **200→600 Hz 上滑** 0.25s，增益 0.12，低通 2 kHz（漫画式"理一理"装饰音）；
- 喜剧节奏全靠两段错开的 0.7s 间隔。

### 3.15 stingerFiveStar · 5 星 Moment Stinger（2.5s）
- 三连钟鸣：`sine` **C6(1046.5) @0.0s / E6(1318.5) @0.12s / G6(1568) @0.24s**，各 A=0.01 / R=0.7，增益 0.15；
- 温暖低音涌起：双 `sine` 220+221 Hz（±1 cent 失谐），A=1.5 / R=2.0，增益 0.10；
- 无鼓、无 riser —— 温柔到可疑的鼓励；dry 60% / room 40%。

### 3.16 hiddenEndingSilence · 隐藏结局全静音规程（Direction）
1. **t=0**：停止全部调度器与 Ambient 循环；master 线性 3s → −∞；混响 wet 归零（不留尾音）；
2. **t=3s 起**：**绝对静音 ≥ 10s** —— 无底噪、无 drone、无房间氛围、无脚步声；SFX 系统全局 mute（仅保留系统断言：`silence` 事件期间任何非白名单事件被丢弃）；
3. **t=13s**：唯一一个音符 —— 钢琴 **E4(64)**（§1.1 音色），增益 0.05，R=4s。剧本注："唯一诚实的音符"。
4. 静音是**有意的设计元素**，不是故障；UI 需同时给出"再听不到心跳"的视觉印证（烛火熄灭）。

### 3.17 可砍清单（与 GDD §7.1 对齐）
- ⛔ 心跳层（§1.4）→ 砍（panic 带仅剩低通+小提琴）
- ⛔ 双振荡器弦乐（§1.2）→ 砍（只用单 sawtooth）
- ⛔ 玩家变体 dialogueBlip 音高差 → 砍（统一 blip）
- ⛔ 3.7 连续 miss 联动 stinger → 砍（保留单一 miss 音）

---

## 4. 动态混音（Dynamic Mixing）

### 4.1 主链路（Master Chain）

```
musicBus → musicLPF(Biquad) → musicDuckGain ─┐
sfxBus  ─────────────────────────────────────┼→ masterGain → compressor → dryGain ─→ limiter → destination
ambBus  ─────────────────────────────────────┤                    └→ wetGain → ConvolverNode(房间IR) → limiter
```

- **Compressor**（总线黏合）：threshold **−18 dB**、ratio **3:1**、attack 10ms、release 150ms、knee 6dB。
- **Limiter**（Web Audio 无真限幅器，用第二个压缩器近似）：threshold **−6 dB**、ratio **20:1**、attack 1ms、release 60ms。
- **ConvolverNode（空房间 IR）**：单实例全局共享（性能关键，见 §6）；立体声 IR 程序化生成，**1.2s @ 44.1kHz（52920 采样）**，头部内建 20ms 预延迟：
  - 早期反射：6 个离散反射 tap，位置 {8, 13, 17, 22, 30, 41}ms、增益 {0.50, 0.38, 0.30, 0.22, 0.14, 0.08}，L/R 交替随机 pan ±0.8；
  - 晚期扩散：立体声白噪声 × `exp(−3t/1.1)` 衰减至 1.2s，归一化峰值 **−18 dBFS**；
  - RT60 ≈ **1.1s**（哥特石室感，够"空"但不会糊掉台词）。
- **混响发送（wet 比例）**：音乐 0.08 / 一般音效 0.20 / 水滴 0.70 / 脚步 0.04+d/25 / 台词 0.02 / 钢琴 evaluate 复奏 0.15。

### 4.2 焦虑分带混音规则（Anxiety Band Rules）

跨带时 `setTargetAtTime` 平滑 0.5s：

| 分带 | musicLPF (Hz) | music 增益 × | 总 detune ±(cents) | tempo (BPM) |
|------|---------------|--------------|---------------------|-------------|
| 0–30 calm | 9000 | 1.00 | 4 | 72 |
| 31–60 alert | 6800 | 1.05 | 7 | 72 |
| 61–85 high | 4800 | 1.12 | 14 | 78 |
| 86+ panic | 3400 | 1.18 | 25（+wobble 60 封顶） | 84 |

低通物理含义：焦虑越高"房间越窄"，高频被闷住，同时 detune 累积让弦乐明显走音。

### 4.3 对白 Ducking

- `dialogue` 事件开始：musicDuckGain linearRamp **−6 dB**（0.15s 内），保持台词时长 + 0.3s，之后 0.8s 回 0 dB；
- `stingerForgetLine` 触发额外 −6 dB × 2s（叠加态取更低的那个目标值）；
- **永不 duck SFX / ambience**（水滴与烛火是"房间存在感"，不能消失）。

### 4.4 3D 声像提示（Footsteps Direction）

- 脚步/剑风：`StereoPannerNode`；脚步 `pan = clamp(sin(angle), −1, 1)`（angle 定义见 §3.3）；
- 命中/台词/UI：居中；水滴：随机 ±0.8；
- 距离三件套：增益衰减 + 低通下移 + wet 上升（§3.3）；
- 可选（时间充裕时）：脚步换 `PannerNode('HRTF')` 纵深感更真；砍底方案一律 StereoPanner。

---

## 5. 事件钩子（Event Hooks → TDD 事件联合类型）

> TDD 代理请直接以本节的 `SoundId` 与 `SimEvent` 联合类型建立事件总线；`sound` 事件只携带 ID，全部参数（距离/角度等）用专属事件携带。

### 5.1 事件联合类型建议（TDD 输入）

```ts
type AnxietyBand = 'calm' | 'alert' | 'high' | 'panic';
type MusicState = 'wait' | 'sense' | 'perform' | 'evaluate' | 'diary' | 'ending';
type SoundId =
  | 'throneCreak' | 'armorScrape' | 'waterDrip' | 'swordWhoosh' | 'hitImpact'
  | 'miss' | 'paperFlip' | 'candleFlicker' | 'dialogueBlip' | 'uiClick'
  | 'uiHover' | 'riser' | 'stingerForgetLine' | 'stingerFallHair'
  | 'stingerFiveStar' | 'heartbeat' | 'endChime';

type SimEvent =
  | { type: 'music'; state: MusicState }                          // 状态转移（横移时长查 §2 表）
  | { type: 'anxiety'; value: number; band: AnxietyBand }         // 数值 + 分带（驱动 §1.4/§4.2）
  | { type: 'sound'; sound: SoundId }                             // 一次性音效（表 3.x）
  | { type: 'footstep'; distance: number; angle: number }         // 玩家脚步道具（§3.3）
  | { type: 'dialogue'; speaker: 'boss' | 'player'; blip: boolean } // 台词开始（duck + blip）
  | { type: 'silence'; duration: number }                         // 隐藏结局全静音（§3.16）
```

> `endChime` = ending 态 Am(Picardy) 和弦触发音；`heartbeat` 由音乐层内部节奏驱动，也可由焦虑事件跨带时手动触发一次。

### 5.2 游戏时刻 → 事件映射表（对齐 GDD §4 情感节拍）

| 时刻 | 游戏事件 | 派发 SimEvent |
|------|----------|---------------|
| 0:00 | Boss 入座 | `music(wait)` + `sound(throneCreak)` + `sound(candleFlicker)`（amb 循环开启） |
| 0:05 / 0:15 / 0:25 | 翻阅历任档案 | `sound(paperFlip)` ×3 |
| 0:30 | 玩家出现 | `music(sense)`（1.2s 横移） + `footstep{d=20, angle=0}` |
| 0:30–1:20 | 玩家逼近 | `footstep{d, angle}` 每 0.6s（d 由 3D 代理驱动） |
| ~1:20 | Boss 慌忙起身 | `sound(armorScrape)` + `anxiety{value, band}`（首次见玩家 +8） |
| 1:30 | 战斗开始 | `music(perform)`（2.5s 横移）+ `sound(riser)`（横移 2.0s 处）+ 每条台词 `dialogue{speaker:'boss', blip:true}` → 每句 `sound(dialogueBlip)` |
| 忘词瞬间 | 台词失败 | `sound(stingerForgetLine)`（音乐 duck 联动见 §4.3） |
| 战斗全程 | 攻击/命中/落空 | `sound(swordWhoosh)` / `sound(hitImpact)` / `sound(miss)` |
| 3:00 | Boss 摔倒→理头发 | `sound(stingerFallHair)` |
| 4:30 | 战斗结束 | `music(evaluate)`（3.0s 横移） |
| 自评 | 星级选择 | `sound(uiClick)` ×N / `sound(uiHover)` |
| 自评 5 星 | 玩家打 5 星 | `sound(stingerFiveStar)` + `anxiety{value−15}` |
| 日记 | 写评语 | `music(diary)`（0.8s 横移） |
| 5:00 | 谢幕 | `music(ending)`（4.0s 横移）+ `sound(endChime)` |
| 隐藏结局 | Boss 拒绝战斗 | `silence{duration: 13}`（§3.16 全静音规程） |

### 5.3 音频系统内部订阅（不对外发事件）

- `anxiety` 事件 → 更新分带表（§1.4 / §4.2），分带变化即平滑过渡；
- `dialogue` 事件（blip=true）→ duck + blip；Boss 变体音高规则见 §3.10；
- `music` 事件 → MusicScheduler 切状态（§2 横移表）；
- `footstep` 事件 → §3.3 距离/声像处理。

---

## 6. 性能预算（Performance Budget）

### 6.1 复音预算（Simultaneous Voice Budget）

| 组 | 最大同时发声 | 优先级 | 超限策略 |
|----|--------------|--------|----------|
| 音乐层 | **12** | 高 | 按 弦乐>小提琴>Ostinato>心跳 顺序跳音（不偷刚起的钢琴音） |
| 音效一次性（SFX） | **8** | 中 | 偷最老/最轻的音 |
| Ambient 循环 | **4** | 高 | 不允许偷（水滴/烛火是房间存在感） |
| **总硬上限** | **24（硬顶 32）** | — | 全局守卫：>32 强制静音最老声源 |

- 复音计数口径：一个活跃 `AudioScheduledSourceNode`（osc/noise）+ 其未结束的包络 = 1 声；**ConvolverNode 全项目只建 1 个实例**（共享混响，绝不为每个音效 new）。
- 声源生命周期：包络结束（指数衰减至 0.0001）→ `stop()` → 立即 `disconnect()` 并归还池；不允许泄漏的孤儿节点。

### 6.2 音符调度（Lookahead Scheduler）

- 经典 lookahead 模式（"A Tale of Two Clocks"）：`setInterval(25ms)` 的 JS 定时器只做**调度**，一切播放时刻以 `audioCtx.currentTime` 为准；窗口 `[now, now + 0.12s]` 内预排音符，**永不**用 setTimeout 直接触发发声；
- 每个音乐状态拥有自己的谱面数据（音符表 + 循环长度），调度器按拍计数推进；tempo 变化时按当前横移窗口逐音符插值（每音符记录排程时的 tempo 快照）；
- 同一声源在包络结束后复用（oscillator 可 `start()` 一次，建议每次 new + pool，简单可靠）；
- 音频线程负载目标 < 1ms/帧，主线程调度开销 ≈ 40Hz × 微量，不构成 60FPS 风险。

### 6.3 用户手势恢复（AudioContext Resume）

- `AudioContext` 懒创建（首次需要音频时）；注册一次 `pointerdown` / `keydown` 捕获监听 → `ctx.resume()`，成功即移除；
- 若 `ctx.state === 'suspended'`（浏览器策略/切后台）→ 下一次任意手势 resume；不重复创建 context；
- 页面只允许 1 个 AudioContext 实例；iOS 规则：首个手势前不发声，之后持续可用。

---

## 7. 实现清单（给 Coder 的验收要点）

1. MusicScheduler 支持 6 个状态 + 7 条横移（§2 表），lookahead 窗口 0.12s；
2. 主题谱面数据（§1.1 表）可被 wait/perform/evaluate 三态复用（密度/时值系数不同）；
3. 分带表（§1.4 / §4.2）由 `anxiety` 事件驱动，平滑参数 0.5s；
4. SFX 表（§3）16 个 ID 全部可播放，参数与本文档一致（常量集中在 `sfxTable.ts`，标注 tunable）；
5. 主链路（§4.1）+ duck（§4.3）+ 房间 IR（§4.1 内嵌规格）；
6. 复音守卫（§6.1）与手势恢复（§6.3）必须实现；
7. 可砍项（§3.17）以开关常量隔离，默认开启。

## 8. 开放问题（Open Questions）

1. **GDD §6.1 技术栈冲突**：GDD 写 Howler.js + Tone.js、§6.5 写免费素材；本文档以原生 Web Audio + 零素材覆盖之 —— 需确认 TDD 是否据此更新 GDD，或维持 GDD 作为"参考"。
2. **喘息声**：GDD §6.5 提到"自录喘息声"，零素材约束下无法自录 —— 是否接受"滤波噪声 + 慢 LFO 振幅"的合成呼吸声（可选音效，未列入 §3 主表）？
3. **全静音时长**：隐藏结局 10s 绝对静音是强设计，若 playtest 反馈"像死机"，是否缩短到 6s（保持"明显异于全作"即可）？
4. **脚步事件归属**：`footstep{distance, angle}` 参数由 3D 代理提供 —— 若玩家 AI 被砍（GDD §7.1 ⛔ 第二项），脚步声将退化为"想象玩家"的固定轨迹，是否保留随焦虑加重的脚步（更响/更快）？
5. **blip 与台词节奏**：中文台词较长时，单句 1 个 blip 是否足够；是否需要"每 4 个汉字一 blip"的节奏模式（Content 代理需提供分句长度数据）。

---

*文档版本 v0.1 · 72h game jam · 纯 Web Audio 合成 · 零音频文件*
