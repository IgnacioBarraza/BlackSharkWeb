import express from 'express'
import { randomUUID } from 'crypto'
import { connect } from '../utils/db'
import { validateUser } from '../schemas/userSchema'
import bcrypt from 'bcrypt'

const userRouter = express.Router()

const bcryptPassword = async (password: string) => {
    const salt = 10

    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

userRouter.get('/', async (req, res) => {
    const connection = connect()
    
    try {
        const [row, fields] = await connection.query(`SELECT * FROM usuario`)

        return res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un problema al obtener datos de los usuarios.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

userRouter.post('/new', async (req, res) => {
    const connection = connect()

    const result = validateUser(req.body)

    if (result.error) {
        return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    
    try {
        const searchUser = await connection.query(`SELECT * FROM usuario WHERE username = ?`, [result.data.username])
        
        // Checking if the user exists on the database:
        if (Array.isArray(searchUser[0]) && searchUser[0].length > 0) {
            return res.status(404).json({ message: 'El usuario ya existe en la base de datos!' })
        } else {
            const newUser = {
                id_usuario: randomUUID(),
                username: result.data.username,
                password: await bcryptPassword(result.data.password),
                correo: result.data.email,
                telefono: result.data.phone,
                tipo_user: result.data.tipo_user,
                direccion: result.data.direction
            }
    
            await connection.query(`INSERT INTO usuario (id_usuario, username, contrasenha, correo, telefono, tipo_user, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [newUser.id_usuario, newUser.username, newUser.password, newUser.correo, newUser.telefono, newUser.tipo_user, newUser.direccion]
            )
    
            return res.status(201).json({ message: 'Usuario creado!' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error intentando añadir el usuario a la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

userRouter.put('/update/:id', async (req, res) => {
    const userId = req.params.id
    const connection = connect()

    const result = validateUser(req.body)

    if (result.error) {
        return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }

    try {
        const searchUser = await connection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [userId])

        if (Array.isArray(searchUser[0]) && searchUser[0].length > 0) {
            const updatedUser = {
                username: result.data.username,
                email: result.data.email,
                telefono: result.data.phone,
                tipo_user: result.data.tipo_user,
                direccion: result.data.direction
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

            return res.status(200).json({ message: 'Usuario actualizado!' })
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error intentando actualizar el usuario.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

userRouter.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id
    const connection = connect()

    try {
        const searchUser = await connection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [userId])
        
        if (Array.isArray(searchUser[0]) && searchUser[0].length > 0) {
            await connection.query(`DELETE FROM usuario WHERE id_usuario = ?`, [userId])

            return res.status(200).json({ message: 'Usuario eliminado de la base de datos.' })
        } else {
            return res.status(400).json({ message: 'Usuario no encontrado.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un problema al intentar eliminar el usuario de la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default userRouter