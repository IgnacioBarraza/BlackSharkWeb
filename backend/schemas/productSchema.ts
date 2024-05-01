import { z } from "zod"

const productSchema = z.object({
    nombre: z
        .string({
            invalid_type_error: 'Ingresa un nombre válido para el producto.',
            required_error: 'Debes ingresar un nombre para el producto!'
        })
        .refine(value => /^.{0,50}$/.test(value), {
            message: 'El nombre del producto puede tener hasta 50 caracteres!'
        }),
    precio: z
        .number({
            invalid_type_error: 'Debes indicar un precio válido!',
            required_error: 'El producto debe tener un precio asociado!'
        })
        .min(0, {
            message: 'Debes indicar un precio no nulo!'
        })
        .int({
            message: 'El precio no puede ser un número decimal!'
        }),
    descripcion: z
        .string({
            invalid_type_error: 'Ingresa una descripción válida!',
            required_error: 'El producto debe tener una descripción.'
        })
        .refine(value => /^.{0,255}$/.test(value), {
            message: 'Intenta mantener la descripción bajo los 255 caracteres!'
        }),
    id_inventario: z
        .string({
            invalid_type_error: 'Ingresa una id de inventario válida!',
            required_error: 'Debes indicar a qué inventario pertenece este producto.'
        })
        .refine(value => /^.{36}$/.test(value), {
            message: 'La id del inventario solo puede tener 36 caracteres!'
        })
})

export const verifyProduct = (object: Object) => {
    return productSchema.safeParse(object)
}