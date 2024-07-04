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
            id_servicios: validateData.data.id_servicios,
            imagen_link: validateData.data.imagen_link,
            fecha_colaboracion: new Date()
        }

        await connection.query(`INSERT INTO collaboration (id_collaboration, nombre_empresa, id_servicios, imagen_link, fecha_colaboracion) VALUES (?, ?, ?, ?, ?)`,
            [newCollab.id_colaboration, newCollab.nombre_empresa, newCollab.id_servicios, newCollab.imagen_link, newCollab.fecha_colaboracion]
        )

        return res.status(201).json({ message: 'Los datos se han guardado exitosamente!', id: newCollab.id_colaboration })
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error en el servidor al intentar guardar los datos de la colaboración. Intente más tarde.', error })
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
        const [row, fields] = await connection.query(`SELECT * FROM collaboration WHERE id_collaboration = ?`, [id])
        const collab = row as mysql.RowDataPacket[]

        if (Array.isArray(collab) && collab.length > 0) {
            const updatedCollab = {
                nombre_empresa: validateData.data.nombre_empresa ?? collab[0].nombre_empresa,
                id_servicios: validateData.data.id_servicios ?? collab[0].id_servicios,
                fecha_colaboracion: new Date(),
                imagen_link: validateData.data.imagen_link ?? collab[0].imagen_link
            }

            await connection.query(`
                UPDATE collaboration
                SET nombre_empresa = ?,
                id_servicios = ?,
                imagen_link = ?,
                fecha_colaboracion = ?,
                WHERE id_collaboration = ?
            `, [updatedCollab.nombre_empresa, updatedCollab.id_servicios, updatedCollab.imagen_link, updatedCollab.fecha_colaboracion, id])

            return res.status(200).json({ message: 'Los datos de la colaboración se han actualizado con éxito.' })
        } else {
            return res.status(400).json({ message: 'No hay ninguna colaboración con esa id. Inténtalo nuevamente.' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error en el servidor al intentar actualizar los datos de la colaboración. Inténtalo de nuevo más tarde.', error })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

collabsRouter.delete('/delete/:id', async (req, res) => {
    const connection = connect()
    const id = req.params.id

    try {
        const [row, fields] = await connection.query(`SELECT * FROM collaboration WHERE id_collaboration = ?`, [id])
        const collab = row as mysql.RowDataPacket[]

        if (Array.isArray(collab) && collab.length > 0) {
            await connection.query(`DELETE FROM collaboration WHERE id_collaboration = ?`, [id])
            return res.status(200).json({ message: 'Los datos de la colaboración se han eliminado con éxito.' })
        } else {
            return res.status(400).json({ message: 'No hay ninguna colaboración asociada a esa id. Inténtalo nuevamente.' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error en el servidor al intentar eliminar la colaboración. Inténtalo más tarde.', error })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default collabsRouter