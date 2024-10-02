import { ChangeEventHandler, FormEventHandler, ReactNode } from 'react'

export interface inputProps {
  type: string
  placeholder?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export interface formProps {
  children: ReactNode
  onSubmit?: FormEventHandler<HTMLFormElement>
}

export interface buttonProps {
  type?: 'button' | 'submit' | 'reset'
  //reactNode means instead of text user can pass icon whose type will be ReactNode
  text: 'string' | ReactNode
  onClick?: () => void
  actionButton?: boolean
  bgColor?: string
}
export interface GetData {
  id: string
  title: string | null
  isCompleted: boolean
}
