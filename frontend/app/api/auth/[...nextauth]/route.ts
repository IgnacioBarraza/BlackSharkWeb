import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
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
});

export { handler as GET, handler as POST }