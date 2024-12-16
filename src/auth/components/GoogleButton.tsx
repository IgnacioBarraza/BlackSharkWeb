import { useGoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { useToast } from "@chakra-ui/react"
import axios from "axios"

import { useAuth } from "../../hooks/useAuth"
import { useProps } from "@/hooks/useProps"
import GoogleIcon from "@logos/Google"

const GoogleOAuth = () => {
  const { oauth } = useAuth()
  const { loginData } = useProps()
  const navigate = useNavigate()
  const toast = useToast()

  const googleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          }
        })

        const { data } = await oauth(res.data.email, res.data.name)
        loginData(data.token, data.tipo_user, data.username, data.user_id, data.method)
        navigate("/")

        toast({
          title: data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: error.response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
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