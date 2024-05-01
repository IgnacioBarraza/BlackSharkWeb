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
  
          <div className="flex justify-center items-center h-screen ">
              <div className="limit font-myriad-pro rounded-xl" style={{ backgroundColor: 'rgba(1, 134, 255, 0.6)' }}>
                <form className="flex flex-col items-center max-w-400px mx-auto p-20 rounded-lg">
                    <span className="register-title mb-4">Registrarse</span>
    
                    <div className="w-full pt-5">
                    <span className="label-name-input">Nombre completo</span>
                    <input className="name-input w-full h-8" type="text" name="fullname" placeholder="Ingrese su nombre completo"/>
                    </div>
    
                    <div className="w-full pt-3">
                    <span className="label-user-input">Correo</span>
                    <input className="user-input w-full h-8" type="email" name="username" placeholder="Ingrese su correo" />
                    {/* icono de un usuario */}
                    </div>
    
                    <div className="w-full pt-3">
                    <span className="label-input-password">Contraseña</span>
                    <input className="password-input w-full h-8" type="password" name="pass" placeholder="Ingrese su contraseña"/>
                    {/* icono de un candado */}
                    </div>
    
                    <div className="w-full pt-3">
                    <span className="label-input-reapetpassword">Confirma la Contraseña</span>
                    <input className="password-input w-full h-8" type="password" name="repassword" placeholder="Ingrese nuevamente su contraseña"/>
                    {/* icono de un candado */}
                    </div>
    
                    <div className="mb-4 pt-5">
                    <a>¿Ya tienes cuenta?</a>
                    </div>
    
                    <div className="contenedor">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Registrarte
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
      </>
    )
}
