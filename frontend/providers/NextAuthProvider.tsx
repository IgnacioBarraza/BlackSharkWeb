'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface ProviderInterface {
  children: ReactNode
}

const NextAuthProvider = ({ children }: ProviderInterface) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default NextAuthProvider