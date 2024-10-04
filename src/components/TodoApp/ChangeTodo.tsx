import { FC, FormEvent, useEffect, useState } from 'react'
import ChecklistRtlSharpIcon from '@mui/icons-material/ChecklistRtlSharp'
import EditAttributesIcon from '@mui/icons-material/EditAttributes'
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood'
import EditIcon from '@mui/icons-material/Edit'
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
      {edit && (
        <form onSubmit={submitHandler} style={{ display: 'flex' }}>
          <input
            type='text'
            placeholder='type your text here..'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type='submit'
            style={{
              cursor: 'pointer',
              height: '40px',
              width: '50px',
              border: 'none',
              backgroundColor: '#6c757d',
              color: 'white'
            }}
          >
            <SecurityUpdateGoodIcon />
          </button>
        </form>
      )}

      <button
        onClick={editHandler}
        style={{
          backgroundColor: '#ffc107',
          color: 'black',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'center',
          height: '40px',
          width: '50px'
        }}
      >
        <EditIcon fontSize='small' />
      </button>
    </div>
  )
}

export default ChangeTodo
