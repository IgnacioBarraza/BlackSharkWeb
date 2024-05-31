import { z } from 'zod'

const cartSchema = z.object({
    id_usuario: z
        .string({
            required_error: 'Debes ingresar una id de usuario asociado a esta compra!',
            invalid_type_error: 'Ingresa una id válida.'
        })
        .refine(value => /^.{36}$/.test(value ?? ""), {
            message: 'La id del usuario debe contener 36 caracteres.'
        }),
    valor_total: z
        .number({
            invalid_type_error: 'Ingresa un monto válido.',
            required_error: 'Debes señalar el valor total!'
        })
        .min(0, {
            message: 'Ingresa un valor válido.'
        })
        .int({
            message: 'Debes ingresar un valor entero (no decimales)!'
        }),
    id_servicios: z
        .string({
            required_error: 'Debes ingresar los servicios correspondientes!',
            invalid_type_error: 'Por favor, ingresa ids correctas.'
        })
})

const updateCartSchema = z.object({
    id_usuario: z
        .string({
            invalid_type_error: 'Ingresa una id válida.'
        })
        .refine(value => /^.{36}$/.test(value ?? ""), {
            message: 'La id del usuario debe contener 36 caracteres.'
        })
        .optional(),
    valor_total: z
        .number({
            invalid_type_error: 'Ingresa un monto válido.',
        })
        .min(0, {
            message: 'Ingresa un valor válido.'
        })
        .int({
            message: 'Debes ingresar un valor entero (no decimales)!'
        })
        .optional(),
    id_servicios: z
        .string({
            invalid_type_error: 'Por favor, ingresa ids correctas.'
        })
        .optional()
})

export const validateCart = (object: Object) => {
    return cartSchema.safeParse(object)
}

export const validateUpdateCart = (object: Object) => {
    return updateCartSchema.safeParse(object)
}