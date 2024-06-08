import express from 'express'
import { randomUUID } from 'crypto'

import { connect } from '../utils/db'
import { validateItem } from '../schemas/equipmentSchema'

const equipmentRouter = express.Router()

equipmentRouter.post('/new', async (req, res) => {
    const connection = connect()

    const validateData = validateItem(req.body)

    if (validateData.error) {
        return res.status(400).json({ message: JSON.parse(validateData.error.message)[0].message })
    }

    try {
        const [row, fields] = await connection.query(`SELECT * FROM equipment WHERE nombre_equipo = ?` ,[validateData.data.nombre_equipo])

        if (Array.isArray(row) && row.length > 0) {
            return res.status(400).json({ message: 'Ya existe un equipo registrado con ese nombre! Prueba con otro.' })
        }

        const newItem = {
            id_equipo: randomUUID(),
            nombre_equipo: validateData.data.nombre_equipo,
            tipo_equipo: validateData.data.tipo_equipo,
            id_servicios: validateData.data.id_servicios
        }

        await connection.query(`INSERT INTO equipment (id_equipo, nombre_equipo, tipo_equipo, id_servicios) VALUES (?, ?, ?, ?)`, [newItem.id_equipo, newItem.nombre_equipo, newItem.tipo_equipo, newItem.id_servicios])
        return res.status(201).json({ message: 'El equipo se ha guardado con éxito.' })
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error al intentar guardar el equipo. Intente más tarde.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default equipmentRouter