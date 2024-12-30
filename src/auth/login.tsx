import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { userToVerify } from "../utils/interfaces";
import { useProps } from "../hooks/useProps";
import { useState } from "react";
import { ShowPassword } from "./components/showpassword";
import { useToast } from "@chakra-ui/react";
import BSWImage from "./components/BSWImage";
import GoogleOAuth from "./components/GoogleButton";

export const Login = () => {

  const navigate = useNavigate()
  const toast = useToast()
  const { login } = useAuth()
  const { setUserType, setTokenData, setUserName, setUserId, loginData } = useProps()
  const [user, setUser] = useState<userToVerify>({
    email: '',
    password: ''
  })

  const handleFormInputs = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    setUserType(null)
    setTokenData(null)
    setUserName(null)
    setUserId(null)
    const userToVerify: userToVerify = {
      email: user.email,
      password: user.password,
    };
    try {
      const res = await login(userToVerify)
      const {status, data} = res
      if (status === 200) {
        const { token, tipo_user, username, user_id, method: authMethod, message } = data
        loginData(token, tipo_user, username, user_id, authMethod)
        navigate("/");
        successToastNotification(message)
      }
    } catch (error) {
      errorToastNotification(error.response.data.message)
      console.error(error)
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
      setIsPasswordVisible((prevState) => !prevState);
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
    <>
    <div className="bg-blue-strong-bs min-h-screen">
      <header>
        <Link to={'/'} className="flex items-center justify-start w-fit pt-5 pl-5 gap-x-2">
          <FontAwesomeIcon icon={faChevronLeft} size="2xl" color="white" />
          <p className="text-xl text-white white hover:underline underline-offset-4">Volver</p>
        </Link>
      </header>

      <section className="w-full py-8 md:pt-24 lg:pt-32">
        <div className="flex flex-col lg:flex-row gap-x-10 justify-center">
          <div className="flex flex-col justify-center items-center lg:items-end w-full lg:w-1/2">
            <form className="w-3/4 min-w-fit" onSubmit={handleLogin}>
              <h1 className="text-3xl font-bold text-white tracking-tighter py-5 sm:text-4xl md:text-5xl lg:text-6xl">Iniciar sesión</h1>
              <section className="flex flex-col justify-center w-full">

                <div className="py-5 space-y-2">
                  <label htmlFor="email" className="text-xl text-white">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-[#d9d9d9] placeholder:text-[#d9d9d9] focus:ring-2 focus:ring-inset focus:bg-transparent"
                    onChange={handleFormInputs}
                  />
                </div>

                <div className="py-5 space-y-2">
                  <label htmlFor="password" className="text-xl text-white">Contraseña</label>
                  <div className="relative w-full">
                    <input
                      id="password"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Ingresa tu contraseña..."
                      className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-[#d9d9d9] placeholder:text-[#d9d9d9] focus:ring-2 focus:ring-inset focus:bg-transparent"
                      onChange={handleFormInputs}
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      <ShowPassword isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} />
                    </div>
                  </div>
                </div>

                <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mb-2">
                  <input type="submit" className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center cursor-pointer text-white transition duration-200 ease-in-out transform bg-blue-light-bs hover:bg-blue-light-hover focus:outline-none focus:ring-2 focus:ring-offset-2" value="Ingresar" />
                  <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 text-xl font-large text-center text-white border border-blue-light-hover transition duration-200 ease-in-out transform bg-trasparent hover:border hover:bg-blue-light-hover">
                    <Link to="signup" className="w-full py-2.5">
                      Registrarse  
                    </Link>
                  </button>
                </span>
                <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mt-2">
                  <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 text-xl font-large text-center text-white border border-blue-light-hover transition duration-200 ease-in-out transform bg-trasparent hover:border hover:bg-blue-light-hover">
                    <Link to="/recoverpassword" className="w-full py-2.5">
                      Recuperar contraseña
                    </Link>
                  </button>
                  <GoogleOAuth />
                </span>

              </section>
            </form>
          </div>

          <BSWImage />
        </div>
      </section>

    </div>      
    </>
  )
}


