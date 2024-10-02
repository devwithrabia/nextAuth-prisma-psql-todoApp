import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { todoId } = req.body

    //change todo input in database:
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: todoId
      }
    })

    return res.status(201).json({ message: 'delete todo successfully', deleteTodo: deleteTodo })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
