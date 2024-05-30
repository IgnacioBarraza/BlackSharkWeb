import express from 'express'

import { connect } from '../utils/db'
import { validateImage } from '../schemas/gallerySchema'
import { randomUUID } from 'crypto'

const galleryRouter = express.Router()

galleryRouter.get('/', async (req, res) => {
    const connection = connect()

    try {
        const [row, fields] = await connection.query(`SELECT * FROM gallery`)
        return res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error en el servidor. Intente más tarde.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }   
})

galleryRouter.post('/new', async (req, res) => {
    const connection = connect()

    const verifyData = validateImage(req.body)

    if (verifyData.error) {
        return res.status(400).json({ message: JSON.parse(verifyData.error.message)[0].message })
    }

    try {
        const searchImage = await connection.query(`SELECT * FROM gallery WHERE imagen_link = ?`, [verifyData.data.imagen_link])

        if (Array.isArray(searchImage[0]) && searchImage[0].length > 0) {
            return res.status(400).json({ message: 'La imagen ya está en la galería!' })
        }

        const newImage = {
            id_image: randomUUID(),
            id_servicios: verifyData.data.id_servicios,
            imagen_link: verifyData.data.imagen_link
        }

        await connection.query(`INSERT INTO gallery (id_imagen, id_servicios, imagen_link) VALUES (?, ?, ?)`, [newImage.id_image, newImage.id_servicios, newImage.imagen_link])
        return res.status(201).json({ message: 'La imagen se ha agregado con éxito.' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error con el servidor. Inténtalo más tarde.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default galleryRouter