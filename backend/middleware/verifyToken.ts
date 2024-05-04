import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import mysql from 'mysql2/promise'

import { SECRET } from '../utils/config'
import { connect } from '../utils/db'

interface modifiedRequest extends Request {
    user?: {
        role: string
    }
}

const getToken = (req: Request): string | undefined => {
    const authHeader = req.headers['authorization']
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.replace('Bearer ', '')
    }
}

const verifyToken = async (req: modifiedRequest, res: Response, next: NextFunction) => {
    const cleanToken = getToken(req)
    const connection = connect()

    try {
        if (!cleanToken || !SECRET) {
            throw new Error('Token inexistente. Intente de nuevo más tarde.')
        }

        const token = jwt.verify(cleanToken, SECRET)

        if (typeof token !== 'object') {
            throw new Error('Token inválido.')
        }

        const [row, fields] = await connection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [token.identifier])
        
        if (!Array.isArray(row) || row.length === 0) {
            throw new Error('Credenciales de autenticación inválidas.')
        }

        const user = row as mysql.RowDataPacket[]
        req.user = {
            role: user[0].tipo_user
        }

        next()
    } catch (error: any) {
        // console.log(error.message)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido.' })
        } else {
            return res.status(500).json({ message: error.message })
        }
    } finally {
        if (connection) {
            connection.end()
        }
    }
}

export default verifyToken