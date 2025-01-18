export interface Unit {
  unit_id: number
  unit_title: string
}

export interface Session {
  completion_date: string | null
  date: string | null
  is_scheduled: boolean
  overall_index: number
  unit_ids: number[]
  proficiency: number
  total_proficiency: number
  completed: boolean
  day_of_week?: number
}

export interface Missions {
  total_units: number
  total_cups: number
  actual_completed_units: number
  expected_completed_units: number
  earned_cups: number
}

export interface StudyPlanData {
  level_name: string
  duration: number
  remaining_duration: number
  units: Unit[]
  sessions: Session[]
  missions: Missions
}

export interface StudyPlanResponse {
  data: StudyPlanData
} 