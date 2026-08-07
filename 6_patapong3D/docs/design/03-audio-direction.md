# 03 · 音频方向(Audio Direction)

> 供:Agent-engine(AudioManager)+ Agent-core(sfx 数据)阅读
> 本文档细化 GDD §7 音频;所有合成配方数据在 `core/data/sfx.ts`(M1.2 由 agent-content 填)。

---

## 1. 总则

- **零文件**:全部 `AudioContext` 程序化合成
- **音色**:"8-bit chip + 现代低频"混合,**square wave + noise burst** 为主
- **调性**:**C 大调**(默认)/ **A 小调**(失分时)
- **声部上限**:**6 active**(TDD §4.4,优先级抢占)
- **主音 vs 背景音量** = 70% / 30%(确保 hit 永远清楚)

---

## 2. 主音色定义(Voices)

### 2.1 PATA!(单拍,主反馈音)

| 参数 | 值 | 说明 |
|---|---|---|
| 总时长 | 80ms | 极短,清晰 |
| Attack | 5ms | 瞬态强(像鼓点) |
| Decay | 60ms | 主体 |
| Release | 15ms | 收尾 |
| Body | square 80Hz + 120Hz 谐波(2 振荡器叠加) | 厚度 |
| Snap | noise burst 0-15ms,bandpass 600Hz | 攻击感 |
| Volume | 0.8 (peak) → 0(80ms 后) | ADSR 包络 |
| Lowpass cutoff | 1500Hz | 防止刺耳 |

**为什么这样设计**:
- 80Hz 是经典 Pong PATA 的频率(Atari 1972 实际是 1kHz 噪声,但 80Hz 更厚)
- 5ms attack 模拟鼓点(瞬态)
- noise burst 加 attack 感(让击拍"硬"起来)
- lowpass 1.5kHz 防止高频刺耳(72h 必带耳机测试痛点)

### 2.2 PATA-PATA!(3 拍 milestone)

| 音 | 频率 | 时长 | 间隔 |
|---|---|---|---|
| PATA 1 | 80Hz | 80ms | 0 |
| (silence) | — | 80ms | — |
| PATA 2 | 100Hz(+50 cents?) | 80ms | 80ms |
| (silence) | — | 80ms | — |

> 频率递增(80→100Hz)给"上爬"感。

### 2.3 PATA-PATA-PATA!(5 拍 milestone)

3 音递增:80Hz → 100Hz → 130Hz,每音 80ms,间隔 80ms。

### 2.4 PATA-PATA-PATA-PONG!(7 拍 milestone,高潮)

| 音 | 频率 | 时长 | 间隔 |
|---|---|---|---|
| PATA 1 | 80Hz | 80ms | 0 |
| PATA 2 | 100Hz | 80ms | 80ms |
| PATA 3 | 130Hz | 80ms | 80ms |
| (silence) | — | 60ms | — |
| PONG! | 50Hz(square) | 200ms | 60ms |
|  | 100Hz(square) | 200ms | 60ms |
|  | noise(2kHz) | 80ms | 60ms |

> PONG 是低频重击 + 噪声尾巴(模拟 Pong 经典 + 现代 PONG)。

### 2.5 Audience Cheer(milestone 背景)

| 参数 | 值 |
|---|---|
| 形态 | 4 个短促 noise burst 叠加,bandpass 800-2000Hz 扫频 |
| 时长 | 0.3s |
| Volume | 0.4(milestone: small 0.3 / large 0.5 / max 0.7) |
| 频率扫 | 800Hz → 2000Hz(0.3s 内) |

### 2.6 Win(胜利)

| 音 | 频率 | 时长 | 间隔 |
|---|---|---|---|
| C | 261.6Hz | 100ms | 0 |
| E | 329.6Hz | 100ms | 100ms |
| G | 392.0Hz | 100ms | 100ms |
| C(高八度) | 523.2Hz | 400ms | 100ms |

> 上升琶音,大调明亮感。

### 2.7 Lose(失败)

| 音 | 频率 | 时长 | 间隔 |
|---|---|---|---|
| G | 392.0Hz | 200ms | 0 |
| E | 329.6Hz | 200ms | 200ms |
| C | 261.6Hz | 400ms(reverb) | 200ms |

> 下降音,小调,reverb(模拟"独处感")。

### 2.8 背景 Pad(可选,M3 stretch)

- **形态**:持续 50Hz square + 100Hz 谐波(2 振荡器)+ reverb(convolver / 自实现)
- **Volume**:0.1(背景层,几乎听不见)
- **触发**:`GamePhase = PLAY` 时开启,`MATCH_OVER` 时淡出
- **目的**:让 PLAY 阶段有"持续的张力"背景

---

## 3. 节点图实例化(Node Graph Instantiation)

每个 SFX 配方在 `core/data/sfx.ts` 描述为 declarative,`engine/AudioManager.ts` 实例化为实际节点图。

### 3.1 SFX 数据结构(冻结)

```ts
// core/data/sfx.ts
export interface SfxRecipe {
  id: SfxId;
  voices: SfxVoice[];
  totalDuration: number;  // seconds
  baseVolume: number;     // 0..1
}

export interface SfxVoice {
  startAt: number;        // seconds
  type: 'square' | 'noise' | 'sine' | 'triangle';
  freq: number;           // Hz
  freqRamp?: { to: number; duration: number };
  duration: number;       // seconds
  envelope: { attack: number; decay: number; release: number };
  filter?: { type: 'lowpass' | 'highpass' | 'bandpass'; cutoff: number; q: number };
  volume: number;         // 0..1
}
```

### 3.2 实例化流程(`engine/AudioManager.ts`)

```ts
function playSfx(recipe: SfxRecipe) {
  // 1. 抢占式 voice 管理(若 active >= 6,丢最低优先级)
  if (activeVoices.length >= 6) {
    const lowest = findLowestPriority(activeVoices);
    if (recipe.priority > lowest.priority) {
      stopVoice(lowest);
    } else {
      return; // drop
    }
  }

  // 2. 为每个 voice 创建节点图
  for (const v of recipe.voices) {
    const osc = audioContext.createOscillator();
    osc.type = v.type;
    osc.frequency.value = v.freq;

    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0, audioContext.currentTime + v.startAt);
    gain.gain.linearRampToValueAtTime(v.volume, audioContext.currentTime + v.startAt + v.envelope.attack);
    gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + v.startAt + v.duration);

    let lastNode: AudioNode = osc;
    if (v.filter) {
      const filter = audioContext.createBiquadFilter();
      filter.type = v.filter.type;
      filter.frequency.value = v.filter.cutoff;
      filter.Q.value = v.filter.q;
      lastNode.connect(filter);
      filter.connect(gain);
    } else {
      lastNode.connect(gain);
    }
    gain.connect(audioContext.destination);

    osc.start(audioContext.currentTime + v.startAt);
    osc.stop(audioContext.currentTime + v.startAt + v.duration);

    activeVoices.push({ recipeId: recipe.id, osc, gain, priority: recipe.priority });
  }
}
```

---

## 4. 优先级与抢占(Priority & Preemption)

### 4.1 优先级表(降序 = 高优先)

| 优先级 | SFX | 说明 |
|---|---|---|
| 5 | `matchOver`(Win/Lose)| 重要状态,不能丢 |
| 4 | `pataPataPong`(7 拍)| 高潮 milestone |
| 3 | `pataPataPata`(5 拍)| 大 milestone |
| 2 | `pataPata`(3 拍)| 小 milestone |
| 2 | `audienceCheer`(milestone)| 与 milestone 同时触发 |
| 1 | `pata`(单拍)| 默认反馈,可被抢占 |
| 0 | `bgPad`(背景)| 最低优先,被任何其他抢占 |

### 4.2 抢占规则

- 活跃 voices < 6 → 新 SFX 直接播放
- 活跃 voices >= 6 → 比较新 SFX 优先级与最低优先级活跃 voice:
  - 新 > 旧最低 → 停旧,放新
  - 新 <= 旧最低 → drop 新(本帧不播)

---

## 5. 失分时调性切换(Tonal Shift on Point Loss)

- **失分瞬间**(`SimEvent.point` 触发):
  - 触发方 0.2s 内播一段 A 小调下行琶音(50ms × 4 音:A-G-F-E,各 50ms,volume 0.2)
  - 失分方无变化(保持主调)
- **目的**:让"我失分了"成为听觉信号(不必看 HUD)

---

## 6. Mute / Volume 控件

- **MENU 屏**:右上角 🔊/🔇 按钮
- **快捷键**:`M` 切换 mute
- **存储**:`patapong.v1.settings` = `{ muted: boolean, volume: number }`
- **逻辑**:
  - `muted = true` → 所有 SFX volume × 0
  - `volume` = 0..1 → 总体音量(默认 0.5)
- **AudioContext 限制**:首次播放前需要用户交互(click / keydown),在 `Menu.tsx` 的 "PLAY" 按钮 click handler 里 `audioContext.resume()`

---

## 7. 与 juice 触发同步(Audio-Juice Sync)

> 关键规则:**音与画必须在同一帧触发**(< 16ms),否则玩家感觉"延迟"。

实现:
- `GameEngine.ts` 的事件消费循环里,`sfx` 事件和 `cameraShake` / `particleBurst` 在同一函数体内串行调用
- 音频节点用 `audioContext.currentTime` 调度(精度到 sample),不是 `setTimeout`
- 测试:DevTools Performance 录制一次 hit,确认 audio node 启动时间与 visual 触发时间差 < 16ms

---

## 8. 性能预算

| 指标 | 预算 | 硬上限 |
|---|---|---|
| Active voices | ≤ 6 | 8(抢占) |
| 节点总数 | ≤ 50 | 80 |
| 节点创建 / 帧 | ≤ 3 | 5 |
| AudioContext.currentTime 漂移 | < 50ms | 100ms |

> **节点复用**:PATA! 是高频触发,每次新建 oscillator 浪费;M2 末可优化为预创建 8 个 oscillator 池,轮转使用(若性能不达标)。

---

## 9. 测试 checklist(M2 playtest 必过)

- [ ] hit 球时 PATA! 声音清晰(不刺耳)
- [ ] 3 拍 rally 听到 PATA-PATA!
- [ ] 5 拍听到 PATA-PATA-PATA!
- [ ] 7 拍听到 PATA-PATA-PATA-PONG!(PONG 有"重击"感)
- [ ] Mute 按钮生效
- [ ] 音量滑块生效
- [ ] 失分时 A 小调琶音能听到
- [ ] 12 voices 同时不爆音
- [ ] 关闭页面后 audio context 释放(无控制台 warning)

---

## 10. 已知风险

| 风险 | 对策 |
|---|---|
| 8-bit 音色显得"廉价" | 加 100Hz 谐波 + reverb(convolver / 自实现)给厚度 |
| PATA 频率太尖锐刺耳 | 1.5kHz lowpass 必加 |
| AudioContext autoplay 限制 | 首次 PLAY 按钮 click handler 调 `resume()` |
| 6 voice 限制导致 PATA 被 milestone 抢占 | 优先级 1 不足以保护单拍;若必要,提到优先级 2(但会抢掉 PATA-PATA 累积音) |
| 失分琶音与 PATA 撞车 | 失分琶音 0.2s,后于失分 PATA,优先级低 |

---

## 附录:文档版本

| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| v0.1 | 2026-08-07 | Mavis (设计阶段) | 初稿 |

## 附录:依赖文档

- GDD:`../GDD.md` §7
- TDD:`../TDD.md` §4.4(冻结 audio 常量)
- SFX 数据:`src/core/data/sfx.ts`(M1.2 由 agent-content 填)
- Audio Manager:`src/engine/AudioManager.ts`(M2.1 由 agent-engine 填)
