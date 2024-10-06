import { Fade, Slide, SlideProps, Snackbar } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { CSSProperties, FC, ReactNode, useState } from 'react'

interface IProps {
  children: ReactNode
  style: CSSProperties | undefined
  message: string
}

const ShowMessagesButton: FC<IProps> = ({ children, style, message }) => {
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
      <button type='submit' onClick={handleClick(SlideTransition)} style={style}>
        {children}
      </button>

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
