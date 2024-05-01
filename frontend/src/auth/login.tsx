import { faChevronLeft, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const Login = () => {
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

                <span className="login-title mb-4">Iniciar Sesión</span>
                
                <div className="email flex flex-col items-start mb-4">
                  <span className="label-email-input">Correo</span>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUser}/>
                    <input className="email-input ml-2" type="email" name="username" placeholder="Ingrese su correo" />
                  </div>
                </div>

                <div className="password flex flex-col items-start mb-4">
                  <span className="label-input-password">Contraseña</span>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faLock}/>
                    <input className="password-input ml-2" type="password" name="pass" placeholder="Ingrese su contraseña"/>
                  </div>
                </div>

                <div className="mb-4">
                  <a>¿Has olvidado tu contraseña?</a>
                </div>

                <div className="contenedor">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Ingresar
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </>
  )
}


