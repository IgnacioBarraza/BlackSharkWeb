import { Router } from 'express'
import { connect } from '../utils/db'
import { validateMetrics } from "../schemas/metricSchema";
import authorizeRole from '../middleware/authorizeRole'

const metricsRouter = Router()

metricsRouter.get('/metrics-by-date', authorizeRole, async (req, res) => {
  const connection = connect()
  const { initDate, finishDate } = req.query;

  const metricsDate = {
    initDate: initDate,
    finishDate: finishDate
  }

  const validation = validateMetrics(metricsDate);

  if (validation.error) {
    return res.status(400).json({ message: JSON.parse(validation.error.message)[0].message });
  }

  try {
    const [row, fields] = await connection.execute(
      'SELECT * FROM buyment WHERE fecha_compra >= ? AND fecha_compra <= ?',
      [initDate, finishDate]
    );

    return res.status(200).json(row);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching data' });
  } finally {
    if (connection) {
      connection.end();
    }
  }

})

export default metricsRouter;