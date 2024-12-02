import jwt, { JwtPayload } from "jsonwebtoken"
import { decode } from "next-auth/jwt"
import Link from "next/link"
import Image from "next/image"

import { cookies } from "next/headers"
import HeaderAuth from "./HeaderAuth"

const Header = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')
  const sessionToken = cookieStore.get('next-auth.session-token')

  let user = null
  
  const verifyToken = async () => {
    const JWT_SECRET = process.env.AUTH_SECRET || ""

    try {
      if (token) {
        const data = jwt.verify(token?.value ?? "", JWT_SECRET) as JwtPayload
        
        user = { email: data.email, fullName: data.username }
        return
      } else if (sessionToken) {
        const data = await decode({
          token: sessionToken.value,
          secret: JWT_SECRET,
        })

        user = { email: data?.email, fullname: data?.name }
        return
      }
    } catch (error) {
      console.log(error)
      user = null
      return
    }
  }

  await verifyToken()

  return (
    <header className="fixed w-full px-10 lg:px-12 h-22 flex items-center z-10 bg-[#121212]/90 border-b border-b-slate-600">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Image
            src="/bsw_logo.webp"
            alt="Logo de BlackSharkStudios. Al clickearlo, el usuario navegará hacia la página principal."
            width={110}
            height={110}
            priority
          />
          <span className="sr-only">BlackSharkStudios logo</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/services" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Servicios
          </Link>
          <Link href="/gallery" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Galería
          </Link>
          <Link href="/contact" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Contacto
          </Link>

          <HeaderAuth userData={user} />
        </nav>
      </header>
  )
}

export default Header