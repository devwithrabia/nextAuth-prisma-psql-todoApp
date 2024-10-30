import { GetData } from '@/types'

export const deleteTodoStyle = (todo: GetData) => {
  return {
    color: todo.isCompleted ? 'black' : '#fff',
    backgroundColor: todo.isCompleted ? '#ffc107' : '#dc3545',
    border: 'none',
    borderBottomRightRadius: '4px',
    borderRadius: '4px',
    textAlign: 'center',
    height: '40px',
    width: '40px',
    cursor: 'pointer'
  }
}
