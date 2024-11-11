import { signIn } from 'next-auth/react';

import GoogleIcon from "@/app/logos-icons/Google";

const GoogleOAuth = () => {
  const googleSignIn = async () => {
    await signIn('google', { redirectTo: '/' })
  }

  return (
    <button onClick={googleSignIn} className="flex items-center justify-center space-x-2 w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
      <GoogleIcon width="25" height="25" />
      <span>Iniciar sesión con Google</span>
    </button>
  )
}

export default GoogleOAuth