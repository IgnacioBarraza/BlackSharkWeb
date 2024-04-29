import express from 'express'
import { connect } from '../utils/db'
import { randomUUID } from 'crypto'

const campaignRouter = express.Router()

campaignRouter.get('/campaigns', async (req, res) => {
    const connection = connect()

    try {
        const [row, fields] = await connection.query(`SELECT * FROM campanha;`)

        res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un error al intentar obtener las campañas.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

campaignRouter.post('/new/campaign', async (req, res) => {
    const data = req.body
    const connection = connect()

    // Checking if any field from the request is empty:
    if (!data.nombre) {
        res.status(400).json({ message: 'La campaña debe tener un nombre!' })
        return
    } else if (!data.presupuesto) {
        res.status(400).json({ message: 'La campaña necesita un presupuesto!' })
        return
    }

    try {
        const searchCampaign = await connection.query(`SELECT * from campanha WHERE nombre = '${data.nombre}'`)

        if (Array.isArray(searchCampaign[0]) && searchCampaign[0].length > 0) {
            res.status(404).json({ message: 'El nombre de la campaña ingresada ya existe en la base de datos.' })
            return
        } else {
            const campaignData = {
                id_campanha: randomUUID(),
                nombre: data.nombre,
                presupuesto: data.presupuesto
            }

            await connection.query(`INSERT INTO campanha (id_campanha, nombre, presupuesto) VALUES (?, ?, ?)`, [campaignData.id_campanha, campaignData.nombre, campaignData.presupuesto])

            res.status(201).json({ message: 'Campaña añadida exitosamente!' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error intentando guardar la campaña en la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

campaignRouter.put('/update/campaign/:id', async (req, res) => {
    const campaignId = req.params.id
    const data = req.body
    const connection = connect()

    try {
        const searchCampaign = await connection.query(`SELECT * FROM campanha WHERE id_campanha = ?`, [campaignId])

        if (Array.isArray(searchCampaign[0]) && searchCampaign[0].length > 0) {
            const newCampaignData = {
                nombre: data.nombre,
                presupuesto: data.presupuesto
            }

            await connection.query(`
                UPDATE campanha
                SET nombre = ?,
                presupuesto = ?
                WHERE id_campanha = ?
            `, [newCampaignData.nombre, newCampaignData.presupuesto, campaignId])

            res.status(200).json({ message: 'Campaña actualizada.' })
        } else {
            res.status(404).json({ message: 'La campaña no existe en la base de datos.' })
        }
    } catch (error) {
            console.log(error)
        res.status(500).json({ message: 'Hubo un error actualizando la campaña.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

campaignRouter.delete('/delete/campaign/:id', async (req, res) => {
    const campaignId = req.params.id
    const connection = connect()

    try {
        const searchCampaign = await connection.query(`SELECT * FROM campanha WHERE id_campanha = ?`, [campaignId])

        if (Array.isArray(searchCampaign[0]) && searchCampaign[0].length > 0) {
            await connection.query(`DELETE FROM campanha WHERE id_campanha = ?`, [campaignId])
            res.status(200).json({ message: 'La campaña fue eliminada exitosamente.' })
        } else {
            res.status(404).json({ message: 'La campaña no existe en la base de datos.' })
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un error al intentar eliminar la campaña.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default campaignRouter