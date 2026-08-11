# 02 — Art Direction(对照 Hotline Miami 真机截图重写)

> 设计层权威文件之一。GDD v1 §7 的细化和数值对账。
> **所有结论来自 8 张真机截图**(见 `references/hotline-miami-screenshots/`)和参考图(见 `docs/design/hotline-miami-reference-*.jpg/png`)。
> intro 运行时 PNG 是用户批准的窄例外：唯一清单为 `references/sprite-samples/approved-intro-assets.json`，唯一处理流程为 `scripts/process-intro-sprites.mjs`。actor/effect 为 64×64 cells(actor pivot `[32,54]`)，ground/brick 为 48×48 cells；不得扩展到 intro 之外。生成 prompts 与人工验收门见 [`24-sprite-image-gen-prompts.md`](24-sprite-image-gen-prompts.md)。

## 0.5 v1.1 决策锁定(2026-08-08,用户 review 通过)

| # | 决策点 | 锁定值 | 备选(否决) |
|---|--------|--------|------------|
| **D1** | HM-借鉴色饱和度 | **80% HM + 20% 上海**(当前 v2 调色板) | 拉回 30%(写实向,弃) |
| **D2** | 敌人密度 / 房间 | **2-5 敌**(RC 配合暗杀 + 强攻平衡) | 1-3 敌(纯潜行向,弃) |
| **D3** | viewport | **32u × 18u**(每 tile 60 像素) | 40u × 22u 远景弄堂感(弃) |
| **D4** | mask 流 | **HM 范式 = 任务 intro**(mask 立绘 + 任务预览 + 3-4s 进 play) | v1 独立"先 mask 选择再 brief"(弃) |

> 锁定后,这些值进入 TDD 冻结契约,改需走 `[TDD-CONTRACT-CHANGE]`。

## 0.6 v1.2 决策锁定(2026-08-09,多 zone 美术方向)

| # | 决策点 | 锁定值 | 备选(否决) | TDD 影响 |
|---|--------|--------|------------|---------|
| **D5** | 美术方向 | **民国蒸汽波 + 4 atmospheric zones** | 单 zone 蒸汽波(过窄)/写实 noir(脱节 HM) | 需 TDD v3.2 引入 `ZoneId`/`ZonePalette` |
| **D6** | Zone 数量 | **4 个**(外滩霓虹 / 法租界夜雨 / 弄堂灯笼 / 苏州河雾夜) | 2 个(简化) / 6+(重复) | 同上 |
| **D7** | Zone 切换粒度 | **per-room**(`RoomLayout.zone: ZoneId`) | per-mission(粒度粗)/ per-tile(无意义) | `RoomLayout` 加 `zone` 字段 |
| **D8** | BOSS 视觉等级 | **完全不同的视觉类目**(文职情报官 vs 军装军官) | 军装大一号(差异弱) | §4.1 BOSS 行重写 |

> D5-D8 涉及 TDD §4.4.8 调色板 + §5.1 RoomLayout 的双重修改,**正式 TDD v3.2 入档待 Phase 0.10 走 `[TDD-CONTRACT-CHANGE]` 流程**。本节作为设计层先期锁定,代码层落地前 TDD 必跟。
> **本节不是自由发挥**——所有 4 个 zone 的具体 hex 全部来自 image_synthesize 输出的 7 张参考图(见 §10 + `references/sprite-gen-vaporwave/`),不是拍脑袋。

## 0.7 v1.2 关联规则

- **同角色不同 zone = 不同色相**。同一个玩家(米色面具+礼帽+黑风衣+红围巾),在 4 个 zone 下围巾颜色饱和度从 `LANTERN` → 暗玫瑰 → 深红 → 病态红,**不是同一张图换背景**
- **同 zone 不同房间 = 调色板相同 + 灯位不同**。同属外滩区的 5 个房间,墙/地/基础光全一样,只是霓虹灯位 / 数量 / 强度变
- **跨 zone 房间禁止**。一个 mission 内的房间必须属于同一 zone(避免视觉撕裂)
- **M1 范围 = 1 个 zone(弄堂)1 个房间**。先做透 D6+D7 的最简 case,再扩散到 4 zone

---

## 0. 关键发现(Hotline Miami 真机分析)

**1. Hotline Miami 本身是"全平涂"(NO LIGHTING)**
- 所有截图都是高对比、高饱和、纯色平涂,**没有阴影、没有 GI、没有发光、没有 bloom**
- "neon" 效果是**配色 + 颗粒度**出来的,不是技术出来的
- 房间靠**强色块对比**(紫色地板 vs 红色墙 vs 蓝色床)区分
- 我们的 RC 是**真正差异化点** = "Hotline Miami 平涂 + 2D Radiance Cascades 实时光照"叠加
- 基底走 HM 风格,RC 是叠加层;dither 保住像素粒度

**2. viewport 实际上很紧(关键约束)**
- 1080p 下大概看到 **20×14 tile**(HM 真机测量)
- 每个 tile 渲染为 ~80 像素
- 我们用 32×16 像素 tile → 同等 viewport 看到 **60×34 tile**(更密)
- 改:viewport 改为 32u × 18u(更接近 HM 的紧凑感)

**3. 玩家 sprite ≈ 1 tile**
- HM 玩家 ~32×32 像素(占 1 个 32px tile)
- 武器 = 手持伸出
- 我们玩家 1u × 1u,持枪时再加 0.5u 枪管(沿用 TDD §4.4.2)

**4. 双色"条带"地板(Stripe Floor)是 HM 标志**
- 卧室场景:紫色 + 绿色 + 青色 横条交替
- 走廊:白 + 灰 砖块斜向
- 木屋:深棕竖向木板
- 户外:亮色斜条 / 棋盘
- **每房间用 2-3 种地板颜色交替,营造"扫描线"质感**
- 我们的 `RoomLayout` 必须有 `floorPalette: [color1, color2, color3]` 字段

**5. 标志家具 sprite(HM 必有)**
- 棕色沙发(2 tile 长)
- 圆桌(2×2 tile)
- 床(2×3 tile,白色)
- 书架(1×3 tile)
- 盆栽(1×1 tile,绿色扇形)
- 冰箱(1×2 tile,白色)
- 这些都是**掩体** + **像素锚点**,不是装饰

**6. 血迹极大、极亮、极像素化**
- HM 血迹占 ~3×3 像素块,纯色 #ff0000 系
- 我们的血溅 RC light(0.5s TTL)叠加在血迹上 → 真正"暗红发光"

**7. 墙是砖块,不是平涂**
- 红色墙 = 红砖图案
- 蓝色墙 = 蓝灰方块
- 灰泥墙 = 灰白灰白斜线
- **每面墙有 2-3 个色阶**(亮 / 中 / 暗),不用平涂
- 我们的 `RoomLayout` 必须有 `wallPattern` 字段(red_brick / blue_block / plaster_white / etc.)

**8. HUD 是 4 角小字**
- 弹药 "9/13rnds"(左下)
- 分数 "526opts"(右上)
- 评价 "TIED" 之类(过场大字)
- 玩家 HP 不显示(因为一击毙命)

---

## 1. 视角与视口

- **正俯视(top-down 2D)**,无 Z 轴透视
- 相机:OrthographicCamera,**viewport = (0, 0, 32, 18) u**
- 玩家始终在屏幕中心,房间滚动跟随
- 渲染分辨率:1920×1080(16:9),DPR 1
- 每 tile 渲染为 **60 像素**(32u viewport / 1080p)

> **为什么改 viewport**:原 v1 写 44×28u → 1080p 下每个 tile 才 24 像素(颗粒过细,失去 HM 感)。改 32×18u → 每个 tile 60 像素,匹配 HM 真实比例。

## 2. 美学关键词(微调,加 HM 真机观察)

- 16×16 像素粒度(代码中)→ 60 像素(渲染时)→ 等价 HM 观感
- **高对比 + 强配色**(推更 saturated,见 §3 调色板 v2)
- **双色 / 三色"条带"地板**(每房间配 2-3 色交替)
- 墙 = **砖块图案 + 2-3 色阶**,不平涂
- 主体:HM 平涂,**RC 是叠加层**(soft shadow / GI / 枪火瞬间亮起)
- 孤岛暗夜(主体中-高饱和,光位极高饱和)

## 3. 调色板 v2(§4.4.8 调整,推更 saturated)— **D1 锁定**

> 调整:把 1937 上海孤岛期的"低调"压到 20%,HM 那种"超饱和"拉进来 80%,混合出一种"老上海霓虹 + 1989 Miami 颗粒"的视觉。
> **D1 决策**:用户 review 通过,锁 80% HM + 20% 上海。

| 名称 | v1 hex | **v2 hex** | 用途 | HM 对应 |
|------|--------|-----------|------|---------|
| INK | #0e0d12 | **#0a0910** | 弄堂深处墨色 / 玩家风衣 | HM 黑色基调 |
| PLASTER | #1a1922 | **#2a2638** | 灰泥墙地面 | HM 灰地板 |
| RUST | #5e2418 | **#7a2a1c** | 木门铁锈 / 墙 | HM 棕色墙 |
| TEAL | #1c4d4a | **#1a5a5a** | 苏州河水 | HM 蓝绿 |
| **LANTERN** | #c8421c | **#e54a1a** | 红灯笼 / 旗袍 | **核心橙红** |
| **NEON** | #9c2c2c | **#ff2a44** | 老式霓虹(招牌) | **核心红霓虹** |
| PAPER | #d8c89a | **#e8dca0** | 黄包车票 / 纸 | HM 米黄 |
| **IVORY** | #e8d8b4 | **#f5e6b8** | 米色蒙面 / 旗袍边 | HM 亮米 |
| JADE | #3a8060 | **#2a9a6a** | 翡翠配饰 | HM 绿 |
| STEEL | #3a3a3a | **#4a4a52** | 步枪 / 玩家帽 | HM 金属灰 |
| **MUZZLE** | #ff8a3a | **#ffaa3a** | 枪火高亮 | **核心橙光** |
| **BLOOD** | #a02020 | **#d8201a** | 血(HM 的血更亮) | **核心血红** |

**新增 HM-借鉴色**(用于"条带"地板 + 强色块):

| 名称 | hex | 用途 |
|------|-----|------|
| STRIPE_PURPLE | #6a3a8a | 弄堂地板条带紫 |
| STRIPE_TEAL | #2a8a7a | 地板条带青 |
| STRIPE_PINK | #c84a7a | 舞厅条带粉 |
| WALL_RED_BRICK | #8a3a2a | 红砖墙 |
| WALL_BLUE_BLOCK | #3a5a8a | 蓝灰墙 |
| WALL_PLASTER_W | #c8b896 | 灰泥白墙 |
| FLOOR_PLASTER | #5a5048 | 室内地板灰 |
| FLOOR_WOOD | #6a4a2a | 木地板 |
| EXTERIOR_GRAY | #4a4a5a | 户外水泥 |

### 3.1 Zone-based 调色板(v1.2 引入)— **D5-D7 锁定**

> 上面 8 + 9 = 17 个 PAL_* 是**通用基底色**(所有 zone 共享),**不承载 zone 调性**。Zone 调性由下面的 4 张 zone palette 决定。
> 所有 zone palette 的具体 hex 来自 `references/sprite-gen-vaporwave/` 7 张参考图,不是凭空写。

**4 个 zone 的视觉签名**(双 cascade 配色 + ambient 衰减):

| Zone | 主光 cascade | 辅光 cascade | Ambient | 衰减曲线 | mood |
|------|------------|------------|---------|---------|------|
| **外滩霓虹 (bund)** | `ZONE_BUND_PRIMARY` #ff00aa 品红霓虹 | `ZONE_BUND_SECONDARY` #00ffff 青 | `ZONE_BUND_AMBIENT` #1a0a14 深紫黑 | normal(2 cascade) | 蒸汽波 HM,舞厅/夜总会 |
| **法租界夜雨 (concession)** | `ZONE_CONC_PRIMARY` #d4a44a 琥珀路灯 | `ZONE_CONC_SECONDARY` #5a8a9a 雨青 | `ZONE_CONC_AMBIENT` #0a141a 暗青黑 | normal + 雨滴高光 (3 cascade) | 1940s noir,王家卫 |
| **弄堂灯笼 (lilong)** | `ZONE_LILONG_PRIMARY` #c8341a 灯笼红 | `ZONE_LILONG_SECONDARY` #3a1410 砖暗 | `ZONE_LILONG_AMBIENT` #050408 漆黑 | 极陡(0-1 衰减) | 暗处可杀,中式 noir |
| **苏州河雾夜 (creek)** | `ZONE_CREEK_PRIMARY` #c8a830 病态黄 | `ZONE_CREEK_SECONDARY` #3a6a4a 暗绿 | `ZONE_CREEK_AMBIENT` #0a1a0a 暗墨绿 | 雾衰减(0.3x range) | 工业 horror,码头 |

**强制规则**:
- 每个 zone 必须有**至少 1 个 RC 主光** (主光 cascade 颜色),**至少 1 个辅光** (辅光 cascade 颜色)
- 衰减曲线不同 → 同一 RC 算法在不同 zone 跑出来的"亮度感"差 30%,**这是 RC 调参的核心输入**
- M1 范围 = **仅 lilong 1 zone**(最简,只有 1 盏灯笼 + 漆黑,RC 几乎全黑)
- 颜色 hex 是契约值,改需走 TDD v3.2 `[TDD-CONTRACT-CHANGE]`

**与现有 TDD §4.4.8 PAL_* 的关系**:
- `PAL_*` 系列 = 跨 zone 通用色(角色衣服颜色、家具材质、HUD 高光)
- `ZONE_*` 系列 = zone 专属色(RC cascade 染色 + ambient 基底)
- 两套色**正交**,不冲突;TDD v3.2 在 §4.4.8 末尾追加 ZONE_* 16 个常量即可

---

## 4. intro sprite 设计(借鉴 HM 家具集)

intro 使用经批准、哈希锁定并确定性处理的 PNG atlas，由 `IntroSpriteRenderer` nearest-neighbor 绘制；Canvas2D fallback 仅用于资产未就绪。此例外之外仍沿用程序化资产规则。

### 4.1 角色(对齐 HM 配色)

| 角色 | v1 配色 | **v2 配色** | 备注 |
|------|---------|------------|------|
| **玩家** | INK 风衣 + STEEL 帽 + IVORY 蒙面 | **INK 风衣 + STEEL 帽 + IVORY 蒙面 + MUZZLE 持枪** | 玩家 = 风衣男,带白蒙面 |
| 敌人(占领军) | 军绿 + STEEL 钢盔 + 步枪 | **军绿钢灰 #5a6352(亮 #7c8a6a / 暗 #3a4034)+ STEEL 钢盔 + 步枪** | 加 chest strap |
| 敌人(巡捕) | 深蓝 + 警棍 | **墨蓝黑 #2a2f3a(亮 #4a5268 / 暗 #181c26)+ 白手套 + 警棍** | 大盖帽 + 斜挂警棍 |
| 敌人(特务) | 黑西装 + 礼帽 + 短枪 | **米色风衣 #c8b898(亮 #f5e6b8 / 暗 #8a7c66)+ STEEL 礼帽 + 墨镜 + 领带红 + 短枪** | 05 §3.3 为准 |
| BOSS | 同 archetype,加 IVORY 长衫 | **黑大衣 #1e1c24(亮 #3a3646 / 暗 #0a0910)+ 金边 #e8dca0 + 高帽 + 长枪** | 当前按 05 §3.4 单套配色;每任务独立配色留 stretch(M5+) |

### 4.2 标志家具(必须实现,每房间 ≥ 3 个)

| 家具 | tile 占用 | v1 状态 | **v2 实现** |
|------|----------|---------|-----------|
| **沙发** | 2×1 | ❌ | ✅ HM 棕色沙发 = 掩体,玩家可绕 |
| **圆桌** | 2×2 | ❌ | ✅ HM 棕色圆桌 = 中心,绕到后面躲子弹 |
| **床** | 2×3 | ❌ | ✅ HM 白床,绕床躲 |
| **书架** | 1×3 | ❌ | ✅ 茶馆 / 报馆 必备 |
| **盆栽** | 1×1 | ❌ | ✅ 户外 / 弄堂 装饰兼掩体 |
| **冰箱** | 1×2 | ❌ | ✅ 厨房必备 |
| **茶桌** | 2×2 | ❌ | ✅ 茶馆 / 后厨 = 圆桌变种,加茶具 sprite |
| **麻将桌** | 2×2 | ❌ | ✅ 茶馆房间标志 |
| **霓虹招牌** | 1×3 | ❌ | ✅ 弄堂口,内置 RC light(neon_sign) |
| **油灯** | 1×1 | ❌ | ✅ 茶馆 / 走廊,oil_lamp RC light |
| **探照灯** | 1×1 | ❌ | ✅ 码头 / 屋顶,searchlight RC light(旋转) |
| **门** | 1×1 | ❌ | ✅ D 字符 = 通道点,RoomLayout.exitTile |
| **掩体(沙袋)** | 1×1 | ❌ | ✅ X 字符,通用掩体 |

### 4.3 RC 灯光叠加(§5.1 不变,光源位置对齐)

| 光源 | 颜色(v2) | 强度 | 半径 | 触发 |
|------|----------|------|------|------|
| 枪火 | MUZZLE #ffaa3a | 1.4 | 4u | 远程开火 |
| 爆炸 | MUZZLE #ffaa3a | 2.0 | 5u | 手雷 |
| 油灯 | #ffd066 | 0.55 | 3.5u | 静态 |
| 霓虹 | NEON #ff2a44(变体 cyan #2a9aff) | 0.75 | 4.5u | 静态(脉动) |
| 探照 | #e0e8ff | 0.9 | 5u | 静态(旋转) |
| 手术 | #ffffff | 0.7 | 8u | 静态 |
| 舞厅 | #ff5cb4 ↔ #3ad8ff | 0.5 | 10u | 静态(脉动) |
| 血溅 | BLOOD #d8201a | 0.3 | 2u | 击杀(0.5s) |

> 2026-08-08 B24-B28 定档:RC_AMBIENT_INTENSITY=0.12、RC_LIGHT_SCALE=1.35;
> 装饰灯全部走真 RC 发射(禁止加法 mesh 假光晕),光半径均 ≤ 5u,避免房间过曝。

## 5. "条带"地板(HM 标志细节)

每房间地板用 **2-3 色横条交替**,每 2u 高切换一次颜色:

```
Floor tile pattern example(房间 R1 = 弄堂):
..........
..........
..STRIPE_PURPLE / STRIPE_TEAL / STRIPE_PURPLE / STRIPE_TEAL..(每 2u 一色)
..........
```

**实现**:`engine/sprites/PixelRenderer.ts` 的 `drawFloor` 函数读 `RoomLayout.floorPalette`,按 Y 坐标 mod(2) 切换颜色。

**RoomLayout 字段扩展**:
```ts
interface RoomLayout {
  // ... 已有
  floorPalette: string[];        // 2-3 个 hex,条带交替
  wallPattern: 'red_brick' | 'blue_block' | 'plaster_white' | 'wood_dark' | 'tile_blue';
  furniture: { tile: Vec2; kind: 'sofa' | 'bed' | ... }[];  // 显式家具表
  decorativeLights: { tile: Vec2; kind: RcLightKind }[];  // 静态灯位表
}
```

## 6. 后处理

- **无** Bloom(RC 已经够柔光)
- **dither 回压**:4×4 Bayer matrix,`final.frag` 内置
- **扫描线**(可选 stretch):模拟 CRT 效果,1px 暗行,可被 DevPanel 关闭
- **无** Vignette(1937 题材不需要做旧)

## 7. 字体

- **VT323**(Google Fonts,monospace,pixel 风)— HUD / 任务文本 / 评分
- 不用第二字体
- HUD 颜色:左下弹药 = `#3affc8` 青绿(参考 HM 紫红)
- HUD 颜色:右上分数 = `#ff5cb4` 粉红(参考 HM 紫红)

## 8. 房间结构规范(对齐 HM 真机)— **D2 / D3 锁定**

| 维度 | HM 实测 | 我们 v2 |
|------|---------|---------|
| 单房间大小 | 10-15 tile 宽 × 6-10 tile 高 | **15-20 tile 宽 × 8-12 tile 高**(略大,留 RC 灯位空间) |
| 房间数 / 任务 | 1-3 个连房 | **3-4 个连房** |
| 视线 | 多房间同时可见(无 scroll) | **多房间同时可见 + 走廊相连** |
| 门 | 墙上的缺口 | **D 字符 + 门口无墙** |
| 墙厚 | 1 tile | **1 tile(标准)+ 偶有 2 tile 厚墙(掩体)** |
| 家具密度 | 4-8 件 / 房间 | **5-10 件 / 房间(高密度,逼玩家绕)** |
| 灯密度 | 1-2 件 / 房间(只在主厅) | **2-4 件 / 房间(更暗,RC 强)** |
| **敌人密度** | 3-8 敌人 / 房间 | **2-5 敌人 / 房间(D2 锁定:RC 配合暗杀 + 强攻平衡)** |
| **viewport** | 1920×1080 看 ~20×14 tile | **32u × 18u(D3 锁定:每 tile 60 像素,匹配 HM)** |

> 关键:**敌人更少 = 暗杀 > 强攻**。RC 让暗处隐身成立,玩家靠绕 + 油灯外侧开枪。HM 范式是"一夫当关",我们是"暗影刺客"。

## 9. 禁止

- ❌ 3D 透视
- ❌ 真阴影(投影,RC 自带 soft shadow 替代)
- ❌ 粒子叠加(无伤血粒子等；intro scene 的拆灯火花/玻璃碎屑为 2026-08-09 用户批准例外)
- ❌ 复杂 shader(只允许 RC 4 阶段 + dither)
- ❌ 多字体
- ❌ 渐变阴影(由 RC 接管)
- ❌ 未列入 approved intro manifest 的贴图 / 外部资源

### 9.1 当前视觉实现与缺口(2026-08-09)

- 历史里程碑(初版 intro port):角色/巡逻兵 8 方向 atlas、油灯三态、地面/砖墙、石库门、晾衣线、火花/玻璃；当时真实 RC 使用 1 cascade + twoLoop + Bayer dither。当前生产状态见下一条。
- v3.7 哨塔大院已完成:3 地面巡逻 + 1 静态塔守、warning/death/retry、拆电与清场撤离、score/replay 与 HUD trim 均有 e2e 截图。RC 为 3-cascade visual-only presentation；几何 LOS/LightField 决定玩法。
- 非阻塞差距:房间构图仍偏规则方盒，石库门与晾衣装饰层次有限；缩放后的敌我 silhouette 仍不及 canonical `07-lilong-lantern-player.png`；灯灭整体反差与短暂碎裂 juice 仍可加强。上述不扩大 approved PNG manifest，也不增加 cascade。

## 10. 参考图(本目录 + 项目 references/)

### 10.1 Hotline Miami 真机(`docs/design/hotline-miami-reference-*.{jpg,png}`)

- `hotline-miami-reference-01-room-with-furniture.jpg` — 棕色地板 + 家具,显示 HM 房间内布局
- `hotline-miami-reference-02-bedroom-stripe-floor.png` — 卧室紫绿青条带地板
- `hotline-miami-reference-03-corridor-brick.png` — 走廊白砖地板 + 棕色墙

> **v3.1 起**:`docs/references/sprite-gen-vaporwave/` 整体归档(2026-08-09 用户指令:全游戏只 ship 1 个 intro scene,lilong 唯一 zone)。
> intro scene 的视觉唯一参考 = `07-lilong-lantern-player.png`(D5 canonical,Z3 弄堂灯笼)。
> 其它 6 张(02/06/04-boss-civilian canonical + 01/03/05 备用)= M2+ 多 zone 铺量时的参考,本阶段不使用。

---

## 10.5 Atmospheric zones 详细规范(v1.2 引入,仅 Z3 ships)

> 这是 §3.1 zone palette 的**视觉语义层**,§3.1 给 hex,这里给"为什么这么画"+"游戏内怎么用"。

### Z1. 外滩霓虹 (bund_neon)

- **历史锚点**:1937 上海外滩 + 百乐门舞厅 + 大世界游乐场
- **视觉母题**:舞厅霓虹灯牌 / 旗袍 / 礼帽 / 黄包车 / 爵士乐烟雾
- **参考图**:`sprite-gen-vaporwave/02-player-pistol.png` + `01/03/04/05`
- **RC 调参**:2 cascade(短/中),cascade 1 = `#ff00aa` 品红(短),cascade 2 = `#00ffff` 青(中),高 ambient `#1a0a14`
- **玩法特征**:长视线 / 远射武器占优 / 霓虹牌是 RC 主光(可破坏)
- **Mission 分配**:v1 时代 Mission 1 "电车公司"(待 v3+ 重建)
- **音效基调**:爵士 + 留声机底噪

### Z2. 法租界夜雨 (concession_rain)

- **历史锚点**:1937 霞飞路 / 思南路 / 法国梧桐 / 武康大楼
- **视觉母题**:湿石板路 / 琥珀路灯 / 油纸伞 / 雨丝 / 远处霓虹散射
- **参考图**:`sprite-gen-vaporwave/06-concession-rain-player.png`
- **RC 调参**:3 cascade(短/中/长),cascade 1 = `#d4a44a` 琥珀(短,主光),cascade 2 = `#5a8a9a` 雨青(中),cascade 3 = 天空散射(长,弱)
- **玩法特征**:雨声遮脚步(潜行加成)/ 水坑反光(瞄准提示)/ 路灯可击破
- **Mission 分配**:v1 时代 Mission 3 "墨水账"(待 v3+ 重建)
- **音效基调**:雨声 + 远处爵士 + 木屐 / 皮鞋

### Z3. 弄堂灯笼 (lilong_lantern)— **M1 范围**

- **历史锚点**:1937 上海弄堂 / 石库门 / 老虎窗 / 晾衣杆
- **视觉母题**:深巷 / 红灯笼 / 木楼梯 / 阴影中的剪影 / 油画感单光源
- **参考图**:`sprite-gen-vaporwave/07-lilong-lantern-player.png`
- **历史 Z3 极限稿 RC 调参(已由 v3.7 覆盖)**:**1 cascade 极限 case**(只有 1 盏灯笼主光 `#c8341a` + ambient `#050408` 接近纯黑),衰减极陡,90% 像素 INK；当前 M1 哨塔大院用 3 cascade + 半分辨率工作缓冲。
- **玩法特征**:**"灯下无敌/暗处可杀"机制的视觉前提** = 离开灯笼 = 漆黑 = 隐身。BOSS/油灯/油灯外侧玩家完全看不见
- **Mission 分配**:v3 `m1_workshop`(待重建,首关)
- **音效基调**:蟋蟀 / 远处叫卖 / 木质吱呀 / 单音钵

### Z4. 苏州河雾夜 (creek_fog)

- **历史锚点**:1937 苏州河沿岸 / 码头 / 货栈 / 船坞
- **视觉母题**:河雾 / 病态黄灯 / 锈铁 / 油渍 / 远处工厂烟囱
- **参考图**:暂无(待 Phase 0.10+ 补 image_gen)
- **RC 调参**:3 cascade + 雾衰减(0.3x 范围),cascade 1 = `#c8a830` 病态黄(短,雾灯),cascade 2 = `#3a6a4a` 暗绿(中,水反射),cascade 3 = 工业烟囱橙(长,弱)
- **玩法特征**:雾减能见度 / 油渍加速 / 雾灯可击破触发"全黑瞬间"
- **Mission 分配**:v1 时代 Mission 2 "夜航船" / v3 `m4_postman`(待重建,跨区任务)
- **音效基调**:船笛 / 工业低频 / 缆绳吱呀

### 跨 zone 一致性规则

- 同 mission 房间**必须同 zone**(避免视觉撕裂)
- 跨 mission 可以换 zone(每次换 = 新氛围 = 新战术)
- HUD 不变(`PAL_*` 通用色,§3),不变 zone 色
- 武器/敌人 sprite 不变(同角色跨 zone 共用 sprite,只换染色),染色规则 = §4.1 + ZONE_PRIMARY 作为 rim 光色
- BOSS 是**唯一跨 zone 视觉等级最高的角色**,sprite 不变但染色随 zone 调

---

## 11. 跨文档引用(必读)

- **`05-character-design.md`** — 角色像素图 v1(玩家 / soldier / policeman / spy / BOSS)+ 可读性规则(冷青描边 = 玩家 / 暖橙 = 敌人)
- **`06-blindside-lessons.md`** — BLINDSIDE 试玩笔记 + 7 条 B29 提案,直接对应 reviewer Q4(光暗机制)+ Q10(手柄 AimFocus)
- **`07-sprite-gen-tasks.md`** — image_gen 任务清单(M3+ 才动,Phase 0/1/2 仍用 char-grid placeholder)
- **`09-blindside-integration.md`** — BLINDSIDE×HS 整合规范(TDD v3.1 权威),zone palette 必须与之兼容(lilong 灯笼 = `oil_lamp` / 路灯 = `neon_sign` 等 light kind 的色彩映射)
- **`TDD.md` §4.4.8 + v3.2(待写)** — 调色板冻结契约。v1.2 本节所有 `ZONE_*` 16 个 hex 必须经 TDD v3.2 走 `[TDD-CONTRACT-CHANGE]` 入档后才算最终值。本节作为设计层先期锁定。

