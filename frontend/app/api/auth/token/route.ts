import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from "next/headers"

const SECRET = process.env.SECRET || ''

export const GET = () => {
  const cookieStorage = cookies()

  const token = cookieStorage.get('auth-token')
  
  if (token) {
    const data = jwt.verify(token.value.toString().replace('Bearer ', ''), SECRET) as JwtPayload
    
    return Response.json({ message: 'Cookie verificada!', cookie: true, email: data.email, fullName: data.fullName, id: data.id })
    
  } else {
    return Response.json({ error: 'Cookie invlálida, inicie sesión nuevamente.', cookie: false }, { status: 200 })
  }
}