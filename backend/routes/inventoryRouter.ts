import express from 'express'
import { connect } from '../utils/db'

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
    const data = req.body
    const connection = connect()

//  +---------------------+-------------+------+-----+---------+-------+
// | Field               | Type        | Null | Key | Default | Extra |
// +---------------------+-------------+------+-----+---------+-------+
// | id_inventario       | int         | NO   | PRI | NULL    |       |
// | nombre_inventario   | varchar(50) | NO   |     | NULL    |       |
// | cantidad_disponible | int         | NO   |     | NULL    |       |
// | id_producto         | int         | NO   | MUL | NULL    |       |
// +---------------------+-------------+------+-----+---------+-------+

    try {
        const searchInventario = await connection.query(`SELECT * FROM inventario WHERE nombre_inventario = '?'`, [data.nombre])

        if (Array.isArray(searchInventario[0]) && searchInventario[0].length > 0) {
            res.status(400).json({ message: 'Este inventario ya existe.' })
            return
        }


    } catch (error) {
        
    }
})

inventoryRouter.put('/update/inventario', async (req, res) => {
    
})

inventoryRouter.delete('/delete/inventory/:id', async (req, res) => {
    const inventoryId = req.params.id
    const connection = connect()

    try {
        const searchInventory = await connection.query(`SELECT * FROM inventario WHERE id_inventario = ?`, [inventoryId])

        if (Array.isArray(searchInventory[0]) && searchInventory[0].length > 0) {
            await connection.query(`DELETE FROM inventario WHERE id_inventario = ?`, [inventoryId])

            res.status(200).json({ message: 'Inventario eliminado.' })
            return
        } else {
            res.status(400).json({ message: 'El inventario no existe en la base de datos.' })
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un problema al intentar eliminar el inventario.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default inventoryRouter