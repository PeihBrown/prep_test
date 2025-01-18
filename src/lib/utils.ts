import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
} 

export const formatDate = (date: string) => {
    const d = new Date(date)
    const weekday = d.toLocaleDateString('vi-VN', { weekday: 'long' })
    return `${weekday}, ${d.getDate()} thg ${d.getMonth() + 1}`
}