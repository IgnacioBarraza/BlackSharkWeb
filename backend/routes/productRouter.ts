import express from 'express'
import { connect } from '../utils/db'

const productRouter = express.Router()

productRouter.get('/products', async (req, res) => {
    const connection = connect()

    try {
        const [row, fields] = await connection.query(`SELECT * FROM productos`)

        res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        res.status(500).json({ messageL: 'Hubo un error tratando de obtener los productos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

productRouter.post('/new/product', async (req, res) => {
    const data = req.body
    const connection = connect()

    if (!data.nombre) {
        res.status(400).json({ message: 'El producto debe tener un nombre!' })
        return
    } else if (!data.precio) {
        res.status(400).json({ message: 'Debes indicar el precio del producto!' })
        return
    } else if (!data.descripcion) {
        res.status(400).json({ message: 'Deberías agregar una descripción!' })
        return
    }

    try {
        const searchProduct = await connection.query(`SELECT * FROM productos WHERE nombre = ?`, [data.nombre])

        if (Array.isArray(searchProduct[0]) && searchProduct[0].length > 0) {
            res.status(400).json({ message: 'Ya existe el producto en la base de datos!' })
            return
        } else {
            const newProduct = {
                nombre: data.nombre,
                precio: data.precio,
                desc: data.descripcion
            }

            await connection.query(`INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)`, [newProduct.nombre, newProduct.precio, newProduct.desc])

            res.status(201).json({ message: 'Producto guardado!' })
            return
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error intentando añadir el producto a la base de datos!' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

productRouter.put('/update/producto/:id', async (req, res) => {
    const data = req.body
    const productId = req.params.id
    const connection = connect()

    try {
        const searchProduct = await connection.query(`SELECT * FROM productos WHERE id_productos = ?`, [productId])

        if (Array.isArray(searchProduct[0]) && searchProduct[0].length > 0) {
            const updatedProduct = {
                nombre: data.nombre,
                precio: data.precio,
                desc: data.descripcion
            }

            await connection.query(`
                UPDATE productos
                SET nombre = ?,
                precio = ?,
                descripcion = ?
                WHERE id_productos = ?
            `, [updatedProduct.nombre, updatedProduct.precio, updatedProduct.desc, productId])

            res.status(200).json({ message: 'Producto actualizado!' })
            return
        } else {
            res.status(400).json({ message: 'Producto no encontrado.' })
            return
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un problema intentando actualizar el producto.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

productRouter.delete('/delete/product/:id', async (req, res) => {
    const productId = req.params.id
    const connection = connect()

    try {
        const searchProduct = await connection.query(`SELECT * FROM productos WHERE id_productos = ?`, [productId])
        
        if (Array.isArray(searchProduct[0]) && searchProduct[0].length > 0) {
            await connection.query(`DELETE FROM productos WHERE id_productos = ?`, [productId])

            res.status(200).json({ message: 'Producto eliminado!' })
            return
        } else {
            res.status(400).json({ message: 'No se ha encontrado el producto.' })
            return
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un error al intentar eliminar el producto.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default productRouter