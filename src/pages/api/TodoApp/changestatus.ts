import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { todo } = req.body

    //change todo input in database:
    const changeTodo = await prisma.todo.update({
      where: {
        id: todo.id
      },
      data: {
        isCompleted: !todo.isCompleted
      }
    })

    return res.status(201).json({ message: 'change status successfully' })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
