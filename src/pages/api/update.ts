import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  console.log(session?.user.email)
  try {
    const { username } = req.body
    console.log(username)

    //update user with email exist in session:means user already logedin having sesssion but now want to change
    //username with email from which login or stored in session
    const updateUser = await prisma.user.update({
      where: {
        email: session?.user.email
      },
      data: {
        username: username
      }
    })

    console.log(updateUser)

    return res.status(200).json({ message: 'user updated successfully', update: updateUser })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
