process.loadEnvFile()

import mongoose, { MongooseError } from "mongoose"

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

if (!url) {
  throw new Error('Error de conexión: debes añadir el MONGODB_URI al archivo .env!')
}

export const connection = async () => {
  try {
    console.log('Conectándose a la base de datos...')
    
    await mongoose.connect(url)

    console.log('Conexión exitosa!')
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log('Hubo un problema al intentar conectarse a la db: ', error.message)
    } else {
      console.log('Hubo un problema en la conexión a la db: ', error)
    }
  }
}
