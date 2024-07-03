import express from 'express'
import cors from 'cors'

// Routers:
import loginRouter from './routes/loginRouter'
import userRouter from './routes/userRouter'
import galleryRouter from './routes/galleryRouter'
import campaignRouter from './routes/campaignRouter'
import mediaRouter from './routes/mediaRouter'
import serviceRouter from './routes/serviceRouter'
import cartRouter from './routes/shoppingCart'
import dataRouter from './routes/getData'
import equipmentRouter from './routes/equipmentRouter'
import collabsRouter from './routes/collabsRouter'
import buymentRouter from './routes/buymentRouter'

// Middleware:
import verifyToken from './middleware/verifyToken'

// Utils:
import { rateLimiter } from './utils/rate-limiter'
import { slowDownLimiter } from './utils/slow-down'
<<<<<<< HEAD
import dataRouter from './routes/getData'
import equipmentRouter from './routes/equipmentRouter'
import collabsRouter from './routes/collabsRouter'
import messageRouter from './routes/messageRouter'
=======
>>>>>>> 361774893b8e3cc698c2ec2672c3475d4674f713

const app = express()

app.use(express.json())
app.use(cors())

app.use(rateLimiter)
app.use(slowDownLimiter)

app.use('/api/login', loginRouter)
app.use('/api/get', dataRouter)
app.use('/api/message', messageRouter)
console.log(1)
app.use('', verifyToken)
console.log(2)
app.use('/api/users', userRouter)
app.use('/api/gallery', galleryRouter)
app.use('/api/campaign', campaignRouter)
app.use('/api/media', mediaRouter)
app.use('/api/service', serviceRouter)
app.use('/api/cart', cartRouter)
app.use('/api/equipment', equipmentRouter)
app.use('/api/collaborations', collabsRouter)
app.use('/api/buyment', buymentRouter)

export default app