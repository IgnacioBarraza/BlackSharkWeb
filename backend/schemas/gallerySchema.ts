import { object, z } from 'zod'

const imageSchema = z.object({
    id_servicios: z
        .string({
            required_error: 'Debes indicar la id de los servicios a los cuales esta imagen está asociada!',
            invalid_type_error: 'Ingresa ids válidos!'
        }),
    imagen_link: z
        .string({
            required_error: 'Debes incluir un link para la imagen!',
            invalid_type_error: 'Ingresa un link válido!!'
        })
        .url({
            message: 'Por favor, ingresa un link válido.'
        })
})

const updateImage = z.object({
    id_servicios: z
        .string({
            invalid_type_error: 'Debes ingresar una nueva id válida!'
        })
        .optional(),
    imagen_link: z
        .string({
            invalid_type_error: 'El nuevo link debe ser un link válido!!'
        })
        .url({
            message: 'Por favor, ingresa un link válido.'
        })
        .optional()
})

export const validateImage = (object: Object) => {
    return imageSchema.safeParse(object)
}

export const validateUpdateImage = (object: Object) => {
    return updateImage.safeParse(object)
}