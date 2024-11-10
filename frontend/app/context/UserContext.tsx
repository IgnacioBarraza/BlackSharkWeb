'use client'

import { createContext, ReactNode, useEffect, useState } from "react"
import axios from "axios"

interface User {
  id: string
  email: string,
  fullName: string,
}

interface UserContextType {
  user: User | null,
  setUser: (user: User | null) => void,
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const data = await axios.get('/api/auth/token')
      console.log(data)

      if (data.data.cookie) {
        const userData = {
          id: data.data.id,
          email: data.data.email,
          fullName: data.data.fullName
        }

        setUser(userData)
      } else {
        setUser(null)
      }
    }

    getUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}