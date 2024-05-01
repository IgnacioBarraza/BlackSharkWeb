import { z } from "zod"

const campaignSchema = z.object({
    nombre: z
        .string({
            invalid_type_error: 'Ingresa un nombre válido para la campaña.',
            required_error: 'La campaña debe tener un nombre!'
        })
        .refine(value => /^.{0,50}$/.test(value ?? ""), {
            message: 'El nombre debe tener menos de 50 caracteres!'
        }),
    presupuesto: z
        .number({
            invalid_type_error: 'Ingresa un monto válido.',
            required_error: 'La campaña debe contar con un presupuesto!'
        })
        .min(0, {
            message: 'Ingresa un valor válido.'
        })
        .int({
            message: 'Debes ingresar un valor entero (no decimales)!'
        })
})

export const validateCampaign = (object: Object) => {
    return campaignSchema.safeParse(object)
}