# 14 — 数据表新增 / 变更 SOP

> **本文档 = 8 张数据表新增 / 变更的标准操作**。
> 数据表集中在 [`src/core/data/`](../../src/core/data/):`enemies.ts` / `lights.ts` / `masks.ts` / `missions.ts` / `palette.ts` / `sfx.ts` / `sprites.ts` / `weapons.ts`。
> 数值主权威 = [`TDD.md`](../../TDD.md) §4.4 系列 + §4.6 系列。
> 与本文档冲突 = bug,改本文件 = `[DESIGN-LAYER-CHANGE]`。

## 1. 8 张数据表清单

| # | 表 | 文件 | 主权威 | 行数 / 字段 |
|---|----|------|--------|------------|
| 1 | 调色板 | `core/data/palette.ts` | TDD v4 §4 | 12 PAL_* |
| 2 | 武器 | `core/data/weapons.ts` | TDD v4 §4(WEAPON_TABLE) | 8 WEAPON_TABLE |
| 3 | 面具 | `core/data/masks.ts` | TDD v4 §4(MASK_TABLE) | 6→9 MASK_TABLE |
| 4 | 敌人 | `core/data/enemies.ts` | TDD v4 §4(ENEMY_ARCHETYPES) | 5 ENEMY_ARCHETYPES(含 flashlight_patrol) |
| 5 | 光源 | `core/data/lights.ts` | TDD v4 §4(RC_LIGHT_TABLE) | 8 RC_LIGHT_TABLE |
| 6 | 任务 / 房间 | `core/data/missions.ts` | TDD v4 §4(MISSIONS) | 当前 1 mission / 1 connected tower-compound room |
| 7 | 音效 | `core/data/sfx.ts` | 03-audio-direction | 18 + 4 = 22 SFX_RECIPE |
| 8 | sprite | `core/data/sprites.ts` | TDD v4 §4 + 05-character | 6 角色 PixelSprite × 4 态 |

## 2. 通用 SOP(每张表新增 / 变更都过)

### 2.1 新增 1 条(以武器为例)

- [ ] **1. 数值定档**:从 [`TDD.md`](../../TDD.md) §4.4.1 / §4.6 找该字段约束,定 5 个数字
  - 例:加 `shovel`(工兵铲),damage / fireRate / reloadTime / range / spread
- [ ] **2. 写表**:在 `core/data/weapons.ts` 的 `WEAPON_TABLE` 加 1 条
  - 必须含全部 8 个字段(id / nameZh / nameEn / type / damage / ammo / fireRate / reloadTime / range / spread / projectileSpeed 选填)
- [ ] **3. 同步 TDD**:`TDD.md` §4.4.1 武器表 +1 行(走 [`11-contract-change-procedure.md`](11-contract-change-procedure.md))
- [ ] **4. 同步 GDD**(必要时):GDD §6.1 武器叙事
- [ ] **5. 同步 docs/design/05**:`05-character-design.md` 若涉及 sprite
- [ ] **6. 同步 docs/design/03**:若新增的武器有专属音效
- [ ] **7. 跑 `npx tsc -b --noEmit`**:类型必须 0 error
- [ ] **8. 跑 `npm run e2e:playtest`**:当前哨塔大院浏览器契约全绿
- [ ] **9. 跑 `node scripts/visual-check.mjs`**:截图无 console error
- [ ] **10. commit**:message 标 `+shovel weapon (TDD v4 §4(WEAPON_TABLE) +shovel)` + 同步文档清单

### 2.2 改 1 个字段

- [ ] **1. 找原值**:`grep <field>` 在 `core/data/<table>.ts` + TDD 同步段
- [ ] **2. 改代码 + TDD + GDD + docs/design**(任一处)
- [ ] **3. 跑回归**:tsc + playtest + visual-check
- [ ] **4. commit**:message 标"`<field>: <old> → <new> (reason)`"

### 2.3 删 1 条

- [ ] **1. grep 调用点**:`rg "<id>" src/ docs/`
- [ ] **2. 删代码 + TDD + GDD + docs/design**(任一处)
- [ ] **3. 跑回归**
- [ ] **4. commit**:message 标`-<id> (reason)` + 引用 call site 列表

## 3. 8 张表特定 SOP

### 3.1 调色板 `palette.ts`(TDD v4 §4)

- **新 PAL_X**:必须 12 色之外吗?→ 先考虑复用,实在不行才加
- **同步 TDD v4 §4 表**
- **同步 `02-art-direction.md` §4.1** 四行色板
- **同步 `sprites.ts` 角色配色 / `lights.ts` 灯色**
- **同步 references/palette-12-v3.png**(M2+ 截图对照图)

### 3.2 武器 `weapons.ts`(TDD v4 §4(WEAPON_TABLE))

- 新武器必须 OHK(damage = 1,一击必杀是 HM DNA)
- 平衡检查:`fireRate × ammo` 决定 DPM(damage per minute)
  - knife DPM = 5 × ∞ = ∞
  - bat DPM = 1.5 × ∞ = ∞
  - 远程 DPM = fireRate × 60 × 1(每发 1 击)
- 必须含 type: `'melee' | 'ranged' | 'throw'`
- 远程必须含 `projectileSpeed`,否则 GameEngine 取默认值 60

### 3.3 面具 `masks.ts`(TDD v4 §4(MASK_TABLE) + 09 §6)

- 9 个 mask 包含 6 v1 + 3 v3.1(`lampmaker` / `darkwatch` / `fortuneteller`)
- 每 mask 必须有 `themeColor`(蒙面替换色,与 `05 §3` 一致)
- `effect.kind` 走 `MaskSpec` 联合类型(不能随意加 kind;需走 `11-contract-change`)
- `lampmaker` 闪灯/按灯是 M1.6 提前 ship(机制验证面具)

### 3.4 敌人 `enemies.ts`(TDD v4 §4(ENEMY_ARCHETYPES))

- 5 个 archetype:soldier / policeman / spy / boss / **flashlight_patrol**(v3.1)
- `flashlight_patrol` 必有 `flashlightConeArcDeg` + `flashlightSweepHz`
- `invulnWhileLit` 是 v3.1 光下无敌开关（2026-08-15 已废弃，光不再是护甲）
- 数值平衡:`speedAlert × fireRate × hp` = 威胁指数;M1 spike 用默认

### 3.5 光源 `lights.ts`(TDD v4 §4(RC_LIGHT_TABLE))

- 8 类光源
- 装饰光(`oil_lamp` / `neon_sign` / `searchlight` / `surgical` / `disco`)的 `intensity × radius²` 决定房间亮度
- M1 房间使用中央 `oil_lamp` + `searchlight` 电源链；敌人视锥 emission 与玩家随身暖光是 visual-only
- B24 教训:删除假加法 `addLampGlow`;装饰灯必须走真 RC 发射

### 3.6 任务 / 房间 `missions.ts`(TDD v4 §4(MISSIONS))

- **唯一事实源 = `docs/levels/<room-id>.md` 蓝图**(08 §2 流程),TS 由蓝图合入
- M1 范围 = 1 个连接式 `m1_tower_compound`；3 ground patrols + 1 static tower guard；蓝图为 `docs/levels/m1_intro_scene.md`
- 房间必须含:`zone`(lilong / concession / creek) + `floorPalette` + `wallPattern` + `decorativeLights` + `playerSpawn` + `enemySpawns` + `weaponSpawns` + `maskSpawns` + `exitTile`
- 新增 1 房前先建 md 蓝图,过 `08` §4 校验清单,再合入 TS

### 3.7 音效 `sfx.ts`(03-audio-direction)

- 18 + 4 = 22 配方(18 v1 + 4 v3 1937 声景 = `harbor_whistle` / `street_cry` / `pipa_pluck` / `radio_static`)
- 配方必须含:`id` + `duration` + `attack` + `decay` + `sustain` + `release` + `volume` + `priority` + `oscillators`
- `priority` 数值参考 03 §5 列表,新音插入适当位置
- 噪声必须有 `filterType` + `filterFreq`(否则刺耳)

### 3.8 sprite `sprites.ts`(TDD v4 §4 + 05-character)

- 6 角色 × 4 态(idle / walk / attack / death)= 24 个 PixelSprite
- `walk 4 帧` + `lunge 1 帧` 程序化派生(从 base 1 帧)— B26 教训:不要靠 AI 生成多帧
- 16×16 网格不变
- 调色板 12 色硬约束(超出色 = 错误)
- `flashlight_patrol` 必须含"灯芯亮区"位置(07 §5)

## 4. 跨表变更(同时改多张)

| 场景 | 必改表 | 同步文档 |
|------|-------|---------|
| 加新面具 → 改 9 面具机制 | masks + missions(maskSpawns) + sfx(pickup_mask) | TDD v4 §4(MASK_TABLE) + 05 §3 + 03 |
| 加新武器 → 改 35 武器铺量 | weapons + missions(weaponSpawns) + sfx(fire_*) | TDD v4 §4(WEAPON_TABLE) + 05 + 03 |
| 加新敌人 archetype | enemies + missions(enemySpawns) + lights(`flashlight_patrol`)+ sfx(enemy 反馈) | TDD v4 §4(ENEMY_ARCHETYPES) + 09-§5 + 07 §5 |
| 加新房间 | missions + levels(md 蓝图)+ palette(zone)+ lights(decorativeLights) | TDD v4 §4(MISSIONS) + 08 + 02 §4 + 04 |
| 加新 RC 光源类型 | lights + enemies(archetype)+ palette | TDD v4 §4(RC_LIGHT_TABLE) + 04 + 02 |
| 改调色板 | palette + sprites + lights + missions(floorPalette) | TDD v4 §4 + 02 + 05 + 03 |

## 5. 验证门(每张表改完必跑)

- [ ] `npx tsc -b --noEmit` 0 error
- [ ] `npm run e2e:playtest` 当前维护套件 PASS
- [ ] `node scripts/visual-check.mjs` 0 console error + 截图 RC 状态正确
- [ ] `node scripts/<data>-check.mjs`(player / enemy / lightfield / rc-lab)对应类型
- [ ] docs/design/README.md §1-§4 表格更新(若新增表)

## 6. 提交模板

```
<type>(7_hotlineShanghai): <table> +/-<id> (reason)

- TDD v4 §3-§4.X: +<id>(字段 1=..., 字段 2=..., ...)
- 同步: [docs/design/05, docs/design/03](若适用)
- 同步: GDD §X.Y(若适用)
- 验证: tsc ✅ / e2e:playtest ✅ / visual-check ✅
- 关联: BUGS B<NN>(若相关)
```

## 7. 状态

| 项 | 状态 |
|----|------|
| 14 SOP 文档 | ✅ 2026-08-09 新建 |
| 8 张表 checklist | ✅ 本文档 §3 |
| 跨表变更场景 | ✅ 本文档 §4 |
| 提交模板 | ✅ 本文档 §6 |
| lint 自动化卡字段完整性 | 🕐 待加(目前靠人审 + 23-signoff) |
