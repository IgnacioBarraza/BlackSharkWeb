import express from 'express'
import { connect } from '../utils/db'
import { verifyInventory } from '../schemas/inventorySchema'
import { randomUUID } from 'crypto'

const inventoryRouter = express.Router()

inventoryRouter.get('/inventory', async (req, res) => {
    const connection = connect()

    try {
        const [row, fields] = await connection.query(`SELECT * FROM inventario`)

        res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un error intentando obtener los artículos del inventario.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

inventoryRouter.post('/new/inventario', async (req, res) => {
    const connection = connect()

    const verifyData = verifyInventory(req.body)

    if (verifyData.error) {
        return res.status(400).json({ message: JSON.parse(verifyData.error.message)[0].message })
    }

    try {
        const searchInventario = await connection.query(`SELECT * FROM inventario WHERE nombre_inventario = ?`, [verifyData.data.nombre])

        if (Array.isArray(searchInventario[0]) && searchInventario[0].length > 0) {
            return res.status(400).json({ message: 'Este inventario ya existe.' })
        } else {
            const newInventory = {
                id_inventory: randomUUID(),
                nombre: verifyData.data.nombre,
                cantidad: verifyData.data.cantidad
            }

            await connection.query(`INSERT INTO inventario (id_inventario, nombre_inventario, cantidad_disponible) VALUES (?, ?, ?)`, [newInventory.id_inventory, newInventory.nombre, newInventory.cantidad])

            return res.status(201).json({ message: 'Inventario creado!' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error al intentar agregar el inventario a la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

inventoryRouter.put('/update/inventario/:id', async (req, res) => {
    const inventoryId = req.params.id
    const connection = connect()

    const verifyData = verifyInventory(req.body)

    if (verifyData.error) {
        return res.status(400).json({ message: JSON.parse(verifyData.error.message)[0].message })
    }

    try {
        const searchInventario = await connection.query(`SELECT * FROM inventario WHERE id_inventario = ?`, [inventoryId])

        if (Array.isArray(searchInventario[0]) && searchInventario[0].length > 0) {
            const updatedInventory = {
                nombre: verifyData.data.nombre,
                cantidad: verifyData.data.cantidad
            }

            await connection.query(`UPDATE inventario SET nombre_inventario = ?, cantidad_disponible = ? WHERE id_inventario = ?`, [updatedInventory.nombre, updatedInventory.cantidad, inventoryId])

            return res.status(200).json({ message: 'Inventario actualizado!' })
        } else {
            return res.status(400).json({ message: 'El inventario que se quiere actualizar no existe en la base de datos.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error al intentar actualizar el inventario.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

inventoryRouter.delete('/delete/inventory/:id', async (req, res) => {
    const inventoryId = req.params.id
    const connection = connect()

    try {
        const searchInventory = await connection.query(`SELECT * FROM inventario WHERE id_inventario = ?`, [inventoryId])

        if (Array.isArray(searchInventory[0]) && searchInventory[0].length > 0) {
            await connection.query(`DELETE FROM inventario WHERE id_inventario = ?`, [inventoryId])

            return res.status(200).json({ message: 'Inventario eliminado.' })
        } else {
            return res.status(400).json({ message: 'El inventario no existe en la base de datos.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un problema al intentar eliminar el inventario.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default inventoryRouter