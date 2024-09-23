import { FC, FormEvent, useEffect, useState } from 'react'
import { Input } from './Input'
import Form from './Form'
import Button from './Button'

// interface IProps {
//   todoId: string
//   // setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
// }

interface IProps {
  title: string | null
  id: string
  isCompleted: boolean
}
interface TodoProps {
  todo: IProps
}

const ChangeTodo: FC<TodoProps> = ({ todo }) => {
  const [input, setInput] = useState<string>('')
  const [edit, setIsEdit] = useState(false)

  const editHandler = () => {
    if (todo.isCompleted) {
      return
    }
    setIsEdit(!edit)
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault()

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

      console.log(data.update)

      setIsEdit(false)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={editHandler}>edit</button>
      {edit && (
        <Form onSubmit={submitHandler}>
          <Input
            type='text'
            placeholder='type your text here..'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <Button type='submit' text='Change' />
        </Form>
      )}
    </div>
  )
}

export default ChangeTodo
