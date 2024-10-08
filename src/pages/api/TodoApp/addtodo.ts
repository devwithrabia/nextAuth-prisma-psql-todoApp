import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { input } = req.body
    console.log(input)

    if (!input) {
      return null
    }

    //add todo input in database:
    const createTodo = await prisma.todo.create({
      data: {
        title: input
      }
    })

    return res.status(201).json({ message: 'todo created successfully', createTodo: createTodo })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
