import { z } from 'zod'

const gallerySchema = z.object({
    id_servicios: z
        .string({
            required_error: 'Debes indicar la id de los servicios a los cuales esta imagen está asociada!',
            invalid_type_error: 'Ingresa una id válida!'
        })
        .refine(value => /^.{36}$/.test(value ?? ""), {
            message: 'La id del servicio solo puede contener 36 caracteres!'
        }),
    imagen_link: z
        .string({
            required_error: 'Debes incluir un link para la imagen!',
            invalid_type_error: 'Ingresa un link válido!!'
        })
        .url({
            message: 'Por favor, ingresa un link válido.'
        })
})

export const validateImage = (object: Object) => {
    return gallerySchema.safeParse(object)
}