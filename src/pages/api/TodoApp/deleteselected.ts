import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //change todo input in database:
    const deleteSelected = await prisma.todo.deleteMany({
      where: {
        isCompleted: true
      }
    })

    return res.status(201).json({ message: 'delete selected todo successfully', deleteSelected: deleteSelected })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
