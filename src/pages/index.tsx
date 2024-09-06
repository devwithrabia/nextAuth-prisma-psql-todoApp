import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    router.push('/login')
  }

  return <h1>my name is {session?.user.username}</h1>
}

export default Home
