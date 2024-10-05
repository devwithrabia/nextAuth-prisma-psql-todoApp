import { FC, FormEvent, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
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
    <form
      onSubmit={submitHandler}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        fontFamily: 'sans-serif',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        boxSizing: 'border-box',
        paddingTop: '15px',
        paddingBottom: '30px'
      }}
    >
      <h1 style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.85)', fontWeight: '500', fontSize: '40px', margin: 0 }}>
        Todo App
      </h1>

      <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
        <input
          type='text'
          placeholder='Type Your Todos Here..'
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            width: '80%',
            color: '#495057',
            height: '35px',
            border: '1px solid #ced4da',
            paddingLeft: '5px',
            transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
          }}
        />

        <button
          type='submit'
          style={{
            backgroundColor: '#007bff',
            border: 'none',
            padding: '8px',
            boxSizing: 'border-box',
            borderBottomRightRadius: '5px',
            borderTopRightRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <AddIcon fontSize='small' sx={{ backgroundColor: '#fff', color: '#007bff' }} />
        </button>
      </div>
    </form>
  )
}
export default AddTodo
