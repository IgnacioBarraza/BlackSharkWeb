import { useContext } from "react"
import { BackendContext } from "../providers/backendContext"

export const useBackend = () => {
  const context = useContext(BackendContext)
  if (!context) throw new Error('There is not backend provider to use')
  return context
}