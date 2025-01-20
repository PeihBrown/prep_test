import { FC } from 'react'

interface UserInfoProps {
  name?: string
  onNameChange?: (name: string) => void
}

const UserInfo: FC<UserInfoProps> = ({ name = '', onNameChange }) => {
  return (
    <div className="bg-transparent rounded-2xl w-full flex flex-col items-center">
        <div className="relative w-full">
            <input
                type="text"
                value={name}
                onChange={(e) => onNameChange?.(e.target.value)}
                placeholder="Tên của ứng viên"
                className="w-full h-[56px] bg-[#ffffff5e] mt-4 px-4 py-2 mb-5 border border-transparent rounded-lg text-center placeholder-white"
            />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[12px] w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-[#ffffff5e] border-r-[8px] border-r-transparent"></div>
        </div>
        <img 
          src="/leader.png" 
          alt="Leader avatar" 
          className="w-[267px] h-[286px] object-contain"
        />
    </div>
  )
}

export default UserInfo