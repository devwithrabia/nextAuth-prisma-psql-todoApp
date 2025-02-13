import { styled } from '@mui/material'

export const Container = styled('div')<{ isCompleted: boolean }>(({ isCompleted }) => ({
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  border: '1px solid #ed4da',
  height: '40px'
}))
