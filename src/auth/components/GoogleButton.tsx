import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"

import GoogleIcon from "@logos/Google"
import { auth } from '../../firebase'
import { useAuth } from "../../hooks/useAuth"
import { useProps } from "../../hooks/useProps"
import { useToast } from "@chakra-ui/react"

const GoogleOAuth = () => {
  const { loginData } = useProps()
  const { oauth } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const login = await signInWithPopup(auth, provider)
      const user = login.user

      const res = await oauth(user.email, user.displayName)
      if (res.status === 200) {
        const { token, tipo_user, username, user_id, method: authMethod, message } = res.data
        loginData(token, tipo_user, username, user_id, authMethod)
        navigate("/");
        successToastNotification(message)
      }
    } catch (error) {
      errorToastNotification(error.response.data.message)
    }
  }

  const successToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const errorToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <button onClick={googleSignIn} type="button" className="w-full min-w-[330px] 2xl:w-1/2 text-xl font-large text-center text-white border border-blue-light-hover transition duration-200 ease-in-out transform bg-trasparent hover:border hover:bg-blue-light-hover">
      <span className="flex items-center justify-center space-x-2 w-full py-2.5">
        <GoogleIcon width="25" height="25" />
        <span>Iniciar sesión con Google</span>
      </span>
    </button>
  )
}

export default GoogleOAuth