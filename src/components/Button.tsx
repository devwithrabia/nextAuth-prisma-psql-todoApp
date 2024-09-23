import { buttonProps } from '@/types'
import { FC } from 'react'

export const Button: FC<buttonProps> = ({ type, text }) => {
  return <button type={type}>{text}</button>
}
