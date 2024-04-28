import express from 'express'
import cors from 'cors'

// Routers:
import userRouter from './routes/userRouter'
import campaignRouter from './routes/campaignRouter'
import inventoryRouter from './routes/inventoryRouter'
import mediaRouter from './routes/mediaRouter'

const app = express()

app.use(express.json())
app.use(cors())

app.use('', userRouter)
app.use('', campaignRouter)
app.use('', inventoryRouter)
app.use('', mediaRouter)

export default app