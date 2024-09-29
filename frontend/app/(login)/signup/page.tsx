import { Metadata } from "next"
import RegisterForm from "./RegisterForm"

export const metadata: Metadata = {
  title: "Regístrarse | BlackSharkWeb",
  description: "¡Regístrate para tener acceso a nuevas características y funcionalidades!"
}

const Page = () => {
  return (
    <RegisterForm />
  )
}

export default Page