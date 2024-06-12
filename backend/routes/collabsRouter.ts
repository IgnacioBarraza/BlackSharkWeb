import express from 'express'
import { randomUUID } from 'crypto'

import { connect } from '../utils/db'
import { validateCollab } from '../schemas/collabsSchema'

const collabsRouter = express.Router()

collabsRouter.post('/new', async (req, res) => {
    const connection = connect()

    const validateData = validateCollab(req.body)

    if (validateData.error) {
        return res.status(400).json({ message: JSON.parse(validateData.error.message)[0].message })
    }

    try {
        const newCollab = {
            id_colaboration: randomUUID(),
            nombre_empresa: validateData.data.nombre_empresa,
            id_servicios: validateData.data.id_servicios
        }

        await connection.query(`INSERT INTO colaborations (id_colaboration, nombre_empresa, id_servicios) VALUES (?, ?, ?)`,
            [newCollab.id_colaboration, newCollab.nombre_empresa, newCollab.id_colaboration]
        )

        return res.status(201).json({ message: 'Los datos se han guardado exitosamente!' })
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error en el servidor al intentar guardar los datos de la colaboración. Intente más tarde.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default collabsRouter