import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"

import { useAuth } from "../../hooks/useAuth"
import GoogleIcon from "@logos/Google"

const GoogleOAuth = () => {
  const { oauth } = useAuth()

  const googleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response)
    }
  })

  return (
    <button onClick={() => googleSignIn()} type="button" className="w-full min-w-[330px] 2xl:w-1/2 text-xl font-large text-center text-white border border-blue-light-hover transition duration-200 ease-in-out transform bg-trasparent hover:border hover:bg-blue-light-hover">
      <span className="flex items-center justify-center space-x-2 w-full py-2.5">
        <GoogleIcon width="25" height="25" />
        <span>Iniciar sesión con Google</span>
      </span>
    </button>
  )
}

export default GoogleOAuth