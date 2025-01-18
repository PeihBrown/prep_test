import { FC } from 'react'
import { Session } from '@/types/study-plan'
import { SessionCard } from '../../../components/SessionCard'

interface MonthGroupProps {
  month: string
  sessions: Session[]
}

export const MonthGroup: FC<MonthGroupProps> = ({ month, sessions }) => {
  const [monthNum, year] = month.split('-')

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-medium text-gray-500 mb-4 text-center">
        Tháng {monthNum}, {year}
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <SessionCard key={session.overall_index} session={session} />
        ))}
      </div>
    </div>
  )
}