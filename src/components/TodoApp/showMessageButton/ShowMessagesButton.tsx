import { Alert, Snackbar } from '@mui/material'
import { FC, ReactNode, useState } from 'react'
import { StyledButton } from './styles'

interface IProps {
  children: ReactNode
  message: string
  styleButton: object
}

export const ShowMessagesButton: FC<IProps> = ({ children, message, styleButton }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <StyledButton type='submit' onClick={handleClick} styleButton={styleButton}>
        {children}
      </StyledButton>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' variant='filled' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
