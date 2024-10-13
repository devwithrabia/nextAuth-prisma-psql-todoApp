import { CSSProperties, FC, FormEvent } from 'react'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { GetData } from '@/types'
import { changeStatusStyle } from './style'
import ShowMessagesButton from '../showMessageButton/ShowMessagesButton'

interface TodoProps {
  todo: GetData
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const ChangeStatus: FC<TodoProps> = ({ todo, todos, setTodos, message, setMessage }) => {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/TodoApp/changestatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          todo
        })
      })

      const data = await res.json()

      console.log(data.changeStatus)

      const status = data.changeStatus

      setTodos(
        todos.map(item => {
          if (item.id === status.id) {
            return {
              ...item,
              isCompleted: status.isCompleted
            }
          }

          return item
        })
      )

      if (res.status === 201) {
        setMessage('Todo Updated')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <ShowMessagesButton message={message} styleButton={changeStatusStyle(todo)}>
        {todo.isCompleted ? (
          <CheckCircleIcon
            sx={{
              color: 'rgb(108, 117, 125)',
              BorderColor: '#17a2b8'
            }}
          />
        ) : (
          <RadioButtonUncheckedIcon
            sx={{
              color: '#17a2b8'
            }}
          />
        )}
      </ShowMessagesButton>
    </form>
  )
}

export default ChangeStatus
