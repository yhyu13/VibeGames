# 05 — Character Design(角色设计:美术 + 实现逻辑)

> 设计层权威文件之一。GDD v2 §2.3(势力)/ §7(Art Direction)的细化。
> **冻结原则**:零资产文件(全部程序化像素);16×16 像素 sprite;顶视角(头肩俯视);
> 每个角色必须通过"亮色锚点 + 描边"在任何明暗背景下可辨认。
> 实现契约:角色数据 = 纯数据(`core/data/sprites.ts`,零平台依赖),渲染 = `engine/sprites/PixelRenderer.ts`。

## 1. 可读性规则(冻结,先于一切角色定稿)

顶视角像素角色在暗背景上的可读性 = 三个锚点,缺一不可:

1. **亮色锚点**:每个 sprite 必须含 ≥4 像素的高亮块(与主色对比 ≥3 档)。
2. **描边(1px)**:暗背景亮边;玩家冷色描边、敌人暖色描边,同屏 0.5s 内可区分敌我。
3. **轮廓内嵌阴影**:主色 3 档(暗/中/亮),禁止单色剪影。

| 角色 | 描边色 | 亮色锚点 | 区分特征 |
|------|--------|----------|----------|
| 玩家(线人) | `#8ab4ff`(冷青) | 灯笼红围巾 | 礼帽 + 蒙面 + 围巾 |
| soldier 占领军 | `#ffb066`(暖橙) | 袖章红 | 钢盔 + 步枪 |
| policeman 伪警 | `#ffb066` | 白手套 | 黑制服 + 警棍 |
| spy 特务 | `#ffb066` | 米色风衣 | 礼帽 + 领带 |
| boss 特务长 | `#ff5a3c`(警示) | 金边大衣 | 大衣 + 高帽 + 肩章 |

> 敌我区分:**玩家描边 = 冷青**(全屏唯一冷色描边),**敌人 = 暖色系**。锁定目标额外 3Hz 脉冲描边(引擎层)。

## 2. 玩家:地下抵抗线人(16×16)

### 2.1 像素图(冻结 v1)

```
行   0................
1    ......kccc......
2    .....kccccck.....
3    ....kccwwwwk.....    c = 钢灰帽 PAL_STEEL #4a4a52
4    ....kwwwwwwk.....
5    ....kwwwwwwk.....    w = 米色蒙面 PAL_IVORY #f5e6b8
6    ....kkkkkkkk.....
7    .....kkkkkk.....     k = 风衣 PAL_INK #0a0910
8    ....kkkkkkkk.....
9    ....krrkkrrk.....     r = 围巾 PAL_LANTERN #e54a1a(亮色锚点,v1.1 新灯笼红)
10   .....kkkkkk.....
11   ....kkkkkkkk.....
12   ....kkkkkkkk.....
13   ....dddddddd.....
14   ................     d = 风衣亮褶 #2e2c3a(第三档)
15   ................
```

- 锚点:围巾 4 像素灯笼红 + 蒙面 6×6 米色块;描边冷青 `#8ab4ff`(引擎绘制,不入 sprite 数据)。
- 面具激活时:蒙面 `w` 替换为面具主题色(见 §4),围巾不变(玩家标识)。

### 2.2 动画帧(v1 范围)

| 动画 | 帧数 | 内容 | 帧率 |
|------|------|------|------|
| idle | 1 | §2.1 | — |
| walk | 4 | 帧 A = §2.1;帧 B/C/D = 腿部步幅 + 肩膀 1px + 围巾尾摆动(已按 B26 落 4 帧) | 6 fps |
| attack(近战) | 1 | 突刺帧 + 前方 60° 白色刀光弧(半透明,`PLAYER_MELEE_ARC_DEG`) | 12 fps(B26) |
| death | 1 | §2.1 整体压扁 0.5(2px 高)+ 不透明度 0.6 | 一次性 |

- **朝向**:顶视角对称 sprite + `facingAngle` 整体旋转(Canvas `rotate`),仅 M1-M3
  placeholder 阶段;8 方向帧最终规格以 `07-sprite-gen-tasks.md` 为准(M4.6/M5 升级)。
- 持枪时:枪口 4px 亮块贴 sprite 前缘,颜色 = 武器类型(远程 `#8ab4ff` / 投掷 `#ffb066`)。

## 3. 敌人 archetype(16×16,同结构:帽 + 头肩 + 躯干)

> 4 个 archetype 共用骨架,差异只在帽形/色块/徽记。以下为差异化规格(骨架 = 玩家骨架去蒙面/围巾)。

### 3.1 soldier 占领军
- 主色:军绿钢灰 `#5a6352`(帽/制服),亮档 `#7c8a6a`,暗档 `#3a4034`
- 帽:钢盔(`c` 档 + 中央 1px 高光),袖章 `#d8201a` 红(右肩 2px)
- 徽记:左胸 1px `#e8dca0`(识别占领军)

### 3.2 policeman 伪警
- 主色:墨蓝黑 `#2a2f3a`,亮档 `#4a5268`,暗档 `#181c26`
- 帽:大盖帽(帽檐 2px 亮),白手套 2px `#f5e6b8`,警棍斜挂 2px `#7a2a1c`

### 3.3 spy 特务
- 主色:米色风衣 `#c8b898`,暗档 `#8a7c66`,亮档 `#f5e6b8`
- 帽:礼帽(同玩家但 `#4a4a52`),深红领带 2px `#d8201a`,墨镜 2px 黑

### 3.4 boss 特务长
- 主色:大衣 `#1e1c24`,亮档 `#3a3646`,暗档 `#0a0910`;金边 `#e8dca0`(大衣下摆 2px)
- 帽:高帽(15 行高),肩章金 2px;描边 `#ff5a3c` 警示色
- 尺寸:16×16 不变(BOSS 识别靠描边 + 血条,不靠体积)

### 3.5 敌人通用规则
- 敌人描边:暖色(§1 表);受伤瞬间闪白 1 帧(M2)
- 掩体后:不透明(顶视角无遮挡,靠 RC 阴影表达隐蔽)

## 4. 面具主题色(蒙面 `w` 替换表,冻结)

| 面具 | 主题色 | 视觉 |
|------|--------|------|
| actor 戏子 | `#e54a1a` 红 | 红脸谱纹(1px 白线) |
| runner 帮工 | `#2a9a6a` 翡翠 | 绿蒙面 |
| righteous 蒙面义士 | `#f5e6b8` 米 | 白蒙面(默认同玩家) |
| dancer 舞女 | `#9c2c9c` 紫 | 紫蒙面 + 腮红 2px |
| waiter 茶馆跑堂 | `#b8967a` 茶褐 | 茶褐蒙面 |
| officer 军爷 | `#4a4a52` 钢灰 | 灰蒙面 + 帽徽 1px 金 |

## 5. 实现逻辑(引擎契约)

### 5.1 数据层(`core/data/sprites.ts`,纯数据,零平台依赖)

```ts
// PixelSprite 已冻结(PixelRenderer 消费):rows: string[] + palette: Record<char, string>
export interface SpriteFrames {
  idle: PixelSprite[];          // 1 帧
  walk: PixelSprite[];          // 2 帧
  attack: PixelSprite[];        // 1 帧(挥击弧由渲染层画)
  death: PixelSprite[];         // 1 帧
}

export interface CharacterDef {
  id: 'player' | EnemyArchetype;
  nameZh: string;
  frames: SpriteFrames;
  outlineColor: string;         // §1 描边色(玩家冷 / 敌人暖)
  anchor: { x: number; y: number }; // 旋转锚点(几何中心)
  animFps: number;              // walk 帧率
}

export const CHARACTERS: Record<string, CharacterDef> = { ... };
// 面具蒙面色替换:src/core/data/masks.ts 每面具已有主题色字段 → renderer 查表替换 'w' 像素
```

### 5.2 渲染层(`engine/sprites/PixelRenderer.ts`,现有 API 扩展)

```ts
// 现有(冻结):drawSprite(ctx, x, y, sprite, pixelSize)
// 新增(v1):
drawSpriteRotated(ctx, x, y, sprite, pixelSize, angleRad): void
drawOutline(ctx, x, y, sprite, pixelSize, colorHex): void   // 外圈 1px 描边
drawCharacter(ctx, def: CharacterDef, state: 'idle'|'walk'|'attack'|'death', facingAngle, x, y, pixelSize): void
//   = 描边 → 旋转 → sprite;walk 帧按 animFps 切;attack 时叠加半透明刀光弧
```

### 5.3 SceneManager 消费(替换占位)

- `PLAYER_SPRITE` / `ENEMY_SPRITES` 占位数据删除,改读 `CHARACTERS` 注册表。
- `drawOverlay()`:玩家 `drawCharacter(..., 'walk'|'idle', player.facingAngle, ...)`;敌人同,`attack` 帧由 `enemy.state === 'engaging'` 触发。
- 锁定目标:描边色切换 `#ff5a3c` + 3Hz 脉冲(引擎每帧改 outlineColor 透明度)。

### 5.4 z-order / 渲染顺序(冻结)

```
地板网格(Three) → 灯位图块 → 敌人 → 玩家 → 道具 → 刀光弧(半透明) → CRT 扫描线(UI)
```

## 6. 验收标准(替换占位后)

1. 玩家在任意房间角落(油灯外)0.3s 内可被肉眼定位(围巾锚点 + 冷描边)。
2. 同屏 4 archetype 敌人可 1s 内区分(帽形 + 徽记 + 暖描边)。
3. 玩家面向旋转跟随鼠标,walk 2 帧动画平滑。
4. 6 面具蒙面色替换正确,激活面具后蒙面变色。
5. 60 FPS 下 overlay 层无闪烁(pixelSize 抖动需取整一致)。

## 7. M1/M2 范围切分

- **M1(本次)**:§2 玩家 + §3.1 soldier + §3.4 boss 骨架 + 描边/旋转/walk 4 帧 + 面具色替换。
- **M2**:policeman / spy 定稿、attack/death 帧、锁定脉冲描边;8 方向帧只出评估结论,
  实现按 `07-sprite-gen-tasks.md` 留到 M4.6。
- 关联文档:`02-art-direction.md`(总配色)、`06-rendering-readability.md`(灯光合成与场景接线)、GDD §7。
