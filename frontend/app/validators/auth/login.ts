import Joi from "joi"

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Debes ingresar tu correo!',
      'any.required': 'Debes ingresar tu correo!',
      'string.email': 'El correo ingresado no es válido, inténtalo nuevamente!'
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Debes ingresar tu contraseña!',
      'any.required': 'Debes ingresar tu contraseña!',
    })
})
  .with('email', 'password')