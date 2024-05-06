import { z } from "zod"

const inventorySchema = z.object({
    nombre: z
        .string({
            invalid_type_error: 'Indica un nombre válido!',
            required_error: 'Debes añadir un nombre para el inventario!'
        })
        .refine(value => /^.{0,50}$/.test(value), {
            message: 'El nombre puede tener hasta 50 caracteres!'
        }),
    cantidad: z
        .number({
            invalid_type_error: 'Debes indicar una cantidad de espacio válida!',
            required_error: 'El inventario debe tener un almacenamiento definido!'
        })
        .min(0, {
            message: 'Ingresa una cantidad válida!'
        })
        .int({
            message: 'La cantidad no puede ser un número decimal!'
        })
})

export const verifyInventory = (object: Object) => {
    return inventorySchema.safeParse(object)
}