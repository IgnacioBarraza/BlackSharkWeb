import { ValidationError } from "joi"
import { randomUUID } from "crypto"
import bcrypt from 'bcrypt'

import { schema } from "@vals/users/newUserValidator"
import { connection } from "@/app/libs/mongo"
import User from '@models/User'

export const POST = async (request: Request) => {
  await connection()

  const { fullName, email, password } = await request.json()

  try {
    const validation = await schema.validateAsync({ fullName, email, password })

    const searchUser = await User.findOne({ fullName: fullName.toLowerCase() })

    if (searchUser) {
      return Response.json({ error: 'Ya hay un usuario registrado con ese email, intenta con otro.' }, { status: 400 })
    }

    let newUser = {}

    if (password) {
      const hashed = bcrypt.hashSync(validation.password, 10)

      newUser = {
        id: randomUUID(),
        fullName: validation.fullName,
        email: validation.email,
        password: hashed
      }
    } else {
      newUser = {
        id: randomUUID(),
        fullName: validation.fullName,
        email: validation.email
      }
    }
    
    const user = await User.create(newUser)

    return Response.json({ message: 'Usuario creado!', user }, { status: 201 })
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json({ error: error.details[0].message }, { status: 400 })
    }
    return Response.json({ error: "Hubo un error en el servidor, intente nuevamente." }, { status: 500 })
  }
}