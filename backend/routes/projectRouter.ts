import express from 'express'
import { randomUUID } from 'crypto'

import { connect } from '../utils/db'
import { validateProject } from '../schemas/projectSchema'
import authorizeRole from '../middleware/authorizeRole'

const projectRouter = express.Router()

projectRouter.get('/', async (req, res) => {
    const connection = connect()

    try {
        const [row, fields] = await connection.query(`SELECT * FROM proyecto`)

        return res.status(200).json(row)
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error al intentar obtener los proyectos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

projectRouter.post('/new', authorizeRole, async (req, res) => {
    const connection = connect()
    
    const validateData = validateProject(req.body)

    if (validateData.error) {
        return res.status(400).json({ message: JSON.parse(validateData.error.message)[0].message })
    }

    try {
        const searchProject = await connection.query(`SELECT * FROM proyecto WHERE nombre = ?`, [validateData.data.nombre])
        const searchUser = await connection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [validateData.data.id_usuario])

        if (Array.isArray(searchProject[0]) && searchProject[0].length > 0) {
            return res.status(400).json({ message: 'El proyecto ya existe en la base de datos.' })
        } else if (!(Array.isArray(searchUser[0]) && searchUser[0].length > 0)) {
            return res.status(400).json({ message: 'El usuario indicado no existe en la base de datos.' })
        } else {
            const newProject = {
                id_proyecto: randomUUID(),
                user_id: validateData.data.id_usuario,
                nombre: validateData.data.nombre
            }

            await connection.query(`INSERT INTO proyecto (id_proyecto, id_usuario, nombre) VALUES (?, ?, ?)`, [newProject.id_proyecto, newProject.user_id, newProject.nombre])

            return res.status(201).json({ message: 'Proyecto creado exitosamente!' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error al intentar agregar el proyecto a la base de datos.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

projectRouter.put('/update/:id', authorizeRole, async (req, res) => {
    const projectId = req.params.id
    const connection = connect()

    const validateData = validateProject(req.body)

    if (validateData.error) {
        return res.status(400).json({ message: JSON.parse(validateData.error.message)[0].message })
    }

    try {
        const searchProject = await connection.query(`SELECT * FROM proyecto WHERE id_proyecto = ?`, [projectId])

        if (Array.isArray(searchProject[0]) && searchProject[0].length > 0) {
            const updatedProject = {
                id_usuario: validateData.data.id_usuario,
                nombre: validateData.data.nombre
            }

            await connection.query(`
                UPDATE proyecto
                SET id_usuario = ?,
                nombre = ?
                WHERE id_proyecto = ?
            `, [updatedProject.id_usuario, updatedProject.nombre, projectId])

            return res.status(200).json({ message: 'Proyecto actualizado exitosamente!' })
        } else {
            return res.status(400).json({ message: 'El proyecto que quieres actualizar no existe en la base de datos.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Hubo un error intentando actualizar el proyecto.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

projectRouter.delete('/delete/:id', authorizeRole, async (req, res) => {
    const projectId = req.params.id
    const connection = connect()

    try {
        const searchProject = await connection.query(`SELECT * FROM proyecto WHERE id_proyecto = ?`, [projectId])

        if (Array.isArray(searchProject[0]) && searchProject[0].length > 0) {
            await connection.query(`DELETE FROM proyecto WHERE id_proyecto = ?`, [projectId])

            return res.status(200).json({ message: 'Proyecto eliminado!' })
        } else {
            return res.status(400).json({ message: 'El proyecto no se encuentra en la base de datos.' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'Ha ocurrido un error al intentar eliminar el proyecto.' })
    } finally {
        if (connection) {
            connection.end()
        }
    }
})

export default projectRouter
