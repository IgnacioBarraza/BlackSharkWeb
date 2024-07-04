import express from 'express'
import { connect } from '../utils/db'
import { validateMessage } from '../schemas/messageSchema'
import { randomUUID } from 'crypto'

const messageRouter = express.Router()

messageRouter.post('/', async (req, res) => {
    const connection = connect()

    const validateData = validateMessage(req.body)

    if (validateData.error) {
        return res.status(400).json({ message: JSON.parse(validateData.error.message)[0].message })
    }

    try {
        const newMessage = {
            id_message: randomUUID(),
            nombre: validateData.data.nombre,
            apellido: validateData.data.apellido,
            correo: validateData.data.correo,
            telefono: validateData.data.telefono,
            mensaje: validateData.data.mensaje
        }

        await connection.query(`INSERT INTO messages (id_message, nombre, apellido, correo, telefono, mensaje) VALUES (?, ?, ?, ?, ?, ?)`, [newMessage.id_message, newMessage.nombre, newMessage.apellido, newMessage.correo, newMessage.telefono, newMessage.mensaje])
        return res.status(201).json({ message: 'Mensaje guardado con éxito!' })
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error en el servidor al intentar guardar el mensaje' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default messageRouter;