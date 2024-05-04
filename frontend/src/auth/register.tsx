import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const Register = () => {
    return (
      <>
        <div>
          <div className="imback fixed top-0 left-0 p-2">
              <Link to={'/'}>
                <span className="flex items-center justify-center rounded-full w-20 h-20">
                  <FontAwesomeIcon icon={faChevronLeft} size="2xl"/>
                </span>
              </Link>
          </div>
  
          <div className="flex justify-center items-center h-screen">
              <form className="font-myriad-pro flex flex-col items-center max-w-xl mx-auto p-20 rounded-lg ">
                  <div>
                    <h2 className="mt-5 text-2xl font-extrabold text-center text-neutral-600">Registrarse</h2>
                  </div>

                  <div className="w-full pt-10">
                    <span className="label-name-input">Nombre completo</span>
                    <input className="w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" type="text" name="fullname" placeholder="Nombre completo"/>
                  </div>
    
                  <div className="w-full pt-3">
                    <span className="label-user-input">Correo</span>
                    <input className="w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" type="email" name="username" placeholder="Ingrese su correo" />
                    {/* icono de un usuario */}
                  </div>
    
                  <div className="w-full pt-3">
                    <span className="label-input-password">Contraseña</span>
                    <input className="w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" type="password" name="pass" placeholder="Ingrese su contraseña"/>
                    {/* icono de un candado */}
                  </div>
    
                  <div className="w-full pt-3">
                    <span className="label-input-reapetpassword">Confirma la contraseña</span>
                    <input className="w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" type="password" name="repassword" placeholder="Confirme su contraseña"/>
                    {/* icono de un candado */}
                  </div>

                  <div className="mb-4 pt-5">
                    <Link to={'/login'}>
                       <a href="#" className="font-medium text-blue-600 hover:text-blue-500">¿Ya tienes cuenta?</a>
                     </Link>
                  </div>
    
                  <div className="contenedor">
                    <button className="flex items-center justify-center w-full px-10 py-2.5 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                         Registrarte
                     </button>
                  </div>
              </form>
          </div>
        </div>
      </>
    )
}
