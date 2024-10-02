import { GetData } from '@/types'
import { FC } from 'react'
import ChangeStatus from './ChangeStatus'
import ChangeTodo from './ChangeTodo'
import DeleteTodo from './DeleteTodo'

interface IProps {
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
  todo: GetData
  indx: number
}

const TodoList: FC<IProps> = ({ todos, setTodos, todo, indx }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'lightslategray',
        boxShadow: '10px 10px 10px  #ccc',
        padding: '5px',
        boxSizing: 'border-box'
      }}
      key={indx}
    >
      <ChangeStatus todo={todo} todos={todos} setTodos={setTodos} />

      <p
        style={{
          textDecoration: todo.isCompleted ? 'line-through' : 'none',
          flex: '1',
          textAlign: 'center',
          color: 'darkred',
          fontWeight: '20px'
        }}
      >
        {todo.title}
      </p>

      <ChangeTodo todo={todo} todos={todos} setTodos={setTodos} />

      <DeleteTodo todoId={todo.id} setTodos={setTodos} todos={todos} />
    </div>
  )
}

export default TodoList
