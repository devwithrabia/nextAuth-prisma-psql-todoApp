import { FC, FormEvent } from 'react'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { GetData } from '@/types'

interface IProps {
  todos: GetData[]
  setTodos: React.Dispatch<React.SetStateAction<GetData[]>>
}

const styleButton = {
  border: '1px solid red',
  color: '#dc3545',
  width: '100%',
  height: '35px',

  '&:hover': {
    backgroundColor: '#dc3545',
    color: 'white'
  }
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
    <form onSubmit={submitHandler} style={{ width: '100%', fontWeight: '400', fontFamily: 'sans-serif' }}>
      <Button variant='outlined' type='submit' sx={styleButton}>
        Delete Selected
      </Button>
    </form>
  )
}

export default DeleteSelected
