import { buttonProps } from '@/types'
import { FC } from 'react'

const Button: FC<buttonProps> = ({ type, text, onClick, actionButton, bgColor, ...props }) => {
  return (
    <button onClick={onClick} type={type}>
      {text}
    </button>
  )
}

export default Button
