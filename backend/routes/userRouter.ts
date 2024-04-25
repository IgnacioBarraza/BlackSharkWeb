import express from 'express'
import { connect } from '../utils/db'
import bcrypt from 'bcrypt'

const userRouter = express.Router()

const bcryptPassword = async (password: string) => {
    const salt = 10

    const hushedPassword = await bcrypt.hash(password, salt)
    return hushedPassword
}

userRouter.get('/users', async (req, res) => {
    try {
        const connection = connect()

        const [row, fields] = await connection.query(`SELECT * FROM users`)

        res.status(200).json(row)

        connection.end()
    } catch (error) {
        res.status(500).json({ message: 'There was a problem getting users data.' })
    }
})

userRouter.post('/new/user', async (req, res) => {
    const data = req.body
    const connection = connect()

    // Checking if any field from the request is empty:
    if (!data.username) {
        res.status(400).json({ message: 'You should provide an username!' })
        return
    } else if (!data.password) {
        res.status(400).json({ message: 'You should provide a password!' })
        return
    } else if (!data.email) {
        res.status(400).json({ message: 'You should provide an email.' })
        return
    }
    
    try {
        const searchUser = await connection.query(`SELECT * FROM users WHERE username = ?`, [data.username])
        
        // Checking if the user exists on the database:
        if (Array.isArray(searchUser[0]) && searchUser[0].length > 0) {
            res.status(404).json({ message: 'This user is already on the database!.' })
            return
        }

        const newUser = {
            username: data.username,
            password: await bcryptPassword(data.password),
            email: data.email
        }

        await connection.query(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`, [newUser.username, newUser.password, newUser.email])

        res.status(201).json({ message: 'User created!' })

        connection.end()
    } catch (error) {
        res.status(500).json({ message: 'There was an error adding users to the database.' })
    }
})

userRouter.put('/update/user/:id', async (req, res) => {
    const data = req.body
    const userId = req.params.id
    const connection = connect()

    try {
        const searchUser = await connection.query(`SELECT * FROM users WHERE user_id = ?`, [userId])

        if (Array.isArray(searchUser[0]) && searchUser[0].length > 0) {
            const updatedUser = {
                username: data.username,
                email: data.email
            }

            await connection.query(`
                UPDATE users
                SET username = ?,
                email = ?
                WHERE user_id = ?
            `, [updatedUser.username, updatedUser.email, userId])

            res.status(200).json({ message: 'User updated!' })
        }
    } catch (error) {
        res.status(500).json({ message: 'There was an error updating the user' })
    }
})

userRouter.delete('/delete/user/:id', async (req, res) => {
    const userId = req.params.id
    const connection = connect()

    try {
        const searchUser = await connection.query(`SELECT * FROM users WHERE user_id = ?`, [userId])
        
        if (Array.isArray(searchUser[0]) && searchUser[0].length > 0) {
            await connection.query(`DELETE FROM users WHERE user_id = ?`, [userId])

            res.status(200).json({ message: 'User removed from the database.' })
            return
        } else {
            res.status(400).json({ message: 'User not found.' })
            return
        }

    } catch (error) {
        res.status(500).json({ message: 'There was a problem trying to remove the user from the database.' })
    }
})

export default userRouter