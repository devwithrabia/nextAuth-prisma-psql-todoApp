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
        backgroundColor: todo.isCompleted ? 'rgb(195, 251, 165)' : 'rgb(200, 218, 247)',
        boxSizing: 'border-box',
        border: '1px solid #ced4da',
        height: '40px'
      }}
      key={indx}
    >
      <ChangeStatus todo={todo} todos={todos} setTodos={setTodos} />

      <p
        style={{
          textDecoration: todo.isCompleted ? 'line-through' : 'none',
          paddingLeft: '20px',
          flex: '1',
          color: '#495057',
          fontWeight: '400',
          fontSize: '1rem',
          fontFamily: 'sans-serif'
        }}
      >
        {todo.title}
      </p>

      <ChangeTodo todo={todo} todos={todos} setTodos={setTodos} />

      <DeleteTodo todo={todo} setTodos={setTodos} todos={todos} />
    </div>
  )
}

export default TodoList
