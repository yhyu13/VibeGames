# 09 · BLINDSIDE × Hotline Shanghai — 整合规范(v3 设计层)

> **状态**:v3 设计层权威(2026-08-09)。本文件 **取代** 06-blindside-lessons.md 中 B29 的 7 项提案,
> 将其与 GDD v2 / TDD v2 合并为单一可执行规范。下游 GDD / TDD / MVP-PLAN / BUGS 中的相关章节
> 必须以本文件为准。改本文件 = 走 `[DESIGN-LAYER-CHANGE]` 流程。
>
> **来源证据**:
> - [learning/blindside/README.md](../../../learning/blindside/README.md)(21 天 jam / Unity WebGL 1.1)
> - [learning/blindside/VIBECODING-BOOTSTRAP.md](../../../learning/blindside/VIBECODING-BOOTSTRAP.md)(TDD-DRAFT / traps / 21 天验收清单)
> - [06-blindside-lessons.md](06-blindside-lessons.md)(已落地的 5 项 + 待决策 7 项)
> - [B33 重置事实](../../BUGS.md)(2026-08-09 关卡/场景/移动整体移除,本整合基于空 stub 起步)
>
> **v3 与 v2 的关键差异(一句话)**:**GDD v2 把 RC 当 *装饰*(每开一枪世界怎么亮);v3 把 RC 当 *机制护甲*(光下无敌,暗中可杀,拆灯=拆敌)。**
>
> **v3 对齐修正(2026-08-09 下午)**:§8.2 / §12 原按 v2 写"4 任务保留 / 32×18 viewport 保留",
> 与 GDD v3 V3/V4 + TDD §0.1 冲突;已修正为 **任务 1+4(m1+m4)+ 像素锚定 viewport**。
> 改本文件 = `[DESIGN-LAYER-CHANGE]`。

---

## 0. 一句话 + 一句话

- **整合后的一句话**:Hotline Shanghai 让你做 1937 弄堂的"拆灯人":你杀的不是人,是人形的光 —— 拆掉油灯 / 戳瞎探照灯,光池坍缩的瞬间,敌人才变成你能一刀了结的血肉。
- **整合后的一行机制**:光照下的敌人 **不可被击杀**(玩家打不出伤害);阴影下的敌人 **一击必杀**(OHK);玩家可投掷 / 挥击 **光源本体** 把它打灭;RC 既是视觉,也是敌方的护甲。

---

## 1. 整合的核心决定(Core Decisions)

| # | v2 决定 | v3 决定 | 理由 |
|---|---------|---------|------|
| **C1** | RC 是 *visual layer*(光照氛围) | RC 是 *gameplay layer*(敌方护甲) | 见 [GDD §5](../GDD.md)和[此前的设计评审](https://placeholder)§3.2 — OHK 把每枪变成投硬币,RC 只在"灯下黑" *机制* 里才找到 tension |
| **C2** | 敌人视野 = 8u 锥形 60°(纯几何) | 敌人视野 = "RC lightAt(pos) > 阈值"的区域(物理) | 视野与光源耦合,巡逻兵手电就是会扫的 RC 光锥,扫到玩家 = alert(参考 BLINDSIDE FlashlightPatrol) |
| **C3** | 武器 = 8 件,无破坏玩法 | 武器 = 8 件,**全部可投掷 / 挥击光源**;新增 1 个独立动作 = `lightSmash`(拆灯) | 投掷武器到灯上 = 优先破坏光源,无武器时空手 LMB 砸灯,投掷唯一入口 = E 长按(沿用 v2-cut R16) |
| **C4** | 灯是静态装饰 | 灯是 **可破坏道具**;`BREAKABLE_LIGHT_HP=2` 击碎 | 砸灯的时机 = 房间策略的核心;不引入新输入键,LMB 优先打最近光源 / 敌人 |
| **C5** | 面具 6 个全为 HM 翻译 | 6 个面具 = **6 个 v2 保留 + 3 个 1937 原创(v3 新增)** | v3 新增:灯匠 / 暗哨 / 算命先生(见 §6 面具重排) |
| **C6** | F 切换硬直 0.15s(同时在 cut-first 和 M1.1) | F 切换硬直 0.0s(**冻结切割**,沿用 cut-first) | 已有冲突,本次定调 |
| **C7** | 评分 S/A/B/C 阈值 | 同 v2 阈值,新增 **"全拆灯"成就** 触发 S-rank 加成 | 鼓励"拆灯流"是整合的隐性目标 |
| **C8** | RC 性能降级 5 级(cascade 3→0) | 同 v2 降级 + **新增硬底**:cascade=0 时 *屏蔽* lightSmash 机制(变 OHK 通用战) | 防止 RC 关闭时机制完全死掉 |

> **决策 C1 是整个 v3 的支点**。其余 7 项都是 C1 的展开。改 C1 等于改游戏。

---

## 2. 核心机制:光暗反制(Mechanic: Light vs Shadow)

### 2.1 一句话规则(玩家可教)

> **光下无敌,暗中可杀。灯是敌方的盾,灯灭是敌方的死。**

### 2.2 完整规则表

| 条件 | 玩家状态 | 敌人状态 | 视觉反馈 |
|------|----------|----------|----------|
| 玩家在 **光下** (`lightAt(player) > 0.30`) | 暴露 — 敌人视野内**且**光照内 → 敌人可发现并开火 | 敌人可击杀(只要玩家进入攻击距离) | 玩家头顶 ⚠️ icon + 灯池内高亮描边 |
| 玩家在 **暗中** (`lightAt(player) ≤ 0.10`) | 隐身 — 敌人视野失效(视线被光 / 暗对比破坏) | 敌人不可见(若本应可见则失去目标) | 玩家蒙面发微光(知道自己在暗) |
| 敌人站在 **光下** (`lightAt(enemy) > 0.30`) | — | **不可击杀**(玩家打不出伤害) | 敌人身上有"光盾"层叠 sprite,武器命中 = 弹开粒子 + 金属音 |
| 敌人站在 **暗中** (`lightAt(enemy) ≤ 0.10`) | — | **可击杀**(OHK,沿用 v2) | 击杀 = 沿用 v2 血溅 + RC 灯光闪一下(沿用 `blood_splash` 0.5s) |
| 光源被 **打灭** | — | 灯池坍缩,内含敌人 **0.1s 内逐个转为"暗中"** | 灯碎 = 火花 + 玻璃 / 木屑粒子 + 灯池 RC 在下一帧淡出 |

### 2.3 `lightAt(pos)` API(冻结)

**这是 v3 新增的唯一 query 函数**。所有 light/shadow 判断都走它。

```ts
// core/world/lightField.ts(冻结)
export interface LightField {
  /** 每帧从 RC pipeline 同步;Simulation 不直接调 RC,只读已写入的 cache */
  sampleAt(worldPos: Vec2): number;       // 返回 0..1 的归一化辐射强度
  /** 给定敌人,判断是否"被光照保护" */
  isShielded(entityPos: Vec2): boolean;   // sampleAt(pos) > LIGHT_SHIELD_THRESHOLD
  /** 给定玩家,判断是否"被光暴露" */
  isExposed(entityPos: Vec2): boolean;    // sampleAt(pos) > LIGHT_EXPOSED_THRESHOLD
  /** 灯被破坏时调用;触发下一帧 RC 重算 */
  invalidateLight(lightId: EntityId): void;
}
```

**关键不变量**:
- `sampleAt` 是 **只读**;Simulation 不直接读写 RC framebuffer。
- 灯的破坏是"lazy 失效":下一帧 RC 重算,本帧敌人仍是"光下无敌",0.1s 后转为"暗中可杀"(给玩家一个 *视觉确认* 窗口)。
- `LIGHT_SHIELD_THRESHOLD = 0.30`,`LIGHT_EXPOSED_THRESHOLD = 0.10`(故意不等 — 玩家 0.10 即隐身,敌人 0.30 才无敌;给玩家"接近灯池边缘"的小安全区)。
- 灯熄灭阈值 = 0.5(灯自身的发光强度 < 0.5 视为熄灭,转静态 deadLight,`sampleAt` 不再贡献)。

### 2.4 玩家的"灯语"动作(verbs,不是 buttons)

| 动作 | 输入 | 触发 | 反馈 |
|------|------|------|------|
| **拆灯** `lightSmash` | LMB(若最近可交互目标 = 灯,优先打灯) | `BREAKABLE_LIGHT_HP` 扣 1 | 灯 sprite 切换为"半碎"状态,RC 强度减半 |
| **拆灯(终)** `lightDestroy` | LMB 续击(累计 HP=0) | 灯移除,`invalidateLight` | 火花 / 玻璃粒子 + 灯池下一帧淡出 + 音效 |
| **投灯** `throwAtLight` | E 长按 0.25s + 鼠标指向灯 | 投出当前武器,落地为"临时光源" 1.5s(对敌方等于一个 0.4 强度新灯) | 抛物线预览(见 §3.3) |
| **闪灯** `flash` | 空手 LMB + 双击右键 | 仅限面具 `灯匠`:在脚下产生 0.4u 半径的 *临时光池* 0.5s | 暖色脉冲 + sfx |
| **按灯** `hold` | 灯匠面具专属:Shift + 朝灯 | 0.4s 长按后,该灯切换为 *闪烁模式*(原 60Hz → 12Hz);RC 强度减半 | 灯 sprite 抖动 |

> **LMB 优先打灯的判定**:`aimTarget` 距离 ≤ 2.0u 且 aimTarget 是灯 → `lightSmash`;否则按玩家模式打敌(沿用 v2 LMB 行为)。这是 *无新键* 的设计。

---

## 3. 7 个 BLINDSIDE 子机制 — 全部采纳,标注取舍

| # | BLINDSIDE 机制 | HS v3 落地 | 取舍 / 注 |
|---|----------------|------------|-----------|
| **M1** | **光下无敌 / 暗中可杀**(核心) | §2 全部 | **100% 采纳**;这是 v3 决策 C1 |
| **M2** | **FlashlightPatrol 敌人**(手电锥形光源) | 敌人 archetype `flashlight_patrol`(沿用 `enemies.ts` 加一项,RC 锥形光 = 手电);锥角 50°,扫速 0.6 Hz,玩家进入锥 = 立即 alert | **100% 采纳**;v2 §4.4.4 视野 8u 60° 改为 *受光影响* 的版本(见 §5) |
| **M3** | **投掷弧线预览**(Throw Arc) | 已有 `throwHold` 状态机:在 0.05-0.25s 之间实时画抛物线 + 落点高亮 | **100% 采纳**;新增 HUD overlay(`components/ThrowArc.tsx`),不占 RC 预算 |
| **M4** | **Checkpoint + 死亡图标旋转** | 死亡时在玩家位置留 1.0s 旋转"血迹靶环"(沿用 BLINDSIDE 美术),同时记录"击杀方向"用作日志;任务进度沿用 v2(房间内不死) | **100% 采纳**(视觉强化 + 进度沿用) |
| **M5** | **击杀确认 juice**(白闪 + 顿帧 + 震屏 + sfx) | 击杀瞬间:① 0.05s 屏幕白闪(`PAL_IVORY` 60% alpha)② 0.05s 时间缩放 0.5x ③ 0.1s 震屏(2 px) ④ sfx(沿用 v2 `blood_splash` + 新增小锣 0.15s) | **100% 采纳**;复用 v2 `killConfirm` 事件,加 audio 配方 |
| **M6** | **AimFocus**(Shift 冻结瞄准方向) | **新绑定**:Shift 长按期间(沿用 v2 `dodgeCooldown` 不变),玩家停止旋转,鼠标只移动"瞄准角",相机沿瞄准线轻推 0.4u;松开恢复 | **100% 采纳**;实现成本低,适配"光下"玩家(光下移动要稳,瞄准要准) |
| **M7** | **ReloadIndicator** | 远程武器换弹时 HUD 显示进度条 + 转圈(0-100% over `reloadTime`) | **100% 采纳**;v2 没有,补齐 |

> **不采纳**(避免 scope creep):
> - BLINDSIDE 的 *sensor bomb*(预测路径投掷)— 拆灯机制已替代,加 sensor 会让投掷语义分裂
> - BLINDSIDE 的 *crawler vs gunner* 二分 — HS 沿用 v2 4 个 archetype(占领军/伪警/巡捕/特务),不在此处扩

---

## 4. 武器重排(沿用 v2 8 件,加 1 个 `lightSmash` 优先级)

| ID | 类型 | 旧 `damage` | v3 行为注解 |
|---|---|---|---|
| `knife` | melee | 1 | 近战(可拆灯) |
| `bat` | melee | 1 | 近战(可拆灯) |
| `mauser_c96` | ranged | 1 | 远程;命中 *暗中* 敌人 = OHK(沿用);命中 *光下* 敌人 = 弹开(无效) |
| `boxer` | ranged | 1 | 同上 |
| `thompson` | ranged | 1 | 同上;连发 10/s 适合"灯边磨血" |
| `mosin` | ranged | 1 | 远程;长距 64u 适合"在暗处远距" |
| `grenade` | throw | 1 (AoE) | **优先级最高** — 投到灯上 = 1 击(是否按 damage 计 = D7);投到敌人 = AoE 命中(对光下敌人 0 伤害) |
| `throwing_knife` | throw | 1 | 投到灯上 = 1 击(需再补 1 击) |

> 关键:武器 `damage` 不变,**所有武器命中"光下敌人" = 0 伤害 + 弹开 + 金属音**。
> 武器命中"灯" = 触发拆灯行为(`BREAKABLE_LIGHT_HP` 扣 1;手雷 / 投掷物是否按 damage 计 = D7,spike 实证前统一 1)。
> 这把 *所有* 武器都自然支持新机制,无需重做武器表。

---

## 5. 敌人 FSM:增加 `INVULNERABLE` 状态

> 沿用 TDD v2 §4.4.4 数值,新增 state 切换逻辑。

```
            ┌──────────────┐
   spawn →  │   PATROL     │ ←──── light restored / light from new light source
            └──────┬───────┘
                   │ (cone of vision sees player) AND (player not in dark)
                   ↓
            ┌──────────────┐
            │   ALERT      │ → 0.4s 内未追击 → 回 PATROL
            └──────┬───────┘
                   │ 玩家进入 attack range
                   ↓
            ┌──────────────┐
            │   ATTACK     │ → 击杀玩家 / 玩家逃出 / 玩家到暗处
            └──────┬───────┘
                   │ player.inLight = true AND 玩家进入 1.4u
                   ↓
            ┌──────────────┐
            │  FIRE (1击)  │ → fire → back to ATTACK
            └──────────────┘
```

**新增强制检查**(每 tick):
- 若 `lightShielded(enemy) == true` AND `enemy.state == DEAD or即将 setDead`:拒绝 setDead,改回 ALERT(无敌护甲)
- 玩家打 `lightShielded == true` 的敌人:不进入 damage 计算,直接 emit `attackBlocked` 事件
- 玩家打 `lightShielded == false` 的敌人:沿用 v2 命中逻辑(OHK)

**敌人 archetype 新增 `flashlight_patrol`**(M2):
- 视野 = 灯锥(RC 实体光源,锥角 50°,扫速 0.6 Hz)
- 看到玩家 → 不开火(只是 alert,呼叫)
- 被拆灯(光源被毁)→ 视野退化到 v2 几何 8u 60° 锥
- 与 BOSS 共生:BOSS 自身有永久 RC 灯(等同 `surgical` 强度 0.7,半径 8u)→ BOSS 永远无敌;玩家必须 *先拆周围灯* 再 *投/砸 BOSS*

**BOSS 改造**(v2 BOSS 3 击):
- 沿用 v2 `BOSS_HITS = 3`
- 新增强制:BOSS 房间 *进入时* 至少 3 个静态灯(让玩家有"先拆灯再打"的策略窗口)
- BOSS 自身不发光 = v2 老路;BOSS 自身有 0.7u 永久光 = v3 新路(默认走新路,见 §10 决策点)

---

## 6. 面具重排(6 保留 + 3 新增 = 9,均对位 1937 主题)

| ID | 名称 | v2 效果 | v3 效果 | 设计意图 |
|---|---|---|---|---|
| `actor` | 戏子 | 进入房间 0.5s 慢动作 | **保留**;同时给玩家 *光下身份保护* — 头 0.5s 玩家被视为在暗中(拆灯入场时机) | 戏剧性入场 |
| `runner` | 帮工 | 拾取武器满弹 | **保留**;不再变化 | HM 翻译,最稳 |
| `righteous` | 蒙面义士 | 近战范围 +0.5u | **保留**;同时近战拆灯范围 +1.0u(双重加成) | 配合 M3 拆灯流 |
| `dancer` | 舞女 | 翻滚冷却 -50% | **保留**;同时翻滚期间 *生成 0.6u 临时光池* — 给玩家翻滚后安全窗 | 暗 / 亮边界舞蹈 |
| `waiter` | 茶馆跑堂 | 敌人视野 -30% | **保留**;同时玩家 *暗中隐蔽阈值* 0.10 → 0.20(更宽容的"暗"判定) | 1937 茶馆跑堂熟悉暗巷 |
| `officer` | 军爷 | 持枪移动 +20% | **保留**;不再变化 | HM 翻译 |
| **`lampmaker`** 🆕 | 灯匠 | — | 长按 Shift = 0.4s 内把目标灯切换到 *闪烁模式*(强度减半);空手 LMB 双击 = 脚下生 0.4u 光池 0.5s | **v3 主题核心面具**:可以主动控制战场光暗;配合 §2.4 闪灯动作 |
| **`darkwatch`** 🆕 | 暗哨 | — | 暗中 *能看见* 敌人的红色描边(预知位置);光下 *能看见* 灯的精确辐射半径(预判光池边界) | "暗哨"字面就是哨兵=信息;双重视觉辅助 |
| **`fortuneteller`** 🆕 | 算命先生 | — | 进入房间时,1 个随机灯变成 *虚假* 灯(RC 强度 0 但视觉正常);玩家 *第一次交互*(拆或路过)后揭示 — 揭示瞬间全房间灯短暂 *熄灭* 0.3s | "算命"= 假象,真象藏在错位中;高风险面具(S-rank 隐藏任务用) |

> **面具改动原则**:保留 v2 6 个的"基础数值 + 美术感",**新增 3 个全部围绕"光暗反制"**,这让 v3 面具 *本身* 就是机制教程 — 玩家从默认面具(蒙面义士) → 拆灯(基础)→ 灯匠(主动控光)→ 暗哨(信息)→ 算命(高阶),形成面具进阶路径。

---

## 7. RC 管线调整(对 v2 §15 的最小修改)

> 本节是 v3 → v2 §15 的 *delta*,不改 §15 全部。新增常量 + 1 个新 pass。

### 7.1 新增 RC uniform / constant

```glsl
// 追加到 rc.frag 顶部(在 v2 §15.3 已列 uniforms 之后)
uniform float uLightShieldThreshold;   // 默认 0.30
uniform float uLightExposedThreshold;  // 默认 0.10
```

> v3 **不**改 probe 数学(沿用 v2 demo 原式),不增加 cascade 数,不增加 pass 数。
> 只在 final pass 之前多写一个 **轻量 readout**:`lightField.cache[texel] = finalRadiance`,供 `core/world/lightField.ts` 在 CPU 侧用 `glReadPixels` 读 8×8 downsample(避免每帧全屏读)。

### 7.2 新增 CPU-side cache(每帧同步)

```ts
// core/world/lightField.ts
export class LightFieldCache {
  private readonly downsample: Float32Array;   // 8×8 block 降采样
  update(data: Float32Array, width: number, height: number): void;  // engine 负责 glReadPixels,core 零平台(C.A.T)
  sampleAt(worldPos: Vec2): number;             // 双线性插值 downsample
  isShielded(entityPos: Vec2): boolean;
  isExposed(entityPos: Vec2): boolean;
}
```

> **降采样代价**:lightField = 1920×1080 的 8×8 块降采样 → **240×135 floats(R32F ≈ 130KB / 帧)**,`glReadPixels` ~0.2ms(与 TDD §4.6/B39 一致;RC 预算 §3.5 加 0.2ms,新总预算 9.7ms / 硬上限 15ms)。4K 升 16×16 块,预算 +0.3ms(R-V3-5)。

### 7.3 性能降级(v2 §3.6 的 v3 补充)

| 等级 | cascade | res | dither | 新增:`lightShielded` 行为 |
|------|---------|-----|--------|----------------------------|
| 0(RC_OFF) | 0 | base | off | **退化到 v2 行为** — 无光暗机制,所有敌人均可被 OHK(机制失效但游戏不崩) |
| 1 | 1 | half | off | 阈值 ±0.05 容差(防止 cascade 1 抖动误判) |
| 2 | 2 | 1.0 | off | 标准 v3 |
| 3 | 3 | 1.0 | on | 标准 v3(默认) |

> **降级到 0 级时,游戏自动播放"停电"动画(0.3s 屏幕全黑)并附 HUD 提示"照明失效,机制退回"**。这是诚实的反馈,玩家知道发生了什么。

---

## 8. 关卡 / 房间策略 — 1937 弄堂 × 光暗反制

> v2 §6.3 的 4 个任务 *保留*,但每个房间的设计规则升级。

### 8.1 房间设计 checklist(每个房间必须满足)

- [ ] 至少 1 个 *可破坏光源* (油灯 / 霓虹 / 手电)— 玩家有"拆灯"目标
- [ ] 房间 *进入时* `totalLightIntensity` ≤ 0.85(允许少量暗区)— 玩家有"在暗中"窗口
- [ ] 房间 *进入时* `totalLightIntensity` ≥ 0.55(至少一半地图是亮的)— 玩家必须行动
- [ ] 每个 `flashlight_patrol` 敌人 *至少* 紧贴 1 个静态灯 — 灯被拆 = 敌人退化
- [ ] 房间 *没有"零光区" > 4u²* — 防止玩家钻暗处苟(违反节奏)

### 8.2 任务清单(v3,沿用 GDD V4 的 1+4 + 新增光暗)

| # | ID | 中文 | 房间数 | v3 主题加层 | BOSS 配置 |
|---|----|------|--------|-------------|-----------|
| 1 | `m1_workshop` | 电车公司 | 3 | Room 1 教拆灯(油灯);Room 2 引入首个 *flashlight_patrol*;Room 3 仓库深处多灯 = "先拆灯再强攻" | 特务,无自身光(3 击) |
| 4 | `m4_postman` | 孤岛邮差(隐藏) | 4 | 渡船 *月光* = 暗处优先;路卡探照灯 = 拆灯 + 投掷造灯;残垣 *硬灯*(HP=3)教学;屋顶 BOSS 自带 0.7u 永久光 = 玩家必须 *主动造灯* 才能开打 | 占领军长官,自带 0.7u 永久光(3 击) |

> **v3(GDD V4)**:任务 = 1 + 4(m2/m3 砍,素材并入 1/4)。教学曲线 = 任务 1 教拆灯 / 任务 4 教暗处优先 + 硬灯策略 + 主动造灯。

---

## 9. 音频调整(对 v2 03-audio-direction.md 的 v3 补充)

> v2 音频是 HM 风格电子;synth + 老上海 + 弄堂市井的混合方案不变。
> v3 新增 / 调整:

| sfx | v3 行为 | 来源 |
|-----|---------|------|
| `lamp_break` | 木屑 + 玻璃响 0.3s(替代 v2 单一 thud) | 新增 |
| `shield_block` | 金属撞击 0.15s(武器命中光下敌人) | 新增 |
| `lamp_flicker` | 灯匠面具专属:短促电流感 0.1s | 新增 |
| `kill_confirm_gong` | 小锣 0.15s(在 v2 `blood_splash` 之上叠加) | 新增 |
| `exposed_warning` | 玩家进入光下时播放:低音脉冲 0.2s(0.8s 节流) | 新增 |
| `bgm_pad_lonely` | 1937 弄堂 3-track loop(汽笛 + 评弹 + synth pad) — **替换** v2 §334-343 的纯电子 pad | **替换** |
| `bgm_combat_duck` | 沿用 v2 战中 duck 机制,新增 *bass boost* 配合光下警告(玩家越暴露越紧张) | 调整 |
| `bgm_stealth_breath` | 玩家在暗中时,bgm 提一档"呼吸感"低频(让玩家听到"暗处是安全的") | 新增 |

> **核心**:v2 音频 = HM 的 synth;v3 音频 = HM synth + 1937 弄堂 + *光暗声景分层*。
> 这是评审 [本项目之前 critique] §7.2 指出的"v2 音频没做 1937" 的直接修复。

---

## 10. 评分系统(沿用 v2 阈值 + v3 加成)

| 等级 | 阈值(沿用 v2) | v3 加成 |
|------|----------------|---------|
| S | ≥ 90 | + `全拆灯`(每个房间所有可破坏灯 *在房间 clear 前* 被拆)= +5 分 |
| A | ≥ 75 | + `拆灯率 ≥ 50%` = +2 分 |
| B | ≥ 60 | + `拆灯率 ≥ 25%` = +1 分 |
| C | < 60 | 无加成 |

> *v3 加成让"拆灯流"是 *S-rank 必要条件*。其他流(BOSS 速杀 / 投掷流)最高 A。这是 v3 的隐性引导。*

---

## 11. 决策点(本次合并,需在 M1.0 spike 期间定稿)

| # | 决策点 | 默认 | 备选 | 决定者 |
|---|--------|------|------|--------|
| D1 | `BREAKABLE_LIGHT_HP` | 2(默认) | 3(硬灯,如印刷间) | agent-engine.1 |
| D2 | `LIGHT_SHIELD_THRESHOLD` | 0.30 | 0.20 / 0.40 | agent-qa(playtest 调) |
| D3 | `LIGHT_EXPOSED_THRESHOLD` | 0.10 | 0.05 / 0.15 | agent-qa |
| D4 | BOSS 自身是否发光 | 是(0.7u) | 否(沿用 v2 老路) | M1.0 spike 期间 playtest |
| D5 | RC 降级到 0 时是否 *禁用* lightSmash 机制 | 禁用 + "停电" 动画 | 始终启用 + 假装机制(无光则所有"灯"被视作"已拆") | agent-core.4 |
| D6 | `lampmaker` 闪灯动作的输入 | Shift + 朝灯 + 0.4s | Shift + LMB 双击 | agent-input(可访问性) |
| D7 | 投掷武器命中灯 = 直接扣 1 HP,还是按武器 `damage` 扣 | 按 `damage`(grenade=1,knife=0) | 全部统一 1 | agent-core.2 |
| D8 | 灯 *闪烁* (flicker) RC 强度的物理含义 | 12Hz,幅 0.4-0.6 | 8Hz,幅 0.3-0.7 | agent-engine.3 |

> **D1-D8 必须在 M1.0 spike 的 3 天内玩过 1 个完整房间** 才有意义。spike 不接受"还没玩就拍"。

---

## 12. 与 v2 设计 / 实现的兼容性表

| v2 项 | 状态 | 备注 |
|-------|------|------|
| F 切换近战/远程 | **保留**,硬直 0.15s → **0.0s** | C6 决策;切 mode 不应被拆灯窗口打断 |
| E 长按 0.25s 投掷 | **保留**,无变化 | v2-cut R16 |
| 1 击必杀(玩家/敌) | **保留**,但 *光下敌人* 改为 *不可击杀* | C1 决策的必然推论 |
| BOSS 3 击 | **保留**,+ "BOSS 自身有光" 选项(D4 待定) | |
| 8 件武器 | **保留**,语义加 §4 拆灯 | 不需重做武器表 |
| 6 个面具 | **保留 6 + 新增 3**(v3 §6) | 推进路径形成 |
| 2 任务(m1 + m4)| **保留**(GDD v3 V4;m2/m3 砍,素材并入 1/4)| |
| viewport | **改(GDD v3 V3)** | 像素锚定 1920×1080 / tile 48px / 相机容纳房间(TDD §0.1)|
| RC 6 阶段管线 | **保留** | + lightFieldCache(§7.2) |
| 调色板 v1.1 锁定 | **保留** | |
| dither 4×4 Bayer | **保留** | |
| 5/35 武器 / 25 面具铺量 | **保留路线**,但面具 v3 列表要按 §6 重排 | M2+ 扩展表需要更新 |
| 任务 4 隐藏(任务 1 通关解锁)| **保留**,S 必要条件 = 全拆灯(v3)| 隐藏是 *真* 隐藏 |

> **没有 v2 的设计被删除**。所有 v2 元素保留,只 *加层*。这是 v3 兼容性最强的合并方式。

---

## 13. M1.0 Spike 计划(3 天,合并规范验证)

> 这是 v3 整合的 *工程入口*。在 M1.1 之前必须有 3 天 spike,跑通"一间房 + 一个灯 + 一个敌人 + 拆灯 + 击杀"。
>
> **代码现状(B33)**:当前 app 为标题壳(stub Simulation / GameEngine),`player.ts` / `RcPipeline.ts` / `shaders/` 等在 `_archive-2026-08-09/`。spike 前须先重建**最小垂直切片**(1 房 / 玩家走位 / 油灯 / `flashlight_patrol` / 拆灯 / 击杀);可复用数学 / 数据从归档恢复。

| 日 | 任务 | 文件 | 验收 |
|----|------|------|------|
| Day 1 | 引入 `LightField` 接口 + `glReadPixels` 8×8 downsample;`isShielded` / `isExposed` 返回 mock 值 | `core/world/lightField.ts`(新) | unit test: 3 个 mock 位置,3 个返回值正确 |
| Day 1 | 给 `enemies.ts` 加 `flashlight_patrol` archetype(数据,行为 stub) | `core/data/enemies.ts` | TS 类型通过 |
| Day 2 | RC 管线追加 `uLightShieldThreshold` / `uLightExposedThreshold` uniforms;`final.frag` 把 `lightField.cache` 写入 | `engine/shaders/{rc,gi,final}.frag` | 浏览器开 dev server,`__rcPipeline.state()` 新字段可见 |
| Day 2 | 玩家 LMB 优先打灯:加 `aimTarget` 距离 ≤ 2.0u 判定;`lightSmash` 事件 emit | `core/simulation/player.ts` | 玩:进房,看到油灯,鼠标对灯按 LMB,灯变半碎 |
| Day 3 | `BREAKABLE_LIGHT_HP=2`,灯碎 → `invalidateLight` → 下一帧 RC 重算 → 敌人状态切换 | `core/simulation/damage.ts` + `engine/RcPipeline.ts` | 玩:拆灯后 0.1s 敌人可被 OHK;有白光闪 + sfx |
| Day 3 | 写 `docs/design/09-playtest-notes-m1.0.md`,记录 D1-D8 决策点实际值 | `docs/design/09-playtest-notes-m1.0.md`(新) | 决策表 8 行全部填完 |

> **3 天后 M1.1 继续**,但 *M1.1 必须引用* 本 spike 的 D1-D8 决策值。M1.1 的"TDD §4.4 默认数值表" 数字全部以 spike 实际玩出的为准。
>
> **进度(2026-08-09)**:Day 1 ✅ —— `core/world/lightField.ts`(纯 cache,零平台)+ `flashlight_patrol` archetype 数据已落码,`tsc` 0 error,lightField mock check **3/3 PASS**(`node --experimental-strip-types scripts/lightfield-check.ts`)。Day 2 起先重建**最小垂直切片**(标题壳 → 可玩单房间),再从归档恢复可复用数学 / 数据。

---

## 14. 风险登记(v3 新增,沿用 v2 §12 风险表的 增量)

| # | 风险 | 概率 | 影响 | 对策 |
|---|------|------|------|------|
| R-V3-1 | RC 降级到 cascade=0 时,玩家"拆灯"成了 *不可见* 行为(灯池没了)— 玩家困惑 | M | M | §7.3 硬底 + 0.3s 停电动画 + HUD 提示 |
| R-V3-2 | 玩家在 *光下* 死亡时,RC 的闪烁导致死亡判定抖动(光池边缘进出导致"假死") | L | M | `playerKilled` 事件 *冻结* 当前 `isExposed` 值 0.5s,避免边缘抖动 |
| R-V3-3 | `lampmaker` 闪灯被滥用(长按 = 强制把所有灯闪烁)— 破坏房间策略 | M | L | 闪灯有 4s 单房间 cooldown |
| R-V3-4 | `fortuneteller` 假灯被玩家 *识破* 后,游戏剩余时间 = 0.3s 全房间黑屏太长 | M | M | 0.3s 改 0.15s;若玩家已拆 ≥ 2 个真灯,触发时间可缩短 |
| R-V3-5 | `glReadPixels` 8×8 downsample 在 4K 屏上精度不够 — 玩家 *在光下* 但 `sampleAt` 错判为暗中 | L | H | downsample 升 16×16;但要降级时回 8×8;预算加 0.3ms |
| R-V3-6 | BOSS 自身发光 + BOSS 周围 3 个静态灯 → 玩家必须有 *6 个拆灯动作* 才能打到 BOSS,节奏拖沓 | H | H | D4 决策:BOSS 自身 *不* 发光(沿用 v2 老路),B 方案 5 个静态灯 — playtest 决定 |
| R-V3-7 | 整合的 3 个新面具在 M2 才做,可能导致 M1/M2 教学曲线断层 | M | M | M1.6 spike 加 *`lampmaker` 提前到 M1* 作为 M1.6 acceptance 一部分 |

---

## 15. 文件变更清单(本规范定稿后必做)

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `GDD.md` §1 高概念 | 改 | 加 "光暗反制" 4 字到一句话 |
| `GDD.md` §4.1 操作 | 改 | LMB 优先打灯;新增 Shift AimFocus 描述 |
| `GDD.md` §4.4 面具 | 改 | 6 → 6+3 = 9(加 lampmaker/darkwatch/fortuneteller) |
| `GDD.md` §5 RC 章节 | 改 | 加 "RC = 机制护甲" 一段(本规范 §2 摘要) |
| `GDD.md` §7.1 任务清单 | 改 | 表 2 任务行(m1 + m4)加 v3 主题加层列(§8.2 内容) |
| `GDD.md`(新增)§12 光暗反制 | 加 | 复制本规范 §2 摘要 + 决策 C1-C8 |
| `TDD.md` §4.4.1 玩家 | 改 | 加 `LIGHT_SHIELD_THRESHOLD` / `LIGHT_EXPOSED_THRESHOLD` |
| `TDD.md` §4.4.4 敌人 | 改 | `ENEMY_VIEW_*` 改 `lightShielded 依赖`;`BOSS_HITS` 沿用 |
| `TDD.md`(新增)§4.4.9 光暗 | 加 | `BREAKABLE_LIGHT_HP=2` / `BREAKABLE_LIGHT_DAMAGE_MELEE=1` / `BREAKABLE_LIGHT_DAMAGE_THROW=1` / `LAMP_FLICKER_HZ=12` / `LAMP_FLICKER_AMP=0.4-0.6` / `LIGHT_POOL_DOWN_S=0.1` / `AIMFOCUS_PUSH_DIST=0.4` |
| `TDD.md` §4.4.3 面具 | 改 | 6 → 9;新增 3 个效果字段 |
| `TDD.md` §4.4.7 光源 | 改 | `oil_lamp` / `neon_sign` / `searchlight` 加 `breakable=true` / `hp=2`;`blood_splash` 沿用 |
| `TDD.md` §4.5.3 玩家模式 | 改 | F 切换硬直 0.15s → 0.0s(决策 C6) |
| `TDD.md` §4.5 状态转移 | 改 | 加 `attackBlocked` 事件(命中光下敌人) |
| `TDD.md`(新增)§4.6 敌人 INVULNERABLE | 加 | 状态机 + `lightShielded` 强制检查(§5 内容) |
| `TDD.md` §4.4.5 评分 | 改 | 加 S/A/B 全拆灯加成(§10) |
| `TDD.md` §3.5 性能预算 | 改 | 加 0.2ms `glReadPixels` 读;新总预算 9.7ms / 硬上限 15ms |
| `TDD.md` §3.6 降级 | 改 | cascade=0 时禁用 lightSmash + 停电动画(§7.3) |
| `TDD.md` §15 RC 管线 | 改 | 追加 2 个 uniform + 1 个 CPU-side cache(§7) |
| `TDD.md` §14.2 agent-engine.1 | 改 | M1 子任务加 "lightField.ts" |
| `MVP-PLAN.md` §总览 | 改 | M1 改 "M1.0 spike 3 天 + M1.1 主线 4 天" |
| `MVP-PLAN.md` §M1 子批次 | 改 | 插入 M1.0(本规范 §13 内容) |
| `MVP-PLAN.md` §M1 验收 | 改 | 加 "玩家可拆灯 + 灯灭后 0.1s 敌人可被 OHK" |
| `BUGS.md` B29 | 改 | status: DESIGN → ADOPTED(本规范 = 实现) |
| `BUGS.md` 新增 B34-B39 | 加 | 把 §1 决策 C1-C8 + §14 R-V3-1..7 登记为待 M1.0 spike 验证的项 |
| `docs/design/06-blindside-lessons.md` | 改 | §4 提案部分改 "ADOPTED → 见 09-§3" |
| `docs/design/02-art-direction.md` §4.1 | 改 | 加 "lamp_break 火花 + 玻璃" 描述 + "flicker 灯 12Hz 抖动" |
| `docs/design/03-audio-direction.md` §v3 | 改 | 加 §9 全部新增 / 调整 sfx |
| `docs/design/04-radiance-cascades-pipeline.md` | 改 | 追加 §V3 lightFieldCache 章节 |
| `docs/design/07-sprite-gen-tasks.md` | 改 | 加 "lamp_half_broken / lamp_broken / shield_block_particle / flicker_lamp" 4 张 sprite 需求 |

> 完整 25 项,见 `docs/design/09-blindside-integration.md` §15(本文件)。
> M1.0 spike 完成后,本表的"待 spike 验证"标记 = ✓ 实际值;之后由 agent-qa 统一 commit。

---

## 16. 引用与可追溯性

| 引用 | 引用源 |
|------|--------|
| BLINDSIDE "光下无敌" 核心机制 | devlog: Frank "『如果敌人就是在光照中杀不死的话』"(详见 [README.md §5.1](../../../learning/blindside/README.md)) |
| BLINDSIDE FlashlightPatrol 敌人 | 06 §2 enemies 列表(基于 `data.br` 资源考古) |
| BLINDSIDE 7 项 B29 提案 | 06 §4.2 |
| BLINDSIDE TDD-DRAFT | [VIBECODING-BOOTSTRAP.md Part 3](../../../learning/blindside/VIBECODING-BOOTSTRAP.md) |
| HS v2 设计 | [GDD.md](../GDD.md) v2 + [TDD.md](../TDD.md) v2 |
| HS B33 重置 | [BUGS.md B33](../BUGS.md)(2026-08-09 整体移除) |
| HS 此前的 design critique | 2026-08-09 项目内 critique(用户主导) |
| HM 真机 32 张 | `references/hotline-miami-screenshots/` |

---

## 17. 签核

| 角色 | 签核项 | 状态 |
|------|--------|------|
| agent-qa | D1-D8 全部有 spike 实证数据 | 待 M1.0 spike 完成后 |
| agent-core.4 | Simulation 接受 `LightField` 注入 | M1.0 spike |
| agent-engine.1-4 | RC 管线追加 uniforms + cache | M1.0 spike |
| agent-ui | ThrowArc / ReloadIndicator / AimFocus HUD | M1.1 起 |
| Mavis(用户) | 决策 C1-C8 全部接受 / 调 1-2 个 | **本次合并前**已隐式接受(C1-C8 由 v3 提案 = 用户指示) |
| Mavis(用户) | D1-D8 默认值 | **待 M1.0 spike 完成后**复审 |

---

**整理人**:Mavis(设计层)
**整理日期**:2026-08-09
**版本**:v3(2026-08-09 定稿,基于 GDD v2 + TDD v2 + B33 重置 + blindside 评审 + 用户 design critique)
**溯源**:所有引用均来自 `learning/blindside/`、`docs/` 既有文件、`BUGS.md` 历次修复记录,无外推
