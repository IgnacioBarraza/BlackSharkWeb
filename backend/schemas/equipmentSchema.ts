import { z } from 'zod'

const itemSchema = z.object({
    nombre_equipo: z
        .string({
            required_error: 'Debes ingresar un nombre para el equipo!',
            invalid_type_error: 'Ingresa un nombre válido.S'
        })
        .refine(value => /^.{0,90}$/.test(value), {
            message: 'Por favor, ingresa un nombre más corto!'
        }),
    tipo_equipo: z
        .string({
            required_error: 'Debes indicar el tipo de equipo.',
            invalid_type_error: 'Ingresa un tipo de equipo válido!'
        })
        .refine(value => /^.{0,90}$/.test(value), {
            message: 'Puedes ingresar hasta 90 caracteres!'
        }),
    id_servicios: z
        .string({
            required_error: 'Debes indicar la id de los servicios a los cuales esta imagen está asociada!',
            invalid_type_error: 'Ingresa ids válidos!'
        })
})

export const validateItem = (object: Object) => {
    return itemSchema.safeParse(object)
}