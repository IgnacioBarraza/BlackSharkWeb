import { useContext } from "react"
import { FirebaseContext } from "../context/firebaseContext"

export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  if (!context) throw new Error('There is not firebase provider to use')
  return context
}