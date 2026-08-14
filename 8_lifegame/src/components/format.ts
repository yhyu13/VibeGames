// v2.7: canonical money display — the ¥ sign goes BEFORE a leading minus (-¥300, never ¥-300).
// 生活费 is unclamped (applyStatDelta leaves wealth unclamped), so negative balances are real.
export function formatYuan(value: number): string {
  const abs = Math.abs(value)
  const formatted = abs.toLocaleString()
  return value < 0 ? `-¥${formatted}` : `¥${formatted}`
}
