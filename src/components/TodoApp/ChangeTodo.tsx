import { FC, FormEvent, useEffect, useState } from 'react'
import { Input } from './Input'
import Form from './Form'
import EditSharpIcon from '@mui/icons-material/EditSharp'
import Button from './Button'
import ChangeCircleSharpIcon from '@mui/icons-material/ChangeCircleSharp'
import { IconButton } from '@mui/material'
import { GetData } from '@/types'

interface TodoProps {
  todo: GetData
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

const ChangeTodo: FC<TodoProps> = ({ todo, todos, setTodos }) => {
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

      setIsEdit(false)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        onClick={editHandler}
        style={{ backgroundColor: 'lightslategray', color: 'darkred', border: 'none', cursor: 'pointer' }}
      >
        <EditSharpIcon />
      </button>

      {edit && (
        <form onSubmit={submitHandler} style={{ display: 'flex' }}>
          <Input
            type='text'
            placeholder='type your text here..'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type='submit'
            style={{ backgroundColor: 'lightslategray', color: 'darkred', border: 'none', cursor: 'pointer' }}
          >
            UpdateTodo
          </button>
        </form>
      )}
    </div>
  )
}

export default ChangeTodo
