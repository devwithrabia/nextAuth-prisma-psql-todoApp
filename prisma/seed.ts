// import { PrismaClient } from '@prisma/client'

// //seed is only used to test any website or for initial testing,by putting initial values :

// const prisma = new PrismaClient()

// async function main() {
//   const user = await prisma.user.upsert({
//     where: { email: 'test@test.com' },
//     update: {},
//     create: {
//       email: 'test@test.com',
//       username: 'Test User',
//       password: 'mynameisrabia'
//     }
//   })

//   console.log({ user })
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async e => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
