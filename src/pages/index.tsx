import AddTodo from '@/components/TodoApp/AddTodo'
import ChangeStatus from '@/components/TodoApp/ChangeStatus'
import ChangeTodo from '@/components/TodoApp/ChangeTodo'
import DeleteTodo from '@/components/TodoApp/DeleteTodo'
import { prisma } from '@/lib/db'
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material'
import { InferGetServerSidePropsType, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ getData }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    router.push('/login')
  }

  return (
    <>
      <h1 style={{ textTransform: 'uppercase' }}>Welcome to the interesting Todo App Dear {session?.user.name}</h1>

      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap='30px'
        maxWidth={800}
        margin='auto'
        padding={5}
        borderRadius={5}
        boxShadow={'5px 5px 10px #ccc'}
        sx={{
          ':hover': {
            boxShadow: '10px 10px 20px #ccc'
          }
        }}
      >
        <AddTodo />

        {getData.map(data => {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'lightslategray',
                height: '80px',
                width: '70%',
                boxShadow: '10px 10px 10px  #ccc'
              }}
              key={data.id}
            >
              {data.title}

              <ChangeTodo todo={data} />

              <ChangeStatus todo={data} />

              <DeleteTodo todoId={data.id} />
            </div>
          )
        })}
      </Box>
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  const getData = await prisma.todo.findMany({
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
      getData
    }
  }
}
