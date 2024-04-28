import express from 'express'
import { connect } from '../utils/db'

const projectRouter = express.Router()

projectRouter.get('/projects', async (req, res) => {
    const connection = connect()

    try {
        const [row, fields] = await connection.query(`SELECT * FROM proyecto`)

        res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Hubo un error al intentar obtener los proyectos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

projectRouter.post('/new/project', async (req, res) => {
    const data = req.body
    const connection = connect()
    
    if (!data.user_id) {
        res.status(400).json({ message: 'Debes indicar un usuario a cargo del proyecto!' })
        return
    } else if (!data.nombre) {
        res.status(400).json({ message: 'El proyecto debe llevar un nombre!' })
        return
    }

    try {
        const searchProject = await connection.query(`SELECT * FROM proyecto WHERE nombre = ?`, [data.nombre])
        const searchUser = await connection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [data.user_id])

        if (Array.isArray(searchProject[0]) && searchProject[0].length > 0) {
            console.log(searchProject)
            res.status(400).json({ message: 'El proyecto ya existe en la base de datos.' })
            return
        } else if (!(Array.isArray(searchUser[0]) && searchUser[0].length > 0)) {
            res.status(400).json({ message: 'El usuario indicado no existe en la base de datos.' })
            return
        } else {
            const newProject = {
                user_id: data.user_id,
                nombre: data.nombre
            }

            await connection.query(`INSERT INTO proyecto (id_usuario, nombre) VALUES (?, ?)`, [newProject.user_id, newProject.nombre])

            res.status(201).json({ message: 'Proyecto creado exitosamente!' })
            return
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error al intentar agregar el proyecto a la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

projectRouter.put('/update/project/:id', async (req, res) => {
    const projectId = req.params.id
    const data = req.body
    const connection = connect()

    try {
        const searchProject = await connection.query(`SELECT * FROM proyecto WHERE id_proyecto = ?`, [projectId])

        if (Array.isArray(searchProject[0]) && searchProject[0].length > 0) {
            const updatedProject = {
                id_usuario: data.user_id,
                nombre: data.nombre
            }

            await connection.query(`
                UPDATE proyecto
                SET id_usuario = ?,
                nombre = ?
                WHERE id_proyecto = ?
            `, [updatedProject.id_usuario, updatedProject.nombre, projectId])

            res.status(200).json({ message: 'Proyecto actualizado exitosamente!' })
            return
        } else {
            res.status(400).json({ message: 'El proyecto que quieres actualizar no existe en la base de datos.' })
            return
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error intentando actualizar el proyecto.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

projectRouter.delete('/delete/project/:id', async (req, res) => {
    const projectId = req.params.id
    const connection = connect()

    try {
        const searchProject = await connection.query(`SELECT * FROM proyecto WHERE id_proyecto = ?`, [projectId])

        if (Array.isArray(searchProject[0]) && searchProject[0].length > 0) {
            await connection.query(`DELETE FROM proyecto WHERE id_proyecto = ?`, [projectId])

            res.status(200).json({ message: 'Proyecto eliminado!' })
            return
        } else {
            res.status(400).json({ message: 'El proyecto no se encuentra en la base de datos.' })
            return
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Ha ocurrido un error al intentar eliminar el proyecto.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default projectRouter
