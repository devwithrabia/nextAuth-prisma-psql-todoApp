import { FC, FormEvent, useState } from 'react'
import Button from './Button'
import { Input } from './Input'
import Form from './Form'
//here we use simple form instead of react hook form
const AddTodo: FC = () => {
  const [input, setInput] = useState<string>('')

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault()

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

      // const data = await res.json()

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
    <div>
      <Form onSubmit={submitHandler}>
        <Input type='text' placeholder='type your text here..' value={input} onChange={e => setInput(e.target.value)} />
        <Button type='submit' text='Add' />
      </Form>
    </div>
  )
}
export default AddTodo
