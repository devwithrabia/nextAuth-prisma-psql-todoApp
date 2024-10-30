import { FC, FormEvent, useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { GetData } from '@/types'
import { EditTodoStyle, Input, changeTodoStyle } from './style'
import { ShowMessagesButton } from '../showMessageButton/ShowMessagesButton'
import FlipCameraAndroidTwoToneIcon from '@mui/icons-material/FlipCameraAndroidTwoTone'

interface TodoProps {
  todo: GetData
  todos: GetData[]
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

export const ChangeTodo: FC<TodoProps> = ({ todo, todos, setTodos, message, setMessage }) => {
  const [input, setInput] = useState<any>(todo.title)

  const [isVisible, setIsVisible] = useState(false)

  const inputRef = useRef<any>(null)

  const editHandler = () => {
    if (todo.isCompleted) {
      return
    }
    setIsVisible(!isVisible)
    inputRef.current.focus()
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(input)

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
    <form onSubmit={submitHandler} style={{ display: 'flex', flex: 1 }}>
      <Input
        type='text'
        placeholder='Todos'
        value={input}
        onChange={e => setInput(e.target.value)}
        ref={inputRef}
        isCompleted={todo.isCompleted}
      />

      {isVisible ? (
        <ShowMessagesButton message={message} styleButton={changeTodoStyle}>
          <FlipCameraAndroidTwoToneIcon fontSize='small' />
        </ShowMessagesButton>
      ) : (
        <EditTodoStyle>
          <EditIcon fontSize='small' onClick={editHandler} />
        </EditTodoStyle>
      )}
    </form>
  )
}
