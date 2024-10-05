import AddTodo from '@/components/TodoApp/AddTodo'
import DeleteSelected from '@/components/TodoApp/DeleteSelected'
import FilterButton from '@/components/TodoApp/FilterButton'
import TodoList from '@/components/TodoApp/TodoList'
import { prisma } from '@/lib/db'
import { GetData } from '@/types'
import { Box } from '@mui/material'
import { InferGetServerSidePropsType, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ getTodo }) => {
  //authenticate user:
  const { data: session, status } = useSession()

  const router = useRouter()

  if (status === 'unauthenticated') {
    router.push('/login')
  }

  //Todo App:

  const [todos, setTodos] = useState<GetData[]>(getTodo)

  const [done, setDone] = useState<boolean | null>()

  useEffect(() => {
    setDone(null)
  }, [])

  const showAll = () => {
    setDone(null)
  }

  const showActive = () => {
    setDone(false)
  }

  const resolvedTodo = () => {
    setDone(true)
  }

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        maxWidth={550}
        marginTop='50px'
        margin='auto'
        boxShadow='10px 10px 5px grey'
        sx={{
          backgroundColor: ' rgba(0,0,0,.03)',
          border: '1px solid rgba(0,0,0,.125)',
          borderRadius: '0.25rem'
        }}
      >
        <AddTodo todos={todos} setTodos={setTodos} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '20px',
            width: '100%',
            backgroundColor: '#fff',
            boxSizing: 'border-box'
          }}
        >
          {todos.length === 0 && <i>Add Bugs... Or Change View...</i>}

          {done !== null
            ? todos
                .filter(todo => todo.isCompleted === done)
                .map((todo, indx) => {
                  return <TodoList todos={todos} setTodos={setTodos} todo={todo} indx={indx} />
                })
            : todos.map((todo, indx) => {
                return <TodoList todos={todos} setTodos={setTodos} todo={todo} indx={indx} />
              })}
          <DeleteSelected todos={todos} setTodos={setTodos} />
        </div>
        <FilterButton showAll={showAll} showActive={showActive} resolvedTodo={resolvedTodo} />
      </Box>
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  const getTodo = await prisma.todo.findMany({
    select: {
      title: true,
      id: true,
      isCompleted: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  return {
    props: {
      getTodo
    }
  }
}
