import express from 'express'
import { connect } from '../utils/db'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

const userRouter = express.Router()

const bcryptPassword = async (password: string) => {
    const salt = 10

    const hushedPassword = await bcrypt.hash(password, salt)
    return hushedPassword
}

userRouter.get('/users', async (req, res) => {
    const connection = connect()
    
    try {
        const [row, fields] = await connection.query(`SELECT * FROM usuario`)

        res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un problema al obtener datos de los usuarios.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

userRouter.post('/new/user', async (req, res) => {
    const data = req.body
    const connection = connect()

    // Checking if any field from the request is empty:
    if (!data.username) {
        res.status(400).json({ message: 'Debes especificar el nombre del usuario!' })
        return
    } else if (!data.password) {
        res.status(400).json({ message: 'El usuario debe tener una contraseña!' })
        return
    } else if (!data.email) {
        res.status(400).json({ message: 'El usuario debe tener un correo.' })
        return
    } else if (!data.tipo_user) {
        res.status(400).json({ message: 'Debes especificar el tipo de usuario!' })
        return
    }
    
    try {
        const searchUser = await connection.query(`SELECT * FROM usuario WHERE Correo = ?`, [data.correo])
        
        // Checking if the user exists on the database:
        if (Array.isArray(searchUser[0]) && searchUser[0].length > 0) {
            res.status(404).json({ message: 'El usuario ya existe en la base de datos!' })
            return
        } else {
            const newUser = {
                id_usuario: randomUUID(),
                username: data.username,
                password: await bcryptPassword(data.password),
                correo: data.email,
                telefono: data.phone,
                tipo_user: data.tipo_user,
                direccion: data.direccion
            }
            console.log(newUser)
    
            await connection.query(`INSERT INTO usuario (id_usuario, username, contrasenha, correo, telefono, tipo_user, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [newUser.id_usuario, newUser.username, newUser.password, newUser.correo, newUser.telefono, newUser.tipo_user, newUser.direccion]
            )
    
            res.status(201).json({ message: 'Usuario creado!' })
            return
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error intentando añadir el usuario a la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

userRouter.put('/update/user/:id', async (req, res) => {
    const data = req.body
    const userId = req.params.id
    const connection = connect()

    try {
        const searchUser = await connection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [userId])

        if (Array.isArray(searchUser[0]) && searchUser[0].length > 0) {
            const updatedUser = {
                username: data.username,
                email: data.email,
                telefono: data.telefono,
                tipo_user: data.tipo_user,
                direccion: data.direccion
            }

            await connection.query(`
                UPDATE usuario
                SET username = ?,
                correo = ?,
                telefono = ?,
                tipo_user = ?,
                direccion = ?
                WHERE id_usuario = ?
            `, [updatedUser.username, updatedUser.email, updatedUser.telefono, updatedUser.tipo_user, updatedUser.direccion, userId])

            res.status(200).json({ message: 'Usuario actualizado!' })
            return
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' })
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un error intentando actualizar el usuario.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

userRouter.delete('/delete/user/:id', async (req, res) => {
    const userId = req.params.id
    const connection = connect()

    try {
        const searchUser = await connection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [userId])
        
        if (Array.isArray(searchUser[0]) && searchUser[0].length > 0) {
            await connection.query(`DELETE FROM usuario WHERE id_usuario = ?`, [userId])

            res.status(200).json({ message: 'Usuario eliminado de la base de datos.' })
            return
        } else {
            res.status(400).json({ message: 'Usuario no encontrado.' })
            return
        }

    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un problema al intentar eliminar el usuario de la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default userRouter