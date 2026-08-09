# m1_intro_scene — THE game 蓝图 / 打磨计划

> **本文件是 THE game 的唯一权威蓝图 + 打磨计划**(替代原 `m1_workshop_room1.md`,2026-08-09 重写)。
> 全游戏只 ship 1 个 intro scene(用户指令 2026-08-09)。本文件包含:
> 1) 蓝图(房间 / 实体 / 调色 / 美术资产) 2) 程序实现 4 阶段(P4-P7)
> 3) 验证门 4) "完美"定义 5) 已知冲突 + 决策点 6) Polish loop。
>
> 引用:`[`GDD.md`](../GDD.md)`(机制层)`、`[`TDD.md`](../TDD.md)`(契约层)`、`[`docs/design/09-blindside-integration.md`](../design/09-blindside-integration.md)`(v3.1 BLINDSIDE 整合层)`、`[`BUGS.md`](../../BUGS.md)`(已知 bug 与决策历史)`、`[`src/core/data/missions.ts`](../../src/core/data/missions.ts)`(运行时事实源)`。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`(Mavis 签核)。

---

## 1. 一句话 + Why

**一句话**:**"只此一间:拆掉那盏油灯,在暗处了结巡逻兵。"** — 1937 上海弄堂里的 10×9 单房俯视角像素,1 玩家 + 1 油灯 + 1 手电巡逻兵 + knife,演示 Hotline Miami 一击必杀手感 × BLINDSIDE 光暗反制(光下无敌 / 暗处可杀)。

**Why**(为什么是这一间、为什么现在打磨):
- **机制命题证明**:intro scene 是 v3.1 唯一 ship 关卡;它必须能在 30 秒内把"光暗反制 + 一击必杀 + 步幅节奏"3 个核心机制同时演给玩家看。
- **B33 重置的验收**:B33(2026-08-09)把整个游戏关卡 / 场景 / 移动实现归档,要求"重建最小垂直切片 → 标题壳 → 1 房 → knife → 1 敌"。P0-P3 已完成,剩余 P4-P7 是闭环最后 4 步。
- **无限 Polish 优先级**:用户指令(2026-08-09)"我们需要最好的东西到 intro scene 全力打磨直到完美,然后再做其他的"。任何其他 level / 多 zone / 多面具铺量都已冻结到 M2+ 路线。
- **可重玩性 = 0.5**:1 房 1 敌,本身不带 replay depth;完美 = 每一次玩都能在 30 秒内体验到"光暗反制 + 击杀"那一刻的 juice,而不是单调。

---

## 2. 范围(冻结,2026-08-09 二次重冻结)

| 维度 | intro scene ship 范围 | 数据冻结(不 ship 但类型存在) |
|------|----------------------|---------------------------|
| 任务 | 1(`m1_workshop`) | — |
| 房间 | 1(`m1_intro_scene`) | — |
| 武器 | **ship:knife**(1 件) | 8 件数据冻结:mauser_c96 / mosin / thompson / mauser / boxer / grenade / bat |
| 面具 | **暂不 ship `MaskSelect`** | 9 个数据冻结:6 v1 + `lampmaker` / `darkwatch` / `fortuneteller` |
| 敌人 archetype | **ship:flashlight_patrol**(1 个) | 5 个数据冻结:soldier / policeman / spy / boss / `flashlight_patrol` |
| 区域 | **1 zone:lilong**(D5 canonical,07-lilong-lantern-player.png) | 4 zone 设计(02 §10.5):bund / concession / lilong / creek,Z1/Z2/Z4 冻结到 M2+ |
| 物理光 | **几何光场(GeometricLightField)CPU gameplay authority** | 视觉已接真实 WebGL2 RC:1 cascade/twoLoop/dither；RC 不替代机制查询 |

> **任何铺量必须先解冻本节 + 用户明示**。当前 = 1 房 1 灯 1 敌 1 刀,无歧义。

---

## 3. Scene 规格(运行时事实源 = `src/core/data/missions.ts`)

### 3.1 房间元数据

| 字段 | 值 |
|------|-----|
| `id` | `m1_intro_scene`(原 `m1_workshop_room1`,2026-08-09 rename) |
| `width` × `height` | 10 × 9(tileSize = 1) |
| `zone` | `lilong`(1 cascade / decayMul 0.6 / ambient `#050408` 接近纯黑) |
| `floorPalette` | `['#3a1410', '#050408']`(02 §3.1 lilong secondary / ambient) |
| `wallPattern` | `red_brick` |
| `brief` | `只此一间:拆掉那盏油灯,在暗处了结巡逻兵。` |

### 3.2 ASCII 蓝图(与 `missions.ts` 逐字符一致)

```
##########
#....L...#
#.X....X.#
#........#
#...1....#
#........#
#.P......#
#......D.#
##########
```

| Tile 字符 | 含义 | 坐标 |
|---------|------|------|
| `#` | wall(红砖墙 red_brick) | 边框 |
| `.` | floor(lilong 条带地板) | 内部 |
| `P` | playerSpawn | (2, 6) |
| `1` | enemySpawn(archetype = `flashlight_patrol`,P3 已生成) | (4, 4) |
| `L` | decorativeLight(`oil_lamp`,breakable HP=2) | (5, 1) |
| `X` | 家具/装饰桩(石库门柱 / 晾衣杆,collidable) | (2, 2) + (7, 2) |
| `D` | exitTile(通关 tile,到达 + 全拆灯 = win) | (7, 7) |

### 3.3 实体清单(spawn 顺序 = 距离玩家从近到远)

| 实体 | 坐标 | 拾取/触发 | 备注 |
|------|------|----------|------|
| player | (2, 6) | — | 出生点;半径 0.5 与四面墙至少隔 1 tile(避免 B33 贴墙复现) |
| knife | (6, 5) | 走过 tile 即拾取 → equip | weaponId=`knife`,damage=1,range=1.4u,ammo=Infinity |
| flashlight_patrol | (4, 4) | AI 自动巡逻(speedPatrol=2.5) | 紧贴油灯;灯锥 50° 0.6Hz sweep;受光护甲 |
| oil_lamp | (5, 1) | 玩家 LMB + aim ≤ 2.0u → lightSmash HP-1 | breakable HP=2;碎 → invalidateLight + 灯池收缩 |

### 3.4 调色约束

| 用途 | hex | 来源 |
|------|-----|------|
| 玩家冷青描边 | `#8ab4ff` | 05 §3.1 玩家配色 |
| 敌人暖橙描边 | `#ffb066` | 05 §3.2 flashlight_patrol 配色 |
| 油灯光 | `#ffc966` | 08 §lights.ts `oil_lamp` |
| 地板主色 | `#3a1410` | 02 §3.1 ZONE_LILONG.SECONDARY |
| 地板阴影 | `#050408` | 02 §3.1 ZONE_LILONG.AMBIENT(接近纯黑) |
| 红砖墙 | PAL_BRICK(`#7a3a28`) | palette.ts |
| 玩家皮肤 | `#f5e6b8`(IVORY) | palette.ts PLAYER_PALETTE.w |
| 玩家钢/衣 | `#4a4a52`(STEEL) | palette.ts PLAYER_PALETTE.c |
| 玩家鞋/发 | `#0a0910`(INK) | palette.ts PLAYER_PALETTE.k |

> 任何 hex 必须能在 `palette.ts` 或 `lights.ts` 找到出处,不允许 inline 写值。

---

## 4. 美术资产清单(18 项,4 个 tier)

> **用户批准的唯一资产例外**:intro curated PNG set。批准源与哈希=`references/sprite-samples/approved-intro-assets.json`；处理器=`scripts/process-intro-sprites.mjs`；运行时输出只在 `public/sprites/intro/`。actor/effect cells=64×64、actor pivot=`[32,54]`，ground/brick cells=48×48，nearest-neighbor。音频/地图仍程序化，且禁止借此扩展后续关卡资产。

### Tier 1 — MUST(没这些不能 ship)

| # | 资产 | 尺寸 | 帧 | 调色 | 来源 |
|---|------|------|----|------|------|
| A01 | `player_idle` | 16×16 | 1 | k/c/w/r/d(PLAYER_PALETTE) | sprites.ts `player.idle` |
| A02 | `player_walk` | 16×16 | 4(6fps,B26) | 同上 | sprites.ts `player.walk` |
| A03 | `player_attack`(lunge) | 16×16 | 2(idle → lunge) | 同上 | sprites.ts `player.attack` |
| A04 | `player_death` | 16×16 | 1 | 同上,黑雾遮罩 | sprites.ts `player.death` |
| A05 | `flashlight_patrol_idle` | 16×16 | 1 | 警蓝 `#2a2f3a` + 描边 `#ffb066` | sprites.ts `policeman` 临时占位,P3 已挂 |
| A06 | `flashlight_patrol_walk` | 16×16 | 4(6fps) | 同上 | sprites.ts `policeman.walk` |
| A07 | `flashlight_patrol_attack` | 16×16 | 2 | 同上 + 灯锥发射帧 | sprites.ts `policeman.attack` |
| A08 | `flashlight_patrol_death` | 16×16 | 1 | 同上,黑雾遮罩 | sprites.ts `policeman.death` |
| A09 | `oil_lamp_idle` | 16×16 | 1 | 灯丝 `#ffc966` + 灯罩 `#7a5a3a` | sprites.ts 待加(P4 新增) |
| A10 | `oil_lamp_half_broken` | 16×16 | 1 | HP=1,玻璃裂痕 | sprites.ts 待加(P4) |
| A11 | `oil_lamp_broken` | 16×16 | 1 | 灯丝黑 + 玻璃碎散落 | sprites.ts 待加(P4) |
| A12 | `knife` | 8×8(装备时) | 1 | 钢 `#4a4a52` + 柄木 `#c8b898` | sprites.ts `knife` |
| A13 | `floor_lilong`(tile 纹理) | 16×16 | 1 | `#3a1410` + `#050408` 条带 | 程序化 Canvas2D |
| A14 | `wall_red_brick`(tile 纹理) | 16×16 | 1 | PAL_BRICK `#7a3a28` + 缝 `#050408` | 程序化 Canvas2D |

### Tier 2 — juice 必备(P4-P5 实现)

| # | 资产 | 类型 | 触发 | 备注 |
|---|------|------|------|------|
| B01 | `spark_particle` | 粒子(8 粒) | 拆灯 HP 归零 | 黄色火花 + 短拖尾(0.2s) |
| B02 | `glass_shard_particle` | 粒子(6 粒) | 拆灯 HP 归零 | 玻璃碎屑 + 飞溅 |
| B03 | `shield_block_flash` | 全屏闪白 0.1s | 命中光下敌人 | 表示"光下无敌"反馈 |
| B04 | `red_exposed_warning` | HUD 红框 0.2s | 玩家进入光下 | 0.8s 节流 |
| B05 | `kill_confirm_gong` | audio | 击杀命中 | 小锣 0.15s(sfx 表) |
| B06 | `death_vignette_red` | 全屏红 vignette 0.5s | 玩家死亡 | 慢动作 0.5x |
| B07 | `screen_shake` | camera shake 0.05s | 拆灯 / 击杀 | 4px 振幅,衰减 |

### Tier 3 — 装饰(Polish loop 加分)

| # | 资产 | 用途 |
|---|------|------|
| C01 | `bgm_pad_lonely` | 1937 弄堂 3-track loop(汽笛 + 评弹 + synth pad) |
| C02 | `ambient_lilong` | 蟋蟀 + 远处叫卖 + 木质吱呀 + 单音钵 |
| C03 | `lamp_flicker` | 油灯 12Hz 抖动(0.4-0.6 幅) |
| C04 | `flicker_particle` | 灯抖动时的火星粒子 |

### Tier 4 — 可选(Polish loop 无限)

| # | 资产 | 用途 |
|---|------|------|
| D01 | `aim_focus_cone` | 玩家瞄准时的扇形高亮(B05 AimFocus 教学) |
| D02 | `reload_indicator` | 远程武器弹药 HUD(M1 不显示,数据冻结) |
| D03 | `hud_frame` | HUD 边框 + mission brief 框 |

> **冲突标记**:Tier 2 的 B01-B04 粒子与 02 §9 forbidden list 中"❌ 粒子叠加(无伤血粒子等)"冲突。
> **决策**:2026-08-09 用户明确"可以粒子",本冲突已解除(02 §9 该条目应同步标注"intro scene 例外"——本计划 polish loop 阶段处理)。

---

## 5. 程序实现 — P4 / P5 / P6 / P7

> 最终状态:P0-P7 ✅。用户 2026-08-09 以“self play review until polished work until done”明确扩展 scope；旧 P5 pending/out-of-scope 说明作废。本轮 polish loop 已完成，剩余仅为非阻塞视觉上限。

### 5.1 P4 — 拆灯(预计 1-1.5 天)

**目标**:玩家 LMB 命中油灯 → HP-1 → 半碎 / 全碎 → invalidateLight → 灯池收缩 → 敌人光下护甲失效。

**子任务**:
1. `core/simulation/damage.ts` 新建:`lightSmash(weapon, target, aimDist)` 函数,aim ≤ 2.0u(LMB_LIGHT_PRIORITY_RANGE)→ 灯优先于敌。
2. `core/data/sprites.ts` 加 `oil_lamp` archetype(idle / half_broken / broken 3 帧)。
3. `core/data/lights.ts` 给 `oil_lamp` 加 `breakable=true` + `hp=2`(已部分冻结,确认)。
4. `engine/SceneManager.ts` 加灯状态机:hp=2(idle)/ hp=1(half_broken)/ hp=0(broken + 灯池收缩动画 0.3s + invalidateLight)。
5. Tier 2 资产实现:spark_particle + glass_shard_particle + screen_shake + sfx `lamp_break`。

**验收**:
- tsc 0 error
- 玩家站在油灯旁 LMB → 灯变 half_broken(HP=1)
- 再 LMB → 灯变 broken + 灯池收缩 + 0.3s 后 room 平均光强度 -60%
- `__simEvents()` 输出 `lightSmash` × 2 + `invalidateLight` × 1

### 5.2 P5 — 击杀 + 死亡(✅ 已验证)

**目标**:玩家在暗处对巡逻兵挥 knife → 1 击必杀 + 血溅 + 屏幕震动 + 小锣;玩家在灯锥下 → 命中但 `shield_block_flash` + 敌人不退;玩家被巡逻兵发现 → 死亡 + 红 vignette + 重试。

**子任务**:
1. `core/simulation/damage.ts` 加 `enemyHitCheck(playerPos, enemyPos, weapon, lightField)`:若 `enemy.isShielded` → block + flash + sfx,否则 → kill。
2. `core/data/enemies.ts` 确认 `flashlight_patrol.invulnWhileLit = ENEMY_INVULN_WHILE_LIT` 已挂(P3 已部分)。
3. `core/simulation/playerDeath.ts` 新建:巡逻兵视野检测 → 0.4s 提示后玩家死亡 → death_vignette + death_sfx → reset to spawn(P3 已生成 0.4s 提示)。
4. Tier 2 资产实现:kill_confirm_gong + blood_splash + death_vignette_red + shield_block_flash。

**验收**:
- tsc 0 error
- 玩家先拆灯 → 走到敌人旁 LMB → 1 击击杀 + 0.1s 红屏 + 小锣
- 玩家不拆灯直接走到敌人旁 LMB → 命中但敌人不动 + 白闪 + 金属音
- 玩家进入灯锥 → 0.4s 后死亡 + 红 vignette + reset
- `__simEvents()` 输出 `enemyKilled` 或 `attackBlocked` 或 `playerKilled`

### 5.3 P6 — 渲染 + 输入接线(✅ 已验证)

**目标**:把 SceneManager / InputManager / RC pipeline(几何光场版)从 `_archive-2026-08-09/` 恢复并接通,实现玩家可在浏览器实际玩 intro scene。

**子任务**:
1. `engine/SceneManager.ts` 从归档恢复 + 接通 player / enemy / light / camera / sprite 渲染管线。
2. `engine/InputManager.ts` 从归档恢复 + 接通 WASD(玩家移动)+ 鼠标移动(瞄准)+ LMB(挥刀 / 拆灯)+ Shift AimFocus。
3. `engine/SceneManager.ts` = Canvas2D source；`engine/RcPresenter.ts` = planes/presentation adapter；`engine/RcPipeline.ts` = 独立真实 WebGL2 pipeline，intro 固定 1 cascade / twoLoop / dither。几何光场继续负责玩法。
4. `engine/postfx/` 从归档恢复 + 接通 dither 4×4 Bayer。
5. `engine/sprites/` 程序化 Canvas2D 渲染器从归档恢复。
6. 主循环 + 时间步 60 FPS 锁定 + 性能 watchdog 接通(`__rcPipeline.state().lastFrameTime < 16ms`)。

**验收**:
- `npm run dev` → http://localhost:5184 打开浏览器可见 intro scene
- 玩家 WASD 移动 + 鼠标瞄准 + LMB 攻击 / 拆灯,实时响应
- 浏览器 console 0 error
- `__gameManifest()` 返回合法 JSON
- 60 FPS @ 1080p 稳定 5 分钟

### 5.4 P7 — HUD + playtest(✅ 已验证)

**目标**:完成 MissionBrief / Score / Restart HUD;10 次端到端 playtest 跑通 intro scene。

**子任务**:
1. `components/HissionBrief.tsx` 重写(基于现有 store)显示 brief + current state。
2. `components/HUD.tsx` 重写显示 score / 拆灯数 / 击杀数 / 死亡次数 / reload indicator(占位)。
3. `components/Restart.tsx` 重写:玩家死亡 → 显示 retry 按钮 → 重置 spawn。
4. `scripts/playtest.mjs` 端到端脚本:启动 → 进房 → 拆灯 → 击杀 → 通关 / 死亡 → 退出,跑 10 次全部 PASS。
5. `scripts/visual-check.mjs` 视觉回归:0 console error + ambient 0.12 + scanlines 0.10 + dither 开启 + walk 6fps + 4 帧 + 灯池收缩生效。

**验收**:
- tsc 0 error
- `node scripts/playtest.mjs` 10/10 PASS
- `node scripts/visual-check.mjs` 0 console error
- 10 次手动 playtest(本地浏览器),平均通关时长 < 60s,无不可解释死亡

---

## 6. 验证门(每个 phase 收尾必跑)

```bash
npx tsc -b --noEmit                       # 类型 0 error
node scripts/smoke.mjs                    # 冒烟 0 error
node scripts/playtest.mjs                 # 端到端 9/9(P7 后 10/10)
node scripts/visual-check.mjs             # 视觉 0 console error
node scripts/player-check.ts              # player 8/8 PASS
node scripts/enemy-check.ts               # enemy 9/9 PASS
node scripts/lightfield-check.ts          # lightField 3/3 PASS
node scripts/rc-lab-check.mjs             # RC 测试台 35/35 PASS(若改 RC)
```

P7 完成后 = intro scene ship-ready。详见 [`docs/design/20-bug-fix-checklist.md`](../design/20-bug-fix-checklist.md)。

---

## 7. "完美"定义(Polish loop 的目标态)

> 用户指令"全力打磨直到完美"。本节给"完美"的客观标准,避免主观循环。

### 7.1 视觉(肉眼可见)

- [ ] **30 秒内有"哇"瞬间**:从出生到拆灯到击杀的全过程,平均 ≤ 30 秒,其中至少有 1 个让玩家屏息的瞬间(灯灭瞬间 / 击杀瞬间)。
- [ ] **像素颗粒感保留**:dither 4×4 Bayer 开启,玩家能数出角色身上的像素点(不是柔光糊脸)。
- [ ] **lilong 漆黑的"压迫感"**:90% 像素 INK / 主光只在油灯周围 2u 内 + 灯锥 0.6Hz sweep。
- [ ] **walk 步幅真实**:腿部明显摆动 + 6fps 流畅;不是"漂移"。

### 7.2 手感(操作反馈)

- [ ] **LMB 永远有反馈**:命中灯 / 命中敌 / 命中光下敌 → 3 种不同反馈(粒子 / 击杀 / 白闪)。
- [ ] **玩家死亡不可怕**:0.4s 提示给玩家反应时间,vignette 不是黑屏。
- [ ] **拆灯 = 1.5s 内 2 次 LMB**:不能太脆也不能太硬,1.5s 平衡点。
- [ ] **击杀 = 1 击**:暗处 1 LMB = 死,绝不"打 2 下"。

### 7.3 性能(机器可见)

- [ ] 60 FPS @ 1080p 稳定 30 分钟(性能预算 TDD §3.5)
- [ ] `__rcPipeline.state().lastFrameTime` < 16ms
- [ ] `__simEvents()` 无 stuck / 无 zombie enemy
- [ ] 启动 → 可玩 ≤ 1s(标题壳 → 进房)

### 7.4 可重玩(测试可见)

- [ ] **种子无关**:intro scene 没有 RNG,每次通关路径理论上相同;但玩家实际操作有路径选择(走左 / 走右 / 何时拆灯)。
- [ ] **分数反馈**:通关 → 显示 S/A/B/C 评分 + 全拆灯加成(09 §10)+ 重玩按钮。
- [ ] **无 bug 残留**:BUGS.md 中 B40-B45(lightSmash)+ B46+(kill/death)全部 FIXED。

---

## 8. 已知冲突 + 决策点

### 8.1 已解决冲突

| # | 冲突 | 决策 |
|---|------|------|
| C1 | 02 §9 forbidden"❌ 粒子叠加(无伤血粒子等)"vs Tier 2 粒子(B01-B04)| **解除**:用户 2026-08-09 "可以粒子";intro scene 例外。02 §9 该条目待 polish loop 阶段同步标注"intro scene 例外"。 |
| C2 | GDD v2 提到多 zone 多任务 vs 2026-08-09 "只 ship 1 intro scene" | **解除**:GDD v3 / AGENTS v3.1 / 09 §8.2 / §12 全部 trim 完成。 |
| C3 | docs/levels/m1_workshop_room1.md 是单房蓝图 vs 用户要"intro scene 打磨计划" | **解决**:本文件 rename + rewrite(本文件)。 |
| C4 | RC 真发射(M1.4)vs P6 用几何光场 CPU 版 | **保留**:M1 ship = 几何光场;RC 真发射 = M1.4 port(`rc-lab/pipeline.ts` → `src/engine/RcPipeline.ts`,35/35 断言已对齐)。 |

### 8.2 待验证决策点(playtest 必须答)

> 完整 D1-D8 见 [`09 §11`](../design/09-blindside-integration.md#11-决策点本次合并需在-m10-spike-期间定稿)。
> intro scene 必须用 playtest 实际玩出数值,不允许"还没玩就拍"。

| # | 决策点 | 默认 | 决定者 |
|---|--------|------|--------|
| D1 | `BREAKABLE_LIGHT_HP` | 2 | agent-engine.1(P4 验证)|
| D2 | `LIGHT_SHIELD_THRESHOLD` | 0.30 | agent-qa(P7 playtest 调)|
| D3 | `LIGHT_EXPOSED_THRESHOLD` | 0.10 | agent-qa |
| D4 | 灯锥玩家"发现"距离 | 5u | agent-core |
| D5 | 玩家死亡 reset 延迟 | 0.5s | agent-ui |
| D6 | 拆灯 LMB 优先距离 | 2.0u | agent-core(P4 验证)|
| D7 | walk animFps | 6 | agent-engine |
| D8 | lamp flicker Hz / 幅 | 12Hz / 0.4-0.6 | agent-engine(P4 验证)|

### 8.3 待解冻事项(M2+ 路线,本阶段不动)

| 项 | 当前状态 | 解冻条件 |
|----|---------|---------|
| 多 zone palette (bund/concession/creek) | 02 §10.5 数据冻结 | 用户明示 |
| 8 件武器其他 7 件 | weapons.ts 数据冻结 | M2 解冻 |
| 9 面具全启用 | sprites.ts 数据冻结,intro scene 不 ship `MaskSelect` | M2 解冻;`lampmaker` M1.6 可提前 |
| 5 敌人 archetype 其他 4 个 | enemies.ts 数据冻结 | M2 解冻 |
| BOSS(3 击) | 数据冻结,intro scene 不出场 | M2 解冻 |
| RC 真发射(替代几何光场)| M1.4 端口待做 | rc-lab 35/35 全绿即可,无外部阻塞 |

---

## 9. 顺序与节奏(预估工期)

```
[P0 ✅ 几何光场]
    ↓
[P1 ✅ 最小 lilong 房间]
    ↓
[P2 ✅ 玩家移动 + knife]
    ↓
[P3 ✅ flashlight_patrol + 灯锥视野]
    ↓
[P4 拆灯]              ← 1.0-1.5 天
    ↓
[P5 击杀 + 死亡]       ← 1.5 天
    ↓
[P6 渲染 + 输入接线]   ← 2.0 天
    ↓
[P7 HUD + playtest]    ← 1.0 天
    ↓
[Polish loop 无限]     ← 至"完美"(§7)达成
```

**MGP(最小可玩)**:P4-P7 = 5.5-6 天。
**SHIP-READY**:MGP + §7 完美定义全部勾选(预计 8-10 天,看 polish 深度)。

---

## 10. Polish loop(无限循环,直到 §7 全部勾选)

每次循环 = **观察 → 找问题 → 改 → 验证 → 再观察**:

1. **观察**:手动跑 10 次 intro scene,记录每帧感受(`__simEvents()` 看事件流,`__rcPipeline.state().lastFrameTime` 看性能,屏幕录像回放看视觉)。
2. **找问题**:把"不对劲"分 3 类 —— 视觉(§7.1)/ 手感(§7.2)/ 性能(§7.3),登记到 BUGS.md(B46+)。
3. **改**:走 20 §1 必跑 + §2 必同步文档。
4. **验证**:§6 验证门全跑 + 手动 10 次复测。
5. **再观察**:直到 10 次全部 ≥ 30 秒内有"哇"瞬间 + 玩家屏息 ≥ 1 次。

> **停止条件**:**用户说停**或 intro scene 退役(若有 M2+ 多房间需求)。本计划无内置"完美即可"自动停止 —— 由用户判断。

---

## 11. 文件产出清单(P4-P7 期间涉及)

### 11.1 新建

| 路径 | 用途 | 阶段 |
|------|------|------|
| `src/core/simulation/damage.ts` | lightSmash + enemyHitCheck + playerDeath | P4 / P5 |
| `src/core/simulation/playerDeath.ts` | 死亡检测 + reset | P5 |
| `src/engine/RcPipeline.ts` | 几何光场 CPU 实现(M1 用) | P6 |
| `src/engine/SceneManager.ts` | 从 `_archive-2026-08-09/` 恢复 + 接通 | P6 |
| `src/engine/InputManager.ts` | 从 `_archive-2026-08-09/` 恢复 + 接通 | P6 |
| `src/engine/sprites/` | 从归档恢复程序化 sprite 渲染 | P6 |
| `src/engine/postfx/` | 从归档恢复 dither | P6 |
| `src/components/HUD.tsx` | score / 拆灯数 / 击杀数 / restart | P7 |
| `src/components/MissionBrief.tsx` | 重写显示 brief | P7 |
| `scripts/playtest.mjs` | 端到端 10 次 | P7 |

### 11.2 修改

| 路径 | 改动 | 阶段 |
|------|------|------|
| `src/core/data/sprites.ts` | 加 `oil_lamp` archetype + 玩家 `lunge` 帧确认 | P4 / P5 |
| `src/core/data/enemies.ts` | 确认 `flashlight_patrol.invulnWhileLit` | P5 |
| `src/core/data/lights.ts` | 确认 `oil_lamp.breakable=true / hp=2` | P4 |
| `src/core/data/sfx.ts` | 加 lamp_break / kill_confirm_gong / shield_block | P4 / P5 |
| `src/core/constants.ts` | 加 / 确认 lightSmash 常量 | P4 |

### 11.3 归档(若改坏可恢复)

- `_archive-2026-08-09/src/engine/RcPipeline.ts`(M1 几何光场起点)
- `_archive-2026-08-09/src/engine/SceneManager.ts`
- `_archive-2026-08-09/src/engine/InputManager.ts`
- `_archive-2026-08-09/src/engine/sprites/`
- `_archive-2026-08-09/src/engine/postfx/`
- `_archive-2026-08-09/src/core/simulation/player.ts`(P2 已部分恢复,存档仅作安全网)

---

## 12. 状态

| 项 | 状态 | 备注 |
|----|------|------|
| 蓝图 3.1-3.4 | ✅ 已对齐 `src/core/data/missions.ts` | rename 后一致 |
| intro curated PNG | ✅ 9 项 approved manifest 已处理 | actor/effect 64 cells；tile 48 cells；hash/check fail closed |
| Tier 2 视觉(B01/B02/B07) | ✅ sprite+RC polish 已接 | 火花/玻璃/震动与 P5 gameplay feedback 已接；短时 juice 静态捕捉仍可提升 |
| P0 几何光场 | ✅ | 3/3 PASS |
| P1 最小房间 | ✅ | 1 房 + knife + 1 敌 |
| P2 玩家移动 + knife | ✅ | player-check 8/8 PASS |
| P3 flashlight_patrol | ✅ | enemy-check 9/9 PASS |
| P4 拆灯 | ✅ tracer bullet 完成 | 两次独立 LMB:HP 2→1→0；0.1s 机制失效；0.3s 视觉收缩；自动检查 PASS |
| P5 击杀 + 死亡 | ✅ 完成 | 确定性 sweep；warning→death/retry；lit block / dark OHK；score/replay |
| P6 渲染 + 输入接线 | ✅ 完成 | Canvas source + RcPresenter + WebGL2 one-cascade RC；几何光场为 gameplay authority |
| P7 HUD + playtest | ✅ 完成 | HUD trim；`combat-loop:check` + `e2e:playtest` PASS |
| Polish loop | ✅ 本轮完成 | 最终截图 5 张；剩余视觉差距均为 non-blocking |

### 12.1 P4 浏览器 playtest 审核(2026-08-09)

**截图证据**:
- `playtest-p4-before.png`:完整油灯 + 活动灯池 + 玩家/巡逻兵初始态。
- `playtest-p4-damaged.png`:第一次 LMB 后油灯 HP=1 / `damaged`,外观出现裂纹。
- `playtest-p4-broken.png`:第二次 LMB 后油灯 HP=0 / `dead`,活动光源归零。

**机制结论**:
- ✅ WASD 移动、鼠标瞄准和 LMB 输入在浏览器有效。
- ✅ 两次独立 LMB 产生 `lightSmash` ×2,随后产生 `invalidateLight` ×1。
- ✅ 机制光源在 0.1s 后从 `activeLights` 移除；浏览器 console 0 error。
- 历史说明:该截图组仅是当时 P4 tracer；其后 P5 已完成并由最终 gate 覆盖。

**美术结论**:
- ✅ 黑/砖红/灯黄的大色关系正确；油灯三态、红围巾玩家锚点和巡逻兵灯锥可辨。
- 🔴 当前仍是 Canvas2D debug art：空矩形房间和矩形角色没有达到 canonical 弄堂参考的石库门、窄巷、砖纹和 16×16 sprite 质量。
- 🔴 灯灭前后静态截图的明暗差不够强；0.3s 收缩、粒子和震动需要录像或关键帧 visual-check 才能可靠验收。
- **判定**:P4 机制 PASS；美术不进入“完美”计数。P6 必须接 `sprites.ts` 程序化 sprite 与正式 RC/像素后处理后再做视觉评分。

### 12.2 sprite + RC intro polish 验证(2026-08-09)

- 命令:`npm run intro-polish:check` PASS；其内部执行 approved asset/manifest drift check、`npm run typecheck`、`npm run build`、`npm run light-break:check`。RC lab 改动仍另跑 `npm run rc-lab:check`。
- 截图:`playtest-polish-intact.png` / `playtest-polish-damaged.png` / `playtest-polish-broken.png`；P4 对照图为 `playtest-p4-before.png` / `playtest-p4-damaged.png` / `playtest-p4-broken.png`。
- 架构确认:`SceneManager` Canvas2D source → `RcPresenter` planes → dedicated WebGL2 `RcPipeline`(1 cascade/twoLoop/dither)；WebGL2 fallback 回 source canvas。`GeometricLightField` 仍是拆灯/光暗机制权威。
- 最终结论:P5/P6/P7 已完成。`combat-loop:check` 验证确定性 sweep、warning/death/reset、lit block、dark OHK、victory/score/replay；`e2e:playtest` 验证浏览器闭环、HUD、零 console error，并产出 `smoke/hotline-e2e-{intact,broken,detection-death,retry,score-replay}.png`。RC 固定 one-cascade visual-only；规则方盒构图、有限石库门/晾衣层次、缩放后轮廓、灯灭反差和短时 juice 捕捉仍是诚实的 non-blocking polish limits。

---

**整理人**:Mavis(设计层)+ Claude(执行层)
**整理日期**:2026-08-09
**版本**:v3.1 重冻结(2026-08-09,从 `m1_workshop_room1.md` rename + rewrite)
**溯源**:所有引用均来自 `GDD.md` / `TDD.md` / `BUGS.md` / `docs/design/` / `src/core/data/` / `rc-lab/`,无外推
