import { Fade, Slide, SlideProps, Snackbar } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { FC, ReactNode, useState } from 'react'
import { GetData, StyleAddTodo, StyleChangeStatus, StyleDeleteSelected, StyleDeleteTodo } from '@/types'
import { StyledButton } from './styles'

interface IProps {
  children: ReactNode
  message: string
  // styleButton: StyleDeleteSelected | StyleAddTodo
  styleButton: any
}

const ShowMessagesButton: FC<IProps> = ({ children, message, styleButton }) => {
  const [state, setState] = useState<{
    open: boolean
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>
      }
    >
  }>({
    open: false,
    Transition: Fade
  })

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction='up' />
  }

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>
        }
      >
    ) =>
    () => {
      setState({
        open: true,
        Transition
      })
    }

  const handleClose = () => {
    setState({
      ...state,
      open: false
    })
  }
  return (
    <>
      <StyledButton type='submit' onClick={handleClick(SlideTransition)} styleButton={styleButton}>
        {children}
      </StyledButton>

      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={message}
        key={state.Transition.name}
        autoHideDuration={1500}
      />
    </>
  )
}

export default ShowMessagesButton
