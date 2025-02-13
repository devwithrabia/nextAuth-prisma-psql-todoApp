import { FC, FormEvent } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { GetData } from '@/types'
import { deleteTodoStyle } from './style'
import { ShowMessagesButton } from '../showMessageButton/ShowMessagesButton'

interface GetDataProps {
  todo: GetData
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const DeleteTodo: FC<GetDataProps> = ({ todo, todos, setTodos, message, setMessage }) => {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/TodoApp/deletetodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          todo
        })
      })

      const data = await res.json()
      const deleteItem = data.deleteTodo

      if (res.status === 201) {
        setMessage('Delete Todo')
      }

      setTodos(
        todos.filter(item => {
          if (item.id !== deleteItem.id) {
            return item
          }
        })
      )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <ShowMessagesButton message={message} styleButton={deleteTodoStyle(todo)}>
        <DeleteIcon fontSize='small' />
      </ShowMessagesButton>
    </form>
  )
}
