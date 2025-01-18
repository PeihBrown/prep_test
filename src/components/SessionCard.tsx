import { FC } from 'react'
import { Session } from '@/types/study-plan'
import { cn, formatDate } from '@/lib/utils'
import { Hexagon, Trophy, CircleCheck, CircleAlert, Target } from 'lucide-react'
import { useStudyPlan } from '@/features/overview/hooks/useStudyPlan'

interface SessionCardProps {
  session: Session
}

export const SessionCard: FC<SessionCardProps> = ({ session }) => {
  const { getUnitTitle } = useStudyPlan()

  const getCardStyle = () => {
    const today = new Date().toISOString().split('T')[0]
    
    if (session.completed) {
      return 'bg-green-50 hover:border-green-200 border-transparent'
    }
    if (session.date === today) {
      return 'bg-blue-50 border-blue-400'
    }
    if (session.date && session.date < today) {
      return 'bg-orange-50 hover:border-orange-200 border-transparent'
    }
    return 'bg-gray-50 hover:border-gray-200 border-transparent'
  }
  
  const getStatusColor = () => {
    if (session.completed) return 'text-green-500'
    if (!session.date) return 'text-gray-400'
    
    const today = new Date().toISOString().split('T')[0]
    if (session.date < today) return 'text-orange-500'
    if (session.date === today) return 'text-blue-500'
    return 'text-gray-400'
  }

  const getStatusIcon = () => {
    if (session.completed) return <CircleCheck className="w-4 h-4" />

    if (!session.date) return null

    const today = new Date().toISOString().split('T')[0]

    if (session.date < today) return <CircleAlert className="w-4 h-4" />
    if (session.date === today) return <Target className="w-4 h-4" />

    return null
  }

  const getStatusText = () => {
    if (session.completed && session.completion_date) return (
      <p className="text-green-500">
        Đã hoàn thành: {formatDate(session.completion_date)}
      </p>
    )
    if (session.completed && !session.date) return (
      <p className="text-green-500">
        Đã hoàn thành trước khi khởi tạo Study Plan
      </p>
    )

    const today = new Date().toISOString().split('T')[0]
    if (session.date === today) return null
    if (!session.completed && session?.date && session?.date < today) return (
      <p className="text-orange-500">
        Bạn chưa hoàn thành buổi học này
      </p>
    )
  }

  return (
    <div className={cn(
      "p-4 rounded-2xl border transition-colors min-h-[192px] flex flex-col justify-between",
      getCardStyle()
    )}>
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className={cn(
              "font-medium px-2 py-1 rounded-xl text-sm flex items-center gap-2 text-white",
              session.completed ? "bg-green-500" :
              session.date === new Date().toISOString().split('T')[0] ?
              "bg-blue-500" : 
              session?.date && session?.date < new Date().toISOString().split('T')[0] ?
              "bg-orange-500" : "bg-gray-400"
            )}>
              <span>Buổi {session.overall_index}</span>
              <span>{getStatusIcon()}</span>
            </div>
            {session.date && (
              <h4 className="text-sm text-gray-800 font-extrabold">
                {formatDate(session.date)}
              </h4>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="font-medium text-[#727E90]">
              {session.proficiency}/{session.total_proficiency}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 mt-3">
          {session.unit_ids.map((unitId) => (
            <div key={unitId} className="flex items-center gap-2">
              <Hexagon 
                className={cn(
                  "w-2 h-2 min-w-2 min-h-2 max-w-2 max-h-2 fill-current", 
                  getStatusColor()
                )} 
              />
              <span className={cn(
                "text-sm hover:underline hover:text-blue-500 cursor-pointer",
              )}>
                {getUnitTitle(unitId)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-sm">
        {getStatusText()}
      </div>
    </div>
  )
} 