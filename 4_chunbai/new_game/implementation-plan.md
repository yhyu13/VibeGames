# 4_chunbai 实施计划 — 移除 PVP / 全 3D 飞行 / 视觉对齐原作

> 目标：本计划由实施 agent 执行（当前会话权限仅允许文档）。前置阅读：`verification-report.md`（缺陷证据）、`design-doc.md`（已同步的新设计）、`reference/d.md`（原作操作）。
> 验证门禁：`npm run build`（`tsc -b && vite build`）必须通过；浏览器冒烟；60s PVE 实测 score > 0。

## 变更总览

1. 移除 PVP 1v1 + 本地分屏 + 模式选择界面 + 未实现的技能系统（单玩家化）
2. 全 3D 飞行移动（WASD + Shift/Ctrl 垂直、速度矢量、空格助推 / 双击空格闪避 / E 急停）
3. 操作映射：空格按住助推 + 双击闪避（含无敌帧），`fireRate` 生效，屏幕空间瞄准（含垂直，修复 Boss 打不中）
4. 视觉对齐原作：纯白机甲、太空背景（地球/太阳/星野）、移除地面网格与雾
5. 遗留问题见文末（不在本次范围）

---

## 1. `src/types.ts`

- `PlayerState`：删除 `skillCooldowns`、`shieldTimer`、`slowTimer`、`boostTimer`、`warpTimer`（引擎不再使用）。
- `GameState`：
  - `screen: 'menu' | 'pve' | 'pause' | 'result'`（删除 `'modeSelect'`、`'pvp'`）
  - `gameMode: 'pve' | null`
  - 删除 `result`、`p1Wins`、`p2Wins`、`matchTime`
- `InputState`：删除 `skill1/skill2/skill3`；新增 `brake: boolean`、`dodge: boolean`；`up/down` 语义改为「Shift/Ctrl 垂直升降」。最终字段：

```ts
export interface InputState {
  forward: boolean; backward: boolean; left: boolean; right: boolean;
  up: boolean; down: boolean;           // Shift / Ctrl 垂直升降
  shoot: boolean;
  aimX: number; aimY: number;           // 0..1 归一化鼠标位置
  weaponSwitch: number;                 // 1-4 单次消费
  boost: boolean;                       // 空格按住 引擎助推
  brake: boolean;                       // E 急停
  dodge: boolean;                       // 双击空格 闪避冲刺（边沿触发）
  special: boolean;                     // Z 必杀（边沿触发）
  lockTarget: boolean;                  // Tab
  pause: boolean;
}
```

## 2. `src/utils/constants.ts`

- 删除：`GAME_WIDTH`、`GAME_HEIGHT`、`SHIELD_DURATION`、`BOOST_DURATION`、`SLOW_DURATION`、`SLOW_MULT`、`WARP_DURATION`、`PVP_MATCH_TIME`、`PVP_ROUNDS`、`MAX_PARTICLES`、`LOCK_RANGE`、`ENEMY_SPAWN_MARGIN`、`CRUISE_SPEED`、`CAMERA_SMOOTH`、`MINIMAP_SIZE`、`SPLIT_SCREEN_MARGIN`、`CAMERA_SPRING_DAMPING`。
- 保留：`FIXED_TIMESTEP`、`MAX_PLAYER_HP`、`MAX_SPECIAL_GAUGE`、`PLAYER_SPEED`、`PLAYER_SIZE`、`WORLD_SIZE`、`WAVE_INTERVAL`、`BOSS_WAVE_INTERVAL`、`INVULN_DURATION`、`BOOST_SPEED_MULT`、`COMBO_TIMEOUT`、`CAMERA_SPRING_STIFFNESS`。
- 改值：`CAMERA_DISTANCE` 25 → 15、`CAMERA_HEIGHT` 15 → 8。
- 新增：

```ts
export const CONTROL_K = 4;            // 速度趋近阻尼系数（1 - exp(-k*dt)）
export const BRAKE_K = 10;             // 急停阻尼系数
export const DODGE_SPEED_MULT = 4;     // 闪避冲刺速度倍率
export const DODGE_DURATION = 0.3;     // 闪避持续秒
export const DODGE_COOLDOWN = 2.5;     // 闪避冷却秒
export const DODGE_INVULN = 0.4;       // 闪避无敌帧秒
export const WORLD_SIZE_Y = 60;        // 垂直活动范围 ±60
```

> 移动模型采用「目标速度趋近」（lerp），不需要单独的加速度常量；`PLAYER_SPEED`（20）作为基础速度上限，助推时 ×`BOOST_SPEED_MULT`。

## 3. `src/store.ts`

- `defaultGame`：删除 `result/p1Wins/p2Wins/matchTime`。
- `makePlayer(id)`：删除 `skillCooldowns/shieldTimer/slowTimer/boostTimer/warpTimer`；保留 `weapons: [1, 2, 3]`。
- **单玩家化**：`players: [makePlayer(0)]`、`inputs: [makeInput()]`；`resetGame` 同步。
- `makeInput()`：删除 `skill1/2/3`，新增 `brake: false, dodge: false`。

## 4. `src/engine/InputManager.ts`

- 键位重映射（getState 内）：
  - `up: keys.has('Shift')`（**上升**）、`down: keys.has('Control')`（**下降**）
  - `boost: keys.has(' ')`（**空格按住** 助推）
  - `brake: keys.has('e')`（**E** 急停）
  - `special: keys.has('z')`（边沿触发，**Z** 必杀）
  - `pause: keys.has('Escape') || keys.has('Enter')`
  - `dodge`：**双击空格** 边沿触发
- 注意：`e.key` 对 Shift / Ctrl 返回 `'Shift'` / `'Control'`（大小写敏感），keys 集合按原样存储（不要 lowercase）。
- 边沿触发实现：`private _dodge = false; private _special = false; private lastSpaceTime = 0;`
  - `keyDown(key)`：

```ts
if (key === ' ') {
  const now = performance.now();
  if (now - this.lastSpaceTime < 300) this._dodge = true;  // 双击判定
  this.lastSpaceTime = now;
}
if (key === 'z' || key === 'Z') this._special = true;
```

  - `getState()` 中读取后清零（与 `_weaponSwitch` 同模式）。
- `keyDown` 特殊键处理：`Tab`/`Escape` 保留原大写处理；`Shift`/`Control`/`Enter` 直接存 keys（不 lowercase）。
- **删除** `createGlobalInputManager`（无调用方，GameCanvas 直接用 `engine.input`）。

## 5. `src/engine/SceneManager.ts`

- 删除 `camera2`、`renderSplit()`、`updateCamera` 的 `splitScreen/isRight` 参数。
- 新签名：`updateCamera(target: Vector3, dt: number, yaw: number)`：

```ts
updateCamera(target: Vector3, dt: number, yaw: number) {
  const desiredPos = new THREE.Vector3(
    target.x - Math.sin(yaw) * CAMERA_DISTANCE,
    target.y + CAMERA_HEIGHT,
    target.z - Math.cos(yaw) * CAMERA_DISTANCE
  );
  const smoothFactor = 1 - Math.exp(-CAMERA_SPRING_STIFFNESS * dt);
  this.camera.position.lerp(desiredPos, smoothFactor);
  this.camera.lookAt(target.x, target.y, target.z);
}
```

- **视觉改造**（constructor）：
  - `scene.background` 改 `0x05050f`；**删除 `scene.fog`**（太空无雾）。
  - **删除** `ground`（PlaneGeometry）、`grid`（GridHelper）、`renderer.shadowMap.*` 三行、`dirLight.castShadow`。
  - `camera.far` 改 `2000`。
  - 星野升级：3000 点 → 6000 点，颜色随机（白 `0xffffff` / 蓝 `0xaaccff` / 暖 `0xffddaa`），`size: 1.0`，Y 范围 `-200..400`。
  - 新增地球（白色云层感，程序化）：

```ts
// Earth — 蓝色球体 + 白色云层 + 大气辉光
const earthBody = new THREE.Mesh(
  new THREE.SphereGeometry(90, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0x2a5bd7, roughness: 1, metalness: 0 })
);
earthBody.position.set(-320, 120, -650);
this.scene.add(earthBody);
const earthClouds = new THREE.Mesh(
  new THREE.SphereGeometry(92, 24, 24),
  new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
);
earthClouds.position.copy(earthBody.position);
this.scene.add(earthClouds);
const earthGlow = new THREE.Mesh(
  new THREE.SphereGeometry(97, 24, 24),
  new THREE.MeshBasicMaterial({ color: 0x88bbff, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false })
);
earthGlow.position.copy(earthBody.position);
this.scene.add(earthGlow);
```

  - 新增太阳 + 暖光：

```ts
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(55, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xffaa44 })
);
sun.position.set(520, 320, -900);
this.scene.add(sun);
const sunGlow = new THREE.Mesh(
  new THREE.SphereGeometry(80, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xff8833, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
);
sunGlow.position.copy(sun.position);
this.scene.add(sunGlow);
const sunLight = new THREE.PointLight(0xffaa66, 1200, 2500);
sunLight.position.copy(sun.position);
this.scene.add(sunLight);
```

  - **纯白机甲**（`createPlayerMesh` 改材质色，机体贴图全为白色，点缀保持玩家色）：
    - `armorMat` color `0xf4f6fa`、`frameMat` `0xd8dce4`、`jointMat` `0xb8bcc6`、`ventMat` `0xcfd3da`、`accentMat` 保持传入 color（蓝/橙）、`accentDarkMat` = color*0.6、`glowMat` 保持。
    - 线条色 `edgeColor` 默认 `0x9999aa`、`addPanelLine` 线色 `0x666688`。
  - `createEnemyMesh` 保持（敌人红/橙体系不变）。

## 6. `src/engine/GameEngine.ts`（核心改动）

### 6.1 删除
- 字段：`splitScreen`、`raycaster`、`groundPlane`。
- **`start(mode: 'pve' | 'pvp')` → `start()`**：删除 mode 参数与 `this.splitScreen = mode === 'pvp'` 行；GameCanvas 调用处同步（见 7.4）。
- `stop()` 中 camera2 相关（无）。
- `render()` 中分屏 TODO 分支；`updateCamera(p.pos, dt, false, i>0, p.rot.y)` → `updateCamera(p.pos, dt, p.rot.y)`（单玩家调用一次）。
- `updateUI()` 中 PVP 分支（p1Dead/p2Dead/result/draw）。
- 碰撞中 `player.shieldTimer > 0` 检查、`updatePlayers` 中 shield/slow/boost/warp 计时器递减块。
- `useSpecial` 之外对 `SKILLS` 的引用（import 行删除 `SKILLS`）。

### 6.2 单玩家化
- `comboTimeout: number[] = [0]`、`lockTargets: (number | null)[] = [null]`。
- `updatePlayers`：`inputs[0]` 直接取；删 `inputs[i] || inputs[0]` 回退。
- `updateUI`：PVE 判负 `if (!this.players[0].alive && !game.gameOver) { setGame({gameOver:true, screen:'result'}); this.stop(); }`。
- `updateBoss`/`spawnBoss`：`target = this.players.find(p => p.alive)` 不变（单元素数组兼容）。

### 6.3 3D 飞行移动（替换 `updatePlayers` 移动块）

```ts
private velocities: Vector3[] = [];   // 与 players 对齐
// start() 中：this.velocities = this.players.map(() => ({ x: 0, y: 0, z: 0 }));
```

```ts
// 移动块（替换原 WASD + auto-forward 逻辑）
const vel = this.velocities[i];
const ax = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
const ay = (inp.up ? 1 : 0) - (inp.down ? 1 : 0);
const az = (inp.forward ? 1 : 0) - (inp.backward ? 1 : 0);
const inputLen = Math.sqrt(ax * ax + ay * ay + az * az);
const boostMult = inp.boost ? BOOST_SPEED_MULT : 1;
const maxSpeed = p.speed * boostMult;
const k = inp.brake ? BRAKE_K : CONTROL_K;

let desiredX = 0, desiredY = 0, desiredZ = 0;
if (inputLen > 0.001) {
  const inv = 1 / inputLen;
  desiredX = (ax * inv) * maxSpeed;
  desiredY = (ay * inv) * maxSpeed;
  desiredZ = (az * inv) * maxSpeed;
}
const f = 1 - Math.exp(-k * dt);
vel.x += (desiredX - vel.x) * f;
vel.y += (desiredY - vel.y) * f;
vel.z += (desiredZ - vel.z) * f;

p.pos.x += vel.x * dt;
p.pos.y += vel.y * dt;
p.pos.z += vel.z * dt;
p.pos.x = clamp(p.pos.x, -WORLD_SIZE, WORLD_SIZE);
p.pos.y = clamp(p.pos.y, -WORLD_SIZE_Y, WORLD_SIZE_Y);
p.pos.z = clamp(p.pos.z, -WORLD_SIZE, WORLD_SIZE);
```

- **朝向**（机甲随飞行俯仰/横滚，`rot` 的 y/x/z）：

```ts
const aim = this.computeAimDir(p);      // 见 6.4
p.rot.y = Math.atan2(aim.x, aim.z);     // 偏航
const pitchTarget = -Math.asin(clamp(aim.y, -1, 1));
p.rot.x = lerp(p.rot.x, pitchTarget, 0.15);
const bank = clamp(vel.x / maxSpeed, -1, 1) * 0.35;   // 侧移横滚
p.rot.z = lerp(p.rot.z, bank, 0.15);
mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
mesh.rotation.set(p.rot.x, p.rot.y, p.rot.z);
```

### 6.4 屏幕空间瞄准（新私有方法，替换 camera-forward 定向）

```ts
private computeAimDir(player: PlayerState): { x: number; y: number; z: number } {
  const cam = this.scene.camera;
  const ndcX = (this.input.getMouseNormX() - 0.5) * 2;  // 或从 InputState.aimX 传入
  const ndcY = (0.5 - this.input.getMouseNormY()) * 2;
  const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(cam.quaternion);
  const tanFov = Math.tan((cam.fov * Math.PI) / 360);
  const dir = new THREE.Vector3()
    .addScaledVector(fwd, 1)
    .addScaledVector(right, ndcX * tanFov * cam.aspect)
    .addScaledVector(up, ndcY * tanFov)
    .normalize();
  return { x: dir.x, y: dir.y, z: dir.z };
}
```

> 说明：需要给 `InputManager` 加 getter `getMouseNormX/Y()`（或直接读 `getState().aimX/aimY`，注意 weaponSwitch 消费副作用——用 getter 更干净）。`playerShoot` 的 fireDir 改用 `computeAimDir`（不再 `camDir.y = 0`），锁定目标时仍用 `lockEnemy.pos - player.pos`。

### 6.5 射击冷却（fireRate 生效）

```ts
private fireTimers: number[] = [];
// start(): this.fireTimers = this.players.map(() => 0);
// updatePlayers 内：
this.fireTimers[i] -= dt;
if (inp.shoot && this.fireTimers[i] <= 0) {
  this.playerShoot(p, i);
  this.fireTimers[i] = getWeapon(p.weapon).fireRate;
}
```

（删除原 `if (inp.shoot && !isBoosting)` 直接调用——**助推（空格）与射击可同时进行**，对齐原作 Q 加速 + 左键射击；`playerShoot` 中删除未用的 `const now`。）

### 6.6 闪避冲刺（双击空格）与助推

```ts
private dodgeTimer = 0;      // 闪避进行中剩余秒
private dodgeCooldown = 0;   // 闪避冷却剩余秒
// start() 置 0；updatePlayers 每帧：
this.dodgeCooldown -= dt;

// 触发：双击空格（InputManager 已做双击判定，inp.dodge 为边沿信号）
if (inp.dodge && this.dodgeCooldown <= 0) {
  this.dodgeTimer = DODGE_DURATION;
  this.dodgeCooldown = DODGE_COOLDOWN;
  p.invulnTimer = Math.max(p.invulnTimer, DODGE_INVULN);  // 无敌帧
  audioManager.playDodge();                                // 见 6.8
}

// 闪避期间：速度被强行推向瞄准方向（3D），忽略常规输入/助推
if (this.dodgeTimer > 0) {
  this.dodgeTimer -= dt;
  const aim = this.computeAimDir(p);                       // 见 6.4
  vel.x = aim.x * p.speed * DODGE_SPEED_MULT;
  vel.y = aim.y * p.speed * DODGE_SPEED_MULT;
  vel.z = aim.z * p.speed * DODGE_SPEED_MULT;
  p.pos.x += vel.x * dt;
  p.pos.y += vel.y * dt;
  p.pos.z += vel.z * dt;
  // 同样 clamp 到世界范围
}
```

> 放置顺序：放在 §6.3 移动块之后、朝向块之前；闪避时跳过常规移动（`if (this.dodgeTimer <= 0) { ...常规移动块... }`），但朝向仍按瞄准方向更新。

### 6.7 敌人 3D 化

- `spawnEnemies`：生成位置 `y: randRange(-WORLD_SIZE_Y * 0.5, WORLD_SIZE_Y * 0.5)`（原 `y: 0`）。
- Boss 生成 `y: 5` 保留；`updateBoss` 中 Boss 追击移动保留（phase > 1）。
- 敌人 AI 的 Chase/射击已用 3D 向量（`vec3Sub` 全分量），无需改动。

### 6.8 音频

`AudioManager.ts` 新增（闪避音效：快速上行扫频 + 噪声呼气）：

```ts
playDodge() {
  this.ensureCtx();
  if (!this.ctx || !this.sfxGain) return;
  const osc = this.ctx.createOscillator();
  const gain = this.ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, this.ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.18);
  gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(this.sfxGain);
  osc.start();
  osc.stop(this.ctx.currentTime + 0.2);
}
```

（可选）助推音效 `playBoost()`：低频 80→160Hz 上升，按住时空转循环由引擎自行控制节奏——本阶段可省略。

### 6.9 杂项

- import 行更新：删除 `SKILLS`、`SHIELD_DURATION`、`BOOST_DURATION`、`SLOW_DURATION`、`SLOW_MULT`、`CRUISE_SPEED`、`vec3Cross`（未用）等；新增 `BRAKE_K`、`CONTROL_K`、`DODGE_SPEED_MULT`、`DODGE_DURATION`、`DODGE_COOLDOWN`、`DODGE_INVULN`、`WORLD_SIZE_Y`（SceneManager 另需 `CAMERA_DISTANCE`、`CAMERA_HEIGHT`）。
- `updateParticles` 空实现保留或删除（无影响）。
- `useSpecial` 保持（Z 触发，全屏光束）。

## 7. 组件

### 7.1 `src/components/App.tsx`
- 删除 `ModeSelect` import 与 `'modeSelect'` case；`renderScreen` case：`menu` / `pve` / `pause` / `result`；`pve` 分支去掉 `game.gameMode!`（GameCanvas 不再要 mode prop）。
- `pause` 分支保留（背景蒙层 + PauseMenu）。

### 7.2 `src/components/Menu.tsx`
- START GAME onClick → `setGame({ screen: 'pve', gameMode: 'pve' })`。

### 7.3 删除 `src/components/ModeSelect.tsx`

### 7.4 `src/components/GameCanvas.tsx`
- `GameCanvas: React.FC`（去掉 `mode` prop）；`engine.start()`；`useEffect` 依赖 `[]`。
- **preventDefault 扩展**（重要：Shift/Ctrl 有浏览器默认行为）：
  - 键名单追加 `'Shift'`、`'Control'`、`'Enter'`（当前名单是 `['w','W',...'4']`，空格已在列）。
  - 组合键拦截：`if (e.ctrlKey || e.metaKey) e.preventDefault();`（防止 Ctrl+W 关标签页、Ctrl+R 刷新等——仅在游戏画面挂载期间注册）。

### 7.5 `src/components/HUD.tsx`
- 单玩家面板：删 `players.map` 双面板；固定左下 `bottom-3 left-3`。
- 顶部标签：`[PVE MODE]` + WAVE + BOSS（删 `[PVP MATCH]`）。
- 控制提示更新：

```
WASD MOVE        SHIFT/CTRL UP-DOWN   MOUSE AIM
LMB FIRE         SPACE BOOST          SPACE x2 DODGE
E BRAKE          1-4 SWITCH WPN       TAB LOCK
Z SPECIAL        ESC/ENTER PAUSE
```

### 7.6 `src/components/PauseMenu.tsx`
- CONTINUE → `setGame({ screen: 'pve', paused: false })`（不再用 `game.gameMode` 断言）。

### 7.7 `src/components/ResultScreen.tsx`
- 删除 PVP 文案/颜色分支；固定 `GAME OVER`（红 `#ff2244`）；统计单玩家 KILLS/SCORE + WAVE；PLAY AGAIN → `resetGame(); setGame({ screen: 'pve', gameMode: 'pve' })`。

## 8. 文档（已完成）

- `new_game/verification-report.md` — 验证报告与整改记录 ✅
- `new_game/design-doc.md` — 已同步新设计（操作/模式/机动/视觉/架构/计划）✅

## 9. 验证步骤（实施后必须执行）

1. `npm run build`（`tsc -b && vite build`）通过，无 TS 报错。
2. 浏览器冒烟（dev server + Playwright）：Menu → START GAME 直接进入 PVE；Esc 暂停/继续；QUIT 回菜单。
3. **60s PVE 连续射击**：断言 score > 0（修复点：瞄准含垂直 + 敌人 3D 生成 + fireRate）。
4. **Shift/Ctrl** 可升降（玩家 y 变化）、**空格按住** 加速、**双击空格** 触发闪避（位移突进 + 无敌帧，2.5s 内不重复）、**E** 减速刹停。
5. Boss 战：接近 Boss 后 W1 可命中（垂直瞄准生效）；`Tab` 锁定 + 2 号导弹可击杀 Boss（+500 分）。
6. 视觉：无地面网格；背景可见地球/太阳；机甲白色。
7. 确认 Ctrl+W / Ctrl+R 等浏览器快捷键在游戏中不生效（preventDefault 组合键拦截）。

## 10. 遗留问题（下次迭代）

- `TDD.md` 编写（分支策略、性能预算、类图）
- Boss 2/3 可达性（`currentBossIndex < 0` 门控）；clone/fullLaser/shield/laserNet 攻击模式实现；Boss 追敌移动
- 武器 4/5/6 解锁路径（原作：通关解锁新机体）；浮游炮自动攻击；导弹制导
- BGM 循环音序、合成语音（Boss 出场/必杀播报）
- Bloom 后处理（`EffectComposer` + `UnrealBloomPass`）
- 关卡结构（原作：消灭全部敌人过关）

---

# 第 2 轮（v1.2）：操控模型 / 配色 / 反馈特效

> 前置：第 1 轮已实施（3D 飞行、Shift/Ctrl、空格助推+双击闪避、视觉改造）。本节为实测反馈整改。
> 决策来源：玩家实测反馈 + 苏格拉底提问定案（design-doc.md v1.2 变更记录）。
> 验证门禁：`npm run build` + 浏览器实测（指针锁定瞄准不卡死、锁定切换、dash 方向、残影、喷气、配色）。

## R2-0 决策摘要

| 项 | 定案 |
|----|------|
| 鼠标 | 控制**武器准星**（核心），相对增量（pointer lock 下 movementX/Y）；锁定中可扭摆打提前量 |
| 锁定 | **切换制**（Tab 按下切换）；锁定范围内**最近敌人**；机头自动面向目标；助推/闪避时解锁 |
| dash 方向 | 沿 **WASD 输入方向**（无输入则沿机头朝向） |
| 闪避特效 | **多重残影**（Sandevistan 风格：3-4 个 ghost，间隔 ~40ms，透明度递减） |
| 助推特效 | **喷气火焰**（背包推进器动态火焰 + 光效） |
| 敌人配色 | 统一**橘/红系**（含敌方弹幕继承色） |
| Boss 配色 | **红白**（白主体 + 红核心/光环） |
| 玩家配色 | **白底 + 少量蓝色描边**（移除大块蓝板） |
| 速度感 | **定案**：主角=方向——太空尘埃流参照（世界静止尘埃 + 极速流线层）；配角=助推 FOV 外扩 + 摄像机拉远（极速）、受击震屏 + HUD 红闪（危机） |
| 导弹制导 | **半制导（定案）**：锁定中持续追踪（每帧转向）；破锁/助推/闪避/目标死亡或超程 → 变直弹 |
| 关卡结构 | **Roguelike 选关地图（定案）**：4 层节点图逐层选路径；普通战/精英战（高风险高回报）/补给/Boss；清场过关=胜利；**死亡清空全部局内获得，仅初始武器 1-3 常驻**；奖励=武器解锁/武器升级（本局）+ 本局强化 + 回血；决策导向「下一局」（全图路线预览） |
| Boss 结构 | **双 Boss + 乱入（定案）**：地图只显示最终 Boss（最终兵器）；**乱入中 Boss**（巨型运输舰）第 2 层首场战斗中途警报入场；实验体-α 作精英战弱化变体；修复 `currentBossIndex` 门控 |

## R2-1 `src/engine/InputManager.ts` — 指针锁定相对鼠标 + Tab 切换

- 鼠标改为**相对增量**：`mouseMove(dx, dy)`（不再传绝对坐标）。内部维护虚拟准星 `cursorX/cursorY`（0..1，clamp），按灵敏度缩放：

```ts
private cursorX = 0.5; private cursorY = 0.5;
private mouseSens = 0.003;   // NDC/px，可后续放入 constants
mouseMove(dx: number, dy: number) {
  this.cursorX = clamp(this.cursorX + dx * this.mouseSens, 0, 1);
  this.cursorY = clamp(this.cursorY + dy * this.mouseSens, 0, 1);
}
getMouseNormX() { return this.cursorX; }
getMouseNormY() { return this.cursorY; }
```

- `Tab` 改**边沿切换**：`private _lockToggle = false;` `keyDown: if (key === 'Tab') this._lockToggle = true;` `getState` 消费清零，字段 `lockToggle: boolean`（替换原 `lockTarget` 按住语义；types.ts 同步改名）。

## R2-2 `src/components/GameCanvas.tsx` — 鼠标事件接线

```ts
let lastX = 0, lastY = 0;
const handleMouseMove = (e: MouseEvent) => {
  if (document.pointerLockElement === canvas) {
    engine.input.mouseMove(e.movementX, e.movementY);       // 锁定：相对增量
  } else {
    engine.input.mouseMove(e.clientX - lastX, e.clientY - lastY);  // 未锁定：绝对差
    lastX = e.clientX; lastY = e.clientY;
  }
};
```

（pointer lock 下 clientX 恒定导致 aim 冻结的 bug 即由此修复。）

## R2-3 `src/engine/GameEngine.ts` — 锁定 / 朝向 / dash 方向 / 残影 / 喷气

### 锁定（切换制，范围内最近）

```ts
private lockOn = false;
private lockedTargetId: number | null = null;

// updatePlayers 内：
if (inp.lockToggle) this.lockOn = !this.lockOn;
const weapon = getWeapon(p.weapon);
if (this.lockOn) {
  // 目标死亡/超出射程 → 自动清除
  const cur = this.lockedTargetId !== null
    ? this.enemies.find(e => e.id === this.lockedTargetId && e.hp > 0) : null;
  if (cur && vec3Dist(cur.pos, p.pos) <= weapon.lockRange) {
    this.lockedTargetId = cur.id;
  } else {
    // 范围内最近敌人
    let nearest: EnemyState | null = null; let nd = weapon.lockRange;
    for (const e of this.enemies) {
      if (e.hp <= 0) continue;
      const d = vec3Dist(e.pos, p.pos);
      if (d < nd) { nd = d; nearest = e; }
    }
    this.lockedTargetId = nearest ? nearest.id : null;
  }
} else {
  this.lockedTargetId = null;
}
```

### 机头朝向优先级（锁定目标 > 准星；助推/闪避解锁）

```ts
const boosting = inp.boost;
const dodging = this.dodgeTimer > 0;
let yawTarget: number;
if (this.lockedTargetId !== null && !boosting && !dodging) {
  const tgt = this.enemies.find(e => e.id === this.lockedTargetId);
  if (tgt) yawTarget = Math.atan2(tgt.pos.x - p.pos.x, tgt.pos.z - p.pos.z);
  else yawTarget = Math.atan2(aim.x, aim.z);
} else {
  yawTarget = Math.atan2(aim.x, aim.z);
}
p.rot.y = lerp(p.rot.y, yawTarget, 0.2);
```

### 锁定中准星可扭摆（打提前量）

`computeAimDir` 增加锁定分支：`aim = normalize(lockDir + right*ndcX*K + up*ndcY*K)`，K 为扭摆幅度（如 0.35）：

```ts
if (this.lockedTargetId !== null) {
  const tgt = this.enemies.find(e => e.id === this.lockedTargetId);
  if (tgt) {
    const lockDir = vec3Normalize(vec3Sub(tgt.pos, p.pos));
    const ndcX = (this.input.getMouseNormX() - 0.5) * 2;
    const ndcY = (0.5 - this.input.getMouseNormY()) * 2;
    // lockDir + 屏幕偏移（水平 0.35 / 垂直 0.25），归一化
  }
}
```

（未锁定时仍用 6.4 的纯屏幕空间瞄准。）

### dash 沿 WASD（替换 §6.6 的 aim 方向）

```ts
if (inp.dodge && this.dodgeCooldown <= 0) {
  this.dodgeTimer = DODGE_DURATION;
  this.dodgeCooldown = DODGE_COOLDOWN;
  p.invulnTimer = Math.max(p.invulnTimer, DODGE_INVULN);
  audioManager.playDodge();
}
if (this.dodgeTimer > 0) {
  this.dodgeTimer -= dt;
  // 方向：WASD 输入；无输入 → 机头朝向（aim 水平分量）
  const ax = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
  const ay = (inp.up ? 1 : 0) - (inp.down ? 1 : 0);
  const az = (inp.forward ? 1 : 0) - (inp.backward ? 1 : 0);
  const len = Math.sqrt(ax*ax + ay*ay + az*az);
  let dx = ax, dy = ay, dz = az;
  if (len < 0.001) { dx = aim.x; dy = aim.y; dz = aim.z; }
  else { dx /= len; dy /= len; dz /= len; }
  vel.x = dx * p.speed * DODGE_SPEED_MULT;
  vel.y = dy * p.speed * DODGE_SPEED_MULT;
  vel.z = dz * p.speed * DODGE_SPEED_MULT;
  // 残影（见 R2-4）
  this.scene.spawnAfterimages(p, this.ghostTimer);
  ...
}
```

### 助推喷气

`updatePlayers` 每帧：`this.scene.setBoostFlame(p.id, inp.boost)`（见 R2-4）。

## R2-4 `src/engine/SceneManager.ts` — 残影 / 喷气 / 配色

### 多重残影（Sandevistan 风格）

```ts
// 字段：private ghosts: { group: THREE.Group; mats: THREE.MeshBasicMaterial[]; life: number; maxLife: number }[] = [];

spawnAfterimages(player: PlayerState, ghostIndex: number) {
  // 每次调用生成 1 个 ghost：克隆玩家 mesh（只取可见层），材质换 MeshBasicMaterial（色=玩家色，透明）
  // ghost 位置/旋转 = 玩家当前 pos/rot；life 0.25s，透明度 0.35 → 0
}
// update() 每帧：ghosts 遍历 life -= dt，opacity 衰减，到期 remove + dispose
// 触发节奏：dash 期间每 40ms 生成 1 个（GameEngine 用计数器控制），共 3-4 个
```

实现要点：`group.clone(true)` 后遍历 `traverse` 把 `MeshStandardMaterial` 替换为 `MeshBasicMaterial({ color: playerColor, transparent: true, opacity: 0.35, depthWrite: false })`，避免克隆材质共享。

### 助推喷气火焰

```ts
// createPlayerMesh：在背包 3 个推进器口预建火焰锥（ConeGeometry，AdditiveBlending，橙色 0x88ccff→蓝白），默认 visible = false，挂到 group
setBoostFlame(playerId: number, active: boolean) {
  // active：visible = true，且每帧随机 scale.y = 1.2~1.8 + 材质 opacity 抖动（模拟喷焰）
  // inactive：visible = false
}
```

（配合引擎 update 中 `setBoostFlame(p.id, inp.boost)` 调用。）

### 配色

- **玩家纯白化**（`createPlayerMesh`）：
  - 材质：`armorMat 0xffffff`、`frameMat 0xeef0f4`、`jointMat 0xccd0d8`、`ventMat 0xe4e7ee`（全白系）。
  - **蓝 accent 收敛为小面积**：以下大块 `accentMat` 部件改为 `armorMat`（保留边缘线）——胸甲板(0,0.6,0.75)、肩甲(±1.3,1.0,0)、上臂(±1.2,0.3,0.15)、前臂(±1.2,-0.45,0.2)、大腿(±0.5,-0.3,0.25)、膝(±0.5,-0.8,0.15)、小腿(±0.5,-1.2,0.2)、裙甲(0,-0.1,0.55)与侧裙(±0.65,-0.1,0.2)。
  - **保留蓝色**：座舱球、面罩、头部天线、枪口、推进器光（glowMat/accent 小件）、机头点缀线。
- **敌人统一橘/红**（`data/enemies.ts` 改色，弹幕自动继承）：
  - scout `#ff5544`、assault `#ff7744`、sniper `#ff3355`、shield `#ff8833`、bomber `#ff2200`、commander `#ffaa33`。
- **Boss 红白**（`createBossMesh` + `data/bosses.ts`）：主体白 `0xf2f2f2`、核心/光环红 `0xff2244`、环带红 `0xff4444`、炮台深红 `0xdd2233`；bosses.ts 三只 Boss color 统一改为 `#f2f2f2`（视觉由 mesh 内红件表达）。

## R2-5 `src/types.ts` / `src/store.ts` / `src/components/HUD.tsx` — 锁定态 + Boss 血条

- `types.ts`：`InputState.lockTarget` → `lockToggle: boolean`（边沿）；`GameState` 增 `bossHp: number; bossMaxHp: number`。
- `store.ts`：`defaultGame` 补 `bossHp: 0, bossMaxHp: 0`。
- `GameEngine.updateBoss`：每帧 `setGame({ bossHp: boss.hp, bossMaxHp: boss.maxHp })`；Boss 死亡清除时 `setGame({ bossHp: 0, bossMaxHp: 0 })`。
- `HUD.tsx`：`game.bossFight` 时渲染 Boss 血条（`pixel-bar` 样式，红 `#ff2244`，显示 `bossName` + 阶段数字可选）；顶部加 `LOCK` 状态标识（`game.lockOn` 需引擎同步——可在 `setGame` 中带 `locked: boolean` 字段，或 HUD 读 HUD 级状态；建议 `GameState` 加 `locked: boolean`，引擎锁定/解除时 setGame）。

## R2-6 速度感（定案：主角=方向，太空尘埃流）

**设计**：把「速度线」藏进世界观——太空尘埃是剧中物，玩家动、尘埃流过，方向和速度自然可读。双层系统：

### 尘埃双层系统（`SceneManager`）

```ts
// Layer A — 常驻尘埃（方向参照，世界静止）
private dust: THREE.Points;            // ~400 粒子
private dustPos: Float32Array;         // 世界坐标
// 初始化：围绕玩家出生点 box(120, 60, 120) 随机分布
// 每帧 updateDust(playerPos, playerVel, dt)：
//   1) 尘埃世界静止 → 相对玩家位移 = -playerVel * dt（自然流过）
//   2) 粒子超出 box → 回卷到玩家相对另一侧（wrap around player）
//   3) 速度越快 opacity 越高（0.25 → 0.6），size 微增

// Layer B — 极速流线（助推/dash 时出现）
private streaks: THREE.Points;         // ~120 粒子池，默认隐藏，AdditiveBlending
// 触发：speedFactor > 0.7 时每帧发射 3-5 个
// 发射：随机偏移在玩家周围 (r=6..14)，vel = -playerVel + 随机扰动，life 0.4s
// 渲染：白/淡蓝色，size 随速度 0.5→1.2，opacity 随 life 衰减
```

### 镜头配角（`SceneManager.updateCamera(target, dt, yaw, speedFactor)`）

```ts
const camDist = lerp(15, 20, speedFactor);           // 摄像机拉远
const fov = lerp(60, 72, speedFactor);               // FOV 外扩
// camera.position 使用 camDist；camera.fov = fov; camera.updateProjectionMatrix();
// GameEngine 传 speedFactor = clamp(|vel| / (p.speed * BOOST_SPEED_MULT), 0, 1)
// dash 期间 speedFactor 强制 1（镜头瞬间拉开 + FOV 74，强化残影爆发）
```

### 受击危机反馈（配角）

- **震屏**：受击帧（`invulnTimer` 刚被设置）在 `updateCamera` 中注入 `pos += 随机 0.3` 抖动，0.15s 衰减。
- **HUD 红闪**：`HUD.tsx` 监听 `players[0].hp` 下降 → 全屏红色 overlay（`rgba(255,34,68,0.25)`），300ms 淡出（CSS transition，`key={hp}` 触发重挂载）。

### 参数表

| 参数 | 值 |
|------|-----|
| 尘埃数量 / box | 400 / 120×60×120（随玩家回卷） |
| 尘埃 opacity | 0.25 → 0.6（随 speedFactor） |
| 流线阈值 / 发射率 | speedFactor > 0.7 / 3-5 每帧 |
| 流线 life | 0.4s |
| 助推 camDist / FOV | 15→20 / 60→72；dash FOV 74 |
| 震屏 | 幅度 0.3，0.15s 衰减 |
| 红闪 | rgba(255,34,68,0.25) → 0 @ 300ms |

## R2-7 导弹半制导（定案）

### `src/types.ts`
- `ProjectileState` 增字段：`homingTargetId: number | null`（默认 null）。

### `src/utils/constants.ts`
- 新增：`export const MISSILE_TURN_RATE = 6;`（转向系数 k = 1 - exp(-RATE*dt)，值越大转弯越猛）。

### `src/engine/GameEngine.ts`

**发射**（`playerShoot`）：`weapon.type === ProjectileType.Missile && this.lockOn && this.lockedTargetId !== null` 时 `proj.homingTargetId = this.lockedTargetId`（其余武器为 null）。

**追踪**（`updateProjectiles`，每帧）：

```ts
if (p.homingTargetId !== null) {
  const tgt = this.enemies.find(e => e.id === p.homingTargetId && e.hp > 0);
  const inp = this.input.getState();
  // 半制导条件：仍锁定同一目标，且非助推/闪避（机动破锁）
  const guideValid = tgt && this.lockOn && this.lockedTargetId === p.homingTargetId
    && !inp.boost && this.dodgeTimer <= 0;
  if (guideValid) {
    const speed = vec3Length(p.vel);
    const curDir = vec3Normalize(p.vel);
    const wantDir = vec3Normalize(vec3Sub(tgt.pos, p.pos));
    const k = 1 - Math.exp(-MISSILE_TURN_RATE * dt);
    const newDir = vec3Normalize(vec3Add(
      vec3Scale(curDir, 1 - k),
      vec3Scale(wantDir, k)
    ));
    p.vel = vec3Scale(newDir, speed);
  } else {
    p.homingTargetId = null;   // 破锁 → 永久直弹
  }
  // 导弹模型朝向速度方向（锥体 +Y 对齐 vel）
  const mesh = this.scene.projectileMeshes.get(p.id);
  if (mesh) {
    const dir = vec3Normalize(p.vel);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(dir.x, dir.y, dir.z));
  }
}
```

> 注意：`this.input.getState()` 会消费 weaponSwitch/dodge 边沿——**在 updateProjectiles 中不要重复调用**；改用 updatePlayers 里已有的 `inp`（把半制导判定需要的 `boost/dodgeTimer` 传入，或把追踪逻辑移到 update 内共享 inp 的作用域）。实现时以「每帧只调一次 getState」为准（当前 update() 中 inputs 已在 updatePlayers 顶部取好，可提升为成员/参数）。

### 验证
- 锁定时发射：导弹画弧追踪目标；目标急转时导弹跟随。
- Tab 取消锁定 / 助推 / 双击闪避：导弹立即变直线。
- 目标死亡：导弹直飞到期自毁。
- Boss 导弹（owner ≥ 10000）不追踪。

## R2-8 Roguelike 选关地图（定案）

### `src/data/map.ts`（新文件）— 节点图生成器

```ts
export enum NodeType { Battle = 'battle', Elite = 'elite', Supply = 'supply', Boss = 'boss' }
export type RewardKind = 'unlockWeapon' | 'upgradeWeapon' | 'buff' | 'heal';
export interface MapNode {
  id: number;
  layer: number;                 // 0..3
  type: NodeType;
  x: number; y: number;          // 布局坐标 0..1（MapScreen 定位用）
  next: number[];                // 下一层可达节点 id
  rewards: RewardKind[];         // 本节点可获得的奖励（精英=三选一）
}
export interface RunMap { nodes: MapNode[]; startId: number; }
export function generateMap(seed?: number): RunMap
```

- 4 层：第 0 层 1 个起点（battle）；第 1-2 层各 2-3 节点；第 3 层 1 个 Boss。
- 连接：相邻层随机连边（每节点 1-2 条出边，保证全连通——下层每个节点至少 1 条入边）。
- 类型权重（1-2 层）：battle 60% / elite 25% / supply 15%；第 3 层强制 Boss。
- 精英节点：`rewards = ['unlockWeapon','upgradeWeapon','heal']`（三选一）。
- 种子随机（`seed` 可选，默认 `Date.now()`；调试可传固定种子复现）。

### `src/store.ts` — 局内状态（纯 Roguelike：无跨局持久化）

```ts
// GameState 增：won: boolean; nodeType: NodeType;  （战斗结算用）
// 新增独立 slice：
interface RunStore {
  run: { map: RunMap | null; currentNodeId: number | null; cleared: number[] };
  weapons: number[];                        // 本局武器库：startRun 时重置为 [1,2,3]
  weaponLevels: Record<number, number>;     // 本局武器等级（upgradeWeapon 奖励，死亡清零）
  buffs: { dmgMult: number; fireRateMult: number; maxHpBonus: number; speedBonus: number };  // 仅本局
  startRun: () => void;                     // 生成地图、重置 weapons=[1,2,3]、levels、buffs
  completeNode: (nodeId: number, reward?: RewardKind) => void;  // 标记 cleared、发奖
}
```

- **无 localStorage / 无 meta**——死亡即全部清零（纯 Roguelike，v1.6 定案）。
- `makePlayer` 的 `weapons` 读 `run.weapons`（每局初始 `[1, 2, 3]`，对应原作「初期 3 部弱机体」）。
- `upgradeWeapon`：已持武器等级 +1 → 伤害 ×(1 + 0.25×lvl)、射速 ×(1 + 0.15×lvl)（`getWeapon` 调用处按等级换算，或武器表旁挂 `getWeaponAt(id, lvl)`）。
- 补给节点：`heal` 回 50% HP；`buff` 从（dmgMult +0.25 / fireRateMult +0.2 / maxHpBonus +30 / speedBonus +5）四选一。

### `src/components/MapScreen.tsx`（新文件）— 选关界面

- 渲染：节点按 `x/y` 绝对定位卡片（pixel 风格，复用 HUD 面板样式）；层间 SVG 连线。
- 状态显示：已清节点置灰打勾；当前可选节点高亮（闪烁）+ 类型标签（普通/精英/补给/Boss）+ 奖励预览（精英显示「三选一：武器/升级/回血」）；未解锁节点锁定。
- **全程路线预览**（「下一局」决策导向）：一屏展示全部 4 层，玩家选择节点前即可看到整条路径走向——何时该打精英、何时留补给。
- 交互：点击可选节点 → `setGame({ screen: 'pve', nodeType })` + 引擎按节点配置开战。
- 顶层：显示当前武器库（含等级）+ 本局 buff 列表。

### `src/engine/GameEngine.ts` — 节点战斗配置与胜利

- `start(node: MapNode)`（替换 `start()`）：按节点生成战斗参数：
  - battle：2 波，敌人数量 = 基础（8-12）
  - elite：3 波，数量 ×1.5、`hp *= 1.3`、`speed *= 1.1`
  - supply：无战斗——直接进结算面板（heal/buff 选择）
  - boss：Boss 战（沿用现有 `spawnBoss`，bossIndex 由层/节点决定）
- **胜利条件**：波次全部清空（`waveGoal` 达成且无存活敌人）→ `setGame({ screen: 'result', won: true })` + `stop()`；阵亡 → `won: false`。
- 波次上限从无限改为 `waveGoal`；`WAVE_INTERVAL` 语义不变（波间间隔）。
- `updateUI` 现有 PVE 判负逻辑保留，补充胜利判定。

### `src/components/ResultScreen.tsx` — 过关结算

- `won` 分支：显示「STAGE CLEAR」+ 奖励（三选一卡片：武器解锁/武器升级/回血，点击应用 → `completeNode` → 回 MapScreen；无奖励节点直接「NEXT」）。
- `!won` 分支：GAME OVER + 本局统计（波数/击杀/分数）+ **「一切清零，仅初始武器保留」**提示（纯 Roguelike 死亡惩罚）。
- 顶层：显示当前武器库（含等级）+ 本局 buff 列表。

### `src/components/App.tsx` — 流程接线

- `screen` 增 `'map'`：Menu START → `'map'`（`startRun()`）→ 节点战斗 → 结算 → 回 `'map'` → 最终 Boss 胜利 → 胜利画面（ResultScreen `won` 分支，无后续节点时显示「RUN COMPLETE」+ 回主菜单）。
- 战斗途中 Esc 暂停/退出：退出回 `'map'`（当前节点标记未完成，可重试）。

### 乱入 Boss（v1.7 定案）

**机制**：地图只显示一个 Boss（最终兵器）；玩家按「一个 Boss」规划资源。第 2 层（layer 2）**首个可战斗节点**被标记 `ambush = true`——该场战斗第 1 波清完后，警报（`playBossWarning`）+ HUD 突现 BOSS 名 + **巨型运输舰入场**，本场剩余目标切换为「击破 Boss」。

**实现**：
- `data/map.ts`：`MapNode` 增 `ambush?: boolean`；`generateMap` 给第 2 层第一个 battle/elite 节点置 `ambush = true`。
- `GameEngine.start(node)`：记录 `node.ambush`；波次推进时 `wave === 1` 且 ambush 未触发 → `spawnBoss(0)`（巨型运输舰）+ `setGame({ bossFight: true, bossName })`；本场胜利条件变为 Boss 击破。
- `spawnBoss(index: number)`：**移除 `currentBossIndex < 0` 循环门控**，显式传 Boss 索引——乱入 = 0（运输舰）、最终 = 2（最终兵器）、精英变体 = 1（实验体-α 弱化：HP ×0.6、速度 ×0.8）。
- 乱入战胜利：结算走三选一奖励（`rewards = ['unlockWeapon','upgradeWeapon','heal']`），玩家此时才意识到「两个 Boss」——资源焦虑的源头。
- `updateBoss`：Boss 死亡后 `setGame({ bossFight: false, bossName: '' })` 逻辑保留；最终 Boss 击破 → `won: true` 结算。

**资源焦虑（设计要点，实现时保持）**：地图不显示乱入 Boss；不预告敌人强度数值；最终 Boss 前无强制补给；补给节点数量有限。

### 验证

- 生成地图：4 层、Boss 在第 4 层、全连通、无死路。
- 战斗清场后出现「STAGE CLEAR」与奖励；选「武器解锁」后武器栏出现新武器（**本局有效**）。
- **死亡后：武器 4/5/6 消失、武器升级归零、buff 归零、HP 回满、武器库回到 1-3**（刷新页面等效验证——无 localStorage）。
- 精英节点：敌人数量/血量明显更高，奖励三选一；补给节点直接选择不回战斗。
- 最终 Boss 击败 → RUN COMPLETE。

## R2-9 验证步骤

1. `npm run build` 通过。
2. 指针锁定后连续甩鼠标：**准星不再冻结**（movementX/Y 生效）。
3. Tab 按下切换锁定：锁定最近敌人（射程内），机头转向目标；锁定中甩鼠标准星围绕目标扭摆（弹道随之偏移 = 提前量）；助推/闪避时机头解锁。
4. 双击空格：dash 沿 WASD 方向（按住 W+dash → 向前突进）；无输入时沿机头方向；残影 3-4 个、透明度递减。
5. 按住空格：推进器喷出动态火焰。
6. 敌我配色：玩家白底蓝描边；所有敌人橘/红；Boss 白身红件；敌方弹幕不再出现蓝色。
7. Boss 战：HUD 显示 Boss 血条。
8. 速度感：巡航时可见尘埃自然流过（方向参照，不刺眼）；助推时尘埃流速 + FOV 变宽 + 镜头拉远；dash 时流线爆发 + FOV 74；受击瞬间画面震动 + 红闪。
9. 导弹半制导：锁定中画弧追踪；破锁/助推/闪避/目标死亡 → 直弹；Boss 导弹不追踪。
10. Roguelike 地图：Menu → 地图选关（全程路线预览）→ 战斗清场 → STAGE CLEAR + 奖励 → 回地图；精英节点敌人强化 + 三选一；**死亡后一切清零（武器库回 1-3、升级/buff/血量归零）**；最终 Boss → RUN COMPLETE。
11. 乱入 Boss：地图只显示一个 Boss；第 2 层首场战斗第 1 波后警报 + 运输舰入场；击败后三选一；最终 Boss（最终兵器）击破 → RUN COMPLETE；精英节点小概率遇实验体-α 弱化版。
