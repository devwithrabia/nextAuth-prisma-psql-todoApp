import { GetData } from '@/types'
import { styled } from '@mui/material'

export const EditTodoStyle = styled('button')({
  backgroundColor: '#ffc107',
  color: 'black',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'center',
  height: '40px',
  width: '40px',

  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px'
})

export const changeTodoStyle = () => {
  return {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    height: '40px',
    width: '40px',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px'
  }
}

export const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
})

export const Input = styled('input')<{ isCompleted: boolean }>(({ isCompleted }) => ({
  flex: 1,
  backgroundColor: isCompleted ? 'rgb(195, 251, 165)' : 'rgb(200, 218, 247)',
  border: '1px solid #ced4da',
  textDecoration: isCompleted ? 'line-through' : 'none',
  paddingLeft: '20px',
  color: '#495057',
  fontWeight: '400',
  fontSize: '1rem',
  fontFamily: 'sans-serif'
}))
