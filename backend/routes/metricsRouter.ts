import { Router } from 'express'
import { connect } from '../utils/db'
import { validateMetrics } from "../schemas/metricSchema";
import authorizeRole from '../middleware/authorizeRole'

const metricsRouter = Router()

metricsRouter.get('/metrics-by-date', authorizeRole, async (req, res) => {
  
  const { initDate, finishDate } = req.query
  const metricsDate = {
    initDate: initDate,
    finishDate: finishDate
  }

  const validation = validateMetrics(metricsDate)

  if (validation.error) {
    return res.status(400).json({ message: JSON.parse(validation.error.message)[0].message })
  }
  const connection = connect()

  try {
    const [results] = await connection.query(
      `SELECT b.total_compra, b.id_servicios, b.fecha_compra, 
              s.nombre, s.precio
      FROM buyment b
      JOIN servicios s ON b.id_servicios = s.id_servicios
      WHERE b.fecha_compra >= ? AND b.fecha_compra <= ?`,
      [initDate, finishDate]
    )

    return res.status(200).json(results)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un problema al obtener datos de metricas.', error })
  } finally {
    if (connection) {
      connection.end();
    }
  }
})

metricsRouter.get('/all-metrics', authorizeRole, async (req, res) => {
  const connection = connect()

  try {
    const [results] = await connection.query(`
      SELECT b.total_compra, b.id_servicios, b.fecha_compra, 
              s.nombre, s.precio
      FROM buyment b
      JOIN servicios s ON b.id_servicios = s.id_servicios
    `)
    
    return res.status(200).json(results)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Hubo un problema al obtener datos de metricas.', error })
  } finally {
    if (connection) {
      connection.end()
    }
  }
})

export default metricsRouter;