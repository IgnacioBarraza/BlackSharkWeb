import express from 'express'
import { randomUUID } from 'crypto'
import mysql from 'mysql2/promise'

import { connect } from '../utils/db'
import { validateCollab, validateUpdateCollab } from '../schemas/collabsSchema'

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

collabsRouter.put('/update/:id', async (req, res) => {
    const connection = connect()
    const id = req.params.id

    const validateData = validateUpdateCollab(req.body)

    if (validateData.error) {
        return res.status(400).json({ message: JSON.parse(validateData.error.message)[0].message })
    }

    try {
        const [row, fields] = await connection.query(`SELECT * FROM colabortions WHERE id_colaboration = ?`, [id])
        const collab = row as mysql.RowDataPacket[]

        if (Array.isArray(collab) && collab.length > 0) {
            const updatedCollab = {
                nombre_empresa: validateData.data.nombre_empresa,
                id_servicios: validateData.data.id_servicios
            }

            await connection.query(`
                UPDATE colaborations
                SET nombre_empresa = ?,
                id_servicios = ?
                WHERE id_colaboration = ?
            `, [updatedCollab.nombre_empresa, updatedCollab.id_servicios, id])

            return res.status(200).json({ message: 'Los datos de la colaboración se han actualizado con éxito.' })
        } else {
            return res.status(400).json({ message: 'No hay ninguna colaboración con esa id. Inténtalo nuevamente.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error en el servidor al intentar actualizar los datos de la colaboración. Inténtalo de nuvo más tarde.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default collabsRouter