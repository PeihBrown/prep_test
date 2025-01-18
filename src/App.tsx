import { Providers } from './app/providers'
import { useMemo } from 'react'
import { useStudyPlan } from './features/overview/hooks/useStudyPlan'
import { LevelName } from './components/LevelName'
import { MonthGroup } from './features/overview/components/MonthGroup'
import { Progress } from './features/overview/components/Progress'

function App() {
  const { data, isLoading, getSessionsByMonth } = useStudyPlan()

  const sessionsByMonth = useMemo(() => {
    if (!data) return {}
    return getSessionsByMonth()
  }, [data, getSessionsByMonth])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <Providers>
      <div className="min-h-screen w-[100vw] overflow-x-hidden bg-gradient-primary p-10">
        <div className="container mx-auto py-8 px-4 rounded-2xl">
          <LevelName levelName={data.level_name} />
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 bg-white rounded-2xl p-4">
              <div className="flex justify-start items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <div className="px-4 py-2 bg-transparent text-black border border-gray-300 rounded-lg">
                  Hôm nay
                </div>
                <h1 className="text-xl font-medium text-gray-500">Tổng quan</h1>
              </div>

              {Object.entries(sessionsByMonth).map(([month, sessions]) => (
                <MonthGroup key={month} month={month} sessions={sessions} />
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:w-96">
              <Progress 
                missions={data.missions}
                remainingDuration={data.remaining_duration}
                duration={data.duration}
              />
            </div>
          </div>
        </div>
      </div>
    </Providers>
  )
}

export default App
