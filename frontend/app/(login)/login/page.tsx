import { Metadata } from "next"
import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  title: "Iniciar sesión | BlackSharkWeb",
  description: "¡Inicia sesión en la página para tener acceso a más información!"
}

const Page = () => {
  return (
    <LoginForm />
  )
}

export default Page