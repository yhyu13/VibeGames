# 27 — 噪音广播与警报传播系统(v3.6,2026-08-10)

关联:[26-rc-sprite-visual-standard.md](26-rc-sprite-visual-standard.md) §4(扩散环渲染分工);实现:`src/core/simulation/Simulation.ts`、`src/core/world/lineOfSight.ts`、`src/core/constants.ts`。

## 1. 刺激种类与半径

| NoiseKind | 触发源 | 半径 | 备注 |
|---|---|---|---|
| `gunshot` | LMB 开火(`fire()`) | 8u(`GUNSHOT_NOISE_RADIUS`) | 锁定决策:响枪警示全房,朝**噪音位置**起疑,不自动锁定玩家 |
| `lamp_smash` | RMB 砸灯(`attack()` 命中灯) | 6u(`LAMP_SMASH_NOISE_RADIUS`) | 攻击光源会暴露行踪 |
| `shout` | 敌人进入 alert(`raiseAlert()`) | 6u(`SHOUT_NOISE_RADIUS`) | **警报传播**的唯一通道 |
| `footsteps` | 冲刺移动 | 4u(`FOOTSTEP_NOISE_RADIUS`) | 每 0.25s(`FOOTSTEP_INTERVAL_S`)一次;慢走无声 |
| `clatter` | 掷枪落地/撞墙停住 | 4u(`CLATTER_NOISE_RADIUS`) | 每把掷出武器只响一次 |

扩散环可视化:`SimSnapshot.noises: NoiseStimulus[]`,ttl 0.3s(`NOISE_RING_TTL_S`),仅作玩法提示(2D 描边环,不是光,见 doc-26 §4)。**听觉判定在发射 tick 立即结算**,环只是事后可视化。

## 2. 穿墙规则(可阻挡性)

统一工具 `hasLineOfSight(map, a, b, mode)`(Amanatides & Woo 网格 DDA,跳过起点格、检查终点格):

| mode | 阻挡瓦片 | 消费方 |
|---|---|---|
| `'vision'` | `#` 墙 + `X` 掩体(`blocksBullet`) | 手电锥检测、子弹/掷物扫掠 |
| `'sound'` | 仅 `#` 墙(`isWall`) | 一切听觉结算 |

口诀:**沙袋挡眼不挡耳,砖墙全挡**。

## 3. 听觉结算(`emitNoise`)

发射时对所有存活敌人:宽限期归零(B01:出生宽限内听觉关闭)→ `dist ≤ radius` → `'sound'` LOS 通畅 → `patrol → suspicious`,`lastSuspiciousPosition = 噪音位置`。suspicious 敌人以巡逻速度走向该点,到位(<0.3u)驻足凝视。

## 4. 警报传播

`raiseAlert(foe)`:发 `enemyAlert` 事件 + 在 `foe.position` 发 `shout`(r6)。听到呼叫的敌兵按 §3 规则起疑并走向呼叫点——连锁只有一级(shout 的 hearer 只到 suspicious,不再二次呼叫),不会雪崩。

## 5. 不变量与守卫

- **单一警告所有者(R1)**:任意时刻只有一个敌人持有 `warningEnemyId`;近战/子弹/掷物三处击杀点都调 `clearWarningIfOwner(foe)`,另有兜底——持有者在 0.55s 警告窗内被杀必须清窗,否则幽灵警告继续倒计时杀玩家。
- **宽限期静音**:进房(`loadRoom`)重置 `spawnGraceRemaining`,期间听觉结算直接 return。
- **起疑不连锁**:只有 `shout` 会传播;枪声/砸灯/脚步只影响听得到的那一个。
- 渲染:`snapshot.awareness` = 全体存活敌人的最大严重度(单敌字段保留,HUD/store 零改动)。

## 6. 验收位置

- `scripts/combat-loop-check.mjs`:footstep-hearing、los-wall-rules、shout-propagation(含 `#` 墙阻断用例)。
- `scripts/hotline-e2e.spec.js`:`noise broadcast: gunshot suspicion and alert shout propagation`(注入第二敌,克隆体重置 `state/awareness/lastSuspiciousPosition`,防把起疑态复制进注入体)。
