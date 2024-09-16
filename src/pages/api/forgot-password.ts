import { prisma } from '@/lib/db'
import { randomUUID } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = req.body

    //check if user exist in database:
    const existUser = await prisma.user.findUnique({
      where: { email: email }
    })

    //if user exist we have to generate OTP(one time password) token and save this token with user id:
    if (existUser) {
      const OTPToken = await prisma.forgotPasswordToken.create({
        data: {
          userId: existUser.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, '')
        }
      })

      //send email msg and token link through nodemailer:

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'devwithrabia@gmail.com',
          //this passsword set for Nodemailer through google account settings in app password option:
          pass: ' wfxf gqbw jsjv vblp'
        }
      })

      transporter
        .sendMail({
          from: '"Rabia Inam" <devwithrabia@gmail.com>', // sender address
          to: existUser.email, // list of receivers
          subject: 'Reset Password Request✔', // Subject line
          text: `Hello ${existUser.username},someone (hopefully you) requested a password reset for this account.if you did want to reset your password
            ,please click here:' http://localhost:3000/password-reset/${OTPToken.token}' .for security reasons,this link is only valid for four hours.if you did not request this reset ,please ignore this email.`
        })
        .then(info => {
          console.log({ info })
        })
        .catch(console.error)

      return res.status(201).json({ message: 'email send successfully' })
    }

    return res.status(400).json({ message: 'this email is not registered' })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'something went wrong' })
  }
}

export default POST
