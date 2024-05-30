import express from 'express'
import { randomUUID } from 'crypto'

import { connect } from '../utils/db'
import { validateService } from '../schemas/serviceSchema'

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

serviceRouter.post('/new', async (req, res) => {
    const connection = connect()
    
    const verifyData = validateService(req.body)

    if (verifyData.error) {
        return res.status(400).json({ message: JSON.parse(verifyData.error.message)[0].message })
    }

    try {
        const searchService = await connection.query(`SELECT * FROM servicios WHERE nombre = ?`, [verifyData.data.nombre])

        if (Array.isArray(searchService[0]) && searchService[0].length > 0) {
            return res.status(400).json({ message: 'El servicio ingresado ya existe en la base de datos!' })
        }

        const newService = {
            id_servicios: randomUUID(),
            nombre: verifyData.data.nombre,
            precio: verifyData.data.precio,
            descripcion: verifyData.data.descripcion
        }

        await connection.query(`INSERT INTO servicios (id_servicios, nombre, precio, descripcion) VALUES (?, ?, ?, ?)`, [newService.id_servicios, newService.nombre, newService.precio, newService.descripcion])
        return res.status(201).json({ message: 'Servicio creado!' })
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error en el servidor al intentar guardar el servicio. Inténtalo más tarde.' })
    }
})

export default serviceRouter