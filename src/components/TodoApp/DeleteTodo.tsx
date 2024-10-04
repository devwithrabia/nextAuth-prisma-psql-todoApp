import { FC, FormEvent } from 'react'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { GetData } from '@/types'

interface GetDataProps {
  todo: GetData
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

const DeleteTodo: FC<GetDataProps> = ({ todo, todos, setTodos }) => {
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
      <form onSubmit={submitHandler}>
        <button
          type='submit'
          style={{
            color: todo.isCompleted ? 'black' : '#fff',
            backgroundColor: todo.isCompleted ? '#ffc107' : '#dc3545',
            border: 'none',
            borderBottomRightRadius: '5px',
            borderTopRightRadius: '5px',
            borderTopLeftRadius: 'none',
            textAlign: 'center',
            height: '40px',
            width: '50px',
            cursor: 'pointer'
          }}
        >
          <DeleteIcon fontSize='small' fontStyle='#ccc' />
        </button>
      </form>
    </div>
  )
}

export default DeleteTodo
