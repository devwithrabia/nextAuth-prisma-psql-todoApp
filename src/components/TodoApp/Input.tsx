import { inputProps } from '@/types'
import { FC } from 'react'

export const Input: FC<inputProps> = ({ type, placeholder, value, onChange }) => {
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
}
