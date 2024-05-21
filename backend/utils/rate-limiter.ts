import { rateLimit } from 'express-rate-limit'

export const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false
})