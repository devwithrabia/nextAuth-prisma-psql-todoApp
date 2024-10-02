import { GetData } from '@/types'
import { FC } from 'react'

interface IProps {
  showAll: () => void
  showActive: () => void
  resolvedTodo: () => void
}

const FilterButton: FC<IProps> = ({ showAll, showActive, resolvedTodo }) => {
  return (
    <>
      <button onClick={showActive}>Active</button>
      <button onClick={showAll}>All</button>
      <button onClick={resolvedTodo}>Resolved</button>
    </>
  )
}

export default FilterButton
