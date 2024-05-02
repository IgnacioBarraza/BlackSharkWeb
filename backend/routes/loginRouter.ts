import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mysql from 'mysql2/promise'

import { connect } from '../utils/db'
import { validateLoginData } from '../schemas/loginSchema'
import { SECRET } from '../utils/config'

const loginRouter = express.Router()

loginRouter.post('/verify', async (req, res) => {
    const connection = connect()

    const verifyData = validateLoginData(req.body)

    if (verifyData.error) {
        return res.status(400).json({ message: JSON.parse(verifyData.error.message)[0].message })
    }

    try {
        const [row, fields] = await connection.query(`SELECT * FROM usuario WHERE correo = ?`, [verifyData.data.email])

        const user = row as mysql.RowDataPacket[]

        if (Array.isArray(row) && row.length > 0) {
            const validatePassword = await bcrypt.compare(verifyData.data.password, user[0].contrasenha)
            
            if (validatePassword) {
                const userToken = {
                    username: user[0].username,
                    identifier: user[0].id_usuario
                }

                if (SECRET) {
                    const token = jwt.sign(userToken, SECRET)
                    return res.status(200).json({ message: 'Usuario verificado', token, username: user[0].username })
                } else {
                    return res.status(500).json({ message: 'No se pudo generar el token de autenticación.' })
                }
            } else {
                return res.status(404).json({ message: 'Contraseña incorrecta.' })
            }
        } else {
            return res.status(400).json({ message: 'Usuario no encontrado.' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un problema al intentar verificar el usuario. Inténtelo más tarde.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default loginRouter