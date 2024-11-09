import Joi from 'joi'

export const schema = Joi.object({
  fullName: Joi.string()
    .min(4)
    .max(35)
    .required()
    .messages({
      'string.min': 'El nombre que has ingresado es demasiado corto, intenta con uno más largo (mínimo 4 letras)',
      'string.max': 'El nombre que has ingresado contiene demasiados carácteres, intenta con uno más corto (máximo 35 letras).',
      'string.empty': 'Debes ingresar el nombre de usuario!',
      'any.required': 'Debes ingresar el nombre de usuario!',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Debes ingresar un correo!',
      'any.required': 'Debes ingresar un correo!',
      'string.email': 'El correo que has indicado no es un correo válido, inténtalo nuevamente'
    }),

  password: Joi.string()
    .pattern(new RegExp('[a-zA-Z0-9]'))
    .min(6)
    .max(30)
    .messages({
      'string.empty': 'Debes ingresar una contraseña!',
      'string.pattern.base': 'La contraseña debe tener entre 6 y 30 carácteres y solo puede contener letras y números!',
      'string.min': 'La contraseña debe tener mínimo 6 carácteres!',
      'string.max': 'La contraseña debe tener como máximo 30 carácteres!'
    })
    .optional()
})
  .with('fullName', 'email')
