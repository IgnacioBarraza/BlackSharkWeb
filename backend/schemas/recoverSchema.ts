import { z } from "zod"

const recoverSchema = z.object({
    email: z
    .string({
        required_error: 'Debes indicar el correo.',
        invalid_type_error: 'Ingresa un correo válido!'
    })
    .email({
        message: 'Ingresa un correo válido!'
    })
})

export const validateIdAndEmail = (object: Object) => {
    return recoverSchema.safeParse(object)
}