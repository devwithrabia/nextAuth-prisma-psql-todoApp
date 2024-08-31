import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { type NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt'
  },

  providers: [
    CredentialsProvider({
      name: 'Sign in',

      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'hello@example.com' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        //handle Auth:
        //we want user who logedin:
        const user = { id: 1, username: 'Ethan', email: 'test@test.com' }

        return user
      }
    })
  ]
}

export default NextAuth(authOptions)
