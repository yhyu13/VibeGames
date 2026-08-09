# Hotline Shanghai — Bug Tracker

> 活文档:每发现一个 bug 先登记,再修复,再验证。状态: `OPEN` / `FIXING` / `FIXED` / `WONT_FIX` / `DESIGN`。
> 验证门:每次修复后 `npx tsc -b --noEmit` + `npm run build` + `node scripts/playtest.mjs` 对应场景。
> 与 TDD 契约冲突的修复需要走 `[TDD-CONTRACT-CHANGE]` 并在此登记。

## 复现环境

- 开发服务器:`npm run dev` → http://localhost:5184(其他 session 也可能在跑,HMR 生效)
- 自动测试:headed Chromium(Playwright,复用 `../1/node_modules/playwright`);headless 会把 rAF 节流到 ~2fps,不可用于帧级断言
- 截图:`smoke/*.png`

## Bug 列表

| ID | 严重度 | 区域 | 描述 | 复现 | 状态 |
|----|--------|------|------|------|------|
| B01 | HIGH | gameplay | Death-on-spawn:Room 1 士兵能在玩家可操作前(入场淡入 1.0s 内输入锁死)击杀玩家;出生点 (1,4) 与敌 (1,1) 同列无遮挡,视野 8u/60° | 开始任务后站着不动,~1.1-1.6s 死亡;`M1-smoke-01-death-on-spawn.png` | FIXED(2026-08-08,ROOM_START_GRACE_S=1.0) |
| B02 | HIGH | gameplay | 无碰撞:玩家/敌人穿墙穿家具;子弹穿墙;敌人视线穿墙(可"看见"墙后的玩家);`core/world/tileMap.ts` 是死代码 | 走位穿墙、隔墙被射、墙后被发现 | FIXED(2026-08-08,collision.ts 接入 + FURNITURE_SOLID 家具实心) |
| B03 | MED | gameplay | 房间清空后自动切下一房,不需要走到门;`exitTile` / `D` 门无功能 | 清房后 0.8s+0.5s 自动推进 | FIXED(2026-08-08,EXIT_REACH_RADIUS=1.2 + HUD 提示) |
| B04 | MED | UI | Tab 暂停无任何 UI,玩家不知道已暂停;无恢复提示 | PLAY 中按 Tab,画面静止但无提示 | FIXED(2026-08-08,PauseOverlay + snapshot.paused) |
| B05 | LOW | UI | HUD 显示 HP,违反 art direction "HP 不显示"(一击必杀,HP 恒 1) | 打开 HUD 左上角 | FIXED(2026-08-08) |
| B06 | LOW | infra | `index.html` 加载 Google Fonts,违反 TDD §9 "外部网络资源:无" | 断网/离线时字体失效 | FIXED(2026-08-08,并行 session) |
| B07 | LOW | infra | 无 favicon,浏览器请求 `/favicon.ico` 两次 404(console error) | 打开 DevTools console | FIXED(2026-08-08,内联 SVG) |
| B08 | LOW | devtools | `__simEvents()` 稳态返回空:事件队列被引擎每帧 drain | PLAY 中调 `window.__simEvents()` | FIXED(2026-08-08,recentEvents 环) |
| B09 | LOW | UI | 结算屏不显示 S 级配方(`≤45s · 0受击 · 全拾取`),玩家不知道隐藏任务怎么解锁 | 通关后看 SCORE 屏 | FIXED(2026-08-08) |
| B10 | MED | content | `spawnRoomEnemies` 硬编码 soldier,`policeman`/`spy` 定义了但从不出现 | 任意房间快照敌 archetype | FIXED(2026-08-08,按房间轮换) |
| B11 | DESIGN | visual | 房间 8-14 tile 宽 < 视口 32u,画面大量 void;ambient 0.2 把暗部调色板洗灰(紫条带读作灰蓝) | Room 1 截图 | FIXED(2026-08-09 v3:viewport 契约改为像素锚定 + 相机适配房间,TDD §0.1;ambient 按房间光密度公式,不再手工震荡) |
| B12 | DOC | contract | TDD 已 stale:`MISSION_BRIEF_IN` 流程已删(D4)、`playerKilled` 缺 `cause`、§4.4.7 调色板仍是 v1 | 对照代码 | FIXED(2026-08-08,v1.2 changelog + §4.4.7 表格) |
| B13 | DOC | art | `docs/design/05-character-design.md` §2/§3/§4 仍是 v1 色值;代码已同步 v2 | 对照 sprites.ts | FIXED(2026-08-08,机械同步 v2 色值) |
| B14 | DESIGN | gameplay | 死亡保留武器/弹药/面具/击杀数,与 HM "死了全掉光" 的张力相反 | 死亡重开 | FIXED(2026-08-09 v3 决策:死亡清空装备,HM 范式;实现待 M2 重建时落实) |
| B15 | DESIGN | flow | 无冷开场:Title → 选任务 → 面具屏 → 开打,距离"进房就爽" 还有 2 个屏 | 完整流程 | FIXED(2026-08-09 v3 决策:M1 去掉选任务/选面具屏,Title → 直接进房;HM intro 流后置 M2) |
| B16 | LOW | devtools | `window.__rcPipeline` 是否为实时对象待验证(state() 返回引用或快照) | 调 `__rcSetConfig` 后读状态 | WONT_FIX(已核实 state() 返回 live 引用) |
| B17 | TEST | infra | headless Chromium rAF 节流 ~2fps,输入管线饿死;冒烟必须 headed | headless 跑任意场景 | WONT_FIX(测试环境) |
| B18 | LOW | UI | MainMenu/HUD 按键文案曾写反(Shift/Space),已由并行 session 修复 | — | FIXED(2026-08-08) |
| B19 | LOW | UI | 任务卡片名称与 missions.ts 不一致(修械所 vs 电车公司),已由并行 session 修复 | — | FIXED(2026-08-08) |
| B20 | LOW | engine | 相机钳制小房间漂移,已由并行 session 修复(房间 < 视口钉中心) | — | FIXED(2026-08-08) |
| B21 | LOW | palette | v1/v2 调色板不一致(tailwind/index.html 并行 session 修复;index.css/DeathScreen/lights/LightSprite/SceneManager/masks/sprites 本会话修复) | grep v1 hex | FIXED(2026-08-08) |
| B22 | HIGH | input | 全部键盘/鼠标输入静默丢失:`GameEngine.sendInput` 解引用 `sim.input` 后裸调,strict 模式下 `this=undefined` 抛错被 catch 吞掉;玩家无法移动/攻击/投掷/暂停(UI 点击正常,因为走 setUiBridge 不经 sim.input) | 任意按键后玩家不动;instrumented(wrap+bind)后正常 | FIXED(2026-08-08,改为方法调用) |
| B23 | MED | gameplay | 投掷 = 原地变戏法:投掷物生成在玩家脚边,下一 tick 自动拾取(半径 1.5u)立刻捡回,`thrownWeapons` 永远为空 | E 长按投掷后武器仍在手、地上无投掷物 | FIXED(2026-08-08,THROWN_PICKUP_DELAY_S=0.5) |
| B24 | MED | visual | 灯光过曝:装饰光(neon 12u / searchlight 16u)半径大于房间,加法光斑 + RC + ambient 把地板冲成近白(Room1/2 实测纯白段;玩家蒙面 0 px);muzzle_flash 已注册为 RC 光(lightCount 3→4)但在全白场景零可见贡献 | 任意房间截帧 | FIXED(2026-08-08,见 B28:去伪光 + 半径收紧 + ambient 0.12 + lightScale 1.35,实测全屏 bright>160 由近白降至 0.6%) |
| B28 | MED | visual | 装饰光根本不是 RC:neon/searchlight 的"辉光"是 SceneManager.addLampGlow 的假加法 mesh 烘焙进场景纹理,sim activeLights 只有 tile 灯(L/N/S),decorativeLights 不进 RC emission;假辉光又被 prepscene 当辐射源二次反弹 → 假光自激放大成灯箱 | 读代码 + __rcPipeline.lightCount(Room1=1,但屏上有 2 处辉光) | FIXED(2026-08-08:删 addLampGlow 假光晕;decorativeLights 进 staticLightsFromRoom 真 RC 发射;lightCount Room1=2(oil_lamp+neon);RC 全关亮度 5 → 开光 48) |
| B25 | MED | visual | 像素对齐缺陷:overlay 坐标未取整(相机平滑 → 小数坐标),`fillRect` 产生亚像素抗锯齿/每帧抖动;`pixelSize=round(40/16)=3` → 角色 48px vs tile 40px,放大 20% 且与地板网格错位 | 移动中截图观察角色边缘/尺寸 | FIXED(2026-08-08:toPx 取整 + cellPx 取整,消除亚像素/帧间抖动) |
| B26 | MED | visual | 角色动画不可感知:walk 仅 2 帧 × 1px 肩移 @4fps(48px 下 ≈3px 抖动);整体旋转无 8 方向帧;攻击帧 = idle + 白色弧;死亡帧从不显示 | 行走时观察角色 | FIXED(2026-08-08:walk 4 帧含腿部步幅 + animFps 6;attack 突刺帧 @12fps;玩家 hp<=0 时显示 death 帧;实测 walk 帧间 diff 3.1k px) |
| B27 | MED | visual | 画面 45% 是灰色 void(环境光把房间外洗成 #3a3a3a 带);扫描线 2px 交替(acf2=-0.39)叠在 dither 上让画面发噪;HUD 文字亮像素仅 2.3%,偏暗 | 全屏截图统计 | FIXED(2026-08-08:ambient 0.2→0.12 后 void≈#0c0c0c 占 38.7%;scanlines 0.18→0.10;房间 mid 60.7%) |
| B29 | DESIGN | gameplay | blindside(茫室)评审可学点:光暗是玩法(光照下无敌/阴影中可杀)、巡逻手电、投掷弧线预览、checkpoint、击杀确认、死亡图标旋转、Dodge/AimFocus;详见 docs/design/06-blindside-lessons.md | 玩 blindside + 资源考古 | **ADOPTED(2026-08-09 v3.1 全量落地)** — 7 条提案中 6 条采纳:#1 光下无敌/暗处可杀 + #5 击杀确认 + #6 AimFocus = **M1.0 spike**;#2 巡逻手电(`flashlight_patrol`) = M1.0;#3 投掷弧线 + #4 checkpoint(中弹继续 vs 死亡清空) = M2-M3;#7 ReloadIndicator = M1.6。权威规范 = [docs/design/09-blindside-integration.md](docs/design/09-blindside-integration.md)(v3.1 新建);B34-B39 登记子项;06-blindside-lessons.md 改"已采纳"指向 09 |
| B34 | DESIGN | gameplay | BLINDSIDE #1 落地:`SHADOW_SHOT_MISS=true` + `LIGHT_SHIELD_THRESHOLD=0.30` + `LIGHT_EXPOSED_THRESHOLD=0.10`;敌人受光护甲,玩家在阴影中 100% 闪避;详见 TDD §4.5.5 + §4.6.4 + 09-§2 | 玩家在灯光外被敌瞄 0.4s 提示后开火 | ADOPTED(M1.0 spike 验证) |
| B35 | DESIGN | gameplay | BLINDSIDE #1 落地:玩家可拆灯 — `BREAKABLE_LIGHT_HP=2`(印刷间硬灯 3)、`LMB_LIGHT_PRIORITY_RANGE=2.0u`(拆灯优先于打人)、`LIGHT_POOL_DOWN_S=0.1`;详见 TDD §4.5.4 + 09-§3 | 空手 LMB 距灯 ≤2u → 灯碎,0.1s 后敌转暗中可杀 | ADOPTED(M1.0 spike 验证) |
| B36 | DESIGN | gameplay | BLINDSIDE #2 落地:新敌人 archetype `flashlight_patrol`(`FLASHLIGHT_CONE_ARC_DEG=50` + `FLASHLIGHT_SWEEP_HZ=0.6`);灯被拆 = 退回 8u 60° 几何锥;详见 TDD §4.4.4 + 09-§5 | M1 房 1 敌人原型 | ADOPTED(M1.0 spike 验证) |
| B37 | DESIGN | gameplay | BLINDSIDE #6 + #7 落地:`AIMFOCUS_PUSH_DIST=0.4u`(Shift 长按冻结瞄准 + 推远一点);ReloadIndicator 走 M1.6 提前 ship;详见 TDD §4.4.1 + 09-§8 | Shift 长按 = 抛物线预览稳定 | ADOPTED(M1.0 spike 验证) |
| B38 | DESIGN | content | BLINDSIDE 面具 6→9,新增 `lampmaker` / `darkwatch` / `fortuneteller`;`lampmaker` 闪灯/按灯 M1.6 提前 ship 作为机制验证面具;详见 TDD §4.4.3 + 09-§6 | M1.6 起可玩 3 个新面具 | ADOPTED(M1.0 spike 验证) |
| B39 | DESIGN | engine | BLINDSIDE 整合 → RC 管线追加 `uLightShieldThreshold` / `uLightExposedThreshold` uniforms + 1 × 240×135 R32F lightField framebuffer;final.frag 写 cache;CPU 端 glReadPixels 8×8 downsample,~0.2ms / 帧;cascade=0 时硬底禁用;详见 TDD §15.3 + §15.4 + 09-§9 | M1.0 spike 跑通 RC + lightField 联动 | ADOPTED(M1.0 spike 验证;性能待实测) |
| B30 | MED | tooling | 关卡设计无工具:只能直接改 missions.ts 的 ASCII,人类无法脱离代码评审关卡 | 评审流程复盘 | FIXED(2026-08-09:md 蓝图工作流 docs/design/08-level-design-workflow.md + scripts/level-design.mjs 校验/转换 + 示例关卡 docs/levels/m1_workshop_room1.md 已合入 Room1) |
| B31 | DOC | art | 07-sprite-gen-tasks.md 调色板只列 8 hex 且称"与 v2 一致"(缺 STEEL/JADE/RUST/军绿/警蓝等角色用色);BOSS 写 20×20 与 05 §3.4 / TDD §3.5 的 16×16 冲突;sheet 数 5 vs 6 自相矛盾 | 对照 TDD §4.4.8 + 05 §3 | FIXED(2026-08-09:07 改为 TDD/05 全表引用 + BOSS 16×16 + 6 张 sheet;05 §2.2 同步 B26 的 walk 4 帧/突刺,8 方向边界指向 07) |
| B32 | DOC | art | 02 §4.1 v2 配色列四行(军绿 `#4a5a3a` / 深蓝 `#2a3a5a` / 黑西装 / 墨绿长衫)与代码 sprites.ts + 05 §3 不一致,角色 prompt 会拿到两套配色 | 对照 sprites.ts / 05 §3 / 02 §4.1 | FIXED(2026-08-09:以代码 + 05 为准,02 §4.1 四行同步为军绿 `#5a6352` / 警蓝 `#2a2f3a` / 风衣米色 `#c8b898` / BOSS 黑大衣 `#1e1c24`;军绿属角色 sprite 局部色,TDD §4.4.8 不含,不改契约) |
| B33 | HIGH | reset | 2026-08-09 重置:关卡内容(4 任务 / 13 房间)、场景渲染(SceneManager / RcPipeline / shaders / postfx / sprites / PerfWatchdog)、玩家移动(InputManager / player.ts / collision.ts)整体移除并归档 `_archive-2026-08-09/`(可恢复);GameEngine / Simulation 改最小 stub,app 退回标题壳(无场景 / 无任务 / 无移动) | 视觉 clunky + 移动失效,用户决定清空重做 | FIXED(2026-08-09:tsc 零错误,标题壳可启动) |

## 修复顺序(优先级)

1. B01(死亡出生点)→ B02(碰撞/视线/子弹)→ B03(门推进)→ B04(暂停 UI)→ 低优先级 B05-B10 → 全流程 playtest → B12/B13 doc 同步。

## 变更记录

| 日期 | 变更 |
|------|------|
| 2026-08-08 | 建立 tracker;登记 B01-B23。修复并验证:B01 出生宽限 / B02 碰撞+视线+子弹+家具 / B03 走门切房 / B04 暂停 UI / B05-B10 低优先级 / B12-B13 文档同步 / B22 输入静默丢失 / B23 投掷原地捡回。B16 核实为 live 引用(WONT_FIX)。剩余 DESIGN 项:B11(房间尺寸/ambient 洗色)、B14(死亡保留装备)、B15(冷开场) |
| 2026-08-08 | 视觉大修 B24-B28:去伪光(删 addLampGlow)→ 装饰灯走真 RC;光半径/强度/ambient/lightScale 重定档(RC 全关 5 → 开光 48,全屏过曝消失);overlay 像素取整;walk 4 帧 + attack 突刺 + death 帧显示;scanlines 降噪。新增 scripts/visual-check.mjs 视觉回归(截图 + RC 状态 + console 错误)。playtest.simflow 测试脚本修复(远程武器需 F 切换 + 无限弹药注入,游戏逻辑未改)。blindside 评审 → docs/design/06-blindside-lessons.md + B29 待决提案。验证:tsc ✅ / build ✅ / playtest 9/9 ✅ |
| 2026-08-09 | B30 关卡设计工作流:md 蓝图(docs/levels/*.md)→ scripts/level-design.mjs(尺寸/边界/家具重叠/P→D 可达/LOS 提醒)→ 生成 RoomLayout TS → 合入 missions.ts → playtest 回归。Room1 重设计(12×9 S 型流线,出生视线遮挡,2 油灯 + 霓虹真 RC 光),collision/move 场景改为布局无关。图片生成任务清单 docs/design/07-sprite-gen-tasks.md 已发出等待回图。验证:tsc ✅ / build 待跑 / playtest 9/9 ✅ |
| 2026-08-09 | B31 文档同步:07 调色板改为"核心 8 色硬约束 + TDD §4.4.8/05 §3 全表引用";BOSS 回到 16×16;05 §2.2 同步代码(walk 4 帧 @6fps + 突刺);8 方向帧边界明确为 M4.6/M5 升级。登记 B32(军绿色值二选一,待设计定稿) |
| 2026-08-09 | B32 定稿:02 §4.1 敌人四行配色同步到代码/05(军绿 `#5a6352`、警蓝 `#2a2f3a`、风衣米色 `#c8b898`、BOSS 黑大衣 `#1e1c24`);TDD 不涉及(角色局部色未进 §4.4.8 常量表) |
| 2026-08-09 | B33 重置:关卡 / 场景 / 移动逻辑移除并归档 `_archive-2026-08-09/`;GameEngine + Simulation 最小 stub,app = 标题壳(无任务 / 无场景 / 无移动)。归档内容可整体恢复;GDD §6.3 / TDD §4.4.5 的关卡规格仍在,待后续决定是否同步清理 |
| 2026-08-09 | v3 重冻结(评审入档):GDD §0.5 + TDD §0.1 + MVP-PLAN v3 重切;B11/B14/B15/B29 定稿;07 加 §6 敏感度人审门;03 加 1937 声景;M1 = 命题证明范围(1 房 / knife / 1 敌 / 光暗机制,先无 RC 基线) |
| 2026-08-09 | v3.1 BLINDSIDE 整合:B29 ADOPTED;新增 B34(光下无敌/暗处可杀)+ B35(拆灯)+ B36(巡逻手电 `flashlight_patrol`)+ B37(AimFocus/ReloadIndicator)+ B38(面具 6→9 + lampmaker 提前 ship)+ B39(RC lightField 联动);权威规范 [docs/design/09-blindside-integration.md](docs/design/09-blindside-integration.md);GDD §12 / TDD §4.6-§4.7 + §15.3-§15.4 + MVP-PLAN M1.0 spike 同步入档 |
| 2026-08-09 | M1.0 spike Day 1:`core/world/lightField.ts` + `flashlight_patrol` archetype 数据落码(tsc 0 error;lightField mock 3/3 PASS);09 §8.2/§12 对齐 GDD v3(任务 1+4 / 像素锚定 viewport / C.A.T 修正);Day 2-3 待最小垂直切片重建 |
