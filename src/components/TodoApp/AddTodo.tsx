import { FC, FormEvent, useState } from 'react'
import Button from './Button'
import { TextField } from '@mui/material'
import { GetData } from '@/types'

interface IProps {
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

const AddTodo: FC<IProps> = ({ todos, setTodos }) => {
  const [input, setInput] = useState<string>('')

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
      console.log(addItem)

      setTodos([...todos, addItem])

      // console.log(data.todo)

      // if (res.ok) {
      //   router.push('/login')
      //   setError('')
      // } else {
      //   console.error('Registration failed')
      //   setError('registeration failed')
      // }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={submitHandler} style={{ display: 'flex', width: '70%' }}>
      <TextField
        type='text'
        variant='filled'
        placeholder='type your text here..'
        value={input}
        onChange={e => setInput(e.target.value)}
        sx={{ flex: '1' }}
      />
      <Button type='submit' text='Add' />
    </form>
  )
}
export default AddTodo
