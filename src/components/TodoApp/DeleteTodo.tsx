import { CSSProperties, FC, FormEvent } from 'react'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { GetData } from '@/types'
import ShowMessagesButton from './ShowMessagesButton'

interface GetDataProps {
  todo: GetData
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const DeleteTodo: FC<GetDataProps> = ({ todo, todos, setTodos, message, setMessage }) => {
  const deleteButtonStyle: CSSProperties = {
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
  }
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

      setTodos(
        todos.filter(item => {
          if (item.id !== deleteItem.id) {
            return item
          }
        })
      )

      if (res.status === 201) {
        setMessage('Delete Todo')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <ShowMessagesButton style={deleteButtonStyle} message={message}>
          <DeleteIcon fontSize='small' fontStyle='#ccc' />
        </ShowMessagesButton>
      </form>
    </div>
  )
}

export default DeleteTodo
