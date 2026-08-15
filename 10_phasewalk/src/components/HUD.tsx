// components/HUD.tsx — phase wheel + 相尘 count + contextual tutorial hints (worldview-first §3 beats).
// v4: hints teach the four movement verbs (跳/泳/飘/爆冲) + bullet interactions, not the old auto-ride.
import { PHASE_ICON, PHASE_LABEL, PASSWORD_PAD_RADIUS } from '../core/constants'
import type { GameState, Vec3 } from '../core/types'
import { isPhaseLocked } from '../core/simulation/traps'

const ORDER: Array<'solid' | 'liquid' | 'gas' | 'plasma'> = ['solid', 'liquid', 'gas', 'plasma']

function dist(a: Vec3, b: Vec3): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
}

// Per-floor teaching beat: each floor teaches one phase's signature move. Shown while the floor is
// fresh (no shards collected) so the player knows what THIS floor is about before the verb ladder
// takes over. F1 has no entry here — it uses the whole-run Tab intro + the 固化造路 pool hint.
function floorHintFor(sim: GameState): string | null {
  if (sim.shards.some((s) => s.collected)) return null
  switch (sim.layer.id) {
    case 'F2_flow_gallery': return '流廊 · 石阶断了 — 切流相，按住空格上浮跨过断口'
    case 'F3_breath_well': return '息井 · 没有台阶 — 切息相，按住空格悬浮直上'
    case 'F4_flame_net': return '焰网 · 相灵眼横射成网 — 切焰相，爆冲把子弹反射回去'
    case 'F5_phase_core': return '相核室 · 四相连切 — 固跳 → 液泳 → 气飘 → 焰爆冲'
    default: return null
  }
}

// Contextual hint = the in-world teaching beats of the 5-minute script.
function hintFor(sim: GameState): string | null {
  const p = sim.player
  const collected = sim.shards.filter((s) => s.collected).length
  const pool = sim.layer.phaseFluids[0]
  const poolCenter = pool ? { x: (pool.min.x + pool.max.x) / 2, y: (pool.min.y + pool.max.y) / 2, z: (pool.min.z + pool.max.z) / 2 } : null
  // A solid player STANDING on a password pad must not see the freeze-bridge hint: the pad row sits
  // 1.7–2.9m from the pool, so a radius-only poolNear (3.2) swallows the first password steps (round 23).
  // onPad matches stepPassword's horizontal-only footprint (radius 0.9 = actually underfoot, not just
  // "near"); once off the pad and into the void approach, the pool hint surfaces and self-clears on
  // solidification — it no longer lingers at pads too far to ever freeze (SOLIDIFY_RADIUS 1.6 < 2.9).
  const onPad = sim.layer.passwordPads?.some((pad) => {
    const dx = p.position.x - pad.position.x
    const dz = p.position.z - pad.position.z
    return dx * dx + dz * dz < PASSWORD_PAD_RADIUS * PASSWORD_PAD_RADIUS
  }) ?? false
  const poolNear = pool && !pool.solidified && p.phase === 'solid' && poolCenter && dist(p.position, poolCenter) < 3.2 && !onPad
  const currentShardDone = sim.shards.some((s) => s.phase === p.phase && s.collected)
  const boss = sim.layer.emitters.find((em) => em.boss && !em.destroyed)
  const pw = sim.layer.password
  // anchor the tutorial to the NEAREST pad, not the first — a player approaching the middle/right pads
  // (the natural spawn-ward entry) must still see the hint.
  const nearPad = sim.layer.passwordPads?.some((pad) => dist(p.position, pad.position) < 3) ?? false

  // whole-run first beat (F1, first 30s): teach the Tab radial + four routes. This MUST out-rank the
  // password hint — a brand-new player walking toward the pad row (within nearPad) still has to learn
  // how to switch phases before the password's "踩对四相顺序" makes any sense. Yields once the password
  // sequence begins (progress > 0) so a player already mid-puzzle keeps the "踩错即重置" feedback
  // instead of the Tab intro (round 22).
  if (collected === 0 && p.switches === 0 && sim.passwordProgress === 0 && sim.elapsed < 30) return '四相各有一路 · 按住 Tab 上下左右选相'
  // F1 固化造路 (phaseFluids exist only on F1 — F2–F5 have none). The pool/void is a DEATH hazard, so
  // its freeze-bridge teaching outranks the password puzzle — but ONLY while the player is genuinely at
  // the pool, not standing on a password pad: poolNear is gated by !onPad (round 23). A radius-only check
  // (round 22) reached pad2/pad4, masking the password steps; the onPad gate keeps 凝桥 for the void
  // approach and 密文 for the pad row.
  if (poolNear) return '走近相液池 · 石相会把它凝成桥，跨过无相区'
  // 密文石板 (password gate): teach the step-in-order puzzle as the player approaches the pads. Shown
  // only while the sequence is unsolved and the player is near the pad row (and once the Tab teaching
  // above has lapsed — i.e. after a switch or 30s), so it never crowds the spawn-time intro.
  if (pw && pw.length > 0 && sim.passwordProgress < pw.length && nearPad) {
    return sim.passwordProgress === 0
      ? '密文石板 · 踩对四相顺序 — 顺序藏在透明相玻上'
      : `密文 ${sim.passwordProgress}/${pw.length} · 踩错即重置`
  }
  // 相位陷阱 (M3): 相锁区 locks switching; 逆相栅 blocks non-matching phases
  if (isPhaseLocked(sim)) return '相锁区 · 此处无法切相'
  const fence = sim.layer.traps.find((t) => {
    if (t.kind !== 'phase_fence' || t.phase === p.phase) return false
    const c = { x: (t.min.x + t.max.x) / 2, y: (t.min.y + t.max.y) / 2, z: (t.min.z + t.max.z) / 2 }
    return dist(p.position, c) < 3
  })
  if (fence) return `逆相栅 · 只有${PHASE_LABEL[fence.phase]}能穿过`
  // 相灵守层者 (M3): the crimson guardian eye — reflect-destroy it (plasma)
  if (boss && dist(p.position, boss.position) < 5) return '相灵守层者 · 切焰相反射子弹摧毁它'
  // per-floor teaching beat (shards reset each floor, so collected===0 ⇒ fresh floor)
  const fh = floorHintFor(sim)
  if (fh) return fh
  // teach the current phase's verb while its shard is uncollected; once it's done, surface progress
  if (!currentShardDone) {
    if (p.phase === 'solid') return '空格 跳 · 连跳两次登高'
    if (p.phase === 'liquid') return '按住空格 上浮 · 松手下沉'
    if (p.phase === 'gas') return '按住空格 悬浮 · 子弹直接穿过'
    if (p.phase === 'plasma') return '按空格 爆冲 · 焰相把子弹反射回去'
  }
  if (collected === 1) return '已集 1 枚 · 还差 2 枚 — 还有没走过的相'
  if (collected === 2) return boss ? '已集 2 枚 · 再集 1 枚，并除守层者' : '已集 2 枚 · 再集 1 枚金门即开'
  const open = collected >= 3
  if (open) {
    if (boss) return '守层者还在守门 · 切焰相反射子弹摧毁它'
    if (dist(p.position, sim.layer.exit) > 3) return '金门已开 · 登顶'
  }
  return null
}

export function HUD({ sim }: { sim: GameState }) {
  const collected = sim.shards.filter((s) => s.collected).length
  const hint = hintFor(sim)
  return (
    <div className="hud">
      <div className="hud-phase-wheel">
        {ORDER.map((p) => (
          <span key={p} className={'phase-icon' + (sim.player.phase === p ? ' active' : '')} data-phase={p}>
            {PHASE_ICON[p]}
          </span>
        ))}
      </div>
      <div className="hud-stats">
        <div className="hud-shards">相尘 {collected} / {sim.shards.length}</div>
        <div className="hud-layer">{sim.layer.name} · {PHASE_LABEL[sim.player.phase]}</div>
        <div className="hud-switches">切相 {sim.player.switches} 次 · 被吃相 {sim.player.deaths} 次</div>
      </div>
      {sim.layer.password && sim.layer.password.length > 0 && sim.passwordProgress < sim.layer.password.length && (
        <div className="hud-password">
          <span className="pw-label">密文</span>
          {sim.layer.password.map((ph, i) => {
            // Reveal ONLY symbols already stepped — future symbols render as a neutral dot so the HUD
            // never leaks the answer to the hide-and-seek cipher (the order is on the 相玻 panel).
            const done = i < sim.passwordProgress
            return (
              <span key={i} className={'pw-pip' + (done ? ' done' : '')} data-phase={done ? ph : undefined}>
                {done ? PHASE_ICON[ph] : '·'}
              </span>
            )
          })}
        </div>
      )}
      {hint && <div className="hud-hint">{hint}</div>}
      <div className="hud-keys">Tab 切相 · 空格 跳/浮/爆 · R 重生 · Esc 暂停</div>
    </div>
  )
}
