import { prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password, username } = req.body
    console.log(email, username)

    //check if email already exist:
    const existUserByEmail = await prisma.user.findUnique({
      where: { email: email }
    })

    if (existUserByEmail) {
      return res.status(409).json({ user: null, message: 'User with this email already exists' })
    }

    //check if username already exist:
    const existUserByUsername = await prisma.user.findUnique({
      where: { username: username }
    })

    if (existUserByUsername) {
      return res.status(409).json({ user: null, message: 'User with this username already exists' })
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 5)

    //if user not exist in data base save new user in db:
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    //seperate password from newUser object and pass the rest:

    const { password: newUserPassword, ...rest } = newUser

    return res.status(201).json({ user: rest, message: 'user created successfully' })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
