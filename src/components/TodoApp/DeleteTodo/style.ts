import { GetData } from '@/types'

export const deleteTodoStyle = (todo: GetData) => {
  return {
    color: todo.isCompleted ? 'black' : '#fff',
    backgroundColor: todo.isCompleted ? '#ffc107' : '#dc3545',
    border: 'none',
    borderBottomRightRadius: '5px',
    borderTopRightRadius: '5px',
    borderTopLeftRadius: 'none',
    textAlign: 'center',
    height: '40px',
    width: '50px',
    cursor: 'pointer'
  }
}
