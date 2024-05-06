import { useContext } from "react"
import { AuthContext } from "../providers/authContext"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('There is not auth provider to use')
  return context
}