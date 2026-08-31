# 20 — Ch07 贵人系统 (Mentor System) · v3.0 plan

> 下一阶段（M2）设计契约。范围限定在 intro scene（校园区 / Web 2.0 / 17 周 / 2 出身），不扩散到多时代、多区域、Token 商业化。

## 0. 结论先行

**Ch07 = 把当前「单个贵人办公室 beat」系统化成 PDF 标注的完整贵人系统。** 补 3 个缺口：**A 接住质量**（听懂随认知缩放）、**B 觉醒 3 层级**（微/中/大）、**C 觉醒双面性**（胜利后带代价）。付费贵人与贵人流转延期 —— Token 计费属商业模式承重墙⑥、多时代切换属数据冻结，都不在 intro 范围。

成功标准：3 个机制在 sim + UI 都有确定性实现；tsc/build/现有探针/浏览器全绿；每条机制锚定 PDF 行（§1）。

## 1. 标准锚定（PDF）

Ch07 的章节正文不存在于任何 PDF，但贵人系统的机制分散在 3 份 PDF，可落地：

| 机制 | PDF 锚点 |
|---|---|
| 觉醒流程 5 步 | ch01-ch02：看见 → 走到 → 掷骰子 → 接住 → 跃迁 |
| 免费 / 付费贵人 | outline 承重墙④：免费 5-15%（公开课偶遇/图书馆邻座/社团学长/打工好老板，质量中等碎片化）；付费 50-80%（私人导师/付费社群/高端沙龙/MBA 预科/私董会，质量高完整方法论） |
| 掷骰修正因子 | outline 承重墙④：出身+时代 → 看见谁；体力/心态 → 接住（状态差 −2 接不住）；**已有认知 → 听懂质量（认知低听懂 30%，认知高听懂 80%）** |
| 觉醒 3 层级 | ch04-ch05 §5.7：🌱微觉醒 30%/回合（出身无关，小知识）/ 🌳中觉醒 10%/回合（需贵人掷骰，方法论/长期友谊）/ 🌲大觉醒 2-3%/回合（连续成功+状态达标，圈层跃迁/命运改写） |
| 觉醒双面性 | ch04-ch05 §5.7：好处（地图隐藏格全解锁 / 信息流加挂 / 出身 debuff 衰减 30% / 掷骰 +1 永久 / AI 教练高级模式）；**代价（新期待压力 体力 −5/回合 / 信息流维护费 20 Token/季 / 旧圈层贬低 心态 −5 / 觉醒后崩盘 debuff 翻倍）** |
| 奥卡姆剃刀 | outline：不养官方导师、不做评委席位（导师评委体系用 KOL 联名包替代）—— 排除"官方付费导师"路线 |

## 2. 现状（代码原语）

| 已实现 | 代码锚点 |
|---|---|
| 贵人办公室（免费贵人 cell） | `src/core/data/cells.ts`（mentor） |
| 免费命中概率 per 出身 | `src/core/constants.ts:91-96` `ORIGIN_MENTOR_FREE_HIT_PROB`（town 0.1 / urban 0.17 / overseas 0.23 / dynasty 0.3） |
| 信任开关（有能力 × 对口 = 90%） | `src/core/constants.ts:128` `MENTOR_TRUST_HIT_PROB` + `src/core/simulation/Simulation.ts:222` `mentorTrustedFor` |
| 贵人好感（+12%/点，cap 4） | `src/core/constants.ts:50-51` + `Simulation.ts:385,414` |
| 4 人格（随选方向变化） | `src/core/data/locationEvents.ts:304` `MENTOR_EVENTS_BY_TRACK` |
| 换向（一次改押 AI） | `Simulation.ts:533-534` retrack |
| 微觉醒（30%/回合） | `Simulation.ts:615` `rand() < 0.3` |
| 大觉醒（= mentor_hit 胜利，解锁金融世家） | `mentor_hit` → `awakened` + `financeDynastyUnlocked` |

## 3. 缺口（Ch07 要补的）

| 缺口 | PDF 锚点 | 现状 |
|---|---|---|
| **A. 接住质量** | outline:326（认知低听懂 30% / 高 80%） | mentor hit 是二元的，payoff 不随认知缩放 |
| **B. 觉醒 3 层级** | ch04-ch05:584-607（微/中/大） | 只有 微（30%）+ 大（mentor_hit 胜利），缺 中觉醒（方法论/长期友谊） |
| **C. 觉醒双面性** | ch04-ch05:577-581（觉醒代价） | 金融世家 restart 只有好处（资源高），没有显式觉醒代价（心态 −5/回合等） |

## 4. 设计（intro scene 范围）

### A. 接住质量（cognition-gated comprehension）

mentor office hit 的 payoff 按认知分两档，复用现有 `COGNITION_INFO_THRESHOLD = 60`：
- 认知 < 60：听懂 30% → 小认知加成（碎片化启发）。
- 认知 ≥ 60：听懂 80% → 大认知加成（系统化方法论）。

实现接缝：mentor hit 的 `delta.cognition` 在结算时乘一个「听懂系数」（0.3 / 0.8）。**组合顺序**：骰子 tier factor（`scaledStats` × tier）先算，听懂系数后乘 —— 即 `cognitionDelta = round(base × originCoefficient × tierFactor × comprehension)`。新系数在 `Simulation.chooseEvent` 的解析管道里加，**不动 rand 流**（0 新随机源）。**平行 twin**：听懂系数同样按 twin 自己的认知算（与 `Simulation.ts:220-221`「信任按 twin 自己的认知」一致）。

### B. 觉醒 3 层级

- 🌱 微觉醒（现有，30%/回合，出身无关）：小洞察 toast（`Simulation.ts:615`）。
- 🌳 中觉醒（NEW）：mentor hit 但未达大觉醒门槛 → 得一个持久「方法论」加成（invest 建议 fidelity +1 档）或「长期友谊」（mentorFavor +1）。
- 🌲 大觉醒（现有 = 信任时 mentor_hit 胜利）：圈层跃迁，解锁金融世家。

**设计决策（需你拍板）**：当前 `mentor_hit` 一律 = 大觉醒（胜利），任何一次命中都直接通关（`Simulation.ts` finishCoach 里 `mentorHitFromChoiceId → awakened` 无条件）。Ch07 把它分层：
- 中觉醒 = **未信任**（认知 < 60 或方向非 AI）时的 mentor hit —— 不胜利，只给方法论（建议 fidelity +1 档）+ 好感 +1。
- 大觉醒 = **信任**（认知 ≥ 60 + AI 对口）时的 mentor hit —— 胜利，解锁金融世家。

**为什么选前者**（而非保持 mentor_hit=胜利不变）：这更贴 PDF「大觉醒 2-3%/回合、需状态达标」的稀缺语义，也让「先堆认知 + 选 AI」成为真正的胜利路径（对齐攻略 §15），堵住「低认知 10% 侥幸命中直接通关」的洞。胜利可达性不破（认知 ≥60 + AI 后信任命中 90%）。

**契约同步（同 commit 必带）**：
- `AGENTS.md` §5 末条「mentor_hit stays the sole awakening/unlock source」→ 改为「trusted mentor_hit = 大觉醒（胜利/解锁）；untrusted mentor_hit = 中觉醒（不胜利）」。
- `TDD.md` 加 v3.0 changelog 行；`verification-report.md` 加 Ch07 章节。
- `types.ts` 头部注释「Changes require a TDD.md changelog row」触发 —— 新增 `player.lastAwakeningTier` 字段。
- 探针必须含 **trusted-hit → big/胜利/解锁** 的正向断言（防把胜利改没）。

### C. 觉醒双面性

金融世家 restart（胜利后）带显式觉醒代价：
- 新期待压力：**体力 −5/回合**（ch04-ch05:578）。
- 旧圈层贬低：**心态 −5，restart 时一次性**（ch04-ch05:580 —— 非 /回合）。
- 出身 debuff 衰减 30% + 掷骰 +1 永久已由 origin 修正体现（不重做）。

实现接缝：`finishCoach`（turn 末结算，0 rand 消耗，保确定性）；只作用真实玩家（金融世家 run），平行 twin 不带该代价。

## 5. 出范围（延期）

- **付费贵人**：PDF 用 Token 计费，Token 属商业模式承重墙⑥（intro 不接）。这是出范围的真实原因；outline:429 奥卡姆剃刀（不养官方导师/评委）只是顺带排除官方导师路线，不否决 PDF 的付费贵人设定。
- **贵人流转**（时代切换旧贵人沉睡/新贵人重掷）：需多时代，数据冻结。
- **Ch09 投资策略库**：下一章节，独立 plan。

## 6. 成功标准

1. 接住质量：mentor hit payoff 按认知分 30%/80% 两档，sim 可测。
2. 觉醒 3 层级：微/中/大在 sim 与 UI 都可区分。
3. 觉醒双面性：金融世家 restart 心态 −5（restart 一次性，旧圈层贬低）+ 每回合 体力 −5（新期待压力）。
4. 全门绿：`tsc -b --noEmit` 0 error + `npm run build` + 现有探针不回归 + 浏览器 0 console error。
5. 每条机制锚定 PDF 行（§1）。

## 7. Test plan（red-green）

新增 `scripts/mentor-probe.mjs`（走 `window.__sim.checks` 驱动纯 sim，不经 UI 动画，同 `showcase.mjs` §contract 风格）：

- **RED · 觉醒 3 层级**：断言 mentor hit 结果区分 micro/mid/big —— 现在只有 micro + 大胜利，断言 mid 存在会失败。
- **接住质量**：构造认知 50（听懂 30%）vs 认知 70（听懂 80%），断言 mentor hit 的认知加成 `cognitionDelta` 不同（70 > 50）。
- **双面性**：金融世家 restart 后，断言 心态 75→70（一次性，旧圈层贬低）+ finishCoach 每回合 体力 −5（新期待压力）；小镇做题家 restart 无该代价（负例）。
- **不新增随机源**：所有断言走既有 rand 流（确定性契约不破）。

运行：`npm exec --offline --yes --package=playwright -- node scripts/mentor-probe.mjs`（dev server 在 5185）。
