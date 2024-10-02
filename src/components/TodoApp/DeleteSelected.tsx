import { FC, FormEvent } from 'react'
import Button from './Button'
import Form from './Form'
import { GetData } from '@/types'

interface IProps {
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

const DeleteSelected: FC<IProps> = ({ todos, setTodos }) => {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/TodoApp/deleteselected', {
        method: 'POST'
      })

      const data = await res.json()
      console.log(data.deleteSelected)

      setTodos(
        todos.filter(item => {
          if (item.isCompleted !== true) {
            return item
          }
        })
      )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Form onSubmit={submitHandler}>
      <Button type='submit' text='delete Selected' />
    </Form>
  )
}

export default DeleteSelected
