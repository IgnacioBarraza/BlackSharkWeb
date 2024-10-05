import { Metadata } from "next"
import RecoverForm from "./RecoverForm"

export const metadata: Metadata = {
  title: "Recuperar contraseña | BlackSharkWeb",
  description: "Ingresa tu correo para recuperar tu contraseña!"
}

const RecoverPassword = () => {
  return (
    <RecoverForm />
  )  
}

export default RecoverPassword