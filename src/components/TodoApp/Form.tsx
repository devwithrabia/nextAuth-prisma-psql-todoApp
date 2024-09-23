import { formProps } from '@/types'
import { FC } from 'react'

const Form: FC<formProps> = ({ children, onSubmit }) => {
  //in server actions all data in form autometic transfer to the functiondefined in action
  return <form onSubmit={onSubmit}>{children}</form>
}
export default Form
