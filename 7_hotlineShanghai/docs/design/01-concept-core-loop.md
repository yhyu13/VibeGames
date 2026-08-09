# 01 — Concept & Core Loop

> 设计层权威文件之一。GDD v2 §1 / §2 / §3 的细化和数值对账(v1 → v2 已同步:HM 操作对齐 / 淞沪会战背景 / 武器面具铺量)。

## 1. 一句话 + Tension 轴

- **Pitch**:迈阿密热线手感 + 1937 淞沪会战 / 孤岛抗日 + 真 2D Radiance Cascades 实时光影
- **Tension 轴**:不是"打不打得过",而是"每开一枪之后,整个世界会怎么亮起来"
- **Tone**:1937 弄堂 / 战地 + 复古电子 + 暗战紧张

## 2. 核心循环(Macro)

```
Title → Mission Select (4 任务)
  ↓
Phone Ring → Mission Brief (打字机文本)
  ↓
Room 1 (教学) → Room 2 (节奏) → Room 3 (高潮 / BOSS)
  ↓
Mission End → Score → Mask Select → Mission Select
```

- 单任务:3-5 分钟
- 单房间:60-120s
- 单击必杀
- 死了从 Room 1 重来(1.2s 重开)

## 3. 房间内循环(Meso)

```
Enter Room (1s fade-in)
  ↓
Observe (RC 灯光先开,玩家看清房间)
  ↓
Engage (枪火 / 冷兵器 / 投掷)
  ↓
Search (拾武器 / 拾面具)
  ↓
Exit (0.5s fade-out, 切下一房间)
```

## 4. 击杀瞬间循环(Micro)

```
F 切换模式(0.15s 硬直)→ 按 LMB →
  近战挥击 / 远程开火 / 空手拳头(1 击)→
  Bullet travels (1-2 frame visible) →
  Enemy hit →
  Enemy KIA + blood_splash RC light (0.5s TTL) +
  muzzle_flash RC light (0.05s TTL, on player if ranged) +
  sfx recipe play
  ↓
  ~150ms 后下一个循环
```

**输入对齐(Hotline Miami 范式)**:
- **F** 切换近战 / 远程(0.15s 收放硬直,拔刀音效)
- **LMB** 单攻击键:按当前模式攻击;空手 = 拳头
- **E** 拾取 / 开门;**长按 0.25s = 投掷当前武器**(投掷唯一入口)
- 鼠标瞄准 = HM 右摇杆

## 5. 数值对账(全部冻结,见 TDD §4.4)

| 维度 | 关键值 |
|------|--------|
| 玩家速度 | 8 u/s(加速度 60 / 减速度 80) |
| 玩家一击毙命 | 1 击 / BOSS 3 击 |
| F 切换硬直 | 0.15s(`MODE_SWITCH_DURATION`) |
| E 长按投掷阈值 | 0.25s(`THROW_HOLD_DURATION`);空手 LMB = 拳头 |
| 武器 | 8 件(2 近战 + 4 远程 + 2 投掷)→ M2 起铺 35 |
| 面具 | 6 个(全部改玩法节奏)→ M2 起铺 25 |
| 任务 | 4(含 1 隐藏:孤岛邮差,需前三任务全 S) |
| 房间 | 每任务 3-4 个 |
| 评分 | S ≥ 90 / A ≥ 75 / B ≥ 60 / C < 60 |
| RC | 3 cascades / JFA = `log2(min(W,H))`(1080p ≈ 10-11)/ 4 base rays / 0.5 base interval / propagation 0.85 / mix 0.5 |
| RC 光源 | 8 类(枪火 / 爆炸 / 油灯 / 霓虹 / 探照 / 手术 / 舞厅 / 血) |

## 6. 为什么这样设计(Why)

- **一击必杀** = Hotline Miami DNA,节奏感全靠
- **F 切换 + 单攻击键** = HM 原版节奏核心,近战/远程共用一根攻击手指,逼迫快速决策
- **任务式(电话指令)** = 30-60s 一局,适合 vibe game 体量
- **淞沪会战 + 孤岛(血战上海滩同源)** = 顶视角 + 一击必杀 + 暗处突然动手 = 暗战比正面战场更适合 8-bit 美学;隐藏任务落在四行仓库残垣做背景高潮
- **2D RC 真光影** = 弄堂的"灯下黑"质感是本项目核心辨识度,假光会毁
- **6 面具(非 25)= v1 范围控制,每个面具效果必须显著;8 武器(非 35)同理**
