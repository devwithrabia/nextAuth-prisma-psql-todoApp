import { CSSProperties, FC, FormEvent, useEffect, useState } from 'react'
import ChecklistRtlSharpIcon from '@mui/icons-material/ChecklistRtlSharp'
import EditAttributesIcon from '@mui/icons-material/EditAttributes'
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood'
import EditIcon from '@mui/icons-material/Edit'
import { GetData } from '@/types'
import ShowMessagesButton from './ShowMessagesButton'

interface TodoProps {
  todo: GetData
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const ChangeTodo: FC<TodoProps> = ({ todo, todos, setTodos, message, setMessage }) => {
  const editTodoStyle: CSSProperties = {
    backgroundColor: '#ffc107',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    height: '40px',
    width: '50px'
  }

  const updateTodoStyle: CSSProperties = {
    cursor: 'pointer',
    height: '40px',
    width: '50px',
    border: 'none',
    backgroundColor: '#6c757d',
    color: 'white'
  }
  const [input, setInput] = useState<string>('')
  const [edit, setIsEdit] = useState(false)

  const editHandler = () => {
    if (todo.isCompleted) {
      return
    }
    setIsEdit(!edit)
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setInput('')

    try {
      const res = await fetch('/api/TodoApp/changetodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input,
          todo
        })
      })

      const data = await res.json()
      const changeTodo = data.changeTodo

      console.log(data.changeTodo)

      setTodos(
        todos.map(item => {
          if (item.id === changeTodo.id) {
            return {
              ...item,
              title: changeTodo.title
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {edit && (
        <form onSubmit={submitHandler} style={{ display: 'flex' }}>
          <input
            type='text'
            placeholder='type your text here..'
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          <ShowMessagesButton style={updateTodoStyle} message={message}>
            <SecurityUpdateGoodIcon />
          </ShowMessagesButton>
        </form>
      )}

      <button onClick={editHandler} style={editTodoStyle}>
        <EditIcon fontSize='small' />
      </button>
    </div>
  )
}

export default ChangeTodo
