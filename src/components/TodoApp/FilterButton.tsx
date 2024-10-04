import { GetData } from '@/types'
import { Button, ButtonGroup } from '@mui/material'
import { FC } from 'react'

interface IProps {
  showAll: () => void
  showActive: () => void
  resolvedTodo: () => void
}

const FilterButton: FC<IProps> = ({ showAll, showActive, resolvedTodo }) => {
  return (
    <div style={{ borderTop: '1px solid rgba(0,0,0,.125)', width: '100%', textAlign: 'center', padding: '20px' }}>
      <ButtonGroup variant='contained' aria-label='Basic button group'>
        <Button onClick={showAll}>All</Button>
        <Button onClick={showActive}> Active</Button>
        <Button onClick={resolvedTodo}>resolved</Button>
      </ButtonGroup>
    </div>
  )
}

export default FilterButton
