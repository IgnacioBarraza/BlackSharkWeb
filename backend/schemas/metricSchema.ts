import { z } from "zod"

const dateRegex = /^\d{4}-\d{2}-\d{2}/;

const metricSchema = z.object({
    initDate: z
        .string({
            required_error: "Debes ingresar una fecha de inicio!",
            invalid_type_error: "Ingresa una fecha válida.",
        })
        .refine(value => dateRegex.test(value), {
            message: "La fecha debe tener el formato 'YYYY-MM-DD'.",
    }),
    finishDate: z
        .string({
            required_error: "Debes ingresar una fecha de término!",
            invalid_type_error: "Ingresa una fecha válida.",
        })
        .refine(value => dateRegex.test(value), {
        message: "La fecha debe tener el formato 'YYYY-MM-DD'.",
    })
})

export const validateMetrics = (object: object) => {
    return metricSchema.safeParse(object)
}