import { useContext } from "react"
import { PropsContext } from "../providers/propsContext"

export const useProps = () => {
  const context = useContext(PropsContext)
  if (!context) throw new Error('There is not user provider to use')
  return context
}