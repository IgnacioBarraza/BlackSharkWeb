import { Navbar } from '../components/NavBar/Navbar'
import '../styles/contact.css'
import { Footer } from '../components/Footer/Footer'
import { useState } from 'react'
import { Messages } from '../utils/interfaces'
import { useBackend } from '../hooks/useBackend'
import { useToast } from '@chakra-ui/react'

export const Contact = () => {
  const { sendMessage } = useBackend()
  const toast = useToast()

  const [messages, setMessages] = useState<Messages>({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    mensaje: '',
  })

  const handleFormInputs = ({ target: { name, value } }) => {
    setMessages({ ...messages, [name]: value })
  }

  const handleMessage = async (e) => {
    e.preventDefault()

    try {
      const res = await sendMessage(messages)
      const { status, data } = res
      if (status === 201) {
        successToastNotification(data.message)
        console.log(res)
      }
    } catch (error) {
      errorToastNotification(error.response.data.message)
      console.log(error)
    }
  }

  const successToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const errorToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <div className=" min-h-screen bg-[#000F1F] text-white flex justify-center items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* left side */}
          <div className="space-y-16 xl:space-y-0 2xl:space-y-16">
            <div className="space-y-8">
              <p className="text-[#0186ff] text-3xl"> Contáctanos</p>
              <h1 className="text-6xl font-bold tracking-tight">
                ¡Trabaja con nosotros!
              </h1>
              <p className="text-lg text-white-600">
                <span className="text-[#0186ff] text-2xl">
                  Agencia Publicitaria
                </span>
                <br />
                Diseño Gráfico - Marketing - Fotografía - Vídeo -
                Gigantografías✨
              </p>
              <p className="text-white-500 leading-relaxed">
                Si tienes habilidades que crees que podrían complementar nuestro
                equipo, tienes alguna duda o necesitas contactarte con nosotros,
                no dudes en ponerte en contacto. Estamos comprometidos en
                brindar una buena solución a cualquier inquietud. ¡Esperamos
                escuchar de ti pronto y explorar juntos las oportunidades que
                tenemos para ofrecer!
              </p>
            </div>

            <div className="grid grid-cols-3 min-[320px]:grid-cols-1 sm:grid-cols-3 gap-8 py-8 lg:w-max lg:gap-14 xl:w-full xl:gap-8">
              <div>
                <h3 className="font-medium mb-4">Dirección</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Los Perales 3263, Iquique, Chile 1100000-
                  <span className="text-[#0186ff]">Mapa</span>
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-4">Correo</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  bswebstudios@gmail.com
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-4">Télefono de contacto</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  +61 3 8376 6284
                  <br />
                  +44 3 7890 - 123
                </p>
              </div>
            </div>
          </div>

          {/* right side, Form */}
          <div className=" mt-[4.5rem] xl:mt-[5.5rem] 2xl:mt-[4.5rem]">
            <div className="space-y-6 text-black">
              <div className="relative">
                <input
                  required
                  name="nombre"
                  type="text"
                  onChange={handleFormInputs}
                  placeholder="Nombre"
                  className="block w-full h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                />
              </div>
              <div className="relative">
                <input
                  required
                  name="apellido"
                  type="text"
                  onChange={handleFormInputs}
                  placeholder="Apellido"
                  className="block w-full h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                />
              </div>
              <div className="relative">
                <input
                  required
                  name="correo"
                  type="email"
                  onChange={handleFormInputs}
                  placeholder="Correo"
                  className="block w-full h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                />
              </div>
              <div className="relative">
                <input
                  required
                  name="telefono"
                  type="tel"
                  onChange={handleFormInputs}
                  placeholder="Télefono"
                  className="block w-full h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                />
              </div>
              <div className="relative">
                <textarea
                  name="mensaje"
                  onChange={handleFormInputs}
                  placeholder="Deja un mensaje"
                  className="w-full border-b border-gray-200 h-32 py-4 px-3 pr-10 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent resize-none"
                />
              </div>
              <button
                onClick={handleMessage}
                className="flex items-center justify-center w-full 1xl:w-1/2 py-2.5 text-xl font-large text-center cursor-pointer text-white border-blue-600 transition duration-200 ease-in-out transform bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
