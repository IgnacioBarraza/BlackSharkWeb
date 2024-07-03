import { jwtDecode } from "jwt-decode"
import { useProps } from "../../hooks/useProps"
import { useEffect } from "react";

export const AutoLogout = () => {
  const { userToken, logout } = useProps()

  useEffect(() => {
    if (!userToken) return

    const decodeToken = jwtDecode(userToken)
    const expirationTime = decodeToken.exp * 1000 - 60000

    const timer = setTimeout(() => {
      logout()
      alert('La sesion ha expirado, vuelva a iniciar sesión.')
    }, expirationTime - Date.now())
    
    return () => clearTimeout(timer)
  }, [userToken, logout])

  return null
}