import AddTodo from '@/components/TodoApp/AddTodo'
import ChangeStatus from '@/components/TodoApp/ChangeStatus'
import ChangeTodo from '@/components/TodoApp/ChangeTodo'
import DeleteSelected from '@/components/TodoApp/DeleteSelected'
import DeleteTodo from '@/components/TodoApp/DeleteTodo'
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
      <h1 style={{ textAlign: 'center' }}>Todo App</h1>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap='20px'
        maxWidth={500}
        marginTop='50px'
        margin='auto'
        padding={5}
        boxShadow={'5px 5px 10px #ccc'}
        sx={{
          ':hover': {
            boxShadow: '10px 10px 20px #ccc'
          }
        }}
      >
        <AddTodo todos={todos} setTodos={setTodos} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '10px',
            width: '100%'
          }}
        >
          {done !== null
            ? todos
                .filter(todo => todo.isCompleted === done)
                .map((todo, indx) => {
                  return <TodoList todos={todos} setTodos={setTodos} todo={todo} indx={indx} />
                })
            : todos.map((todo, indx) => {
                return <TodoList todos={todos} setTodos={setTodos} todo={todo} indx={indx} />
              })}
        </div>

        <DeleteSelected todos={todos} setTodos={setTodos} />

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
