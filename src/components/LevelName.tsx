import { FC } from 'react'

interface LevelNameProps {
  levelName: string
}

export const LevelName: FC<LevelNameProps> = ({ levelName }) => {
  return (
    <h2 className="text-2xl font-bold mb-4 text-white">
      Chặng: {levelName}
    </h2>
  )
} 