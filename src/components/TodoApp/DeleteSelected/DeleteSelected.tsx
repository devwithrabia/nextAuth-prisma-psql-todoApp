import { FC, FormEvent } from 'react'
import { GetData } from '@/types'
import { Form, styleDeleteSelected } from './style'
import { ShowMessagesButton } from '../showMessageButton/ShowMessagesButton'

interface IProps {
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const DeleteSelected: FC<IProps> = ({ todos, setTodos, message, setMessage }) => {
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

      if (res.status === 201) {
        setMessage('Delet Selected todos')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Form onSubmit={submitHandler}>
      <ShowMessagesButton message={message} styleButton={styleDeleteSelected}>
        Delete Selected
      </ShowMessagesButton>
    </Form>
  )
}
