import express from 'express'
import cors from 'cors'

// Routers:
import userRouter from './routes/userRouter'
import campaignRouter from './routes/campaignRouter'
import inventoryRouter from './routes/inventoryRouter'
import mediaRouter from './routes/mediaRouter'
import productRouter from './routes/productRouter'
import projectRouter from './routes/projectRouter'
import budgetRouter from './routes/budgetRouter'

const app = express()

app.use(express.json())
app.use(cors())

app.use('', userRouter)
app.use('', campaignRouter)
app.use('', inventoryRouter)
app.use('', mediaRouter)
app.use('', productRouter)
app.use('', projectRouter)
app.use('', budgetRouter)

export default app