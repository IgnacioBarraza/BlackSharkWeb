import { z } from "zod"

const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Indica tu correo.',
            invalid_type_error: 'Ingresa un correo válido.'
        })
        .email({
            message: 'Debes ingresar un correo válido.'
        }),
    password: z
        .string({
            required_error: 'Debes ingresar tu contraseña!',
            invalid_type_error: 'Ingresa una contraseña válida.S'
        })
})

export const validateLoginData = (object: Object) => {
    return loginSchema.safeParse(object)
}