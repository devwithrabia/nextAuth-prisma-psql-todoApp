import { GetData } from '@/types'

export const changeStatusStyle = (todo: GetData) => {
  return {
    backgroundColor: 'white',
    cursor: 'pointer',
    textAlign: 'center',
    height: '40px',
    width: '35px',
    borderColor: todo.isCompleted ? 'rgb(195, 251, 165)' : 'rgb(200, 218, 247)',
    borderRight: 'none'
  }
}
