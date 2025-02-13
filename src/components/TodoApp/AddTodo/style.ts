import { styled } from '@mui/material'

export const addTodoStyle = () => {
  return {
    backgroundColor: '#007bff',
    border: 'none',
    padding: '8px',
    borderBottomRightRadius: '5px',
    borderTopRightRadius: '5px',
    cursor: 'pointer'
  }
}

export const Form = styled('form')({
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
})

export const Heading = styled('h1')({
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.85)',
  fontWeight: '500',
  fontSize: '40px',
  margin: 0
})

export const InputContainer = styled('div')({
  width: '100%',
  justifyContent: 'center',
  display: 'flex'
})

export const Input = styled('input')({
  width: '80%',
  color: '#495057',
  height: '35px',
  border: '1px solid #ced4da',
  paddingLeft: '5px',
  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
  fontWeight: '400',
  fontSize: '1rem',
  fontFamily: 'sans-serif'
})
