# 08 — Sprite Spec(角色精灵规格契约,v1.2)

> 设计层权威文件之一。从 `05-character-design.md §5.1` 抽出"格式契约",叠加 v1.2 zone palette 与 mask 替换规则。
> **本文档是 5 号文档的"规格伴侣"**:05 给视觉身份(谁长什么样),08 给技术契约(怎么编码 / 怎么渲染 / 怎么加新角色)。
> **权威源**:`src/core/data/sprites.ts`(数据层已冻结)+ `docs/design/02-art-direction.md v1.2`(zone palette)+ `docs/design/05-character-design.md`(视觉身份)+ `TDD.md v3.2 §4.4.8`(zone 契约)。
> **状态**:v1.2 写入(2026-08-09);数据层已实现 5 角色,渲染层 `PixelRenderer.ts` 待实现(见 §6)。

---

## 0. 关键事实(读前必看)

1. **数据已冻结,渲染待实现**:`sprites.ts` 12.9KB,5 角色全部画完(玩家/soldier/policeman/spy/boss)+ flashlight_patrol 占位;`PixelRenderer.ts` 还没写(本 spec §6 给契约,等实现期按本节写)。
2. **8 方向 ≠ 8 张独立 sprite**:**v1 用 Canvas `rotate(facingAngle)` 整体旋转 1 张基图**(顶视角对称 + 朝向跟随);**M4.6/M5 才出真正的 8 方向独立帧**(`07-sprite-gen-tasks.md` 范围)。所以 M1 范围内每角色只需要 ~9 帧,不是 48 帧。
3. **程序化派生**:`strideFrame(base, ±1)` + `lungeFrame(base)` 两个函数从 idle/walk B 派生步幅和突刺帧,作者只画 2 帧(base + walk B)就能拿到 4 walk + 2 attack 帧 = 6 帧。
4. **zone 染色不在数据层**:v1.2 起 sprite 颜色是"基色",实际渲染时根据 room.zone 调 `ZONE_PALETTES[zone]` 染色(见 §5)。
5. **面具色替换走渲染层**:玩家蒙面 `w` 像素的运行时替换,不重画帧数据(见 §4)。

---

## 1. 数据格式(`PixelSprite`)

### 1.1 TS 类型(冻结,与 `sprites.ts` 一致)

```ts
export interface PixelSprite {
  rows: string[];            // 16 行,每行 16 字符
  palette: Record<string, string>;  // 字符 → '#rrggbb'
}
```

### 1.2 16×16 grid 硬规则

- **行数固定 16**,**列数固定 16**
- 每行必须 16 字符(短了/长了都报错,渲染层不补)
- **`.` = 透明**(不画,不参与 outline 检测)
- 任何非 `.` 字符 = 一个像素块
- **透明 = 0 像素 + 0 描边**;不能留"半透明"概念

### 1.3 字符 → 颜色(palette encoding)

**单字符 = 单 hex**,调色板是 `Record<单字符, hex>` 形式。

| 编码约定 | 含义 | 例 |
|---------|------|---|
| **小写 = 主色 / 中间档** | 该角色最常用的"基底"色 | `k` = 玩家风衣 PAL_INK #0a0910 |
| **大写 = 亮档** | 同色系亮 1-2 档 | `K` = 玩家风衣亮档 #2e2c3a |
| **第二个字母 = 暗档** | 同色系暗 1-2 档 | `d` = 玩家风衣暗档 #1a1820 |
| **辅字母 = 配件** | 围巾/徽记/手套等 | `r` = 玩家围巾 #e54a1a / `g` = 金徽 #e8dca0 |

**每角色 palette 必须 ≤ 8 个字符**(避免视觉割裂,>8 表示角色该拆成多 sprite)。

### 1.4 字符映射表(跨角色通用字母)

| 字符 | 通用含义 | hex(基色,可被 zone 染色) |
|------|---------|------------------------|
| `.` | 透明 | — |
| `k` / `K` / `d` | 黑色 3 档(玩家/敌人通用) | #0a0910 / #2e2c3a / #1a1820 |
| `c` / `C` | 钢灰 2 档(玩家帽 / 敌人钢盔) | #4a4a52 / #6a6a72 |
| `w` / `W` | 米色 2 档(玩家蒙面 / 亮米) | #f5e6b8 / #fff5d0 |
| `r` / `R` | 灯笼红 2 档(玩家围巾 / 亮红) | #e54a1a / #ff6a3a |
| `f` / `F` | 肤色 2 档 | #c8a88a / #e8c8aa |
| `g` / `G` | 金 2 档(徽记 / BOSS 边) | #e8dca0 / #fff5b0 |
| `a` / `A` | 血/袖章红 2 档 | #d8201a / #ff3a3a |
| `b` / `B` | 锈铁 / 警棍 | #7a2a1c / #9a4a3c |
| `h` / `H` | 军绿 2 档(钢盔) | #5a6352 / #7c8a6a |
| `u` / `U` | 墨蓝 2 档(伪警) | #2a2f3a / #4a5268 |
| `v` | 暗墨蓝 1 档(伪警暗) | #181c26 |
| `m` / `M` / `t` | 米色风衣 3 档(特务) | #c8b898 / #f5e6b8 / #8a7c66 |
| `o` / `O` / `n` | BOSS 大衣 3 档 | #1e1c24 / #3a3646 / #0a0910 |

> **新角色加新字母前先查表**,能复用就复用(保证视觉一致性)。需要新色时,在表末尾追加 1 行,加 changelog。

### 1.5 16 行语义分区(冻结)

```
行 0 ............  (空 / 顶 margin)
行 1 ......████..  (头顶 / 帽顶)
行 2 .....█████..  (帽中)
行 3 ....██wwww█.  (帽底 + 脸上沿)
行 4 ....█wwwwww█  (面中 / 眼位)
行 5 ....█wwwwww█  (面下沿 / 下巴)
行 6 ....████████  (肩部上沿)
行 7 .....██████.  (肩部中)
行 8 ....████████  (胸口上)
行 9 ....█rr██rr█  (胸口中,配件行:围巾/徽记/领带)
行 10 ....██████.  (腰)
行 11 ....████████  (臀)
行 12 ....████████  (腿上)
行 13 ....dddddddd  (脚 / 暗档 = 接触地面)
行 14 ............  (空 / 底 margin)
行 15 ............  (空)
```

- **行 0 / 14 / 15** 必须 `.` 透明(留出 padding,outline 不被裁)
- **行 13 暗档** 用来表示"接触地面的脚",即便站着也要画
- **行 9** 是配件行(围巾 / 领带 / 袖章),**亮度 ≥ 3 档** 对比(亮色锚点规则,见 05 §1)
- **行 4-5** 是面中部,**至少 4 像素亮色**(玩家蒙面 / 敌人脸 / BOSS 脸)

---

## 2. 帧定义(`SpriteFrames`)

### 2.1 4 状态动画(冻结)

```ts
export interface SpriteFrames {
  idle: PixelSprite[];      // 1 帧
  walk: PixelSprite[];      // 4 帧(2 帧 + 2 程序派生)
  attack: PixelSprite[];    // 2 帧(1 帧 + 1 程序派生)
  death: PixelSprite[];     // 1 帧
}
```

### 2.2 walk 帧 4 帧来源(冻结)

| 帧 | 来源 | 视觉 |
|----|------|------|
| walk[0] | `IDLE` 基图 | 左脚前 |
| walk[1] | `WALK_B`(作者手画) | 肩部右移 1px + 围巾尾右摆 1px |
| walk[2] | `strideFrame(WALK_B, 1)` | walk[1] 的腿部右移 1px |
| walk[3] | `strideFrame(WALK_B, -1)` | walk[1] 的腿部左移 1px |

**作者实际只画 2 帧**(IDLE + WALK_B),程序派生后 2 帧。**不要手画 4 帧**,会失同步。

### 2.3 attack 帧 2 帧来源(冻结)

| 帧 | 来源 | 视觉 |
|----|------|------|
| attack[0] | `IDLE` 基图 | 蓄力 |
| attack[1] | `lungeFrame(IDLE)` | 躯干前移 1px + 腿部后错 1px(突刺) |

> 武器光弧 / 枪火 flash **由渲染层画**,**不入 sprite 数据**。见 05 §5.2 `drawCharacter` 契约。

### 2.4 death 帧(冻结)

- **作者手画 1 帧**:整体压扁到 0.5 高度(原 6-13 行 → 10-13 行)+ 围巾散落 + 衣褶(原 d 档)
- 渲染层叠加 **opacity 0.6**(透明处理由渲染层做,不在 sprite 数据里)

### 2.5 帧率契约(冻结)

| 状态 | animFps | 备注 |
|------|---------|------|
| idle | 0(静止) | — |
| walk | **6** | 4 帧循环 = 0.67s/循环 |
| attack | **12** | 2 帧 = 0.17s,然后回到 idle(0.1s 缓冲) |
| death | 0(一次性) | 触发后 0.5s 不透明度 0.6 锁死 |

---

## 3. 方向契约(冻结,v1.2 确认)

### 3.1 v1-M3:**Canvas rotate 整体旋转**

```ts
// engine/sprites/PixelRenderer.ts(待实现)伪代码
function drawCharacter(ctx, def, state, facingAngle, x, y, pixelSize) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facingAngle);              // 弧度,0 = 上方(北)
  drawSprite(ctx, 0, 0, getFrame(def, state), pixelSize);
  drawOutline(ctx, 0, 0, getFrame(def, state), pixelSize, def.outlineColor);
  ctx.restore();
}
```

- `facingAngle` = 玩家面对鼠标 / 敌人面对目标方向,**0 = 北(上)**,顺时针
- sprite **对称** = 任何角度看起来都自然(参考 HM 玩家)
- 旋转 45° 整数倍 = 8 方向自然对齐
- **代价**:非 8 方向(斜向 22.5°)边缘会有锯齿,**v1 接受**

### 3.2 v1.2 决定:**M1 范围坚持旋转方案**,不上 8 帧

理由:
- 8 帧 × 5 角色 = 40 帧 = 30+ 小时手工活
- 旋转方案在 8 方向 45° 倍数下表现合格
- 09-blindside-integration 没要求 8 帧
- **M4.6 / M5 升级**(`07-sprite-gen-tasks.md §2.5` 范围,届时用 image_synthesize + 人工校准)

### 3.3 旋转锚点(冻结)

- `def.anchor = { x: 8, y: 8 }` = 几何中心
- 16×16 sprite 中心 = (8, 8) = 第 7-8 行 / 第 7-8 列交点
- 旋转 + 平移都用 (8, 8) 作原点 = 玩家移动时身体不抖

---

## 4. 面具蒙面 `w` 像素替换(冻结,v1.2 确认)

### 4.1 替换规则

- 玩家蒙面 `w` 像素 = **"面具色"占位符**
- 渲染时查 `MASKS[activeMaskId].themeColor` 替换所有 `w` 像素
- **其他字符**(`k` 风衣 / `r` 围巾 / `d` 褶皱)**不动**
- 替换是**运行时**,不重画 sprite 数据

### 4.2 9 面具主题色(冻结,TDD v3.1 §4.4.3)

| 面具 ID | themeColor | 视觉 |
|---------|-----------|------|
| `actor` 戏子 | `#e54a1a` 红 | 红脸谱纹(1px 白线,由渲染层画) |
| `runner` 帮工 | `#2a9a6a` 翡翠 | 绿蒙面 |
| `righteous` 蒙面义士 | `#f5e6b8` 米 | 白蒙面(默认同玩家) |
| `dancer` 舞女 | `#9c2c9c` 紫 | 紫蒙面 + 腮红 2px |
| `waiter` 茶馆跑堂 | `#b8967a` 茶褐 | 茶褐蒙面 |
| `officer` 军爷 | `#4a4a52` 钢灰 | 灰蒙面 + 帽徽 1px 金 |
| `lampmaker` 灯匠 🆕 | `#c8a430` 黄铜 | 黄铜蒙面(灯具师感) |
| `darkwatch` 暗哨 🆕 | `#1a2a2a` 暗青 | 暗青蒙面(夜视感) |
| `fortuneteller` 算命先生 🆕 | `#5a2a8a` 紫黑 | 紫黑蒙面(神秘感) |

> 🆕 = TDD v3.1 BLINDSIDE 新增;themeColor 待 `core/data/masks.ts` 实现时写入。
> **v1 锁 6 个**(actor/runner/righteous/dancer/waiter/officer),后 3 个 = M1.0 spike 之后。

### 4.3 替换实现(渲染层契约)

```ts
// engine/sprites/PixelRenderer.ts(待实现)伪代码
function drawSpriteWithMask(ctx, sprite, maskColor, x, y, pixelSize) {
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const ch = sprite.rows[row][col];
      if (ch === '.') continue;
      let color = sprite.palette[ch];
      if (ch === 'w') color = maskColor;     // ← 唯一替换点
      ctx.fillStyle = color;
      ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
    }
  }
}
```

---

## 5. Zone 染色(v1.2 新增,02 §3.1 锁定)

> 这是 v1.2 起 sprite 颜色**不是最终颜色**的根本原因。**数据层颜色 = 基色**,实际渲染 = `基色 × zone 染色`。

### 5.1 染色模型(契约)

```
final_pixel = mix(sprite.palette[c], ZONE_PALETTES[zone].ambient, ambient_t)
             + ZONE_PALETTES[zone].primary * primary_t
             + ZONE_PALETTES[zone].secondary * secondary_t
```

- `ambient_t` = 该像素在 cascade ambient 区的比例(0-1,RC 计算)
- `primary_t` / `secondary_t` = 该像素到主光/辅光 cascade 中心的距离衰减

**实现**:
- v1.2 起 sprite **不预染色**
- 渲染层每帧从 RC pipeline 读 `LightField`(v3.1 已有)+ zone palette,做 ad-hoc tint
- **不写新数据**,只改渲染层

### 5.2 4 zone 染色方向(v1.2 锁定,TDD §4.4.8)

| Zone | ambient tint | primary rim | secondary rim | 视觉特征 |
|------|-------------|-------------|--------------|---------|
| `bund` 外滩 | 暖紫 | 品红 | 青 | 蒸汽波 HM,角色被环境"染" |
| `concession` 法租界 | 暗青 | 琥珀 | 雨青 | 雨夜,角色在湿光下 |
| `lilong` 弄堂 | 漆黑 | 灯笼红 | — | **几乎全黑,只有 1 盏灯区域有 tint** |
| `creek` 苏州河 | 暗墨绿 | 病态黄 | — | 雾,角色在黄绿光圈里 |

### 5.3 染色对 M1 范围的影响(M1 = lilong)

- M1 房间 zone = `lilong` = 漆黑 + 1 cascade
- sprite 基色 **基本不可见**(被 ambient #050408 吞掉)
- 只有灯笼 5u 半径内像素有 tint
- 玩家围巾 `r` 灯笼红 = **唯一亮色锚点**(连冷描边都被吃)
- **设计含义**:M1 美术验证 = 灯笼光圈里能不能看清玩家,光圈外是否完全融入漆黑

### 5.4 染色不改 sprite 数据

- `sprites.ts` **不存 zone-aware 颜色**
- 渲染层 `applyZoneTint(baseColor, zone, lightField)` 是个纯函数
- 添加新 zone = 改 `ZONE_PALETTES` 表 + 渲染层,不动 sprite 数据

---

## 6. 渲染层契约(待实现,API 冻结)

> ⚠️ `engine/sprites/PixelRenderer.ts` 当前**未实现**(05 §5.2 引用为"现有",但 `src/engine/sprites/` 目录不存在)。本节是**待实现的 API 契约**,实现期必须严格按本节。

### 6.1 公共 API

```ts
// engine/sprites/PixelRenderer.ts
export function drawSprite(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  sprite: PixelSprite,
  pixelSize: number
): void;

export function drawSpriteRotated(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  sprite: PixelSprite,
  pixelSize: number,
  angleRad: number,
  anchor: { x: number; y: number } = { x: 8, y: 8 }
): void;

export function drawOutline(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  sprite: PixelSprite,
  pixelSize: number,
  colorHex: string
): void;  // 外圈 1px,围绕所有非 `.` 像素

export function drawCharacter(
  ctx: CanvasRenderingContext2D,
  def: CharacterDef,
  state: 'idle' | 'walk' | 'attack' | 'death',
  facingAngle: number,    // 弧度,0 = 北
  x: number, y: number,
  pixelSize: number,
  opts?: {
    maskColor?: string;   // 面具色,传了就替换 `w`
    zone?: ZoneId;        // v1.2 染色(v1.1 忽略)
    lightField?: LightField;  // v1.2 染色用(v1.1 忽略)
  }
): void;
```

### 6.2 性能契约(冻结,TDD §3.5)

| 操作 | 预算 | 备注 |
|------|------|------|
| `drawSprite` | ≤ 0.01ms | 256 fillRect 块 |
| `drawOutline` | ≤ 0.02ms | 边界检测 + 描边 fillRect |
| `drawCharacter`(含旋转+描边) | ≤ 0.05ms | M1 预算 1ms 渲染 = 20 个角色 |
| 同屏角色数 | ≤ 30 | 走 batch fillRect,不分单个 ctx state |

### 6.3 旋转 + 描边 + 染色的叠加顺序(冻结)

```
1. ctx.save()
2. ctx.translate(x, y)
3. ctx.rotate(facingAngle)
4. ctx.translate(-anchor.x * pixelSize, -anchor.y * pixelSize)
5. 调 drawSpriteWithMask(替换 w 像素 + 应用 zone tint)
6. 调 drawOutline(1px 描边,outlineColor)
7. ctx.restore()
```

> **绝对顺序**:translate → rotate → translate(-anchor) → sprite → outline。这样 outline 跟着旋转,不会出现"描边不转"的视觉 bug。

### 6.4 Zone tint 实现位置(契约)

```ts
// 在 drawCharacter 的第 5 步里调用
function applyZoneTint(baseHex: string, zone: ZoneId, lightField: LightField, worldX: number, worldY: number): string {
  // 1. 读 lightField.sampleAt(worldX, worldY) → 0..1
  // 2. 读 ZONE_PALETTES[zone] → primary/secondary/ambient
  // 3. 调 color-mix 函数(HSL / LAB / 简单线性,实现期选)
  // 4. 返回 tint 后 hex
}
```

**v1.1 不实现 tint**(只传 `maskColor`,`zone` 忽略);**v1.2 起必实现**。

---

## 7. 如何加一个新角色(checklist)

按这 7 步,5 分钟加完一个 placeholder,30 分钟加完一个完整角色:

### Step 1: 选 archetype 骨架

- 5 个 archetype 已有:**player / soldier / policeman / spy / boss**
- 新角色 = 复用其中一个骨架 + 换 palette + 改帽/徽记
- 例:`nco` 军士长 = 复用 `soldier` 骨架,加帽徽 + 改袖章
- 例:`worker` 苦力 = 复用 `player` 骨架,去掉蒙面 + 加汗巾

### Step 2: 写 palette

- 查 §1.4 字符映射表,挑 5-7 个字母
- 不能复用现有字母?追加到 §1.4 表末尾,加 changelog

### Step 3: 画 IDLE 帧(16 行)

按 §1.5 语义分区:
- 行 1-2: 帽
- 行 3-5: 脸(亮色 ≥ 4 像素)
- 行 6-9: 身体 + 配件
- 行 10-12: 腿
- 行 13: 脚(暗档)

### Step 4: 画 WALK_B 帧

- 在 IDLE 基础上:
  - 行 6-9 整体右移 1px
  - 围巾/领带尾右摆 1px
  - 脚(行 13)不动
- 步幅帧 walk[2]/[3] 自动程序派生

### Step 5: 画 DEATH 帧

- 把 IDLE 行 6-13 压扁到行 10-13
- 配件散落到行 11-12

### Step 6: 写注册表条目

```ts
// core/data/sprites.ts
const NEWCHAR_IDLE: PixelSprite = { rows: [...], palette: NEWCHAR_PALETTE };
const NEWCHAR_WALK_B: PixelSprite = { rows: [...], palette: NEWCHAR_PALETTE };
const NEWCHAR_DEATH: PixelSprite = { rows: [...], palette: NEWCHAR_PALETTE };

// 注册到 CHARACTERS
CHARACTERS.newchar = {
  id: 'newchar',
  nameZh: '新角色',
  frames: {
    idle: [NEWCHAR_IDLE],
    walk: [NEWCHAR_IDLE, NEWCHAR_WALK_B, strideFrame(NEWCHAR_WALK_B, 1), strideFrame(NEWCHAR_WALK_B, -1)],
    attack: [NEWCHAR_IDLE, lungeFrame(NEWCHAR_IDLE)],
    death: [NEWCHAR_DEATH],
  },
  outlineColor: '#ffb066',  // 暖橙 = 敌人
  anchor: { x: 8, y: 8 },
  animFps: 6,
};
```

### Step 7: 加 EnemyArchetype 类型(TDD §4.4.4 同步)

- 改 `core/types.ts` 的 `EnemyArchetype` union 加新值
- 这是**契约改动**,要走 `[TDD-CONTRACT-CHANGE]`,在 TDD §0.2 加覆盖行

---

## 8. 验收 checklist(新角色加完后跑一遍)

- [ ] 16 行 × 16 字符 = 256 字符,行数 16
- [ ] palette ≤ 8 个字符
- [ ] 行 0 / 14 / 15 = 全 `.`
- [ ] 行 13 = 暗档(脚),非空
- [ ] 行 9 配件 ≥ 3 档对比
- [ ] 行 4-5 亮色锚点 ≥ 4 像素
- [ ] IDLE 与 WALK_B 仅在行 6-9 差 1px
- [ ] DEATH 高度 ≤ IDLE 0.5
- [ ] outlineColor = 玩家冷青 / 敌人暖橙 / BOSS 警示红(三选一)
- [ ] 旋转后(任意 45° 倍数)轮廓无空洞
- [ ] 在 lilong zone 灯笼 5u 内能看清;外完全融入黑(zone tint 验证)
- [ ] 面具色替换正确(`w` 像素运行时变,其他字符不变)
- [ ] walk 4 帧循环 = 0.67s @ 6 fps,无明显跳变
- [ ] attack 2 帧 = 0.17s @ 12 fps,突刺后回 idle 无残留

---

## 9. 跨文档引用(必读)

- **`05-character-design.md`** — 视觉身份(谁长什么样)+ 5 角色详细规格(本文档引用,不重复)
- **`02-art-direction.md v1.2 §3.1`** — Zone palette 16 个 hex 与 4 zone 详细规范
- **`TDD.md v3.2 §4.4.8`** — ZonePalette 类型 + `ZONE_PALETTES` 常量契约
- **`TDD.md v3.1 §4.6`** — LightField 接口(zone tint 实现的输入)
- **`07-sprite-gen-tasks.md`** — 8 方向独立帧 / 12 家具 / 3 特效的 image_gen 任务(M4.6+)
- **`src/core/data/sprites.ts`** — 数据层唯一真相源(本文档反向引用,实施时改这里)
- **`src/engine/sprites/PixelRenderer.ts`** — 渲染层(待实现,本文档 §6 是契约)

---

## 10. Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-08-08 | 初版,基本格式契约(15 段,基于 05 §5.1 + 02 v1.1) |
| v1.1 | 2026-08-08 | 描边 / 旋转 / 4 状态帧定义 |
| v1.2 | 2026-08-09 | ① §3.1-3.2 明确 8 方向 = 旋转 + M4.6 才上 8 帧;② §4 面具色替换规则;③ §5 zone 染色契约;④ §6.3 旋转+描边+染色叠加顺序;⑤ §7-8 加新角色 checklist + 验收 checklist;⑥ §10 标 PixelRenderer.ts 待实现 |
