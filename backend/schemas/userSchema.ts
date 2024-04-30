import { z } from "zod"

const userSchema = z.object({
    username: z
        .string({
            required_error: "Debes ingresar un nombre de usuario!",
            invalid_type_error: "Ingresa un nombre de usuario válido.",
        })
        .refine(value => /^.{3,50}$/.test(value ?? ""), {
            message: "El nombre de usuario debe ser de mínimo 3 caracteres y máximo 50.",
        }),
    password: z
        .string({
            required_error: "Debes ingresar una contraseña!",
        })
        .refine(value => /^.{8,}$/.test(value ?? ""), {
            message: "La contraseña debe contener al menos 8 caracteres.",
        }),
    email: z
        .string({
            required_error: "El usuario debe contener un correo.",
        })
        .email({
            message: "Ingresa un correo válido.",
        }),
    phone: z
        .string({
            message: "Debes ingresar un número válido.",
        })
        .refine(value => /^\d{9}$/.test(value ?? ""), {
            message: "El número debe ser de 9 caracteres.",
        })
        .optional(),
    tipo_user: z.enum(["usuario", "administrador"], {
        errorMap: () => ({
            message: "Debes seleccionar un tipo de usuario válido.",
            required_error: "Debes señalar el tipo de usuario.",
        }),
    }),
    direction: z
        .string()
        .refine(value => /^.{0,30}$/.test(value), {
            message: "La dirección solo puede contener hasta 30 caracteres.",
        })
        .optional(),
})

const updateUserSchema = z.object({
    username: z
        .string({
            invalid_type_error: "Ingresa un nombre de usuario válido.",
        })
        .refine((value) => /^.{3,50}$/.test(value ?? ""), {
            message: "El nombre de usuario debe ser de mínimo 3 caracteres y máximo 50.",
        })
        .optional(),
    password: z
        .string({
            invalid_type_error: "Ingresa una contraseña válida.",
        })
        .refine((value) => /^.{8,}$/.test(value ?? ""), {
            message: "La contraseña debe tener al menos 8 carácteres.",
        })
        .optional(),
    email: z
        .string({
            invalid_type_error: "Ingresa un correo válido.",
        })
        .email({
            message: "Ingresa un correo válido.",
        })
        .optional(),
    phone: z
        .string({
            message: "Debes ingresar un número válido.",
        })
        .refine(value => /^\d{9}$/.test(value ?? ""), {
            message: "El número debe ser de 9 caracteres.",
        })
        .optional(),
    tipo_user: z.enum(["usuario", "administrador"], {
        errorMap: () => ({
            message: "Debes seleccionar un tipo de usuario válido.",
        })
    })
    .optional(),
    direction: z
        .string()
        .refine(value => /^.{5,30}$/.test(value), {
            message: "La dirección solo puede contener entre 5 y 30 caracteres.",
        })
        .optional()
})

export const validateUser = (object: object) => {
  return userSchema.safeParse(object)
}

export const validateUpdateuser = (object: Object) => {
    return updateUserSchema.safeParse(object)
  }