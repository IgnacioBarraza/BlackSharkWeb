'use client'

import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

import { useUser } from "../hooks/userHook"

const HeaderAuth = () => {
  const { user, setUser } = useUser()
  const router = useRouter()

  const handleLogout = async () => {
    await axios.post('/api/auth/logout')

    setUser(null)

    router.push('/')
  }

  return user ? (
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