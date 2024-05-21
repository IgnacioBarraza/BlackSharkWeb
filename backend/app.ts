import express from 'express'
import cors from 'cors'

// Routers:
import loginRouter from './routes/loginRouter'
import userRouter from './routes/userRouter'
import campaignRouter from './routes/campaignRouter'
import inventoryRouter from './routes/inventoryRouter'
import mediaRouter from './routes/mediaRouter'
import productRouter from './routes/productRouter'
import projectRouter from './routes/projectRouter'
import budgetRouter from './routes/budgetRouter'

// Middleware:
import verifyToken from './middleware/verifyToken'

// Utils:
import { rateLimiter } from './utils/rate-limiter'
import { slowDownLimiter } from './utils/slow-down'

const app = express()

app.use(express.json())
app.use(cors())

app.use(rateLimiter)
app.use(slowDownLimiter)

app.use('/api/login', loginRouter)

app.use('', verifyToken)

app.use('/api/users', userRouter)
app.use('/api/campaign', campaignRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/media', mediaRouter)
app.use('/api/product', productRouter)
app.use('/api/project', projectRouter)
app.use('/api/budget', budgetRouter)

export default app