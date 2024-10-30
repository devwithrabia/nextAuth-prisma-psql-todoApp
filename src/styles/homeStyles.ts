import { Box, styled } from '@mui/material'

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '20px',
  width: '100%',
  backgroundColor: '#fff',
  boxSizing: 'border-box'
})

export const StyledBox = styled(Box)({
  backgroundColor: ' rgba(0,0,0,.03)',
  border: '1px solid rgba(0,0,0,.125)',
  borderRadius: '0.25rem'
})
