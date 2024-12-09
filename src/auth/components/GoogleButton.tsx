// import { signIn } from 'next-auth/react';

import GoogleIcon from "@logos/Google"

const GoogleOAuth = () => {
  const googleSignIn = () => {
    console.log('logging in...')
    // await signIn('google', { callbackUrl: '/' })
  }

  return (
    <button onClick={googleSignIn} type="button" className="w-full min-w-[330px] 2xl:w-1/2 text-xl font-large text-center text-white border border-[#005cb3] transition duration-200 ease-in-out transform bg-trasparent hover:border hover:bg-[#005cb3]">
      <span className="flex items-center justify-center space-x-2 w-full py-2.5">
        <GoogleIcon width="25" height="25" />
        <span>Iniciar sesión con Google</span>
      </span>
    </button>
  )
}

export default GoogleOAuth