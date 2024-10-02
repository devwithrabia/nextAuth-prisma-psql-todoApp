import { FC, FormEvent } from 'react'
import Form from './Form'
import DeleteIcon from '@mui/icons-material/Delete'
import { GetData } from '@/types'

interface GetDataProps {
  todos: GetData[]
  todoId: string
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

const DeleteTodo: FC<GetDataProps> = ({ todoId, todos, setTodos }) => {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/TodoApp/deletetodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          todoId
        })
      })

      const data = await res.json()
      const deleteItem = data.deleteTodo

      // console.log(deleteItem)

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
    <div>
      <Form onSubmit={submitHandler}>
        <button
          type='submit'
          style={{ backgroundColor: 'lightslategray', color: 'darkred', border: 'none', cursor: 'pointer' }}
        >
          <DeleteIcon />
        </button>
      </Form>
    </div>
  )
}

export default DeleteTodo
