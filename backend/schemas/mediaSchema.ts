import { z } from "zod"

const mediaSchema = z.object({
    nombre: z
    .string({
        required_error: 'Debes indicar el nombre del medio de comunicación!',
        invalid_type_error: 'Indica un nombre válido!'
    })
    .refine(value => /^.{0,30}$/.test(value), {
        message: 'Puedes ingresar hasta 30 caracteres!'
    }),
    tipo_medios: z
    .string({
        required_error: 'Debes indicar qué tipo de medio de comunicación es!',
        invalid_type_error: 'Ingresa un tipo de comunicación válido!'
    })
})

export const verifyMedia = (object: Object) => {
    return mediaSchema.safeParse(object)
}