import express from 'express'
import { connect } from '../utils/db'
import { validateBudget } from '../schemas/budgetSchema'
import { randomUUID } from 'crypto'

const budgetRouter = express.Router()

budgetRouter.get('/presupuesto', async (req, res) => {
    const connection = connect()

    try {
        const [row, fields] = await connection.query(`SELECT * FROM presupuesto`)

        return res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error al intentar obtener los presupuestos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

budgetRouter.post('/new/presupuesto', async (req, res) => {
    const connection = connect()

    const verifyData = validateBudget(req.body)

    if (verifyData.error) {
        return res.status(400).json({ error: JSON.parse(verifyData.error.message)[0].message })
    }

    try {
        const searchBudget = await connection.query(`SELECT * FROM presupuesto WHERE id_proyecto = ? AND id_inventario = ? AND id_usuario = ?`,
            [verifyData.data.id_proyecto, verifyData.data.id_inventario, verifyData.data.id_usuario]
        )

        if (Array.isArray(searchBudget[0]) && searchBudget[0].length > 0) {
            return res.status(400).json({ message: 'El presupuesto ya se encuentra en la base de datos.' })
        } else {
            const newBudget = {
                id_presupuesto: randomUUID(),
                id_proyecto: verifyData.data.id_proyecto,
                id_inventario: verifyData.data.id_inventario,
                id_usuario: verifyData.data.id_usuario,
                valor: verifyData.data.valor
            }

            await connection.query(`INSERT INTO presupuesto (id_presupuesto, id_proyecto, id_inventario, id_usuario, valor_presupuesto) VALUES (?, ?, ?, ?, ?)`,
                [newBudget.id_presupuesto, newBudget.id_proyecto, newBudget.id_inventario, newBudget.id_usuario, newBudget.valor]
            )

            return res.status(201).json({ message: 'Presupuesto creado!' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error al intentar añadir el presupuesto a la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

budgetRouter.put('/update/presupuesto/:id', async (req, res) => {
    const budgetId = req.params.id
    const connection = connect()

    const verifyData = validateBudget(req.body)

    if (verifyData.error) {
        return res.status(400).json({ message: JSON.parse(verifyData.error.message)[0].message })
    }

    try {
        const searchBudget = await connection.query(`SELECT * FROM presupuesto WHERE id_presupuesto = ?`, [budgetId])

        if (Array.isArray(searchBudget[0]) && searchBudget[0].length > 0) {
            const updatedBudget = {
                id_proyecto: verifyData.data.id_proyecto,
                id_inventario: verifyData.data.id_inventario,
                id_usuario: verifyData.data.id_usuario,
                valor: verifyData.data.valor
            }

            await connection.query(`UPDATE presupuesto SET id_proyecto = ?, id_inventario = ?, id_usuario = ?, valor_presupuesto = ? WHERE id_presupuesto = ?`,
                [updatedBudget.id_proyecto, updatedBudget.id_inventario, updatedBudget.id_usuario, updatedBudget.valor, budgetId]
            )

            return res.status(200).json({ message: 'Presupuesto actualizado!' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error al intetnar añadir el presupuesto a la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

budgetRouter.delete('/delete/presupuesto/:id', async (req, res) => {
    const budgetId = req.params.id
    const connection = connect()

    try {
        const searchBudget = await connection.query(`SELECT * FROM presupuesto WHERE id_presupuesto = ?`, [budgetId])

        if (Array.isArray(searchBudget[0]) && searchBudget[0].length > 0) {
            await connection.query(`DELETE FROM presupuesto WHERE id_presupuesto = ?`, [budgetId])

            return res.status(200).json({ message: 'Presupuesto eliminado.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error al intentar eliminar el presupuesto de la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default budgetRouter