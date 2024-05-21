import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mysql from 'mysql2/promise'
import { randomUUID } from 'crypto'

import { connect } from '../utils/db'
import { validateLoginData } from '../schemas/loginSchema'
import { SECRET } from '../utils/config'
import { validateUserRegister } from '../schemas/registerSchema'
import { validateIdAndEmail, validateNewPassword } from '../schemas/recoverSchema'
import sendMessage from '../utils/emailConfig'

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
                    return res.status(200).json({ message: 'Usuario verificado', token, username: user[0].username, tipo_user: user[0].tipo_user })
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
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un problema al intentar verificar el usuario. Inténtelo más tarde.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

loginRouter.post('/register', async (req, res) => {
    const connection = connect()

    const validateData = validateUserRegister(req.body)

    if (validateData.error) {
        return res.status(400).json({ message: JSON.parse(validateData.error.message)[0].message })
    }

    try {
        const [row, fields] = await connection.query(`SELECT * FROM usuario WHERE correo = ?`, [validateData.data.email])

        if (Array.isArray(row) && row.length > 0) {
            return res.status(400).json({ message: 'El correo ya tiene una cuenta asociada. Intente con otro.' })
        } else {
            const salt = 10
            const hashedPassword = await bcrypt.hash(validateData.data.password, salt)

            const newUser = {
                id_usuario: randomUUID(),
                username: validateData.data.username,
                password: hashedPassword,
                email: validateData.data.email,
                phone: validateData.data.phone ?? null,
                tipo_user: 'user',
                direction: validateData.data.direction ?? null
            }

            await connection.query(`INSERT INTO usuario (id_usuario, username, contrasenha, correo, telefono, tipo_user, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [newUser.id_usuario, newUser.username, newUser.password, newUser.email, newUser.phone, newUser.tipo_user, newUser.direction]
            )

            return res.status(201).json({ message: 'Registro exitoso!' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un problema con el servidor. Intente más tarde.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

loginRouter.post('/recover', async (req, res) => {
    const connection = connect()

    const validateData = validateIdAndEmail(req.body)

    if (validateData.error) {
        return res.status(400).json({ message: JSON.parse(validateData.error.message)[0].message })
    }

    try {
        const [row, fields] = await connection.query(`SELECT * FROM usuario WHERE correo = ?`, [validateData.data.email])

        if (Array.isArray(row) && row.length > 0) {
            if (!SECRET) {
                throw new Error
            }

            const user = row as mysql.RowDataPacket[]

            const expirationTime = '5m'
            const token = jwt.sign({ id: user[0].id_usuario }, SECRET, { expiresIn: expirationTime })

            const text = `${token}`
            sendMessage(user[0].correo, text)

            return res.status(200).json({ message: 'Correo enviado!' })
            
        } else {
            return res.status(400).json({ message: 'No hay ningún usuario asociado a ese correo.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error en el servidor al intentar recuperar la contraseña. Intente más tarde.' })
    }
})

loginRouter.post('/decodeToken', async (req, res) => {
    const connection = connect()
    const token = req.query.token
    
    try {
        if (!token || typeof token !== 'string') {
            return res.status(401).json({ message: 'Token inválido. Inténtelo más tarde.', valid: false })
        } else if (!SECRET) {
            return res.status(500).json({ message: 'Hubo un error en el servidor. Inténtelo más tarde.', valid: false })
        }

        jwt.verify(token, SECRET)
        return res.status(200).json({ message: 'Token correcto.', valid: true })
    } catch (error) {
        console.log(error)
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'El token expiró. Vuelve a hacer el procedimiento de recuperar contraseña.', valid: false })
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido, vuelve a hacer el procedimiento de recuperar contraseña.', valid: false })
        } else {
            return res.status(500).json({ message: 'Hubo un error en el servidor. Intenta más tarde.', valid: false })
        }
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

interface jwtPayload extends jwt.JwtPayload {
    id?: string
}

loginRouter.patch('/newPassword', async (req, res) => {
    const connection = connect()
    
    const validateData = validateNewPassword(req.body)

    if (validateData.error) {
        return res.status(401).json({ message: JSON.parse(validateData.error.message)[0].message })
    } else if (!SECRET) {
        return res.status(500).json({ message: 'Hubo un problema al actualizar la contraseña. Inténtalo más tarde.' })
    }

    try {
        const token = jwt.verify(validateData.data.token, SECRET) as jwtPayload

        if (token.id) {
            const [row, fields] = await connection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [token.id])
            
            if (Array.isArray(row) && row.length === 0) {
                return res.status(401).json({ message: 'No hay un usuario asociado al token.' })
            }

            const salt = 10
            const hashedPassword = await bcrypt.hash(validateData.data.password, salt)

            await connection.query(`UPDATE usuario SET contrasenha = ? WHERE id_usuario = ?`, [hashedPassword, token.id])
            return res.status(200).json({ message: 'Contraseña actualizada!' })
        } else {
            return res.status(401).json({ message: 'Token inválido. Inténtalo nuevamente.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: Error })
    }
})

export default loginRouter