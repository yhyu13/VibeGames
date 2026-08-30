# 06 · BLINDSIDE(茫室)评审 → Hotline Shanghai 可学点

> 来源:2026-08-08 本地试玩 `learning/blindside/webgl`(Unity WebGL 1.1)+
> `learning/blindside/README.md` 学习笔记 + `data.br` 资源考古(UI 键名 / 输入动作 /
> 敌人类型 / 系统字段)。本文件只记**事实 + 可迁移的设计结论**,不吹捧。

## 1. 一句话

BLINDSIDE 的核心是 **"光暗即玩法"**:敌人在光照下无法击杀,玩家必须进入阴影
才能动手;巡逻兵手持手电(FlashlightPatrol),灯光是玩家的敌人也是线索。
美术用高饱和平面色 + 光斑/暗斑切分,呼应 BOOOM 主题"视觉边界"。

## 2. 玩法事实(从构建/资源提取)

- 输入动作:Move(WASD) / Look(鼠标) / Fire / Dodge / Jump / Interact /
  Pickup / Exit / AimFocus(Shift,冻结瞄准方向,相机沿瞄准线前推)。
- 敌人:`CrawlerEnemy`、`ShadowCrawlerEnemy`、`FlashlightPatrol`、BOSS(带
  BossDialogueFlow + 胜利对话)。
- 系统字段:CheckpointSaveData(hasGun / hasSensorBomb / 进度快照)、
  SensorBomb(投掷传感器炸弹)、GunTutorial、sniper reload 的 AttackLock、
  reload / kill confirm / blood splatter / 死亡图标旋转(parentDeathIconToEnemy)、
  手柄击杀低频马达震动、aim line 投掷弧线预览(Throw Arc Polyline)、
  dialogue 系统(暂停时间缩放 + 头像)。
- 教程 UI key:`ui.tutorial.basic_movement / gun / sensor_bomb_use`,标题页
  `ui.title.start_prompt`。

## 3. 视觉事实(截图量化)

- 战斗画面:高亮区约 33% 白/淡紫(光池),暗区约 30%(浓绿/黑),中间过渡极窄 —
  **光池是"切"出来的,不是渐变糊出来的**。
- 敌人/死亡用橙红(204,84,60 / 180,84,132),与青绿色背景强互补;死亡靶环图案
  在评论区被点名表扬,辨识度极高。
- 平面色块 + 大色域,无写实贴图;光斑边缘硬。

## 4. 对 Hotline Shanghai 的迁移结论

### 已落地(本轮 B24-B28)

| 可学点 | 落地 |
|--------|------|
| 光暗必须有明确视觉边界,不能全屏过曝 | 删假光晕;光半径收紧;ambient 0.12 + lightScale 1.35;void≈#0c0c0c |
| 角色/敌人在暗处必须可辨识 | overlay 像素取整;玩家暖色蒙面 + 冷青描边;敌人暖色 + 头顶标记 |
| 动作可感知 | walk 4 帧 + attack 突刺 + death 帧;实测 walk 帧间 diff 3.1k px |
| 高对比光池(暖/冷) | oil_lamp 暖橙、neon 冷青,中心 200+ 边缘 60 |

### 提案(B29,2026-08-09 v3.1 **ADOPTED** — 7 条全部入档;权威落地规范 = [`09-blindside-integration.md`](./09-blindside-integration.md))

| # | 提案 | 落地状态 | 何时 |
|---|------|----------|------|
| 1 | **灯下无敌 / 暗处可杀**(核心) | **ADOPTED**(B34)— `SHADOW_SHOT_MISS=true` + `LIGHT_SHIELD_THRESHOLD=0.30` + `LIGHT_EXPOSED_THRESHOLD=0.10` + INVULNERABLE 强制检查 | **M1.0 spike** |
| 2 | **FlashlightPatrol 敌人原型** | **ADOPTED**(B36)— 新 archetype `flashlight_patrol`(`FLASHLIGHT_CONE_ARC_DEG=50` + `FLASHLIGHT_SWEEP_HZ=0.6`),灯被拆退回 8u 60° 几何锥 | **M1.0 spike** |
| 3 | **投掷弧线预览** | **ADOPTED**(B29 #3)— ThrowArc 抛物线预览(走现有 `throwHold` 状态机),详见 09-§8 | M2 |
| 4 | **Checkpoint + 死亡图标旋转** | **部分采用**(死亡清空 B14 + 死亡图标旋转落地)— 详见 09-§8 | M2-M3 |
| 5 | **击杀确认** | **ADOPTED**(B29 #5)— 白闪 + 音效 + 屏幕震动,详见 09-§11 | **M1.0 spike** |
| 6 | **AimFocus(Shift 冻结瞄准)** | **ADOPTED**(B37)— `AIMFOCUS_PUSH_DIST=0.4u` Shift 长按 | **M1.6 提前 ship** |
| 7 | **ReloadIndicator** | **ADOPTED**(B37)— 换弹进度条/转圈 | **M1.6 提前 ship** |

> 提案 #1 / #5 / #6 / #7 + 面具 6→9(`lampmaker` M1.6 提前 ship)= v3.1 的 M1 主交付;
> 完整机制签名 / 决策点 D1-D8 / 风险 R-V3-1..7 见 [`09-blindside-integration.md`](./09-blindside-integration.md)。
> 提案 #3 / #4 走 M2-M3(throw 链路已 v2 留 throwHold 状态机,接入成本低)。

> 敏感性提醒:BLINDSIDE 无叙事负担;我们的 1937 主题把"光暗"做成机制时,
> 必须与"面具即第二张脸"的叙事框架对齐(灯下暴露 = 身份暴露),不要为了机制
> 硬塞"影子杀人"的奇幻设定。

## 5. 反面对照(哪些不该抄)

- 输入卡死/失焦暂停问题(Unity WebGL 对焦点切换的体验差)——我们已用
  Playwright headed 冒烟 + 手动输入覆盖,保持键盘焦点健壮。
- "机制全做完了但 dynamics 没收敛"的 jam 陷阱(README §5.1):我们的对策是
  M2 只做 1 任务 × 3 房 × 3 武 × 3 面具,先把一关的手感/视觉闭环。
