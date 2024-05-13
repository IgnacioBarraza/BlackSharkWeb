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

const passwordSchema = z.object({
    password: z
    .string({
        required_error: 'Debes ingresar la nueva contraseña!',
        invalid_type_error: 'Ingresa una contraseña válida.'
    })
    .refine(value => /^.{8,}$/.test(value ?? ""), {
        message: "La contraseña debe contener al menos 8 caracteres.",
    }),
    token: z
    .string({
        required_error: 'Token inválido. Inténtalo más tarde.',
        invalid_type_error: 'Token inválido, inténtalo nuevamente.'
    })
})

export const validateNewPassword = (object: Object) => {
    return passwordSchema.safeParse(object)
}