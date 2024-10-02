import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { input, todo } = req.body
    console.log(input)

    //if input is empty
    if (!input) {
      return null
    }

    //change todo input in database:
    const changeTodo = await prisma.todo.update({
      where: {
        id: todo.id
      },
      data: {
        title: input
      }
    })

    return res.status(201).json({ message: 'todo updated successfully', changeTodo: changeTodo })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
