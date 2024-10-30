import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  try {
    const { username } = req.body

    //update user with email exist in session:means user already logedin having sesssion but now want to change
    const updateUser = await prisma.user.update({
      where: {
        email: session?.user.email
      },
      data: {
        username: username
      }
    })

    return res.status(200).json({ message: 'user updated successfully', update: updateUser })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
