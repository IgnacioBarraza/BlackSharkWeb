import { z } from 'zod'

const serviceSchema = z.object({
    nombre: z
        .string({
            required_error: 'Debes indicar un nombre para el servicio!',
            invalid_type_error: 'Ingresa un nombre válido.'
        })
        .refine(value => /^.{0,250}$/.test(value), {
            message: 'Por favor, ingresa un nombre más corto!'
        }),
    precio: z
        .number({
            required_error: 'Debes indicar un precio!',
            invalid_type_error: 'Ingresa un precio válido.'
        })
        .min(0, {
            message: 'Por favor, ingresa un precio válido.'
        })
        .int({
            message: 'El precio no puede ser un decimal!'
        }),
    descripcion: z
        .string({
            required_error: 'Por favor, indica una descripción para el servicio.',
            invalid_type_error: 'Ingresa una descripción válida!'
        }),
    imagen: z
        .string({
            invalid_type_error: 'Por favor, indica una url válida.'
        })
        .optional()
})

const updateServiceSchema = z.object({
    nombre: z
        .string({
            invalid_type_error: 'Ingresa un nombre válido.'
        })
        .refine(value => /^.{0,250}$/.test(value ?? ""), {
            message: 'Por favor, ingresa un nombre más corto!'
        })
        .optional(),
    precio: z
        .number({
            invalid_type_error: 'Ingresa un precio válido.'
        })
        .min(0, {
            message: 'Por favor, ingresa un precio válido.'
        })
        .int({
            message: 'El precio no puede ser un decimal!'
        })
        .optional(),
    descripcion: z
        .string({
            invalid_type_error: 'Ingresa una descripción válida!'
        })
        .optional(),
    imagen: z
        .string({
            invalid_type_error: 'Por favor, indica una url válida.'
        })
        .optional()
    
})

export const validateService = (object: Object) => {
    return serviceSchema.safeParse(object)
}

export const validateUpdateService = (object: Object) => {
    return updateServiceSchema.safeParse(object)
}