import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import axios from 'axios'

export const { handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND || ''

      try {
        await axios.post(`${backendUrl}/api/login/oauth`, {
          email: user.email,
          username: user.name
        })

        return true
      } catch (error) {
        return false
      }
    }
  }
})