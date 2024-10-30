import { AddTodo } from '@/components/TodoApp/AddTodo/AddTodo'
import { DeleteSelected } from '@/components/TodoApp/DeleteSelected/DeleteSelected'
import { FilterButton } from '@/components/TodoApp/FilterButton/FilterButton'
import { TodoList } from '@/components/TodoApp/TodoList/TodoList'
import { prisma } from '@/lib/db'
import { Container, StyledBox } from '@/styles/homeStyles'
import { GetData } from '@/types'
import { InferGetServerSidePropsType, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ getTodos }) => {
  //authenticate user:
  const { data: session, status } = useSession()

  const router = useRouter()

  if (status === 'unauthenticated') {
    router.push('/login')
  }

  //Todo App:

  const [todos, setTodos] = useState<GetData[]>(getTodos)

  const [sortTodos, setSortTodos] = useState<boolean | null>()

  const [message, setMessage] = useState('')

  useEffect(() => {
    setSortTodos(null)
  }, [])

  const showAll = () => {
    setSortTodos(null)
  }

  const showActive = () => {
    setSortTodos(false)
  }

  const resolvedTodo = () => {
    setSortTodos(true)
  }

  return (
    <StyledBox
      display='flex'
      flexDirection='column'
      alignItems='center'
      maxWidth={500}
      marginTop='50px'
      margin='auto'
      boxShadow='10px 10px 5px grey'
    >
      <AddTodo todos={todos} setTodos={setTodos} message={message} setMessage={setMessage} />

      <Container>
        {todos.length === 0 && <i>Add Bugs... Or Change View...</i>}

        {sortTodos !== null
          ? todos
              .filter(todo => todo.isCompleted === sortTodos)
              .map((todo: GetData) => {
                return (
                  <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    todo={todo}
                    message={message}
                    setMessage={setMessage}
                    key={todo.id}
                  />
                )
              })
          : todos.map((todo: GetData) => {
              return (
                <TodoList
                  todos={todos}
                  setTodos={setTodos}
                  todo={todo}
                  message={message}
                  setMessage={setMessage}
                  key={todo.id}
                />
              )
            })}

        <DeleteSelected todos={todos} setTodos={setTodos} message={message} setMessage={setMessage} />
      </Container>

      <FilterButton showAll={showAll} showActive={showActive} resolvedTodo={resolvedTodo} />
    </StyledBox>
  )
}

export default Home

export const getServerSideProps = async () => {
  const getTodos = await prisma.todo.findMany({
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
      getTodos
    }
  }
}
