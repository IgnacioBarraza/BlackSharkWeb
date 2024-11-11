import jwt, { JwtPayload } from 'jsonwebtoken'
import { getToken } from 'next-auth/jwt'
import { cookies } from "next/headers"

const SECRET = process.env.SECRET || ''
const AUTH_SECRET = process.env.AUTH_SECRET || ''

export const GET = async (req: Request) => {
  const cookieStorage = cookies()

  const token = cookieStorage.get('auth-token')
  const authToken = cookieStorage.get('authjs.session-token')
  
  if (token) {
    const data = jwt.verify(token.value.toString().replace('Bearer ', ''), SECRET) as JwtPayload
    
    return Response.json({ message: 'Cookie verificada!', cookie: true, email: data.email, fullName: data.fullName })
    
  } else if (authToken) {
    const data = await getToken({ req, secret: AUTH_SECRET })

    return Response.json({ message: 'OAuth cookie verificada!', cookie: true, email: data?.email, fullName: data?.name })
  } else {
    return Response.json({ error: 'Cookie inválida, inicie sesión nuevamente.', cookie: false }, { status: 200 })
  }
}