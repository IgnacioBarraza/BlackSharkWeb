import { z } from 'zod'

const newCollabSchema = z.object({
    nombre_empresa: z
        .string({
            required_error: 'Debes indicar el nombre de la empresa!',
            invalid_type_error: 'Ingresa un nombre válido.'
        }),
    id_servicios: z
        .string({
            required_error: 'Debes indicar la id de los servicios que se realizaron en la colaboración!',
            invalid_type_error: 'Ingresa ids válidos!'
        })
})

export const validateCollab = (object: Object) => {
    return newCollabSchema.safeParse(object)
}