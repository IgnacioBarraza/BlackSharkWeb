import { z } from "zod"

const userSchema = z.object({
  username: z
    .string({
        required_error: 'Debes ingresar un nombre de usuario!'
    })
    .min(3, {
        message: 'El nombre de usuario debe ser de al menos 3 caracteres.'
    })
    .max(50, {
        message: 'El nombre de usuario debe tener un máximo de 50 caracteres.'
    }),
    password: z
    .string({
        required_error: 'Debes ingresar una contraseña!'
    })
    .min(8, {
        message: 'La contraseña debe contener al menos 8 caracteres.'
    }),
    email: z
    .string({
        required_error: 'El usuario debe contener un correo.'
    })
    .email({
        message: 'Ingresa un correo válido.'
    }),
    phone: z
    .number({
        invalid_type_error: 'Debes ingresar un número válido!'
    })
    .int()
    .max(9, {
        message: 'El número debe ser de máximo 9 caracteres.'
    })
    .optional(),
    tipo_user: z.enum(['usuario', 'administrador'], {
        errorMap: () => ({ message: 'Debes seleccionar un tipo de usuario válido.',
            required_error: 'Debes señalar el tipo de usuario.'
         })
    }),
    direction: z
    .string()
    .max(30, {
        message: 'La dirección solo puede contener hasta 30 caracteres.'
    })
    .optional()
})

export const validateUser = (object: object) => {
    return userSchema.safeParse(object)
}
