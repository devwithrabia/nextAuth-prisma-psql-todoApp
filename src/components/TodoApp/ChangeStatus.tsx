import { FC, FormEvent } from 'react'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { GetData } from '@/types'
import { BorderColor } from '@mui/icons-material'

interface TodoProps {
  todo: GetData
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

const ChangeStatus: FC<TodoProps> = ({ todo, todos, setTodos }) => {
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
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <button
          type='submit'
          style={{
            backgroundColor: 'white',
            cursor: 'pointer',
            textAlign: 'center',
            height: '40px',
            width: '35px',
            borderColor: todo.isCompleted ? 'rgb(195, 251, 165)' : 'rgb(200, 218, 247)',
            borderRight: 'none'
          }}
        >
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
        </button>
      </form>
    </div>
  )
}

export default ChangeStatus
