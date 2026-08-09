# 05 路 开场场景规划 (Intro Scene Plan) v1.0

> 单一事实源:整个 6_patapong3D 现在只 ship **1 个开场场景**——觉醒仪式。
> 本文档是唯一计划文档(12 节);设计权威 GDD.md,数值权威 TDD.md,
> 美术 PATAPONG-ART-REFERENCE.md / 02-art-direction.md。

## 1. 一句话 + Why

> **黑暗里敲 4 下鼓,军队睁眼,Moloch 咆哮——你学会"节奏即命令"的瞬间,
> 就是游戏开始。**

Patapong 的核心命题是"节奏驱动一切"。开场不教文字,教体验:玩家在 60BPM
的鼓点里敲 4 下(任何鼓都算,纯时机判定),每一次敲击点亮一只 Patapon 的
眼睛;第 4 下所有眼睛点亮,军队觉醒,boss 咆哮,标题砸入,PLAY 出现。
30 秒内玩家已经理解:时机 > 键位,节奏 = 命令。

## 2. 范围(冻结)

| 类别 | 内容 | 说明 |
|---|---|---|
| **ship 范围** | 1 个开场场景(觉醒仪式) | 只做这一个场景,做到"完美" |
| **数据冻结** | 4 鼓 W/A/S/D、±200ms 窗口、10 命令、3 军队、Moloch | 全部沿用 TDD 搂4,不加不减 |
| **M2+ 路线(暂缓但保留)** | READY 3-2-1 倒计时阶段、开场 bgPad 循环、开场可跳过快捷键、多语言字幕 | 不在本次 ship;README 明确"暂缓" |

**关键决策 D1**:开场跑在现有 `MENU` phase 内部(不新增 GamePhase,不动
冻结的 FSM 契约);`READY` 保持"declared but unused"。

## 3. Scene 规格(Blueprint)

### 3.1 舞台(复用现有 3D 战场)

相机 (0, 2, 18) 朝 (0,0,0);开场阶段从 z=18 缓推到 z=15。黑场中:

- 4 面鼓垫(y=-6.5, z=3, x=-3/-1/1/3)是唯一亮色(青/金/蓝/粉)
- 军队 3 人(x=-4, z=-0.8/0/+0.8)只留 Rim 轮廓,眼睛闭合(眼 instance 隐藏)
- Moloch(x=6)只留红色剪影 + 淡金双眼(开场隐藏,咆哮时爆亮)
- 观众、节奏条、音符:开场不显示

### 3.2 时间线(Stage Timeline)

| Stage | 时长 | 内容 | 音频 |
|---|---|---|---|
| boot | 停留至首次点击 | 全黑 + "CLICK TO START" + 金色圆环脉冲;点击后一声闷鼓 | `pata`(低频,autoplay 安全) |
| title | 1.2-4.0s | "PATAPONG 3D"逐字渐显 + "DIVINE DRUMS" | 无 |
| reveal | 4.0-6.5s | 相机缓推;鼓垫渐亮;提示"YOU ARE THE DRUMMER" + 4 键卡片 | 无 |
| awaken | 6.5s 起 | 60BPM 节拍器;任意鼓 ±200ms 命中 = 点亮一只眼 + 填满 1/4 | 对应鼓 SFX |
| ready | 4 次命中后 | 觉醒高潮(眼睛全亮 + chord + 观众欢呼 + boss 咆哮红光震屏)→ PLAY + 命令表 + 战绩 | `commandResolve` / `audienceCheer` / `bossRoar` |

### 3.3 交互

- W/A/S/D 任意键,命中窗口 ±200ms(60BPM,每拍 1s,宽容)
- 拍外敲击:不惩罚,只显示微弱"off beat"反馈;计时继续
- 点击屏幕:boot = 开始(解锁音频 + 闷鼓);title/reveal = 直接跳到 awaken
- 按任意鼓键:title/reveal 直接跳到 awaken(跳过字幕)
- 右上角 `SKIP >>`:跳过整个开场直接到 ready(Menu)
- 开场失败状态:无(教学不允许惩罚)

### 3.4 颜色约束

- 开场 90%+ 像素为黑(#000 ~ #0a0a2a)
- 光只来自:鼓 4 色、觉醒眼白、Moloch 红金、标题渐变
- 觉醒时全场亮度线性回到战斗光照(约 1.5s)

## 4. 美术资源清单(Asset Tier)

全部程序化,零文件。

| Tier | 项 | 规格 |
|---|---|---|
| 1 MUST | 4 面鼓垫 | 0.8 x 0.2 x 0.8 voxel,4 色,敲击 emissive 1.0 |
| 1 MUST | 军队身体/眼/羽毛/手脚 | 现成 `buildCharacterMeshes`,眼加"关闭/睁开"两态 |
| 1 MUST | Moloch 轮廓/眼/角 | 现成模板,剪影 + 咆哮爆眼 |
| 1 MUST | 地板/边缘/后墙 | 现成 court.ts,暗场压暗 |
| 2 juice | 鼓击脉冲 + 粒子 | 鼓面变亮 200ms + 粒子 4-16 颗 |
| 2 juice | 眼睛觉醒 | 眼 instance 0 鈫?1 squash 弹开,0.3s |
| 2 juice | 觉醒高潮 | 白闪 300ms + 红光 + CameraShake + chord |
| 3 装饰 | 观众渐入 + 欢呼 | 觉醒后 12 观众入场 bounce |
| 3 装饰 | 标题逐字 / 提示呼吸 | CSS 动画 |
| 4 可迟 | bgPad 循环 / 涟漪 ring / 跳过快捷键 | 无限 polish 池 |

## 5. 程序实现 (P0-P7)

| 阶段 | 目标 | 子任务 | 验收 |
|---|---|---|---|
| P0 | 鼓垫 + 暗场 | court.ts 加 4 鼓;SceneManager.setDarkness / camera push;VoxelRenderer.pulseDrum | 黑场 4 鼓可见,可点亮点 |
| P1 | 开场轮廓 | VoxelRenderer 眼关闭(scale 0)+ boss 剪影(emissive 0.05) | 觉醒前无光眼 |
| P2 | 交互节拍器 | IntroDirector 状态机 + 60BPM + ±200ms 判定 + store.intro 镜像 | 敲 4 次全部觉醒 |
| P3 | 觉醒高潮 | chord + 观众 cheer + bossRoar + 红光 + shake + 白闪 | ready 帧可达 |
| P4 | UI 字幕/提示/跳过 | IntroScene.tsx 渲染 5 个 stage;Menu 门控 intro.complete | 全程无 console error |
| P5 | 相机缓推 + 收尾 | title 逐字 / reveal 提示 / SKIP 按钮 | 手动播放 3 遍无 bug |
| P6 | 性能 + 稳定 | draw calls <= 11(硬 15);无泄漏 | 60 FPS 观察 |
| P7 | 端到端 playtest | 开机 鈫?敲鼓 鈫?觉醒 鈫?PLAY 鈫?战斗 鈫?回菜单重放 | 10 遍循环 |

MGP = P0-P7。SHIP-READY = MGP + 搂7 完美定义全勾。

## 6. 验证门(每个 P 收尾)

```bash
npx tsc -b --noEmit        # 0 error
npm run build              # production build green
rg "paddle|ball|ai-pata" src docs  # 0 stale (除注释/合法字符串)
```

浏览器手动(dev server 5183):开场黑场 鈫?敲 4 次觉醒 鈫?PLAY 进战斗 鈫?
战斗后回菜单重放开场;全程 console 0 error。

## 7. "完美"定义(4 组 checklist)

- **视觉**:30 秒内有"哇"瞬间(觉醒高潮帧);风格颗粒感保留(体素 + PBR);
  开场 90% 黑 + 光只来自鼓/眼;动作真实(眼睛弹开、boss 咆哮震)。
- **手感**:敲鼓永远有反馈(亮 + 粒子 + SFX);拍外不惩罚;4 次命中平衡点
  恰好=觉醒;觉醒 = 预期(玩家喊"再来一次")。
- **性能**:60 FPS @ 1080p;开场阶段 lastFrameTime < 16ms;启动 鈮?1s;
  draw calls 鈮?11 / 硬 15;粒子 鈮?200。
- **可重现**:种子无关;跳过/重放稳定;无 bug 残留;回菜单必重放开场。

## 8. 已知冲突 + 决策点

| # | 决策 | 状态 | 决定者 |
|---|---|---|---|
| D1 | 开场跑在 MENU phase 内,不动冻结 FSM | 已解决 | 用户"先删旧的开场/文档"+ 冻结纪律 |
| D2 | 4 次命中觉醒,不惩罚拍外 | 已解决 | 教学友好 |
| D3 | 点击/鼓键跳 awaken,SKIP 跳 ready | 已解决 | 防重复观看疲劳 |
| D4 | 开场复用现有 SFX 配方,不新增 SfxId | 已解决 | 避免 TDD 契约变更 |
| D5 | READY 3-2-1 保持未用,列入 M2+ | 待验证 | 用户 playtest 后裁决 |

## 9. 顺序与节奏

开场总长 ~12-20s(可跳过):

```
0s 黑场 ─ 1.2s 标题 ─ 4s 提示 ─ 6.5s 节拍 ─ ~10s 觉醒高潮 ─ ~11s PLAY
                                   (敲得快 = 更早觉醒)
```

ship-ready 估算:本次 session 内 P0-P5;P6-P7 由用户 playtest 驱动。

## 10. Polish Loop

循环:观察 鈫?找问题 鈫?改 鈫?验证 鈫?再观察。

每次循环:
1. 手动播放 N 次,记录感受
2. 问题分 3 类:视觉 / 手感 / 性能,登记到本 commit 或 BUGS
3. 按问题清单修(先必跑项,再必同步文档)
4. 验证:tsc + build + 手动 N 次复测
5. 直到 N 次全部 鈮?短时间内有"哇"瞬间 + 玩家屏息 鈮?1 次

**停止条件:用户说停**(无内置自动停止)。

## 11. 文件产出

| 类别 | 文件 |
|---|---|
| 新建 | `docs/design/05-intro-scene-plan.md`、`src/engine/IntroDirector.ts`、`src/components/IntroScene.tsx` |
| 修改 | `src/core/data/court.ts`(4 鼓)、`src/engine/VoxelRenderer.ts`(鼓/眼/剪影)、`src/engine/SceneManager.ts`(暗场/推进)、`src/engine/GameEngine.ts`(导演接线)、`src/engine/InputManager.ts` + `src/store.ts`(skipIntro)、`src/components/Menu.tsx`(intro.complete 门控)、`src/App.tsx`、`src/styles.css` |
| 文档同步 | `GDD.md` 搂6 开场、`TDD.md` 搂2 架构树、`README.md`、`CLAUDE.md` FSM 注记、`verification-report.md` |
| 归档 | 无(旧文档已在 Part 1 删除) |

## 12. 状态

- P0 鼓垫 + 暗场:◻
- P1 开场轮廓:◻
- P2 交互节拍器:◻
- P3 觉醒高潮:◻
- P4 UI 字幕/提示/跳过:◻
- P5 相机缓推 + 收尾:◻
- P6 性能 + 稳定:◻
- P7 端到端 playtest:◻

---

*文档版本 v1.0 路 2026-08-09 路 Q1=A(删旧+重写)/ Q2=A(12 节)/ Q3=A(无限 polish,用户说停)*
