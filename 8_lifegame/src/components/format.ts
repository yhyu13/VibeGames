// v2.7: canonical money display — the ¥ sign goes BEFORE a leading minus (-¥300, never ¥-300).
// 生活费 is unclamped (applyStatDelta leaves wealth unclamped), so negative balances are real.
export function formatYuan(value: number): string {
  // v2.10: NaN/Infinity must never leak into money text (a poisoned account would print "¥NaN").
  if (!Number.isFinite(value)) return '¥0'
  const abs = Math.abs(value)
  const formatted = abs.toLocaleString()
  return value < 0 ? `-¥${formatted}` : `¥${formatted}`
}
