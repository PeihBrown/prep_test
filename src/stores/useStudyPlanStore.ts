import { create } from 'zustand'
import { mockData } from '@/data/mock-data'
import type { StudyPlanData } from '@/types/study-plan'

interface StudyPlanStore {
  data: StudyPlanData | null
  isLoading: boolean
  error: string | null
  fetchData: () => Promise<void>
}

export const useStudyPlanStore = create<StudyPlanStore>((set) => ({
  data: mockData.data,
  isLoading: false,
  error: null,
  fetchData: async () => {
    if (mockData.data) return
    
    set({ isLoading: true })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      set({ data: mockData.data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch data', isLoading: false })
    }
  },
})) 