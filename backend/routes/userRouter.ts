import express from 'express'
import { connect } from '../utils/db'

const userRouter = express.Router()

userRouter.get('/users', async (req, res) => {
    try {
        const connection = connect()

        const [row, fields] = await connection.query(`SELECT * FROM users`)

        res.status(200).json(row)

        connection.end()
    } catch (error) {
        console.log('error executing the query.')
        res.status(500).json(error)
    }

})

export default userRouter