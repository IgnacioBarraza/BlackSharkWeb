// import express from 'express'
// import { randomUUID } from 'crypto'

// import { connect } from '../utils/db'
// import { verifyProduct } from '../schemas/productSchema'
// import authorizeRole from '../middleware/authorizeRole'

// const productRouter = express.Router()

// productRouter.get('/', async (req, res) => {
//     const connection = connect()

//     try {
//         const [row, fields] = await connection.query(`SELECT * FROM productos`)

//         return res.status(200).json(row)
//     } catch (error) {
//         // console.log(error)
//         return res.status(500).json({ messageL: 'Hubo un error tratando de obtener los productos.' })
//     } finally {
//         if (connection) {
//             connection.end()
//         }
//     }
// })

// productRouter.post('/new', authorizeRole, async (req, res) => {
//     const connection = connect()

//     const verifyData = verifyProduct(req.body)

//     if (verifyData.error) {
//         return res.status(400).json({ message: JSON.parse(verifyData.error.message)[0].message })
//     }

//     try {
//         const searchProduct = await connection.query(`SELECT * FROM productos WHERE nombre = ?`, [verifyData.data.nombre])
//         const searchInventory = await connection.query(`SELECT * FROM inventario WHERE id_inventario = ?`, [verifyData.data.id_inventario])

//         if (Array.isArray(searchProduct[0]) && searchProduct[0].length > 0) {
//             return res.status(400).json({ message: 'Ya existe el producto en la base de datos!' })
//         } else if (!(Array.isArray(searchInventory[0]) && searchInventory[0].length > 0)) {
//             return res.status(400).json({ message: 'El inventario ingresado no existe en la base de datos.' })
//         } else {
//             const newProduct = {
//                 id_productos: randomUUID(),
//                 nombre: verifyData.data.nombre,
//                 precio: verifyData.data.precio,
//                 desc: verifyData.data.descripcion,
//                 id_inventario: verifyData.data.id_inventario
//             }

//             await connection.query(`INSERT INTO productos (id_productos, nombre, precio, descripcion, id_inventario) VALUES (?, ?, ?, ?, ?)`, [newProduct.id_productos, newProduct.nombre, newProduct.precio, newProduct.desc, newProduct.id_inventario])

//             return res.status(201).json({ message: 'Producto guardado!' })
//         }
//     } catch (error) {
//         // console.log(error)
//         res.status(500).json({ message: 'Hubo un error intentando añadir el producto a la base de datos!' })
//     } finally {
//         if (connection) {
//             connection.end()
//         }
//     }
// })

// productRouter.put('/update/:id', authorizeRole, async (req, res) => {
//     const productId = req.params.id
//     const connection = connect()

//     const verifyData = verifyProduct(req.body)

//     if (verifyData.error) {
//         return res.status(400).json({ message: JSON.parse(verifyData.error.message)[0].message })
//     }

//     try {
//         const searchProduct = await connection.query(`SELECT * FROM productos WHERE id_productos = ?`, [productId])

//         if (Array.isArray(searchProduct[0]) && searchProduct[0].length > 0) {
//             const updatedProduct = {
//                 nombre: verifyData.data.nombre,
//                 precio: verifyData.data.precio,
//                 desc: verifyData.data.descripcion
//             }

//             await connection.query(`
//                 UPDATE productos
//                 SET nombre = ?,
//                 precio = ?,
//                 descripcion = ?
//                 WHERE id_productos = ?
//             `, [updatedProduct.nombre, updatedProduct.precio, updatedProduct.desc, productId])

//             return res.status(200).json({ message: 'Producto actualizado!' })
//         } else {
//             return res.status(400).json({ message: 'Producto no encontrado.' })
//         }
//     } catch (error) {
//         // console.log(error)
//         return res.status(500).json({ message: 'Hubo un problema intentando actualizar el producto.' })
//     } finally {
//         if (connection) {
//             connection.end()
//         }
//     }
// })

// productRouter.delete('/delete/:id', authorizeRole, async (req, res) => {
//     const productId = req.params.id
//     const connection = connect()

//     try {
//         const searchProduct = await connection.query(`SELECT * FROM productos WHERE id_productos = ?`, [productId])
        
//         if (Array.isArray(searchProduct[0]) && searchProduct[0].length > 0) {
//             await connection.query(`DELETE FROM productos WHERE id_productos = ?`, [productId])

//             return res.status(200).json({ message: 'Producto eliminado!' })
//         } else {
//             return res.status(400).json({ message: 'No se ha encontrado el producto.' })
//         }
//     } catch (error) {
//         // console.log(error)
//         return res.status(500).json({ message: 'Hubo un error al intentar eliminar el producto.' })
//     } finally {
//         if (connection) {
//             connection.end()
//         }
//     }
// })

// export default productRouter