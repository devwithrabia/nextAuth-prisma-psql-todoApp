import { FC, FormEvent } from 'react'
import Form from './Form'
import Button from './Button'
import CheckSharpIcon from '@mui/icons-material/CheckSharp'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import { GetData } from '@/types'

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
      <Form onSubmit={submitHandler}>
        <button
          type='submit'
          style={{ backgroundColor: 'lightslategray', color: 'darkred', border: 'none', cursor: 'pointer' }}
        >
          {todo.isCompleted ? <CheckSharpIcon /> : <CloseSharpIcon />}
        </button>
      </Form>
    </div>
  )
}

export default ChangeStatus
