import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const Recoverpassword = () => {

  return (
    <>
      <div className="bg-[url(/background-input-photo.jpg)] bg-cover bg-center w-full h-screen bg-no-repeat">
        <div className="absolute top-0 left-0 p-2">
            <Link to={'/'}>
              <span className="flex items-center justify-center rounded-full w-20 h-20 text-white">
                <FontAwesomeIcon icon={faChevronLeft} size="2xl"/>
              </span>
            </Link>
        </div>

        <div className="flex justify-center items-center h-screen pb-10">
          <form className="font-myriad-pro flex flex-col items-center max-w-md w-full md:px-0 pt-20 rounded-lg bg-black bg-opacity-60">
            <div>
              <h2 className=" text-2xl font-extrabold text-white">Restablecer la contraseña</h2>
            </div>

            <div className="password flex flex-col items-start mb-4 text-white pt-5">
              <div className="flex items-center">
                <p className=" text-xl font-light text-white text-center px-6 pt-4">Porfavor ingrese su dirección de correo. Le enviaremos las instrucciones para restablecer su contraseña</p>
              </div>
            </div>
            
            <div className="email flex flex-col items-start mb-4 pt-10 text-white">
              <div className="flex items-center">
                <input 
                className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" 
                type="email" 
                name="email" 
                placeholder="Ingrese su correo"
                />
              </div>
            </div>

            <div className="contenedor pt-8">
              <button className="flex items-center justify-center w-full px-[110px] py-2.5 text-xl font-large text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Enviar
              </button>
            </div>

            <div className="mb-4 pt-5 text-white">
            </div>

            <div className="pt-10 pb-5 text-white">
            </div>

          </form>         
        </div>
      </div>
    </>
  )
}