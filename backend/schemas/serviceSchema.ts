import { z } from 'zod'

const serviceSchema = z.object({
    nombre: z
        .string({
            required_error: 'Debes indicar un nombre para el servicio!',
            invalid_type_error: 'Ingresa un nombre válido.'
        })
        .refine(value => /^.{0,250}$/.test(value ?? ""), {
            message: 'Por favor, ingresa un nombre más corto!'
        }),
    precio: z
        .number({
            required_error: 'Debes indicar un precio!',
            invalid_type_error: 'Ingresa un precio válido.'
        })
        .min(0, {
            message: 'Por favor, ingresa un correo válido.'
        })
        .int({
            message: 'El precio no puede ser un decimal!'
        }),
    descripcion: z
        .string({
            required_error: 'Por favor, indica una descripción para el servicio.',
            invalid_type_error: 'Ingresa una descripción válida!'
        })
})

export const validateService = (object: Object) => {
    return serviceSchema.safeParse(object)
}