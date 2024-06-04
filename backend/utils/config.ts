import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000

export const DATABASE = process.env.MYSQLDATABASE
export const MYSQLHOST = process.env.MYSQLHOST
export const MYSQLUSER = process.env.MYSQLUSER
export const MYSQLPASSWORD = process.env.MYSQLPASSWORD
export const MYSQLPORT = process.env.MYSQLPORT

export const SECRET = process.env.SECRET

export const EMAIL = process.env.EMAIL
export const CLIENT_ID = process.env.CLIENT_ID
export const CLIENT_SECRET = process.env.CLIENT_SECRET
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN