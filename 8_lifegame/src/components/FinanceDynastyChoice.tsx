import { useGameStore } from '../store'

export function FinanceDynastyChoice() {
  const unlocked = useGameStore((s) => s.state.financeDynastyUnlocked)
  const origin = useGameStore((s) => s.state.player.origin)
  const relationshipCrisis = useGameStore((s) => s.state.relationshipCrisis)
  const relationshipResolved = useGameStore((s) => s.state.relationshipResolved)
  const restart = useGameStore((s) => s.restart)

  if (!unlocked) return null
  const relationshipClosed = relationshipCrisis >= 3
  return (
    <div className="finance-origin-choice">
      <strong>金融世家出身已解锁</strong>
      <span>
        {origin !== 'finance_dynasty'
          ? '贵人认可了你。下一局可以从资源充足、关系复杂的人生开始。'
          : relationshipResolved
            ? '你继承了资源,也学会了把关系当关系。'
            : relationshipClosed
              ? '你守住了资产,却让这段关系停在门外。'
              : '资源能打开门,却不能替你建立信任。'}
      </span>
      {origin !== 'finance_dynasty' && (
        <button className="btn btn-primary" onClick={() => restart('finance_dynasty')}>
          以金融世家重开 →
        </button>
      )}
    </div>
  )
}
