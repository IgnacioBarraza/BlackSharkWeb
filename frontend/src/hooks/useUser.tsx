import { useContext } from "react"
import { UserContext } from "../providers/userContext"

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('There is not user provider to use')
  return context
}