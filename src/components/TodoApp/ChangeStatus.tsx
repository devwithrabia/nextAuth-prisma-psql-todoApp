import { CSSProperties, FC, FormEvent } from 'react'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { GetData } from '@/types'
import { BorderColor } from '@mui/icons-material'
import ShowMessagesButton from './ShowMessagesButton'

interface TodoProps {
  todo: GetData
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const ChangeStatus: FC<TodoProps> = ({ todo, todos, setTodos, message, setMessage }) => {
  const buttonStyle: CSSProperties = {
    backgroundColor: 'white',
    cursor: 'pointer',
    textAlign: 'center',
    height: '40px',
    width: '35px',
    borderColor: todo.isCompleted ? 'rgb(195, 251, 165)' : 'rgb(200, 218, 247)',
    borderRight: 'none'
  }

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
    <div>
      <form onSubmit={submitHandler}>
        <ShowMessagesButton style={buttonStyle} message={message}>
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
    </div>
  )
}

export default ChangeStatus
