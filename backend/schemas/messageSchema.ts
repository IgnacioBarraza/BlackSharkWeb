import { z } from "zod"

const messageSchema = z.object({
    nombre: z
        .string({
            required_error: "Debes ingresar tu nombre",
            invalid_type_error: "Ingresa un nombre válido.",
        })
        .refine(value => /^.{1,100}$/.test(value ?? ""), {
            message: "El nombre de usuario debe ser de mínimo 1 caracteres y máximo 100.",
        }),
    apellido: z
        .string({
            required_error: "Debes ingresar tu apellido",
            invalid_type_error: "Ingresa un apellido válido"
        }),
    correo: z
        .string({
            required_error: "Debes ingresar tu correo",
            invalid_type_error: "Ingresa un correo válido"
        })
        .email({
            message: "Ingresa un correo válido.",
        }),
    telefono: z
        .string({
            message: "Debes ingresar un número válido.",
        })
        .refine(value => /^\d{9}$/.test(value ?? ""), {
            message: "El número debe ser de 9 caracteres.",
        }),
    mensaje: z
        .string({
            required_error: "Debes ingresar un mensaje",
            invalid_type_error: "Ingresa un mensaje válido"
    })
})

export const validateMessage = (object: object) => {
  return messageSchema.safeParse(object)
}