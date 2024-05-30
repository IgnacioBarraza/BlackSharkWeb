import express from 'express'

import { connect } from '../utils/db'

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

export default galleryRouter