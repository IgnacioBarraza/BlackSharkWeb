'use client'

import { createContext, ReactNode, useState } from "react"

import { User } from "@interfaces/user"

interface UserContextType {
  user: User | null,
  setUser: (user: User | null) => void,
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}