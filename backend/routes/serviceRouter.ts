import express from 'express'

import { connect } from '../utils/db'

const serviceRouter = express.Router()

serviceRouter.get('/', async (req, res) => {
    const connection = connect()

    try {
        const [row, fields] = await connection.query(`SELECT * FROM servicios`)
        return res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error con el servidor. Intente más tarde.s' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default serviceRouter