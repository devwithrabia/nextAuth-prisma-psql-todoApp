// import { prisma } from '@/lib/db'
// import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
// //without nextauth we get user or session like this:
// type Props = InferGetServerSidePropsType<typeof getServerSideProps>

// const Home: NextPage = ({ user }: Props) => {
//   console.log(user)
//   return (
//     <div>
//       Hello,{user?.name}
//     </div>
//   )
// }
// export default Home

// //without any making api we can access database through prisma and get user:
// //mongodb men ye ye kaam hm api route bna kr krte the
// export const getServerSideProps: GetServerSideProps = async context => {
//   const user = await prisma.user.findFirst({
//     where: {
//       email: 'test@test.com'
//     }
//   })

//   return {
//     props: {
//       user
//     }
//   }
// }

const Home = () => {
  return (
    <div>
      <h1>my home page</h1>
    </div>
  )
}

export default Home;
