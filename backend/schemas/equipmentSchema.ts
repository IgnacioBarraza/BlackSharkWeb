import { z } from 'zod'

const itemSchema = z.object({
    nombre_equipo: z
        .string({
            required_error: 'Debes ingresar un nombre para el equipo!',
            invalid_type_error: 'Ingresa un nombre válido.'
        })
        .refine(value => /^.{5,90}$/.test(value), {
            message: 'Puedes ingresar desde 5 hasta 90 caracteres para el nombre del equipo!'
        }),
    tipo_equipo: z
        .string({
            required_error: 'Debes indicar el tipo de equipo.',
            invalid_type_error: 'Ingresa un tipo de equipo válido!'
        })
        .refine(value => /^.{5,90}$/.test(value), {
            message: 'Puedes ingresar desde 5 a 90 caracteres para el tipo de equipo!'
        }),
    id_servicios: z
        .string({
            required_error: 'Debes indicar la id de los servicios a los cuales esta imagen está asociada!',
            invalid_type_error: 'Ingresa ids válidos!'
        })
})

const updateItemSchema = z.object({
    nombre_equipo: z
        .string({
            required_error: 'Debes ingresar un nombre para el equipo!',
            invalid_type_error: 'Ingresa un nombre válido.'
        })
        .refine(value => /^.{5,90}$/.test(value), {
            message: 'Puedes ingresar desde 5 hasta 90 caracteres para el nombre del equipo!'
        })
        .optional(),
    tipo_equipo: z
        .string({
            required_error: 'Debes indicar el tipo de equipo.',
            invalid_type_error: 'Ingresa un tipo de equipo válido!'
        })
        .refine(value => /^.{5,90}$/.test(value), {
            message: 'Puedes ingresar desde 5 a 90 caracteres para el tipo de equipo!'
        })
        .optional(),
    id_servicios: z
        .string({
            required_error: 'Debes indicar la id de los servicios a los cuales esta imagen está asociada!',
            invalid_type_error: 'Ingresa ids válidos!'
        })
        .optional()
})

export const validateItem = (object: Object) => {
    return itemSchema.safeParse(object)
}

export const validateUpdateItem = (object: Object) => {
    return updateItemSchema.safeParse(object)
}