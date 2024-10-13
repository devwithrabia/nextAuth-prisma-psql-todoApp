import { GetData } from '@/types'
import { FC, Key } from 'react'

import ChangeTodo from './ChangeTodo/ChangeTodo'
import ChangeStatus from './ChangeStatus/ChangeStatus'
import DeleteTodo from './DeleteTodo/DeleteTodo'

interface IProps {
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
  todo: GetData
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const TodoList: FC<IProps> = ({ todos, setTodos, todo, message, setMessage }) => {
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
      key={todo.id}
    >
      <ChangeStatus todo={todo} todos={todos} setTodos={setTodos} message={message} setMessage={setMessage} />

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

      <ChangeTodo todo={todo} todos={todos} setTodos={setTodos} message={message} setMessage={setMessage} />

      <DeleteTodo todo={todo} setTodos={setTodos} todos={todos} message={message} setMessage={setMessage} />
    </div>
  )
}

export default TodoList
