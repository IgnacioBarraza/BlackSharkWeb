import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <div className="bg-[url(/background-input-photo.jpg)] bg-cover bg-center w-full h-screen bg-no-repeat">
        <div className="imback fixed top-0 left-0 p-2">
          <Link to={"/"}>
            <span className="flex items-center justify-center rounded-full w-20 h-20 text-white">
              <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
            </span>
          </Link>
        </div>

        <div className="flex justify-center items-center h-screen w-full">
          <form className="font-myriad-pro flex flex-col items-center max-w-md w-full md:px-10 py-8 rounded-lg  bg-black bg-opacity-60">
            <div>
              <h2 className="mt-5 pb-10 text-2xl font-extrabold text-center text-white">Registrarse</h2>
            </div>

            <div className="name flex flex-col items-start mb-4 pt-3 text-white">
              <div className="flex items-center">
                <input className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" type="text" name="fullname" placeholder="Nombre completo"/>
              </div>
            </div>
            <div className="email flex flex-col items-start mb-4 pt-3 text-white">
              <div className="flex items-center">
                <input className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" type="email" name="username" placeholder="Ingrese su correo" />
              </div>
            </div>

            <div className="password flex flex-col items-start mb-4 pt-3 text-white">
              <div className="flex items-center">
                <input className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" type="password" name="pass" placeholder="Ingrese su contraseña"/>
              </div>       
            </div>

            <div className="repassword flex flex-col items-start mb-4 pt-3 text-white">
              <div className="flex items-center">
                <input className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" type="password" name="pass" placeholder="Ingrese su contraseña"/>
              </div> 
            </div>

            <div className="contenedor pt-5">
              <button className="flex items-center justify-center w-full px-[110px] py-2.5 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-bs-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Registrarte
                </button>
            </div>

            <div className="mb-4 pt-5">
              <Link to={'/login'}>
                  <a className="font-medium text-white hover:text-blue-500">¿Ya tienes cuenta?</a>
                </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};