import { FC, FormEvent } from 'react'
import Form from './Form'
import Button from './Button'

interface IProps {
  todoId: string
}

const DeleteTodo: FC<IProps> = ({ todoId }) => {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault()

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

      console.log(data.update)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Button type='submit' text='Delete' />
      </Form>
    </div>
  )
}

export default DeleteTodo
