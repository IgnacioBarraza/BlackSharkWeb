import Google from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import axios from 'axios'

export const { handlers, signIn, signOut, auth} = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const nextAuth = process.env.NEXTAUTH_URL || ''

      try {
        await axios.post(`${nextAuth}/api/auth/oauth`, {
          email: user.email,
          username: user.name
        })

        return true
      } catch (error) {
        console.log('Ha ocurrido un error: ', error)
        return false
      }
    }
  }
})