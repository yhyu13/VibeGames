# BLINDSIDE Vibe-Coding Bootstrap Pack

> **目的**:把《茫室》/ BLINDSIDE 这 21 天 jam 的设计哲学,变成一个**未来 vibe coding 项目的可复用种子包**。
> 包含 5 段:**用户输入模板 → 引导 prompt → 冻结设计契约(TDD) → 坑位表 → 验收清单**。
> 写代码的人/AI 拿到这个包,可以在 1-2 天内搭出一个原型雏形;但要做出"游戏灵魂",仍然需要 Frank 那样的美术 + Blasin 那样的设计直觉。

---

## Part 1:用户输入模板(USER → AI 的第一句话)

下面这段是**一个人想做一个 BLINDSIDE 风格游戏时,应该写给 Cursor/Codex 的自然语言 prompt**。可以直接 copy-paste,也可以当 prompt-engineering 范例看。

```
我想做一个 21 天 game jam 风格的俯视角射击游戏,核心机制是:
"敌人在光照下无敌,玩家只能在阴影中击杀它们"。

团队:我(策划/程序) + 1 个美术 + AI 工具链。
引擎:Unity 2023+ URP,目标是 WebGL / Windows / Mac 三平台。
节奏:21 天做完就赢,不追求商业品质,追求"有趣且完整"。

强制要求:
- 所有 C# 代码用 Cursor + Codex 写,我不手写
- 所有音频用 ElevenLabs 批量生成
- 美术我找人画好,我负责接入
- 必须是"短周期",所以代码体积控制在 10000 行以内,WebGL 包 100MB 以内

请先:
1. 在 /docs/tdd.md 给我一个冻结设计契约(类清单 + 公开 API + 事件表)
2. 在 /Assets/Scripts/ 下生成脚手架(空实现 + TODO 标记)
3. 不要立刻填实现细节,等我确认 TDD 之后再继续
```

**为什么这样写**(经验):
- ✅ **"21 天"** → 锁定节奏,防止 AI 帮你做长周期方案
- ✅ **"我是策划/程序"** + **"AI 工具链"** → 明确分工,防止 AI 越界做设计
- ✅ **"先 TDD 再写代码"** → 避免"AI slop 时刻"(参考 devlog)
- ✅ **"先确认 TDD 之后再继续"** → 给人类检查点,不让 AI 一路狂奔
- ❌ 反例:"帮我做一个游戏,敌人在光照下无敌" —— 太短,AI 不会想到"美术何时介入"这种问题

---

## Part 2:从用户输入到 TDD 的引导 Prompt(meta-prompt)

这是给 **Cursor/Codex 的"自我 prompt"**,塞进项目根目录的 `.cursor/rules/blindside-bootstrap.mdc` 或 `.codex/system.md`,让 AI 在每次新对话时自动加载。

```markdown
# Role
你是这个项目的"首席 vibe coder"。你的工作是:
1. 读 /docs/tdd.md(如果存在,遵守它)
2. 如果 /docs/tdd.md 不存在,生成它
3. 读 /docs/traps.md(AI slop 反模式清单,绝对不要重蹈)
4. 读 /docs/asset-pipeline.md(美术资产命名/导入规范)
5. 写代码,每写完一个模块就更新 tdd.md 里的"已实现"标记

# Hard rules
- 禁止生成我列在 traps.md 里的反模式
- 禁止绕过 TODO 标记直接填实现
- 禁止改 /Assets/Art/ 下的任何文件(那是美术负责的)
- 禁止安装 / 修改 package.json 之外的依赖,新依赖必须先问

# Communication style
- 中文回答
- 每次回答开头用一行摘要
- 修改完代码用一句话告诉我改了哪几个文件
- 遇到歧义先问,不假设
```

**为什么这样写:**
- 强制 AI **读 TDD 再写代码**,打断"AI 一路狂奔"的本能
- **traps.md 是关键资产** —— 把"AI slop 时刻"变成显式禁忌
- 明确分工边界(美术资产由美术负责),防止 AI 越界

---

## Part 3:TDD-DRAFT.md(冻结设计契约)

> 这是**根据 devlog + itch 元数据 + 截图 + WebGL artifact 反推的设计契约**。不是源码反编译(IL2CPP 不可读),是基于公开信息能合理推断的最高保真版本。
> 未来做类似项目,直接拿这份当起点。

### 3.1 范围与非目标

**In scope:**
- 单人俯视角射击(键盘鼠标 + 手柄)
- 光照/阴影下的"敌我击杀不对称"机制
- 传感器预判击杀(玩家投放置 sensor,预判敌人行进路线开火)
- 4-6 个关卡,40 分钟流程
- 2 类敌人(crawler + gunner)
- 基础游戏 juice(顿帧/震屏/音频 ducked BGM)

**Out of scope (本期不做):**
- 多人联机
- 难度选项 / 排行榜
- 成就 / 解锁内容
- Modding 支持
- 移动端触屏 UI(虽然有 Android 包,但本期只承诺桌面/手柄)

### 3.2 核心循环(One-line loop)

> **进入光照区 → 敌人被光照保护(无敌) → 玩家用 sensor 标记预测路径 → 玩家绕到阴影侧 → 开火击杀 → 持续推进**

### 3.3 模块清单(Unity 工程结构映射)

```
Assets/
├── Scripts/
│   ├── Core/                          # 平台无关的纯逻辑
│   │   ├── LightInvulnerabilitySystem.cs   # 光照无敌查询
│   │   ├── SensorField.cs                  # 传感器:范围 + 频率检测
│   │   ├── PredictionPathfinding.cs         # 敌人路径预测
│   │   └── GameJuiceEvents.cs              # juice 事件总线
│   ├── Enemies/
│   │   ├── EnemyBase.cs                    # 抽象基类
│   │   ├── CrawlerAI.cs                    # 地面爬行型
│   │   ├── GunnerAI.cs                     # 持枪型(智能,会寻路/搜索)
│   │   └── EnemyPerception.cs              # 视觉 + 听觉(枪声吸引)
│   ├── Player/
│   │   ├── PlayerController.cs              # WASD + 瞄准 + 射击
│   │   ├── WeaponSystem.cs                 # 枪 / sensor 切换
│   │   └── FootstepAudio.cs                # 立体声脚步声
│   ├── Level/
│   │   ├── LightVolume.cs                  # 标记"光照区域"的多边形
│   │   ├── Checkpoint.cs                   # 重生点
│   │   └── LevelStreaming.cs               # 小关卡加载
│   ├── Audio/
│   │   ├── BGMSystem.cs                    # intro/loop/outro 三段式
│   │   ├── CombatAudioMix.cs               # 战斗中 BGM 增强
│   │   └── SFXCatalog.cs                   # 11Labs 生成资产映射
│   └── UI/
│       ├── DialogueUI.cs                   # 对话
│       └── SensorHud.cs                    # sensor 频率可视化
├── Art/                                 # 美术资产(Frank 负责,程序不碰)
├── Audio/                                # 11Labs 生成(11Labs + Codex 集成)
└── Prefabs/                              # 预制体(参考 TDD §3.5)
```

### 3.4 公开 API(C# 类签名草案)

> **签名风格**遵循:每个类有 OnEnable/OnDisable 生命周期,有 Tick(dt) 入口,有事件订阅接口。

```csharp
// === Core/LightInvulnerabilitySystem.cs ===
public sealed class LightInvulnerabilitySystem
{
    // 单例(SimpleServiceLocator 模式,不用 DI 框架,避免 CodeX 卡住)
    public static LightInvulnerabilitySystem Instance { get; }

    public bool IsPositionInLight(Vector3 worldPos);
    public bool IsEnemyVulnerable(EnemyBase enemy, Vector3 attackPos);
    public event Action<EnemyBase, bool> OnVulnerabilityChanged;
}

// === Core/SensorField.cs ===
public sealed class SensorField : MonoBehaviour
{
    public float Radius { get; set; } = 8f;
    public int EnemiesInside { get; private set; }
    public float CurrentFrequency { get; private set; } // 0..1
    public bool IsPlaced { get; private set; }
    public bool IsPickedUp { get; private set; }

    public event Action<int> OnEnemyCountChanged;
    public event Action<float> OnFrequencyChanged;
    // Frequency 公式: lerp(0.4, 1.0, EnemiesInside / 4),并加 0.1 噪声
}

// === Enemies/EnemyBase.cs ===
public abstract class EnemyBase : MonoBehaviour
{
    public enum State { Idle, Patrol, Search, Attack, Dead }
    public State CurrentState { get; protected set; }

    public Vector3 Velocity { get; protected set; }
    public float HearingRange { get; set; } = 12f; // 听到枪声
    public float VisionRange { get; set; } = 6f;   // 看到玩家

    public abstract void OnHearNoise(Vector3 noisePos, float intensity);
    public abstract void OnSeePlayer(Vector3 playerPos);
    public abstract void OnTakeDamage(float amount, Vector3 hitFrom);
}

// === Enemies/CrawlerAI.cs === (简单)
public sealed class CrawlerAI : EnemyBase
{
    // 行为:看到玩家 → 加速冲过来,否则就近巡逻
    // 不主动寻路,没有"search"状态
}

// === Enemies/GunnerAI.cs === (复杂)
public sealed class GunnerAI : EnemyBase
{
    public float PathDeviation { get; set; } = 0.4f; // 路径被干扰后偏移量
    public float SearchDuration { get; set; } = 4f;  // 找不到人就回岗
    // 行为:看到玩家 → 攻击;被打断 → 偏移路径继续追;找不到 → search → patrol
    // 听到枪声(Noise 事件)→ 朝枪声方向走(不是子弹落点)
}

// === Core/PredictionPathfinding.cs ===
public static class PredictionPathfinding
{
    // 玩家瞄准时实时绘制"如果我现在开枪,敌人 0.5s 后会在哪"
    public static Vector3[] PredictPath(EnemyBase enemy, float lookaheadSeconds = 0.5f);
    public static float TimeToReach(EnemyBase enemy, Vector3 target);
}

// === Player/PlayerController.cs ===
public sealed class PlayerController : MonoBehaviour
{
    public enum WeaponMode { Gun, Sensor }
    public WeaponMode CurrentWeapon { get; private set; }
    public event Action<WeaponMode> OnWeaponSwitched;
    public event Action<Vector3> OnFired;       // 枪声事件(供 EnemyPerception 订阅)
    public event Action<Vector3> OnSensorPlaced;
}

// === Audio/BGMSystem.cs ===
public sealed class BGMSystem : MonoBehaviour
{
    public void PlayIntro();        // 关卡开始
    public void PlayLoop();         // 正常游玩
    public void OnCombatStart();    // 触发 duck + bass boost
    public void OnCombatEnd();      // 还原
    public void PlayOutro();        // 关卡结束淡出
}
```

### 3.5 事件表(Event Catalog)

| 事件 | 触发方 | 订阅方 | 参数 |
|---|---|---|---|
| `OnVulnerabilityChanged` | LightInvulnerabilitySystem | GunnerAI(切换攻击策略) | EnemyBase, bool |
| `OnEnemyCountChanged` | SensorField | SensorHud(显示人数) | int |
| `OnFrequencyChanged` | SensorField | SensorHud(频率条) | float |
| `OnWeaponSwitched` | PlayerController | UI, Audio(switch 音效) | WeaponMode |
| `OnFired` | PlayerController | EnemyPerception(枪声传播) | Vector3 |
| `OnSensorPlaced` | PlayerController | SFXCatalog(放置音效) | Vector3 |
| `OnCombatStart/End` | PlayerController | BGMSystem, CameraShake | — |
| `OnCheckpointReached` | Checkpoint | SaveSystem | Vector3 |
| `OnNoiseHeard` | EnemyPerception | EnemyBase.OnHearNoise | Vector3, float |

### 3.6 常量表(Constants — Magic Numbers 集中地)

| 名称 | 默认值 | 备注 |
|---|---|---|
| `SENSOR_RADIUS` | 8m | 覆盖一个房间 |
| `SENSOR_MAX_OVERLAP` | 4 | 同时检测 4 个敌人为频率峰值 |
| `GUNNER_HEARING_RANGE` | 12m | 听到枪声 |
| `GUNNER_VISION_RANGE` | 6m | 看到玩家 |
| `CRAWLER_VISION_RANGE` | 4m | crawler 视野更短 |
| `SEARCH_DURATION` | 4s | 找不到人就回岗 |
| `PREDICTION_LOOKAHEAD` | 0.5s | 准星预测时间 |
| `CHECKPOINT_GRACE_PERIOD` | 2s | 玩家死亡前 2s 内可撤回 |
| `BPM_DUCK_INTENSITY` | 0.6 | 战斗中 BGM 音量降到 60% |
| `BPM_BASS_BOOST_HZ` | 80 | 低频提升中心 |

### 3.7 关键设计决策的来源溯源

| 决策 | 来源 | 原文(摘) |
|---|---|---|
| 光照无敌机制 | devlog | "Frank:『如果敌人就是在光照中杀不死的话』" |
| Sensor 不自动回收 | itch 评论 | "they wouldn't automatically come back to you once a level was done" |
| 枪声吸引(不按落点) | itch 评论 | "they would be attracted to where shots were fired rather than where they landed" |
| BGM 三段式 | devlog | "把 BGM 做出 intro / loop / outro 三段式响应" |
| 战斗中 BGM 增强 | devlog | "BGM 在战斗中提升音量和低音" |
| 双声道脚步声 | devlog | "给敌人加上脚步声双声道系统" |
| 路径被干扰后偏移 | itch 评论 | "their patching would adjust just slightly if you pulled them off course" |
| crawler vs gunner 分级 | itch 评论 | "The crawlers on the floor felt more primitive...guys with guns actually felt like they were smart" |

---

## Part 4:陷阱清单 / Anti-Pattern List(从"AI slop 时刻"提炼)

> 写给未来 vibe coder,以及未来的 AI 助手。**违反任一条 = 重蹈覆辙**。

### 4.1 🚫 时间管理陷阱

| 陷阱 | 反模式 | 正确做法 |
|---|---|---|
| **AI slop 阶段不自知** | 机制全跑通就觉得"剩 polishing 了" | 引入**第二个人试玩**(必须是陌生人,不是作者自己)做 dynamics 验证 |
| **美术太晚介入** | "代码稳定了再让美术进来" | **第 8 天/总进度 40% 强制美术接入**,即使代码还乱 |
| **AI 一路狂奔** | 让 Cursor 一次性生成 10 个模块 | **每个模块完成后必须 tsc/typecheck 通过,再开下一个** |
| **profiling 太晚** | jam 最后一天才发现掉帧 | 性能监控脚本在 day 1 就接进去 |

### 4.2 🚫 设计哲学陷阱

| 陷阱 | 反模式 | 正确做法 |
|---|---|---|
| **机制完成 ≠ 游戏好玩** | 把 TDD 里所有 mechanic 都勾上就觉得赢了 | **dyncamics 需要试玩迭代,mechanics 只是骨架** |
| **AI 给的设计太"工整"** | "完美对称的难易度曲线" | **故意保留一点不对称**(反 Alan Wake),让设计有"奇"的味道 |
| **代码美学凌驾游戏美学** | "这个 if-else 我能用 polymorphism 重构" | **ship first, refactor later**,21 天里不要花 1 天重构 |
| **被 AI 说服放弃自己的直觉** | "AI 说这个机制太复杂,建议删掉" | **保住核心 yureka 时刻的机制**,它是 game 的灵魂 |

### 4.3 🚫 工作流陷阱

| 陷阱 | 反模式 | 正确做法 |
|---|---|---|
| **用错 Cursor/Codex 角色** | 让 Cursor 跑长时间 agent 任务 | Cursor = 交互式驾驶舱;**Codex = 后厨批处理** |
| **上下文溢出** | 一次塞 5 个文件给 AI | **单文件/单模块粒度**,Codex 每个 task 一个独立 context |
| **AI 写完不读** | "我先 accept 一会儿再 review" | **每段 AI 产出必须 review diff**,因为 AI 会偷偷加 `using` 或死代码 |
| **音频 BGM/SFX 边界不清** | 写"做个 bgm"塞给 AI | 明确写"**只生成 5 条短 SFX,不要生成 BGM**"——边界清晰才能事后加 BGM |
| **没把 BGM 排除在 SFX 任务外** | (反例:Blasin 意外发现) | 显式"**BGM 我会单独提需求,这次先只做 SFX**" |

### 4.4 🚫 平台/构建陷阱

| 陷阱 | 反模式 | 正确做法 |
|---|---|---|
| **WebGL 包体积爆炸** | 不限制单资源大小 | 贴图压缩到 1MB 内,音频总时长 < 10 分钟 |
| **IL2CPP 编译缺符号** | 出了问题 stack trace 看不到函数名 | **保留 dev build,生成 symbols.zip** 供事后查 bug |
| **Brotli 压缩漏配** | 上线后所有用户报"corrupt data" | 服务器必须正确返回 `Content-Encoding: br` |
| **手柄/键鼠双输入混用** | 玩家切输入时状态丢失 | 用 Unity 新 Input System,所有 input 都走统一 action map |

---

## Part 5:21 天 Vibe-Coding 验收清单(Checklist)

> 21 天结束时,每一条打勾 = 项目及格。可以给"测试者"做 QA 时用。

### Day 0-2:脚手架
- [ ] TDD 冻结(类清单 + API + 事件表 + 常量表)
- [ ] traps.md 已写(至少 10 条,每条带反例)
- [ ] AI meta-prompt(Part 2)已塞到 `.cursor/rules/`
- [ ] Unity 工程跑通:WebGL build 能输出"Hello World"到 itch
- [ ] 11Labs API key 测试通过,能生成一条 sample SFX

### Day 3-7:核心机制
- [ ] LightInvulnerabilitySystem:在 editor 里能 toggle 看到光照区变红
- [ ] 玩家枪打到光照区 = 敌人不掉血 + 弹道粒子变灰
- [ ] 玩家枪打到阴影区 = 敌人掉血 + 标准命中反馈
- [ ] Sensor 投放 → 频率条工作 → 拾回 → UI 反馈
- [ ] 至少 1 个 crawler + 1 个 gunner 能 spawn + 巡逻

### Day 8-12:美术 + 关卡
- [ ] 美术**已经接入**(强制 deadline,不能拖)
- [ ] 至少 1 个完整关卡:玩家从出生到 boss
- [ ] 4 种 r iso 色块配色(关卡切换有视觉区分)
- [ ] 死亡/血迹用艺术化图样(参考 devlog 的"靶环")

### Day 13-17:dynamics 调试
- [ ] 邀请**第二个人**试玩一关,记录他们 30s 内会不会"摸到玩法"
- [ ] BGM 三段式接好(intro/loop/outro)
- [ ] 战斗中 BGM duck + bass boost 测试
- [ ] 双声道脚步声测试(戴耳机能听出方向)
- [ ] 顿帧/震屏/时间缩放在击杀时反馈

### Day 18-20:打磨
- [ ] 全部 SFX 替换为 11Labs 成品(不用 placeholder)
- [ ] 全部关卡通过"陌生人测试"(不是团队成员)
- [ ] 错误状态/边界情况(玩家卡墙、卡 sensor、Boss 阶段切换)
- [ ] 性能 profile:WebGL 1080p 30fps 稳定

### Day 21:ship
- [ ] itch 页面写好(标题 + 截图 + 描述 + 致谢)
- [ ] devlog 写好(参考 BlasinRee 的写作风格,**不震惊体**)
- [ ] 所有源码 commit + 打 tag `v1.0-jam`
- [ ] 备份源码到 Notion/Google Drive(防止本地丢失)
- [ ] **给团队买个 pizza 庆祝**

---

## Part 6:可复用资产总结

| 资产 | 适用场景 | 风险 |
|---|---|---|
| **用户输入模板**(Part 1) | 任何"AI 协作 + 短周期"项目 | 如果项目周期 > 1 个月,需要重写 |
| **meta-prompt**(Part 2) | 任何 Cursor/Codex 项目 | 不同项目需要重写 rules 路径 |
| **TDD-DRAFT**(Part 3) | 任何俯视角射击 / 潜行游戏 | 数值/常量需要根据具体游戏调 |
| **traps 表**(Part 4) | 任何 jam 项目(不限于游戏) | 永久有效,所有 AI 协作场景都该有 |
| **21 天验收清单**(Part 5) | 任何 21 天 / 14 天 / 7 天 jam | 周期不同时压缩/扩展 |

---

## 附:为什么这份包的"AI slop 时刻"洞察是永久资产

> 这是整理者(我)对原 devlog 第 5 段的二次消化。Blasin 原文:
>
> *"我从未在项目制作中如此绝望,如果是我一年前的代码能力,面对这种高沉没成本,我大概会直接放弃。但今日有 AI 做靠山让我抱着大改的心态再试试。"*

**抽象出来的人类心理模型:**
```
旧模式(无 AI):
  "mechanic 卡住 → 我不会 → 我放弃"
新模式(有 AI):
  "mechanic 卡住 → AI 帮我尝试 10 种方案 → 我选一种继续"
  ↑ 但如果"AI 帮你 10 种方案"全是垃圾呢?
  → 就掉进"AI slop 时刻"
  → 解药: 靠设计师直觉(Frank/Blasin 的那种)判断"哪种方案值得继续"
```

**所以**:**AI 是杠杆,不是替代**。杠杆越长,需要的支点(人类设计直觉)越稳。这份 bootstrap 包能给杠杆,但支点要团队自己磨。

---

**整理人**:Mavis
**整理日期**:2026-08-08
**溯源**:基于 devlog https://www.gcores.com/users/32011 + itch https://blasin.itch.io/blindside + WebGL build 反推,**无任何对 IL2CPP 编译产物的反编译尝试**
