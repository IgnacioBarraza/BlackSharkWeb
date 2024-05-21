import { slowDown } from 'express-slow-down'

export const slowDownLimiter = slowDown({
    windowMs: 1 * 60 * 1000,
    delayAfter: 10,
    delayMs: hits => hits * 100
})