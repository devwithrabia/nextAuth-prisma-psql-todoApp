import { styled } from '@mui/material'

export const styleDeleteSelected = () => {
  return {
    border: '1px solid red',
    backgroundColor: 'white',
    color: '#dc3545',
    width: '100%',
    height: '35px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#dc3545',
      color: 'white'
    }
  }
}

export const Form = styled('form')({
  width: '100%',
  fontWeight: '400',
  fontFamily: 'sans-serif'
})
