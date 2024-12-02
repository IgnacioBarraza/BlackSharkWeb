'use client'

import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import axios from "axios"

import { useUser } from "../hooks/userHook"
import { User } from "@interfaces/user"

interface HeaderAuthInterface {
  userData: User | null
}

const HeaderAuth: React.FC<HeaderAuthInterface> = ({ userData }) => {
  const { user, setUser } = useUser()
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    if (session) {
      await signOut()
    } else {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/login/logout`, {}, {
        withCredentials: true
      })
  
      setUser(null)
    }

    router.push('/')
    router.refresh()
  }

  return userData ?? user ? (
    <button onClick={handleLogout} className="text-lg font-medium hover:underline underline-offset-4">
      Cerrar sesión
    </button>
  ) : (
    <Link href="/login" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
      Iniciar Sesión
    </Link>
  )
}

export default HeaderAuth