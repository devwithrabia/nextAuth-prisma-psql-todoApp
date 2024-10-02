import { buttonProps } from '@/types'
import { FC } from 'react'

const Button: FC<buttonProps> = ({ type, text }) => {
  return <button type={type}>{text}</button>
}

export default Button
