import express from 'express'
import { connect } from '../utils/db'
import { randomUUID } from 'crypto'

const mediaRouter = express.Router()

mediaRouter.get('/media', async (req, res) => {
    const connection = connect()

    try {
        const [row, fields] = await connection.query(`SELECT * FROM medios_comunicacion`)

        res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un error en el servidor al intentar obtener los datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

mediaRouter.post('/new/media', async (req, res) => {
    const data = req.body
    const connection = connect()

    if (!data.nombreMedio) {
        res.status(400).json({ message: 'El medio de comunicación debe tener un nombre!' })
        return
    } else if (!data.tipoMedio) {
        res.status(400).json({ message: 'Debes indicar el tipo de medio de comunicación!' })
        return
    }

    try {
        const searchMedia = await connection.query(`SELECT * FROM medios_comunicacion WHERE nombre_medio = ?`, [data.nombreMedio])

        if (Array.isArray(searchMedia[0]) && searchMedia[0].length > 0) {
            res.status(404).json({ message: 'Este medio ya existe en la base de datos!' })
            return
        } else {
            const newMedia = {
                id_medio: randomUUID(),
                nombre_media: data.nombreMedio,
                tipo_media: data.tipoMedio
            }

            await connection.query(`INSERT INTO medios_comunicacion (id_medio, nombre_medio, tipo_medios) VALUES (?, ?, ?)`, [newMedia.id_medio, newMedia.nombre_media, newMedia.tipo_media])

            res.status(201).json({ message: 'Medio de comunicación creada!' })
            return
        }
    } catch (error) {
            console.log(error)
        res.status(500).json({ message: 'Hubo un error intentando añadir el medio de comunicación a la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

mediaRouter.put('/update/media/:id', async (req, res) => {
    const data = req.body
    const mediaId = req.params.id
    const connection = connect()

    try {
        const searchMedia = await connection.query(`SELECT * FROM medios_comunicacion WHERE id_medio = ?`, [mediaId])

        if (Array.isArray(searchMedia[0]) && searchMedia[0].length > 0) {
            const updateMedia = {
                nombre_media: data.nombreMedio,
                tipo_media: data.tipoMedio
            }

            await connection.query(`
                UPDATE medios_comunicacion
                SET nombre_medio = ?,
                tipo_medios = ?
                WHERE id_medio = ?
            `, [updateMedia.nombre_media, updateMedia.tipo_media, mediaId])

            res.status(200).json({ message: 'Medio de comunicación actualizado!' })
            return
        } else {
            res.status(404).json({ message: 'Medio de comunicación no encontrado.' })
            return
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un error intentando actualizar el medio de comunicación.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

mediaRouter.delete('/delete/media/:id', async (req, res) => {
    const mediaId = req.params.id
    const connection = connect()

    try {
        const searchMedia = await connection.query(`SELECT * FROM medios_comunicacion WHERE id_medio = ?`, [mediaId])

        if (Array.isArray(searchMedia[0]) && searchMedia[0].length > 0) {
            await connection.query(`DELETE FROM medios_comunicacion WHERE id_medio = ?`, [mediaId])

            res.status(200).json({ message: 'Medio de comunicación eliminado.' })
            return
        } else {
            res.status(400).json({ message: 'Medio de comunicación no encontrado.' })
            return
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un problema intentando eliminar el medio de comunicación.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default mediaRouter