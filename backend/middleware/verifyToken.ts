import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'
import { SECRET } from "../utils/config"

const getToken = (req: Request): string | undefined => {
    const authHeader = req.headers['authorization']
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.replace('Bearer ', '')
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const cleanToken = getToken(req)

    if (cleanToken && SECRET) {
        try {
            jwt.verify(cleanToken, SECRET)
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido.' })
        }
    } else {
        return res.status(500).json({ message: 'Hubo un error en el servidor. Intente más tarde.s' })
    }
}

export default verifyToken