import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'
import { GetServerSideProps, NextPage } from 'next'
import { Session, User } from 'next-auth'

interface IProps {
  user: User
}

const DashBoard: NextPage<IProps> = ({ user }) => {
  console.log({ user })
  if (user) {
    return (
      <div>
        welcome to home page and i am {user.username}and my email is {user.email}
      </div>
    )
  }
  return <div>please login to see this page</div>
}

export default DashBoard

export const getServerSideProps: GetServerSideProps<IProps> = async context => {
  const session = await getServerSession(context.req, context.res, authOptions)

  console.log(session)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      //here we put data in json.parse because without parsing it can not pass from here then we stringify this data;
      //in session object we have user object and expire object ,so we need only user object;
      user: JSON.parse(JSON.stringify(session?.user)) as Session['user']
    }
  }
}
