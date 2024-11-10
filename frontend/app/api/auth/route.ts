import { NextResponse } from "next/server"
import { ValidationError } from "joi"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { loginSchema } from "@/app/validators/auth/login"
import { connection } from "@/app/libs/mongo"
import User from "@/models/User"

export const POST = async (request: Request) => {
  await connection()

  const { email, password } = await request.json()

  try {
    const validation = await loginSchema.validateAsync({ email, password })

    const searchUser = await User.findOne({ email: validation.email })

    if (!searchUser) {
      return Response.json({ error: 'No se ha encontrado un usuario con ese correo.' }, { status: 400 })
    }

    const comparePassword = await bcrypt.compare(validation.password, searchUser.password)

    if (!comparePassword) {
      return Response.json({ error: 'Incorrect password! Try again.' }, { status: 400 })
    } else {
      const secret = process.env.SECRET || ''

      const tokenData = {
        id: searchUser.id,
        email: searchUser.email
      }

      const token = jwt.sign(tokenData, secret)

      const response = NextResponse.json({
        message: 'Successfully logged in!',
        email: validation.email,
        fullName: searchUser.fullName
      })

      response.cookies.set({
        name: 'auth-token',
        value: `Bearer ${token}`,
        httpOnly: true,
        secure: true,
        path: '/',
      })

      return response
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json({ error: error.details[0].message }), { status: 400 }
    }

    return Response.json({ error: 'Hubo un problema en el servidor, inténtalo más tarde.' }, { status: 500 })
  }
}
