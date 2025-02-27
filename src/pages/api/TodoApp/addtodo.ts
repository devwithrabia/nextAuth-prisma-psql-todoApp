import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions)

    const { input } = req.body
    console.log(input)

    if (!input) {
      return null
    }

    //add todo input in database:
    const createTodo = await prisma.todo.create({
      data: {
        title: input as string,
        userId: session?.user.email as string
      }
    })

    return res.status(201).json({ message: 'todo created successfully', createTodo: createTodo })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
