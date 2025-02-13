import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { GetData } from '@/types'
import { Form, Heading, Input, InputContainer, addTodoStyle } from './style'
import { ShowMessagesButton } from '../showMessageButton/ShowMessagesButton'

interface IProps {
  todos: GetData[]
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

export const AddTodo: FC<IProps> = ({ todos, setTodos, message, setMessage }) => {
  const [input, setInput] = useState<string>('')

  const inputRef = useRef<any>(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setInput('')

    try {
      const res = await fetch('/api/TodoApp/addtodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input
        })
      })

      const data = await res.json()
      const addItem = data.createTodo

      setTodos([...todos, addItem])

      if (res.status === 201) {
        setMessage('Todo Added')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form onSubmit={submitHandler}>
      <Heading>Todo App</Heading>

      <InputContainer>
        <Input
          type='text'
          placeholder='Todos Description'
          value={input}
          onChange={e => setInput(e.target.value)}
          ref={inputRef}
        />

        <ShowMessagesButton message={message} styleButton={addTodoStyle}>
          <AddIcon fontSize='small' sx={{ backgroundColor: '#fff', color: '#007bff', borderRadius: '50%' }} />
        </ShowMessagesButton>
      </InputContainer>
    </Form>
  )
}
