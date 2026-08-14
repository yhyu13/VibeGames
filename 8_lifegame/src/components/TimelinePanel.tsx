import { LIFE_TIMELINE, NEXT_SEMESTER_YEAR, SEMESTER_YEAR } from '../core/data/timeline'
import {
  CAMPUS_SEMESTER_WEEKS,
  INTRO_TURN_LIMIT,
  WINTER_BREAK_WEEKS,
} from '../core/types'

interface TimelinePanelProps {
  turn: number
}

function weekLabel(week: number): string {
  if (week <= CAMPUS_SEMESTER_WEEKS) return `学期 ${week}`
  if (week === INTRO_TURN_LIMIT) return '新学期开学'
  return `寒假 ${week - CAMPUS_SEMESTER_WEEKS}/${WINTER_BREAK_WEEKS}`
}

export function TimelinePanel({ turn }: TimelinePanelProps) {
  const currentWeek = Math.max(1, Math.min(INTRO_TURN_LIMIT, turn))

  return (
    <aside className="timeline-panel" aria-label="人生与时代时间线">
      <div className="timeline-heading">
        <strong>{SEMESTER_YEAR} → {NEXT_SEMESTER_YEAR}</strong>
        <span>历史背景 ≠ 投资建议</span>
      </div>
      <div className="timeline-milestones">
        {LIFE_TIMELINE.map((milestone) => (
          <div
            key={`${milestone.year}-${milestone.label}`}
            className={`timeline-milestone${milestone.year === NEXT_SEMESTER_YEAR ? ' timeline-milestone-current' : ''}`}
            title={milestone.detail}
          >
            <span>{milestone.icon}</span>
            <b>{milestone.year}</b>
            <i>{milestone.label}</i>
          </div>
        ))}
      </div>
      <div className="semester-track" role="group" aria-label={`${NEXT_SEMESTER_YEAR} 年第 ${currentWeek} 周，共 ${INTRO_TURN_LIMIT} 周`}>
        {Array.from({ length: INTRO_TURN_LIMIT }, (_, index) => {
          const week = index + 1
          const seasonClass = week <= CAMPUS_SEMESTER_WEEKS
            ? 'semester-week-campus'
            : week < INTRO_TURN_LIMIT
              ? 'semester-week-winter'
              : 'semester-week-spring'
          return (
            <span
              key={week}
              className={`${seasonClass}${week === currentWeek ? ' semester-week-current' : week < currentWeek ? ' semester-week-past' : ''}`}
              title={weekLabel(week)}
            >
              {week === INTRO_TURN_LIMIT ? '春' : week}
            </span>
          )
        })}
      </div>
    </aside>
  )
}
