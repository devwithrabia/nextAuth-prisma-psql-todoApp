import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { User, type NextAuthOptions, Awaitable } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { JWT } from 'next-auth/jwt'
import { Session } from 'inspector'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: '/login'
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials, req) {
        //handle Auth:

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email }
        })

        if (!existingUser) {
          return null
        }

        const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password)

        if (!passwordMatch) {
          return null
        }

        return {
          id: existingUser.id + '',
          username: existingUser.username,
          email: existingUser.email
        }
      }
    })
  ],

  callbacks: {
    //we have to save updated user in token not normal user:
    async jwt({ token, user }) {
      console.log(user)
      //insert updated user in token:

      const email = token.email || user.email

      if (!email) {
        return {}
      }

      const getUpdatedUser = await prisma.user.findUnique({ where: { email }, select: { email: true, username: true } })

      if (getUpdatedUser) {
        return {
          ...token,
          name: getUpdatedUser.username
        }
      }

      return token
    },
    //insert token in session:
    async session({ session }) {
      return session
    }
  }
}

export default NextAuth(authOptions)
