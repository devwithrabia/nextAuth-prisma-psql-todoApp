import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import bcrypt from 'bcryptjs'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  console.log(session?.user.email)
  try {
    const { newPassword, oldPassword } = req.body

    //compare oldPassword with database password or existing password:

    const existingUser = await prisma.user.findUnique({
      where: { email: session?.user.email }

      //   select: {
      //     password: true
      //   }
    })

    if (!existingUser) {
      return null
    }

    const passwordMatch = await bcrypt.compare(oldPassword, existingUser?.password)

    if (!passwordMatch) {
      res.status(400).json({ message: 'password does not match' })

      return null
    }

    //hashing new password:

    const hashedPassword = await bcrypt.hash(newPassword, 5)

    const updatePassword = await prisma.user.update({
      where: {
        email: session?.user.email
      },
      data: {
        password: hashedPassword
      }
    })

    console.log(updatePassword)

    return res.status(200).json({ message: 'user password updated successfully', update: updatePassword })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
