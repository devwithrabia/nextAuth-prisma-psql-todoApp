import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { password } = req.body

    const token = req.query.token

    const existToken = await prisma.forgotPasswordToken.findUnique({
      where: {
        token: token as string,
        //this token will be expired in 4 hours:
        createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
        resetAt: null
      }
    })

    if (!existToken) {
      return res.status(400).json({ message: 'invalid token request,please try reseting your password again' })
    }

    //now save new password in database(user) throgh userid of existtoken :

    const hashedPassword = await bcrypt.hash(password, 5)

    const updatePassword = await prisma.user.update({
      where: {
        id: existToken.userId
      },
      data: {
        password: hashedPassword
      }
    })

    // now after saving new password we should update token time (resetAt):

    const updateToken = await prisma.forgotPasswordToken.update({
      where: {
        id: existToken.id
      },
      data: {
        resetAt: new Date()
      }
    })

    //when user changed password token's resetAt property should be update

    return res
      .status(200)
      .json({ message: 'user password updated successfully', user: updatePassword, token: updateToken })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
