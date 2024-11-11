import { randomUUID } from "crypto"

import { connection } from "@/app/libs/mongo"
import User from "@/models/User"

export const POST = async (request: Request) => {
  await connection()

  const { email, username } = await request.json()

  try {
    const searchUser = await User.findOne({ email })

    if (!searchUser) {
      const newUser = {
        id: randomUUID(),
        fullName: username,
        email
      }

      await User.create(newUser)

      return Response.json({ message: 'Usuario guardado en la base de datos! Redirigiendo...' }, { status: 200 })
    } else {
      return Response.json({ message: 'Ya existe un usuario! Redirigiendo...' }, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Hubo un problema en el servidor, inténtelo nuevamente.' }, { status: 500 })
  }
}