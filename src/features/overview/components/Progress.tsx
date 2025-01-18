import { FC } from 'react'
import { Missions } from '@/types/study-plan'
import { Trophy } from 'lucide-react'

interface ProgressProps {
  missions: Missions
  remainingDuration: number
  duration: number
}

export const Progress: FC<ProgressProps> = ({ missions, remainingDuration, duration }) => {
  const actualProgress = (missions.actual_completed_units / missions.total_units) * 100
  const expectedProgress = (missions.expected_completed_units / missions.total_units) * 100

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Tiến độ học</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Số ngày còn lại</span>
          <span className="text-gray-900">{remainingDuration}/{duration} ngày</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Số cúp đã đạt</span>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-900">{missions.earned_cups}/{missions.total_cups}</span>
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-sm mb-2">Số Unit đạt 02 cúp/ Tổng số Unit</p>
          
          <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
            {/* Expected Progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${expectedProgress}%` }}
            />
            {/* Actual Progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              style={{ width: `${actualProgress}%` }}
            />
          </div>

          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-600">Thực tế:</span>
              <span className="text-gray-900">{missions.actual_completed_units}/{missions.total_units} Units</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-gray-600">Kế hoạch:</span>
              <span className="text-gray-900">{missions.expected_completed_units}/{missions.total_units} Units</span>
            </div>
          </div>

          <p className="text-sm mt-2 text-gray-500">
            {missions.actual_completed_units < missions.expected_completed_units 
              ? "Bạn đang học chậm hơn kế hoạch"
              : missions.actual_completed_units > missions.expected_completed_units
                ? "Bạn đang học nhanh hơn kế hoạch"
                : "Bạn đang học đúng kế hoạch"
            }
          </p>
        </div>
      </div>
    </div>
  )
} 