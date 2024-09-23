import { FC, FormEvent } from 'react'
import Form from './Form'
import Button from './Button'

interface IProps {
  title: string | null
  id: string
  isCompleted: boolean
}
interface TodoProps {
  todo: IProps
}

const ChangeStatus: FC<TodoProps> = ({ todo }) => {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault()

    try {
      const res = await fetch('/api/TodoApp/changestatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          todo
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
        <Button type='submit' text={todo.isCompleted ? 'done' : 'not-done'} />
      </Form>
    </div>
  )
}

export default ChangeStatus
