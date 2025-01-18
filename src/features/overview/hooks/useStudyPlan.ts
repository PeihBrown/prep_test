import { useEffect, useCallback } from 'react'
import { useStudyPlanStore } from '@/stores/useStudyPlanStore'
import { Session } from '@/types/study-plan'

export const useStudyPlan = () => {
  const { data, isLoading, error, fetchData } = useStudyPlanStore()

  useEffect(() => {
    fetchData()
  }, [])

  const getSessionsByMonth = useCallback(() => {
    if (!data?.sessions) return {}

    return data.sessions.reduce((acc, session) => {
      if (!session.date) return acc
      
      const date = new Date(session.date)
      const monthKey = `${date.getMonth() + 1}-${date.getFullYear()}`
      
      if (!acc[monthKey]) {
        acc[monthKey] = []
      }
      
      acc[monthKey].push(session)
      return acc
    }, {} as Record<string, Session[]>)
  }, [data?.sessions])

  const getTodaySession = useCallback(() => {
    if (!data?.sessions) return null
    
    const today = new Date().toISOString().split('T')[0]
    return data.sessions.find(session => session.date === today)
  }, [data?.sessions])

  const getUnitTitle = useCallback((unitId: number) => {
    return data?.units.find(unit => unit.unit_id === unitId)?.unit_title
  }, [data?.units])

  return {
    data,
    isLoading,
    error,
    getSessionsByMonth,
    getTodaySession,
    getUnitTitle,
  }
} 