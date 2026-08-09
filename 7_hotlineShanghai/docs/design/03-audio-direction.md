# 03 — Audio Direction

> 设计层权威文件之一。GDD v2 §8 的细化和数值对账。

## 1. 音色

- **"老上海电子 + 弄堂市井"** 混合
- 主体:`square wave + sawtooth + noise`(80s synth)
- 主调:C 大调(亮)/ A 小调(暗)
- 1937 复古电台频率感 = 低频持续 pad

## 2. 配方数据(在 `core/data/sfx.ts`,零平台依赖纯数据)

```ts
export interface SfxRecipe {
  id: SfxRecipeId;
  duration: number;         // 单次总时长(秒)
  attack: number;           // 起音(秒)
  decay: number;            // 衰减到 sustain 电平(秒)
  sustain: number;          // 保持电平 0..1
  release: number;          // 释音(秒)
  volume: number;           // 配方基准音量 0..1(实际音量 = settings.volume × 配方 volume × play(volume))
  priority: number;         // 抢占优先级(voice 上限 6,数值大优先保留)
  oscillators: { type: SfxWaveform; freq: number; freqEnd?: number; gain: number; delay?: number }[];
  noise?: { duration: number; gain: number; filterType?: SfxFilterType; filterFreq?: number };
  repeat?: number;          // 循环次数(节拍器 / 电话铃),缺省 1
  repeatInterval?: number;  // 循环间隔(秒)
}
```

- `SfxWaveform = 'sine' | 'square' | 'sawtooth' | 'triangle'`(自有联合,引擎层映射 `OscillatorType`;core/ 不碰 DOM 类型)
- `SfxFilterType = 'lowpass' | 'highpass' | 'bandpass'`(引擎层映射 `BiquadFilterType`)
- 导出:`SFX_RECIPES`(id 列表,`as const`)+ `SfxRecipeId`(由其派生)+ `SFX_RECIPE_TABLE`(id → 配方)

## 3. 配方清单(18 个,v1 锁)

| ID | 时长 | 用途 |
|----|------|------|
| `fire_pistol` | 0.05s | 毛瑟 / 盒子炮 |
| `fire_rifle` | 0.08s | 莫辛纳甘 |
| `fire_smg` | 0.06s | 汤普森 |
| `melee_swing` | 0.15s | 挥刀 / 挥棒 |
| `throw_weapon` | 0.12s | E 长按投掷(破空呼啸) |
| `explosion` | 0.5s | 手雷爆炸 |
| `thud_hit` | 0.10s | 击杀(低频 thud + 短促小锣) |
| `splash_blood` | 0.30s | 血溅 |
| `player_killed` | 0.7s | 玩家死亡 |
| `pickup_weapon` | 0.20s | 拾武器 |
| `pickup_mask` | 0.25s | 拾面具 |
| `mode_switch` | 0.07s × 3 | F 拔刀 / 收刀金属滑动音(节拍器节奏) |
| `phone_ring` | 0.2s × 3 | 电话铃(旋转拨号双音 440+660) |
| `mission_brief_typewriter` | 0.04s/字 | 打字机 |
| `door_open` | 0.50s | 开门 |
| `room_clear` | 0.80s | 房间清除(C 大调琶音,亮) |
| `mission_end_success` | 1.0s | 任务完成(A 小调琶音,小三和弦) |
| `mission_end_fail` | 0.8s | 任务失败(下行小调) |

> 事件 → 配方映射约定:SimEvent `fire` → 按武器 `fire_pistol / fire_rifle / fire_smg`;`enemyKilled` → `thud_hit` + `splash_blood`;`modeSwitch` → `mode_switch`;`missionEnd` → success / fail。映射逻辑在 GameEngine(agent-engine 会话负责),AudioManager 只吃 recipeId。

## 4. 实现位置

- `core/data/sfx.ts` = 配方数据(纯数据,零平台依赖)
- `engine/AudioManager.ts` = 实时合成(`AudioContext.createOscillator` + `createBufferSource` for noise)

## 5. 性能约束

- 同时 ≤ 6 voices(预算,`AudioManager.MAX_VOICES = 6`)/ 8 voices(硬上限)
- 优先级抢占:数值越大越优先保留(`player_killed 100 > explosion 95 > thud_hit 90 > splash_blood 85 > fire* 70 > melee/throw 65 > mode_switch 60 > pickup* 50 > door_open 45 > phone_ring 40 > room_clear 35 > missionEnd* 30 > typewriter 25`)
- voice 超限时旧 voice 立即 `stop()` 释放;**同优先级丢最老**(最接近播完,损失最小,保证快速射击只留最新几发)
- 新音优先级低于当前最弱 voice 时直接不播(不抢占)

## 6. 调音原则

- 所有 noise 必须过滤波器(`lowpass` 800-2000Hz 或 `bandpass`,避免刺耳)
- 短音(80ms 以下)用 5ms attack + 30ms decay
- 长音(0.5s+) 用 10ms attack + 100ms decay + 200ms release
- 音量默认 0.5,可在 settings 调 0-1(键名 `hotline-shanghai.v1.settings`,TDD §3.3;读取失败 / 形状不符 → 静默回退默认值)
- 关闭 = `muted: true`,play 直接不调度(不占 voice slot)
- 实际音量 = `settings.volume × 配方 volume × play(volume)`,全部 clamp 0..1
- 单声道合成(节省 voice 资源),禁止立体声 / 禁止 reverb

## 7. 禁止

- ❌ 音频文件(零资产纪律)
- ❌ reverb 节点(性能负担)
- ❌ 立体声(节省 voice 资源)
- ❌ 持续低频以外的 pad(只保留 1937 电台感)

## 8. v3 1937 声景(2026-08-09 评审入档)

- **判定**:v2 音频方向是 HM 的,不是 1937 的("rotary dial + typewriter + short synth" = HM 音频调色板);1937 声景是比 RC 更便宜的差异化,优先补。
- **M1.5 / M2 交付(全部 Web Audio 程序化,零资产)**:
  - **黄浦江汽笛**:低频 sine sweep(60→90Hz,2-3s),随机间隔
  - **弄堂叫卖**:短 noise 音形 + 无实词语音感(带通滤波),随机方位感
  - **评弹三弦**:拨弦 synth(短三角波 + 快速衰减,主调音阶),任务开始 / 完成时替代或叠加琶音
  - **老电台干扰**:持续低频 pad + 周期性 burst noise(1937 电台频率感)
- **HM synth 去留**:只保留节奏反馈(拔刀 / 收刀、开枪、击杀),环境层全部换 1937 声景。
- **配方扩展**:新增 4 个 SfxRecipe 占位 —— `harbor_whistle` / `street_cry` / `pipa_pluck` / `radio_static`,数值随实现定(零平台依赖,进 `core/data/sfx.ts`)。
