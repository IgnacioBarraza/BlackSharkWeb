import { Request, Response, NextFunction } from 'express'

interface modifiedRequest extends Request {
    user?: {
        role: string
    }
}

const authorizeRole = (req: modifiedRequest, res: Response, next: NextFunction) => {
    if (!req.user?.role || req.user.role !== 'admin') {
        return res.status(401).json({ message: 'No posees las credenciales para consultar la base de datos.' })
    }

    next()
}

export default authorizeRole