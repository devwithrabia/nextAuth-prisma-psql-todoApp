import { GetData } from '@/types'
import { Button, ButtonGroup } from '@mui/material'
import { FC } from 'react'
import { ButtonContainer } from './styles'

interface IProps {
  showAll: () => void
  showActive: () => void
  resolvedTodo: () => void
}

export const FilterButton: FC<IProps> = ({ showAll, showActive, resolvedTodo }) => {
  return (
    <ButtonContainer>
      <ButtonGroup variant='contained' aria-label='Basic button group'>
        <Button onClick={showAll}>All</Button>
        <Button onClick={showActive}> Active</Button>
        <Button onClick={resolvedTodo}>resolved</Button>
      </ButtonGroup>
    </ButtonContainer>
  )
}
