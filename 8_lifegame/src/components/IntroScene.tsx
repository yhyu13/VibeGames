import { useEffect, useState } from 'react'
import { useGameStore } from '../store'
import { CAMPUS_SEMESTER_WEEKS, WINTER_BREAK_WEEKS } from '../core/types'
import { CHRISTMAS_TURN, NEXT_SEMESTER_TURN } from '../core/data/seasonEvents'
import { accountValue, allPrices } from '../core/simulation/invest'
import { mentorHitFromChoiceId } from '../core/simulation/events'
import { CampusMap } from './CampusMap'
import { HUD } from './HUD'
import { DiceRoller } from './DiceRoller'
import { EventModal } from './EventModal'
import { InvestPanel } from './InvestPanel'
import { AICoachPanel } from './AICoachPanel'
import { SummaryScreen } from './SummaryScreen'
import { SpecialEventBanner } from './SpecialEventBanner'
import { ParallelFateCard } from './ParallelFateCard'
import { BeatOverlay } from './BeatOverlay'
import { FinanceDynastyChoice } from './FinanceDynastyChoice'
import { TimelinePanel } from './TimelinePanel'

// v2.5: opening cinematic — two story beats (出身故事 → 人生目标) then 走进校园. UI-only,
// consumes no turn; resets per run. The 人生目标 card establishes the love + wealth goals
// the user asked for at the very start of the experience.
// v2.6 贫困逻辑: the town beats now end where the story really starts — ¥1,000 生活费,
// a ¥100,000 模拟盘, and a brain wired for instinct (被本能使唤).
const TOWN_STORY = {
  icon: '🧑‍🎓',
  title: '小镇做题家',
  beats: [
    '县城最好的高中,凌晨五点半的教室,和一张贴了三年的排名表。',
    '通知书到的那天,妈妈哭了,爸爸抽了一整包烟。你带着生活费 ¥1,000 进了大学。',
    '开学第一课:一笔 ¥100,000 的模拟资金。你从来没见过这么大的数字 —— 本能告诉你:all in。',
  ],
  kicker: '绿皮火车 · 48 小时 · 生活费 ¥1,000 · 模拟盘 ¥100,000',
}

const DYNASTY_STORY = {
  icon: '🎩',
  title: '金融世家',
  beats: [
    '家族的季度汇报会上,你被安排坐在父亲右手边第三个位置。',
    '父亲说:"这个学期,我不要你赚钱,我要你看懂人。"',
    '你很清楚:外面的人记住的是你的姓氏,而不是你的名字。',
  ],
  kicker: '专车 · 校门口绕到后街 · 不想被看见的车牌',
}

export function IntroScene() {
  const state = useGameStore((s) => s.state)
  const runId = useGameStore((s) => s.runId)
  const {
    player,
    altPlayer,
    phase,
    pendingDice,
    pendingEvent,
    pendingEventChoiceId,
    pendingInvestment,
    pendingCoach,
    pendingMicroAwakening,
    pendingAltFate,
    pendingRealEventDelta,
    pendingSpecialEvent,
  } = state

  // Turn-1 出身定型 opening beat (spec §6): UI-only card, consumes no turn. Reset per run.
  const [openingStep, setOpeningStep] = useState(0)
  const [leaving, setLeaving] = useState(false)
  useEffect(() => setOpeningStep(0), [runId])
  useEffect(() => setLeaving(false), [runId])

  // v2.5.2: exit the outgoing opening card for 160ms before swapping steps, instead of an
  // instant unmount hard cut — the incoming card's cinematic-in then reads as a cross-fade.
  const goNext = (step: number) => {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      setOpeningStep(step)
      setLeaving(false)
    }, 160)
  }

  if (phase === 'summary') {
    return (
      <div className="intro-scene">
        <HUD player={player} microAwakeningToast={false} />
        <div className="summary-stage">
          <SummaryScreen
            player={player}
            altPlayer={altPlayer}
            paper={state.paper}
            mentorUnlocked={state.mentorUnlocked}
            track={state.track}
            loveImpression={state.loveImpression}
            loveReunion={state.loveReunion}
            loveStage={state.loveStage}
            paperGoal={state.paperGoal}
          />
          <FinanceDynastyChoice />
        </div>
      </div>
    )
  }

  const realMentorHit = mentorHitFromChoiceId(pendingEventChoiceId)
  // v2.5 fix: the opening overlays render only for steps 0/1; at step 2 (走进校园 clicked)
  // the map hint must become visible again — openingStep < 2, not >= 0.
  const showOpening = openingStep < 2 && phase === 'choose_destination' && player.log.length === 0
  const story = player.origin === 'finance_dynasty' ? DYNASTY_STORY : TOWN_STORY
  // v2.6: the 🎯 goal chip + summary verdict read the PAPER account (第一桶金 = 模拟盘翻盘),
  // never the ¥1,000 生活费. accountValue needs the current-turn prices.
  const paperValue = accountValue(state.paper, allPrices(state.player.turn))

  return (
    <div className="intro-scene">
      <HUD
        player={player}
        microAwakeningToast={pendingMicroAwakening}
        paperGoal={state.paperGoal}
        paperValue={paperValue}
        loveStage={state.loveStage}
        mentorFavor={state.mentorFavor}
      />
      <TimelinePanel turn={player.turn} />
      {player.turn >= CHRISTMAS_TURN && (
        <div className={`season-context season-context-${player.turn === NEXT_SEMESTER_TURN ? 'spring' : 'winter'}`}>
          {player.turn === CHRISTMAS_TURN
            ? state.loveStage === 'none'
              ? '🎄 圣诞周 · 今晚会遇见一个与通关无关、却与爱情有关的人'
              : state.loveStage === 'close'
                ? '🎄 圣诞周 · 和 TA 一起跨年 —— 这段关系已经走过了整个学期'
                : '🎄 圣诞周 · 和 TA 重逢 —— 迎新晚会之后,故事没有断'
            : player.turn === NEXT_SEMESTER_TURN
              ? '🌱 新学期开学 · 贵人会出现,能否被认可仍取决于能力、方向与概率'
              : '❄️ 寒假 · 暂时离开课表,但成长与关系还在继续'}
        </div>
      )}
      {pendingSpecialEvent && <SpecialEventBanner result={pendingSpecialEvent} />}
      <CampusMap />
      {phase === 'choose_destination' && !showOpening && (
        <div className="map-hint">
          {player.turn === NEXT_SEMESTER_TURN
            ? `新学期开学 · 点击${state.mentorUnlocked ? '贵人办公室' : '图书馆'}进入最终相遇`
            : '点击一栋建筑前往 · 骰子决定你到了之后发生什么'}
        </div>
      )}

      {showOpening && openingStep === 0 && (
        <BeatOverlay>
          <div className="panel opening-panel">
            <div className={`opening-cinematic${leaving ? ' opening-cinematic-leaving' : ''}`} key={runId}>
              <div className="opening-kicker">{story.kicker}</div>
              <div className="event-icon opening-hero">{story.icon}</div>
              <h2 className="opening-title">{story.title}</h2>
              <div className="opening-beats">
                {story.beats.map((beat) => (
                  <p key={beat} className="opening-beat">{beat}</p>
                ))}
              </div>
              <div className="opening-pager">1 / 2</div>
              <button className="btn btn-primary" onClick={() => goNext(1)}>
                接下来 →
              </button>
            </div>
          </div>
        </BeatOverlay>
      )}
      {showOpening && openingStep === 1 && (
        <BeatOverlay>
          <div className="panel opening-panel">
            <div className={`opening-cinematic${leaving ? ' opening-cinematic-leaving' : ''}`} key={`${runId}-goals`}>
              <div className="opening-kicker">人生目标 · 第一学期</div>
              <div className="event-icon opening-hero">🎯</div>
              <h2 className="opening-title">这一学期,你想成为谁?</h2>
              <div className="opening-goals">
                <div className="opening-goal opening-goal-wealth">
                  <span className="opening-goal-icon">💰</span>
                  <div>
                    <b>财富目标 · 第一桶金(模拟盘)</b>
                    <p>{player.origin === 'finance_dynasty'
                      ? '证明你自己,而不只是姓氏 —— 模拟盘 ¥300,000 起步,翻盘到 ¥500,000'
                      : '生活费 ¥1,000、模拟盘 ¥100,000 试炼场 —— 目标:翻盘到 ¥200,000 (大多数人会先亏到 5 万,再学乖)'}</p>
                  </div>
                </div>
                <div className="opening-goal opening-goal-love">
                  <span className="opening-goal-icon">❤️</span>
                  <div>
                    <b>爱情目标 · 一个能一起成长的人</b>
                    <p>迎新晚会上主动认识一个人。爱情不决定觉醒,但它决定这趟旅程里你身边有没有人。</p>
                  </div>
                </div>
              </div>
              <div className="opening-plan">{CAMPUS_SEMESTER_WEEKS} 周学期 + {WINTER_BREAK_WEEKS} 周寒假 + 新学期开学,一张校园地图。去哪,你自己定;骰子决定你到了之后会发生什么。</div>
              <div className="opening-pager">2 / 2</div>
              <button className="btn btn-primary" onClick={() => goNext(2)}>
                走进校园 →
              </button>
            </div>
          </div>
        </BeatOverlay>
      )}
      {phase === 'dice' && (
        <BeatOverlay>
          <DiceRoller dice={pendingDice} />
        </BeatOverlay>
      )}
      {phase === 'event' && pendingEvent && (
        <BeatOverlay>
          <EventModal offer={pendingEvent} />
        </BeatOverlay>
      )}
      {phase === 'invest' && (
        <BeatOverlay>
          <InvestPanel />
        </BeatOverlay>
      )}
      {phase === 'results' && pendingCoach && pendingDice && pendingAltFate && (
        <BeatOverlay wide>
          <div className="results-grid">
            <AICoachPanel coach={pendingCoach} investment={pendingInvestment} turn={player.turn} />
            <ParallelFateCard
              dice={pendingDice}
              altFate={pendingAltFate}
              realEventDelta={pendingRealEventDelta}
              realInvestment={pendingInvestment}
              realMentorHit={realMentorHit}
              altOrigin={altPlayer.origin}
            />
          </div>
        </BeatOverlay>
      )}
    </div>
  )
}
