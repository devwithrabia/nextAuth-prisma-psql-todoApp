import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

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
      name: 'Sign in',

      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'hello@example.com' },
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

        // we have little information in token ,so we get complete user information for session,so we should return user:

        return {
          id: existingUser.id + '',
          username: existingUser.username,
          email: existingUser.email
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      //insert updated user in token:

      if (trigger === 'update' && session?.username) {
        token.username = session.username
      }

      if (user) {
        //insert user in token:
        return {
          ...token,

          //here we are going to insert username in token so we have to tell username type in next-auth.d.ts file:
          username: user.username
        }
      }

      return token
    },
    //insert token in session:
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username
        }
      }
    }
  }
}

export default NextAuth(authOptions)
