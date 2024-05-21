import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 15 * 60 * 15,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false
})