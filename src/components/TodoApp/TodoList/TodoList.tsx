import { GetData } from '@/types'
import { FC } from 'react'
import { ChangeTodo } from '../ChangeTodo/ChangeTodo'
import { ChangeStatus } from '../ChangeStatus/ChangeStatus'
import { DeleteTodo } from '../DeleteTodo/DeleteTodo'
import { Container } from './styles'

interface IProps {
  todos: GetData[]
  todo: GetData
  message: string
  key: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

export const TodoList: FC<IProps> = ({ todos, setTodos, todo, message, setMessage, key }) => {
  return (
    <Container key={key} isCompleted={todo.isCompleted}>
      <ChangeStatus todo={todo} todos={todos} setTodos={setTodos} message={message} setMessage={setMessage} />

      <ChangeTodo todo={todo} todos={todos} setTodos={setTodos} message={message} setMessage={setMessage} />

      <DeleteTodo todo={todo} setTodos={setTodos} todos={todos} message={message} setMessage={setMessage} />
    </Container>
  )
}
