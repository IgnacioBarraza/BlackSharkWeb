import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { userToRegister } from "../utils/interfaces";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export const Register = () => {

  const navigate = useNavigate()
  const { register } = useAuth()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
    repeat_password: ''
  })

  const handleFormInputs = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault()

    if (user.password !== user.repeat_password) {
      alert('Contraseñas no coinciden...')
      return
    }

    const userToRegister: userToRegister = {
      email: user.email,
      password: user.email,
      username: user.username,
    }

    try {
      const res = await register(userToRegister)
      console.log(res)
      if (res["statusText"] === 'Created') {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="bg-[url(/background-auth-photo.jpg)] bg-cover bg-center w-full h-screen bg-no-repeat">
        <div className="imback fixed top-0 left-0 p-2">
          <Link to={"/login"}>
            <span className="flex items-center justify-center rounded-full w-20 h-20 text-white">
              <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
            </span>
          </Link>
        </div>

        <div className="flex justify-center items-center h-screen w-full">
          <form onSubmit={handleRegister} className="font-myriad-pro flex flex-col items-center max-w-md w-full md:px-10 py-8 rounded-lg  bg-black bg-opacity-60">
            <div>
              <h2 className="mt-5 pb-10 text-2xl font-extrabold text-center text-white">Registrarse</h2>
            </div>

            <div className="name flex flex-col items-start mb-4 pt-3 text-white">
              <div className="flex items-center">
                <input 
                className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" 
                type="text" 
                name="username" 
                placeholder="Nombre completo"
                onChange={handleFormInputs}/>
              </div>
            </div>
            <div className="email flex flex-col items-start mb-4 pt-3 text-white">
              <div className="flex items-center">
                <input 
                className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" 
                type="email" 
                name="email" 
                placeholder="Ingrese su correo"
                onChange={handleFormInputs} />
              </div>
            </div>

            <div className="password flex flex-col items-start mb-4 pt-3 text-white">
              <div className="flex items-center">
                <input 
                className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" 
                type="password" 
                name="password" 
                placeholder="Ingrese su contraseña"
                onChange={handleFormInputs}/>
              </div>       
            </div>

            <div className="repassword flex flex-col items-start mb-4 pt-3 text-white">
              <div className="flex items-center">
                <input 
                className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" 
                type="password" 
                name="repeat_password" 
                placeholder="Confirmar su contraseña"
                onChange={handleFormInputs}/>
              </div> 
            </div>

            <div className="contenedor pt-5">
              <button className="flex items-center justify-center w-full px-[110px] py-2.5 text-xl font-large text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Registrarte
                </button>
            </div>

            <div className="mb-4 pt-5 text-white">
              <Link to={'/login'}>
                <span className="font-medium blue-bs hover:text-blue-500 transition-colors duration-300">¿Ya tienes cuenta?</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};